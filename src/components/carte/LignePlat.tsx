import type { ReactElement } from 'react';
import { LIBELLE_MENTION, type Plat } from '@/content/types';
import { formatPrix, typographieFr } from '@/lib/format';

/**
 * Une ligne de la carte : nom, description, mentions, prix.
 *
 * Quand le prix n'a pas encore été communiqué par la maison, la
 * colonne affiche un tiret plutôt qu'un montant inventé — et la page
 * explique pourquoi. Le jour où le prix est saisi dans le fichier de
 * contenu, rien d'autre ne bouge.
 */
export function LignePlat({ plat }: { readonly plat: Plat }): ReactElement {
  const prixInconnu = plat.prix === null;

  return (
    <li className="plat">
      <div className="flex flex-col gap-[var(--space-hair)]">
        <h4 className={plat.signature ? 't-signature' : 't-h3'} style={signatureStyle(plat)}>
          {plat.nom}
        </h4>

        {plat.description && (
          <p className="t-small" style={{ color: 'var(--fg-muted)', maxWidth: '48ch' }}>
            {typographieFr(plat.description)}
          </p>
        )}

        {plat.mentions && plat.mentions.length > 0 && (
          <ul className="flex flex-wrap gap-[var(--space-hair)] pt-[2px]">
            {plat.mentions.map((mention) => (
              <li key={mention} className="tag">
                {LIBELLE_MENTION[mention]}
              </li>
            ))}
          </ul>
        )}
      </div>

      <span className="t-price plat__prix" data-inconnu={prixInconnu}>
        {formatPrix(plat.prix)}
        {prixInconnu && <span className="sr-only">prix communiqué sur place</span>}
      </span>
    </li>
  );
}

/** Le plat signature sort de la liste : serif, plus grand, sans capitales. */
function signatureStyle(plat: Plat): React.CSSProperties | undefined {
  if (!plat.signature) return undefined;
  return { fontSize: 'var(--fs-lead)', lineHeight: 'var(--lh-lead)' };
}
