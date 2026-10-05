import { revalidateTag } from 'next/cache'
import { type NextRequest, NextResponse } from 'next/server'

/**
 * Called by the Laravel CMS (App\Support\FrontendRevalidator) after content changes —
 * equivalent to Payload's afterChange `revalidatePath/revalidateTag` hooks.
 */
export async function POST(req: NextRequest) {
  const secret = process.env.REVALIDATE_SECRET
  if (!secret || req.headers.get('x-revalidate-secret') !== secret) {
    return NextResponse.json({ message: 'Invalid secret' }, { status: 401 })
  }

  const body = (await req.json().catch(() => ({}))) as { tags?: unknown }
  const tags = Array.isArray(body.tags) ? body.tags.filter((t): t is string => typeof t === 'string').slice(0, 20) : []

  tags.forEach((tag) => revalidateTag(tag, 'max'))

  return NextResponse.json({ revalidated: tags, now: Date.now() })
}
