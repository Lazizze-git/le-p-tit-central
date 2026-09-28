'use client';

import { useEffect, useRef, useState, type FormEvent, type ReactElement } from 'react';
import { SITE } from '@/content/site';
import {
  CONTACT_VIDE,
  SUJETS,
  envoyerContact,
  lienMessage,
  validerContact,
  type DonneesContact,
  type ErreursContact,
  type Sujet,
} from '@/lib/contact';
import { Champ } from '@/components/contact/Champ';
import { Bouton } from '@/components/ui/Bouton';

type Etat = 'repos' | 'envoi' | 'envoye' | 'trop' | 'echec';

/** L'ordre visuel des champs — celui que suit le focus après une erreur. */
const ORDRE_CHAMPS = ['nom', 'email', 'telephone', 'message'] as const;

/**
 * Formulaire de contact.
 *
 * Le message part vers la maison par le serveur (src/lib/contact.ts).
 * « Envoyé » ne s'affiche que si le serveur l'a confirmé. Sinon, le
 * message reste dans les champs et s'ouvre, déjà rédigé, dans la
 * messagerie du visiteur : personne ne reste bloqué, rien ne se perd.
 */
export function Formulaire(): ReactElement {
  const [donnees, setDonnees] = useState<DonneesContact>(CONTACT_VIDE);
  const [erreurs, setErreurs] = useState<ErreursContact>({});
  const [etat, setEtat] = useState<Etat>('repos');
  // Moment où le formulaire s'est affiché chez le visiteur (pas à la
  // construction du site) : un robot le remplit en un instant.
  const ouvertA = useRef(0);
  useEffect(() => {
    ouvertA.current = Date.now();
  }, []);

  const modifier =
    (champ: keyof DonneesContact) =>
    (valeur: string): void => {
      setDonnees((precedent) => ({ ...precedent, [champ]: valeur }));
      // L'erreur disparaît dès que la personne corrige, pas au réenvoi.
      setErreurs((precedent) => ({ ...precedent, [champ]: undefined }));
    };

  const envoyer = async (evenement: FormEvent<HTMLFormElement>): Promise<void> => {
    evenement.preventDefault();
    if (etat === 'envoi') return;
    const trouvees = validerContact(donnees);
    setErreurs(trouvees);

    if (Object.keys(trouvees).length > 0) {
      // Le focus rejoint le premier champ fautif DANS L'ORDRE DU
      // FORMULAIRE, et non dans l'ordre où la validation les a trouvés
      // (nom, email, message, téléphone) — sinon il saute par-dessus un
      // champ en erreur situé plus haut.
      const premier = ORDRE_CHAMPS.find((champ) => trouvees[champ] !== undefined);
      // Après la peinture : au moment du focus, le champ porte alors
      // déjà `aria-invalid` et son message d'erreur, que le lecteur
      // d'écran annonce avec lui.
      if (premier) queueMicrotask(() => document.getElementById(premier)?.focus());
      return;
    }

    setEtat('envoi');
    const piege = new FormData(evenement.currentTarget).get('site_web');
    const resultat = await envoyerContact(
      donnees,
      Date.now() - ouvertA.current,
      typeof piege === 'string' ? piege : '',
    );
    setEtat(resultat);
    // Le message n'est effacé qu'une fois parti : en cas d'échec, il
    // reste là, prêt à être ouvert dans la messagerie.
    if (resultat === 'envoye') setDonnees(CONTACT_VIDE);
  };

  return (
    <form
      onSubmit={(evenement) => void envoyer(evenement)}
      noValidate
      className="flex flex-col gap-[var(--space-stack)]"
    >
      {/* Le piège à robots : hors de l'écran, hors du clavier, caché aux
          lecteurs d'écran. Un humain ne le voit ni ne le remplit. */}
      <p
        aria-hidden="true"
        style={{ position: 'absolute', left: '-10000px', width: 1, height: 1, overflow: 'hidden' }}
      >
        <label htmlFor="site_web">Laissez ce champ vide</label>
        <input
          id="site_web"
          name="site_web"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          defaultValue=""
        />
      </p>

      <Champ
        id="nom"
        label="Votre nom"
        valeur={donnees.nom}
        onChange={modifier('nom')}
        erreur={erreurs.nom}
        autoComplete="name"
        requis
      />

      <div className="grid gap-[var(--space-stack)] sm:grid-cols-2">
        <Champ
          id="email"
          label="Votre e-mail"
          type="email"
          valeur={donnees.email}
          onChange={modifier('email')}
          erreur={erreurs.email}
          autoComplete="email"
          requis
        />
        <Champ
          id="telephone"
          label="Votre téléphone"
          type="tel"
          valeur={donnees.telephone}
          onChange={modifier('telephone')}
          erreur={erreurs.telephone}
          autoComplete="tel"
        />
      </div>

      <p className="champ">
        <label className="champ__label t-label" htmlFor="sujet">
          Le sujet
        </label>
        <select
          id="sujet"
          name="sujet"
          className="champ__saisie"
          value={donnees.sujet}
          onChange={(evenement) =>
            setDonnees((precedent) => ({ ...precedent, sujet: evenement.target.value as Sujet }))
          }
        >
          {SUJETS.map((sujet) => (
            <option key={sujet} value={sujet}>
              {sujet}
            </option>
          ))}
        </select>
      </p>

      <Champ
        id="message"
        label="Votre message"
        valeur={donnees.message}
        onChange={modifier('message')}
        erreur={erreurs.message}
        multiligne
        requis
      />

      <div className="flex flex-col gap-[var(--space-tight)]">
        <Bouton type="submit" principal disabled={etat === 'envoi'}>
          {etat === 'envoi' ? 'Envoi en cours…' : 'Envoyer le message'}
        </Bouton>

        <p className="t-small" style={{ color: 'var(--fg-muted)' }} aria-live="polite">
          {etat === 'envoye' && (
            <strong style={{ color: 'var(--fg)' }}>
              Merci, votre message est bien parti. La maison vous répond par e-mail.{' '}
            </strong>
          )}
          {(etat === 'echec' || etat === 'trop') && (
            <>
              <strong style={{ color: 'var(--fg)' }}>
                {etat === 'trop'
                  ? 'Plusieurs messages viennent déjà de partir de cet appareil.'
                  : 'L’envoi n’a pas abouti.'}
              </strong>{' '}
              Votre message est conservé :{' '}
              <a className="lien lien--tenu" href={lienMessage(donnees)}>
                ouvrez-le dans votre messagerie
              </a>
              , il est déjà rédigé.{' '}
            </>
          )}
          {'Vous pouvez aussi écrire directement à '}
          <a className="lien lien--tenu" href={`mailto:${SITE.email}`}>
            {SITE.email}
          </a>
          .
        </p>
      </div>
    </form>
  );
}
