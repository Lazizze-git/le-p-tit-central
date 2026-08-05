import Link from 'next/link';
import type { ReactElement, ReactNode } from 'react';

interface BoutonProps {
  readonly children: ReactNode;
  /** Destination. Absente = vrai bouton (formulaire). */
  readonly href?: string;
  /**
   * Aplat bleu : l'action principale de l'écran. Une seule par écran —
   * c'est ce qui lui donne sa force, le bleu n'étant plus doublé par
   * une seconde couleur de signal.
   */
  readonly principal?: boolean;
  /** Occupe toute la largeur disponible (mobile). */
  readonly plein?: boolean;
  readonly type?: 'button' | 'submit';
  readonly disabled?: boolean;
  readonly className?: string;
}

function classes({ principal, plein, className }: Partial<BoutonProps>): string {
  return ['btn', principal ? 'btn--action' : '', plein ? 'btn--plein' : '', className ?? '']
    .filter(Boolean)
    .join(' ');
}

/**
 * Bouton unique du site. Il devient un lien interne, un lien externe
 * (téléphone, itinéraire, réseaux) ou un vrai bouton selon ce qu'on lui
 * donne — l'élément HTML reste toujours sémantiquement juste.
 */
export function Bouton(props: BoutonProps): ReactElement {
  const { children, href, type = 'button', disabled } = props;
  const cls = classes(props);

  if (href === undefined) {
    return (
      <button type={type} className={cls} disabled={disabled}>
        {children}
      </button>
    );
  }

  const interne = href.startsWith('/') || href.startsWith('#');
  if (interne) {
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  }

  const sortant = href.startsWith('http');
  return (
    <a
      href={href}
      className={cls}
      {...(sortant ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {children}
      {sortant && <span aria-hidden="true">↗</span>}
      {sortant && <span className="sr-only">(nouvelle fenêtre)</span>}
    </a>
  );
}
