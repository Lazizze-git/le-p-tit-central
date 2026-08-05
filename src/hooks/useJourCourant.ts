'use client';

import { useEffect, useState } from 'react';
import type { IndexJour } from '@/content/horaires';
import { lireInstantLocal } from '@/lib/horaires';

/**
 * Jour de la semaine à Lausanne, ou `null` tant que le navigateur n'a
 * pas répondu. Sert à mettre en évidence la ligne du jour dans le
 * tableau des horaires — jamais à cacher une information.
 */
export function useJourCourant(): IndexJour | null {
  const [jour, setJour] = useState<IndexJour | null>(null);

  useEffect(() => {
    const lire = (): void => setJour(lireInstantLocal()?.jour ?? null);
    lire();
    // Un onglet laissé ouvert la nuit doit basculer au jour suivant.
    const minuterie = window.setInterval(lire, 60_000);
    return () => window.clearInterval(minuterie);
  }, []);

  return jour;
}
