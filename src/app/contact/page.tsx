import type { Metadata } from 'next';
import type { ReactElement } from 'react';

import { ADRESSE_UNE_LIGNE, LIEN_ITINERAIRE, SITE } from '@/content/site';
import { COMMUN, CONTACT } from '@/content/textes';
import { lienTelephone, typographieFr } from '@/lib/format';
import { jsonLdFilAriane } from '@/lib/jsonld';
import { Bande, SurTitre } from '@/components/ui/Bande';
import { Bouton } from '@/components/ui/Bouton';
import { Reveal } from '@/components/ui/Reveal';
import { Statut } from '@/components/ui/Statut';
import { TexteRiche } from '@/components/ui/TexteRiche';
import { TableauHoraires } from '@/components/contact/TableauHoraires';
import { PlanSchematique } from '@/components/contact/PlanSchematique';
import { Formulaire } from '@/components/contact/Formulaire';

export const metadata: Metadata = {
  title: 'Contact & réservation',
  description:
    'Réserver au P’tit Central : +41 21 312 80 75, rue Centrale 9 à Lausanne. Horaires complets, accès en métro et en bus, formulaire de contact.',
  alternates: { canonical: '/contact/' },
};

export default function PageContact(): ReactElement {
  const tel = lienTelephone(SITE.telephone.e164);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdFilAriane([{ nom: 'Contact', href: '/contact/' }])),
        }}
      />

      {/* Le téléphone d'abord : c'est ce que les gens viennent chercher. */}
      <Bande>
        <div className="flex flex-col gap-[var(--space-block)]">
          <div className="flex flex-col gap-[var(--space-stack)]">
            <SurTitre>{CONTACT.sur_titre}</SurTitre>
            <h1 className="t-display">{CONTACT.titre}</h1>
            <p className="t-lead">
              {CONTACT.accroche}
            </p>
          </div>

          <div className="flex flex-col gap-[var(--space-stack)] border-t border-[var(--rule)] pt-[var(--space-stack)]">
            <p className="t-label">{CONTACT.telephone_label}</p>
            <a href={tel} className="t-display lien lien--tenu" style={{ width: 'fit-content' }}>
              {SITE.telephone.affichage}
            </a>
            <p className="t-body">{typographieFr(CONTACT.telephone_texte)}</p>
            <Statut />
          </div>

          <div className="flex flex-wrap gap-[var(--space-tight)]">
            <Bouton href={LIEN_ITINERAIRE} principal>
              {COMMUN.itineraire}
            </Bouton>
            <Bouton href={`mailto:${SITE.email}`}>{SITE.email}</Bouton>
          </div>
        </div>
      </Bande>

      <Bande id="horaires">
        <div className="flex flex-col gap-[var(--space-block)]">
          <Reveal className="flex flex-col gap-[var(--space-tight)]">
            <SurTitre>Horaires</SurTitre>
            <h2 className="t-h2">Quand on est là</h2>
          </Reveal>
          <TableauHoraires />
        </div>
      </Bande>

      <Bande ton="encre">
        <div className="flex flex-col gap-[var(--space-block)] lg:flex-row lg:gap-[var(--space-section)]">
          <Reveal className="flex flex-col gap-[var(--space-stack)] lg:w-1/2">
            <SurTitre>{CONTACT.acces_label}</SurTitre>
            <h2 className="t-h2">{CONTACT.acces_titre}</h2>
            <address className="t-body" style={{ fontStyle: 'normal' }}>
              {SITE.adresse.rue}
              <br />
              {SITE.adresse.codePostal} {SITE.adresse.ville}, {SITE.adresse.paysNom}
            </address>

            <ul className="border-t border-[var(--rule)]">
              {CONTACT.transports.map((transport) => (
                <li
                  key={transport.moyen}
                  className="grid grid-cols-1 gap-[2px] border-b border-[var(--rule)] py-[var(--space-tight)] sm:grid-cols-[minmax(0,11rem)_1fr] sm:gap-[var(--space-tight)]"
                >
                  <span className="t-label">{transport.moyen}</span>
                  <span className="t-small">{transport.detail}</span>
                </li>
              ))}
            </ul>

            <Bouton href={LIEN_ITINERAIRE}>{COMMUN.itineraire}</Bouton>
          </Reveal>

          <Reveal rang={1} className="lg:w-1/2">
            <PlanSchematique />
          </Reveal>
        </div>
      </Bande>

      <Bande id="message">
        <div className="flex flex-col gap-[var(--space-block)] lg:flex-row lg:gap-[var(--space-section)]">
          <Reveal className="flex flex-col gap-[var(--space-stack)] lg:w-[38%]">
            <SurTitre>{CONTACT.formulaire_label}</SurTitre>
            <h2 className="t-h2">{CONTACT.formulaire_titre}</h2>
            <p className="t-body">
              <TexteRiche texte={CONTACT.formulaire_texte} />
            </p>
            <p className="t-label" style={{ color: 'var(--fg-muted)' }}>
              {ADRESSE_UNE_LIGNE}
            </p>
          </Reveal>

          <div className="lg:w-[62%]">
            <Formulaire />
          </div>
        </div>
      </Bande>
    </>
  );
}
