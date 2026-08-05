/**
 * Vérification après la construction du site.
 *
 * Contrôle que les fichiers indispensables au référencement et au
 * partage sont bien présents dans `out/`. Échoue bruyamment sinon :
 * mieux vaut une construction rouge qu'un site en ligne amputé.
 */

import { existsSync } from 'node:fs';
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
];

const manquants = INDISPENSABLES.filter((fichier) => !existsSync(join(SORTIE, fichier)));

if (manquants.length > 0) {
  console.error(`Fichiers manquants dans out/ : ${manquants.join(', ')}`);
  process.exit(1);
}

console.info(`Site construit : ${INDISPENSABLES.length} fichiers clés vérifiés dans out/`);
