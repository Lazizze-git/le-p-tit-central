import type { ReactElement } from 'react';
import { SITE } from '@/content/site';
import { ACCUEIL, COMMUN } from '@/content/textes';
import { lienTelephone } from '@/lib/format';
import { Bande, SurTitre } from '@/components/ui/Bande';
import { Bouton } from '@/components/ui/Bouton';
import { MediaSlot } from '@/components/ui/MediaSlot';
import { Statut } from '@/components/ui/Statut';

/**
 * HAUT DE PAGE
 * ------------------------------------------------------------------
 * Le premier cartouche du mur, et le plus haut. Il porte le nom de la
 * maison sous sa forme peinte — le logo tient lieu de titre.
 *
 * LE NOM RESTE ÉCRIT EN TOUTES LETTRES dans le titre, en texte caché à
 * l'œil : une image ne se lit ni au lecteur d'écran, ni par Google. Le
 * dessin, lui, est décoratif — d'où son `alt` vide, qui évite que le
 * nom soit annoncé deux fois de suite.
 *
 * Juste dessous, sur une ligne à filets : est-ce ouvert, et comment
 * appeler. Rien d'autre ne s'interpose.
 *
 * Puis deux tirages qui se partagent la largeur, posés sur la même
 * ligne de sol : la terrasse en paysage sur deux tiers, l'entrée en
 * portrait sur un tiers.
 */
export function Hero(): ReactElement {
  return (
    <Bande>
      <div className="flex flex-col gap-[var(--space-block)]">
        <div className="flex flex-col gap-[var(--space-block)] lg:flex-row lg:gap-[var(--space-section)]">
          <div className="flex flex-col gap-[var(--space-block)] lg:w-[62%]">
            <SurTitre>{ACCUEIL.sur_titre}</SurTitre>

            <h1 className="titre-logo">
              <span className="sr-only">
                {SITE.nom} — café et restaurant à {SITE.adresse.ville}
              </span>
              <img
                className="signature-logo"
                src="/logo-ptit-central.svg"
                alt=""
                width={931}
                height={497}
                fetchPriority="high"
              />
            </h1>

            <p className="t-lead">{ACCUEIL.promesse}</p>

            {/* `flex-wrap` n'est pas décoratif : dans une colonne de 62 %,
              le statut et les deux boutons ne tiennent plus sur une
              ligne. Sans lui, le statut se faisait rogner et on lisait
              « Ouvert — jusqu'à… », ce qui est exactement l'information
              qu'on venait chercher. Ils passent donc à la ligne. */}
            <div className="flex flex-col gap-[var(--space-stack)] border-t border-[var(--rule)] pt-[var(--space-stack)] sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
              <Statut />
              <div className="flex flex-wrap gap-[var(--space-tight)]">
                <Bouton href={lienTelephone(SITE.telephone.e164)} principal>
                  {COMMUN.reserver}
                </Bouton>
                <Bouton href="/carte/">
                  {COMMUN.voir_la_carte}
                  <span aria-hidden="true">↓</span>
                </Bouton>
              </div>
            </div>
          </div>

          {/* `hidden lg:block` : sur téléphone cette colonne n'existe pas
            du tout. Le logo y prend déjà toute la largeur, et une
            troisième image avant même la ligne « ouvert / appeler »
            repousserait hors de l'écran les deux seules informations
            qu'on vient chercher sur un site de restaurant. */}
          <div className="hidden lg:block lg:w-[38%]">
            <MediaSlot id="devanture" />
          </div>
        </div>

        {/* La planche reste SOUS les deux colonnes, sur toute la largeur.
            Enfermée dans la colonne de gauche, elle laissait un grand
            vide sous la devanture et ses deux tirages rétrécissaient
            pour rien. */}
        <div className="planche planche--pied">
          <MediaSlot id="terrasse" prioritaire />
          <MediaSlot id="portemanteau" />
        </div>
      </div>
    </Bande>
  );
}
