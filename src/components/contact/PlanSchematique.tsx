import type { ReactElement } from 'react';
import { ADRESSE_UNE_LIGNE, LIEN_ITINERAIRE, SITE } from '@/content/site';

/**
 * LA CARTE — une vraie carte, pas un schéma.
 * ------------------------------------------------------------------
 * Il y avait ici un plan dessiné à la main : quatre rues, un
 * quadrillage et un carré bleu. C'était dans la charte, mais ça ne
 * rendait pas service — on ne peut ni zoomer, ni regarder autour, ni
 * comprendre où l'on est quand on ne connaît pas déjà Lausanne. Une
 * adresse mérite une carte qu'on peut vraiment lire.
 *
 * POURQUOI OPENSTREETMAP ET NON GOOGLE MAPS : la carte de Google dépose
 * des cookies de suivi dès l'affichage, ce qui obligerait à poser une
 * bannière de consentement sur tout le site pour une seule vignette.
 * OpenStreetMap n'en dépose aucun, ne réclame aucune clé d'API, et rend
 * exactement le même service. C'est le choix propre pour un site suisse.
 *
 * `loading="lazy"` : la carte ne se charge que si le visiteur descend
 * jusqu'à elle. Elle ne coûte rien à ceux qui ne la regardent pas.
 */

/** Fenêtre affichée autour de l'adresse, en degrés — environ 300 m de côté. */
const RAYON_LON = 0.0035;
const RAYON_LAT = 0.0018;

function urlCarte(): string {
  const { latitude, longitude } = SITE.geo;
  const cadre = [
    longitude - RAYON_LON,
    latitude - RAYON_LAT,
    longitude + RAYON_LON,
    latitude + RAYON_LAT,
  ].join(',');
  return (
    `https://www.openstreetmap.org/export/embed.html?bbox=${cadre}` +
    `&layer=mapnik&marker=${latitude},${longitude}`
  );
}

export function PlanSchematique(): ReactElement {
  return (
    <figure className="flex flex-col gap-[var(--space-tight)]">
      <div className="plan">
        <iframe
          className="plan__carte"
          src={urlCarte()}
          title={`Plan : ${ADRESSE_UNE_LIGNE}`}
          loading="lazy"
          referrerPolicy="no-referrer"
        />
      </div>

      {/* Le lien n'est pas décoratif : si la carte ne se charge pas —
          réseau coupé, bloqueur de contenu —, l'adresse et l'itinéraire
          restent atteignables d'un seul clic. */}
      <figcaption className="slot__legende t-label">
        <a className="lien" href={LIEN_ITINERAIRE} target="_blank" rel="noopener noreferrer">
          {ADRESSE_UNE_LIGNE}
          <span aria-hidden="true"> ↗</span>
        </a>
      </figcaption>
    </figure>
  );
}
