import { cn } from '@/lib/utils'

import { RichText } from './RichText'

/** Section heading: optional pill badge + rich intro (h2 diberi gaya katalog). */
export function SectionIntro({
  html,
  badge,
  badgeVariant = 'primary',
  center,
  className,
}: {
  html?: string | null
  badge?: string
  badgeVariant?: 'primary' | 'accent'
  center?: boolean
  className?: string
}) {
  if (!html && !badge) return null
  return (
    <div className={cn('mb-12', center && 'text-center', className)}>
      {badge && <span className={cn('mb-4', badgeVariant === 'accent' ? 'badge-accent' : 'badge')}>{badge}</span>}
      <RichText
        html={html}
        className={cn('max-w-2xl prose-h2:mb-2 prose-h2:text-3xl sm:prose-h2:text-4xl prose-p:text-gray-500 dark:prose-p:text-gray-400', center && 'mx-auto')}
      />
    </div>
  )
}
