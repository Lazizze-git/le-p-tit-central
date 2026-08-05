/**
 * FORMULAIRE DE CONTACT — validation et mise en forme du message.
 *
 * ÉTAT ACTUEL : aucun service d'envoi n'est branché. À la validation,
 * le site ouvre le logiciel de messagerie du visiteur avec un message
 * déjà rédigé, adressé à la maison. C'est volontaire : un formulaire
 * qui affiche « message envoyé » sans rien envoyer est pire que pas de
 * formulaire du tout.
 *
 * POUR BRANCHER UN VRAI ENVOI plus tard (Formspree, Resend, Brevo…) :
 * voir la section « Brancher le formulaire » du README.
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
