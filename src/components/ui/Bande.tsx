import type { ReactElement, ReactNode } from 'react';

export type TonBande = 'creme' | 'bleu' | 'encre';

interface BandeProps {
  readonly children: ReactNode;
  /** Couleur de la bande. Elle redéfinit toute la gamme pour son contenu. */
  readonly ton?: TonBande;
  /** Identifiant d'ancre (#horaires, #carte…). */
  readonly id?: string;
  /** Version basse, pour les bandes de service (marquee, rappel). */
  readonly serree?: boolean;
  readonly libelle?: string;
}

/**
 * Une section du site : un CARTOUCHE, pavé plein posé sur le mur
 * d'azulejos et cerné d'un double filet gravé. C'est l'unité de
 * composition du site — les blocs se posent directement sur le
 * cartouche, jamais dans une carte à l'intérieur d'une carte.
 */
export function Bande({
  children,
  ton = 'creme',
  id,
  serree = false,
  libelle,
}: BandeProps): ReactElement {
  const classes = ['bande', `bande--${ton}`, serree ? 'bande--serree' : ''].join(' ').trim();

  return (
    <section id={id} className={classes} data-fond={ton} aria-label={libelle}>
      <div className="bande__inner">{children}</div>
    </section>
  );
}

/**
 * Sur-titre en capitales monospace, posé au-dessus de chaque section.
 * Le fleuron qui l'ouvre est prélevé dans le cartouche du logo : c'est
 * le même dessin, à la même main. Purement décoratif — il est peint en
 * fond du pseudo-élément, donc jamais lu à voix haute.
 */
export function SurTitre({ children }: { readonly children: ReactNode }): ReactElement {
  return <p className="sur-titre t-label">{children}</p>;
}
