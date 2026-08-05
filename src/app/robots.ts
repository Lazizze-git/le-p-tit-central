import type { MetadataRoute } from 'next';
import { SITE } from '@/content/site';

/** Tout est ouvert à l'indexation : un restaurant a intérêt à être trouvé. */
export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  };
}
