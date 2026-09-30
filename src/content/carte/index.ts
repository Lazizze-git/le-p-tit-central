/**
 * LA CARTE
 * ------------------------------------------------------------------
 * Saisie d'après les cartes imprimées de la maison : les cartes du midi
 * et du soir d'octobre 2026 (entrées / mets / tapas / desserts), et la
 * carte des boissons (caféterie / thés et infusions / jus de fruits).
 *
 * OÙ EST RANGÉE LA CARTE. Un fichier par moment de la journée :
 *   matin.ts   les boissons
 *   midi.ts    la carte du midi
 *   soir.ts    la carte du soir, tapas et verres compris
 *   perche.ts  les filets de perche du vendredi
 * Les plats servis à midi ET le soir ne sont écrits qu'une fois, dans
 * plats.ts : les changer là les change sur les deux cartes.
 *
 * Pour ajouter un plat : copiez une ligne existante et changez le texte.
 * Pour changer un prix : écrivez le nombre, avec un point, sans « CHF ».
 *   prix: 24.5   →  le site affiche « CHF 24.50 ».
 * Tant qu'un prix vaut `null`, le site affiche un tiret et la mention
 *   « communiqués sur place » : jamais un montant inventé.
 *
 * CE QUI RESTE À `null`, ET POURQUOI : le plat du jour, les verres de
 * vin et de bière, et les perches du vendredi. Aucun des trois ne figure
 * sur une carte imprimée — ils changent, et s'annoncent à l'ardoise ou
 * au comptoir. Le jour où la maison nous les donne, il suffit de
 * remplacer les `null` : le bandeau d'explication en haut de la page
 * disparaît tout seul quand il n'en reste plus un.
 *
 * DATE_MISE_A_JOUR s'affiche en bas de la carte. Pensez à la changer
 * quand vous modifiez la carte.
 */

import type { Moment } from '../types';
import { MATIN } from './matin';
import { MIDI } from './midi';
import { PERCHE } from './perche';
import { SOIR } from './soir';

export const DATE_MISE_A_JOUR = '30.09.2026';

export const MOMENTS: readonly Moment[] = [MATIN, MIDI, SOIR, PERCHE];

/**
 * PROVENANCE DES VIANDES ET DES POISSONS
 * ------------------------------------------------------------------
 * Reprise mot pour mot des cartes imprimées. En Suisse, cette mention
 * est obligatoire dès qu'on annonce un plat de viande ou de poisson :
 * elle doit donc figurer sur le site comme elle figure sur la carte.
 * Elle s'affiche en bas de la page /carte/.
 */
export interface Provenance {
  readonly produit: string;
  readonly origine: string;
}

export const PROVENANCES: readonly Provenance[] = [
  { produit: 'Bœuf, veau, porc', origine: 'Suisse' },
  { produit: 'Poulet', origine: 'France et Suisse' },
  { produit: 'Saumon', origine: 'Norvège' },
  { produit: 'Truite', origine: 'France' },
  { produit: 'Perches', origine: 'Russie, élaborées en Suisse' },
];

/** Mention allergènes, reprise des cartes imprimées. */
export const MENTION_ALLERGENES =
  'Pour toute information sur les allergènes de nos plats, adressez-vous à notre personnel.';
