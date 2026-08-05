/**
 * Calcul du statut « ouvert / fermé » à l'heure de Lausanne.
 *
 * Le fuseau Europe/Zurich est imposé explicitement : le statut doit être
 * juste même si le visiteur consulte le site depuis Londres ou Montréal,
 * et il doit suivre le changement d'heure sans intervention.
 */

import {
  FERMETURES,
  SEMAINE,
  type Fermeture,
  type IndexJour,
  type JourHoraire,
  type Plage,
} from '@/content/horaires';

export const FUSEAU = 'Europe/Zurich';

/** Instant courant traduit en jour de semaine + minutes, à Lausanne. */
export interface InstantLocal {
  readonly jour: IndexJour;
  readonly minutes: number;
  /** Date au format "AAAA-MM-JJ", pour comparer aux fermetures. */
  readonly dateIso: string;
}

const JOURS_ISO: readonly string[] = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];

const FORMATEUR = new Intl.DateTimeFormat('en-CA', {
  timeZone: FUSEAU,
  weekday: 'short',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  hour12: false,
});

/** "07:30" → 450. Renvoie NaN si le format est invalide (jamais silencieux). */
export function enMinutes(heure: string): number {
  const parties = heure.split(':');
  const h = Number(parties[0]);
  const m = Number(parties[1]);
  if (!Number.isFinite(h) || !Number.isFinite(m)) return Number.NaN;
  return h * 60 + m;
}

/** 1290 → "21h30". Format suisse, 24 heures. */
export function enTexte(minutes: number): string {
  const h = Math.floor(minutes / 60) % 24;
  const m = minutes % 60;
  return `${String(h).padStart(2, '0')}h${String(m).padStart(2, '0')}`;
}

/** "07:00"–"24:00" → "07h00 – 00h00". Le tiret est un demi-cadratin. */
export function plageEnTexte(plage: Plage): string {
  return `${enTexte(enMinutes(plage.debut))} – ${enTexte(enMinutes(plage.fin))}`;
}

/**
 * Lit l'heure de Lausanne. Renvoie `null` si l'environnement ne sait pas
 * gérer les fuseaux : l'appelant affiche alors un repli neutre plutôt
 * qu'une information fausse.
 */
export function lireInstantLocal(maintenant: Date = new Date()): InstantLocal | null {
  try {
    const parties = FORMATEUR.formatToParts(maintenant);
    const lire = (type: Intl.DateTimeFormatPartTypes): string =>
      parties.find((p) => p.type === type)?.value ?? '';

    const jour = JOURS_ISO.indexOf(lire('weekday').toLowerCase().slice(0, 3));
    const heures = Number(lire('hour'));
    const minutes = Number(lire('minute'));
    if (jour < 0 || !Number.isFinite(heures) || !Number.isFinite(minutes)) return null;

    return {
      // `hour12: false` renvoie 24 pour minuit dans certains moteurs : on ramène à 0.
      jour: jour as IndexJour,
      minutes: (heures % 24) * 60 + minutes,
      dateIso: `${lire('year')}-${lire('month')}-${lire('day')}`,
    };
  } catch {
    return null;
  }
}

export function jourDeSemaine(index: IndexJour): JourHoraire {
  const trouve = SEMAINE.find((j) => j.index === index);
  // SEMAINE couvre les 7 jours ; ce repli n'existe que pour satisfaire le typage.
  return trouve ?? (SEMAINE[0] as JourHoraire);
}

export function fermetureEnCours(dateIso: string): Fermeture | null {
  return FERMETURES.find((f) => dateIso >= f.debut && dateIso <= f.fin) ?? null;
}

export type EtatOuverture = 'ouvert' | 'ferme' | 'inconnu';

export interface Statut {
  readonly etat: EtatOuverture;
  /** Phrase courte affichée à côté de la pastille. */
  readonly libelle: string;
  /** Détail secondaire : prochain service, motif de fermeture. */
  readonly detail: string | null;
}

const STATUT_INCONNU: Statut = { etat: 'inconnu', libelle: 'Horaires', detail: null };

/** Le prochain jour où l'établissement ouvre, à partir de `depuis` (exclu ou non). */
function prochaineOuverture(depuis: IndexJour, inclureAujourdhui: boolean): JourHoraire | null {
  for (let pas = inclureAujourdhui ? 0 : 1; pas <= 7; pas += 1) {
    const jour = jourDeSemaine(((depuis + pas) % 7) as IndexJour);
    if (jour.etablissement) return jour;
  }
  return null;
}

/** Calcule le statut affichable. `instant` vient de `lireInstantLocal()`. */
export function calculerStatut(instant: InstantLocal | null): Statut {
  if (!instant) return STATUT_INCONNU;

  const fermeture = fermetureEnCours(instant.dateIso);
  if (fermeture) {
    return { etat: 'ferme', libelle: 'Fermé', detail: fermeture.motif };
  }

  const jour = jourDeSemaine(instant.jour);
  const plage = jour.etablissement;

  if (plage) {
    const debut = enMinutes(plage.debut);
    const fin = enMinutes(plage.fin);
    if (Number.isNaN(debut) || Number.isNaN(fin)) return STATUT_INCONNU;

    if (instant.minutes >= debut && instant.minutes < fin) {
      return { etat: 'ouvert', libelle: 'Ouvert', detail: `jusqu'à ${enTexte(fin)}` };
    }
    if (instant.minutes < debut) {
      return { etat: 'ferme', libelle: 'Fermé', detail: `ouvre à ${enTexte(debut)}` };
    }
  }

  const suivant = prochaineOuverture(instant.jour, false);
  if (!suivant?.etablissement) return { etat: 'ferme', libelle: 'Fermé', detail: null };

  const demain = ((instant.jour + 1) % 7) === suivant.index;
  const quand = demain ? 'demain' : suivant.nom.toLowerCase();
  return {
    etat: 'ferme',
    libelle: 'Fermé',
    detail: `ouvre ${quand} à ${enTexte(enMinutes(suivant.etablissement.debut))}`,
  };
}
