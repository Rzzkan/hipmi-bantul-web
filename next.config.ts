import type { NextConfig } from 'next'

/**
 * Images uploaded through the Laravel CMS are served from its `/storage` path.
 * CMS_MEDIA_URL defaults to the API origin.
 */
const mediaUrl = new URL(process.env.CMS_MEDIA_URL || process.env.NEXT_PUBLIC_API_URL || 'https://api.hipmibantul.com')

const nextConfig: NextConfig = {
  output: 'standalone', // build ringan untuk VPS/Docker (Vercel mengabaikan opsi ini)
  poweredByHeader: false,
  images: {
    remotePatterns: [
      {
        protocol: mediaUrl.protocol.replace(':', '') as 'http' | 'https',
        hostname: mediaUrl.hostname,
        port: mediaUrl.port,
        pathname: '/storage/**',
      },
    ],
    // Next 16 blocks optimizing images from private IPs (e.g. localhost API in dev).
    dangerouslyAllowLocalIP: process.env.NODE_ENV !== 'production',
  },
  async redirects() {
    // www → apex domain
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.hipmibantul.com' }],
        destination: 'https://hipmibantul.com/:path*',
        permanent: true,
      },
    ]
  },
}

export default nextConfig
