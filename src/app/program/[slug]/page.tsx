import { Check } from 'lucide-react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { RegistrationForm } from '@/blocks/Form/RegistrationForm'
import { Container } from '@/components/Container'
import { Media } from '@/components/Media'
import { RichText } from '@/components/RichText'
import { HeroBackground } from '@/heros/HeroBackground'
import { getProgram, getPrograms, safe } from '@/lib/api'
import { generateMeta } from '@/lib/generateMeta'
import { formatRupiah } from '@/lib/utils'

export async function generateStaticParams() {
  const programs = await safe(getPrograms(), [])
  return programs.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: PageProps<'/program/[slug]'>): Promise<Metadata> {
  const { slug } = await params
  const program = await getProgram(slug)
  return generateMeta({ meta: program?.meta, path: `/program/${slug}` })
}

export default async function ProgramDetailPage({ params }: PageProps<'/program/[slug]'>) {
  const { slug } = await params
  const program = await getProgram(slug)
  if (!program) notFound()

  return (
    <article className="surface">
      <header className="relative isolate overflow-hidden">
        <HeroBackground />
        <Container className="grid items-center gap-10 py-14 md:grid-cols-2">
          <div>
            <span className="badge">{program.categoryLabel}</span>
            <h1 className="mt-4 text-3xl leading-tight font-extrabold text-heading md:text-5xl">{program.title}</h1>
            {program.summary && <p className="mt-4 text-lg text-muted">{program.summary}</p>}
            <p className="mt-6 inline-block rounded-xl bg-gradient-to-r from-accent to-accent-dark px-5 py-2 text-sm font-bold text-white shadow-md shadow-accent/20">{formatRupiah(program.price)}</p>
          </div>
          <Media src={program.coverImage} alt={program.title} priority className="aspect-[4/3] rounded-3xl shadow-2xl shadow-primary/10 dark:shadow-black/40" />
        </Container>
      </header>

      <Container className="grid gap-12 py-16 lg:grid-cols-[1.3fr_1fr]">
        <div>
          <RichText html={program.description} />
          {program.benefits.length > 0 && (
            <div className="mt-10 rounded-3xl border border-primary/20 bg-primary/5 p-6">
              <h2 className="mb-4 text-xl font-extrabold text-heading">Yang kamu dapat</h2>
              <ul className="space-y-3">
                {program.benefits.map((b) => (
                  <li key={b} className="flex gap-3 text-gray-700 dark:text-gray-300">
                    <Check className="mt-0.5 size-5 shrink-0 text-accent" /> {b}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <aside id="daftar" className="card h-fit rounded-3xl p-6 lg:sticky lg:top-28">
          <h2 className="mb-6 text-xl font-extrabold text-heading">Ikut program ini</h2>
          {program.registrationOpen ? (
            <RegistrationForm
              formType="program"
              defaultTargetId={program.id}
              successMessage="Terima kasih! Tim program akan menghubungimu via WhatsApp."
            />
          ) : (
            <p className="rounded-xl bg-coral/10 p-4 text-center font-semibold text-coral-dark dark:text-coral">Pendaftaran program sedang ditutup.</p>
          )}
        </aside>
      </Container>
    </article>
  )
}
