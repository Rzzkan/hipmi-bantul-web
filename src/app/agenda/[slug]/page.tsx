import { CalendarDays, Clock, MapPin, Ticket, Users } from 'lucide-react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { RegistrationForm } from '@/blocks/Form/RegistrationForm'
import { Container } from '@/components/Container'
import { Media } from '@/components/Media'
import { RichText } from '@/components/RichText'
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
    <article>
      <header className="bg-navy-900 text-white">
        <Container className="grid items-center gap-10 py-14 md:grid-cols-[1.2fr_1fr]">
          <div>
            <p className="text-xs font-semibold tracking-widest text-gold uppercase">Agenda</p>
            <h1 className="mt-3 text-3xl leading-tight font-extrabold md:text-5xl">{event.title}</h1>
            {event.excerpt && <p className="mt-4 text-white/75">{event.excerpt}</p>}
            <ul className="mt-6 space-y-2 text-sm">
              {facts.map(({ icon: Icon, label, href }) => (
                <li key={label} className="flex items-center gap-2.5">
                  <Icon className="size-4 text-gold" />
                  {href ? (
                    <a href={href} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">
                      {label}
                    </a>
                  ) : (
                    label
                  )}
                </li>
              ))}
            </ul>
          </div>
          <Media src={event.coverImage} alt={event.title} priority className="aspect-[4/5] rounded-3xl md:aspect-square" />
        </Container>
      </header>

      <Container className="grid gap-12 py-14 lg:grid-cols-[1.3fr_1fr]">
        <RichText html={event.description} />
        <aside id="daftar" className="h-fit rounded-3xl border border-slate-200 p-6 shadow-sm lg:sticky lg:top-24">
          <h2 className="mb-1 text-xl font-bold">Daftar agenda ini</h2>
          <p className="mb-6 text-sm text-slate-500">
            {event.isFree ? 'Gratis' : `Biaya ${formatRupiah(event.price)} — info pembayaran dikirim via WhatsApp.`}
          </p>
          {event.registrationOpen ? (
            <RegistrationForm
              formType="event"
              defaultTargetId={event.id}
              successMessage="Terima kasih! Pendaftaranmu sudah masuk. Panitia akan konfirmasi via WhatsApp."
            />
          ) : (
            <p className="rounded-xl bg-slate-100 p-4 text-center text-slate-600">Pendaftaran sudah ditutup.</p>
          )}
        </aside>
      </Container>
    </article>
  )
}
