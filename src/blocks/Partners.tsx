import Image from 'next/image'

import { Container } from '@/components/Container'
import { SectionIntro } from '@/components/SectionIntro'
import type { PartnersBlock as Props } from '@/types/cms'

export function PartnersBlock({ introContent, partners }: Props) {
  if (!partners.length) return null

  return (
    <section className="surface relative py-20">
      <div className="absolute inset-x-0 top-0 divider-glow" />
      <Container>
        <SectionIntro html={introContent} badge="Partner" center />
        <ul className="flex flex-wrap justify-center gap-4">
          {partners.map((p) => {
            const inner = p.logo ? (
              <Image src={p.logo} alt={p.name} width={160} height={64} className="h-12 w-auto object-contain opacity-70 grayscale transition group-hover:opacity-100 group-hover:grayscale-0 dark:invert-0" />
            ) : (
              <span className="text-sm font-semibold text-muted">{p.name}</span>
            )
            return (
              <li key={p.id} className="card group grid h-24 w-[calc(50%-0.5rem)] place-items-center px-4 transition hover:border-primary/40 sm:w-48">
                {p.url ? (
                  <a href={p.url} target="_blank" rel="noopener noreferrer" aria-label={p.name}>
                    {inner}
                  </a>
                ) : (
                  inner
                )}
              </li>
            )
          })}
        </ul>
      </Container>
    </section>
  )
}
