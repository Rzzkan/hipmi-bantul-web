import Link from 'next/link'

import { cn } from '@/lib/utils'
import type { CMSLinkType } from '@/types/cms'

const styles = {
  // Tombol emas bergradasi — sama seperti "Cari Bisnis" di katalog
  default:
    'bg-gradient-to-r from-primary to-primary-dark text-gray-900 shadow-md shadow-primary/20 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/30',
  // Outline emas — seperti "Lihat Semua"
  outline:
    'border-2 border-primary text-primary-ink hover:bg-primary hover:text-gray-900 dark:text-primary-light dark:hover:text-gray-900',
  // Hijau — seperti "Gabung BPC Hipmi Bantul"
  accent:
    'bg-gradient-to-r from-accent to-accent-dark text-white shadow-md shadow-accent/25 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-accent/30',
  inline: 'font-semibold text-primary-ink underline-offset-4 hover:underline dark:text-primary',
}

export type ButtonAppearance = keyof typeof styles

export const buttonClass = (appearance: ButtonAppearance = 'default', className?: string) =>
  cn(
    appearance !== 'inline' &&
      'inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-bold transition-all duration-300 active:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary',
    styles[appearance],
    className,
  )

/** Payload `CMSLink` equivalent: renders internal links with next/link, external with <a>. */
export function CMSLink({
  link,
  appearance,
  className,
  children,
}: {
  link: CMSLinkType
  appearance?: ButtonAppearance
  className?: string
  children?: React.ReactNode
}) {
  const cls = buttonClass(appearance ?? link.appearance, className)
  const content = children ?? link.label
  const isInternal = link.url.startsWith('/') && !link.newTab

  if (isInternal) {
    return (
      <Link href={link.url} className={cls}>
        {content}
      </Link>
    )
  }

  return (
    <a href={link.url} className={cls} {...(link.newTab ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
      {content}
    </a>
  )
}
