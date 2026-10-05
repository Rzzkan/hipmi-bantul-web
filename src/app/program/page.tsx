import type { Metadata } from 'next'

import { ProgramCard } from '@/components/Cards'
import { Container } from '@/components/Container'
import { PageHeader } from '@/components/PageHeader'
import { getPrograms } from '@/lib/api'

export const metadata: Metadata = { title: 'Program', description: 'Program kerja BPC HIPMI Bantul: kaderisasi, pendampingan UMKM, sosial, dan sinergi anggota.' }

export default async function ProgramPage() {
  const programs = await getPrograms()

  return (
    <>
      <PageHeader eyebrow="Program" title="Program HIPMI Bantul" description="Ikut tumbuh lewat program kaderisasi, pendampingan UMKM, sosial, dan networking." />
      <div className="surface relative">
        <div className="absolute inset-x-0 top-0 divider-glow" />
      <Container className="py-16">
        {!programs.length ? (
          <p className="text-muted">Belum ada program.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {programs.map((p) => (
              <ProgramCard key={p.id} program={p} />
            ))}
          </div>
        )}
      </Container>
      </div>
    </>
  )
}
