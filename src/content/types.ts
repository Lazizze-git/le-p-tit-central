/**
 * TYPES DU CONTENU
 * ------------------------------------------------------------------
 * Décrit la forme des données de la carte et des médias. Sert de
 * garde-fou : si une donnée est mal saisie, le site refuse de se
 * construire au lieu d'afficher n'importe quoi en ligne.
 */

/** Mentions affichées en petite étiquette à côté d'un plat. */
export type Mention = 'vegetarien' | 'maison' | 'saison' | 'local' | 'sans-gluten';

export const LIBELLE_MENTION: Readonly<Record<Mention, string>> = {
  vegetarien: 'végé',
  maison: 'fait maison',
  saison: 'de saison',
  local: 'local',
  'sans-gluten': 'sans gluten',
};

/**
 * Prix en francs suisses.
 * `null` = pas encore communiqué par la maison : le site affiche un tiret
 * plutôt qu'un montant inventé. Dès que le prix est connu, écrivez le
 * nombre : `prix: 24.5` s'affiche « CHF 24.50 ».
 */
export type Prix = number | null;

export interface Plat {
  readonly nom: string;
  readonly description?: string;
  readonly prix: Prix;
  readonly mentions?: readonly Mention[];
  /** Un plat signature est composé en serif : il sort de la liste. */
  readonly signature?: boolean;
}

export interface Categorie {
  readonly titre: string;
  readonly plats: readonly Plat[];
  /** Précision affichée sous le titre de catégorie. */
  readonly note?: string;
}

/** Identifiants des quatre moments de la journée. Servent aussi d'ancres d'URL. */
export type MomentId = 'matin' | 'midi' | 'soir' | 'perche';

export interface Moment {
  readonly id: MomentId;
  /** Titre affiché en grand. */
  readonly titre: string;
  /** Sur-titre en petites capitales monospace. */
  readonly label: string;
  /** Horaire du service, en clair. */
  readonly horaire: string;
  /** Phrase d'accroche, composée en serif. */
  readonly accroche: string;
  /** Paragraphes du chapô. Le gras s'écrit avec des astérisques : *comme ceci*. */
  readonly texte: readonly string[];
  readonly categories: readonly Categorie[];
  /**
   * Emplacements photo associés (voir content/medias.ts).
   * Un seul le plus souvent ; deux quand le moment mérite une planche
   * de deux tirages côte à côte.
   */
  readonly medias: readonly IdMedia[];
}

/**
 * Dimensions réelles du fichier, en pixels : `'736/928'`.
 * Elles servent à trois choses d'un seul coup — réserver la proportion
 * exacte du cadre, déclarer la taille de l'image au navigateur (aucun
 * saut de page au chargement) et fixer le plafond d'affichage. Une
 * photo n'est jamais agrandie au-delà de sa définition.
 */
export type Dimensions = `${number}/${number}`;

/**
 * LES EMPLACEMENTS PHOTO DU SITE.
 * Cette liste est la source de vérité : `medias.ts` doit fournir
 * exactement ces clés, ni plus ni moins (le `satisfies` l'impose), et
 * tout ce qui désigne une photo se type dessus. Une faute de frappe
 * devient donc une erreur de construction au lieu d'un cadre vide en
 * production.
 */
export type IdMedia =
  | 'comptoir-azulejos'
  | 'ardoise-du-jour'
  | 'terrasse'
  | 'assiette-salade'
  | 'cafe-du-matin'
  | 'salle-midi'
  | 'salle-soir'
  | 'verre'
  | 'truite'
  | 'perche'
  | 'salle-privee'
  | 'devanture';

export interface Media {
  /** Chemin du fichier une fois déposé dans /public/photos. `null` = pas encore de photo. */
  readonly src: string | null;
  /** Description de l'image pour les personnes non voyantes et pour Google. */
  readonly alt: string;
  /** Légende visible sous l'image, en capitales monospace. */
  readonly legende: string;
  /** Largeur et hauteur réelles du fichier, en pixels. */
  readonly ratio: Dimensions;
  /** Ambiance du bloc tant que la photo n'est pas là. Sans effet ensuite. */
  readonly ton: 'creme' | 'bleu' | 'encre';
}
