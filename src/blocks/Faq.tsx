import { ChevronDown } from 'lucide-react'

import { Container } from '@/components/Container'
import { SectionIntro } from '@/components/SectionIntro'
import type { FaqBlock as Props } from '@/types/cms'

export function FaqBlock({ introContent, items }: Props) {
  return (
    <section className="py-16 md:py-20">
      <Container className="max-w-3xl">
        <SectionIntro html={introContent} />
        <div className="divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white">
          {items.map((item) => (
            <details key={item.question} className="group p-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-slate-900">
                {item.question}
                <ChevronDown className="size-5 shrink-0 transition group-open:rotate-180" />
              </summary>
              <p className="mt-3 text-slate-600">{item.answer}</p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  )
}
