import type { ReactElement } from 'react';
import { ADRESSE_UNE_LIGNE } from '@/content/site';
import { SEMAINE } from '@/content/horaires';
import { jourDeSemaine, plageEnTexte } from '@/lib/horaires';

/** Les fragments défilants. Le « / » est le séparateur maison. */
function fragments(): readonly string[] {
  const mardi = jourDeSemaine(2);
  const lundi = jourDeSemaine(1);
  return [
    'Café / Cuisine / Lausanne',
    lundi.etablissement ? `Lundi ${plageEnTexte(lundi.etablissement)}` : '',
    mardi.etablissement ? `Mardi à samedi ${plageEnTexte(mardi.etablissement)}` : '',
    'Dimanche fermé',
    ADRESSE_UNE_LIGNE,
    `Filets de perche le vendredi midi`,
  ].filter(Boolean);
}

/**
 * Bande d'horaires qui défile en continu. Le contenu est écrit deux
 * fois : la piste se déplace d'exactement la moitié de sa largeur, ce
 * qui fait une boucle sans raccord visible.
 *
 * Le défilement se met en pause au survol, et devient une simple ligne
 * lisible si le visiteur a demandé moins d'animation.
 */
export function Marquee(): ReactElement {
  const items = fragments();
  // La seconde copie n'existe que pour la boucle. Elle est marquée pour
  // pouvoir être retirée quand l'animation est coupée : sans ça, un
  // visiteur en « moins d'animation » voyait la bande écrite deux fois
  // dans une zone à faire défiler à la main.
  const piste = [
    ...items.map((item) => ({ item, copie: false })),
    ...items.map((item) => ({ item, copie: true })),
  ];

  return (
    <div className="marquee bande--creme">
      {/* Le contenu est purement redondant avec les horaires détaillés
          de la page Contact : il est masqué aux lecteurs d'écran pour
          ne pas faire lire deux fois la même information. */}
      <div className="marquee__piste t-label" aria-hidden="true">
        {piste.map(({ item, copie }, index) => (
          <span
            key={`${item}-${index}`}
            className="marquee__item"
            {...(copie ? { 'data-copie': 'true' } : {})}
          >
            {item}
            <span style={{ paddingLeft: '1.1em' }}>/</span>
          </span>
        ))}
      </div>
      <p className="sr-only">
        Horaires : {SEMAINE.filter((j) => j.etablissement).length} jours sur 7. Adresse :{' '}
        {ADRESSE_UNE_LIGNE}.
      </p>
    </div>
  );
}
