import { CMSLink } from '@/components/CMSLink'
import { Container } from '@/components/Container'
import { Media } from '@/components/Media'
import { RichText } from '@/components/RichText'
import type { Hero } from '@/types/cms'

export function HighImpactHero({ eyebrow, richText, media, links }: Hero) {
  return (
    <section className="relative isolate flex min-h-[80vh] items-end overflow-hidden bg-navy-900 text-white">
      <Media src={media} alt="" priority sizes="100vw" className="absolute inset-0 -z-20" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-navy-950 via-navy-900/70 to-navy-900/30" />
      <Container className="pt-24 pb-16 md:pb-24">
        <div className="max-w-3xl">
          {eyebrow && <p className="mb-4 inline-block rounded-full border border-gold/50 px-3 py-1 text-xs font-semibold tracking-widest text-gold uppercase">{eyebrow}</p>}
          <RichText html={richText} invert className="prose-lg prose-h2:text-4xl prose-h2:leading-tight md:prose-h2:text-6xl prose-p:text-white/80" />
          {links.length > 0 && (
            <div className="mt-8 flex flex-wrap gap-3">
              {links.map((link) => (
                <CMSLink key={link.url} link={link} className="px-6 py-3 text-base" />
              ))}
            </div>
          )}
        </div>
      </Container>
    </section>
  )
}
