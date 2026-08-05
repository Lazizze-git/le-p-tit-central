/**
 * Données structurées (JSON-LD) — référencement local.
 *
 * C'est ce que Google lit pour afficher la fiche du restaurant :
 * horaires, adresse, téléphone, position sur la carte. Ces valeurs
 * sont générées à partir des fichiers de contenu : elles ne peuvent
 * pas se désynchroniser de ce qui est affiché sur le site.
 */

import { SEMAINE } from '@/content/horaires';
import { MOMENTS } from '@/content/carte';
import { ADRESSE_UNE_LIGNE, SITE } from '@/content/site';

/** Schema.org n'accepte pas « 24:00 » : minuit s'écrit « 23:59 ». */
function heureSchema(valeur: string): string {
  return valeur === '24:00' ? '23:59' : valeur;
}

function horairesSchema(): readonly object[] {
  return SEMAINE.filter((jour) => jour.etablissement !== null).map((jour) => ({
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: `https://schema.org/${jour.codeSchema}`,
    opens: heureSchema(jour.etablissement?.debut ?? ''),
    closes: heureSchema(jour.etablissement?.fin ?? ''),
  }));
}

/** La carte, déclarée section par section pour être comprise par Google. */
function menuSchema(): object {
  return {
    '@type': 'Menu',
    name: 'La carte du P’tit Central',
    url: `${SITE.url}/carte/`,
    hasMenuSection: MOMENTS.map((moment) => ({
      '@type': 'MenuSection',
      name: moment.titre,
      description: moment.accroche,
      hasMenuItem: moment.categories.flatMap((categorie) =>
        categorie.plats.map((plat) => ({
          '@type': 'MenuItem',
          name: plat.nom,
          ...(plat.description ? { description: plat.description } : {}),
          // Aucune offre n'est déclarée tant que le prix n'est pas
          // confirmé : mieux vaut pas de prix qu'un prix faux.
          ...(plat.prix !== null
            ? { offers: { '@type': 'Offer', price: plat.prix, priceCurrency: 'CHF' } }
            : {}),
        })),
      ),
    })),
  };
}

/** Fiche complète de l'établissement. */
export function jsonLdRestaurant(): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    '@id': `${SITE.url}/#restaurant`,
    name: SITE.nom,
    alternateName: SITE.nomCourt,
    description:
      'Café et restaurant au centre de Lausanne. Menu du jour, filets de perche le vendredi midi, salle privée.',
    url: SITE.url,
    telephone: SITE.telephone.affichage,
    email: SITE.email,
    priceRange: SITE.gammeDePrix,
    currenciesAccepted: 'CHF',
    servesCuisine: ['Suisse', 'Française', 'Brasserie'],
    foundingDate: String(SITE.anneeOuverture),
    address: {
      '@type': 'PostalAddress',
      streetAddress: SITE.adresse.rue,
      postalCode: SITE.adresse.codePostal,
      addressLocality: SITE.adresse.ville,
      addressCountry: SITE.adresse.paysCode,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: SITE.geo.latitude,
      longitude: SITE.geo.longitude,
    },
    hasMap: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      ADRESSE_UNE_LIGNE,
    )}`,
    openingHoursSpecification: horairesSchema(),
    hasMenu: menuSchema(),
    acceptsReservations: 'True',
    sameAs: SITE.reseaux.map((reseau) => reseau.url),
  };
}

/** Fiche du site lui-même : aide Google à rattacher les pages entre elles. */
export function jsonLdSite(): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE.url}/#site`,
    url: SITE.url,
    name: SITE.nom,
    inLanguage: 'fr-CH',
    publisher: { '@id': `${SITE.url}/#restaurant` },
  };
}

/** Fil d'Ariane d'une page interne. */
export function jsonLdFilAriane(
  segments: readonly { readonly nom: string; readonly href: string }[],
): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [{ nom: 'Accueil', href: '/' }, ...segments].map((segment, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: segment.nom,
      item: `${SITE.url}${segment.href}`,
    })),
  };
}
