import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { PostCard } from '@/components/Cards'
import { Container } from '@/components/Container'
import { Media } from '@/components/Media'
import { RichText } from '@/components/RichText'
import { HeroBackground } from '@/heros/HeroBackground'
import { getPost, getPosts, safe } from '@/lib/api'
import { generateMeta } from '@/lib/generateMeta'
import { formatDate } from '@/lib/utils'

export async function generateStaticParams() {
  const res = await safe(getPosts({ limit: 50 }), null)
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

  const related = (await safe(getPosts({ limit: 4, category: post.category }), null))?.data.filter((p) => p.id !== post.id).slice(0, 3) ?? []

  return (
    <article className="surface">
      <header className="relative isolate overflow-hidden">
        <HeroBackground />
        <Container className="max-w-3xl py-16 text-center">
          <Link href="/berita" className="badge transition hover:bg-primary/20">
            ← {post.categoryLabel}
          </Link>
          <h1 className="mt-5 text-3xl leading-tight font-extrabold text-heading md:text-5xl">{post.title}</h1>
          <p className="mt-4 text-sm text-muted">
            {post.authorName && <>{post.authorName} · </>}
            <time dateTime={post.publishedAt ?? undefined}>{formatDate(post.publishedAt)}</time>
          </p>
        </Container>
      </header>

      <Container className="max-w-3xl py-12">
        {post.coverImage && <Media src={post.coverImage} alt={post.title} priority className="mb-10 aspect-[16/9] rounded-3xl shadow-xl shadow-primary/10 dark:shadow-black/40" />}
        <RichText html={post.content} className="prose-lg prose-p:text-gray-700 dark:prose-p:text-gray-300" />
      </Container>

      {related.length > 0 && (
        <section className="surface-alt relative py-16">
          <div className="absolute inset-x-0 top-0 divider-glow" />
          <Container>
            <h2 className="mb-8 text-2xl font-extrabold text-heading">Baca juga</h2>
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
