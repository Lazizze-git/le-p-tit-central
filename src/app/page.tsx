import type { ReactElement } from 'react';
import { Hero } from '@/components/accueil/Hero';
import { Maison } from '@/components/accueil/Maison';
import { Signature } from '@/components/accueil/Signature';
import { Moments } from '@/components/accueil/Moments';
import { Pratique } from '@/components/accueil/Pratique';
import { Appel } from '@/components/accueil/Appel';
import { Marquee } from '@/components/layout/Marquee';

/**
 * ACCUEIL
 * Intention de l'écran : savoir si c'est ouvert et appeler.
 * Le reste de la page répond aux deux questions suivantes — qu'est-ce
 * qu'on y mange, et comment on y va.
 *
 * Rythme des cartouches : crème / bleu / crème / crème / encre /
 * crème, jamais deux couleurs d'accent qui se suivent. Le mur
 * d'azulejos n'est plus une section : c'est le fond de toute la page,
 * et il se voit entre chaque cartouche.
 */
export default function PageAccueil(): ReactElement {
  return (
    <>
      <Hero />
      <Marquee />
      <Maison />
      <Signature />
      <Moments />
      <Pratique />
      <Appel />
    </>
  );
}
