import { CMSLink } from '@/components/CMSLink'
import { Container } from '@/components/Container'
import { RichText } from '@/components/RichText'
import type { Hero } from '@/types/cms'

import { HeroBackground } from './HeroBackground'

export function LowImpactHero({ eyebrow, richText, links }: Pick<Hero, 'eyebrow' | 'richText' | 'links'>) {
  return (
    <section className="relative isolate overflow-hidden">
      <HeroBackground />
      <Container className="py-16 text-center md:py-24">
        {eyebrow && <span className="badge mb-5">{eyebrow}</span>}
        <RichText
          html={richText}
          className="hero-text mx-auto max-w-3xl prose-h2:mb-4 prose-h2:text-3xl prose-h2:leading-tight sm:prose-h2:text-5xl prose-p:text-lg prose-p:text-gray-500 dark:prose-p:text-gray-400"
        />
        {links.length > 0 && (
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {links.map((link) => (
              <CMSLink key={link.url} link={link} />
            ))}
          </div>
        )}
      </Container>
    </section>
  )
}
