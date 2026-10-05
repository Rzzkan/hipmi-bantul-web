import type { MetadataRoute } from 'next'

import { getSiteURL } from '@/lib/utils'

export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: '*', allow: '/', disallow: '/api/' }, sitemap: `${getSiteURL()}/sitemap.xml` }
}
