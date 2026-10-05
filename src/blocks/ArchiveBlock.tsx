import Link from 'next/link'

import { EventCard, PostCard, ProgramCard } from '@/components/Cards'
import { Container } from '@/components/Container'
import { SectionIntro } from '@/components/SectionIntro'
import type { ArchiveBlock as Props } from '@/types/cms'

const more = {
  posts: { href: '/berita', label: 'Semua berita' },
  events: { href: '/agenda', label: 'Semua agenda' },
  programs: { href: '/program', label: 'Semua program' },
}

/** Payload `ArchiveBlock` — collection docs are pre-populated by the API. */
export function ArchiveBlock(props: Props) {
  const { introContent, relationTo } = props

  return (
    <section className={relationTo === 'events' ? 'bg-slate-50 py-16 md:py-20' : 'py-16 md:py-20'}>
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionIntro html={introContent} />
          <Link href={more[relationTo].href} className="mb-10 text-sm font-semibold text-navy-700 hover:underline">
            {more[relationTo].label} →
          </Link>
        </div>

        {props.docs.length === 0 && <p className="text-slate-500">Belum ada data untuk ditampilkan.</p>}

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
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {props.docs.map((doc) => (
              <ProgramCard key={doc.id} program={doc} />
            ))}
          </div>
        )}
      </Container>
    </section>
  )
}
