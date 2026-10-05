import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { PostCard } from '@/components/Cards'
import { Container } from '@/components/Container'
import { Media } from '@/components/Media'
import { RichText } from '@/components/RichText'
import { getPost, getPosts } from '@/lib/api'
import { generateMeta } from '@/lib/generateMeta'
import { formatDate } from '@/lib/utils'

export async function generateStaticParams() {
  const res = await getPosts({ limit: 50 })
  return (res?.data ?? []).map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: PageProps<'/berita/[slug]'>): Promise<Metadata> {
  const { slug } = await params
  const post = await getPost(slug)
  return generateMeta({ meta: post?.meta, path: `/berita/${slug}` })
}

export default async function PostPage({ params }: PageProps<'/berita/[slug]'>) {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) notFound()

  const related = (await getPosts({ limit: 4, category: post.category }))?.data.filter((p) => p.id !== post.id).slice(0, 3) ?? []

  return (
    <article>
      <header className="bg-navy-900 text-white">
        <Container className="max-w-3xl py-14">
          <Link href="/berita" className="text-sm text-gold hover:underline">
            ← {post.categoryLabel}
          </Link>
          <h1 className="mt-3 text-3xl leading-tight font-extrabold md:text-5xl">{post.title}</h1>
          <p className="mt-4 text-sm text-white/70">
            {post.authorName && <>{post.authorName} · </>}
            <time dateTime={post.publishedAt ?? undefined}>{formatDate(post.publishedAt)}</time>
          </p>
        </Container>
      </header>

      <Container className="max-w-3xl py-12">
        {post.coverImage && <Media src={post.coverImage} alt={post.title} priority className="mb-10 aspect-[16/9] rounded-3xl" />}
        <RichText html={post.content} className="prose-lg" />
      </Container>

      {related.length > 0 && (
        <section className="bg-slate-50 py-14">
          <Container>
            <h2 className="mb-8 text-2xl font-bold">Baca juga</h2>
            <div className="grid gap-6 md:grid-cols-3">
              {related.map((p) => (
                <PostCard key={p.id} post={p} />
              ))}
            </div>
          </Container>
        </section>
      )}
    </article>
  )
}
