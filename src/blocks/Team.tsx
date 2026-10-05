import { Container } from '@/components/Container'
import { Media } from '@/components/Media'
import { SectionIntro } from '@/components/SectionIntro'
import type { BoardMember, TeamBlock as Props } from '@/types/cms'

function MemberCard({ m }: { m: BoardMember }) {
  return (
    <div className="text-center">
      <Media src={m.photo} alt={m.name} className="mx-auto aspect-square w-full max-w-44 rounded-full" sizes="176px" />
      <p className="mt-4 font-bold text-slate-900">{m.name}</p>
      <p className="text-sm font-medium text-navy-700">{m.position}</p>
      {m.company && <p className="mt-0.5 text-xs text-slate-500">{m.company}</p>}
      {(m.instagram || m.linkedin) && (
        <div className="mt-2 flex justify-center gap-3 text-xs">
          {m.instagram && (
            <a href={`https://instagram.com/${m.instagram.replace('@', '')}`} target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-navy-700">
              Instagram
            </a>
          )}
          {m.linkedin && (
            <a href={m.linkedin} target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-navy-700">
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
    <section className="bg-slate-50 py-16 md:py-20">
      <Container>
        <SectionIntro html={introContent} />
        <div className="space-y-14">
          {Object.entries(groups).map(([label, list]) => (
            <div key={label}>
              <h3 className="mb-8 text-center text-sm font-bold tracking-widest text-gold-700 uppercase">{label}</h3>
              <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-4">
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
