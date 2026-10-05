'use client'

import { CheckCircle2, Loader2 } from 'lucide-react'
import { useState } from 'react'

import { buttonClass } from '@/components/CMSLink'
import { cn } from '@/lib/utils'
import type { FormType } from '@/types/cms'

type Errors = Record<string, string[]>

const API_URL = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1').replace(/\/$/, '')

const businessFields = [
  'Kuliner & F&B',
  'Fashion & Tekstil',
  'Kerajinan & Furnitur',
  'Pertanian & Peternakan',
  'Jasa & Konsultan',
  'Teknologi & Digital',
  'Properti & Konstruksi',
  'Pariwisata & Hospitality',
  'Perdagangan & Distribusi',
  'Lainnya',
]

function Field({
  label,
  name,
  errors,
  required,
  className,
  children,
}: {
  label: string
  name: string
  errors: Errors
  required?: boolean
  className?: string
  children: React.ReactNode
}) {
  return (
    <label className={cn('flex flex-col gap-1.5 text-sm', className)} htmlFor={name}>
      <span className="font-medium text-slate-700">
        {label} {required && <span className="text-red-500">*</span>}
      </span>
      {children}
      {errors[name] && <span className="text-xs text-red-600">{errors[name][0]}</span>}
    </label>
  )
}

const input =
  'w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-slate-900 outline-none transition focus:border-navy-600 focus:ring-2 focus:ring-navy-600/20'

/**
 * Posts straight to Laravel `POST /api/v1/registrations` (CORS enabled for the site origin).
 */
export function RegistrationForm({
  formType,
  options = [],
  successMessage,
  defaultTargetId,
}: {
  formType: FormType
  options?: { value: number; label: string }[]
  successMessage: string
  defaultTargetId?: number
}) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errors, setErrors] = useState<Errors>({})
  const [message, setMessage] = useState<string | null>(null)

  const isMembership = formType === 'membership'
  const targetField = formType === 'event' ? 'event_id' : formType === 'program' ? 'program_id' : null

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('loading')
    setErrors({})
    setMessage(null)

    const body = Object.fromEntries(new FormData(e.currentTarget).entries())

    try {
      const res = await fetch(`${API_URL}/registrations`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ ...body, type: formType }),
      })
      const json = await res.json().catch(() => ({}))

      if (res.status === 422) {
        setErrors(json.errors ?? {})
        setStatus('error')
        return
      }
      if (res.status === 429) {
        setMessage('Terlalu banyak percobaan. Coba lagi dalam 1 menit.')
        setStatus('error')
        return
      }
      if (!res.ok) throw new Error(json.message)

      setStatus('success')
    } catch {
      setMessage('Gagal mengirim. Periksa koneksi internet lalu coba lagi.')
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center gap-3 py-8 text-center">
        <CheckCircle2 className="size-14 text-emerald-500" />
        <p className="text-lg font-bold text-slate-900">Pendaftaran terkirim!</p>
        <p className="max-w-md text-slate-600">{successMessage}</p>
      </div>
    )
  }

  if (targetField && options.length === 0 && !defaultTargetId) {
    return <p className="text-center text-slate-500">Belum ada pendaftaran yang dibuka saat ini.</p>
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-5 sm:grid-cols-2" noValidate>
      {/* honeypot anti-spam */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

      {targetField &&
        (defaultTargetId ? (
          <input type="hidden" name={targetField} value={defaultTargetId} />
        ) : (
          <Field label={formType === 'event' ? 'Pilih agenda' : 'Pilih program'} name={targetField} errors={errors} required className="sm:col-span-2">
            <select id={targetField} name={targetField} required className={input} defaultValue="">
              <option value="" disabled>
                — pilih —
              </option>
              {options.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </Field>
        ))}

      <Field label="Nama lengkap" name="name" errors={errors} required>
        <input id="name" name="name" required autoComplete="name" className={input} />
      </Field>
      <Field label="No. WhatsApp" name="phone" errors={errors} required>
        <input id="phone" name="phone" type="tel" inputMode="tel" required placeholder="08xxxxxxxxxx" autoComplete="tel" className={input} />
      </Field>
      <Field label="Email" name="email" errors={errors} required>
        <input id="email" name="email" type="email" required autoComplete="email" className={input} />
      </Field>
      <Field label="Nama usaha" name="company_name" errors={errors} required={isMembership}>
        <input id="company_name" name="company_name" autoComplete="organization" className={input} />
      </Field>

      {isMembership && (
        <>
          <Field label="Bidang usaha" name="business_field" errors={errors} required>
            <select id="business_field" name="business_field" required className={input} defaultValue="">
              <option value="" disabled>
                — pilih —
              </option>
              {businessFields.map((f) => (
                <option key={f}>{f}</option>
              ))}
            </select>
          </Field>
          <Field label="Jabatan di usaha" name="position" errors={errors}>
            <input id="position" name="position" placeholder="Owner / Direktur" className={input} />
          </Field>
          <Field label="Usia" name="age" errors={errors}>
            <input id="age" name="age" type="number" min={17} max={80} className={input} />
          </Field>
          <Field label="Domisili / alamat usaha" name="address" errors={errors}>
            <input id="address" name="address" placeholder="Kapanewon, Bantul" className={input} />
          </Field>
        </>
      )}

      <Field label={isMembership ? 'Apa yang ingin kamu dapat dari HIPMI?' : 'Catatan (opsional)'} name="message" errors={errors} className="sm:col-span-2">
        <textarea id="message" name="message" rows={4} className={input} />
      </Field>

      {message && <p className="text-sm text-red-600 sm:col-span-2">{message}</p>}

      <div className="sm:col-span-2">
        <button type="submit" disabled={status === 'loading'} className={buttonClass('default', 'w-full bg-navy-900 py-3 text-base text-white hover:bg-navy-800 disabled:opacity-60 sm:w-auto sm:px-10')}>
          {status === 'loading' && <Loader2 className="size-4 animate-spin" />}
          Kirim pendaftaran
        </button>
      </div>
    </form>
  )
}
