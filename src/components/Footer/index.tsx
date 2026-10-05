import { Mail, MapPin, MessageCircle, Phone } from 'lucide-react'
import Link from 'next/link'

import { Container } from '@/components/Container'
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

export async function Footer() {
  const globals = await getGlobals()
  if (!globals) return null
  const { site, footer } = globals
  const wa = whatsappLink(site.whatsapp, 'Halo HIPMI Bantul, saya ingin bertanya.')

  return (
    <footer className="mt-auto bg-navy-950 text-white/75">
      <Container className="grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
        <div className="space-y-3">
          <p className="text-lg font-extrabold text-white">{site.name}</p>
          {footer.about && <p className="max-w-sm text-sm leading-relaxed">{footer.about}</p>}
          {site.socials.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-2">
              {site.socials.map((s) => (
                <a key={s.url} href={s.url} target="_blank" rel="noopener noreferrer" className="rounded-full border border-white/15 px-3 py-1 text-xs hover:border-gold hover:text-gold">
                  {socialLabel[s.platform] ?? s.platform}
                </a>
              ))}
            </div>
          )}
        </div>

        <div>
          <p className="mb-3 text-sm font-semibold tracking-wider text-gold uppercase">Navigasi</p>
          <ul className="space-y-2 text-sm">
            {footer.navItems.map((item) => (
              <li key={item.url}>
                <Link href={item.url} className="hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="mb-3 text-sm font-semibold tracking-wider text-gold uppercase">Sekretariat</p>
          <ul className="space-y-2.5 text-sm">
            {site.address && (
              <li className="flex gap-2">
                <MapPin className="mt-0.5 size-4 shrink-0" />
                {site.mapsUrl ? (
                  <a href={site.mapsUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                    {site.address}
                  </a>
                ) : (
                  site.address
                )}
              </li>
            )}
            {site.email && (
              <li className="flex gap-2">
                <Mail className="mt-0.5 size-4 shrink-0" />
                <a href={`mailto:${site.email}`} className="hover:text-white">
                  {site.email}
                </a>
              </li>
            )}
            {site.phone && (
              <li className="flex gap-2">
                <Phone className="mt-0.5 size-4 shrink-0" /> {site.phone}
              </li>
            )}
            {wa && (
              <li className="flex gap-2">
                <MessageCircle className="mt-0.5 size-4 shrink-0" />
                <a href={wa} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                  Chat WhatsApp
                </a>
              </li>
            )}
          </ul>
        </div>
      </Container>
      <div className="border-t border-white/10 py-5 text-center text-xs text-white/50">
        {footer.copyright ?? `© ${new Date().getFullYear()} ${site.name}`}
      </div>
    </footer>
  )
}
