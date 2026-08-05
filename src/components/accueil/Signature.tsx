import type { ReactElement } from 'react';
import { ACCUEIL, COMMUN } from '@/content/textes';
import { Bande, SurTitre } from '@/components/ui/Bande';
import { Annotation } from '@/components/ui/Annotation';
import { Bouton } from '@/components/ui/Bouton';
import { MediaSlot } from '@/components/ui/MediaSlot';
import { Reveal } from '@/components/ui/Reveal';
import { TexteRiche } from '@/components/ui/TexteRiche';

/**
 * LA SIGNATURE DE LA MAISON
 * Le seul plat qui mérite sa propre section. C'est ce que les gens
 * cherchent le vendredi matin, et c'est ce qui distingue l'adresse.
 */
export function Signature(): ReactElement {
  return (
    <Bande>
      <div className="flex flex-col gap-[var(--space-block)] lg:flex-row-reverse lg:items-center lg:gap-[var(--space-section)]">
        <Reveal className="lg:w-[45%]">
          <MediaSlot id="perche" />
        </Reveal>

        <Reveal rang={1} className="flex flex-col gap-[var(--space-stack)] lg:w-[55%]">
          <SurTitre>{ACCUEIL.signature_label}</SurTitre>

          <h2 className="t-h2">
            <span className="hl">Filets de perche</span>
            <br />
            tous les vendredis midi
          </h2>

          <p className="t-body">
            <TexteRiche texte={ACCUEIL.signature_texte} />
          </p>

          <p style={{ marginTop: 'var(--space-hair)' }}>
            <Annotation>{ACCUEIL.signature_note}</Annotation>
          </p>

          <div className="flex flex-wrap gap-[var(--space-tight)] pt-[var(--space-tight)]">
            <Bouton href="/carte/#perche">{COMMUN.voir_la_carte}</Bouton>
          </div>
        </Reveal>
      </div>
    </Bande>
  );
}
