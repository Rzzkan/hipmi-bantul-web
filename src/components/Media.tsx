import { UserRound } from 'lucide-react'
import Image from 'next/image'

import { cn } from '@/lib/utils'

export function Media({
  src,
  alt,
  className,
  imgClassName,
  priority,
  sizes = '(min-width: 1024px) 50vw, 100vw',
  placeholder = 'brand',
}: {
  src?: string | null
  alt: string
  className?: string
  imgClassName?: string
  priority?: boolean
  sizes?: string
  /** What to show when there is no image: brand pattern, or a person silhouette for avatars. */
  placeholder?: 'brand' | 'avatar'
}) {
  if (!src && placeholder === 'avatar') {
    return (
      <div className={cn('relative grid place-items-center overflow-hidden bg-gradient-to-br from-cream to-primary/30 text-primary-dark/70 dark:from-ink-800 dark:to-ink-700 dark:text-primary/60', className)} aria-hidden>
        <UserRound className="size-1/2" strokeWidth={1.5} />
      </div>
    )
  }

  if (!src) {
    // Placeholder bernuansa katalog: cream→emas (terang) / grid gelap + glow (gelap)
    return (
      <div className={cn('relative overflow-hidden bg-gradient-to-br from-cream-light via-cream to-primary/30 dark:from-ink-800 dark:via-ink-850 dark:to-ink-900', className)} aria-hidden>
        <div className="absolute inset-0 hidden brand-grid-glow dark:block" />
        <div className="absolute inset-0 brand-grid-glow-light dark:hidden" />
        <span className="absolute bottom-3 left-4 text-[10px] font-bold tracking-widest text-gray-900/40 uppercase dark:text-white/30">BPC HIPMI Bantul</span>
      </div>
    )
  }

  return (
    <div className={cn('relative overflow-hidden', className)}>
      <Image src={src} alt={alt} fill priority={priority} sizes={sizes} className={cn('object-cover', imgClassName)} />
    </div>
  )
}
