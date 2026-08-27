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
 * LES DOUZE EMPLACEMENTS PORTENT UNE VRAIE PHOTO DE LA MAISON.
 * Il n'y a plus un seul panneau « C » sur le site. Six tirages viennent
 * du compte Instagram — l'habillage de l'application a été détouré. Les
 * six autres viennent des fichiers d'origine du reportage, livrés en
 * août 2026 : même lumière, même journée, mais une définition propre et
 * aucun recadrage subi. Chaque image est servie en .webp sous 200 Ko.
 *
 * TROIS FORMATS, ET C'EST VOULU. Les tirages Instagram sont tous en
 * portrait, c'est le format de la source. Les fichiers d'origine ont été
 * recadrés à la main sur ce que la légende annonce : le café du matin en
 * carré (une table ronde tient dans un carré, pas dans une colonne), la
 * table dressée en paysage (une table ronde se lit en largeur), la
 * devanture en portrait (l'enseigne est au-dessus de la table, il faut
 * la hauteur). Ce sont eux qui cassent la monotonie des colonnes.
 *
 * RÈGLE SUR `ton` : la couleur d'un panneau ne doit jamais être celle
 * de la bande qui l'accueille, sinon le cadre disparaît dans le fond.
 * Cette valeur ne sert que tant qu'il n'y a pas de photo — elle est
 * conservée pour le jour où l'on retirerait une image.
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
  /* LE SEUL CADRE CARRÉ DU SITE, et c'est le bon endroit pour lui : il
     ouvre la carte sur « En matinée », dans une colonne étroite où un
     portrait de plus aurait fait une troisième colonne de suite. La
     table ronde tient dans le carré comme le bar y tenait.

     ANCIENNEMENT `comptoir`, et le nom a suivi la photo. Le premier
     tirage montrait le bar à travers la vitrine : les reflets mangeaient
     l'image et on ne lisait plus rien. Il n'existe pas, dans le fonds,
     de prise de vue du comptoir depuis la salle — le jour où elle sera
     faite, cet emplacement redeviendra `comptoir`. En attendant, il
     porte ce que la section raconte vraiment : le café de sept heures.
     Le comptoir, lui, reste visible en haut de l'accueil, derrière le
     cappuccino de `comptoir-azulejos`. */
  'cafe-du-matin': {
    src: '/photos/cafe-du-matin.webp',
    alt: 'Un latte macchiato et un expresso sur une table ronde en terrasse, à côté d’un appareil photo posé sur un journal et d’un bouquet dans un pot en faïence portugaise.',
    legende: 'Le café du matin',
    ratio: '1290/1290',
    ton: 'encre',
  },
  /* PAS DE PERCHE ICI : elle a sa propre section trois cartouches plus
     bas, avec son propre tirage. Le premier choix montrait justement une
     assiette de perches vue de dessus — la même chose, deux fois, à
     deux écrans d'intervalle. Celui-ci montre ce que « Repas de midi »
     raconte et qu'aucune autre photo du site ne montre : des gens qui
     mangent. L'ardoise « MENU DU JOUR » est dans le cadre, derrière,
     juste en face de la première catégorie de la section. */
  'salle-midi': {
    src: '/photos/table-de-midi.webp',
    alt: 'Deux clientes attablées près de la vitrine, une salade, une corbeille de pain et une bouteille du merlot de la maison ; derrière, l’ardoise du menu du jour et la rue Centrale.',
    legende: 'Une table, à midi',
    ratio: '1290/1740',
    ton: 'creme',
  },
  'salle-soir': {
    src: '/photos/salle-soir.webp',
    alt: 'Une assiette de poisson et légumes rôtis, roquette et oignons frits, posée sur une table de la salle.',
    legende: 'En salle',
    ratio: '1280/1750',
    ton: 'creme',
  },
  /* Le second tirage de « Repas du soir », en face de « Au verre ».
     La catégorie n'avait que trois lignes au tiret sous une colonne
     vide : trois prix qu'on ne connaît pas et rien à regarder. Cette
     photo est la seule du fonds qui montre un verre en train d'être
     servi — le geste, pas la bouteille posée. Le merlot de la maison
     est dans le cadre, c'est-à-dire la première ligne de la catégorie.

     AUCUN VISAGE, C'EST DEMANDÉ. Le cadre s'arrête aux mains : celle
     qui verse, celle qui tient le verre, celle qui attend avec le sien.
     C'est aussi la « série A » de la DA au mot près — les mains, la
     table en désordre, jamais un produit seul en studio. */
  verre: {
    src: '/photos/verre.webp',
    alt: 'Une bouteille du merlot de la maison versée dans un verre de vin rouge tenu à table ; un second verre déjà servi attend à côté.',
    legende: 'Le merlot de la maison, au verre',
    ratio: '1290/1740',
    ton: 'bleu',
    petit: true,
  },

  /* Le second tirage de « Repas de midi ». La carte réelle a rendu la
     section trois fois plus longue qu'avant : un seul cadre en tête de
     colonne laissait ensuite deux mille pixels de vide à droite des
     mets. Deux tirages empilés tiennent la colonne — et celui-ci
     montre un plat qui est vraiment à la carte, pas une vue d'ambiance
     de plus. */
  truite: {
    src: '/photos/truite.webp',
    alt: 'Une main presse un quartier de citron au-dessus d’un filet de truite saumonée snacké, servi avec semoule, oignons frits, brocolis et légumes d’été.',
    legende: 'Filet de truite saumonée',
    ratio: '1290/1612',
    ton: 'creme',
  },
  perche: {
    src: '/photos/perche.webp',
    alt: 'Filets de perche dorés au beurre et au persil sur une assiette bleue, avec un panier de frites et des légumes.',
    legende: 'Filets de perche, vendredi midi',
    ratio: '1274/1738',
    ton: 'bleu',
  },

  /* ---------- Le lieu ----------
     Deux tirages, deux orientations : la devanture en portrait face à
     l'histoire de la maison, la table dressée en paysage face à la
     privatisation. Deux portraits l'un sous l'autre dans la même
     colonne de 45 % auraient donné une page en accordéon. */
  /* Ce que montre vraiment la photo de la salle privée, c'est UNE TABLE
     DRESSÉE — et la légende le dit. La salle privée elle-même n'a pas
     encore été photographiée ; écrire « La salle privée » sous une
     table de terrasse aurait été un mensonge de légende, exactement ce
     que ce site s'interdit. */
  'salle-privee': {
    src: '/photos/salle-privee.webp',
    alt: 'Une table ronde dressée sur un set Le P’tit Central : couverts, serviettes bleues, carton de réservation et un bouquet dans un pot en faïence portugaise, entre deux chaises de velours rouge.',
    legende: 'Une table dressée, avant le service',
    ratio: '1290/860',
    ton: 'bleu',
  },
  /* Anciennement `salle-azulejos`. L'emplacement a changé de nom en même
     temps que de photo : la page s'ouvre déjà sur un mur d'azulejos en
     pleine largeur, et un deuxième carrelage vingt centimètres plus bas
     ne racontait rien de neuf. L'enseigne, elle, dit « rue Centrale » —
     c'est-à-dire exactement le titre de la section qu'elle accompagne. */
  devanture: {
    src: '/photos/devanture.webp',
    alt: 'Une cliente, appareil photo à la main, à une table en terrasse sous l’enseigne CENTRAL ; sur la table, une bouteille de merlot de la maison, une assiette et une corbeille de pain.',
    legende: 'L’enseigne, rue Centrale',
    ratio: '1290/1720',
    ton: 'creme',
  },
  // `satisfies Record<IdMedia, Media>` : il manque une clé, ou il y en a
  // une de trop, et le site refuse de se construire. Voir types.ts.
} as const satisfies Record<IdMedia, Media>;

/** Récupère un emplacement photo à partir d'un identifiant de contenu. */
export function mediaParNom(nom: IdMedia): Media {
  return MEDIAS[nom];
}
