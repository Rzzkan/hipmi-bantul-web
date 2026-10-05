'use client'

import { Menu, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

import { CMSLink } from '@/components/CMSLink'
import { Container } from '@/components/Container'
import { cn } from '@/lib/utils'
import type { CMSLinkType } from '@/types/cms'

export function HeaderClient({
  siteName,
  logo,
  navItems,
  cta,
}: {
  siteName: string
  logo: string | null
  navItems: CMSLinkType[]
  cta: CMSLinkType | null
}) {
  const pathname = usePathname()
  // Menu stays open only for the path it was opened on → closes automatically on navigation.
  const [openOn, setOpenOn] = useState<string | null>(null)
  const open = openOn === pathname
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const isActive = (url: string) => (url === '/' ? pathname === '/' : pathname.startsWith(url))

  return (
    <header
      className={cn(
        'sticky top-0 z-50 border-b transition-colors',
        scrolled || open ? 'border-white/10 bg-navy-900/95 backdrop-blur' : 'border-transparent bg-navy-900',
      )}
    >
      <Container className="flex h-16 items-center justify-between gap-6 text-white">
        <Link href="/" className="flex items-center gap-2.5 font-extrabold tracking-tight">
          {logo ? (
            <Image src={logo} alt={siteName} width={36} height={36} className="size-9 object-contain" />
          ) : (
            <span className="grid size-9 place-items-center rounded-lg bg-gold text-sm text-navy-900">HB</span>
          )}
          <span className="leading-tight">{siteName}</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Utama">
          {navItems.map((item) => (
            <Link
              key={item.url}
              href={item.url}
              className={cn(
                'rounded-full px-3 py-2 text-sm font-medium text-white/80 transition hover:text-white',
                isActive(item.url) && 'bg-white/10 text-white',
              )}
            >
              {item.label}
            </Link>
          ))}
          {cta && <CMSLink link={cta} className="ml-3" />}
        </nav>

        <button
          type="button"
          className="grid size-10 place-items-center rounded-full hover:bg-white/10 md:hidden"
          onClick={() => setOpenOn(open ? null : pathname)}
          aria-expanded={open}
          aria-label={open ? 'Tutup menu' : 'Buka menu'}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </Container>

      {open && (
        <nav className="border-t border-white/10 md:hidden" aria-label="Mobile">
          <Container className="flex flex-col gap-1 py-4">
            {navItems.map((item) => (
              <Link
                key={item.url}
                href={item.url}
                className={cn('rounded-lg px-3 py-2.5 text-white/85', isActive(item.url) && 'bg-white/10 text-white')}
              >
                {item.label}
              </Link>
            ))}
            {cta && <CMSLink link={cta} className="mt-3" />}
          </Container>
        </nav>
      )}
    </header>
  )
}
