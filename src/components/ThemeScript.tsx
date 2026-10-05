/**
 * Runs before paint (no flash of the wrong theme) and keeps following the device.
 *
 * Mode is stored in localStorage `theme-mode`: system (default) | light | dark.
 * - system → follows the phone/computer setting and switches live when it changes
 *   (e.g. automatic dark mode at sunset).
 * - light / dark → only when the visitor picks it via the toggle.
 * The old `theme` key from earlier versions is ignored, so everyone starts on "system".
 */
const script = `(function(){
var d=document.documentElement,mq=matchMedia('(prefers-color-scheme: dark)');
function mode(){try{var m=localStorage.getItem('theme-mode');return m==='light'||m==='dark'?m:'system'}catch(e){return 'system'}}
function apply(){var m=mode();d.dataset.themeMode=m;d.classList.toggle('dark',m==='dark'||(m==='system'&&mq.matches))}
apply();
mq.addEventListener('change',apply);
window.addEventListener('storage',function(e){if(e.key==='theme-mode')apply()});
window.__applyTheme=apply;
})()`

export function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: script }} />
}
