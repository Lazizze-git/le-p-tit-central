import type { Metadata } from 'next';
import type { ReactElement } from 'react';

import { SITE, anneesDExistence } from '@/content/site';
import { LIEU } from '@/content/textes';
import { lienTelephone, typographieFr } from '@/lib/format';
import { jsonLdFilAriane } from '@/lib/jsonld';
import { Bande, SurTitre } from '@/components/ui/Bande';
import { Bouton } from '@/components/ui/Bouton';
import { MediaSlot } from '@/components/ui/MediaSlot';
import { Mur, Ardoise } from '@/components/ui/Mur';
import { Paragraphes } from '@/components/ui/TexteRiche';
import { Reveal } from '@/components/ui/Reveal';

export const metadata: Metadata = {
  title: 'Le lieu & la salle privée',
  description:
    'Salle privée au P’tit Central, rue Centrale 9 à Lausanne : anniversaires, mariages et événements professionnels. Une adresse de quartier depuis plus de 23 ans.',
  alternates: { canonical: '/le-lieu/' },
};

export default function PageLieu(): ReactElement {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdFilAriane([{ nom: 'Le lieu', href: '/le-lieu/' }])),
        }}
      />

      {/* La page qui raconte le lieu s'ouvre sur sa matière : le mur
          d'azulejos en pleine largeur, et le titre dans l'ardoise qui
          le perce. Aucun texte ne touche les carreaux. */}
      <Mur libelle="Le P’tit Central, rue Centrale">
        <Ardoise>
          <SurTitre>{LIEU.sur_titre}</SurTitre>
          <h1 className="t-h2">{LIEU.titre}</h1>
          <p className="t-lead">
            {LIEU.accroche}
          </p>
        </Ardoise>
      </Mur>

      <Bande ton="bleu">
        <div className="flex flex-col gap-[var(--space-block)] lg:flex-row lg:gap-[var(--space-section)]">
          <Reveal className="flex flex-col gap-[var(--space-stack)] lg:w-[55%]">
            <SurTitre>{LIEU.histoire_label}</SurTitre>
            <h2 className="t-h2">{LIEU.histoire_titre}</h2>
            <Paragraphes textes={LIEU.histoire} />
            <p className="t-label border-t border-[var(--rule)] pt-[var(--space-stack)]">
              {anneesDExistence()} ans / {SITE.adresse.rue} / {SITE.adresse.ville}
            </p>
          </Reveal>

          <Reveal rang={1} className="lg:w-[45%]">
            <MediaSlot id="salle-azulejos" />
          </Reveal>
        </div>
      </Bande>

      <Bande id="privatisation">
        <div className="flex flex-col gap-[var(--space-block)]">
          {/* L'emplacement de la salle privée est descendu ici, dans la
              section qui en parle : il y informe, alors qu'en tête de
              page il ne faisait qu'occuper la place. */}
          <div className="flex flex-col gap-[var(--space-block)] lg:flex-row lg:items-start lg:gap-[var(--space-section)]">
            <Reveal className="flex flex-col gap-[var(--space-stack)] lg:w-[55%]">
              <SurTitre>{LIEU.salle_label}</SurTitre>
              <h2 className="t-h2">{LIEU.salle_titre}</h2>
              <Paragraphes textes={LIEU.salle_texte} />
            </Reveal>

            <Reveal rang={1} className="lg:w-[45%]">
              <MediaSlot id="salle-privee" />
            </Reveal>
          </div>

          <ul className="border-t border-[var(--rule)]">
            {LIEU.occasions.map((occasion, index) => (
              <Reveal
                as="li"
                key={occasion.titre}
                rang={index}
                className="grid grid-cols-1 items-baseline gap-[var(--space-hair)] border-b border-[var(--rule)] py-[var(--space-stack)] sm:grid-cols-[minmax(0,18rem)_1fr] sm:gap-[var(--space-stack)]"
              >
                <h3 className="t-h3">{occasion.titre}</h3>
                <p className="t-body">{occasion.detail}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </Bande>

      <Bande ton="encre">
        <Reveal className="flex flex-col gap-[var(--space-stack)]">
          <h2 className="t-h2">{LIEU.demande_titre}</h2>
          <p className="t-body">{typographieFr(LIEU.demande_texte)}</p>
          <div className="flex flex-wrap gap-[var(--space-tight)] pt-[var(--space-tight)]">
            <Bouton href={lienTelephone(SITE.telephone.e164)} principal>
              {SITE.telephone.affichage}
            </Bouton>
            <Bouton href="/contact/#message">Écrire un message</Bouton>
          </div>
        </Reveal>
      </Bande>
    </>
  );
}
