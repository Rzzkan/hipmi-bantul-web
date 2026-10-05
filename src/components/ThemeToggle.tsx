'use client'

import { Moon, Sun } from 'lucide-react'

import { cn } from '@/lib/utils'

function apply(theme: 'light' | 'dark') {
  document.documentElement.classList.toggle('dark', theme === 'dark')
  try {
    localStorage.setItem('theme', theme)
  } catch {}
}

/** Toggles light/dark; the current state lives on <html class="dark">, so no React state is needed. */
export function ThemeToggle({ className }: { className?: string }) {
  return (
    <button
      type="button"
      onClick={() => apply(document.documentElement.classList.contains('dark') ? 'light' : 'dark')}
      className={cn(
        'relative grid size-10 cursor-pointer place-items-center rounded-xl text-gray-500 transition hover:bg-primary/10 hover:text-primary-ink dark:text-gray-400 dark:hover:text-primary',
        className,
      )}
      aria-label="Ubah tema terang/gelap"
    >
      <Sun className="size-5 scale-100 rotate-0 transition-all duration-500 dark:scale-0 dark:rotate-90" />
      <Moon className="absolute size-5 scale-0 -rotate-90 transition-all duration-500 dark:scale-100 dark:rotate-0" />
    </button>
  )
}
