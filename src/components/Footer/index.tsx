import { ChevronRight, Mail, MapPin, MessageCircle, Phone } from 'lucide-react'
import Link from 'next/link'

import { Container } from '@/components/Container'
import { BrandLockup } from '@/components/Header/HeaderClient'
import { getGlobals } from '@/lib/api'
import { whatsappLink } from '@/lib/utils'

const socialLabel: Record<string, string> = {
  instagram: 'Instagram',
  tiktok: 'TikTok',
  youtube: 'YouTube',
  facebook: 'Facebook',
  linkedin: 'LinkedIn',
  x: 'X',
}

/** Footer gelap bergradasi — sama dengan FooterSection katalog (selalu gelap di kedua mode). */
export async function Footer() {
  const globals = await getGlobals()
  if (!globals) return null
  const { site, footer } = globals
  const wa = whatsappLink(site.whatsapp, 'Halo HIPMI Bantul, saya ingin bertanya.')

  return (
    <footer className="dark relative mt-auto overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      <Container className="grid gap-10 pt-16 pb-12 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr]">
        <div className="space-y-4">
          <BrandLockup siteName={site.name} logo={site.logo} />
          {footer.about && <p className="max-w-sm text-sm leading-relaxed text-gray-400">{footer.about}</p>}
          {site.socials.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-1">
              {site.socials.map((s) => (
                <a
                  key={s.url}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl border border-white/10 px-3 py-1.5 text-xs font-semibold text-gray-300 transition hover:border-primary/50 hover:text-primary"
                >
                  {socialLabel[s.platform] ?? s.platform}
                </a>
              ))}
            </div>
          )}
        </div>

        <div>
          <h4 className="mb-4 text-sm font-semibold tracking-wider text-gray-300 uppercase">Navigasi</h4>
          <ul className="space-y-3 text-sm">
            {footer.navItems.map((item) => (
              <li key={item.url}>
                <Link href={item.url} className="group flex items-center gap-1.5 text-gray-400 transition hover:text-primary">
                  <ChevronRight className="size-3.5 transition group-hover:translate-x-0.5" />
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-semibold tracking-wider text-gray-300 uppercase">Kontak</h4>
          <ul className="space-y-3 text-sm text-gray-400">
            {site.address && (
              <li className="flex gap-2">
                <MapPin className="mt-0.5 size-4 shrink-0 text-primary" />
                {site.mapsUrl ? (
                  <a href={site.mapsUrl} target="_blank" rel="noopener noreferrer" className="hover:text-primary">
                    {site.address}
                  </a>
                ) : (
                  site.address
                )}
              </li>
            )}
            {site.email && (
              <li className="flex gap-2">
                <Mail className="mt-0.5 size-4 shrink-0 text-primary" />
                <a href={`mailto:${site.email}`} className="hover:text-primary">
                  {site.email}
                </a>
              </li>
            )}
            {site.phone && (
              <li className="flex gap-2">
                <Phone className="mt-0.5 size-4 shrink-0 text-primary" /> {site.phone}
              </li>
            )}
            {wa && (
              <li className="flex gap-2">
                <MessageCircle className="mt-0.5 size-4 shrink-0 text-primary" />
                <a href={wa} target="_blank" rel="noopener noreferrer" className="hover:text-primary">
                  Chat WhatsApp
                </a>
              </li>
            )}
          </ul>
        </div>
      </Container>
      <Container>
        <div className="flex flex-col gap-2 border-t border-white/10 py-6 text-xs text-gray-500 sm:flex-row sm:items-center sm:justify-between">
          <span>{footer.copyright ?? `© ${new Date().getFullYear()} ${site.name}`}</span>
          <span>Tumbuh Bareng HIPMI Bantul, Bersinergi untuk Bantul.</span>
        </div>
      </Container>
    </footer>
  )
}
