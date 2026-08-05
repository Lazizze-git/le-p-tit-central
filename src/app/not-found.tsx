import type { Metadata } from 'next';
import type { ReactElement } from 'react';
import { SITE } from '@/content/site';
import { ERREURS, COMMUN } from '@/content/textes';
import { lienTelephone } from '@/lib/format';
import { SurTitre } from '@/components/ui/Bande';
import { Bouton } from '@/components/ui/Bouton';
import { Mur, Ardoise } from '@/components/ui/Mur';

export const metadata: Metadata = {
  title: 'Page introuvable',
  // Pas de `robots` ici : Next émet déjà `noindex` sur la page 404.
};

/**
 * Page 404 — dans la charte, et surtout utile : les trois liens qui
 * comptent. Le mur d'azulejos y prend tout l'écran : au bout d'une
 * adresse qui n'existe pas, on tombe sur un mur. Le fichier est déjà
 * dans le cache du visiteur, la page ne coûte donc rien de plus.
 */
export default function PageIntrouvable(): ReactElement {
  return (
    <Mur>
      <Ardoise>
        <SurTitre>Erreur 404</SurTitre>
        <h1 className="t-h2">{ERREURS.page_404_titre}</h1>
        <p className="t-body">{ERREURS.page_404_texte}</p>

        {/* Trois portes de sortie, pas davantage : la navigation complète
            est juste en dessous, dans le pied de page. */}
        <nav aria-label="Aller ailleurs" className="flex flex-wrap gap-[var(--space-tight)]">
          <Bouton href="/">{ERREURS.retour_accueil}</Bouton>
          <Bouton href="/carte/">{COMMUN.voir_la_carte}</Bouton>
          <Bouton href={lienTelephone(SITE.telephone.e164)} principal>
            {COMMUN.appeler} — {SITE.telephone.affichage}
          </Bouton>
        </nav>
      </Ardoise>
    </Mur>
  );
}
