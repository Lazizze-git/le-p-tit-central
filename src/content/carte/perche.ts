/**
 * LES FILETS DE PERCHE DU VENDREDI.
 * Mode d'emploi de la carte : voir carte/index.ts.
 */

import type { Moment } from '../types';

export const PERCHE: Moment = {
  id: 'perche',
  titre: 'Filets de perche',
  label: 'Tous les vendredis midi',
  horaire: 'Vendredi, 11h30 – 14h00',
  accroche: 'Filets de perche meunière, sauce tartare maison.',
  texte: [
    'Pommes frites et légumes du jour. *Tous les vendredis midi depuis plus de vingt-trois ans* — c’est la seule chose ici qui ne change jamais.',
    'Le reste de la semaine, la perche se retrouve en beignets, façon fish & chips, du côté des tapas.',
  ],
  categories: [
    {
      titre: 'Le vendredi',
      tirage: 'perche',
      note: 'Jusqu’à épuisement. Réservation conseillée.',
      plats: [
        {
          nom: 'Filets de perche meunière',
          description: 'Sauce tartare maison, pommes frites, légumes du jour.',
          prix: null,
          mentions: ['maison'],
          signature: true,
        },
      ],
    },
  ],
};
