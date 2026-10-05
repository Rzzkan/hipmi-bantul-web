'use client'

import { Monitor, Moon, Sun } from 'lucide-react'
import { useSyncExternalStore } from 'react'

import { cn } from '@/lib/utils'

type Mode = 'system' | 'light' | 'dark'

const order: Mode[] = ['system', 'light', 'dark']
const labels: Record<Mode, string> = {
  system: 'Tema: ikuti perangkat',
  light: 'Tema: terang',
  dark: 'Tema: gelap',
}

declare global {
  interface Window {
    __applyTheme?: () => void
  }
}

// The current mode lives on <html data-theme-mode> (set by ThemeScript) — read it as an external store.
function subscribe(callback: () => void) {
  const observer = new MutationObserver(callback)
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme-mode'] })
  return () => observer.disconnect()
}
const getMode = () => (document.documentElement.dataset.themeMode as Mode) || 'system'

function setMode(mode: Mode) {
  try {
    if (mode === 'system') localStorage.removeItem('theme-mode')
    else localStorage.setItem('theme-mode', mode)
  } catch {}
  window.__applyTheme?.()
}

/** Cycles: ikuti perangkat → terang → gelap. Default is "ikuti perangkat". */
export function ThemeToggle({ className }: { className?: string }) {
  const mode = useSyncExternalStore(subscribe, getMode, () => 'system' as Mode)
  const next = order[(order.indexOf(mode) + 1) % order.length]
  const Icon = mode === 'light' ? Sun : mode === 'dark' ? Moon : Monitor

  return (
    <button
      type="button"
      onClick={() => setMode(next)}
      className={cn(
        'grid size-10 cursor-pointer place-items-center rounded-xl text-gray-500 transition hover:bg-primary/10 hover:text-primary-ink dark:text-gray-400 dark:hover:text-primary',
        className,
      )}
      aria-label={`${labels[mode]}. Klik untuk: ${labels[next].replace('Tema: ', '')}`}
      title={labels[mode]}
    >
      <Icon className="size-5" />
    </button>
  )
}
