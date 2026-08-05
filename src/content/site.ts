/**
 * COORDONNÉES DE L'ÉTABLISSEMENT
 * ------------------------------------------------------------------
 * Un seul endroit à modifier pour l'adresse, le téléphone, l'email et
 * les réseaux. Ces valeurs alimentent le site ET les données envoyées
 * à Google (référencement local). Elles doivent être strictement
 * identiques à la fiche Google Business Profile.
 */

export interface Adresse {
  readonly rue: string;
  readonly codePostal: string;
  readonly ville: string;
  /** Code pays ISO à 2 lettres, requis par Google. */
  readonly paysCode: string;
  readonly paysNom: string;
}

export interface Telephone {
  /** Version lisible, affichée à l'écran. */
  readonly affichage: string;
  /** Version internationale sans espace, pour le lien « Appeler ». */
  readonly e164: string;
}

export interface Reseau {
  readonly nom: string;
  readonly url: string;
}

export interface Site {
  readonly nom: string;
  readonly nomCourt: string;
  readonly baseline: string;
  /** URL finale du site, sans barre oblique de fin. */
  readonly url: string;
  readonly adresse: Adresse;
  readonly geo: { readonly latitude: number; readonly longitude: number };
  readonly telephone: Telephone;
  readonly email: string;
  readonly reseaux: readonly Reseau[];
  /** Année d'ouverture, sert à calculer « X ans » automatiquement. */
  readonly anneeOuverture: number;
  readonly gammeDePrix: '$' | '$$' | '$$$' | '$$$$';
  /**
   * Image affichée quand le site est partagé sur WhatsApp, Instagram
   * ou Facebook. Par défaut, une image dessinée est fabriquée
   * automatiquement. Pour la remplacer par une photo : déposez un
   * fichier 1200 × 630 px dans public/ et écrivez ici son chemin,
   * par exemple '/og.jpg'.
   */
  readonly imageOg: string;
  readonly agence: { readonly nom: string; readonly url: string };
}

export const SITE: Site = {
  nom: "Le P’tit Central",
  nomCourt: "P’tit Central",
  baseline: 'Café · Restaurant',
  url: 'https://www.lepetitcentral.ch',

  adresse: {
    rue: 'Rue Centrale 9',
    codePostal: '1003',
    ville: 'Lausanne',
    paysCode: 'CH',
    paysNom: 'Suisse',
  },

  // Coordonnées de la Rue Centrale 9 à Lausanne.
  // À CONFIRMER : reprendre la position exacte de la fiche Google Business Profile.
  geo: { latitude: 46.52107, longitude: 6.63297 },

  telephone: {
    affichage: '+41 21 312 80 75',
    e164: '+41213128075',
  },

  email: 'ptitcentral@gmail.com',

  reseaux: [
    { nom: 'Instagram', url: 'https://instagram.com/leptitcentral/' },
    { nom: 'Facebook', url: 'https://facebook.com/LEPTITCENTRAL/' },
  ],

  anneeOuverture: 2003,
  gammeDePrix: '$$',
  imageOg: '/og.png',

  agence: { nom: 'WeAreBrothers', url: 'https://www.wearebrothers.ch' },
};

/** « Rue Centrale 9, 1003 Lausanne » — une ligne, pour les liens et le JSON-LD. */
export const ADRESSE_UNE_LIGNE = `${SITE.adresse.rue}, ${SITE.adresse.codePostal} ${SITE.adresse.ville}`;

/** Lien d'itinéraire universel (ouvre Plans sur iPhone, Maps sur Android). */
export const LIEN_ITINERAIRE = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
  `${ADRESSE_UNE_LIGNE}, ${SITE.adresse.paysNom}`,
)}`;

/** Nombre d'années d'existence, recalculé à chaque build. */
export function anneesDExistence(): number {
  return new Date().getFullYear() - SITE.anneeOuverture;
}
