import Link from 'next/link'

import { buttonClass } from '@/components/CMSLink'
import { Container } from '@/components/Container'

export default function NotFound() {
  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center gap-4 py-20 text-center">
      <p className="gradient-text text-8xl font-extrabold">404</p>
      <p className="text-muted">Halaman yang kamu cari tidak ditemukan.</p>
      <Link href="/" className={buttonClass('default')}>
        Kembali ke beranda
      </Link>
    </Container>
  )
}
