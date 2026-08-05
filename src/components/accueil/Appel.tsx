import type { ReactElement } from 'react';
import { SITE } from '@/content/site';
import { ACCUEIL } from '@/content/textes';
import { lienTelephone, typographieFr } from '@/lib/format';
import { Bande, SurTitre } from '@/components/ui/Bande';
import { Reveal } from '@/components/ui/Reveal';

/**
 * L'APPEL — dernière bande avant le pied de page.
 * En Suisse romande, la plupart des réservations passent encore par le
 * téléphone. Il est donc écrit en grand, et c'est un lien : un doigt
 * dessus suffit à lancer l'appel.
 */
export function Appel(): ReactElement {
  return (
    <Bande>
      <Reveal className="flex flex-col gap-[var(--space-stack)]">
        <SurTitre>{ACCUEIL.reserver_label}</SurTitre>
        <h2 className="t-h2">{typographieFr(ACCUEIL.reserver_titre)}</h2>
        <p className="t-body">{ACCUEIL.reserver_texte}</p>

        <a
          href={lienTelephone(SITE.telephone.e164)}
          className="t-display lien lien--tenu"
          style={{ marginTop: 'var(--space-tight)', width: 'fit-content' }}
        >
          {SITE.telephone.affichage}
        </a>
      </Reveal>
    </Bande>
  );
}
