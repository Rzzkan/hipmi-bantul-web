'use client'

import { RefreshCw } from 'lucide-react'
import Link from 'next/link'

import { buttonClass } from '@/components/CMSLink'
import { Container } from '@/components/Container'

/** Shown when the CMS API is unreachable — instead of a misleading 404. */
export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center gap-4 py-20 text-center">
      <span className="badge">Sedang ada gangguan</span>
      <h1 className="text-3xl font-extrabold text-heading sm:text-4xl">Konten belum bisa dimuat</h1>
      <p className="max-w-md text-muted">Server konten HIPMI Bantul sedang tidak bisa dihubungi. Coba muat ulang beberapa saat lagi.</p>
      <div className="flex flex-wrap justify-center gap-3">
        <button type="button" onClick={reset} className={buttonClass('default')}>
          <RefreshCw className="size-4" /> Coba lagi
        </button>
        <Link href="/" className={buttonClass('outline')}>
          Ke beranda
        </Link>
      </div>
    </Container>
  )
}
