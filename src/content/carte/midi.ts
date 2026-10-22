/**
 * REPAS DE MIDI — d'après la carte du midi imprimée (octobre 2026).
 * Les plats communs avec le soir sont dans plats.ts.
 * Mode d'emploi de la carte : voir carte/index.ts.
 */

import type { Moment } from '../types';
import {
  BURGER,
  CHASSE,
  CURRY,
  DESSERTS,
  ENTREES,
  PARISIENNE,
  SALADE_CESAR,
  TARTARE_BOEUF,
} from './plats';

export const MIDI: Moment = {
  id: 'midi',
  titre: 'Repas de midi',
  label: 'La simplicité et le goût',
  horaire: 'Lundi à samedi, 11h30 – 14h00',
  accroche: 'Un menu du jour à l’ardoise, et la carte au complet.',
  texte: [
    'Une cuisine fraîche et équilibrée, préparée avec des ingrédients choisis un par un. *Pensée pour une heure de pause* : vous entrez, vous mangez, vous repartez à temps.',
    '*Le menu du jour est réécrit chaque matin* et annoncé à l’ardoise. La carte, elle, suit les saisons.',
  ],
  categories: [
    {
      titre: 'Le menu du jour',
      note: 'Réécrit chaque matin, annoncé au comptoir et sur Instagram',
      plats: [
        {
          nom: 'Plat du jour',
          description: 'Change tous les jours. Servi jusqu’à 14h00.',
          prix: null,
        },
      ],
    },
    { titre: 'Les entrées', plats: ENTREES },
    {
      titre: 'Mets froids',
      tirage: 'salle-midi',
      plats: [
        {
          nom: 'Salade de chèvre chaud',
          description:
            'Salade verte, chèvre chaud sur pain grillé, miel, crudités, figues séchées et noix.',
          prix: 24,
          mentions: ['vegetarien'],
        },
        {
          nom: 'Salade de poulet tiède',
          description: 'Salade verte, poulet mariné au curry, poivrons sautés et crudités.',
          prix: 24,
          mentions: ['sans-gluten'],
        },
        SALADE_CESAR,
        TARTARE_BOEUF,
        {
          nom: 'Tartare de saumon',
          description:
            'Coupé au couteau, marinade au citron vert et à l’aneth. Pains grillés et pommes frites.',
          prix: 29,
          mentions: ['maison'],
        },
      ],
    },
    {
      titre: 'Mets chauds',
      tirage: 'truite',
      plats: [
        BURGER,
        {
          nom: 'Filet de truite saumonée',
          description:
            'Snacké, sauce maison au champagne et citron vert, riz parfumé et légumes du jour.',
          prix: 29,
          mentions: ['sans-gluten', 'maison'],
        },
        CURRY,
        PARISIENNE,
      ],
    },
    CHASSE,
    { titre: 'Les desserts', plats: DESSERTS },
  ],
};
