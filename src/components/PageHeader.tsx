import { LowImpactHero } from '@/heros/LowImpact'

export function PageHeader({ eyebrow, title, description }: { eyebrow?: string; title: string; description?: string }) {
  const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;')
  return (
    <LowImpactHero
      eyebrow={eyebrow ?? null}
      richText={`<h2>${esc(title)}</h2>${description ? `<p>${esc(description)}</p>` : ''}`}
      links={[]}
    />
  )
}
