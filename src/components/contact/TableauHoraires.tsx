'use client';

import type { ReactElement } from 'react';
import { FERMETURES, SEMAINE, type JourHoraire, type Plage } from '@/content/horaires';
import { plageEnTexte } from '@/lib/horaires';
import { useJourCourant } from '@/hooks/useJourCourant';

type Service = 'etablissement' | 'cuisineMidi' | 'cuisineSoir';

function valeur(jour: JourHoraire, service: Service): string {
  const plage: Plage | null = jour[service];
  return plage ? plageEnTexte(plage) : 'Fermé';
}

function Tableau({
  titre,
  service,
  jourCourant,
}: {
  readonly titre: string;
  readonly service: Service;
  readonly jourCourant: number | null;
}): ReactElement {
  return (
    <div className="flex flex-col gap-[var(--space-tight)]">
      <h3 className="t-label">{titre}</h3>
      <dl className="horaires">
        {SEMAINE.map((jour) => (
          <div
            key={jour.index}
            className="horaires__ligne t-label"
            data-aujourdhui={jour.index === jourCourant}
          >
            <dt>
              {jour.nom}
              {jour.index === jourCourant && <span className="sr-only"> (aujourd’hui)</span>}
            </dt>
            <dd className="horaires__valeur">{valeur(jour, service)}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

/**
 * Les horaires en clair : l'établissement d'un côté, la cuisine de
 * l'autre. Beaucoup de visiteurs arrivent à 15h en pensant pouvoir
 * manger — la distinction est donc affichée, pas sous-entendue.
 *
 * La ligne du jour est mise en évidence côté navigateur : une page
 * statique ne peut pas savoir quel jour on est au moment de la lecture.
 */
export function TableauHoraires(): ReactElement {
  const jourCourant = useJourCourant();

  return (
    <div className="flex flex-col gap-[var(--space-block)]">
      <div className="grid gap-[var(--space-block)] lg:grid-cols-3">
        <Tableau titre="L’établissement" service="etablissement" jourCourant={jourCourant} />
        <Tableau titre="Cuisine, midi" service="cuisineMidi" jourCourant={jourCourant} />
        <Tableau titre="Cuisine, soir" service="cuisineSoir" jourCourant={jourCourant} />
      </div>

      {FERMETURES.length > 0 && (
        <div className="flex flex-col gap-[var(--space-hair)] border-t border-[var(--rule)] pt-[var(--space-stack)]">
          <h3 className="t-label">Fermetures à venir</h3>
          <ul className="flex flex-col gap-[var(--space-hair)]">
            {FERMETURES.map((fermeture) => (
              <li key={fermeture.debut} className="t-small">
                {fermeture.motif} — du {fermeture.debut} au {fermeture.fin}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
