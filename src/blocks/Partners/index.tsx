import { Container } from '@/components/Container'
import { RichText } from '@/components/RichText'
import type { PartnersBlock as Props } from '@/types/cms'

import { PartnerGrid } from './PartnerGrid'

/**
 * "Didukung Oleh" — gaya logo wall: judul tebal di tengah, subjudul, logo monokrom
 * tanpa kartu dalam grid 5 kolom, lalu tombol "Lihat Lebih Banyak Mitra →".
 */
export function PartnersBlock({ introContent, partners, limit = 10, moreLabel, moreUrl }: Props) {
  if (!partners.length) return null

  return (
    <section className="surface relative py-20 sm:py-24">
      <div className="absolute inset-x-0 top-0 divider-glow" />
      <Container>
        {introContent && (
          <RichText
            html={introContent}
            className="mx-auto mb-12 max-w-2xl text-center prose-h2:mb-3 prose-h2:text-3xl prose-h2:font-extrabold prose-h2:tracking-tight sm:prose-h2:text-5xl prose-p:text-base prose-p:text-gray-600 sm:prose-p:text-lg dark:prose-p:text-gray-400 sm:mb-16"
          />
        )}
        <PartnerGrid partners={partners} limit={limit} moreLabel={moreLabel || 'Lihat Lebih Banyak Mitra'} moreUrl={moreUrl ?? null} />
      </Container>
    </section>
  )
}
