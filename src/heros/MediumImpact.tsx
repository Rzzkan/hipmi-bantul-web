import { CMSLink } from '@/components/CMSLink'
import { Container } from '@/components/Container'
import { Media } from '@/components/Media'
import { RichText } from '@/components/RichText'
import type { Hero } from '@/types/cms'

export function MediumImpactHero({ eyebrow, richText, media, links }: Hero) {
  return (
    <section className="bg-navy-900 text-white">
      <Container className="grid items-center gap-10 py-16 md:grid-cols-2 md:py-24">
        <div>
          {eyebrow && <p className="mb-3 text-xs font-semibold tracking-widest text-gold uppercase">{eyebrow}</p>}
          <RichText html={richText} invert className="prose-h2:text-4xl prose-p:text-white/80" />
          {links.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-3">
              {links.map((link) => (
                <CMSLink key={link.url} link={link} />
              ))}
            </div>
          )}
        </div>
        <Media src={media} alt="" priority className="aspect-[4/3] rounded-3xl" />
      </Container>
    </section>
  )
}
