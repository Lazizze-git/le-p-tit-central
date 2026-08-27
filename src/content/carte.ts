/**
 * LA CARTE
 * ------------------------------------------------------------------
 * Saisie d'après les cartes imprimées de la maison (août 2026) : la
 * carte pliée du restaurant (entrées / mets froids / mets chauds /
 * desserts), la carte de terrasse qui ajoute les tapas, et la carte des
 * boissons (caféterie / thés et infusions / jus de fruits).
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
 * OÙ EST RANGÉE LA CARTE. Les plats ne sont écrits qu'UNE FOIS, sous
 * « Repas de midi », parce que c'est la même carte à midi et le soir et
 * qu'une liste écrite deux fois se contredit au premier changement de
 * prix. « Repas du soir » porte ce qui lui est propre : les tapas et
 * les verres — et le dit en toutes lettres dans son chapô.
 *
 * DATE_MISE_A_JOUR s'affiche en bas de la carte. Pensez à la changer
 * quand vous modifiez la carte.
 */

import type { Moment } from './types';

export const DATE_MISE_A_JOUR = '27.08.2026';

export const MOMENTS: readonly Moment[] = [
  {
    id: 'matin',
    titre: 'En matinée',
    label: 'Café / Jus frais / Thés',
    // Le dimanche est fermé (voir horaires.ts) : ne jamais écrire
    // « tous les jours » ici, la phrase s'affiche aussi sur l'accueil.
    horaire: 'Lundi à samedi, dès 07h00',
    accroche: 'Le café d’abord. Le reste vient après.',
    texte: [
      'Pour l’expresso à l’italienne, la maison a composé son propre mélange : *une sélection des meilleurs cafés du Brésil et d’Amérique centrale.* On le sert au comptoir dès sept heures, debout ou assis, comme vous voulez.',
    ],
    medias: ['cafe-du-matin', 'terrasse-matin'],
    categories: [
      {
        titre: 'La caféterie',
        note: 'Mélange maison, torréfaction italienne. Lait végétal + 0.30',
        // L'ORDRE EST CELUI DE LA CARTE IMPRIMÉE, y compris le chocolat
        // et le lait au milieu des cafés : c'est le classement de la
        // maison, et le remettre « dans l'ordre » ferait croire à une
        // erreur de saisie là où il n'y en a pas.
        plats: [
          {
            nom: 'Café, expresso, ristretto',
            description: 'Le mélange de la maison : Brésil et Amérique centrale.',
            prix: 4,
            mentions: ['maison'],
          },
          { nom: 'Expresso macchiato', prix: 4.2 },
          { nom: 'Chocolat chaud ou Ovomaltine', prix: 4.2 },
          { nom: 'Mocca', prix: 6 },
          { nom: 'Renversé', prix: 4.6 },
          { nom: 'Cappuccino', prix: 4.8 },
          { nom: 'Café ou chocolat viennois', prix: 5.2 },
          { nom: 'Latte macchiato', prix: 5.5 },
          { nom: 'Double expresso', prix: 5.5 },
          { nom: 'Chaï latte', prix: 5.5 },
          { nom: 'Dirty chaï', prix: 7.5 },
          { nom: 'Café froid', prix: 5.5 },
          { nom: 'Flat white', prix: 6.2 },
          { nom: 'Lait chaud ou froid', prix: 3.8 },
        ],
      },
      {
        titre: 'Thés et infusions',
        // QUATORZE PARFUMS AU MÊME PRIX. Écrits un par un, c'est
        // quatorze lignes qui répètent « CHF 4.20 » et une page deux
        // fois plus longue pour la même information. Les noms sont donc
        // dans la description : Google les lit, le visiteur les balaie
        // d'un coup d'œil, et le prix ne s'écrit qu'une fois.
        plats: [
          {
            nom: 'Thés',
            description:
              'Noir Darjeeling ou Earl Grey, vert oriental, cannelle, thé des Moines, jasmin, vanille, amoureux aux fruits rouges, gingembre.',
            prix: 4.2,
          },
          {
            nom: 'Infusions',
            description: 'Cynorrhodon, menthe, tilleul, verveine, camomille, rooibos.',
            prix: 4.2,
          },
          {
            nom: 'Limonade maison, chaude',
            description: 'Citron frais pressé, jus de gingembre et miel.',
            prix: 5.8,
            mentions: ['maison'],
          },
          { nom: 'PomPom chaud', prix: 5 },
        ],
      },
      {
        titre: 'Jus de fruits',
        plats: [
          { nom: 'Jus d’orange frais pressé, 1 dl', prix: 3.5 },
          { nom: 'Jus d’orange frais pressé, 2 dl', prix: 5.8 },
          { nom: 'Jus de pomme du marché, 2 dl', prix: 3.5 },
          { nom: 'Jus de pomme du marché, 3 dl', prix: 4.5 },
          {
            nom: 'Jus Granini en bouteille, 2 dl',
            description: 'Abricot, orange, tomate, ananas, poire ou pêche.',
            prix: 4.9,
          },
          { nom: 'Jus au verre, 2 dl', description: 'Pêche ou orange.', prix: 4 },
        ],
      },
    ],
  },

  {
    id: 'midi',
    titre: 'Repas de midi',
    label: 'La simplicité et le goût',
    horaire: 'Lundi à samedi, 11h30 – 14h00',
    accroche: 'Un menu du jour à l’ardoise, et la carte au complet.',
    texte: [
      'Une cuisine fraîche et équilibrée, préparée avec des ingrédients choisis un par un. *Pensée pour une heure de pause* : vous entrez, vous mangez, vous repartez à temps.',
      '*La carte ci-dessous est servie à midi et le soir.* Seul le menu du jour change : il est réécrit chaque matin et annoncé à l’ardoise.',
    ],
    medias: ['salle-midi', 'truite'],
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
      {
        titre: 'Les entrées',
        plats: [
          { nom: 'Petite salade mêlée', prix: 6, mentions: ['vegetarien'] },
          { nom: 'Gaspacho maison', prix: 7, mentions: ['vegetarien', 'maison', 'saison'] },
        ],
      },
      {
        titre: 'Mets froids',
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
          {
            nom: 'Pastèque et burrata',
            description:
              'Pastèque, burrata crémeuse, tomates anciennes, sauce chimichurri, basilic et vinaigre balsamique blanc.',
            prix: 25,
            mentions: ['vegetarien', 'sans-gluten', 'saison'],
          },
          {
            nom: 'Bowl du P’tit',
            description:
              'Salade verte, avocat, riz parfumé et crudités. Au choix : saumon fumé, poulet ou falafel.',
            prix: 26,
            mentions: ['sans-gluten'],
          },
          {
            nom: 'Salade César',
            description:
              'Salade verte, tenders de poulet, copeaux de grana padano, croûtons et sauce césar.',
            prix: 26,
          },
          {
            nom: 'Tartare de bœuf',
            description: 'Coupé au couteau, marinade, pains grillés et pommes frites.',
            prix: 32,
            mentions: ['maison'],
          },
          {
            nom: 'Tartare de saumon',
            description:
              'Coupé au couteau, marinade au citron, concombre et aneth, pains grillés et pommes frites.',
            prix: 29,
            mentions: ['maison'],
          },
        ],
      },
      {
        titre: 'Mets chauds',
        plats: [
          {
            nom: 'Burger du P’tit',
            description:
              'Pur bœuf ou falafel du « Prince d’Égypte », sauce maison, cheddar, salade, tomate, frites et petite salade verte.',
            prix: 25,
            mentions: ['maison', 'vegetarien'],
          },
          {
            nom: 'Filet de truite saumonée',
            description:
              'Snacké, sauce vierge façon thaï aux herbes fraîches et légumes d’été.',
            prix: 29,
            mentions: ['sans-gluten', 'saison'],
          },
          {
            nom: 'Raviolis au pesto maison',
            description:
              'Pesto basilic maison, burrata crémeuse, tomates cerises confites, roquette, pignons torréfiés et crème balsamique.',
            prix: 27,
            mentions: ['vegetarien', 'maison'],
          },
          {
            nom: 'Rumsteak de bœuf grillé',
            description: 'Pommes frites, légumes du jour et sauce chimichurri maison.',
            prix: 33,
            mentions: ['sans-gluten', 'maison'],
          },
        ],
      },
      {
        titre: 'Les desserts',
        plats: [
          { nom: 'Tarte maison', prix: 5.5, mentions: ['maison'] },
          { nom: 'Cannelés, nature ou coco', prix: 3.5 },
          { nom: 'Brownie chocolat', prix: 4.2 },
          {
            nom: 'Glaces artisanales',
            description:
              'Petit pot. Chocolat, pistache, caramel salé, café, noisette, stracciatella, vanille, abricot, fraise, mangue.',
            prix: 5.8,
          },
          { nom: 'Tiramisu maison', prix: 9.5, mentions: ['maison'] },
          {
            nom: 'Panna cotta aux fruits rouges et à la menthe',
            prix: 9.5,
            mentions: ['maison'],
          },
        ],
      },
    ],
  },

  {
    id: 'soir',
    titre: 'Repas du soir',
    label: 'Ingrédients locaux / Produits de saison / Fait maison',
    horaire: 'Mardi à samedi, 19h00 – 22h00',
    accroche: 'Le soir, on prend le temps que le midi ne permet pas.',
    texte: [
      '*La carte de midi est servie jusqu’à 22h00* — entrées, mets froids, mets chauds et desserts, sans changement.',
      'Le soir y ajoute ce qui se partage : les tapas au milieu de la table, un verre, et le temps de rester. *La carte reste courte — c’est la condition pour qu’elle soit bonne.*',
    ],
    medias: ['salle-soir', 'verre'],
    categories: [
      {
        titre: 'Les tapas',
        note: 'À partager, servis toute la soirée',
        plats: [
          {
            nom: 'Fish & chips',
            description:
              'Filets de perche en beignets, frites, sauce tartare maison et citron.',
            prix: 18,
            mentions: ['maison'],
          },
          {
            nom: 'Tenders de poulet, sauce piquante',
            description: '6 pièces.',
            prix: 14,
          },
          {
            nom: 'Focaccia façon bruschetta, 3 pièces',
            description:
              'Mozzarella, tomates, aubergines et courgettes ; ou mozzarella, tomates et jambon cru.',
            prix: 9,
          },
          { nom: 'Focaccia façon bruschetta, 6 pièces', prix: 17 },
          {
            nom: 'Falafel, sauce tsatsiki',
            description: 'Du « Prince d’Égypte ». 3 pièces.',
            prix: 6,
            mentions: ['vegetarien'],
          },
          { nom: 'Petite portion de frites', prix: 6, mentions: ['vegetarien'] },
          { nom: 'Grande portion de frites', prix: 8, mentions: ['vegetarien'] },
        ],
      },
      {
        titre: 'Au verre',
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
  },

  {
    id: 'perche',
    titre: 'Filets de perche',
    label: 'Tous les vendredis midi',
    horaire: 'Vendredi, 11h30 – 14h00',
    accroche: 'Filets de perche meunière, sauce tartare maison.',
    texte: [
      'Pommes frites et légumes du jour. *Tous les vendredis midi depuis plus de vingt-trois ans* — c’est la seule chose ici qui ne change jamais.',
      'Le reste de la semaine, la perche se retrouve en beignets, façon fish & chips, du côté des tapas.',
    ],
    medias: ['perche'],
    categories: [
      {
        titre: 'Le vendredi',
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
  },
];

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
