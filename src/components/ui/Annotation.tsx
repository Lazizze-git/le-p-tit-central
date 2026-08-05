import type { ReactElement } from 'react';

/**
 * L'annotation manuscrite — une par page, pas davantage.
 *
 * Le trait est un tracé vectoriel dessiné pour la maison, pas une
 * police « écriture » : la direction artistique interdit les scripts.
 * Le texte reste du vrai texte, donc lisible et indexable.
 *
 * C'est le seul endroit du site où le bleu porte du texte courant —
 * une fois par page, jamais deux.
 */
export function Annotation({ children }: { readonly children: string }): ReactElement {
  return (
    <span
      className="t-signature"
      style={{
        position: 'relative',
        display: 'inline-block',
        color: 'var(--accent)',
        rotate: '-1.5deg',
        whiteSpace: 'nowrap',
      }}
    >
      {children}
      <svg
        aria-hidden="true"
        viewBox="0 0 200 12"
        preserveAspectRatio="none"
        style={{
          position: 'absolute',
          left: '-2%',
          bottom: '-0.35em',
          width: '104%',
          height: '0.4em',
        }}
      >
        <path
          d="M2 8C34 3 58 9 92 5c30-3 52 4 82 1"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}
