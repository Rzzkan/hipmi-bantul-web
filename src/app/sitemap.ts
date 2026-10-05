import type { MetadataRoute } from 'next'

import { getEvents, getPages, getPosts, getPrograms, safe } from '@/lib/api'
import { getSiteURL } from '@/lib/utils'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = getSiteURL()
  const [pages, posts, events, programs] = await Promise.all([
    safe(getPages(), []),
    safe(getPosts({ limit: 50 }), null),
    safe(getEvents({ when: 'all', limit: 50 }), null),
    safe(getPrograms(), []),
  ])

  return [
    ...pages.map((p) => ({ url: p.slug === 'home' ? base : `${base}/${p.slug}`, lastModified: p.updatedAt })),
    { url: `${base}/berita` },
    { url: `${base}/agenda` },
    { url: `${base}/program` },
    ...(posts?.data ?? []).map((p) => ({ url: `${base}/berita/${p.slug}`, lastModified: p.publishedAt ?? undefined })),
    ...(events?.data ?? []).map((e) => ({ url: `${base}/agenda/${e.slug}` })),
    ...programs.map((p) => ({ url: `${base}/program/${p.slug}` })),
  ]
}
