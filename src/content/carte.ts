/**
 * LA CARTE
 * ------------------------------------------------------------------
 * Pour ajouter un plat : copiez une ligne existante et changez le texte.
 * Pour saisir un prix : remplacez `prix: null` par `prix: 24.5`
 *   → le site affiche « CHF 24.50 ».
 * Tant qu'un prix vaut `null`, le site affiche un tiret et la mention
 *   « prix communiqués sur place » : jamais un montant inventé.
 *
 * DATE_MISE_A_JOUR s'affiche en bas de la carte. Pensez à la changer
 * quand vous modifiez la carte.
 */

import type { Moment } from './types';

export const DATE_MISE_A_JOUR = '05.08.2026';

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
    medias: ['comptoir'],
    categories: [
      {
        titre: 'Le café',
        note: 'Mélange maison, torréfaction italienne',
        plats: [
          {
            nom: 'Expresso',
            description: 'Le mélange de la maison : Brésil et Amérique centrale.',
            prix: null,
            mentions: ['maison'],
          },
          { nom: 'Café crème', prix: null },
          { nom: 'Cappuccino', prix: null },
          { nom: 'Café renversé', prix: null },
        ],
      },
      {
        titre: 'À côté',
        plats: [
          { nom: 'Jus pressé du jour', description: 'Pressé le matin même.', prix: null },
          { nom: 'Thés et infusions', prix: null },
          { nom: 'Chocolat chaud', prix: null },
        ],
      },
    ],
  },

  {
    id: 'midi',
    titre: 'Repas de midi',
    label: 'La simplicité et le goût',
    horaire: 'Lundi à samedi, 11h30 – 14h00',
    accroche: 'Un menu du jour, réécrit chaque matin.',
    texte: [
      'Une cuisine fraîche et équilibrée, préparée avec des ingrédients choisis un par un. *Pensée pour une heure de pause* : vous entrez, vous mangez, vous repartez à temps.',
    ],
    medias: ['salle-midi'],
    categories: [
      {
        titre: 'Le menu du jour',
        note: 'Affiché chaque matin au comptoir et sur Instagram',
        plats: [
          {
            nom: 'Plat du jour',
            description: 'Change tous les jours. Servi jusqu’à 14h00.',
            prix: null,
          },
          {
            nom: 'Assiette végétarienne du jour',
            prix: null,
            mentions: ['vegetarien'],
          },
          { nom: 'Entrée du jour', prix: null },
        ],
      },
      {
        titre: 'À la carte',
        plats: [
          {
            nom: 'Burger du chef',
            description: 'Pain et sauce faits en cuisine, pommes frites.',
            prix: null,
            mentions: ['maison'],
          },
          { nom: 'Salades et assiettes froides', prix: null },
          { nom: 'Desserts', prix: null, mentions: ['maison'] },
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
      'Tout commence par le choix des ingrédients. La maison privilégie des produits frais, sélectionnés un par un, pour une cuisine moderne et sincère.',
      '*Chaque plat est pensé avec simplicité et exigence.* La carte reste courte — c’est la condition pour qu’elle soit bonne.',
    ],
    medias: ['salle-soir', 'entrecote'],
    categories: [
      {
        titre: 'Pour commencer',
        note: 'Selon arrivage',
        plats: [
          { nom: 'Huîtres', description: 'À la pièce ou à la douzaine.', prix: null, mentions: ['saison'] },
          { nom: 'Foie gras', prix: null, mentions: ['saison', 'maison'] },
        ],
      },
      {
        titre: 'Les plats',
        plats: [
          {
            nom: 'Le plat du moment',
            description: 'Il change avec ce qu’on trouve chez les producteurs.',
            prix: null,
            mentions: ['local'],
          },
          {
            nom: 'Burger du chef',
            description: 'Pain et sauce faits en cuisine, pommes frites.',
            prix: null,
            mentions: ['maison'],
          },
        ],
      },
      {
        titre: 'Au verre',
        plats: [
          { nom: 'Bières artisanales', prix: null },
          { nom: 'Cocktails et apéritifs', prix: null },
          { nom: 'Vins au verre', prix: null },
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
