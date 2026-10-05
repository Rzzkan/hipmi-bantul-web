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
    return (
      <div className={cn('relative overflow-hidden bg-gradient-to-br from-navy-800 to-navy-600', className)} aria-hidden>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(245,179,1,.35),transparent_55%)]" />
        <span className="absolute bottom-3 left-4 text-xs font-semibold tracking-widest text-white/50 uppercase">HIPMI Bantul</span>
      </div>
    )
  }

  return (
    <div className={cn('relative overflow-hidden', className)}>
      <Image src={src} alt={alt} fill priority={priority} sizes={sizes} className={cn('object-cover', imgClassName)} />
    </div>
  )
}
