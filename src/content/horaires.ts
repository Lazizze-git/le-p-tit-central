/**
 * HORAIRES
 * ------------------------------------------------------------------
 * Pour changer un horaire, modifiez uniquement ce fichier.
 * Format : "HH:MM" sur 24 heures. « Ferme à minuit » s'écrit "24:00".
 * `null` = fermé ce jour-là pour ce service.
 *
 * Les fermetures exceptionnelles (vacances, jours fériés) se déclarent
 * dans FERMETURES, tout en bas.
 */

/** 0 = dimanche, 1 = lundi … 6 = samedi (même convention que JavaScript). */
export type IndexJour = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export interface Plage {
  readonly debut: string;
  readonly fin: string;
}

export interface JourHoraire {
  readonly index: IndexJour;
  readonly nom: string;
  readonly nomCourt: string;
  /** Code Google (Monday, Tuesday…), utilisé pour le référencement. */
  readonly codeSchema: string;
  /** Ouverture du café / de l'établissement. */
  readonly etablissement: Plage | null;
  /** Service de midi en cuisine. */
  readonly cuisineMidi: Plage | null;
  /** Service du soir en cuisine. */
  readonly cuisineSoir: Plage | null;
}

const MIDI: Plage = { debut: '11:30', fin: '14:00' };
const SOIR: Plage = { debut: '19:00', fin: '22:00' };
const JOURNEE: Plage = { debut: '07:00', fin: '24:00' };

export const SEMAINE: readonly JourHoraire[] = [
  {
    index: 1,
    nom: 'Lundi',
    nomCourt: 'Lun',
    codeSchema: 'Monday',
    etablissement: { debut: '07:00', fin: '19:30' },
    cuisineMidi: MIDI,
    cuisineSoir: null,
  },
  {
    index: 2,
    nom: 'Mardi',
    nomCourt: 'Mar',
    codeSchema: 'Tuesday',
    etablissement: JOURNEE,
    cuisineMidi: MIDI,
    cuisineSoir: SOIR,
  },
  {
    index: 3,
    nom: 'Mercredi',
    nomCourt: 'Mer',
    codeSchema: 'Wednesday',
    etablissement: JOURNEE,
    cuisineMidi: MIDI,
    cuisineSoir: SOIR,
  },
  {
    index: 4,
    nom: 'Jeudi',
    nomCourt: 'Jeu',
    codeSchema: 'Thursday',
    etablissement: JOURNEE,
    cuisineMidi: MIDI,
    cuisineSoir: SOIR,
  },
  {
    index: 5,
    nom: 'Vendredi',
    nomCourt: 'Ven',
    codeSchema: 'Friday',
    etablissement: JOURNEE,
    cuisineMidi: MIDI,
    cuisineSoir: SOIR,
  },
  {
    index: 6,
    nom: 'Samedi',
    nomCourt: 'Sam',
    codeSchema: 'Saturday',
    etablissement: JOURNEE,
    cuisineMidi: MIDI,
    cuisineSoir: SOIR,
  },
  {
    index: 0,
    nom: 'Dimanche',
    nomCourt: 'Dim',
    codeSchema: 'Sunday',
    etablissement: null,
    cuisineMidi: null,
    cuisineSoir: null,
  },
];

/**
 * FERMETURES EXCEPTIONNELLES
 * Ajoutez une ligne par période fermée. Le statut « ouvert / fermé »
 * en tient compte automatiquement, et le motif s'affiche sur le site.
 * Format des dates : "AAAA-MM-JJ". `fin` est incluse.
 *
 * Exemple :
 *   { debut: '2026-12-24', fin: '2027-01-05', motif: 'Fermeture de fin d’année' },
 */
export interface Fermeture {
  readonly debut: string;
  readonly fin: string;
  readonly motif: string;
}

export const FERMETURES: readonly Fermeture[] = [];

/** Résumé court affiché quand l'heure exacte n'est pas encore connue. */
export const RESUME_HORAIRES = 'Lun 7h–19h30 · Mar–Sam 7h–00h · Dim fermé';
