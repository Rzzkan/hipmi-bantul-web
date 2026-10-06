'use client'

import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

import type { Partner } from '@/types/cms'

const linkClass =
  'group/more inline-flex items-center gap-2 text-base font-bold text-accent-dark transition hover:text-accent dark:text-accent-light dark:hover:text-accent'

function Logo({ p }: { p: Partner }) {
  const inner = p.logo ? (
    <Image
      src={p.logo}
      alt={p.name}
      title={p.name}
      width={240}
      height={96}
      sizes="(min-width: 1024px) 200px, 45vw"
      // Monokrom ala referensi; berwarna saat di-hover. Mode gelap: dibalik agar tetap terbaca.
      className="h-12 w-auto max-w-full object-contain opacity-80 grayscale transition duration-300 group-hover:opacity-100 group-hover:grayscale-0 sm:h-16 dark:opacity-70 dark:invert dark:group-hover:opacity-100 dark:group-hover:invert-0"
    />
  ) : (
    <span className="text-center text-lg font-extrabold tracking-tight text-gray-500 transition group-hover:text-heading dark:text-gray-400">{p.name}</span>
  )

  return (
    <li className="group flex h-16 items-center justify-center px-2 sm:h-24 lg:px-6">
      {p.url ? (
        <a href={p.url} target="_blank" rel="noopener noreferrer" aria-label={p.name} className="flex items-center justify-center">
          {inner}
        </a>
      ) : (
        inner
      )}
    </li>
  )
}

export function PartnerGrid({ partners, limit, moreLabel, moreUrl }: { partners: Partner[]; limit: number; moreLabel: string; moreUrl: string | null }) {
  const [expanded, setExpanded] = useState(false)
  const truncated = limit > 0 && partners.length > limit
  const visible = truncated && !expanded ? partners.slice(0, limit) : partners

  return (
    <>
      <ul className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3 sm:gap-y-12 lg:grid-cols-5">
        {visible.map((p) => (
          <Logo key={p.id} p={p} />
        ))}
      </ul>

      {(moreUrl || truncated) && (
        <div className="mt-12 text-center sm:mt-14">
          {moreUrl ? (
            /^https?:\/\//.test(moreUrl) ? (
              <a href={moreUrl} target="_blank" rel="noopener noreferrer" className={linkClass}>
                {moreLabel}
                <ArrowRight className="size-5 transition group-hover/more:translate-x-1" />
              </a>
            ) : (
              <Link href={moreUrl} className={linkClass}>
                {moreLabel}
                <ArrowRight className="size-5 transition group-hover/more:translate-x-1" />
              </Link>
            )
          ) : (
            <button type="button" onClick={() => setExpanded((v) => !v)} aria-expanded={expanded} className={linkClass}>
              {expanded ? 'Tampilkan lebih sedikit' : moreLabel}
              <ArrowRight className={`size-5 transition ${expanded ? '-rotate-90' : 'group-hover/more:translate-x-1'}`} />
            </button>
          )}
        </div>
      )}
    </>
  )
}
