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
      <div className="surface relative">
        <div className="absolute inset-x-0 top-0 divider-glow" />
      <Container className="py-16">
        <div className="mb-8 flex flex-wrap gap-2">
          {categories.map((c) => (
            <Link
              key={c.value}
              href={c.value ? `/berita?kategori=${c.value}` : '/berita'}
              className={cn(
                'rounded-full border px-4 py-1.5 text-xs font-semibold transition sm:text-sm',
                category === c.value
                  ? 'border-primary bg-primary/10 text-primary-ink dark:text-primary'
                  : 'border-gray-200 text-gray-500 hover:border-primary hover:text-primary-ink dark:border-white/10 dark:text-gray-400 dark:hover:text-primary',
              )}
            >
              {c.label}
            </Link>
          ))}
        </div>

        {!res?.data.length ? (
          <p className="text-muted">Belum ada berita.</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {res.data.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}

        <Pagination page={page} totalPages={res?.meta.last_page ?? 1} basePath="/berita" query={category ? { kategori: category } : {}} />
      </Container>
      </div>
    </>
  )
}
