import Link from 'next/link';
import type { ReactElement } from 'react';
import { LIEN_ITINERAIRE, SITE } from '@/content/site';
import { COMMUN } from '@/content/textes';
import { lienTelephone } from '@/lib/format';
import { Statut } from '@/components/ui/Statut';

/**
 * BARRE D'ACTION MOBILE
 * ------------------------------------------------------------------
 * Elle ne quitte jamais l'écran sur téléphone. C'est elle qui tient la
 * promesse la plus concrète du site : savoir si c'est ouvert, trouver
 * le chemin, et appeler — trois gestes, aucun défilement.
 *
 * Elle disparaît à partir de la tablette, où le téléphone est déjà
 * visible en permanence dans la barre haute collante.
 */
export function BarreAction(): ReactElement {
  return (
    <div className="barre t-label" role="group" aria-label="Actions rapides">
      <Link href="/contact/#horaires" className="barre__cell">
        <Statut avecDetail={false} />
        <span className="sr-only">— voir les horaires</span>
      </Link>

      <a
        href={LIEN_ITINERAIRE}
        className="barre__cell"
        target="_blank"
        rel="noopener noreferrer"
      >
        {COMMUN.plan}
        <span aria-hidden="true">↗</span>
        <span className="sr-only">(nouvelle fenêtre)</span>
      </a>

      <a href={lienTelephone(SITE.telephone.e164)} className="barre__cell barre__cell--action">
        {COMMUN.appeler}
      </a>
    </div>
  );
}
