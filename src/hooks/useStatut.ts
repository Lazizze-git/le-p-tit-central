'use client';

import { useEffect, useState } from 'react';
import { calculerStatut, lireInstantLocal, type Statut } from '@/lib/horaires';

/** Le statut se recalcule toutes les 30 secondes : la bascule
 *  ouvert/fermé se voit sans recharger la page. */
const INTERVALLE_MS = 30_000;

const STATUT_INITIAL: Statut = { etat: 'inconnu', libelle: 'Horaires', detail: null };

/**
 * Statut d'ouverture calculé à l'heure de Lausanne, côté navigateur.
 *
 * Il n'est volontairement pas calculé au moment de la construction du
 * site : une page statique construite un mardi à 10h afficherait
 * « ouvert » pour toujours. Tant que le navigateur n'a pas répondu,
 * on affiche un repli neutre — jamais une information fausse.
 */
export function useStatut(): Statut {
  const [statut, setStatut] = useState<Statut>(STATUT_INITIAL);

  useEffect(() => {
    let actif = true;

    const rafraichir = (): void => {
      if (!actif) return;
      setStatut(calculerStatut(lireInstantLocal()));
    };

    rafraichir();
    const minuterie = window.setInterval(rafraichir, INTERVALLE_MS);

    // Retour d'onglet : l'heure a pu changer pendant l'absence.
    const surVisibilite = (): void => {
      if (document.visibilityState === 'visible') rafraichir();
    };
    document.addEventListener('visibilitychange', surVisibilite);

    return () => {
      actif = false;
      window.clearInterval(minuterie);
      document.removeEventListener('visibilitychange', surVisibilite);
    };
  }, []);

  return statut;
}
