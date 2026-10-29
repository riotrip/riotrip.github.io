import { $, prefersReducedMotion } from './browser-dom';
import { clamp } from '../../../shared/math';

export type Swipe = {
  /** True while the hero → projects swipe is active (desktop, motion allowed). */
  readonly pinned: boolean;
  /** Scroll position that brings a workspace fully into view. */
  targetY(id: string): number;
};

/**
 * Hero (01) and projects (02) share one pinned viewport. Scrolling the first
 * viewport-height slides projects in from the right and pushes the hero left.
 * Elsewhere (small or short screens, reduced motion) they just stack.
 */
export function initSwipe(): Swipe {
  const hero = $('#home');
  const work = $('#work');
  const query = window.matchMedia('(min-width: 900px) and (min-height: 760px)');
  let pinned = false;

  const ease = (p: number) => (p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2);
  const pageY = (el: Element) => el.getBoundingClientRect().top + window.scrollY;

  function render(): void {
    if (!pinned || !hero || !work) return;
    const progress = clamp(window.scrollY / window.innerHeight, 0, 1);
    const eased = ease(progress);

    work.style.transform = `translate3d(${(1 - eased) * 100}%, 0, 0)`;
    hero.style.transform = `translate3d(${-eased * 100}%, 0, 0)`;

    // Keep whatever is off-screen out of the tab order.
    work.inert = progress < 0.5;
    hero.inert = progress > 0.95;
  }

  function apply(): void {
    pinned = query.matches && !prefersReducedMotion;
    document.documentElement.classList.toggle('is-swipe', pinned);
    if (!pinned && hero && work) {
      work.style.transform = '';
      hero.style.transform = '';
      work.inert = false;
      hero.inert = false;
    }
    render();
  }

  query.addEventListener('change', apply);
  window.addEventListener('scroll', render, { passive: true });
  window.addEventListener('resize', render);
  apply();

  return {
    get pinned() { return pinned; },
    targetY(id) {
      if (id === 'home') return 0;
      if (id === 'work' && pinned) return window.innerHeight;
      const el = document.getElementById(id);
      return el ? Math.round(pageY(el)) : 0;
    },
  };
}
