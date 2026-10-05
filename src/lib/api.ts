import 'server-only'

import type { BoardMember, CMSEvent, Globals, Page, Paginated, Partner, Post, Program } from '@/types/cms'

/**
 * Data layer — the counterpart of Payload's Local API calls in the website template.
 * Every request is tagged so the Laravel CMS can purge it via /api/revalidate.
 */

const API_URL = (process.env.CMS_API_URL || process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1').replace(/\/$/, '')
const REVALIDATE = Number(process.env.CMS_REVALIDATE_SECONDS || 300)

/** Thrown when the CMS can't be reached or answers with something that isn't the API (e.g. a hosting 404 page). */
export class CmsUnavailableError extends Error {
  constructor(path: string, reason: string) {
    super(`CMS API tidak bisa diakses (${API_URL}${path}): ${reason}`)
    this.name = 'CmsUnavailableError'
  }
}

/**
 * Returns `null` only for a genuine API 404 (JSON). Network errors, 5xx and non-JSON
 * responses throw, so Next.js shows the error page and keeps the last good cached
 * version instead of caching a misleading "not found".
 */
async function request<T>(path: string, tags: string[]): Promise<T | null> {
  let res: Response
  try {
    res = await fetch(`${API_URL}${path}`, {
      headers: { Accept: 'application/json' },
      next: { tags, revalidate: REVALIDATE },
    })
  } catch (error) {
    throw new CmsUnavailableError(path, (error as Error).message)
  }

  const isJson = res.headers.get('content-type')?.includes('application/json')
  if (!isJson) throw new CmsUnavailableError(path, `HTTP ${res.status}, bukan respons JSON — cek URL API / document root server`)
  if (res.status === 404) return null
  if (!res.ok) throw new CmsUnavailableError(path, `HTTP ${res.status}`)

  return (await res.json()) as T
}

/** For non-critical data (static params, sitemap): log and fall back instead of failing. */
export async function safe<T>(promise: Promise<T>, fallback: T): Promise<T> {
  try {
    return await promise
  } catch (error) {
    console.error('[cms]', (error as Error).message)
    return fallback
  }
}

const unwrap = <T,>(res: { data: T } | null) => res?.data ?? null

// Header/footer must never take the whole site down → soft failure.
export const getGlobals = async () => safe(request<{ data: Globals }>('/globals', ['globals']).then(unwrap), null)

export const getPage = async (slug: string) =>
  unwrap(await request<{ data: Page }>(`/pages/${encodeURIComponent(slug)}`, ['pages', `page:${slug}`]))

export const getPages = async () => unwrap(await request<{ data: Omit<Page, 'hero' | 'layout'>[] }>('/pages', ['pages'])) ?? []

export const getPosts = (params: { page?: number; limit?: number; category?: string } = {}) => {
  const qs = new URLSearchParams()
  if (params.page) qs.set('page', String(params.page))
  if (params.limit) qs.set('limit', String(params.limit))
  if (params.category) qs.set('category', params.category)
  return request<Paginated<Post>>(`/posts?${qs}`, ['posts'])
}

export const getPost = async (slug: string) =>
  unwrap(await request<{ data: Post }>(`/posts/${encodeURIComponent(slug)}`, ['posts', `post:${slug}`]))

export const getEvents = (params: { when?: 'upcoming' | 'past' | 'all'; page?: number; limit?: number } = {}) => {
  const qs = new URLSearchParams({ when: params.when ?? 'upcoming' })
  if (params.page) qs.set('page', String(params.page))
  if (params.limit) qs.set('limit', String(params.limit))
  return request<Paginated<CMSEvent>>(`/events?${qs}`, ['events'])
}

export const getEvent = async (slug: string) =>
  unwrap(await request<{ data: CMSEvent }>(`/events/${encodeURIComponent(slug)}`, ['events', `event:${slug}`]))

export const getPrograms = async (category?: string) =>
  unwrap(await request<{ data: Program[] }>(`/programs${category ? `?category=${category}` : ''}`, ['programs'])) ?? []

export const getProgram = async (slug: string) =>
  unwrap(await request<{ data: Program }>(`/programs/${encodeURIComponent(slug)}`, ['programs', `program:${slug}`]))

export const getBoardMembers = async () =>
  unwrap(await request<{ data: BoardMember[] }>('/board-members', ['board-members'])) ?? []

export const getPartners = async () => unwrap(await request<{ data: Partner[] }>('/partners', ['partners'])) ?? []
