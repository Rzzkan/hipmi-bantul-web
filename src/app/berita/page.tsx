import type { Metadata } from 'next'
import Link from 'next/link'

import { PostCard } from '@/components/Cards'
import { Container } from '@/components/Container'
import { PageHeader } from '@/components/PageHeader'
import { Pagination } from '@/components/Pagination'
import { getPosts } from '@/lib/api'
import { cn } from '@/lib/utils'

export const metadata: Metadata = { title: 'Berita', description: 'Kabar, kegiatan, dan pengumuman terbaru BPC HIPMI Bantul.' }

const categories = [
  { value: '', label: 'Semua' },
  { value: 'berita', label: 'Berita' },
  { value: 'kegiatan', label: 'Kegiatan' },
  { value: 'opini', label: 'Opini' },
  { value: 'pengumuman', label: 'Pengumuman' },
]

export default async function BeritaPage({ searchParams }: PageProps<'/berita'>) {
  const sp = await searchParams
  const page = Number(sp.page ?? 1) || 1
  const category = typeof sp.kategori === 'string' ? sp.kategori : ''
  const res = await getPosts({ page, limit: 9, category: category || undefined })

  return (
    <>
      <PageHeader eyebrow="Berita" title="Kabar HIPMI Bantul" description="Kegiatan, opini, dan pengumuman terbaru dari pengurus." />
      <Container className="py-14">
        <div className="mb-8 flex flex-wrap gap-2">
          {categories.map((c) => (
            <Link
              key={c.value}
              href={c.value ? `/berita?kategori=${c.value}` : '/berita'}
              className={cn(
                'rounded-full border px-4 py-1.5 text-sm font-medium',
                category === c.value ? 'border-navy-900 bg-navy-900 text-white' : 'border-slate-200 hover:border-navy-700',
              )}
            >
              {c.label}
            </Link>
          ))}
        </div>

        {!res?.data.length ? (
          <p className="text-slate-500">Belum ada berita.</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {res.data.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}

        <Pagination page={page} totalPages={res?.meta.last_page ?? 1} basePath="/berita" query={category ? { kategori: category } : {}} />
      </Container>
    </>
  )
}
