/**
 * TEXTES DU SITE (français)
 * ------------------------------------------------------------------
 * Tous les textes rédactionnels sont ici. Aucune phrase n'est écrite
 * en dur dans les pages : pour changer un mot du site, c'est ce fichier.
 *
 * Le gras s'écrit entre astérisques : *cette phrase sera en gras*.
 *
 * VERSION ANGLAISE (plus tard) : dupliquer ce fichier en `textes.en.ts`,
 * traduire les valeurs sans toucher aux noms, et brancher le choix de
 * langue dans src/content/langue.ts.
 */

export const NAV = [
  { libelle: 'La carte', href: '/carte/' },
  { libelle: 'Le lieu', href: '/le-lieu/' },
  { libelle: 'Contact', href: '/contact/' },
] as const;

export const COMMUN = {
  aller_au_contenu: 'Aller au contenu',
  appeler: 'Appeler',
  itineraire: 'Itinéraire',
  plan: 'Plan',
  voir_la_carte: 'Voir la carte',
  horaires: 'Horaires',
  reserver: 'Réserver par téléphone',
  prix_indisponibles:
    'Les prix sont en cours de mise à jour avec la maison. En attendant, ils vous sont communiqués sur place et par téléphone.',
  mise_a_jour: 'Carte mise à jour le',
  credit: 'Site — WeAreBrothers',
} as const;

export const ACCUEIL = {
  sur_titre: 'Lausanne / Café & cuisine',
  promesse: 'Un café de quartier au centre-ville, ouvert du matin à tard le soir.',
  intro_label: 'La maison',
  intro_titre: 'Depuis plus de vingt-trois ans',
  intro: [
    'Le P’tit Central vous accueille du lundi au samedi, au centre de Lausanne. Des plats divers, un menu du jour réécrit chaque matin, et un comptoir ouvert dès sept heures.',
    '*C’est un petit lieu.* On y sert le café des habitués le matin, les tables de midi en une heure, et les soirées qui s’étirent jusqu’à minuit.',
  ],
  signature_label: 'La signature de la maison',
  signature_titre: 'Filets de perche, tous les vendredis midi',
  signature_texte:
    'Meunière, sauce tartare maison, pommes frites et légumes du jour. *Le même rendez-vous depuis plus de vingt-trois ans.*',
  signature_note: '(jusqu’à épuisement)',
  moments_label: 'La journée',
  moments_titre: 'Quatre moments',
  moments_intro: 'Le café du matin, la pause de midi, la table du soir, et le vendredi.',
  pratique_label: 'Infos pratiques',
  pratique_titre: 'Venir',
  reserver_label: 'Réserver',
  reserver_titre: 'Une table ?',
  reserver_texte:
    'Le plus simple reste le téléphone. On répond pendant le service, et on garde une table pour vous.',
} as const;

export const LIEU = {
  sur_titre: 'Le lieu / Privatisation',
  titre: 'Le lieu',
  accroche: 'Une salle, un comptoir, et de quoi tenir une soirée entière.',
  histoire_label: 'L’histoire',
  histoire_titre: 'Vingt-trois ans rue Centrale',
  histoire: [
    'Le P’tit Central a ouvert au début des années 2000, à l’angle de la rue Centrale. Depuis, le quartier a changé plusieurs fois — pas la maison.',
    'Les habitués viennent pour le café de sept heures, les bureaux voisins pour le plat du jour, et tout le monde le vendredi pour les perches. *Une adresse de quartier, au milieu du centre-ville.*',
  ],
  salle_label: 'La salle privée',
  salle_titre: 'Privatiser',
  salle_texte: [
    'Une salle séparée, à l’écart du service courant, pour vos anniversaires, mariages et rendez-vous professionnels.',
    'On adapte la carte à l’occasion : apéritif debout, repas assis, ou service continu. *Dites-nous ce que vous avez en tête et on construit autour.*',
  ],
  occasions: [
    { titre: 'Anniversaires', detail: 'Apéritif, repas assis ou buffet.' },
    { titre: 'Mariages', detail: 'Réception avant ou après la cérémonie.' },
    { titre: 'Événements professionnels', detail: 'Réunions, séminaires, fins d’année.' },
    { titre: 'Repas de groupe', detail: 'Familles, associations, équipes.' },
  ],
  demande_titre: 'Demander la salle',
  demande_texte: 'Appelez la maison ou écrivez : on revient vers vous avec une proposition.',
} as const;

export const CONTACT = {
  sur_titre: 'Contact / Réservation',
  titre: 'Nous trouver',
  accroche: 'Rue Centrale 9, au cœur de Lausanne. Deux minutes à pied de la Riponne.',
  telephone_label: 'Le plus rapide',
  telephone_texte:
    'Pour réserver une table, demander la salle privée ou vérifier le plat du jour : appelez. On répond pendant le service.',
  acces_label: 'Y venir',
  acces_titre: 'Accès',
  transports: [
    { moyen: 'Métro m1 / m2', detail: 'Arrêt Lausanne-Flon, 5 minutes à pied.' },
    { moyen: 'Bus 6, 7, 8, 16', detail: 'Arrêt Bel-Air, 3 minutes à pied.' },
    { moyen: 'Métro m2', detail: 'Arrêt Riponne–Maurice Béjart, 4 minutes à pied.' },
    { moyen: 'Voiture', detail: 'Parking Riponne ou Bel-Air, à 5 minutes.' },
  ],
  formulaire_label: 'Écrire',
  formulaire_titre: 'Un message',
  formulaire_texte:
    'Pour une demande qui n’est pas urgente : privatisation, groupe, question sur la carte. *Pour réserver une table le jour même, préférez le téléphone.*',
} as const;

export const ERREURS = {
  page_404_titre: 'Page introuvable',
  page_404_texte:
    'Cette page n’existe pas, ou plus. La carte, les horaires et le téléphone sont toujours là.',
  page_erreur_titre: 'Quelque chose a lâché',
  page_erreur_texte:
    'Une erreur inattendue est survenue de notre côté. Vous pouvez réessayer, ou appeler directement.',
  reessayer: 'Réessayer',
  retour_accueil: 'Retour à l’accueil',
} as const;
