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

## Gambar dari Cloudflare R2
Jika API memakai `MEDIA_DISK=r2`, gambar disajikan dari bucket R2. Set `CMS_MEDIA_CDN_URL` (mis. `https://media.hipmibantul.site`) di environment Vercel; domain `*.r2.dev`, `*.hipmibantul.site` dan `*.hipmibantul.com` sudah diizinkan otomatis di `next.config.ts`.

## Tema terang/gelap
Otomatis mengikuti pengaturan HP/komputer pengunjung (dan ikut berganti saat pengaturan perangkat berubah). Tombol di header berputar: **ikuti perangkat → terang → gelap**; pilihan manual disimpan di browser pengunjung.

## Ganti warna brand
Edit token di `src/app/globals.css` (`--color-navy-*`, `--color-gold`).

## Deploy ke `https://web.hipmibantul.com`

URL produksi sudah diset di `.env.production` (API: `https://api.hipmibantul.com`). Yang perlu ditambahkan hanya rahasia:

```env
REVALIDATE_SECRET=<sama dengan FRONTEND_REVALIDATE_SECRET di Laravel>
```

**Deploy API dulu** — saat `npm run build`, halaman dipre-render dari `api.hipmibantul.com`.

### Opsi A — Vercel (paling mudah)
1. Import repo → framework Next.js (otomatis).
2. Settings → Environment Variables → tambah `REVALIDATE_SECRET`.
3. Settings → Domains → tambah `web.hipmibantul.com`, lalu di DNS buat CNAME `web` → `cname.vercel-dns.com`.
4. Setelah API online, klik **Redeploy** (halaman dipre-render saat build).

### Opsi B — VPS (Nginx + PM2)
```bash
git clone … /var/www/hipmi-bantul-web && cd /var/www/hipmi-bantul-web
echo "REVALIDATE_SECRET=..." > .env.production.local
npm i -g pm2
bash deploy/deploy.sh                    # build + jalankan di port 3000
```
Lalu salin `deploy/nginx-web.hipmibantul.com.conf` ke Nginx dan `sudo certbot --nginx -d web.hipmibantul.com`.

> Untuk development lokal, `.env.local` (dari `.env.example`) mengarah ke `localhost:8000` dan otomatis menimpa `.env.production`.
