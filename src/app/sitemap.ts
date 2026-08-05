import type { MetadataRoute } from 'next';
import { SITE } from '@/content/site';
import { NAV } from '@/content/textes';

/**
 * Plan du site pour Google. Il se génère à partir de la navigation :
 * ajouter une page dans src/content/textes.ts l'ajoute ici aussi,
 * sans risque d'oubli.
 */
export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const misAJour = new Date();

  return [
    {
      url: `${SITE.url}/`,
      lastModified: misAJour,
      changeFrequency: 'weekly',
      priority: 1,
    },
    ...NAV.map((item) => ({
      url: `${SITE.url}${item.href}`,
      lastModified: misAJour,
      // La carte change souvent, le reste beaucoup moins.
      changeFrequency: (item.href === '/carte/' ? 'weekly' : 'monthly') as 'weekly' | 'monthly',
      priority: item.href === '/carte/' ? 0.9 : 0.7,
    })),
  ];
}
