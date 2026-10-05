import { Check } from 'lucide-react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { RegistrationForm } from '@/blocks/Form/RegistrationForm'
import { Container } from '@/components/Container'
import { Media } from '@/components/Media'
import { RichText } from '@/components/RichText'
import { getProgram, getPrograms } from '@/lib/api'
import { generateMeta } from '@/lib/generateMeta'
import { formatRupiah } from '@/lib/utils'

export async function generateStaticParams() {
  const programs = await getPrograms()
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
    <article>
      <header className="bg-navy-900 text-white">
        <Container className="grid items-center gap-10 py-14 md:grid-cols-2">
          <div>
            <p className="text-xs font-semibold tracking-widest text-gold uppercase">{program.categoryLabel}</p>
            <h1 className="mt-3 text-3xl leading-tight font-extrabold md:text-5xl">{program.title}</h1>
            {program.summary && <p className="mt-4 text-white/75">{program.summary}</p>}
            <p className="mt-6 inline-block rounded-full bg-gold px-4 py-1.5 text-sm font-bold text-navy-900">{formatRupiah(program.price)}</p>
          </div>
          <Media src={program.coverImage} alt={program.title} priority className="aspect-[4/3] rounded-3xl" />
        </Container>
      </header>

      <Container className="grid gap-12 py-14 lg:grid-cols-[1.3fr_1fr]">
        <div>
          <RichText html={program.description} />
          {program.benefits.length > 0 && (
            <div className="mt-10 rounded-3xl bg-slate-50 p-6">
              <h2 className="mb-4 text-xl font-bold">Yang kamu dapat</h2>
              <ul className="space-y-3">
                {program.benefits.map((b) => (
                  <li key={b} className="flex gap-3">
                    <Check className="mt-0.5 size-5 shrink-0 text-emerald-600" /> {b}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <aside id="daftar" className="h-fit rounded-3xl border border-slate-200 p-6 shadow-sm lg:sticky lg:top-24">
          <h2 className="mb-6 text-xl font-bold">Ikut program ini</h2>
          {program.registrationOpen ? (
            <RegistrationForm
              formType="program"
              defaultTargetId={program.id}
              successMessage="Terima kasih! Tim program akan menghubungimu via WhatsApp."
            />
          ) : (
            <p className="rounded-xl bg-slate-100 p-4 text-center text-slate-600">Pendaftaran program sedang ditutup.</p>
          )}
        </aside>
      </Container>
    </article>
  )
}
