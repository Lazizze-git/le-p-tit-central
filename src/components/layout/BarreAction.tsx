import Link from 'next/link';
import type { ReactElement } from 'react';
import { LIEN_ITINERAIRE, SITE } from '@/content/site';
import { COMMUN } from '@/content/textes';
import { lienTelephone } from '@/lib/format';
import { Bouton } from '@/components/ui/Bouton';
import { Statut } from '@/components/ui/Statut';

/**
 * BARRE D'ACTION MOBILE
 * ------------------------------------------------------------------
 * Elle ne quitte jamais l'écran sur téléphone. C'est elle qui tient la
 * promesse la plus concrète du site : savoir si c'est ouvert, trouver
 * le chemin, et appeler — trois gestes, aucun défilement.
 *
 * Une bande crème posée sous la page, détachée d'elle par un filet, et
 * dans laquelle les deux actions sont des pilules — les mêmes boutons
 * que partout ailleurs sur le site. « Appeler » prend la place qui
 * reste : c'est l'action principale.
 *
 * Elle disparaît à partir de la tablette, où le téléphone est déjà
 * visible en permanence dans la barre haute collante.
 */
export function BarreAction(): ReactElement {
  return (
    <div className="barre" role="group" aria-label="Actions rapides">
      <Link href="/contact/#horaires" className="barre__statut">
        <Statut avecDetail={false} />
        <span className="sr-only">— voir les horaires</span>
      </Link>

      <Bouton href={LIEN_ITINERAIRE}>{COMMUN.plan}</Bouton>

      <Bouton href={lienTelephone(SITE.telephone.e164)} principal className="barre__appeler">
        {COMMUN.appeler}
      </Bouton>
    </div>
  );
}
