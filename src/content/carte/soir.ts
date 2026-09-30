/**
 * REPAS DU SOIR — d'après la carte du soir imprimée (octobre 2026).
 * Les plats communs avec le midi sont dans plats.ts.
 * Mode d'emploi de la carte : voir carte/index.ts.
 */

import type { Moment } from '../types';
import {
  BURGER,
  DAHL,
  DESSERTS,
  ENTREES,
  PARISIENNE,
  RAVIOLIS,
  SALADE_CESAR,
  TARTARE_BOEUF,
  TARTARE_SAUMON,
} from './plats';

export const SOIR: Moment = {
  id: 'soir',
  titre: 'Repas du soir',
  label: 'Ingrédients locaux / Produits de saison / Fait maison',
  horaire: 'Mardi à samedi, 18h30 – 21h30',
  accroche: 'Le soir, on prend le temps que le midi ne permet pas.',
  texte: [
    'Une carte à elle, *plus courte que celle de midi* : deux entrées, sept mets et les desserts.',
    'Le soir y ajoute ce qui se partage : les tapas au milieu de la table, un verre, et le temps de rester. *La carte reste courte — c’est la condition pour qu’elle soit bonne.*',
  ],
  // L'ORDRE EST CELUI DE LA CARTE IMPRIMÉE, mets compris.
  categories: [
    { titre: 'Les entrées', plats: ENTREES },
    {
      titre: 'Les mets',
      plats: [SALADE_CESAR, TARTARE_BOEUF, TARTARE_SAUMON, RAVIOLIS, DAHL, BURGER, PARISIENNE],
    },
    {
      titre: 'Les tapas',
      tirage: 'salle-soir',
      note: 'À partager, servies toute la soirée',
      plats: [
        {
          nom: 'Fish & chips',
          description: 'Filets de perche en beignets, frites, sauce tartare maison et citron.',
          prix: 18,
          mentions: ['maison'],
        },
        { nom: 'Tenders de poulet, sauce piquante', description: '6 pièces.', prix: 14 },
        {
          nom: 'Focaccia façon bruschetta, 3 pièces',
          description:
            'Mozzarella, tomates, aubergines et courgettes (végétarienne) ; ou mozzarella, tomates et jambon cru.',
          prix: 9,
        },
        { nom: 'Focaccia façon bruschetta, 6 pièces', prix: 17 },
        {
          nom: 'Falafels, sauce tzatziki',
          description: 'Du « Prince d’Égypte ». 3 pièces.',
          prix: 6,
          mentions: ['vegetarien'],
        },
        { nom: 'Petite portion de frites', prix: 6, mentions: ['vegetarien'] },
        { nom: 'Grande portion de frites', prix: 8, mentions: ['vegetarien'] },
      ],
    },
    { titre: 'Les desserts', plats: DESSERTS },
    {
      titre: 'Au verre',
      tirage: 'verre',
      plats: [
        {
          nom: 'Le merlot de la maison',
          description: 'Mis en bouteille au nom du P’tit Central.',
          prix: null,
        },
        { nom: 'Vins au verre', prix: null },
        { nom: 'Bières, cocktails et apéritifs', prix: null },
      ],
    },
  ],
};
