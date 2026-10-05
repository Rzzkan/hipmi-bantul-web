import { ArrowUpRight, CalendarDays, MapPin, Ticket } from 'lucide-react'
import Link from 'next/link'

import { dateParts, formatDate, formatRupiah, formatTime } from '@/lib/utils'
import type { CMSEvent, Post, Program } from '@/types/cms'

import { Media } from './Media'

export function PostCard({ post }: { post: Post }) {
  return (
    <Link href={`/berita/${post.slug}`} className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition hover:-translate-y-1 hover:shadow-lg">
      <Media src={post.coverImage} alt={post.title} className="aspect-[16/10]" imgClassName="transition group-hover:scale-105" sizes="(min-width: 768px) 33vw, 100vw" />
      <div className="flex flex-1 flex-col gap-2 p-5">
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <span className="rounded-full bg-navy-50 px-2 py-0.5 font-semibold text-navy-700">{post.categoryLabel}</span>
          <time dateTime={post.publishedAt ?? undefined}>{formatDate(post.publishedAt)}</time>
        </div>
        <h3 className="text-lg leading-snug font-bold text-slate-900 group-hover:text-navy-700">{post.title}</h3>
        {post.excerpt && <p className="line-clamp-2 text-sm text-slate-600">{post.excerpt}</p>}
      </div>
    </Link>
  )
}

export function EventCard({ event }: { event: CMSEvent }) {
  const { day, month } = dateParts(event.startAt)

  return (
    <Link href={`/agenda/${event.slug}`} className="group flex gap-4 rounded-2xl border border-slate-200 bg-white p-4 transition hover:-translate-y-1 hover:shadow-lg">
      <div className="flex w-16 shrink-0 flex-col items-center justify-center rounded-xl bg-navy-900 py-3 text-white">
        <span className="text-2xl leading-none font-extrabold">{day}</span>
        <span className="text-xs tracking-wider text-gold uppercase">{month}</span>
      </div>
      <div className="flex min-w-0 flex-col gap-1.5">
        <h3 className="font-bold text-slate-900 group-hover:text-navy-700">{event.title}</h3>
        <p className="flex items-center gap-1.5 text-xs text-slate-500">
          <CalendarDays className="size-3.5" /> {formatDate(event.startAt)} · {formatTime(event.startAt)} WIB
        </p>
        {event.location && (
          <p className="flex items-center gap-1.5 text-xs text-slate-500">
            <MapPin className="size-3.5" /> {event.location}
          </p>
        )}
        <div className="mt-1 flex flex-wrap items-center gap-2 text-xs">
          <span className="inline-flex items-center gap-1 rounded-full bg-gold/15 px-2 py-0.5 font-semibold text-amber-800">
            <Ticket className="size-3.5" /> {formatRupiah(event.price)}
          </span>
          {event.seatsLeft !== null && event.registrationOpen && (
            <span className="text-slate-500">Sisa {event.seatsLeft} kursi</span>
          )}
          {!event.registrationOpen && <span className="text-red-600">Pendaftaran ditutup</span>}
        </div>
      </div>
    </Link>
  )
}

export function ProgramCard({ program }: { program: Program }) {
  return (
    <Link href={`/program/${program.slug}`} className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition hover:-translate-y-1 hover:shadow-lg">
      <Media src={program.coverImage} alt={program.title} className="aspect-[16/9]" sizes="(min-width: 768px) 50vw, 100vw" />
      {program.isFeatured && (
        <span className="absolute top-3 left-3 rounded-full bg-gold px-2.5 py-0.5 text-xs font-bold text-navy-900">Unggulan</span>
      )}
      <div className="flex flex-1 flex-col gap-2 p-5">
        <span className="text-xs font-semibold tracking-wide text-navy-600 uppercase">{program.categoryLabel}</span>
        <h3 className="flex items-start justify-between gap-2 text-lg font-bold text-slate-900">
          {program.title}
          <ArrowUpRight className="size-5 shrink-0 text-slate-400 transition group-hover:text-navy-700" />
        </h3>
        {program.summary && <p className="line-clamp-3 text-sm text-slate-600">{program.summary}</p>}
      </div>
    </Link>
  )
}
