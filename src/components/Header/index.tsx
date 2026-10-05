import { getGlobals } from '@/lib/api'

import { HeaderClient } from './HeaderClient'

export async function Header() {
  const globals = await getGlobals()

  return (
    <HeaderClient
      siteName={globals?.site.name ?? 'HIPMI Bantul'}
      logo={globals?.site.logo ?? null}
      navItems={globals?.header.navItems ?? []}
      cta={globals?.header.cta ?? null}
    />
  )
}
