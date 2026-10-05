import { CMSLink } from '@/components/CMSLink'
import { Container } from '@/components/Container'
import { RichText } from '@/components/RichText'
import type { CallToActionBlock as Props } from '@/types/cms'

export function CallToActionBlock({ richText, links }: Props) {
  return (
    <section className="py-16">
      <Container>
        <div className="relative flex flex-col gap-6 overflow-hidden rounded-3xl bg-navy-900 p-8 text-white md:flex-row md:items-center md:justify-between md:p-12">
          <div className="pointer-events-none absolute -bottom-20 -left-10 size-72 rounded-full bg-gold/25 blur-3xl" />
          <RichText html={richText} invert className="relative max-w-2xl prose-h3:text-2xl md:prose-h3:text-3xl prose-p:text-white/75" />
          <div className="relative flex shrink-0 flex-wrap gap-3">
            {links.map((link) => (
              <CMSLink key={link.url} link={link} className="px-6 py-3" />
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
