import type { ReactElement } from 'react';
import { LIEN_ITINERAIRE, SITE } from '@/content/site';
import { ACCUEIL, COMMUN, CONTACT } from '@/content/textes';
import { Bande, SurTitre } from '@/components/ui/Bande';
import { Bouton } from '@/components/ui/Bouton';
import { Reveal } from '@/components/ui/Reveal';

/**
 * INFOS PRATIQUES — bande encre.
 * L'adresse est composée à la taille d'un titre : sur un site de
 * restaurant, c'est une des deux informations que les gens viennent
 * réellement chercher.
 */
export function Pratique(): ReactElement {
  return (
    <Bande ton="encre" id="pratique" libelle={ACCUEIL.pratique_titre}>
      <div className="flex flex-col gap-[var(--space-block)]">
        {/* L'adresse EST le titre de cette section : c'est l'information
            que les gens viennent chercher. Elle porte donc le `h2` du
            plan du document, en plus de son `<address>`. */}
        <Reveal className="flex flex-col gap-[var(--space-stack)]">
          <SurTitre>{ACCUEIL.pratique_label}</SurTitre>
          <h2 className="t-display">
            <address style={{ fontStyle: 'normal' }}>
              {SITE.adresse.rue}
              <br />
              {SITE.adresse.codePostal} {SITE.adresse.ville}
            </address>
          </h2>
        </Reveal>

        <Reveal rang={1} className="flex flex-wrap gap-[var(--space-tight)]">
          <Bouton href={LIEN_ITINERAIRE} principal>
            {COMMUN.itineraire}
          </Bouton>
          <Bouton href="/contact/#horaires">{COMMUN.horaires}</Bouton>
        </Reveal>

        {/* Une liste, pas quatre titres : un moyen de transport n'est pas
            une section. Même sémantique que la page contact, qui affiche
            exactement les mêmes données. */}
        <Reveal
          as="ul"
          rang={2}
          className="grid gap-x-[var(--space-block)] gap-y-[var(--space-stack)] sm:grid-cols-2 lg:grid-cols-4"
        >
          {CONTACT.transports.map((transport) => (
            <li key={transport.moyen} className="flex flex-col gap-[var(--space-hair)]">
              <span className="t-label">{transport.moyen}</span>
              <p className="t-small">{transport.detail}</p>
            </li>
          ))}
        </Reveal>
      </div>
    </Bande>
  );
}
