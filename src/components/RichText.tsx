import { cn } from '@/lib/utils'

/**
 * Renders sanitized HTML from the Filament rich editor (sanitized server-side by the API).
 * Payload's template uses Lexical JSON; here the CMS stores HTML so we render it with Tailwind Typography.
 */
export function RichText({ html, className, invert }: { html?: string | null; className?: string; invert?: boolean }) {
  if (!html) return null

  return (
    <div
      className={cn(
        'prose max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-a:text-navy-700 prose-img:rounded-xl',
        invert && 'prose-invert prose-a:text-gold',
        className,
      )}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
