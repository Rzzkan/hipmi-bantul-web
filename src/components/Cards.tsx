import { ArrowUpRight, CalendarDays, MapPin, Ticket } from 'lucide-react'
import Link from 'next/link'

import { dateParts, formatDate, formatRupiah, formatTime } from '@/lib/utils'
import type { CMSEvent, Post, Program } from '@/types/cms'

import { Media } from './Media'

/** Kartu ala katalog: putih / #161a24, rounded-2xl, gambar zoom & terangkat saat hover. */

export function PostCard({ post }: { post: Post }) {
  return (
    <Link href={`/berita/${post.slug}`} className="card card-hover group flex flex-col overflow-hidden">
      <div className="relative">
        <Media src={post.coverImage} alt={post.title} className="aspect-[16/10]" imgClassName="transition-transform duration-700 group-hover:scale-110" sizes="(min-width: 768px) 33vw, 100vw" />
        {post.coverImage && <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />}
        <span className="absolute top-3 left-3 rounded-full bg-primary px-3 py-1 text-xs font-bold text-gray-900 shadow-lg">{post.categoryLabel}</span>
      </div>
      <div className="flex flex-1 flex-col gap-2 p-5">
        <h3 className="line-clamp-2 text-lg leading-snug font-bold text-heading transition-colors group-hover:text-brand">{post.title}</h3>
        {post.excerpt && <p className="line-clamp-2 text-sm leading-relaxed text-muted">{post.excerpt}</p>}
        <div className="mt-auto flex items-center justify-between border-t border-gray-100 pt-3 text-xs text-gray-400 dark:border-white/5 dark:text-gray-500">
          <time dateTime={post.publishedAt ?? undefined}>{formatDate(post.publishedAt)}</time>
          <ArrowUpRight className="size-4 transition group-hover:text-primary" />
        </div>
      </div>
    </Link>
  )
}

export function EventCard({ event }: { event: CMSEvent }) {
  const { day, month } = dateParts(event.startAt)

  return (
    <Link href={`/agenda/${event.slug}`} className="card card-hover group flex gap-4 p-4">
      <div className="flex w-16 shrink-0 flex-col items-center justify-center rounded-xl bg-gradient-to-b from-primary to-primary-dark py-3 text-gray-900 shadow-md shadow-primary/20">
        <span className="text-2xl leading-none font-extrabold">{day}</span>
        <span className="text-xs font-bold tracking-wider uppercase">{month}</span>
      </div>
      <div className="flex min-w-0 flex-col gap-1.5">
        <h3 className="font-bold text-heading transition-colors group-hover:text-brand">{event.title}</h3>
        <p className="flex items-center gap-1.5 text-xs text-gray-400 dark:text-gray-500">
          <CalendarDays className="size-3.5" /> {formatDate(event.startAt)} · {formatTime(event.startAt)} WIB
        </p>
        {event.location && (
          <p className="flex items-center gap-1.5 text-xs text-gray-400 dark:text-gray-500">
            <MapPin className="size-3.5" /> {event.location}
          </p>
        )}
        <div className="mt-1 flex flex-wrap items-center gap-2 text-xs">
          <span className={event.isFree ? 'inline-flex items-center gap-1 rounded-full bg-accent/15 px-2.5 py-0.5 font-bold text-accent-dark dark:text-accent-light' : 'inline-flex items-center gap-1 rounded-full bg-primary/15 px-2.5 py-0.5 font-bold text-primary-ink dark:text-primary'}>
            <Ticket className="size-3.5" /> {formatRupiah(event.price)}
          </span>
          {event.seatsLeft !== null && event.registrationOpen && <span className="text-gray-400 dark:text-gray-500">Sisa {event.seatsLeft} kursi</span>}
          {!event.registrationOpen && <span className="font-semibold text-coral">Pendaftaran ditutup</span>}
        </div>
      </div>
    </Link>
  )
}

export function ProgramCard({ program }: { program: Program }) {
  return (
    <Link href={`/program/${program.slug}`} className="card card-hover group relative flex flex-col overflow-hidden">
      <div className="relative">
        <Media src={program.coverImage} alt={program.title} className="aspect-[16/10]" imgClassName="transition-transform duration-700 group-hover:scale-110" sizes="(min-width: 768px) 25vw, 100vw" />
        {program.coverImage && <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />}
        {program.isFeatured && (
          <span className="absolute top-3 left-3 rounded-full bg-gradient-to-r from-accent to-accent-dark px-3 py-1 text-xs font-bold text-white shadow-lg">Unggulan</span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-5">
        <span className="text-xs font-bold tracking-wide text-brand uppercase">{program.categoryLabel}</span>
        <h3 className="flex items-start justify-between gap-2 text-lg leading-snug font-bold text-heading">
          {program.title}
          <ArrowUpRight className="size-5 shrink-0 text-gray-300 transition group-hover:text-primary dark:text-gray-600" />
        </h3>
        {program.summary && <p className="line-clamp-3 text-sm leading-relaxed text-muted">{program.summary}</p>}
      </div>
    </Link>
  )
}
