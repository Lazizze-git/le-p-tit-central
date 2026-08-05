import { Fragment, type ReactElement } from 'react';
import { typographieFr } from '@/lib/format';

/**
 * Point de passage unique de tout le texte rédactionnel du site.
 *
 * Il fait deux choses :
 *  — transforme les astérisques des fichiers de contenu en gras
 *    (« un texte *mis en avant* ici ») ;
 *  — applique la ponctuation française, avec l'espace fine insécable
 *    avant les deux points, le point-virgule et les points
 *    d'interrogation et d'exclamation.
 *
 * La direction artistique autorise le gras au milieu d'un paragraphe
 * pour souligner une phrase clé — jamais le soulignement, jamais
 * l'italique (réservée au serif des plats signature).
 */
export function TexteRiche({ texte }: { readonly texte: string }): ReactElement {
  const morceaux = typographieFr(texte).split(/\*(.+?)\*/g);
  return (
    <>
      {morceaux.map((morceau, index) =>
        // Les indices impairs sont ce qui se trouvait entre astérisques.
        index % 2 === 1 ? (
          <strong key={index}>{morceau}</strong>
        ) : (
          <Fragment key={index}>{morceau}</Fragment>
        ),
      )}
    </>
  );
}

/** Rend une suite de paragraphes issus d'un fichier de contenu. */
export function Paragraphes({
  textes,
  className = 't-body',
}: {
  readonly textes: readonly string[];
  readonly className?: string;
}): ReactElement {
  return (
    <div className="flex flex-col gap-[var(--space-stack)]">
      {textes.map((texte, index) => (
        <p key={index} className={className}>
          <TexteRiche texte={texte} />
        </p>
      ))}
    </div>
  );
}
