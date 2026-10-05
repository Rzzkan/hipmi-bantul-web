import type { NextConfig } from 'next'

type RemotePattern = NonNullable<NonNullable<NextConfig['images']>['remotePatterns']>[number]

const pattern = (raw: string | undefined, pathname: string): RemotePattern | null => {
  if (!raw) return null
  const url = new URL(raw)
  return { protocol: url.protocol.replace(':', '') as 'http' | 'https', hostname: url.hostname, port: url.port, pathname }
}

/**
 * Where CMS images can come from:
 * 1. Laravel server disk  → https://api.hipmibantul.com/storage/**   (MEDIA_DISK=public)
 * 2. Cloudflare R2        → CMS_MEDIA_CDN_URL, e.g. https://media.hipmibantul.com (MEDIA_DISK=r2)
 * 3. Any *.r2.dev public bucket URL, so R2 works even before a custom domain is set up.
 */
const remotePatterns = [
  pattern(process.env.CMS_MEDIA_URL || process.env.NEXT_PUBLIC_API_URL || 'https://api.hipmibantul.com', '/storage/**'),
  pattern(process.env.CMS_MEDIA_CDN_URL, '/**'),
  { protocol: 'https', hostname: '**.r2.dev', pathname: '/**' } satisfies RemotePattern,
].filter((p): p is RemotePattern => Boolean(p))

const nextConfig: NextConfig = {
  output: 'standalone', // build ringan untuk VPS/Docker (Vercel mengabaikan opsi ini)
  poweredByHeader: false,
  images: {
    remotePatterns,
    // Next 16 blocks optimizing images from private IPs (e.g. localhost API in dev).
    dangerouslyAllowLocalIP: process.env.NODE_ENV !== 'production',
  },
}

export default nextConfig
