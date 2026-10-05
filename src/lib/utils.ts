import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs))

const TZ = 'Asia/Jakarta'

export const formatDate = (iso?: string | null, withTime = false) => {
  if (!iso) return ''
  return new Intl.DateTimeFormat('id-ID', {
    timeZone: TZ,
    weekday: withTime ? 'long' : undefined,
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    ...(withTime ? { hour: '2-digit', minute: '2-digit' } : {}),
  }).format(new Date(iso))
}

export const formatTime = (iso?: string | null) =>
  iso ? new Intl.DateTimeFormat('id-ID', { timeZone: TZ, hour: '2-digit', minute: '2-digit' }).format(new Date(iso)) : ''

export const dateParts = (iso: string) => {
  const d = new Date(iso)
  return {
    day: new Intl.DateTimeFormat('id-ID', { timeZone: TZ, day: '2-digit' }).format(d),
    month: new Intl.DateTimeFormat('id-ID', { timeZone: TZ, month: 'short' }).format(d),
  }
}

export const formatRupiah = (value: number) =>
  value === 0 ? 'Gratis' : new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(value)

export const getSiteURL = () => (process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000').replace(/\/$/, '')

export const whatsappLink = (number?: string | null, text?: string) =>
  number ? `https://wa.me/${number.replace(/\D/g, '').replace(/^0/, '62')}${text ? `?text=${encodeURIComponent(text)}` : ''}` : null
