import type { ReactElement, ReactNode } from 'react';

interface MurProps {
  readonly children: ReactNode;
  /** Nom de la section pour les lecteurs d'écran. */
  readonly libelle?: string;
}

/**
 * LE MUR D'AZULEJOS
 * ------------------------------------------------------------------
 * Une bande pleine largeur entièrement carrelée : la matière réelle du
 * P’tit Central, à l'échelle du wordmark.
 *
 * Le carrelage est un fond décoratif, pas une image de contenu : il ne
 * porte donc ni `alt` ni rôle. Ce qu'il raconte est écrit en toutes
 * lettres dans l'ardoise qu'il accueille — un lecteur d'écran reçoit
 * l'information, pas une description de texture.
 */
export function Mur({ children, libelle }: MurProps): ReactElement {
  return (
    // Pas de `carrelage` ici : depuis que la page entière est un mur,
    // cette section n'apporte plus la matière, elle lui laisse la place.
    // C'est le seul endroit où le carrelage respire vraiment — ailleurs
    // il n'est qu'un joint entre deux cartouches.
    // `data-fond` : le fond de page prend la teinte de la faïence quand
    // le mur traverse le milieu de l'écran.
    <section className="mur" data-fond="craie" aria-label={libelle}>
      <div className="mur__inner">{children}</div>
    </section>
  );
}

/**
 * L'ARDOISE — le pavé plein qui perce le motif.
 *
 * `bande--encre` n'est pas décoratif : c'est lui qui redéfinit toute la
 * gamme (texte, filets, action, anneau de focus) pour ce qui est
 * dedans. Un bouton posé ici prend donc automatiquement ses bonnes
 * couleurs, sans rien savoir du carrelage derrière.
 */
export function Ardoise({ children }: { readonly children: ReactNode }): ReactElement {
  return (
    <div className="ardoise bande--encre">
      <div className="ardoise__corps">{children}</div>
    </div>
  );
}
