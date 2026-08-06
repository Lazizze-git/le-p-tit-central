import Link from 'next/link';
import type { ReactElement } from 'react';
import { ADRESSE_UNE_LIGNE, LIEN_ITINERAIRE, SITE } from '@/content/site';
import { COMMUN, NAV } from '@/content/textes';
import { RESUME_HORAIRES } from '@/content/horaires';
import { lienTelephone } from '@/lib/format';

function Colonne({
  titre,
  children,
}: {
  readonly titre: string;
  readonly children: ReactElement | readonly ReactElement[];
}): ReactElement {
  return (
    <div className="flex flex-col gap-[var(--space-tight)]">
      {/* Le titre de colonne se détache par un filet, pas par une
          opacité : sur le bleu, aucun gris ne tient le seuil AA. */}
      <h2 className="t-label border-b border-[var(--rule)] pb-[var(--space-hair)]">
        {titre}
      </h2>
      {children}
    </div>
  );
}

/**
 * PIED DE PAGE — un dernier cartouche posé sur le mur.
 *
 * Il était en aplat bleu pleine largeur, hérité du temps où le site
 * était fait de bandes de couleur. Depuis que chaque section est une
 * plaque crème sur la faïence, cet aplat était le seul endroit qui
 * répondait à une autre logique — et le bleu sur toute la largeur
 * écrasait la fin de page.
 *
 * Il suit donc la règle commune : carrelage, cartouche crème, double
 * filet gravé. Le nom de la maison le coiffe, dans les lettres peintes
 * du logo.
 */
export function PiedDePage(): ReactElement {
  const tel = lienTelephone(SITE.telephone.e164);

  return (
    <footer className="pied-mur carrelage" data-fond="craie">
      <div className="bande bande--creme bande--serree pied-de-page">
        <div className="bande__inner flex flex-col gap-[var(--space-block)]">
          {/* Le nom est dessiné, pas composé : ce sont les lettres peintes
            du cartouche, comme dans la barre haute. Le texte reste là,
            caché à l'œil, pour les lecteurs d'écran. */}
          <p className="pied-marque">
            <span className="sr-only">{SITE.nomCourt}</span>
          </p>

          <div className="grid gap-[var(--space-block)] sm:grid-cols-2 lg:grid-cols-4">
            <Colonne titre="Adresse">
              <a
                className="t-label lien"
                href={LIEN_ITINERAIRE}
                target="_blank"
                rel="noopener noreferrer"
              >
                {ADRESSE_UNE_LIGNE}
                <span aria-hidden="true"> ↗</span>
              </a>
            </Colonne>

            <Colonne titre="Contact">
              <>
                {/* Pas de soulignement tenu ici, contrairement à la barre
                    haute : dans cette colonne, le numéro est déjà sous un
                    titre souligné, et l'e-mail juste en dessous n'en a
                    pas. Trois traits parallèles à quelques pixels d'écart,
                    ça ne signale plus rien — ça encombre. */}
                <a className="t-label lien" href={tel}>
                  {SITE.telephone.affichage}
                </a>
                <a className="t-label lien" href={`mailto:${SITE.email}`}>
                  {SITE.email}
                </a>
              </>
            </Colonne>

            <Colonne titre="Horaires">
              <p className="t-label" style={{ lineHeight: 1.7 }}>
                {RESUME_HORAIRES}
              </p>
            </Colonne>

            <Colonne titre="Suivre">
              <>
                {SITE.reseaux.map((reseau) => (
                  <a
                    key={reseau.url}
                    className="t-label lien"
                    href={reseau.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {reseau.nom}
                    <span aria-hidden="true"> ↗</span>
                  </a>
                ))}
              </>
            </Colonne>
          </div>

          <hr className="filet" />

          <nav
            className="flex flex-wrap items-center gap-x-[var(--space-block)] gap-y-[var(--space-tight)]"
            aria-label="Pied de page"
          >
            {NAV.map((item) => (
              <Link key={item.href} href={item.href} className="t-label lien">
                {item.libelle}
              </Link>
            ))}
            <span className="t-label ml-auto">{COMMUN.credit}</span>
          </nav>
        </div>
      </div>
    </footer>
  );
}
