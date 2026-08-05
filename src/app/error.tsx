'use client';

import type { ReactElement } from 'react';
import { SITE } from '@/content/site';
import { COMMUN, ERREURS } from '@/content/textes';
import { lienTelephone } from '@/lib/format';
import { SurTitre } from '@/components/ui/Bande';
import { Bouton } from '@/components/ui/Bouton';
import { Mur, Ardoise } from '@/components/ui/Mur';

/**
 * Page d'erreur. Elle reste dans la charte et, surtout, elle laisse
 * toujours une porte de sortie : le téléphone de la maison.
 */
/*
 * Il n'y a volontairement AUCUNE remontée d'erreur ici. La version
 * précédente émettait un événement `ptc:erreur` que personne n'écoutait :
 * du code mort qui donnait l'illusion d'un suivi. Le jour où un vrai
 * collecteur est branché (Sentry ou autre), c'est ici qu'il se pose.
 */
export default function PageErreur({
  reset,
}: {
  readonly error: Error & { digest?: string };
  readonly reset: () => void;
}): ReactElement {
  return (
    <Mur>
      <Ardoise>
        <SurTitre>Erreur</SurTitre>
        <h1 className="t-h2">{ERREURS.page_erreur_titre}</h1>
        <p className="t-body">{ERREURS.page_erreur_texte}</p>

        <div className="flex flex-wrap gap-[var(--space-tight)]">
          <button type="button" className="btn" onClick={reset}>
            {ERREURS.reessayer}
          </button>
          <Bouton href="/">{ERREURS.retour_accueil}</Bouton>
          <Bouton href={lienTelephone(SITE.telephone.e164)} principal>
            {COMMUN.appeler} — {SITE.telephone.affichage}
          </Bouton>
        </div>
      </Ardoise>
    </Mur>
  );
}
