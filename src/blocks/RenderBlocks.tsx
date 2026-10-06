import type { LayoutBlock } from '@/types/cms'

import { ArchiveBlock } from './ArchiveBlock'
import { CallToActionBlock } from './CallToAction'
import { ContentBlock } from './Content'
import { EmbedBlock } from './Embed'
import { FaqBlock } from './Faq'
import { FormBlock } from './Form'
import { MediaBlock } from './MediaBlock'
import { PartnersBlock } from './Partners'
import { StatsBlock } from './Stats'
import { TeamBlock } from './Team'

/**
 * Payload-style block renderer: maps `blockType` → React component.
 * To add a block: define it in Laravel (PageForm + BlockSerializer), add a type in
 * `types/cms.ts`, create the component here and register it below.
 */
const blockComponents = {
  content: ContentBlock,
  mediaBlock: MediaBlock,
  cta: CallToActionBlock,
  stats: StatsBlock,
  archive: ArchiveBlock,
  team: TeamBlock,
  partners: PartnersBlock,
  form: FormBlock,
  faq: FaqBlock,
  embed: EmbedBlock,
} as const

export function RenderBlocks({ blocks }: { blocks?: LayoutBlock[] | null }) {
  if (!blocks?.length) return null

  return (
    <>
      {blocks.map((block) => {
        const Block = blockComponents[block.blockType] as React.ComponentType<typeof block> | undefined
        if (!Block) return null
        return <Block key={block.id} {...block} />
      })}
    </>
  )
}
