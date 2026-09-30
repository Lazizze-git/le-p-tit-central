import { SITE } from '@/content/site';
import { LIEU } from '@/content/textes';
import { lienMailto } from '@/lib/format';

/**
 * Lien « demander la salle privée par e-mail » : ouvre la messagerie du
 * visiteur avec l'objet et les questions utiles déjà écrits. Un seul
 * endroit pour l'accueil et la page Le lieu.
 */
export const LIEN_DEMANDE_SALLE = lienMailto(
  SITE.email,
  LIEU.demande_email_sujet,
  LIEU.demande_email_corps,
);
