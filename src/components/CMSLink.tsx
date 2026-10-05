import Link from 'next/link'

import { cn } from '@/lib/utils'
import type { CMSLinkType } from '@/types/cms'

const styles = {
  default: 'bg-gold text-navy-900 hover:bg-gold/90 shadow-sm',
  outline: 'border border-current hover:bg-white/10',
  inline: 'underline underline-offset-4 hover:text-gold',
}

export const buttonClass = (appearance: keyof typeof styles = 'default', className?: string) =>
  cn(
    appearance !== 'inline' &&
      'inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold',
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
  appearance?: keyof typeof styles
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
