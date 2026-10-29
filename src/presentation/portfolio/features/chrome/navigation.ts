import type Lenis from 'lenis';
import { $, $$ } from '../../shared/browser-dom';
import type { Swipe } from '../../shared/hero-projects-swipe';

const IDS = ['home', 'work', 'info', 'experience', 'taste', 'contact'];
const DARK = new Set(['home', 'taste']); // workspaces with a dark background

/** Side index: active section, light/dark tone, and anchor scrolling. */
export function initSectionNavigation(swipe: Swipe, lenis: Lenis | null): void {
  const nav = $('.side-index');
  const links = $$<HTMLAnchorElement>('[data-section-link]');
  const pageY = (id: string) => {
    const el = document.getElementById(id);
    return el ? el.getBoundingClientRect().top + window.scrollY : Infinity;
  };

  function current(): string {
    const y = window.scrollY;
    const h = window.innerHeight;
    const line = y + h * 0.5;
    if (y + h >= document.documentElement.scrollHeight - 2) return 'contact';

    let id = 'home';
    if (swipe.pinned ? y >= h * 0.5 : line >= pageY('work')) id = 'work';
    for (const key of ['info', 'experience', 'taste', 'contact']) if (line >= pageY(key)) id = key;
    return id;
  }

  let last = '';
  function update(): void {
    const id = current();
    if (id !== last) {
      last = id;
      links.forEach((link) => {
        if (link.dataset.sectionLink === id) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
      nav?.setAttribute('data-tone', DARK.has(id) ? 'dark' : 'light');
    }
  }

  // Internal links go through swipe.targetY, because #work lives inside the pinned stage.
  $$<HTMLAnchorElement>('a[href^="#"]').forEach((anchor) => {
    const id = anchor.getAttribute('href')!.slice(1);
    if (!IDS.includes(id)) return;
    anchor.addEventListener('click', (event) => {
      event.preventDefault();
      const y = swipe.targetY(id);
      if (lenis) lenis.scrollTo(y, { duration: 1.4 });
      else window.scrollTo({ top: y, behavior: 'smooth' });
    });
  });

  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);
  update();
}
