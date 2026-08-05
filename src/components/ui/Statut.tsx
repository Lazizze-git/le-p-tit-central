'use client';

import type { ReactElement } from 'react';
import { useStatut } from '@/hooks/useStatut';

interface StatutProps {
  /** Ajoute le détail (« jusqu'à 00h00 », « ouvre demain à 07h00 »). */
  readonly avecDetail?: boolean;
  readonly className?: string;
}

/**
 * Pastille « ouvert / fermé », calculée en temps réel à l'heure de
 * Lausanne. `aria-live` annonce le passage d'un état à l'autre aux
 * lecteurs d'écran sans déplacer le focus.
 */
export function Statut({ avecDetail = true, className = '' }: StatutProps): ReactElement {
  const statut = useStatut();

  return (
    <span
      className={`statut t-label ${className}`.trim()}
      data-etat={statut.etat}
      aria-live="polite"
    >
      <span className="statut__point" aria-hidden="true" />
      <span
        style={{
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          minWidth: 0,
        }}
      >
        {statut.libelle}
        {avecDetail && statut.detail ? ` — ${statut.detail}` : ''}
      </span>
    </span>
  );
}
