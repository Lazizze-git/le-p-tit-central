'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { ReactElement } from 'react';
import { SITE } from '@/content/site';
import { NAV } from '@/content/textes';
import { lienTelephone } from '@/lib/format';

/** « /carte/ » et « /carte » désignent la même page. */
function estPageCourante(href: string, chemin: string | null): boolean {
  if (!chemin) return false;
  const normaliser = (v: string): string => (v.length > 1 ? v.replace(/\/+$/, '') : v);
  return normaliser(href) === normaliser(chemin);
}

/**
 * Barre haute. Sur mobile, la navigation prend la forme de trois
 * cellules tabulaires séparées par des filets — le même vocabulaire
 * que le reste du site. À partir de la tablette, elle devient une
 * ligne de liens à droite du nom, et la barre se fige en haut.
 */
export function Entete(): ReactElement {
  const chemin = usePathname();
  const tel = lienTelephone(SITE.telephone.e164);

  return (
    <header className="entete">
      <div className="entete__haut">
        <Link
          href="/"
          className="entete__marque"
          // Le nom de la maison ne se traduit pas.
          translate="no"
          aria-current={estPageCourante('/', chemin) ? 'page' : undefined}
        >
          {/* Le nom est dessiné, pas composé : il est peint en fond du
              lien (voir blocs.css). Il lui faut donc son texte, sinon
              le lien vers l'accueil n'a plus de nom du tout — ni pour
              un lecteur d'écran, ni pour Google. */}
          <span className="sr-only">{SITE.nom}</span>
        </Link>

        <nav className="entete__liens t-label" aria-label="Navigation principale">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="entete__lien lien"
              aria-current={estPageCourante(item.href, chemin) ? 'page' : undefined}
            >
              {item.libelle}
            </Link>
          ))}
          <a href={tel} className="lien lien--tenu">
            {SITE.telephone.affichage}
          </a>
        </nav>
      </div>

      <nav className="entete__onglets t-label" aria-label="Navigation du site">
        {NAV.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="entete__onglet"
            aria-current={estPageCourante(item.href, chemin) ? 'page' : undefined}
          >
            {item.libelle}
          </Link>
        ))}
      </nav>
    </header>
  );
}
