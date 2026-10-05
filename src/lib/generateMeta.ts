import type { Metadata } from 'next'

import type { Meta } from '@/types/cms'

import { getSiteURL } from './utils'

/** Same idea as Payload template's `utilities/generateMeta.ts`. */
export function generateMeta({ meta, path, fallbackTitle }: { meta?: Meta | null; path: string; fallbackTitle?: string }): Metadata {
  const title = meta?.title || fallbackTitle
  const url = `${getSiteURL()}${path}`

  return {
    title,
    description: meta?.description ?? undefined,
    alternates: { canonical: url },
    openGraph: {
      title: title ?? undefined,
      description: meta?.description ?? undefined,
      url,
      type: 'website',
      locale: 'id_ID',
      images: meta?.image ? [{ url: meta.image }] : undefined,
    },
  }
}
