import Link from 'next/link';
import type { ReactElement } from 'react';
import { MOMENTS } from '@/content/carte';
import { ACCUEIL } from '@/content/textes';
import { Bande, SurTitre } from '@/components/ui/Bande';
import { Reveal } from '@/components/ui/Reveal';

/**
 * LES QUATRE MOMENTS
 * Une liste à filets plutôt qu'une grille de cartes : la hiérarchie
 * tient au trait et à l'échelle, pas au vide autour.
 */
export function Moments(): ReactElement {
  return (
    <Bande>
      <div className="flex flex-col gap-[var(--space-block)]">
        <Reveal className="flex flex-col gap-[var(--space-tight)]">
          <SurTitre>{ACCUEIL.moments_label}</SurTitre>
          <h2 className="t-h2">{ACCUEIL.moments_titre}</h2>
          <p className="t-body">{ACCUEIL.moments_intro}</p>
        </Reveal>

        <ul className="border-t border-[var(--rule)]">
          {MOMENTS.map((moment, index) => (
            <Reveal as="li" key={moment.id} rang={index}>
              <Link
                href={`/carte/#${moment.id}`}
                className="group grid grid-cols-[1fr_auto] items-baseline gap-x-[var(--space-stack)] gap-y-[var(--space-hair)] border-b border-[var(--rule)] py-[var(--space-stack)] sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto]"
              >
                <span className="t-h2 col-start-1">{moment.titre}</span>
                <span
                  className="t-label col-start-1 sm:col-start-2 sm:justify-self-start"
                  style={{ color: 'var(--fg-muted)' }}
                >
                  {moment.horaire}
                </span>
                <span
                  aria-hidden="true"
                  className="t-h2 col-start-2 row-start-1 self-center justify-self-end sm:col-start-3 transition-[translate] duration-[var(--dur-micro)] group-hover:translate-x-[6px]"
                >
                  →
                </span>
              </Link>
            </Reveal>
          ))}
        </ul>
      </div>
    </Bande>
  );
}
