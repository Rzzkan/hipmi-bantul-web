import { CMSLink } from '@/components/CMSLink'
import { Container } from '@/components/Container'
import { Media } from '@/components/Media'
import { RichText } from '@/components/RichText'
import type { Hero } from '@/types/cms'

import { HeroBackground } from './HeroBackground'

/**
 * Hero besar & terpusat ala katalog.hipmibantul.com.
 * Tips di CMS: tebalkan (Bold) sebagian judul untuk efek gradasi emas → hijau.
 * Jika ada gambar, gambar jadi latar dengan overlay gelap.
 */
export function HighImpactHero({ eyebrow, richText, media, links }: Hero) {
  const hasMedia = Boolean(media)

  return (
    <section className={hasMedia ? 'dark relative isolate overflow-hidden' : 'relative isolate overflow-hidden'}>
      {hasMedia ? (
        <>
          <Media src={media} alt="" priority sizes="100vw" className="absolute inset-0 -z-20" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink-950 via-ink-950/75 to-ink-950/40" />
        </>
      ) : (
        <HeroBackground />
      )}
      <Container className="flex min-h-[calc(88vh-5rem)] flex-col items-center justify-center py-20 text-center">
        {eyebrow && <span className="badge mb-6 animate-fade-in-up">{eyebrow}</span>}
        <RichText
          html={richText}
          className="hero-text mx-auto max-w-5xl animate-fade-in-up prose-h2:mb-6 prose-h2:text-4xl prose-h2:leading-tight prose-h2:font-extrabold sm:prose-h2:text-5xl lg:prose-h2:text-6xl xl:prose-h2:text-7xl prose-p:mx-auto prose-p:max-w-3xl prose-p:text-lg prose-p:leading-relaxed prose-p:text-gray-500 sm:prose-p:text-xl dark:prose-p:text-gray-400"
        />
        {links.length > 0 && (
          <div className="mt-10 flex w-full flex-col items-center justify-center gap-4 sm:w-auto sm:flex-row">
            {links.map((link, i) => (
              <CMSLink key={link.url} link={link} appearance={i === 0 ? 'default' : link.appearance === 'outline' ? 'accent' : link.appearance} className="w-full px-8 py-4 text-base sm:w-auto" />
            ))}
          </div>
        )}
      </Container>
    </section>
  )
}
