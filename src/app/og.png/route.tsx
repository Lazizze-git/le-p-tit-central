import { ImageResponse } from 'next/og';
import { ADRESSE_UNE_LIGNE, SITE } from '@/content/site';

/**
 * IMAGE DE PARTAGE — /og.png
 * ------------------------------------------------------------------
 * C'est l'image qui apparaît quand quelqu'un partage le site sur
 * WhatsApp, Instagram, Facebook ou iMessage.
 *
 * Composition graphique : aplat bleu, le « C » de Central en très
 * grand, le nom et l'adresse. Elle est dessinée, pas photographiée,
 * donc elle est juste dès aujourd'hui.
 *
 * POUR LA REMPLACER PAR UNE VRAIE PHOTO plus tard : déposez un fichier
 * 1200 × 630 px dans public/ (par exemple `og-photo.jpg`) et écrivez
 * son chemin dans `imageOg`, dans src/content/site.ts. Rien d'autre.
 */

/** L'image est fabriquée une seule fois, à la construction du site. */
export const dynamic = 'force-static';

const TAILLE = { width: 1200, height: 630 };
const CREME = '#F4F0E7';
const BLEU = '#2A4A8F';

export function GET(): ImageResponse {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          background: BLEU,
          color: CREME,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Le « C », rogné par le bord droit — le même signe que sur le site. */}
        <svg
          width="760"
          height="760"
          viewBox="0 0 100 100"
          style={{ position: 'absolute', right: -170, top: -70 }}
        >
          <path
            d="M78 26a32 32 0 1 0 0 48"
            fill="none"
            stroke={CREME}
            strokeWidth="15"
            opacity="0.28"
          />
        </svg>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: 72,
            width: '100%',
          }}
        >
          <div style={{ display: 'flex', fontSize: 26, letterSpacing: 5 }}>
            CAFÉ / CUISINE / LAUSANNE
          </div>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', fontSize: 60, letterSpacing: -1 }}>LE P’TIT</div>
            <div style={{ display: 'flex', fontSize: 168, fontWeight: 800, letterSpacing: -6 }}>
              CENTRAL
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: 28,
              letterSpacing: 3,
              borderTop: `2px solid ${CREME}`,
              paddingTop: 26,
            }}
          >
            <span>{ADRESSE_UNE_LIGNE.toUpperCase()}</span>
            <span>{SITE.telephone.affichage}</span>
          </div>
        </div>
      </div>
    ),
    TAILLE,
  );
}
