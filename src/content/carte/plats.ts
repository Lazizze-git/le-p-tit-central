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

import type { Categorie, Plat } from '../types';

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

export const BURGER: Plat = {
  nom: 'Burger du P’tit',
  description:
    'Pur bœuf ou falafel du « Prince d’Égypte », sauce maison, cheddar, salade, tomate, frites et petite salade verte.',
  prix: 25,
  mentions: ['maison', 'vegetarien'],
};

export const CURRY: Plat = {
  nom: 'Curry végétarien',
  description: 'Boulgour parfumé, curry, lait de coco et petits légumes.',
  prix: 26,
  mentions: ['vegetarien'],
};

export const PARISIENNE: Plat = {
  nom: 'Parisienne de bœuf',
  description: 'Grillée, sauce maison aux trois poivres, pommes frites et légumes du jour.',
  prix: 33,
  mentions: ['sans-gluten', 'maison'],
};

/** La carte de chasse est la même à midi et le soir. */
export const CHASSE: Categorie = {
  titre: 'La chasse',
  note: 'Garniture chasse : spätzli maison, chou rouge braisé, marrons caramélisés, choux de Bruxelles vapeur, poire pochée au porto et à la vanille, confiture d’airelles',
  plats: [
    { nom: 'Médaillons de cerf', description: 'Sauce grand veneur et garniture chasse.', prix: 36 },
    { nom: 'Civet de chevreuil', description: 'Sauce grand veneur et garniture chasse.', prix: 32 },
    { nom: 'Chasse bredouille', description: 'La garniture chasse, sans la viande.', prix: 27 },
  ],
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
  { nom: 'Mousse aux marrons', prix: 9.5 },
  {
    nom: 'Fondant au chocolat',
    description: 'Crème montée à la pistache et à la vanille.',
    prix: 9.5,
  },
];
