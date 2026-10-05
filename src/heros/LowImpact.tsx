import { CMSLink } from '@/components/CMSLink'
import { Container } from '@/components/Container'
import { RichText } from '@/components/RichText'
import type { Hero } from '@/types/cms'

export function LowImpactHero({ eyebrow, richText, links }: Pick<Hero, 'eyebrow' | 'richText' | 'links'>) {
  return (
    <section className="relative overflow-hidden bg-navy-900 text-white">
      <div className="pointer-events-none absolute -top-24 -right-24 size-80 rounded-full bg-gold/20 blur-3xl" />
      <Container className="relative py-14 md:py-20">
        {eyebrow && <p className="mb-3 text-xs font-semibold tracking-widest text-gold uppercase">{eyebrow}</p>}
        <RichText html={richText} invert className="max-w-3xl prose-h2:mb-3 prose-h2:text-3xl md:prose-h2:text-5xl prose-p:text-white/75" />
        {links.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-3">
            {links.map((link) => (
              <CMSLink key={link.url} link={link} />
            ))}
          </div>
        )}
      </Container>
    </section>
  )
}
