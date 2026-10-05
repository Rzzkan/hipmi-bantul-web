import { Container } from '@/components/Container'
import { SectionIntro } from '@/components/SectionIntro'
import type { StatsBlock as Props } from '@/types/cms'

export function StatsBlock({ introContent, items }: Props) {
  return (
    <section className="border-b border-slate-200 bg-white py-12">
      <Container>
        <SectionIntro html={introContent} />
        <dl className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-[repeat(auto-fit,minmax(0,1fr))]">
          {items.map((item) => (
            <div key={item.label} className="border-l-4 border-gold pl-4">
              <dt className="text-sm text-slate-500">{item.label}</dt>
              <dd className="text-3xl font-extrabold tracking-tight text-navy-900 md:text-4xl">{item.value}</dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  )
}
