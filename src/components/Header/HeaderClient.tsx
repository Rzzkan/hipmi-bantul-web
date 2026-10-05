'use client'

import { Menu, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

import { CMSLink } from '@/components/CMSLink'
import { Container } from '@/components/Container'
import { ThemeToggle } from '@/components/ThemeToggle'
import { cn } from '@/lib/utils'
import type { CMSLinkType } from '@/types/cms'

/** Brand lockup: "BPC HIPMI Bantul" dengan "Bantul" berwarna emas — seperti katalog. */
export function BrandLockup({ siteName, logo, subtitle }: { siteName: string; logo: string | null; subtitle?: string }) {
  const match = siteName.match(/^(.*?)(\s+\S+)$/)
  return (
    <span className="flex items-center gap-2.5">
      <Image src={logo ?? '/logo.svg'} alt="Logo BPC HIPMI Bantul" width={40} height={40} className="size-10 object-contain" unoptimized={!logo} />
      <span className="flex flex-col">
        <span className="text-lg leading-tight font-bold tracking-tight text-heading">
          {match ? (
            <>
              {match[1]}
              <span className="text-brand">{match[2]}</span>
            </>
          ) : (
            siteName
          )}
        </span>
        {subtitle && <span className="text-[10px] font-medium text-gray-400 dark:text-gray-500">{subtitle}</span>}
      </span>
    </span>
  )
}

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
        'sticky top-0 z-50 border-b transition-all duration-300',
        scrolled || open
          ? 'border-transparent bg-white/90 shadow-lg shadow-primary/5 backdrop-blur-xl dark:border-white/5 dark:bg-ink-950/90 dark:shadow-black/20'
          : 'border-transparent bg-cream-light dark:bg-ink-950',
      )}
    >
      <Container className="flex h-16 items-center gap-4 lg:h-20">
        <Link href="/" className="shrink-0 transition hover:opacity-90">
          <BrandLockup siteName={siteName} logo={logo} subtitle="Badan Pengurus Cabang" />
        </Link>

        <nav className="ml-auto hidden items-center gap-1 md:flex" aria-label="Utama">
          {navItems.map((item) => (
            <Link
              key={item.url}
              href={item.url}
              className={cn(
                'relative rounded-xl px-4 py-2 text-sm font-semibold transition-all duration-200',
                isActive(item.url)
                  ? 'bg-primary/10 text-primary-ink dark:text-primary'
                  : 'text-gray-600 hover:bg-primary/5 hover:text-primary-ink dark:text-gray-300 dark:hover:bg-primary/10 dark:hover:text-primary',
              )}
            >
              {item.label}
              {isActive(item.url) && <span className="absolute bottom-0 left-1/2 size-1 -translate-x-1/2 rounded-full bg-primary" />}
            </Link>
          ))}
          {cta && <CMSLink link={cta} appearance="accent" className="ml-2 px-5 py-2.5" />}
          <ThemeToggle />
        </nav>

        <div className="ml-auto flex items-center gap-1 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            className="grid size-10 place-items-center rounded-xl text-gray-700 hover:bg-primary/10 dark:text-gray-300"
            onClick={() => setOpenOn(open ? null : pathname)}
            aria-expanded={open}
            aria-label={open ? 'Tutup menu' : 'Buka menu'}
          >
            {open ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </Container>

      {open && (
        <nav className="border-t border-gray-100 bg-white shadow-xl md:hidden dark:border-white/5 dark:bg-ink-950" aria-label="Mobile">
          <Container className="flex flex-col gap-1 py-3">
            {navItems.map((item) => (
              <Link
                key={item.url}
                href={item.url}
                className={cn(
                  'rounded-xl px-4 py-3 text-sm font-semibold',
                  isActive(item.url) ? 'bg-primary/10 text-primary-ink dark:text-primary' : 'text-gray-600 dark:text-gray-300',
                )}
              >
                {item.label}
              </Link>
            ))}
            {cta && <CMSLink link={cta} appearance="accent" className="mt-2" />}
          </Container>
        </nav>
      )}
    </header>
  )
}
