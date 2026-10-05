# HIPMI Bantul — Website (Next.js)

Frontend landing page **BPC HIPMI Bantul**. Strukturnya mengikuti **Payload CMS Website Template** (hero + layout *blocks*, `RenderBlocks`, `RenderHero`, `CMSLink`, `generateMeta`, on-demand revalidation), tetapi data diambil dari API Laravel di repo [`hipmi-bantul-api`](../hipmi-bantul-api).

| | |
|---|---|
| Framework | Next.js 16 (App Router) · React 19 · TypeScript |
| Styling | Tailwind CSS 4 + Typography |
| Data | `src/lib/api.ts` → `fetch` ber-*tag* + revalidate |

## Jalankan lokal

Pastikan API Laravel sudah jalan di `http://localhost:8000`.

```bash
npm install
cp .env.example .env.local
npm run dev          # http://localhost:3000
```

## Struktur

```
src/
├─ app/
│  ├─ page.tsx                 # beranda → halaman CMS slug "home"
│  ├─ [slug]/page.tsx          # semua halaman CMS (tentang, daftar, dst)
│  ├─ berita/ , agenda/ , program/   # list + detail koleksi
│  ├─ api/revalidate/route.ts  # dipanggil CMS saat konten berubah
│  └─ sitemap.ts, robots.ts
├─ heros/      # RenderHero: highImpact | mediumImpact | lowImpact
├─ blocks/     # RenderBlocks + content, mediaBlock, cta, stats, archive, team, partners, form, faq
├─ components/ # Header, Footer, CMSLink, RichText, Media, Cards, ...
├─ lib/        # api.ts, utils.ts, generateMeta.ts
└─ types/cms.ts
```

## Alur konten
1. Pengurus mengedit di `/admin` (Laravel).
2. Laravel mengirim `POST /api/revalidate` berisi tag (mis. `page:home`, `posts`).
3. Next.js menandai cache basi → halaman tampil versi terbaru di kunjungan berikutnya. Fallback otomatis tiap `CMS_REVALIDATE_SECONDS`.

Formulir pendaftaran mengirim langsung ke `POST /api/v1/registrations` (pastikan `CORS_ALLOWED_ORIGINS` di Laravel memuat domain website).

## Ganti warna brand
Edit token di `src/app/globals.css` (`--color-navy-*`, `--color-gold`).

## Deploy
Vercel / VPS (`npm run build && npm start`). Isi env sesuai `.env.example`; `REVALIDATE_SECRET` harus sama dengan `FRONTEND_REVALIDATE_SECRET` di Laravel. Saat build, API harus bisa diakses (halaman dipre-render).
