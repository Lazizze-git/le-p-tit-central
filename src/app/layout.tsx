import type { Metadata, Viewport } from 'next';
import { Instrument_Serif, Martian_Mono } from 'next/font/google';
import type { ReactElement, ReactNode } from 'react';

import './globals.css';
import { SITE } from '@/content/site';
import { COMMUN } from '@/content/textes';
import { jsonLdRestaurant, jsonLdSite } from '@/lib/jsonld';
import { Entete } from '@/components/layout/Entete';
import { BarreAction } from '@/components/layout/BarreAction';
import { PiedDePage } from '@/components/layout/PiedDePage';
import { ObservateurScroll } from '@/components/ui/ObservateurScroll';

/* Les deux polices sont téléchargées à la construction du site et
   servies depuis le même domaine : aucun appel à Google au chargement.

   Il y en avait trois. La grotesque a été retirée quand les titres et
   le corps de texte sont passés à la serif peinte du cartouche : elle
   ne servait plus qu'à une lettre décorative, et une famille entière
   pour une lettre est un poids que le visiteur n'a pas à payer. */

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-serif',
});

const martianMono = Martian_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono',
});

const DESCRIPTION =
  'Café et restaurant au centre de Lausanne, rue Centrale 9. Menu du jour, filets de perche tous les vendredis midi, salle privée. Ouvert du lundi au samedi dès 7h.';

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "Le P’tit Central — Café & restaurant à Lausanne",
    template: "%s — Le P’tit Central",
  },
  description: DESCRIPTION,
  applicationName: SITE.nom,
  authors: [{ name: SITE.agence.nom, url: SITE.agence.url }],
  keywords: [
    'restaurant Lausanne',
    'café Lausanne',
    'menu du jour Lausanne',
    'filets de perche Lausanne',
    'rue Centrale Lausanne',
    'salle privée Lausanne',
  ],
  alternates: { canonical: '/' },
  robots: { index: true, follow: true, 'max-image-preview': 'large' },
  openGraph: {
    type: 'website',
    locale: 'fr_CH',
    siteName: SITE.nom,
    title: "Le P’tit Central — Café & restaurant à Lausanne",
    description: DESCRIPTION,
    url: SITE.url,
    images: [
      {
        url: SITE.imageOg,
        width: 1200,
        height: 630,
        alt: `${SITE.nom} — café et restaurant, rue Centrale 9, Lausanne`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Le P’tit Central — Café & restaurant à Lausanne",
    description: DESCRIPTION,
    images: [SITE.imageOg],
  },
  // PAS de `formatDetection` ici : Next écrit `telephone=no, address=no`
  // dès que la clé est présente, quelle que soit sa valeur. Déclarer
  // `true` désactivait donc, sur iPhone, le tap sur l'adresse pour
  // ouvrir Plans et sur le numéro pour appeler. Sans la clé, aucune
  // balise n'est émise et iOS détecte normalement.
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#F4F0E7',
};

export default function RootLayout({
  children,
}: {
  readonly children: ReactNode;
}): ReactElement {
  const classesPolices = `${instrumentSerif.variable} ${martianMono.variable}`;

  return (
    <html lang="fr-CH" className={classesPolices}>
      <head>
        {/* Sans JavaScript, aucun bloc ne doit rester invisible — et le
            surligneur de la carte doit être peint, sinon les titres de
            catégorie restent nus. */}
        <noscript>
          <style>
            {`.reveal{opacity:1!important;transform:none!important}` +
              `.hl{background-size:100% 100%;color:var(--sur-marqueur)}`}
          </style>
        </noscript>
        <script
          type="application/ld+json"
          // Contenu généré depuis nos propres fichiers : aucune saisie extérieure.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdRestaurant()) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSite()) }}
        />
      </head>
      <body>
        <a className="saut-contenu" href="#contenu">
          {COMMUN.aller_au_contenu}
        </a>
        <Entete />
        {/* LE MUR. Tout le site est une paroi d'azulejos sur laquelle
            les sections sont posées comme des plaques peintes. C'est
            ici, et à un seul endroit, que la matière est déclarée.
            `tabIndex={-1}` : sans lui, Safari fait défiler jusqu'à la
            cible du lien d'évitement sans y déplacer le focus clavier. */}
        <main id="contenu" tabIndex={-1} className="mur-page carrelage">
          {children}
        </main>
        <PiedDePage />
        <BarreAction />
        <ObservateurScroll />
      </body>
    </html>
  );
}
