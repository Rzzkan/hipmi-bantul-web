import { RichText } from './RichText'

export function SectionIntro({ html, invert }: { html?: string | null; invert?: boolean }) {
  if (!html) return null
  return <RichText html={html} invert={invert} className="mb-10 max-w-2xl prose-h2:mb-2 prose-h2:text-3xl" />
}
