import { CMSLink } from '@/components/CMSLink'
import { Container } from '@/components/Container'
import { Media } from '@/components/Media'
import { RichText } from '@/components/RichText'
import type { Hero } from '@/types/cms'

import { HeroBackground } from './HeroBackground'

export function MediumImpactHero({ eyebrow, richText, media, links }: Hero) {
  return (
    <section className="relative isolate overflow-hidden">
      <HeroBackground />
      <Container className="grid items-center gap-10 py-16 md:grid-cols-2 md:py-24">
        <div>
          {eyebrow && <span className="badge mb-5">{eyebrow}</span>}
          <RichText html={richText} className="hero-text prose-h2:text-4xl prose-h2:leading-tight sm:prose-h2:text-5xl prose-p:text-gray-500 dark:prose-p:text-gray-400" />
          {links.length > 0 && (
            <div className="mt-8 flex flex-wrap gap-3">
              {links.map((link) => (
                <CMSLink key={link.url} link={link} />
              ))}
            </div>
          )}
        </div>
        <Media src={media} alt="" priority className="aspect-[4/3] rounded-3xl shadow-2xl shadow-primary/10 dark:shadow-black/40" />
      </Container>
    </section>
  )
}
