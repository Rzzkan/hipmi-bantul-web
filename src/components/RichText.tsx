import { cn } from '@/lib/utils'

/**
 * Renders sanitized HTML from the Filament rich editor (sanitized server-side by the API).
 * Follows the light/dark theme automatically. `invert` forces light text (for always-dark surfaces).
 */
export function RichText({ html, className, invert }: { html?: string | null; className?: string; invert?: boolean }) {
  if (!html) return null

  return (
    <div
      className={cn(
        'prose max-w-none prose-headings:font-extrabold prose-headings:tracking-tight prose-a:text-primary-ink prose-strong:text-inherit prose-img:rounded-2xl',
        'dark:prose-invert dark:prose-a:text-primary',
        invert && 'prose-invert prose-a:text-primary',
        className,
      )}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
