import Link from 'next/link'

import { cn } from '@/lib/utils'

export function Pagination({
  page,
  totalPages,
  basePath,
  query = {},
}: {
  page: number
  totalPages: number
  basePath: string
  query?: Record<string, string>
}) {
  if (totalPages <= 1) return null

  const href = (n: number) => {
    const qs = new URLSearchParams({ ...query, ...(n > 1 ? { page: String(n) } : {}) }).toString()
    return qs ? `${basePath}?${qs}` : basePath
  }

  return (
    <nav className="mt-12 flex justify-center gap-2" aria-label="Pagination">
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
        <Link
          key={n}
          href={href(n)}
          aria-current={n === page ? 'page' : undefined}
          className={cn(
            'grid size-10 place-items-center rounded-full border text-sm font-semibold',
            n === page ? 'border-navy-900 bg-navy-900 text-white' : 'border-slate-200 hover:border-navy-700',
          )}
        >
          {n}
        </Link>
      ))}
    </nav>
  )
}
