/**
 * Runs before paint to avoid a flash of the wrong theme.
 * Same contract as katalog.hipmibantul.com: localStorage `theme` = light | dark | auto (default).
 */
const script = `(function(){try{var t=localStorage.getItem('theme')||'auto';var d=t==='dark'||(t==='auto'&&matchMedia('(prefers-color-scheme: dark)').matches);document.documentElement.classList.toggle('dark',d)}catch(e){}})()`

export function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: script }} />
}
