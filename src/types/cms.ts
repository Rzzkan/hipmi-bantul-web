/**
 * Types mirroring the Laravel API (shape follows Payload CMS conventions:
 * pages have `hero` + `layout` blocks with `blockType`).
 */

export type LinkAppearance = 'default' | 'outline' | 'accent'

export interface CMSLinkType {
  label: string
  url: string
  appearance: LinkAppearance
  newTab: boolean
}

export interface Meta {
  title: string | null
  description: string | null
  image: string | null
}

export type HeroType = 'none' | 'highImpact' | 'mediumImpact' | 'lowImpact'

export interface Hero {
  type: HeroType
  eyebrow: string | null
  richText: string | null
  media: string | null
  links: CMSLinkType[]
}

export interface Post {
  id: number
  title: string
  slug: string
  category: string
  categoryLabel: string
  excerpt: string | null
  coverImage: string | null
  authorName: string | null
  publishedAt: string | null
  content?: string | null
  meta: Meta
}

export interface CMSEvent {
  id: number
  title: string
  slug: string
  excerpt: string | null
  coverImage: string | null
  startAt: string
  endAt: string | null
  location: string | null
  locationUrl: string | null
  price: number
  isFree: boolean
  quota: number | null
  seatsLeft: number | null
  registrationOpen: boolean
  description?: string | null
  meta: Meta
}

export interface Program {
  id: number
  title: string
  slug: string
  category: string
  categoryLabel: string
  summary: string | null
  coverImage: string | null
  benefits: string[]
  price: number
  isFree: boolean
  registrationOpen: boolean
  isFeatured: boolean
  description?: string | null
  meta: Meta
}

export interface SocialLink {
  handle: string
  url: string
}

export interface BoardMember {
  id: number
  name: string
  position: string
  level: 'inti' | 'bidang' | 'kompartemen'
  divisionId: number | null
  compartmentId: number | null
  photo: string | null
  company: string | null
  bio: string | null
  socials: Partial<Record<'instagram' | 'tiktok' | 'linkedin', SocialLink>>
}

export interface Compartment {
  id: number
  name: string
  members: BoardMember[]
}

export interface Division {
  id: number
  number: number | null
  name: string
  label: string
  description: string | null
  leaders: BoardMember[]
  compartments: Compartment[]
}

export interface IntiBranch {
  heads: BoardMember[]
  deputies: BoardMember[]
}

export interface BoardStructure {
  inti: BoardMember[]
  /** Org chart: Ketua Umum → (Sekretaris Umum + wakil-wakilnya) & (Bendahara + wakil-wakilnya) */
  intiChart: {
    ketua: BoardMember[]
    sekretaris: IntiBranch
    bendahara: IntiBranch
    others: BoardMember[]
  }
  divisions: Division[]
}

export interface Partner {
  id: number
  name: string
  logo: string | null
  url: string | null
  tier: string
}

/* ---------- Layout blocks ---------- */

interface BlockBase {
  id: string
}

export interface ContentBlock extends BlockBase {
  blockType: 'content'
  background: 'default' | 'muted' | 'brand'
  columns: { size: 'full' | 'half' | 'oneThird' | 'twoThirds'; richText: string | null; link: CMSLinkType | null }[]
}

export interface MediaBlockType extends BlockBase {
  blockType: 'mediaBlock'
  media: string | null
  caption: string | null
}

export interface CallToActionBlock extends BlockBase {
  blockType: 'cta'
  richText: string | null
  links: CMSLinkType[]
}

export interface StatsBlock extends BlockBase {
  blockType: 'stats'
  introContent: string | null
  items: { value: string; label: string }[]
}

export interface FaqBlock extends BlockBase {
  blockType: 'faq'
  introContent: string | null
  items: { question: string; answer: string }[]
}

export type ArchiveBlock = BlockBase & { introContent: string | null; limit: number } & (
    | { blockType: 'archive'; relationTo: 'posts'; docs: Post[] }
    | { blockType: 'archive'; relationTo: 'events'; docs: CMSEvent[] }
    | { blockType: 'archive'; relationTo: 'programs'; docs: Program[] }
  )

export interface TeamBlock extends BlockBase {
  blockType: 'team'
  introContent: string | null
  showInti: boolean
  structure: BoardStructure
}

export interface PartnersBlock extends BlockBase {
  blockType: 'partners'
  introContent: string | null
  partners: Partner[]
}

export type FormType = 'membership' | 'event' | 'program'

export interface FormBlockType extends BlockBase {
  blockType: 'form'
  formType: FormType
  introContent: string | null
  successMessage: string
  options: { value: number; label: string }[]
}

export type LayoutBlock =
  | ContentBlock
  | MediaBlockType
  | CallToActionBlock
  | StatsBlock
  | FaqBlock
  | ArchiveBlock
  | TeamBlock
  | PartnersBlock
  | FormBlockType

export interface Page {
  id: number
  title: string
  slug: string
  updatedAt: string
  hero: Hero
  layout: LayoutBlock[]
  meta: Meta
}

/* ---------- Globals ---------- */

export interface SiteGlobal {
  name: string
  tagline: string | null
  logo: string | null
  email: string | null
  phone: string | null
  whatsapp: string | null
  address: string | null
  mapsUrl: string | null
  socials: { platform: string; url: string }[]
  defaultMetaImage: string | null
}

export interface Globals {
  site: SiteGlobal
  header: { navItems: CMSLinkType[]; cta: CMSLinkType | null }
  footer: { about: string | null; navItems: CMSLinkType[]; copyright: string | null }
}

export interface Paginated<T> {
  data: T[]
  meta: { current_page: number; last_page: number; per_page: number; total: number }
}
