import type { Hero } from '@/types/cms'

import { HighImpactHero } from './HighImpact'
import { LowImpactHero } from './LowImpact'
import { MediumImpactHero } from './MediumImpact'

/** Same switch as Payload's `src/heros/RenderHero.tsx`. */
export function RenderHero({ hero }: { hero?: Hero | null }) {
  if (!hero || hero.type === 'none') return null

  switch (hero.type) {
    case 'highImpact':
      return <HighImpactHero {...hero} />
    case 'mediumImpact':
      return <MediumImpactHero {...hero} />
    default:
      return <LowImpactHero {...hero} />
  }
}
