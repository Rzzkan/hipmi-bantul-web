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
  default: 'bg-white',
  muted: 'bg-slate-50',
  brand: 'bg-navy-900 text-white',
}

export function ContentBlock({ columns, background }: Props) {
  const invert = background === 'brand'

  return (
    <section className={cn('py-16 md:py-20', bg[background] ?? bg.default)}>
      <Container className="grid grid-cols-1 gap-x-12 gap-y-8 lg:grid-cols-12">
        {columns.map((col, i) => (
          <div key={i} className={cn('col-span-1', colSpan[col.size] ?? colSpan.full)}>
            <RichText html={col.richText} invert={invert} className="prose-h2:text-3xl" />
            {col.link && <CMSLink link={col.link} appearance={invert ? col.link.appearance : 'inline'} className="mt-4 inline-block font-semibold text-navy-700" />}
          </div>
        ))}
      </Container>
    </section>
  )
}
