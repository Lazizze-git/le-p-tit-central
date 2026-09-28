/**
 * Vérification après la construction du site.
 *
 * Contrôle que les fichiers indispensables au référencement, au
 * partage et au serveur sont bien présents dans `out/`, et que le
 * .htaccess redirige vers l'adresse du site. Échoue bruyamment sinon :
 * mieux vaut une construction rouge qu'un site en ligne amputé.
 */

import { existsSync, readFileSync, rmSync } from 'node:fs';
import { join } from 'node:path';

const SORTIE = join(process.cwd(), 'out');

const INDISPENSABLES = [
  'index.html',
  'carte/index.html',
  'le-lieu/index.html',
  'contact/index.html',
  '404.html',
  'robots.txt',
  'sitemap.xml',
  'icon.svg',
  'og.png',
  '.htaccess',
];

/** Notes de travail rangées à côté des photos : elles n'ont rien à faire en ligne. */
const A_RETIRER = ['photos/LISEZ-MOI.txt'];

function echouer(message) {
  console.error(message);
  process.exit(1);
}

const manquants = INDISPENSABLES.filter((fichier) => !existsSync(join(SORTIE, fichier)));

if (manquants.length > 0) {
  echouer(`Fichiers manquants dans out/ : ${manquants.join(', ')}`);
}

for (const fichier of A_RETIRER) {
  rmSync(join(SORTIE, fichier), { force: true });
}

// Le .htaccess écrit le domaine en toutes lettres. Ce doit être celui
// que le site annonce à Google dans robots.txt, c'est-à-dire `url` dans
// src/content/site.ts : sinon chaque visiteur serait renvoyé ailleurs.
const robots = readFileSync(join(SORTIE, 'robots.txt'), 'utf8');
const plan = robots.match(/^Sitemap:\s*(\S+)/m)?.[1];

if (!plan) {
  echouer('robots.txt ne donne pas l’adresse du plan du site.');
}

const origine = new URL(plan).origin;
const domaine = new URL(origine).hostname.replace(/^www\./, '');

const reglages = readFileSync(join(SORTIE, '.htaccess'), 'utf8')
  .split('\n')
  .filter((ligne) => !ligne.trimStart().startsWith('#'))
  .join('\n');
const adresses = new Set(reglages.match(/https?:\/\/[^/\s\]]+/g));

if (adresses.size !== 1 || !adresses.has(origine) || !reglages.includes(domaine.replaceAll('.', '\\.'))) {
  echouer(
    `public/.htaccess doit reconnaître le domaine ${domaine} et rediriger vers ${origine}, ` +
      `l’adresse du site (src/content/site.ts). ` +
      `Adresses qu’il mentionne : ${[...adresses].join(', ') || 'aucune'}.`,
  );
}

console.info(
  `Site construit : ${INDISPENSABLES.length} fichiers clés vérifiés dans out/, serveur réglé sur ${origine}`,
);
