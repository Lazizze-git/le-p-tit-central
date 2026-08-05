import type { Metadata } from 'next';
import Link from 'next/link';
import type { ReactElement } from 'react';

import { DATE_MISE_A_JOUR, MOMENTS } from '@/content/carte';
import { COMMUN } from '@/content/textes';
import { SITE } from '@/content/site';
import { lienTelephone } from '@/lib/format';
import { jsonLdFilAriane } from '@/lib/jsonld';
import type { TonBande } from '@/components/ui/Bande';
import { Bande, SurTitre } from '@/components/ui/Bande';
import { Bouton } from '@/components/ui/Bouton';
import { MomentCarte } from '@/components/carte/MomentCarte';
import { MediaSlot } from '@/components/ui/MediaSlot';

export const metadata: Metadata = {
  title: 'La carte',
  description:
    'La carte du P’tit Central à Lausanne : café du matin, menu du jour, repas du soir et les filets de perche du vendredi midi. Rue Centrale 9.',
  alternates: { canonical: '/carte/' },
};

/** Couleur de chaque bande : jamais deux accents identiques qui se suivent. */
const TONS: Readonly<Record<string, TonBande>> = {
  matin: 'creme',
  midi: 'bleu',
  soir: 'encre',
  perche: 'creme',
};

export default function PageCarte(): ReactElement {
  const auMoinsUnPrixManquant = MOMENTS.some((moment) =>
    moment.categories.some((categorie) =>
      categorie.plats.some((plat) => plat.prix === null),
    ),
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdFilAriane([{ nom: 'La carte', href: '/carte/' }])),
        }}
      />

      {/* Deux colonnes dès la tablette : le texte à gauche, l'ardoise du
          jour à droite. Sur une seule colonne, la moitié droite du
          cartouche restait vide sur toute sa hauteur. */}
      <Bande>
        <div className="flex flex-col gap-[var(--space-block)] lg:flex-row lg:gap-[var(--space-section)]">
          <div className="flex flex-col gap-[var(--space-block)] lg:w-[58%]">
            <div className="flex flex-col gap-[var(--space-stack)]">
              <SurTitre>La carte / {DATE_MISE_A_JOUR.slice(-4)}</SurTitre>
              <h1 className="t-display">La carte</h1>
              <p className="t-lead">
                Quatre moments dans la journée, et un rendez-vous le vendredi.
              </p>
            </div>

            {/* Sommaire : sur mobile, il évite de faire défiler la carte
              entière pour trouver le service qui intéresse. */}
            <nav aria-label="Les moments de la carte">
              <ul className="flex flex-wrap gap-[var(--space-hair)]">
                {MOMENTS.map((moment) => (
                  <li key={moment.id}>
                    <Link href={`#${moment.id}`} className="btn">
                      {moment.titre}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {auMoinsUnPrixManquant && (
              <p
                className="t-small border-t border-b border-[var(--rule)] py-[var(--space-stack)]"
                style={{ maxWidth: 'var(--max-text)' }}
              >
                {COMMUN.prix_indisponibles}{' '}
                <a className="lien lien--tenu" href={lienTelephone(SITE.telephone.e164)}>
                  {SITE.telephone.affichage}
                </a>
              </p>
            )}
          </div>

          <div className="lg:w-[42%]">
            <MediaSlot id="ardoise-du-jour" prioritaire />
          </div>
        </div>
      </Bande>

      {MOMENTS.map((moment) => (
        <MomentCarte key={moment.id} moment={moment} ton={TONS[moment.id] ?? 'creme'} />
      ))}

      <Bande serree>
        <div className="flex flex-col gap-[var(--space-stack)] sm:flex-row sm:items-center sm:justify-between">
          <p className="t-label" style={{ color: 'var(--fg-muted)' }}>
            {COMMUN.mise_a_jour} {DATE_MISE_A_JOUR}
          </p>
          <Bouton href={lienTelephone(SITE.telephone.e164)} principal>
            {COMMUN.reserver}
          </Bouton>
        </div>
      </Bande>
    </>
  );
}
