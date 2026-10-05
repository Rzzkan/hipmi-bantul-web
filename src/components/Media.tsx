import Image from 'next/image'

import { cn } from '@/lib/utils'

export function Media({
  src,
  alt,
  className,
  imgClassName,
  priority,
  sizes = '(min-width: 1024px) 50vw, 100vw',
}: {
  src?: string | null
  alt: string
  className?: string
  imgClassName?: string
  priority?: boolean
  sizes?: string
}) {
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
