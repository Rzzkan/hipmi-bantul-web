import Link from 'next/link'

import { buttonClass } from '@/components/CMSLink'
import { Container } from '@/components/Container'

export default function NotFound() {
  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center gap-4 py-20 text-center">
      <p className="text-7xl font-extrabold text-navy-900">404</p>
      <p className="text-slate-600">Halaman yang kamu cari tidak ditemukan.</p>
      <Link href="/" className={buttonClass('default')}>
        Kembali ke beranda
      </Link>
    </Container>
  )
}
