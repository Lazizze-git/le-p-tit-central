'use client';

import { useState, type FormEvent, type ReactElement } from 'react';
import { SITE } from '@/content/site';
import {
  CONTACT_VIDE,
  SUJETS,
  lienMessage,
  validerContact,
  type DonneesContact,
  type ErreursContact,
  type Sujet,
} from '@/lib/contact';
import { Champ } from '@/components/contact/Champ';
import { Bouton } from '@/components/ui/Bouton';

type Etat = 'repos' | 'transmis';

/** L'ordre visuel des champs — celui que suit le focus après une erreur. */
const ORDRE_CHAMPS = ['nom', 'email', 'telephone', 'message'] as const;

/**
 * Formulaire de contact.
 *
 * Il ne prétend jamais avoir envoyé quoi que ce soit : à la validation,
 * il ouvre le logiciel de messagerie avec un message prêt à partir, et
 * il le dit clairement. Si l'ouverture échoue, l'adresse est affichée
 * en clair pour que personne ne reste bloqué.
 */
export function Formulaire(): ReactElement {
  const [donnees, setDonnees] = useState<DonneesContact>(CONTACT_VIDE);
  const [erreurs, setErreurs] = useState<ErreursContact>({});
  const [etat, setEtat] = useState<Etat>('repos');

  const modifier =
    (champ: keyof DonneesContact) =>
    (valeur: string): void => {
      setDonnees((precedent) => ({ ...precedent, [champ]: valeur }));
      // L'erreur disparaît dès que la personne corrige, pas au réenvoi.
      setErreurs((precedent) => ({ ...precedent, [champ]: undefined }));
    };

  const envoyer = (evenement: FormEvent<HTMLFormElement>): void => {
    evenement.preventDefault();
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

    // L'adresse de secours reste affichée en permanence sous le bouton :
    // si la messagerie ne s'ouvre pas, personne ne reste bloqué.
    window.location.href = lienMessage(donnees);
    setEtat('transmis');
  };

  return (
    <form onSubmit={envoyer} noValidate className="flex flex-col gap-[var(--space-stack)]">
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
        <Bouton type="submit" principal>
          Préparer le message
        </Bouton>

        <p className="t-small" style={{ color: 'var(--fg-muted)' }} aria-live="polite">
          {etat === 'transmis'
            ? 'Votre logiciel de messagerie vient de s’ouvrir avec le message. Il reste à l’envoyer.'
            : 'Ce bouton ouvre votre messagerie avec le message déjà rédigé — vous gardez la main sur l’envoi.'}
          {' Vous pouvez aussi écrire directement à '}
          <a className="lien lien--tenu" href={`mailto:${SITE.email}`}>
            {SITE.email}
          </a>
          .
        </p>
      </div>
    </form>
  );
}
