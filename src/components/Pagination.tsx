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
            'grid size-10 place-items-center rounded-xl border text-sm font-bold transition',
            n === page
              ? 'border-primary bg-primary text-gray-900'
              : 'border-gray-200 text-gray-600 hover:border-primary hover:text-primary-ink dark:border-white/10 dark:text-gray-300 dark:hover:text-primary',
          )}
        >
          {n}
        </Link>
      ))}
    </nav>
  )
}
