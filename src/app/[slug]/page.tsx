import type { Metadata } from 'next'

import { PageView, pageMetadata } from '@/components/PageView'
import { getPages, safe } from '@/lib/api'

/** Pre-render every published page at build time (Payload template does the same). */
export async function generateStaticParams() {
  const pages = await safe(getPages(), [])
  return pages.filter((p) => p.slug !== 'home').map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: PageProps<'/[slug]'>): Promise<Metadata> {
  const { slug } = await params
  return pageMetadata(slug)
}

export default async function Page({ params }: PageProps<'/[slug]'>) {
  const { slug } = await params
  return <PageView slug={slug} />
}
