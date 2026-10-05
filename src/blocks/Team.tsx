import { Container } from '@/components/Container'
import { Media } from '@/components/Media'
import { SectionIntro } from '@/components/SectionIntro'
import type { BoardMember, TeamBlock as Props } from '@/types/cms'

function MemberCard({ m }: { m: BoardMember }) {
  return (
    <div className="card card-hover group p-5 text-center">
      <Media src={m.photo} alt={m.name} className="mx-auto aspect-square w-full max-w-40 rounded-full ring-4 ring-primary/20" sizes="160px" />
      <p className="mt-4 font-bold text-heading">{m.name}</p>
      <p className="text-sm font-semibold text-brand">{m.position}</p>
      {m.company && <p className="mt-0.5 text-xs text-muted">{m.company}</p>}
      {(m.instagram || m.linkedin) && (
        <div className="mt-3 flex justify-center gap-3 text-xs font-semibold">
          {m.instagram && (
            <a href={`https://instagram.com/${m.instagram.replace('@', '')}`} target="_blank" rel="noopener noreferrer" className="text-coral hover:underline">
              Instagram
            </a>
          )}
          {m.linkedin && (
            <a href={m.linkedin} target="_blank" rel="noopener noreferrer" className="text-[#0a66c2] hover:underline dark:text-sky-400">
              LinkedIn
            </a>
          )}
        </div>
      )}
    </div>
  )
}

export function TeamBlock({ introContent, members }: Props) {
  const groups = members.reduce<Record<string, BoardMember[]>>((acc, m) => {
    const key = m.divisionLabel ?? 'Pengurus'
    ;(acc[key] ??= []).push(m)
    return acc
  }, {})

  return (
    <section className="surface-alt relative py-20">
      <div className="absolute inset-x-0 top-0 divider-glow" />
      <Container>
        <SectionIntro html={introContent} badge="Pengurus" center />
        <div className="space-y-14">
          {Object.entries(groups).map(([label, list]) => (
            <div key={label}>
              <h3 className="mb-6 text-center text-sm font-bold tracking-widest text-accent-dark uppercase dark:text-accent-light">{label}</h3>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 lg:grid-cols-4">
                {list.map((m) => (
                  <MemberCard key={m.id} m={m} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
