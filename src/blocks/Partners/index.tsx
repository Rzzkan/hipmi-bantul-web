import Image from 'next/image'

import { Container } from '@/components/Container'
import type { Partner, PartnersBlock as Props } from '@/types/cms'

function Logo({ p }: { p: Partner }) {
  if (!p.logo) return null

  const img = (
    <Image
      src={p.logo}
      alt={p.name}
      title={p.name}
      width={240}
      height={96}
      sizes="(min-width: 1024px) 200px, 45vw"
      // Monokrom, berwarna saat di-hover. Mode gelap: dibalik agar tetap terbaca.
      className="h-12 w-auto max-w-full object-contain opacity-80 grayscale transition duration-300 group-hover:opacity-100 group-hover:grayscale-0 sm:h-16 dark:opacity-70 dark:invert dark:group-hover:opacity-100 dark:group-hover:invert-0"
    />
  )

  return (
    <li className="group flex h-16 items-center justify-center px-2 sm:h-24 lg:px-6">
      {p.url ? (
        <a href={p.url} target="_blank" rel="noopener noreferrer" aria-label={p.name} className="flex items-center justify-center">
          {img}
        </a>
      ) : (
        img
      )}
    </li>
  )
}

/** Logo wall partner & sponsor — hanya logo, tanpa judul atau teks tambahan. */
export function PartnersBlock({ partners }: Props) {
  const withLogo = partners.filter((p) => p.logo)
  if (!withLogo.length) return null

  return (
    <section className="surface relative py-16 sm:py-20" aria-label="Partner dan sponsor">
      <div className="absolute inset-x-0 top-0 divider-glow" />
      <Container>
        <ul className="flex flex-wrap justify-center gap-x-6 gap-y-8 sm:gap-y-12 [&>li]:w-[calc(50%-0.75rem)] sm:[&>li]:w-[calc(33.333%-1rem)] lg:[&>li]:w-[calc(20%-1.2rem)]">
          {withLogo.map((p) => (
            <Logo key={p.id} p={p} />
          ))}
        </ul>
      </Container>
    </section>
  )
}
