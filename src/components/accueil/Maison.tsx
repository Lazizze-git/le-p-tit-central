import type { ReactElement } from 'react';
import { anneesDExistence } from '@/content/site';
import { ACCUEIL } from '@/content/textes';
import { Bande, SurTitre } from '@/components/ui/Bande';
import { Paragraphes } from '@/components/ui/TexteRiche';
import { Reveal } from '@/components/ui/Reveal';

const CHIFFRES: readonly { readonly intitule: string; readonly valeur: string }[] = [
  { intitule: 'Années', valeur: String(anneesDExistence()) },
  { intitule: 'Jours par semaine', valeur: '6' },
  { intitule: 'Ouverture', valeur: '07h00' },
];

/** Bande bleue : qui on est, en trois phrases et un chiffre. */
export function Maison(): ReactElement {
  return (
    <Bande ton="bleu">
      <div className="flex flex-col gap-[var(--space-block)] lg:flex-row lg:gap-[var(--space-section)]">
        <Reveal className="flex flex-col gap-[var(--space-stack)] lg:w-1/2">
          <SurTitre>{ACCUEIL.intro_label}</SurTitre>
          <h2 className="t-h2">{ACCUEIL.intro_titre}</h2>
        </Reveal>

        <Reveal rang={1} className="flex flex-col gap-[var(--space-block)] lg:w-1/2">
          <Paragraphes textes={ACCUEIL.intro} className="t-body-grand" />

          {/* Chiffre au-dessus, intitulé en dessous : les trois valeurs
              s'alignent alors sur la même ligne de base, même quand un
              intitulé passe sur deux lignes. Le chiffre reste plus petit
              que le titre de section — il précise, il ne prend pas la
              parole à sa place. */}
          <dl
            className="grid grid-cols-3 gap-x-[var(--space-stack)] gap-y-[var(--space-hair)] border-t border-[var(--rule)] pt-[var(--space-stack)]"
            style={{ gridTemplateRows: 'auto auto' }}
          >
            {CHIFFRES.map((chiffre) => (
              // Grille imbriquée : les trois chiffres partagent une ligne et
              // les trois intitulés une autre, même quand l'un d'eux passe
              // sur deux lignes. L'ordre du code reste intitulé puis valeur,
              // comme l'exige une liste de définitions.
              <div
                key={chiffre.intitule}
                className="row-span-2 grid grid-rows-subgrid gap-y-[var(--space-hair)]"
              >
                <dt className="t-label" style={{ gridRow: 2 }}>
                  {chiffre.intitule}
                </dt>
                <dd className="t-h3" style={{ gridRow: 1 }}>
                  {chiffre.valeur}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </Bande>
  );
}
