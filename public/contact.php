<?php
/**
 * FORMULAIRE DE CONTACT — l'envoi, côté serveur (Infomaniak).
 * ------------------------------------------------------------------
 * Le formulaire de la page Contact poste ici. Le message part vers la
 * maison par un envoi authentifié : une vraie boîte e-mail Infomaniak
 * l'expédie (mail.infomaniak.com, port 587, chiffré). La fonction
 * mail() de PHP est désactivée chez Infomaniak, et un message non
 * authentifié finirait de toute façon dans les indésirables.
 *
 * L'adresse et le mot de passe de cette boîte ne sont jamais dans le
 * code : GitHub les écrit dans formulaire-smtp.php au moment de la mise
 * en ligne (secrets INFOMANIAK_SMTP_*, README section 7). Sans eux, le
 * script répond « indisponible » et le formulaire propose l'e-mail.
 *
 * Réponse : du JSON, { "ok": true } ou { "ok": false, "raison": "…" }.
 */

declare(strict_types=1);

// Qui reçoit les messages. Doit rester l'adresse `email` de
// src/content/site.ts : la construction du site le vérifie.
const DESTINATAIRE = 'ptitcentral@gmail.com';

const SUJETS = ['Réserver une table', 'Privatiser la salle', 'Un groupe', 'Autre question'];
const ENVOIS_PAR_HEURE = 5;
const DELAI_MINIMUM_SECONDES = 3;

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');

function repondre(int $statut, array $corps): never
{
    http_response_code($statut);
    echo json_encode($corps, JSON_UNESCAPED_UNICODE);
    exit;
}

function refuser(int $statut, string $raison): never
{
    repondre($statut, ['ok' => false, 'raison' => $raison]);
}

/** Une ligne de texte sans retour à la ligne : rien ne peut se glisser dans un en-tête. */
function ligne(string $cle, int $longueur): string
{
    $valeur = is_string($_POST[$cle] ?? null) ? $_POST[$cle] : '';
    $valeur = trim(preg_replace('/[\x00-\x1F\x7F]+/u', ' ', $valeur) ?? '');
    return mb_substr($valeur, 0, $longueur);
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Allow: POST');
    refuser(405, 'methode');
}

// --- Les robots -------------------------------------------------------
// Un champ invisible que seuls les robots remplissent, et un formulaire
// rempli en moins de trois secondes : on fait comme si tout allait bien,
// sans rien envoyer.
$ouvertDepuis = (int) ($_POST['ouvert_depuis'] ?? 0);
if (($_POST['site_web'] ?? '') !== '' || $ouvertDepuis < DELAI_MINIMUM_SECONDES * 1000) {
    repondre(200, ['ok' => true]);
}

// --- Les champs ---------------------------------------------------------
$nom = ligne('nom', 100);
$email = ligne('email', 200);
$telephone = ligne('telephone', 40);
$sujet = ligne('sujet', 60);
$message = is_string($_POST['message'] ?? null) ? trim($_POST['message']) : '';
$message = mb_substr(str_replace(["\r\n", "\r"], "\n", $message), 0, 5000);

if (mb_strlen($nom) < 2
    || filter_var($email, FILTER_VALIDATE_EMAIL) === false
    || mb_strlen($message) < 10
    || !in_array($sujet, SUJETS, true)) {
    refuser(400, 'champs');
}

// --- Pas plus de cinq messages par heure depuis la même connexion ------
$adresse = trim(explode(',', $_SERVER['HTTP_X_FORWARDED_FOR'] ?? $_SERVER['REMOTE_ADDR'] ?? '')[0]);
$compteur = sys_get_temp_dir() . '/ptit-central-contact-' . hash('sha256', $adresse);
$recents = array_filter(
    array_map('intval', @file($compteur, FILE_IGNORE_NEW_LINES) ?: []),
    static fn (int $moment): bool => $moment > time() - 3600,
);
if (count($recents) >= ENVOIS_PAR_HEURE) {
    refuser(429, 'trop');
}

// --- L'envoi --------------------------------------------------------------
$reglages = is_file(__DIR__ . '/formulaire-smtp.php') ? require __DIR__ . '/formulaire-smtp.php' : null;
if (!is_array($reglages) || empty($reglages['utilisateur']) || empty($reglages['mot_de_passe'])) {
    refuser(503, 'indisponible');
}

$corps = implode("\n", array_filter([
    "Nom : $nom",
    "E-mail : $email",
    $telephone !== '' ? "Téléphone : $telephone" : null,
    "Sujet : $sujet",
    '',
    $message,
    '',
    '— Envoyé depuis le formulaire de https://www.lepetitcentral.ch/contact/',
], static fn (?string $l): bool => $l !== null));

try {
    envoyerSmtp($reglages, "$sujet — $nom", $corps, $nom, $email);
} catch (Throwable $erreur) {
    error_log('Formulaire de contact : ' . $erreur->getMessage());
    refuser(502, 'envoi');
}

$recents[] = time();
@file_put_contents($compteur, implode("\n", $recents));
repondre(200, ['ok' => true]);

/**
 * Un nom à côté d'une adresse. « Dupont, Aïcha » ou « Le chef : Marc »
 * casseraient l'adresse de réponse s'ils étaient écrits tels quels : le
 * nom est donc entièrement encodé (RFC 2047), par morceaux de 45 octets
 * au plus pour que chaque ligne d'en-tête reste courte.
 */
function nomAffiche(string $nom): string
{
    $morceaux = [''];
    foreach (mb_str_split($nom, 1, 'UTF-8') as $caractere) {
        $dernier = count($morceaux) - 1;
        if (strlen($morceaux[$dernier] . $caractere) > 45) {
            $morceaux[] = '';
            $dernier++;
        }
        $morceaux[$dernier] .= $caractere;
    }
    return implode("\r\n ", array_map(
        static fn (string $morceau): string => '=?UTF-8?B?' . base64_encode($morceau) . '?=',
        $morceaux,
    ));
}

/**
 * Un envoi SMTP authentifié, chiffré par STARTTLS, le certificat du
 * serveur vérifié. Les réglages viennent de formulaire-smtp.php.
 */
function envoyerSmtp(array $reglages, string $sujet, string $corps, string $nom, string $email): void
{
    $serveur = $reglages['serveur'] ?? 'mail.infomaniak.com';
    $expediteur = $reglages['utilisateur'];

    $connexion = stream_socket_client("tcp://$serveur:587", $numero, $texte, 15);
    if ($connexion === false) {
        throw new RuntimeException("connexion à $serveur impossible : $texte");
    }
    stream_set_timeout($connexion, 15);

    $dire = static function (?string $commande, int $attendu) use ($connexion): void {
        if ($commande !== null) {
            fwrite($connexion, $commande . "\r\n");
        }
        $reponse = '';
        while (($ligne = fgets($connexion, 1024)) !== false) {
            $reponse .= $ligne;
            if (isset($ligne[3]) && $ligne[3] === ' ') {
                break;
            }
        }
        if ((int) substr($reponse, 0, 3) !== $attendu) {
            $montre = $commande !== null && str_starts_with($commande, 'AUTH') ? 'AUTH' : $commande;
            throw new RuntimeException("« $montre » : réponse inattendue " . trim($reponse));
        }
    };

    $hote = gethostname() ?: 'localhost';
    $dire(null, 220);
    $dire("EHLO $hote", 250);
    $dire('STARTTLS', 220);
    if (stream_socket_enable_crypto($connexion, true, STREAM_CRYPTO_METHOD_TLSv1_2_CLIENT | STREAM_CRYPTO_METHOD_TLSv1_3_CLIENT) !== true) {
        throw new RuntimeException('chiffrement TLS impossible');
    }
    $dire("EHLO $hote", 250);
    $dire('AUTH PLAIN ' . base64_encode("\0{$expediteur}\0{$reglages['mot_de_passe']}"), 235);
    $dire("MAIL FROM:<$expediteur>", 250);
    $dire('RCPT TO:<' . DESTINATAIRE . '>', 250);
    $dire('DATA', 354);

    $entetes = [
        'Date: ' . date(DATE_RFC2822),
        'From: ' . nomAffiche('Site du P’tit Central') . " <$expediteur>",
        'To: <' . DESTINATAIRE . '>',
        'Reply-To: ' . nomAffiche($nom) . " <$email>",
        'Subject: ' . mb_encode_mimeheader($sujet, 'UTF-8'),
        'Message-ID: <' . bin2hex(random_bytes(16)) . '@' . substr(strrchr($expediteur, '@') ?: '@localhost', 1) . '>',
        'MIME-Version: 1.0',
        'Content-Type: text/plain; charset=UTF-8',
        'Content-Transfer-Encoding: base64',
    ];
    // En base64, aucune ligne ne commence par un point : la fin du
    // message ne peut pas être simulée par son contenu.
    $dire(implode("\r\n", $entetes) . "\r\n\r\n" . chunk_split(base64_encode($corps), 76, "\r\n") . '.', 250);
    $dire('QUIT', 221);
    fclose($connexion);
}
