import { CMSLink } from '@/components/CMSLink'
import { Container } from '@/components/Container'
import { RichText } from '@/components/RichText'
import type { CallToActionBlock as Props } from '@/types/cms'

/** Kartu CTA gelap + grid glow emas (selalu gelap agar menonjol di mode terang). */
export function CallToActionBlock({ richText, links }: Props) {
  return (
    <section className="surface-alt py-20">
      <Container>
        <div className="dark relative isolate flex flex-col gap-8 overflow-hidden rounded-3xl bg-ink-950 p-8 text-white shadow-2xl shadow-primary/10 md:flex-row md:items-center md:justify-between md:p-14">
          <div className="absolute inset-0 -z-10 brand-grid-glow" />
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
          <RichText html={richText} className="hero-text max-w-2xl prose-h3:text-2xl sm:prose-h3:text-3xl prose-p:text-gray-400" />
          <div className="flex shrink-0 flex-wrap gap-3">
            {links.map((link, i) => (
              <CMSLink key={link.url} link={link} appearance={i === 0 ? 'accent' : link.appearance} className="px-8 py-4 text-base" />
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
