import { cn } from '@/lib/utils'
import type { BoardMember } from '@/types/cms'

type Network = 'instagram' | 'tiktok' | 'linkedin'

const paths: Record<Network, React.ReactNode> = {
  instagram: (
    <>
      <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="12" cy="12" r="4.25" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="17.6" cy="6.4" r="1.25" fill="currentColor" />
    </>
  ),
  tiktok: (
    <path
      fill="currentColor"
      d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03a10.7 10.7 0 0 1-4.2-.97 9.3 9.3 0 0 1-1.62-.93c-.01 2.92.01 5.84-.02 8.75a7.6 7.6 0 0 1-1.35 3.94 7.5 7.5 0 0 1-5.91 3.21 7.3 7.3 0 0 1-4.08-1.03A7.5 7.5 0 0 1 1.6 17.25c-.02-.5-.03-1-.01-1.49a7.5 7.5 0 0 1 2.58-4.96 7.6 7.6 0 0 1 6.15-1.72c.02 1.48-.04 2.96-.04 4.44a3.4 3.4 0 0 0-3.02.37 3.4 3.4 0 0 0-1.36 1.75c-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87a3.4 3.4 0 0 0 2.77-1.61c.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"
    />
  ),
  linkedin: (
    <path
      fill="currentColor"
      d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z"
    />
  ),
}

const meta: Record<Network, { label: string; hover: string }> = {
  instagram: { label: 'Instagram', hover: 'hover:border-[#E1306C]/40 hover:bg-[#E1306C]/10 hover:text-[#E1306C]' },
  tiktok: { label: 'TikTok', hover: 'hover:border-gray-900/30 hover:bg-gray-900/5 hover:text-gray-900 dark:hover:border-white/30 dark:hover:bg-white/10 dark:hover:text-white' },
  linkedin: { label: 'LinkedIn', hover: 'hover:border-[#0A66C2]/40 hover:bg-[#0A66C2]/10 hover:text-[#0A66C2] dark:hover:text-sky-400' },
}

export function SocialIcon({ network, className }: { network: Network; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={cn('size-4', className)}>
      {paths[network]}
    </svg>
  )
}

/** Row of Instagram / TikTok / LinkedIn buttons; only networks that are filled in are shown. */
export function SocialLinks({ socials, name, size = 'md' }: { socials: BoardMember['socials']; name: string; size?: 'sm' | 'md' }) {
  const items = (['instagram', 'tiktok', 'linkedin'] as Network[]).filter((n) => socials?.[n])
  if (!items.length) return null

  return (
    <div className="flex flex-wrap items-center justify-center gap-1.5">
      {items.map((n) => (
        <a
          key={n}
          href={socials[n]!.url}
          target="_blank"
          rel="noopener noreferrer"
          title={`${meta[n].label}: @${socials[n]!.handle}`}
          aria-label={`${meta[n].label} ${name}`}
          className={cn(
            'grid place-items-center rounded-lg border border-gray-200 text-gray-500 transition dark:border-white/10 dark:text-gray-400',
            size === 'sm' ? 'size-7' : 'size-9',
            meta[n].hover,
          )}
        >
          <SocialIcon network={n} className={size === 'sm' ? 'size-3.5' : 'size-4'} />
        </a>
      ))}
    </div>
  )
}
