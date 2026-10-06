import { ExternalLink } from 'lucide-react'

import { buttonClass } from '@/components/CMSLink'
import { Container } from '@/components/Container'
import { SectionIntro } from '@/components/SectionIntro'
import type { EmbedBlockType as Props } from '@/types/cms'

/**
 * Google Form yang di-embed (iframe). Selalu ada tombol 'buka di tab baru' sebagai cadangan
 * — berguna di HP atau bila formulir meminta login Google.
 */
export function EmbedBlock({
  introContent,
  embedUrl,
  openUrl,
  height,
  buttonLabel,
}: Props) {
  return (
    <section className="surface-alt relative py-20">
      <div className="absolute inset-x-0 top-0 divider-glow" />
      <Container className="max-w-3xl">
        <SectionIntro html={introContent} badge='Formulir Pendaftaran' center />

        <div className="mb-6 flex flex-col items-center gap-2 text-center">
          <a
            href={openUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonClass('default')}
          >
            {buttonLabel || 'Buka formulir di tab baru'}
            <ExternalLink className="size-4" />
          </a>
          <p className="text-xs text-muted">
            Formulir tidak tampil? Klik tombol di atas untuk mengisinya langsung
            di Google Form.
          </p>
        </div>
        <div className="card overflow-hidden p-0">
          <iframe
            src={embedUrl}
            title="Formulir pendaftaran anggota HIPMI Bantul"
            loading="lazy"
            className="block w-full border-0 bg-white"
            style={{ height }}
          >
            Memuat formulir…
          </iframe>
        </div>
      </Container>
    </section>
  )
}
