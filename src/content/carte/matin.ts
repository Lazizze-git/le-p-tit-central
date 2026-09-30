/**
 * EN MATINÉE — la carte des boissons (caféterie, thés, jus).
 * Mode d'emploi de la carte : voir carte/index.ts.
 */

import type { Moment } from '../types';

export const MATIN: Moment = {
  id: 'matin',
  titre: 'En matinée',
  label: 'Café / Jus frais / Thés',
  // Le dimanche est fermé (voir horaires.ts) : ne jamais écrire
  // « tous les jours » ici, la phrase s'affiche aussi sur l'accueil.
  horaire: 'Lundi à samedi, dès 07h00',
  accroche: 'Le café d’abord. Le reste vient après.',
  texte: [
    'Pour l’expresso à l’italienne, la maison a composé son propre mélange : *une sélection des meilleurs cafés du Brésil et d’Amérique centrale.* On le sert au comptoir dès sept heures, debout ou assis, comme vous préférez.',
  ],
  categories: [
    {
      titre: 'La caféterie',
      tirage: 'cafe-du-matin',
      note: 'Mélange maison, torréfaction italienne. Supplément lait végétal : CHF 0.30',
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
      tirage: 'terrasse-matin',
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
};
