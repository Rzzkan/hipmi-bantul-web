import type { Metadata } from 'next'

import { EventCard } from '@/components/Cards'
import { Container } from '@/components/Container'
import { PageHeader } from '@/components/PageHeader'
import { getEvents } from '@/lib/api'

export const metadata: Metadata = { title: 'Agenda', description: 'Agenda dan event BPC HIPMI Bantul yang bisa kamu ikuti.' }

export default async function AgendaPage() {
  const [upcoming, past] = await Promise.all([getEvents({ when: 'upcoming', limit: 30 }), getEvents({ when: 'past', limit: 6 })])

  return (
    <>
      <PageHeader eyebrow="Agenda" title="Agenda & Event" description="Gathering, kelas, dan forum bisnis untuk anggota maupun umum." />
      <div className="surface relative">
        <div className="absolute inset-x-0 top-0 divider-glow" />
      <Container className="py-16">
        <h2 className="mb-6 text-2xl font-extrabold text-heading">Akan datang</h2>
        {!upcoming?.data.length ? (
          <p className="text-muted">Belum ada agenda terjadwal. Pantau terus ya!</p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {upcoming.data.map((e) => (
              <EventCard key={e.id} event={e} />
            ))}
          </div>
        )}

        {!!past?.data.length && (
          <>
            <h2 className="mt-16 mb-6 text-2xl font-extrabold text-gray-400 dark:text-gray-500">Sudah berlangsung</h2>
            <div className="grid gap-4 opacity-75 md:grid-cols-2 lg:grid-cols-3">
              {past.data.map((e) => (
                <EventCard key={e.id} event={e} />
              ))}
            </div>
          </>
        )}
      </Container>
      </div>
    </>
  )
}
