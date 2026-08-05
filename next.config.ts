import type { NextConfig } from 'next';

/**
 * Export statique : `npm run build` produit un dossier `out/` composé
 * uniquement de fichiers HTML/CSS/JS. Il se déploie tel quel sur Vercel,
 * Netlify, Infomaniak ou n'importe quel hébergeur classique.
 */
const nextConfig: NextConfig = {
  output: 'export',
  // Une URL par page, sans extension : /carte/ plutôt que /carte.html
  trailingSlash: true,
  // Pas d'optimisation d'images côté serveur : l'export statique n'a pas de serveur.
  images: { unoptimized: true },
  // Les erreurs de typage bloquent le build : c'est voulu.
  typescript: { ignoreBuildErrors: false },
};

export default nextConfig;
