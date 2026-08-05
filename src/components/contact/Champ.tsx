import type { ChangeEvent, ReactElement } from 'react';

interface ChampProps {
  readonly id: string;
  readonly label: string;
  readonly valeur: string;
  readonly onChange: (valeur: string) => void;
  readonly erreur?: string | undefined;
  readonly type?: 'text' | 'email' | 'tel';
  readonly requis?: boolean;
  readonly multiligne?: boolean;
  readonly autoComplete?: string;
}

/**
 * Un champ de saisie : étiquette visible (jamais un simple texte
 * d'aide qui disparaît à la frappe), message d'erreur rattaché au
 * champ pour les lecteurs d'écran, et zone tactile suffisante.
 */
export function Champ({
  id,
  label,
  valeur,
  onChange,
  erreur,
  type = 'text',
  requis = false,
  multiligne = false,
  autoComplete,
}: ChampProps): ReactElement {
  const idErreur = `${id}-erreur`;
  const commun = {
    id,
    name: id,
    value: valeur,
    required: requis,
    autoComplete,
    // Le correcteur orthographique n'a rien à faire sur une adresse
    // e-mail ou un numéro : il ne fait que souligner en rouge.
    spellCheck: type === 'text' ? undefined : false,
    className: 'champ__saisie',
    'aria-invalid': erreur ? true : undefined,
    'aria-describedby': erreur ? idErreur : undefined,
    onChange: (evenement: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void =>
      onChange(evenement.target.value),
  } as const;

  return (
    <p className="champ">
      <label className="champ__label t-label" htmlFor={id}>
        {label}
        {!requis && <span style={{ color: 'var(--fg-muted)' }}> (facultatif)</span>}
      </label>

      {multiligne ? <textarea {...commun} rows={6} /> : <input {...commun} type={type} />}

      {/* La flèche pointe le champ fautif : le message ne repose ni sur
          une couleur, ni sur le seul doublement du filet. */}
      {erreur && (
        <strong className="champ__erreur t-small" id={idErreur} role="alert">
          <span aria-hidden="true">↑ </span>
          {erreur}
        </strong>
      )}
    </p>
  );
}
