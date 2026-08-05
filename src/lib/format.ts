/** Mises en forme conformes aux usages suisses romands. */

import type { Prix } from '@/content/types';

/** Espace insécable — évite qu'un montant soit coupé en fin de ligne. */
const INSECABLE = ' ';
/** Espace fine insécable — la ponctuation double du français. */
const FINE = ' ';

/**
 * 24.5 → « CHF 24.50 ». Point décimal, jamais de virgule, jamais d'euro.
 * `null` → tiret cadratin : le prix n'a pas encore été communiqué, on
 * ne l'invente pas.
 */
export function formatPrix(prix: Prix): string {
  if (prix === null || !Number.isFinite(prix)) return '—';
  return `CHF${INSECABLE}${prix.toFixed(2)}`;
}

/**
 * Typographie française : une espace fine insécable précède les deux
 * points, le point-virgule, le point d'interrogation et d'exclamation.
 * Appliqué au rendu plutôt que dans les fichiers de contenu, pour que
 * la règle tienne même si quelqu'un tape une espace normale plus tard.
 */
export function typographieFr(texte: string): string {
  return texte.replace(/ ([:;?!])/g, `${FINE}$1`);
}

/** « +41213128075 » → « tel:+41213128075 ». */
export function lienTelephone(e164: string): string {
  return `tel:${e164.replace(/[^\d+]/g, '')}`;
}

/**
 * Construit un lien mailto complet et correctement encodé.
 * Sert de secours au formulaire de contact tant qu'aucun service
 * d'envoi n'est branché.
 */
export function lienMailto(destinataire: string, sujet: string, corps: string): string {
  const params = new URLSearchParams({ subject: sujet, body: corps });
  // URLSearchParams encode l'espace en « + », que les clients mail
  // n'interprètent pas dans un corps de message.
  return `mailto:${destinataire}?${params.toString().replace(/\+/g, '%20')}`;
}
