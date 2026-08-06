/**
 * LES EMPLACEMENTS PHOTO
 * ==================================================================
 * Chaque bloc image du site est décrit ici, et nulle part ailleurs.
 *
 * DEUX ÉTATS POSSIBLES
 *   src: '/photos/…'  → la photo s'affiche.
 *   src: null         → le site affiche à la place le « C » de Central
 *                       en très grand. Ce n'est pas un trou : c'est un
 *                       panneau graphique qui tient debout tout seul.
 *
 * `ratio` PORTE LES DIMENSIONS RÉELLES DU FICHIER, en pixels.
 * Exemple : une photo de 736 × 928 px s'écrit  ratio: '736/928'.
 * Ces deux nombres font tout le travail :
 *   — le cadre prend exactement la proportion du fichier, donc aucune
 *     photo n'est rognée n'importe comment ;
 *   — la place est réservée avant le chargement, donc la page ne
 *     sursaute pas ;
 *   — la photo n'est JAMAIS affichée plus large que ce chiffre. Une
 *     image de 186 px étirée sur un écran entier serait illisible.
 *
 * POUR REMPLACER UNE PHOTO :
 *   1. Déposez le fichier dans  public/photos/
 *   2. Changez `src` et `ratio` (les dimensions se lisent dans le
 *      Finder, colonne « Dimensions »).
 *   3. Relisez `alt` : il doit décrire la photo réellement déposée.
 * Rien d'autre à toucher.
 *
 * SEPT EMPLACEMENTS SUR ONZE PORTENT UNE VRAIE PHOTO de la maison.
 * Elles viennent du compte Instagram du P'tit Central : l'habillage de
 * l'application a été détouré, et chaque image est servie en .webp sous
 * 200 Ko. Toutes sont en portrait — c'est le format d'Instagram, pas un
 * choix de mise en page : le jour d'un vrai reportage, on pourra enfin
 * cadrer une terrasse en paysage.
 *
 * LES QUATRE RESTANTS AFFICHENT LE « C » DE CENTRAL. Ce ne sont pas des
 * trous : ce sont les vues qui manquent encore au fonds — la devanture,
 * la salle vide, la salle privée dressée. Mieux vaut le panneau qu'une
 * photo qui ne montre pas ce que la légende annonce.
 *
 * RÈGLE SUR `ton` : la couleur d'un panneau ne doit jamais être celle
 * de la bande qui l'accueille, sinon le cadre disparaît dans le fond.
 * Cette valeur ne sert que tant qu'il n'y a pas de photo.
 */

import type { IdMedia, Media } from './types';

export const MEDIAS = {
  /* ---------- Accueil, haut de page ----------
     Les deux cadres du haut de page se partagent la largeur du pavé,
     dans un rapport de deux tiers / un tiers : la terrasse en grand,
     l'entrée en petit. L'écart est porté par les deux `ratio` — 1800
     contre 900 de large — et il doit être conservé le jour du dépôt.

     LA TERRASSE EST EN PAYSAGE, ET C'EST DÉLIBÉRÉ. En portrait, un
     cadre qui remplit les deux tiers de la colonne devient plus haut
     qu'un écran : on ne voit plus la photo, on la traverse. Le paysage
     la ramène à une hauteur qu'on embrasse d'un coup d'œil — et c'est
     de toute façon le cadrage naturel d'une terrasse. */
  /* Le tirage à droite du logo. C'est LA photo qui montre d'où vient le
     bleu de tout ce site : les fresques du comptoir sont là, derrière le
     café du matin. Placée là exprès, à hauteur du cartouche peint.
     ELLE NE S'AFFICHE QU'À PARTIR DU GRAND ÉCRAN : sur téléphone, la
     colonne n'existe pas et le logo occupe déjà toute la largeur. */
  'comptoir-azulejos': {
    src: '/photos/comptoir-azulejos.webp',
    alt: 'Un cappuccino et deux croissants sur une table du café ; derrière, le comptoir et les grandes fresques d’azulejos bleu et blanc.',
    legende: 'Le comptoir, sous les azulejos',
    ratio: '1286/1746',
    ton: 'bleu',
  },
  terrasse: {
    src: '/photos/terrasse.webp',
    alt: 'Un burger au pain noir, une salade de saison et un mojito sur une table en terrasse, en plein soleil.',
    legende: 'En terrasse, rue Centrale',
    ratio: '1286/1748',
    ton: 'encre',
  },
  'assiette-salade': {
    src: '/photos/assiette-salade.webp',
    alt: 'Une assiette bleue de salade au poulet pané, copeaux de fromage, tomates et crème de balsamique, apportée en salle.',
    legende: 'Une assiette de midi',
    ratio: '1196/1750',
    ton: 'bleu',
  },

  /* ---------- La carte ----------
     En tête de page, à droite du titre : sans elle, le premier
     cartouche de la carte n'est qu'une colonne de texte et la moitié
     droite reste vide. Portrait, parce que c'est une colonne. */
  'ardoise-du-jour': {
    src: '/photos/ardoise-du-jour.webp',
    alt: 'La carte du P’tit Central posée sur une table, à côté d’un renversé, d’un journal et d’un appareil photo.',
    legende: 'La carte, au café du matin',
    ratio: '1282/1738',
    ton: 'bleu',
  },
  comptoir: {
    src: null,
    alt: 'Le comptoir en bois et laiton : bouteilles, piles d’assiettes, ardoises manuscrites au plafond et azulejos bleus au mur.',
    legende: 'Le comptoir',
    ratio: '1600/1600',
    ton: 'encre',
  },
  'salle-midi': {
    src: '/photos/salle-midi.webp',
    alt: 'Une table de midi vue de dessus : filets de perche et frites dans leur panier, sauce tartare, corbeille de pain et carafe d’eau.',
    legende: 'Une table, à midi',
    ratio: '1282/1740',
    ton: 'creme',
  },
  'salle-soir': {
    src: '/photos/salle-soir.webp',
    alt: 'Une assiette de poisson et légumes rôtis, roquette et oignons frits, posée sur une table de la salle.',
    legende: 'En salle',
    ratio: '1280/1750',
    ton: 'creme',
  },
  entrecote: {
    src: null,
    alt: 'Une assiette d’entrecôte tranchée avec crevettes grillées, sauce et purée.',
    legende: 'Un plat du soir',
    ratio: '1800/1200',
    ton: 'creme',
  },
  perche: {
    src: '/photos/perche.webp',
    alt: 'Filets de perche dorés au beurre et au persil sur une assiette bleue, avec un panier de frites et des légumes.',
    legende: 'Filets de perche, vendredi midi',
    ratio: '1274/1738',
    ton: 'bleu',
  },

  /* ---------- Le lieu ---------- */
  'salle-privee': {
    src: null,
    alt: 'La salle privée du P’tit Central, dressée pour un événement.',
    legende: 'La salle privée',
    ratio: '1800/1200',
    ton: 'bleu',
  },
  'salle-azulejos': {
    src: null,
    alt: 'Une table de quatre dressée le long d’une grande fresque d’azulejos figurant un village portugais.',
    legende: 'La maison, le long des azulejos',
    ratio: '1600/2000',
    ton: 'creme',
  },
  // `satisfies Record<IdMedia, Media>` : il manque une clé, ou il y en a
  // une de trop, et le site refuse de se construire. Voir types.ts.
} as const satisfies Record<IdMedia, Media>;

/** Récupère un emplacement photo à partir d'un identifiant de contenu. */
export function mediaParNom(nom: IdMedia): Media {
  return MEDIAS[nom];
}
