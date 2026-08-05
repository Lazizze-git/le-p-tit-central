import type { ReactElement } from 'react';
import { ADRESSE_UNE_LIGNE, LIEN_ITINERAIRE } from '@/content/site';

/**
 * PLAN DE SITUATION
 * ------------------------------------------------------------------
 * Un plan dessiné, pas une carte Google incrustée : pas de traceur
 * publicitaire déposé sans consentement, pas de trois cents kilo-octets
 * de script, et un visuel qui appartient à la charte du lieu.
 *
 * Le vrai itinéraire est à un clic, dans l'application de cartes du
 * visiteur — c'est de toute façon ce qu'il ouvrira pour marcher.
 */
export function PlanSchematique(): ReactElement {
  return (
    <figure className="flex flex-col gap-[var(--space-tight)]">
      <a
        href={LIEN_ITINERAIRE}
        target="_blank"
        rel="noopener noreferrer"
        className="block border border-[var(--rule)]"
        aria-label={`Ouvrir l’itinéraire vers ${ADRESSE_UNE_LIGNE} dans une application de cartes (nouvelle fenêtre)`}
      >
        <svg
          viewBox="0 0 400 250"
          role="img"
          aria-labelledby="plan-titre"
          style={{ width: '100%', height: 'auto', display: 'block' }}
        >
          <title id="plan-titre">
            Plan de situation : le P’tit Central se trouve rue Centrale, entre Bel-Air et la
            place de la Palud, au centre de Lausanne.
          </title>

          <g
            stroke="currentColor"
            strokeWidth="1"
            fill="none"
            vectorEffect="non-scaling-stroke"
            opacity="0.55"
          >
            {/* Trame de fond : les rues secondaires */}
            <path d="M0 60h400M0 200h400M60 0v250M180 0v250M300 0v250" />
          </g>

          <g stroke="currentColor" strokeWidth="3" fill="none">
            {/* Rue Centrale — l'axe du lieu */}
            <path d="M12 132h376" />
            {/* Grand-Pont, qui descend depuis Bel-Air */}
            <path d="M12 62l96 62" />
            {/* Rue de la Mercerie, qui monte vers la Cité */}
            <path d="M262 132l44-92" />
          </g>

          {/* Les repères connus */}
          <g fill="currentColor" fontSize="9" letterSpacing="1.4" style={{ textTransform: 'uppercase' }}>
            <text x="14" y="52">BEL-AIR</text>
            <text x="196" y="86">PL. DE LA PALUD</text>
            <text x="300" y="34">LA CITÉ</text>
            <text x="14" y="222">LE FLON</text>
            <text x="196" y="156">RUE CENTRALE</text>
          </g>

          {/* La maison. Le carré est bleu ; son filet crème le détache du
              fond encre, où le bleu seul ne tiendrait que 2.5:1. */}
          <g>
            <rect
              x="150"
              y="118"
              width="28"
              height="28"
              fill="var(--action)"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <text
              x="164"
              y="137"
              fill="var(--sur-action)"
              fontSize="15"
              fontWeight="700"
              textAnchor="middle"
            >
              C
            </text>
          </g>
        </svg>
      </a>

      <figcaption className="t-label" style={{ color: 'var(--fg-muted)' }}>
        Plan de situation — {ADRESSE_UNE_LIGNE}
      </figcaption>
    </figure>
  );
}
