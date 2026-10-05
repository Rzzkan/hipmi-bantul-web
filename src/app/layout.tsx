import type { Metadata, Viewport } from 'next'
import { Plus_Jakarta_Sans } from 'next/font/google'

import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { ThemeScript } from '@/components/ThemeScript'
import { getGlobals } from '@/lib/api'
import { getSiteURL } from '@/lib/utils'

import './globals.css'

const jakarta = Plus_Jakarta_Sans({ variable: '--font-jakarta', subsets: ['latin'], display: 'swap' })

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#fff9f0' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
  ],
}

export async function generateMetadata(): Promise<Metadata> {
  const globals = await getGlobals()
  const name = globals?.site.name ?? 'BPC HIPMI Bantul'

  return {
    metadataBase: new URL(getSiteURL()),
    title: { default: name, template: `%s | ${name}` },
    description: globals?.site.tagline ?? undefined,
    icons: { icon: '/logo.svg', apple: '/logo.svg' },
    openGraph: {
      siteName: name,
      images: globals?.site.defaultMetaImage ? [{ url: globals.site.defaultMetaImage }] : undefined,
    },
  }
}

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    // suppressHydrationWarning: ThemeScript menambah class `dark` sebelum React hydrate
    <html lang="id" className={`${jakarta.variable} h-full antialiased`} suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body className="flex min-h-full flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
