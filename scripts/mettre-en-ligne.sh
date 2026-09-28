#!/usr/bin/env bash
#
# MISE EN LIGNE — envoie le site construit sur l'hébergement Infomaniak.
# ------------------------------------------------------------------
# GitHub le lance à chaque modification de `main`, une fois le site
# construit (.github/workflows/mise-en-ligne.yml). L'envoi passe par
# FTP chiffré (FTPES) et lit ces secrets du dépôt :
#
#   INFOMANIAK_FTP_SERVEUR        ex. abcd.ftp.infomaniak.com
#   INFOMANIAK_FTP_UTILISATEUR    un compte FTP limité au dossier du site
#   INFOMANIAK_FTP_MOT_DE_PASSE
#
# Et, pour le formulaire de contact (README, section 7) :
#   INFOMANIAK_SMTP_UTILISATEUR   la boîte e-mail qui expédie les messages
#   INFOMANIAK_SMTP_MOT_DE_PASSE
#
# Le compte arrive directement dans sites/lepetitcentral.ch : c'est ce
# dossier, et lui seul, que le script remplace. L'hébergement porte
# d'autres sites ; le script refuse donc d'écrire dans un dossier qui
# n'est ni vide, ni déjà celui du P'tit Central.
#
# Usage : bash scripts/mettre-en-ligne.sh [dossier construit, out/ par défaut]

set -euo pipefail

SITE="${1:-out}"
# Première ligne de titre du .htaccess : elle signe un dossier déjà occupé par ce site.
SIGNATURE="LE P'TIT CENTRAL — réglages du serveur"

if [[ -z "${INFOMANIAK_FTP_SERVEUR:-}" || -z "${INFOMANIAK_FTP_UTILISATEUR:-}" || -z "${INFOMANIAK_FTP_MOT_DE_PASSE:-}" ]]; then
  echo "::warning title=Site construit, pas mis en ligne::Il manque un ou plusieurs des secrets INFOMANIAK_FTP_SERVEUR, INFOMANIAK_FTP_UTILISATEUR, INFOMANIAK_FTP_MOT_DE_PASSE (README, section 8). Le site construit se télécharge en bas de cette page : « site-infomaniak »."
  exit 0
fi

if [[ ! -f "$SITE/index.html" ]] || ! grep -qF "$SIGNATURE" "$SITE/.htaccess" 2>/dev/null; then
  echo "::error::« $SITE » ne contient pas le site construit : lancez d'abord npm run build."
  exit 1
fi

if ! command -v lftp >/dev/null; then
  sudo apt-get update -qq && sudo apt-get install -y -qq lftp >/dev/null
fi

# Le nom du serveur tel qu'Infomaniak l'affiche, même collé avec « ftp:// ».
SERVEUR="${INFOMANIAK_FTP_SERVEUR#*://}"
SERVEUR="${SERVEUR%/}"
export LFTP_PASSWORD="$INFOMANIAK_FTP_MOT_DE_PASSE"

# Une session FTP chiffrée de bout en bout, qui s'arrête à la première
# commande en échec. Chaque fichier est d'abord envoyé sous un nom
# provisoire, puis renommé : un visiteur ne reçoit jamais un fichier
# à moitié copié.
ftp_chiffre() {
  lftp -c "
    set cmd:fail-exit yes
    set ftp:ssl-force yes
    set ftp:ssl-protect-data yes
    set ssl:verify-certificate yes
    set net:timeout 30
    set net:max-retries 3
    set net:reconnect-interval-base 5
    set xfer:use-temp-file yes
    open --env-password -u '$INFOMANIAK_FTP_UTILISATEUR' 'ftp://$SERVEUR'
    $1
  "
}

# 1. Où le compte arrive-t-il ?
contenu="$(ftp_chiffre 'cls -1aF')"

if grep -qx 'sites/' <<<"$contenu"; then
  echo "::error title=Envoi refusé::Ce compte FTP voit tout l'hébergement (il contient le dossier sites/). Créez un compte FTP limité au dossier sites/lepetitcentral.ch et mettez-le dans les secrets (README, section 8). Rien n'a été modifié."
  exit 1
fi

# 2. Ce dossier est-il déjà celui du site ? Alors les fichiers qui n'en
#    font plus partie sont effacés. Sinon, c'est le premier envoi : le
#    dossier ne doit rien contenir de plus que ce qu'Infomaniak dépose
#    dans un site neuf, et rien n'y est effacé.
#    (Le .htaccess en ligne est rapatrié avec `get` : `cat` bloque lftp
#    quand le fichier n'existe pas.)
reception="$(mktemp -d)"
trap 'rm -rf "$reception"' EXIT

if ftp_chiffre "get .htaccess -o '$reception/htaccess'" >/dev/null 2>&1 &&
  grep -qF "$SIGNATURE" "$reception/htaccess"; then
  effacer='--delete'
else
  etrangers="$(grep '/$' <<<"$contenu" | grep -vxE '\./|\.\./|\.well-known/|cgi-bin/' || true)"
  if [[ -n "$etrangers" ]]; then
    echo "::error title=Envoi refusé::Le dossier de ce compte FTP contient déjà d'autres dossiers ($(tr '\n' ' ' <<<"$etrangers")) : ce n'est ni un site neuf, ni celui du P'tit Central. Vérifiez le dossier du compte (sites/lepetitcentral.ch). Rien n'a été modifié."
    exit 1
  fi
  effacer=''
  echo "Premier envoi dans ce dossier : rien n'y sera effacé."
fi

# 3. Les accès de la boîte qui expédie les messages du formulaire de
#    contact (contact.php). Ils ne vivent que dans les secrets GitHub et
#    sur le serveur : jamais dans le code, ni dans l'archive téléchargeable,
#    gardée avant cette étape. Sans eux, le formulaire propose l'e-mail.
if [[ -n "${INFOMANIAK_SMTP_UTILISATEUR:-}" && -n "${INFOMANIAK_SMTP_MOT_DE_PASSE:-}" ]]; then
  php_texte() { local v="${1//\\/\\\\}"; printf "'%s'" "${v//\'/\\\'}"; }
  printf '<?php\nreturn [\n  %s => %s,\n  %s => %s,\n];\n' \
    "'utilisateur'" "$(php_texte "$INFOMANIAK_SMTP_UTILISATEUR")" \
    "'mot_de_passe'" "$(php_texte "$INFOMANIAK_SMTP_MOT_DE_PASSE")" \
    > "$SITE/formulaire-smtp.php"
else
  echo "::warning title=Formulaire sans envoi::Les secrets INFOMANIAK_SMTP_UTILISATEUR et INFOMANIAK_SMTP_MOT_DE_PASSE manquent (README, section 7) : le formulaire de contact propose d'écrire par e-mail au lieu d'envoyer."
fi

# 4. D'abord /_next/ — des fichiers au nom neuf, qui ne remplacent rien —,
#    puis les pages : une page en ligne n'appelle jamais un fichier absent.
#    Le certificat HTTPS d'Infomaniak (.well-known) n'est jamais touché.
ftp_chiffre "
  mirror --reverse --no-perms --parallel=3 --verbose=1 '$SITE/_next' _next
  mirror --reverse --no-perms --parallel=3 --verbose=1 $effacer --exclude-glob .well-known/ --exclude-glob .user.ini --exclude-glob cgi-bin/ '$SITE' .
"

echo "::notice title=Site en ligne::Le site a été envoyé sur $SERVEUR."
