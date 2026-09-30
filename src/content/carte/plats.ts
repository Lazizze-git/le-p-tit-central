/**
 * LES PLATS SERVIS À MIDI ET LE SOIR
 * ------------------------------------------------------------------
 * Ces plats figurent sur les deux cartes imprimées. Ils ne sont écrits
 * qu'ICI, une seule fois : une liste recopiée deux fois se contredit au
 * premier changement de prix. Modifier un plat ici le modifie donc à
 * midi ET le soir.
 *
 * Un plat servi à un seul moment s'écrit directement dans midi.ts ou
 * soir.ts.
 */

import type { Plat } from '../types';

export const ENTREES: readonly Plat[] = [
  { nom: 'Petite salade mêlée', prix: 6, mentions: ['vegetarien', 'sans-gluten'] },
  { nom: 'Crème de légumes', prix: 7, mentions: ['vegetarien', 'sans-gluten'] },
];

export const SALADE_CESAR: Plat = {
  nom: 'Salade César',
  description: 'Salade verte, tenders de poulet, copeaux de grana padano, croûtons et sauce césar.',
  prix: 26,
};

export const TARTARE_BOEUF: Plat = {
  nom: 'Tartare de bœuf',
  description: 'Coupé au couteau et mariné. Pains grillés et pommes frites.',
  prix: 32,
  mentions: ['maison'],
};

export const TARTARE_SAUMON: Plat = {
  nom: 'Tartare de saumon',
  description:
    'Coupé au couteau, marinade aux agrumes et pommes vertes. Pains grillés et pommes frites.',
  prix: 29,
  mentions: ['maison'],
};

export const BURGER: Plat = {
  nom: 'Burger du P’tit',
  description:
    'Pur bœuf ou falafel du « Prince d’Égypte », sauce maison, cheddar, salade, tomate, frites et petite salade verte.',
  prix: 25,
  mentions: ['maison', 'vegetarien'],
};

export const DAHL: Plat = {
  nom: 'Dahl de lentilles corail',
  description:
    'Sauce au curry jaune et lait de coco, noisettes torréfiées et copeaux de noix de coco.',
  prix: 27,
  mentions: ['vegetarien', 'sans-gluten'],
};

export const RAVIOLIS: Plat = {
  nom: 'Raviolis à la courge',
  description: 'Courge rôtie, crème de grana padano, noisettes torréfiées et ricotta.',
  prix: 27,
  mentions: ['vegetarien', 'saison'],
};

export const PARISIENNE: Plat = {
  nom: 'Parisienne de bœuf',
  description: 'Grillée, sauce maison aux trois poivres, pommes frites et légumes du jour.',
  prix: 33,
  mentions: ['sans-gluten', 'maison'],
};

export const DESSERTS: readonly Plat[] = [
  { nom: 'Tarte maison', prix: 5.5, mentions: ['maison'] },
  { nom: 'Cannelés, nature ou coco', prix: 3.5 },
  { nom: 'Brownie au chocolat', prix: 4.2 },
  {
    nom: 'Glaces artisanales',
    description:
      'En petit pot : chocolat, caramel salé, café, noisette, vanille, fraise, fruits exotiques.',
    prix: 5.8,
  },
  { nom: 'Tiramisu maison', prix: 9.5, mentions: ['maison'] },
  {
    nom: 'Fondant au chocolat',
    description: 'Crème montée à la pistache et à la vanille.',
    prix: 9.5,
  },
];
