import { Container } from '@/components/Container'
import { Media } from '@/components/Media'
import type { MediaBlockType } from '@/types/cms'

export function MediaBlock({ media, caption }: MediaBlockType) {
  if (!media) return null
  return (
    <section className="surface py-12">
      <Container>
        <figure>
          <Media src={media} alt={caption ?? ''} className="aspect-[16/8] rounded-3xl shadow-xl shadow-primary/10 dark:shadow-black/40" sizes="(min-width: 1280px) 1280px, 100vw" />
          {caption && <figcaption className="mt-3 text-center text-sm text-muted">{caption}</figcaption>}
        </figure>
      </Container>
    </section>
  )
}
