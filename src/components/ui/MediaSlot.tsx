import type { CSSProperties, ReactElement } from 'react';
import { mediaParNom } from '@/content/medias';
import type { IdMedia, Media } from '@/content/types';

interface MediaSlotProps {
  /**
   * Identifiant déclaré dans src/content/medias.ts. Typé sur la liste
   * réelle : un nom inconnu ne compile pas.
   */
  readonly id: IdMedia;
  /** L'image du haut de page se charge tout de suite, les autres à l'approche. */
  readonly prioritaire?: boolean;
  readonly className?: string;
}

/** Lit les dimensions réelles écrites dans le contenu : '736/928'. */
function dimensions(ratio: Media['ratio']): { readonly w: number; readonly h: number } {
  const [largeur, hauteur] = ratio.split('/');
  return { w: Number(largeur), h: Number(hauteur) };
}

/**
 * EMPLACEMENT PHOTO
 * ------------------------------------------------------------------
 * Un seul composant pour toutes les images du site.
 *
 * Tant que `src` vaut `null` dans src/content/medias.ts, il affiche un
 * panneau graphique : le « C » de Central en très grand, rogné par le
 * cadre. Ce n'est pas un trou en attente de photo, c'est un bloc qui
 * tient debout tout seul.
 *
 * Quand une photo est là, le cadre prend sa proportion exacte et ne
 * l'agrandit jamais au-delà de sa définition réelle. Le jour d'un vrai
 * shooting, deux valeurs changent dans le fichier de contenu — le
 * chemin et les dimensions — et rien d'autre ne bouge.
 */
export function MediaSlot({
  id,
  prioritaire = false,
  className = '',
}: MediaSlotProps): ReactElement {
  const media = mediaParNom(id);
  const { w, h } = dimensions(media.ratio);

  // `--slot-max` est un PLAFOND, pas une taille : le cadre remplit
  // toujours la colonne qu'on lui donne, et ne s'arrête que s'il
  // dépassait la définition réelle du fichier. Avec des photos livrées
  // en 1600 px et plus, ce plafond ne mord jamais — c'est la mise en
  // page qui décide, comme il se doit. Il ne servira que le jour où
  // quelqu'un déposera une petite image : elle restera nette au lieu
  // d'être étirée en bouillie.
  const style = {
    '--slot-ratio': `${w} / ${h}`,
    // La part de ligne dans une planche : un cadre prévu deux fois plus
    // large qu'un autre prend deux fois plus de place. Sans unité —
    // c'est un rapport, pas une mesure. Voir signes.css, « Planche ».
    '--slot-part': w,
    '--slot-max': `${w}px`,
  } as CSSProperties;

  // Le `ton` ne colore que le panneau « C ». Une photo, elle, prend le
  // filet de la bande qui l'accueille : sinon la bordure d'un cadre
  // « encre » posé sur une bande crème serait crème, donc invisible.
  const classesCadre = media.src ? 'slot slot--photo' : `slot slot--panneau bande--${media.ton}`;

  // Un tirage secondaire s'arrête avant le bord de sa colonne : c'est
  // l'écart de taille qui hiérarchise deux cadres empilés, pas l'ordre.
  const classesFigure = ['slot-figure', media.petit ? 'slot-figure--petit' : '', className]
    .filter(Boolean)
    .join(' ');

  return (
    <figure className={classesFigure} style={style}>
      <div className={classesCadre}>
        {media.src ? (
          <img
            className="slot__img"
            src={media.src}
            alt={media.alt}
            width={w}
            height={h}
            loading={prioritaire ? 'eager' : 'lazy'}
            decoding="async"
            {...(prioritaire ? { fetchPriority: 'high' as const } : {})}
          />
        ) : (
          // Décoratif : la légende porte déjà l'information.
          <span className="slot__signe" aria-hidden="true">
            <span>C</span>
          </span>
        )}
      </div>

      <figcaption className="slot__legende t-label">{media.legende}</figcaption>
    </figure>
  );
}
