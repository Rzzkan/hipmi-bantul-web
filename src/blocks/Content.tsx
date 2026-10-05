import { CMSLink } from '@/components/CMSLink'
import { Container } from '@/components/Container'
import { RichText } from '@/components/RichText'
import { cn } from '@/lib/utils'
import type { ContentBlock as Props } from '@/types/cms'

const colSpan = {
  full: 'lg:col-span-12',
  half: 'lg:col-span-6',
  oneThird: 'lg:col-span-4',
  twoThirds: 'lg:col-span-8',
}

const bg = {
  default: 'surface',
  muted: 'bg-cream-light dark:bg-ink-950',
  brand: 'dark bg-ink-950 brand-grid-glow text-white',
}

export function ContentBlock({ columns, background }: Props) {
  return (
    <section className={cn('relative py-20', bg[background] ?? bg.default)}>
      <div className="absolute inset-x-0 top-0 divider-glow" />
      <Container className="grid grid-cols-1 gap-x-12 gap-y-8 lg:grid-cols-12">
        {columns.map((col, i) => (
          <div key={i} className={cn('col-span-1', colSpan[col.size] ?? colSpan.full)}>
            <RichText html={col.richText} className="prose-h2:text-3xl sm:prose-h2:text-4xl prose-p:text-gray-600 dark:prose-p:text-gray-400" />
            {col.link && <CMSLink link={col.link} className="mt-6" />}
          </div>
        ))}
      </Container>
    </section>
  )
}
