/** Latar hero khas katalog: gradasi cream (terang) / hitam + grid & glow emas (gelap). */
export function HeroBackground() {
  return (
    <>
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-cream-light via-white to-cream dark:from-ink-950 dark:via-ink-850 dark:to-[#161922]" />
      <div className="pointer-events-none absolute inset-0 -z-10 brand-grid-glow-light dark:hidden" aria-hidden />
      <div className="pointer-events-none absolute inset-0 -z-10 hidden brand-grid-glow dark:block" aria-hidden />
    </>
  )
}
