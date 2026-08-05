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
 * ⚠️  AUCUNE PHOTO N'EST EN PLACE POUR L'INSTANT, ET C'EST VOULU.
 * Les vignettes basse définition de la fiche Google ont été retirées :
 * un reportage photo va les remplacer. Chaque emplacement affiche donc
 * le « C » de Central en très grand — un bloc graphique qui tient
 * debout tout seul, et non un trou en attente.
 *
 * LES `ratio` CI-DESSOUS SONT DONC DES FORMATS CIBLES, pas les
 * dimensions d'un fichier existant : ils disent au photographe dans
 * quel sens cadrer, et ils donnent dès aujourd'hui au cadre la place
 * exacte que la photo occupera. Trois formats, et pas un de plus :
 *   1600 × 2000  portrait      1800 × 1200  paysage      1600 × 1600  carré
 * Le jour du dépôt, ces nombres sont remplacés par les dimensions
 * réelles du fichier et la mise en page ne bouge pas d'un pixel.
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
  /* Le grand tirage à droite du logo, en haut de page. Portrait, parce
     qu'il tient dans une colonne d'un tiers à côté du cartouche peint.
     IL NE S'AFFICHE QU'À PARTIR DU GRAND ÉCRAN : sur téléphone, la
     colonne n'existe pas et le logo occupe déjà toute la largeur. */
  devanture: {
    src: null,
    alt: 'La devanture du P’tit Central rue Centrale : l’enseigne, les grandes vitres et les tables de la terrasse.',
    legende: 'Rue Centrale, la devanture',
    ratio: '1600/2000',
    ton: 'bleu',
  },
  terrasse: {
    src: null,
    alt: 'Deux clientes attablées en terrasse rue Centrale, boissons fraîches et café, la rue et ses arbres en arrière-plan.',
    legende: 'La terrasse, rue Centrale',
    ratio: '1800/1200',
    ton: 'encre',
  },
  // Nommé d'après ce qu'on y voit, et non « azulejos » : ce nom-là
  // désigne désormais le mur carrelé de /photos/azulejos.webp, qui
  // n'est pas un emplacement photo mais une matière de fond.
  portemanteau: {
    src: null,
    alt: 'Un portemanteau en fer forgé devant une fresque d’azulejos bleu et blanc, sous des ampoules à filament.',
    legende: 'En entrant',
    ratio: '900/1200',
    ton: 'bleu',
  },

  /* ---------- La carte ----------
     En tête de page, à droite du titre : sans elle, le premier
     cartouche de la carte n'est qu'une colonne de texte et la moitié
     droite reste vide. Portrait, parce que c'est une colonne. */
  'ardoise-du-jour': {
    src: null,
    alt: 'L’ardoise du menu du jour, écrite à la craie et accrochée au mur de la salle.',
    legende: 'L’ardoise du jour',
    ratio: '1600/2000',
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
    src: null,
    alt: 'La salle vue depuis une table : le bar, le grand mur d’ardoises manuscrites et les chaises bistrot en bois courbé.',
    legende: 'La salle, avant le service',
    ratio: '1600/2000',
    ton: 'creme',
  },
  'salle-soir': {
    src: null,
    alt: 'La salle en soirée, tables dressées et fresque d’azulejos au mur.',
    legende: 'Le soir, en salle',
    ratio: '1600/2000',
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
    src: null,
    alt: 'Assiette de filets de perche meunière, sauce tartare, frites et légumes.',
    legende: 'Filets de perche, vendredi midi',
    ratio: '1800/1200',
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
