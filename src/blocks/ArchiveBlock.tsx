import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

import { EventCard, PostCard, ProgramCard } from '@/components/Cards'
import { buttonClass } from '@/components/CMSLink'
import { Container } from '@/components/Container'
import { SectionIntro } from '@/components/SectionIntro'
import { cn } from '@/lib/utils'
import type { ArchiveBlock as Props } from '@/types/cms'

const config = {
  posts: { href: '/berita', label: 'Semua Berita', badge: 'Kabar Terbaru', variant: 'primary', bg: 'surface' },
  events: { href: '/agenda', label: 'Semua Agenda', badge: 'Agenda', variant: 'accent', bg: 'surface-alt' },
  programs: { href: '/program', label: 'Semua Program', badge: 'Program', variant: 'primary', bg: 'surface-alt' },
} as const

/** Payload `ArchiveBlock` — collection docs are pre-populated by the API. */
export function ArchiveBlock(props: Props) {
  const { introContent, relationTo } = props
  const c = config[relationTo]

  return (
    <section className={cn('relative py-20', c.bg)}>
      <div className="absolute inset-x-0 top-0 divider-glow" />
      <Container>
        <div className="mb-12 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <SectionIntro html={introContent} badge={c.badge} badgeVariant={c.variant} className="mb-0" />
          <Link href={c.href} className={buttonClass('outline', 'shrink-0')}>
            {c.label} <ArrowRight className="size-4" />
          </Link>
        </div>

        {props.docs.length === 0 && <p className="text-muted">Belum ada data untuk ditampilkan.</p>}

        {props.relationTo === 'posts' && (
          <div className="grid gap-6 md:grid-cols-3">
            {props.docs.map((doc) => (
              <PostCard key={doc.id} post={doc} />
            ))}
          </div>
        )}
        {props.relationTo === 'events' && (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {props.docs.map((doc) => (
              <EventCard key={doc.id} event={doc} />
            ))}
          </div>
        )}
        {props.relationTo === 'programs' && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 xl:grid-cols-4">
            {props.docs.map((doc) => (
              <ProgramCard key={doc.id} program={doc} />
            ))}
          </div>
        )}
      </Container>
    </section>
  )
}
