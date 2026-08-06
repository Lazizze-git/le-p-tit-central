'use client';

import { useEffect, useState } from 'react';

/**
 * Faut-il escamoter la barre haute ?
 *
 * Vrai quand le visiteur descend dans la page, faux dès qu'il remonte.
 * Le composant n'a qu'à recopier cette réponse dans un attribut : c'est
 * le CSS qui décide de ce que « cachée » veut dire, et il ne l'applique
 * qu'au format téléphone.
 *
 * DEUX GARDE-FOUS, ET ILS COMPTENT :
 *
 *  — `SEUIL_HAUT` : au-dessus de cette hauteur de page, la barre reste
 *    toujours visible. Sans lui, un micro-défilement dans les premiers
 *    pixels la ferait clignoter dès l'arrivée sur le site.
 *
 *  — `SEUIL_GESTE` : il faut un vrai geste, pas un tremblement. Sous ce
 *    nombre de pixels, rien ne bouge. C'est ce qui empêche la barre de
 *    vibrer sur les défilements élastiques d'iOS, où la position repart
 *    en arrière de deux ou trois pixels à chaque rebond.
 *
 * La lecture de la position est repoussée dans une frame d'animation :
 * on ne mesure jamais la page pendant que le navigateur défile, sous
 * peine de le forcer à tout recalculer à chaque pixel.
 */
const SEUIL_HAUT = 120;
const SEUIL_GESTE = 8;

export function useBarreAuDefilement(): boolean {
  const [cachee, setCachee] = useState(false);

  useEffect(() => {
    let precedent = window.scrollY;
    let enAttente = false;

    const mesurer = (): void => {
      enAttente = false;
      const courant = window.scrollY;
      const ecart = courant - precedent;

      if (Math.abs(ecart) < SEUIL_GESTE) return;

      // Le haut de page ne cache jamais la barre : c'est là qu'on
      // cherche la navigation, et l'élastique d'iOS y passe en négatif.
      setCachee(courant > SEUIL_HAUT && ecart > 0);
      precedent = courant;
    };

    const auDefilement = (): void => {
      if (enAttente) return;
      enAttente = true;
      window.requestAnimationFrame(mesurer);
    };

    window.addEventListener('scroll', auDefilement, { passive: true });
    return () => window.removeEventListener('scroll', auDefilement);
  }, []);

  return cachee;
}
