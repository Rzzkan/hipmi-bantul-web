import Image from 'next/image'

import { Container } from '@/components/Container'
import { SectionIntro } from '@/components/SectionIntro'
import type { PartnersBlock as Props } from '@/types/cms'

export function PartnersBlock({ introContent, partners }: Props) {
  if (!partners.length) return null

  return (
    <section className="py-16">
      <Container>
        <SectionIntro html={introContent} />
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {partners.map((p) => {
            const inner = p.logo ? (
              <Image src={p.logo} alt={p.name} width={160} height={64} className="h-12 w-auto object-contain grayscale transition group-hover:grayscale-0" />
            ) : (
              <span className="text-sm font-semibold text-slate-500">{p.name}</span>
            )
            return (
              <li key={p.id} className="group grid h-24 place-items-center rounded-2xl border border-slate-200 bg-white px-4">
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
