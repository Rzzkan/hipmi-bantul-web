import { Container } from '@/components/Container'
import { SectionIntro } from '@/components/SectionIntro'
import { cn } from '@/lib/utils'
import type { StatsBlock as Props } from '@/types/cms'

// Warna angka bergantian seperti statistik di katalog: emas · hijau · coral
const tones = ['text-primary-dark dark:text-primary', 'text-accent-dark dark:text-accent-light', 'text-coral']

export function StatsBlock({ introContent, items }: Props) {
  return (
    <section className="surface relative py-14">
      <div className="absolute inset-x-0 top-0 divider-glow" />
      <Container>
        <SectionIntro html={introContent} center />
        <dl className="grid grid-cols-2 gap-6 sm:gap-8 md:grid-cols-[repeat(auto-fit,minmax(0,1fr))]">
          {items.map((item, i) => (
            <div key={item.label} className="text-center">
              <dd className={cn('text-3xl font-extrabold tracking-tight sm:text-4xl', tones[i % tones.length])}>{item.value}</dd>
              <dt className="mt-1 text-xs text-gray-400 sm:text-sm dark:text-gray-500">{item.label}</dt>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  )
}
