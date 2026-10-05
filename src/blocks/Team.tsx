import { Building2, UserRound } from 'lucide-react'

import { Container } from '@/components/Container'
import { Media } from '@/components/Media'
import { SectionIntro } from '@/components/SectionIntro'
import { SocialLinks } from '@/components/SocialIcons'
import { cn } from '@/lib/utils'
import type { BoardMember, Division, TeamBlock as Props } from '@/types/cms'

/* ------------------------------------------------------------------ */
/* Member cards                                                        */
/* ------------------------------------------------------------------ */

/** Big vertical card — Pengurus Inti. */
function MemberCard({ m, featured }: { m: BoardMember; featured?: boolean }) {
  return (
    <article
      className={cn(
        'card card-hover flex w-full flex-col items-center p-5 text-center',
        featured ? 'max-w-xs border-primary/40 shadow-lg shadow-primary/10 sm:p-6' : 'max-w-[15rem]',
      )}
    >
      <Media
        src={m.photo}
        alt={m.name}
        className={cn('aspect-square w-full rounded-full ring-4', featured ? 'max-w-36 ring-primary/50' : 'max-w-28 ring-primary/20')}
        sizes="144px"
        placeholder="avatar"
      />
      <p className={cn('mt-4 rounded-full px-3 py-0.5 text-xs font-bold', featured ? 'bg-gradient-to-r from-primary to-primary-dark text-gray-900' : 'bg-primary/10 text-brand')}>
        {m.position}
      </p>
      <h4 className={cn('mt-2 leading-snug font-bold text-heading', featured ? 'text-lg' : 'text-base')}>{m.name}</h4>
      {m.company && <p className="mt-0.5 flex items-center gap-1 text-xs text-muted"><Building2 className="size-3" />{m.company}</p>}
      <div className="mt-3">
        <SocialLinks socials={m.socials} name={m.name} />
      </div>
    </article>
  )
}

/** Compact horizontal card — pimpinan bidang & kompartemen. */
function MemberRow({ m, compact }: { m: BoardMember; compact?: boolean }) {
  return (
    <div className={cn('flex items-center gap-3 rounded-xl', compact ? 'bg-gray-50 p-2.5 dark:bg-white/5' : 'p-1')}>
      <Media src={m.photo} alt={m.name} className={cn('shrink-0 rounded-full ring-2 ring-primary/20', compact ? 'size-10' : 'size-14')} sizes="56px" placeholder="avatar" />
      <div className="min-w-0 flex-1">
        <p className={cn('truncate font-bold text-heading', compact ? 'text-sm' : 'text-base')}>{m.name}</p>
        <p className="truncate text-xs font-semibold text-brand">{m.position}</p>
        {m.company && !compact && <p className="truncate text-xs text-muted">{m.company}</p>}
      </div>
      <div className="shrink-0">
        <SocialLinks socials={m.socials} name={m.name} size="sm" />
      </div>
    </div>
  )
}

function Vacant({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-dashed border-gray-200 p-2.5 text-sm text-gray-400 dark:border-white/10 dark:text-gray-500">
      <span className="grid size-10 place-items-center rounded-full bg-gray-100 dark:bg-white/5">
        <UserRound className="size-5" />
      </span>
      {label}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Sections                                                            */
/* ------------------------------------------------------------------ */

/** Org-chart style: Ketua Umum on top, the rest of Pengurus Inti below, joined by a connector line. */
function IntiChart({ members }: { members: BoardMember[] }) {
  if (!members.length) return null
  const [top, ...rest] = members

  return (
    <div className="mb-20">
      <h3 className="mb-8 text-center text-sm font-bold tracking-widest text-accent-dark uppercase dark:text-accent-light">Pengurus Inti</h3>
      <div className="flex flex-col items-center">
        <MemberCard m={top} featured />
        {rest.length > 0 && (
          <>
            <div className="h-8 w-px bg-gradient-to-b from-primary/60 to-primary/30" aria-hidden />
            {/* Classic org-chart branches: each child draws its own half of the horizontal bar,
                so the bar spans exactly from the first to the last card. */}
            <div className="flex w-full flex-wrap justify-center gap-y-4">
              {rest.map((m, i) => (
                <div key={m.id} className="relative flex w-1/2 justify-center px-2 sm:w-auto sm:px-3 sm:pt-8">
                  {rest.length > 1 && (
                    <span
                      className={cn(
                        'absolute top-0 hidden h-px bg-primary/30 sm:block',
                        i === 0 ? 'right-0 left-1/2' : i === rest.length - 1 ? 'right-1/2 left-0' : 'inset-x-0',
                      )}
                      aria-hidden
                    />
                  )}
                  <span className="absolute top-0 left-1/2 hidden h-8 w-px bg-primary/30 sm:block" aria-hidden />
                  <MemberCard m={m} />
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

function DivisionCard({ d }: { d: Division }) {
  return (
    <article className="card flex flex-col overflow-hidden">
      <header className="flex items-start gap-3 border-b border-gray-100 bg-gradient-to-r from-primary/10 to-transparent p-5 dark:border-white/5">
        <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-gradient-to-b from-primary to-primary-dark text-lg font-extrabold text-gray-900 shadow-md shadow-primary/20">
          {d.number ?? '•'}
        </span>
        <div className="min-w-0">
          <p className="text-xs font-bold tracking-wider text-brand uppercase">{d.label}</p>
          <h4 className="leading-snug font-bold text-heading">{d.name}</h4>
        </div>
      </header>

      <div className="flex flex-1 flex-col gap-3 p-5">
        {d.leaders.length ? d.leaders.map((m) => <MemberRow key={m.id} m={m} />) : <Vacant label="Ketua bidang segera diumumkan" />}

        {d.compartments.length > 0 && (
          <div className="mt-2 space-y-4 border-t border-gray-100 pt-4 dark:border-white/5">
            {d.compartments.map((c) => (
              <div key={c.id}>
                <p className="mb-2 flex items-center gap-2 text-xs font-bold tracking-wide text-accent-dark uppercase dark:text-accent-light">
                  <span className="size-1.5 rounded-full bg-accent" />
                  Kompartemen {c.name}
                </p>
                <div className="space-y-2">
                  {c.members.length ? c.members.map((m) => <MemberRow key={m.id} m={m} compact />) : <Vacant label="Pengurus segera diumumkan" />}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </article>
  )
}

export function TeamBlock({ introContent, structure }: Props) {
  const { inti, divisions } = structure

  return (
    <section className="surface-alt relative py-20">
      <div className="absolute inset-x-0 top-0 divider-glow" />
      <Container>
        <SectionIntro html={introContent} badge="Struktur Pengurus" center />

        <IntiChart members={inti} />

        {divisions.length > 0 && (
          <div>
            <h3 className="mb-2 text-center text-sm font-bold tracking-widest text-accent-dark uppercase dark:text-accent-light">Bidang & Kompartemen</h3>
            <p className="mx-auto mb-10 max-w-xl text-center text-sm text-muted">
              {divisions.length} bidang kerja, masing-masing dapat memiliki satu atau lebih kompartemen.
            </p>
            <div className="grid items-start gap-5 md:grid-cols-2 xl:grid-cols-3">
              {divisions.map((d) => (
                <DivisionCard key={d.id} d={d} />
              ))}
            </div>
          </div>
        )}
      </Container>
    </section>
  )
}
