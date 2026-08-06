import type { ReactElement } from 'react';

/**
 * L'annotation manuscrite — une par page, pas davantage.
 *
 * PLUS DE TRAIT SOUS LE TEXTE. Il y avait ici un soulignement ondulé,
 * tracé en vectoriel pour imiter un geste à la main. Posé sous une
 * italique de serif fine, il ne se lisait pas comme un geste mais
 * comme une rature : deux traits qui ondulent l'un sous l'autre, ça
 * fait brouillon. L'italique, le bleu et la légère inclinaison
 * suffisent à dire l'aparté.
 *
 * C'est le seul endroit du site où le bleu porte du texte courant —
 * une fois par page, jamais deux.
 */
export function Annotation({ children }: { readonly children: string }): ReactElement {
  return (
    <span
      className="t-signature"
      style={{
        display: 'inline-block',
        color: 'var(--accent)',
        rotate: '-1.5deg',
        whiteSpace: 'nowrap',
      }}
    >
      {children}
    </span>
  );
}
