import type { CSSProperties, ReactElement, ReactNode } from 'react';

interface RevealProps {
  readonly children: ReactNode;
  /** Rang dans une séquence : 0, 1, 2… Le décalage est de 60 ms. */
  readonly rang?: number;
  readonly className?: string;
  readonly as?: 'div' | 'ul' | 'li' | 'article' | 'header';
}

const DECALAGE_MS = 60;
const RANG_MAX = 4; // Au-delà de 5 éléments, la séquence traîne.

/**
 * Marque un bloc pour la révélation au défilement.
 *
 * Le composant ne fait qu'apposer une classe : c'est
 * `ObservateurScroll` qui déclenche l'apparition. Si le script ne se
 * charge pas, ou si le visiteur a demandé moins d'animation, le bloc
 * s'affiche normalement — rien ne peut rester invisible.
 */
export function Reveal({
  children,
  rang = 0,
  className = '',
  as: Balise = 'div',
}: RevealProps): ReactElement {
  const delai = Math.min(rang, RANG_MAX) * DECALAGE_MS;
  const style = { '--reveal-delai': `${delai}ms` } as CSSProperties;

  return (
    <Balise className={`reveal ${className}`.trim()} style={style}>
      {children}
    </Balise>
  );
}
