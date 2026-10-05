import { ChevronDown } from 'lucide-react'

import { Container } from '@/components/Container'
import { SectionIntro } from '@/components/SectionIntro'
import type { FaqBlock as Props } from '@/types/cms'

export function FaqBlock({ introContent, items }: Props) {
  return (
    <section className="surface-alt relative py-20">
      <div className="absolute inset-x-0 top-0 divider-glow" />
      <Container className="max-w-3xl">
        <SectionIntro html={introContent} badge="FAQ" center />
        <div className="space-y-3">
          {items.map((item) => (
            <details key={item.question} className="card group p-5 open:border-primary/30">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-heading">
                {item.question}
                <span className="grid size-8 shrink-0 place-items-center rounded-full bg-primary/10 text-brand transition group-open:rotate-180">
                  <ChevronDown className="size-4" />
                </span>
              </summary>
              <p className="mt-3 leading-relaxed text-muted">{item.answer}</p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  )
}
