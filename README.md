# Le P'tit Central — site internet

Café · Restaurant — Rue Centrale 9, 1003 Lausanne
Réalisation : **WeAreBrothers**

Ce document est écrit pour être lu **sans connaissance technique**. Chaque
modification courante du site (un horaire, un prix, un texte, une photo) se
fait en changeant une seule ligne dans un seul fichier. Aucune n'exige de
comprendre le code autour.

---

## 1. Lancer le site sur votre ordinateur

Il faut avoir installé **Node.js** une fois pour toutes (téléchargement sur
[nodejs.org](https://nodejs.org), version 20 ou plus récente).

Ouvrez le Terminal, placez-vous dans le dossier du projet, puis tapez :

```bash
npm install     # une seule fois, la première fois
npm run dev     # à chaque fois que vous voulez voir le site
```

Ouvrez ensuite **http://localhost:3000** dans votre navigateur.
Le site se met à jour tout seul dès que vous enregistrez un fichier.

Pour arrêter : `Ctrl` + `C` dans le Terminal.

---

## 2. Où se trouve quoi

Tout ce que vous aurez à modifier se trouve dans le dossier **`src/content/`**.
Le reste du projet, vous pouvez l'ignorer.

| Fichier | Ce qu'il contient |
|---|---|
| `src/content/site.ts` | Adresse, téléphone, e-mail, Instagram, Facebook |
| `src/content/horaires.ts` | Tous les horaires + les fermetures exceptionnelles |
| `src/content/carte.ts` | La carte : plats, descriptions, prix |
| `src/content/textes.ts` | Tous les textes des pages |
| `src/content/medias.ts` | Les emplacements photo |

Ces fichiers sont écrits en texte simple, avec beaucoup de commentaires.
**Règle d'or : ne supprimez jamais une virgule, une accolade `{` ou un
crochet `[`.** Copiez une ligne existante et changez seulement ce qui est
entre apostrophes.

---

## 3. Changer un horaire

Ouvrez `src/content/horaires.ts`. Les horaires sont écrits en heures sur
24 heures, entre apostrophes, sous la forme `'HH:MM'`.

```ts
{
  index: 1,
  nom: 'Lundi',
  etablissement: { debut: '07:00', fin: '19:30' },   ← l'ouverture du café
  cuisineMidi:   { debut: '11:30', fin: '14:00' },   ← le service de midi
  cuisineSoir:   null,                                ← pas de service ce soir-là
}
```

- « Ferme à minuit » s'écrit **`'24:00'`**.
- « Fermé » s'écrit **`null`** (sans apostrophes).

Le bandeau « Ouvert / Fermé » du site se recalcule tout seul à l'heure de
Lausanne. Vous n'avez rien d'autre à faire.

### Annoncer des vacances ou une fermeture

Dans le même fichier, tout en bas, ajoutez une ligne entre les crochets de
`FERMETURES` :

```ts
export const FERMETURES: readonly Fermeture[] = [
  { debut: '2026-12-24', fin: '2027-01-05', motif: 'Fermeture de fin d’année' },
];
```

Pendant cette période, le site affichera « Fermé » et le motif. Pensez à
retirer la ligne quand la période est passée.

---

## 4. Changer un prix ou un plat

Ouvrez `src/content/carte.ts`.

**Pour saisir un prix**, remplacez `prix: null` par le montant, avec un point
et sans le mot « CHF » :

```ts
{ nom: 'Café crème', prix: 4.5 }      →  affiche  CHF 4.50
{ nom: 'Plat du jour', prix: 24 }     →  affiche  CHF 24.00
```

**Tant qu'un prix vaut `null`**, le site affiche un tiret et une phrase
d'explication en haut de la carte. C'est volontaire : il vaut mieux pas de
prix qu'un prix faux.

**Pour ajouter un plat**, copiez une ligne complète et changez le texte :

```ts
{
  nom: 'Tartare de bœuf',
  description: 'Frites maison et salade verte.',
  prix: 32,
  mentions: ['maison'],
},
```

Les `mentions` possibles sont : `'vegetarien'`, `'maison'`, `'saison'`,
`'local'`, `'sans-gluten'`. Elles s'affichent en petite étiquette.

**Pour mettre un plat en avant**, ajoutez `signature: true` : il sera composé
dans la police d'écriture élégante, comme les filets de perche.

Enfin, en haut du fichier, changez la date :
```ts
export const DATE_MISE_A_JOUR = '05.08.2026';
```
Elle s'affiche en bas de la carte et rassure les visiteurs.

---

## 5. Changer un texte

Tous les textes sont dans `src/content/textes.ts`, rangés par page.

Deux astuces d'écriture :

- **Mettre en gras** un passage : entourez-le d'astérisques.
  `'C’est *un petit lieu*.'` → « C'est **un petit lieu**. »
- **L'apostrophe** : utilisez `’` (l'apostrophe courbe) et non `'`. Sinon le
  texte se casse. Le plus simple : copier-coller une apostrophe existante.

Les espaces avant les `:` `?` `!` sont ajoutées automatiquement par le site,
vous n'avez pas à y penser.

---

## 6. Les photos

### Où en sont les photos

**Sept emplacements sur dix portent une vraie photo de la maison.** Elles
viennent du compte Instagram du P'tit Central : l'habillage de l'application a
été détouré et chaque image est servie en `.webp` sous 200 Ko.

Les trois autres affichent **le « C » de Central**. Ce ne sont pas des trous :
ce sont les vues qui manquent encore au fonds. Mieux vaut le panneau qu'une
photo qui ne montre pas ce que la légende annonce.

| Emplacement | Ce qu'on y voit | État |
|---|---|---|
| `comptoir-azulejos` | Le café du matin devant les fresques du comptoir | ✅ en place — 1286 × 1746 px |
| `terrasse` | Un burger et un mojito en terrasse, plein soleil | ✅ en place — 1286 × 1748 px |
| `assiette-salade` | Une assiette de salade au poulet pané | ✅ en place — 1196 × 1750 px |
| `ardoise-du-jour` | La carte de la maison, posée près d'un renversé | ✅ en place — 1282 × 1738 px |
| `salle-midi` | Une table de midi vue de dessus | ✅ en place — 1282 × 1740 px |
| `salle-soir` | Une assiette de poisson et légumes rôtis | ✅ en place — 1280 × 1750 px |
| `perche` | Les filets de perche du vendredi | ✅ en place — 1274 × 1738 px |
| `comptoir` | Le bar au petit matin | ⬜ manque — carré, 1600 × 1600 px |
| `salle-privee` | La salle privée dressée | ⬜ manque — paysage, 1800 × 1200 px |
| `salle-azulejos` | Une table le long des fresques | ⬜ manque — portrait, 1600 × 2000 px |

**Toutes les photos en place sont en portrait.** C'est le format d'Instagram,
pas un choix de mise en page. Le jour d'un vrai reportage, on pourra enfin
cadrer une terrasse en paysage et une salle en largeur.

> **Ce qui reste à photographier**, par ordre d'utilité : la **devanture** rue
> Centrale, le **comptoir au petit matin** avant le service, la **salle** le
> long des fresques, et la **salle privée dressée** pour un événement. Une
> demi-journée suffit.

**Le réglage de température des photos est à zéro.** Les images actuelles
viennent toutes de la même source et n'ont pas besoin d'être réaccordées. Si un
prochain lot vient de sources mélangées, remontez `--photo-ton` à `0.12` dans
`src/app/globals.css`.

### Le mur d'azulejos

Le fichier `public/photos/azulejos.webp` **n'est pas un emplacement photo** :
c'est la matière du site. Il contient 2 carreaux de large sur 4 de haut,
découpés pile sur les joints, ce qui lui permet de se répéter sans que le
raccord se voie. Il habille les grandes surfaces carrelées de l'accueil, de
la page « Le lieu » et des pages d'erreur. Ne le remplacez pas sans nous
demander : il faut une prise de vue de face et un découpage sur les joints.

### Remplacer une photo — trois étapes

**1. Préparez le fichier.** Format `.jpg` ou `.webp`, **300 Ko maximum**
(compressez sur [squoosh.app](https://squoosh.app), gratuit). Inutile de le
recadrer : c'est vous qui donnez sa proportion au cadre, à l'étape 3.

**2. Déposez-le** dans le dossier **`public/photos/`**.

**3. Changez deux lignes** dans `src/content/medias.ts` :

```ts
terrasse: {
  src: '/photos/terrasse.webp',   ← remplace `null` : le nom de votre fichier
  alt: 'Deux clientes attablées en terrasse rue Centrale…',
  legende: 'La terrasse, rue Centrale',
  ratio: '1800/1200',              ← les dimensions EXACTES, en pixels
  ton: 'encre',
},
```

- **`ratio`** porte les **dimensions réelles du fichier**. Sur Mac : clic
  droit sur l'image, « Lire les informations », ligne « Dimensions ».
  C'est ce chiffre qui réserve la place et empêche la page de sursauter.
- **`alt`** décrit l'image pour les personnes non voyantes **et pour Google**.
  Décrivez ce qu'on voit, en une phrase, sans écrire « photo de… ».
- **`legende`** est le petit texte affiché sous l'image.
- Ne touchez pas à `ton`.

**Le premier chiffre de `ratio` sert aussi de limite** : le site n'affichera
jamais une photo plus large que sa vraie définition. C'est la garantie
qu'aucune image ne sera floue. Déposez une photo en 1600 px ou plus, elle
occupera toute la place que la mise en page lui offre.

### L'image de partage (WhatsApp, Facebook, Instagram)

Elle est dessinée automatiquement aujourd'hui. Pour la remplacer par une
photo : déposez un fichier **1200 × 630 px** dans `public/`, puis dans
`src/content/site.ts` remplacez
`imageOg: '/og.png'` par `imageOg: '/ma-photo.jpg'`.

---

## 7. Le formulaire de contact

Aujourd'hui, le bouton **« Préparer le message »** ouvre le logiciel de
messagerie du visiteur avec un message déjà rédigé, adressé à
`ptitcentral@gmail.com`. Le visiteur n'a plus qu'à l'envoyer.

C'est un choix assumé : un formulaire qui affiche « message envoyé » sans
rien envoyer est pire que pas de formulaire du tout.

**Pour brancher un vrai envoi automatique** (service type Formspree, Brevo ou
Resend, à partir d'une dizaine de francs par mois) : dites-le-nous, c'est une
demi-journée de travail. Tout est préparé dans `src/lib/contact.ts`.

---

## 8. Mettre le site en ligne

```bash
npm run build
```

Cette commande fabrique le site fini dans un dossier **`out/`**, et vérifie
au passage que rien ne manque. Ce dossier se dépose tel quel sur n'importe
quel hébergeur (Vercel, Infomaniak, Netlify…). Aucun serveur particulier
n'est nécessaire.

Avant la première mise en ligne, **vérifiez ces deux points** dans
`src/content/site.ts` :

1. **`url`** doit être l'adresse définitive du site. Elle sert aux liens
   envoyés à Google : une erreur ici pénalise le référencement.
2. **`geo`** (latitude / longitude) doit correspondre exactement à la
   position de votre fiche Google Business Profile.

---

## 9. Ce qui est déjà en place pour Google

- Titres et descriptions rédigés page par page
- Fiche « Restaurant » complète transmise à Google (adresse, téléphone,
  horaires, position, carte des plats)
- `sitemap.xml` et `robots.txt` générés automatiquement
- Image de partage, favicon
- **La carte est en vraies pages HTML, jamais en PDF ni en image** : c'est la
  condition n°1 pour sortir sur « restaurant Lausanne » ou « menu du jour
  Lausanne »

**Une seule chose reste à faire de votre côté** : que l'adresse, le nom et le
téléphone soient **écrits exactement de la même façon** ici et sur votre fiche
Google Business Profile. La moindre différence (un « Rue » contre « rue »)
affaiblit le référencement local.

---

## 10. Le document de direction artistique

`DIRECTION-ARTISTIQUE.md`, à la racine du dossier, décrit les couleurs, les
polices et les règles graphiques du site. **C'est le document de référence**
si un jour quelqu'un d'autre reprend le site.

---

## Questions

WeAreBrothers — [wearebrothers.ch](https://www.wearebrothers.ch)
