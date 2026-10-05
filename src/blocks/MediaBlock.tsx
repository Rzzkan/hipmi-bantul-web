import { Container } from '@/components/Container'
import { Media } from '@/components/Media'
import type { MediaBlockType } from '@/types/cms'

export function MediaBlock({ media, caption }: MediaBlockType) {
  if (!media) return null
  return (
    <section className="py-10">
      <Container>
        <figure>
          <Media src={media} alt={caption ?? ''} className="aspect-[16/8] rounded-3xl" sizes="(min-width: 1152px) 1152px, 100vw" />
          {caption && <figcaption className="mt-3 text-center text-sm text-slate-500">{caption}</figcaption>}
        </figure>
      </Container>
    </section>
  )
}
