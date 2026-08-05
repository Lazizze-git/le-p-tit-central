import type { ReactElement } from 'react';
import type { Moment } from '@/content/types';
import { typographieFr } from '@/lib/format';
import { Bande, SurTitre } from '@/components/ui/Bande';
import type { TonBande } from '@/components/ui/Bande';
import { LignePlat } from '@/components/carte/LignePlat';
import { MediaSlot } from '@/components/ui/MediaSlot';
import { Paragraphes } from '@/components/ui/TexteRiche';
import { Reveal } from '@/components/ui/Reveal';

interface MomentCarteProps {
  readonly moment: Moment;
  readonly ton: TonBande;
}

/**
 * Un moment de la journée sur la page carte.
 *
 * Le titre de catégorie est surligné : l'aplat se tire de gauche à
 * droite quand la catégorie entre dans l'écran. Ce n'est pas une
 * couleur d'accent mais l'inversion de la bande — encre sur crème,
 * crème sur encre, crème sur bleu. Le repère se voit toujours, et le
 * bleu reste disponible pour la seule action de la page.
 */
export function MomentCarte({ moment, ton }: MomentCarteProps): ReactElement {
  const categoriesRemplies = moment.categories.filter(
    (categorie) => categorie.plats.length > 0,
  );

  return (
    <Bande ton={ton} id={moment.id}>
      <div className="flex flex-col gap-[var(--space-block)]">
        <Reveal className="flex flex-col gap-[var(--space-stack)] lg:flex-row lg:justify-between lg:gap-[var(--space-section)]">
          <div className="flex flex-col gap-[var(--space-tight)] lg:w-[45%]">
            <SurTitre>{moment.label}</SurTitre>
            {/* Le moment monte d'un cran : la catégorie qu'il contient
                porte le surligneur, donc un aplat plein. À taille égale
                l'enfant paraissait plus important que son parent. */}
            <h2 className="t-display">{moment.titre}</h2>
            <p className="t-label">{moment.horaire}</p>
          </div>

          <div className="flex flex-col gap-[var(--space-stack)] lg:w-[50%]">
            <p className="t-lead">
              {typographieFr(moment.accroche)}
            </p>
            <Paragraphes textes={moment.texte} />
          </div>
        </Reveal>

        <div className="flex flex-col gap-[var(--space-block)] lg:flex-row lg:gap-[var(--space-section)]">
          <div className="flex flex-col gap-[var(--space-block)] lg:w-[62%]">
            {/* Une catégorie vidée de ses plats n'affiche pas un titre
                suivi d'un filet tout seul : elle disparaît. */}
            {categoriesRemplies.map((categorie, index) => (
              <Reveal key={categorie.titre} rang={index} className="flex flex-col">
                <h3 className="t-h2" style={{ marginBottom: 'var(--space-tight)' }}>
                  <span className="hl">{categorie.titre}</span>
                </h3>

                {categorie.note && (
                  <p className="t-label" style={{ marginBottom: 'var(--space-tight)' }}>
                    {categorie.note}
                  </p>
                )}

                <ul className="border-t border-[var(--rule)]">
                  {categorie.plats.map((plat) => (
                    <LignePlat key={plat.nom} plat={plat} />
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>

          <Reveal rang={1} className="planche lg:w-[38%]">
            {moment.medias.map((media) => (
              <MediaSlot key={media} id={media} />
            ))}
          </Reveal>
        </div>
      </div>
    </Bande>
  );
}
