import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { RenderBlocks } from '@/blocks/RenderBlocks'
import { RenderHero } from '@/heros/RenderHero'
import { getPage } from '@/lib/api'
import { generateMeta } from '@/lib/generateMeta'

export async function pageMetadata(slug: string): Promise<Metadata> {
  const page = await getPage(slug)
  return generateMeta({ meta: page?.meta, path: slug === 'home' ? '/' : `/${slug}` })
}

/** Renders a CMS page: hero + layout blocks (Payload `[slug]/page.tsx` pattern). */
export async function PageView({ slug }: { slug: string }) {
  const page = await getPage(slug)
  if (!page) notFound()

  return (
    <article>
      <RenderHero hero={page.hero} />
      <RenderBlocks blocks={page.layout} />
    </article>
  )
}
