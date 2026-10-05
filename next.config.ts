import type { NextConfig } from 'next'

/**
 * Images uploaded through the Laravel CMS are served from its `/storage` path.
 * CMS_MEDIA_URL defaults to the API origin.
 */
const mediaUrl = new URL(process.env.CMS_MEDIA_URL || process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000')

const nextConfig: NextConfig = {
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
}

export default nextConfig
