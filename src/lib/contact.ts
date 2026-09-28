/**
 * FORMULAIRE DE CONTACT — validation, envoi et message de secours.
 *
 * Le message est posté à /contact.php, sur le serveur Infomaniak, qui
 * l'expédie à la maison par une boîte e-mail authentifiée (README,
 * section 7). Le formulaire n'annonce « envoyé » que si le serveur l'a
 * confirmé : un formulaire qui affiche « message envoyé » sans rien
 * envoyer est pire que pas de formulaire du tout.
 *
 * Si l'envoi échoue — serveur injoignable, boîte pas encore réglée, ou
 * `npm run dev`, qui n'exécute pas le PHP —, le visiteur garde son
 * message et peut l'ouvrir, déjà rédigé, dans sa messagerie.
 */

import { SITE } from '@/content/site';
import { lienMailto } from '@/lib/format';

export const SUJETS = [
  'Réserver une table',
  'Privatiser la salle',
  'Un groupe',
  'Autre question',
] as const;

export type Sujet = (typeof SUJETS)[number];

export interface DonneesContact {
  nom: string;
  email: string;
  telephone: string;
  sujet: Sujet;
  message: string;
}

export type ErreursContact = Partial<Record<keyof DonneesContact, string>>;

export const CONTACT_VIDE: DonneesContact = {
  nom: '',
  email: '',
  telephone: '',
  sujet: SUJETS[0],
  message: '',
};

// Volontairement permissif : on vérifie la forme générale, pas
// l'existence de l'adresse. Un contrôle trop strict rejette des
// adresses valides et fait perdre un client.
const FORME_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Renvoie un objet vide si tout est bon. */
export function validerContact(donnees: DonneesContact): ErreursContact {
  const erreurs: ErreursContact = {};

  if (donnees.nom.trim().length < 2) {
    erreurs.nom = 'Indiquez votre nom.';
  }
  if (!FORME_EMAIL.test(donnees.email.trim())) {
    erreurs.email = 'Cette adresse e-mail semble incomplète.';
  }
  if (donnees.message.trim().length < 10) {
    erreurs.message = 'Écrivez au moins une phrase, qu’on sache de quoi il s’agit.';
  }
  // Le téléphone reste facultatif, mais s'il est saisi, il doit être plausible.
  const tel = donnees.telephone.trim();
  if (tel.length > 0 && tel.replace(/[^\d]/g, '').length < 9) {
    erreurs.telephone = 'Ce numéro semble incomplet.';
  }

  return erreurs;
}

export type ResultatEnvoi = 'envoye' | 'trop' | 'echec';

/**
 * Poste le message au serveur. `ouvertDepuis` : millisecondes passées
 * depuis l'affichage du formulaire — un robot le remplit en un instant.
 * `siteWeb` : le champ piège, invisible, que seuls les robots remplissent.
 */
export async function envoyerContact(
  donnees: DonneesContact,
  ouvertDepuis: number,
  siteWeb: string,
): Promise<ResultatEnvoi> {
  const corps = new FormData();
  for (const [cle, valeur] of Object.entries(donnees)) corps.append(cle, valeur.trim());
  corps.append('ouvert_depuis', String(Math.round(ouvertDepuis)));
  corps.append('site_web', siteWeb);

  try {
    const reponse = await fetch('/contact.php', { method: 'POST', body: corps });
    if (reponse.status === 429) return 'trop';
    const resultat: unknown = await reponse.json();
    return reponse.ok && (resultat as { ok?: unknown }).ok === true ? 'envoye' : 'echec';
  } catch {
    return 'echec';
  }
}

/** Construit le lien mailto complet, correctement encodé. */
export function lienMessage(donnees: DonneesContact): string {
  const corps = [
    `Nom : ${donnees.nom.trim()}`,
    `E-mail : ${donnees.email.trim()}`,
    donnees.telephone.trim() ? `Téléphone : ${donnees.telephone.trim()}` : null,
    '',
    donnees.message.trim(),
    '',
    `— Envoyé depuis ${SITE.url}`,
  ]
    .filter((ligne) => ligne !== null)
    .join('\n');

  return lienMailto(SITE.email, `${donnees.sujet} — ${donnees.nom.trim()}`, corps);
}
