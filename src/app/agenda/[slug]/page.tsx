import { CalendarDays, Clock, MapPin, Ticket, Users } from 'lucide-react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { RegistrationForm } from '@/blocks/Form/RegistrationForm'
import { Container } from '@/components/Container'
import { Media } from '@/components/Media'
import { RichText } from '@/components/RichText'
import { HeroBackground } from '@/heros/HeroBackground'
import { getEvent, getEvents } from '@/lib/api'
import { generateMeta } from '@/lib/generateMeta'
import { formatDate, formatRupiah, formatTime } from '@/lib/utils'

export async function generateStaticParams() {
  const res = await getEvents({ when: 'upcoming', limit: 50 })
  return (res?.data ?? []).map((e) => ({ slug: e.slug }))
}

export async function generateMetadata({ params }: PageProps<'/agenda/[slug]'>): Promise<Metadata> {
  const { slug } = await params
  const event = await getEvent(slug)
  return generateMeta({ meta: event?.meta, path: `/agenda/${slug}` })
}

export default async function EventPage({ params }: PageProps<'/agenda/[slug]'>) {
  const { slug } = await params
  const event = await getEvent(slug)
  if (!event) notFound()

  const facts = [
    { icon: CalendarDays, label: formatDate(event.startAt, false) },
    { icon: Clock, label: `${formatTime(event.startAt)}${event.endAt ? ` – ${formatTime(event.endAt)}` : ''} WIB` },
    { icon: MapPin, label: event.location, href: event.locationUrl },
    { icon: Ticket, label: formatRupiah(event.price) },
    { icon: Users, label: event.quota ? `Kuota ${event.quota} orang${event.seatsLeft !== null ? ` · sisa ${event.seatsLeft}` : ''}` : null },
  ].filter((f) => f.label)

  return (
    <article className="surface">
      <header className="relative isolate overflow-hidden">
        <HeroBackground />
        <Container className="grid items-center gap-10 py-14 md:grid-cols-[1.2fr_1fr]">
          <div>
            <span className="badge-accent">Agenda</span>
            <h1 className="mt-4 text-3xl leading-tight font-extrabold text-heading md:text-5xl">{event.title}</h1>
            {event.excerpt && <p className="mt-4 text-lg text-muted">{event.excerpt}</p>}
            <ul className="mt-6 space-y-2.5 text-sm text-gray-700 dark:text-gray-300">
              {facts.map(({ icon: Icon, label, href }) => (
                <li key={label} className="flex items-center gap-2.5">
                  <span className="grid size-8 place-items-center rounded-lg bg-primary/15 text-brand"><Icon className="size-4" /></span>
                  {href ? (
                    <a href={href} target="_blank" rel="noopener noreferrer" className="font-semibold text-brand underline-offset-4 hover:underline">
                      {label}
                    </a>
                  ) : (
                    label
                  )}
                </li>
              ))}
            </ul>
          </div>
          <Media src={event.coverImage} alt={event.title} priority className="aspect-[4/5] rounded-3xl shadow-2xl shadow-primary/10 md:aspect-square dark:shadow-black/40" />
        </Container>
      </header>

      <Container className="grid gap-12 py-16 lg:grid-cols-[1.3fr_1fr]">
        <RichText html={event.description} />
        <aside id="daftar" className="card h-fit rounded-3xl p-6 lg:sticky lg:top-28">
          <h2 className="mb-1 text-xl font-extrabold text-heading">Daftar agenda ini</h2>
          <p className="mb-6 text-sm text-muted">
            {event.isFree ? 'Gratis' : `Biaya ${formatRupiah(event.price)} — info pembayaran dikirim via WhatsApp.`}
          </p>
          {event.registrationOpen ? (
            <RegistrationForm
              formType="event"
              defaultTargetId={event.id}
              successMessage="Terima kasih! Pendaftaranmu sudah masuk. Panitia akan konfirmasi via WhatsApp."
            />
          ) : (
            <p className="rounded-xl bg-coral/10 p-4 text-center font-semibold text-coral-dark dark:text-coral">Pendaftaran sudah ditutup.</p>
          )}
        </aside>
      </Container>
    </article>
  )
}
