'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

/**
 * Pilote deux des cinq animations du site :
 *  — la révélation des blocs à l'entrée dans l'écran ;
 *  — le fond de page qui prend la couleur de la bande traversée, ce
 *    qui donne, en défilant sur mobile, la sensation d'un imprimé
 *    qu'on feuillette.
 *
 * Aucune couleur n'est écrite ici : la teinte est relue sur la bande
 * elle-même, donc elle suit automatiquement les jetons du système.
 */
export function ObservateurScroll(): null {
  const chemin = usePathname();

  useEffect(() => {
    const racine = document.documentElement;

    // --- Révélation des blocs, une seule fois par élément ---
    const aReveler = document.querySelectorAll<HTMLElement>('.reveal, .hl');
    const observateurReveal = new IntersectionObserver(
      (entrees) => {
        for (const entree of entrees) {
          if (!entree.isIntersecting) continue;
          entree.target.setAttribute('data-vu', 'true');
          observateurReveal.unobserve(entree.target);
        }
      },
      { threshold: 0.2, rootMargin: '0px 0px -8% 0px' },
    );
    aReveler.forEach((element) => observateurReveal.observe(element));

    // --- Le fond de page suit la bande qui occupe le milieu de l'écran ---
    // `[data-fond]` seul, et non `.bande[data-fond]` : le mur d'azulejos
    // n'est pas une bande de couleur mais il occupe l'écran comme une
    // section, et il doit lui aussi donner sa couleur au fond de page —
    // sinon le rebond de défilement laisse apparaître la teinte de la
    // section précédente.
    const bandes = document.querySelectorAll<HTMLElement>('[data-fond]');
    const observateurFond = new IntersectionObserver(
      (entrees) => {
        for (const entree of entrees) {
          if (!entree.isIntersecting) continue;
          const couleur = window.getComputedStyle(entree.target).backgroundColor;
          if (couleur) racine.style.setProperty('--fond-page', couleur);
        }
      },
      // Ne se déclenche qu'au passage de la ligne médiane de l'écran.
      { threshold: 0, rootMargin: '-50% 0px -50% 0px' },
    );
    bandes.forEach((bande) => observateurFond.observe(bande));

    return () => {
      observateurReveal.disconnect();
      observateurFond.disconnect();
    };
    // Le chemin en dépendance : après une navigation, on ré-observe
    // les blocs de la nouvelle page.
  }, [chemin]);

  return null;
}
