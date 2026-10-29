import { $, prefersReducedMotion } from './browser-dom';
import { clamp } from '../../../shared/math';

const ease = (p: number) => 1 - Math.pow(1 - p, 3);

/**
 * About opens like a framed contact sheet. Experience reveals its title,
 * categories, and archive rows in sequence; contact fades upward.
 */
export function initSectionScrollEffects(): void {
  if (prefersReducedMotion) return;
  const work = $('#work');
  const targets = ['info', 'experience', 'taste', 'contact'].map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
  let queued = false;

  function update(): void {
    queued = false;
    const vh = window.innerHeight;

    if (work) {
      const p = document.documentElement.classList.contains('is-swipe')
        ? clamp(window.scrollY / vh, 0, 1)
        : clamp((vh - work.getBoundingClientRect().top) / (vh * 0.9), 0, 1);
      work.style.setProperty('--work-progress', String(ease(p)));
    }

    for (const el of targets) {
      const p = clamp((vh - el.getBoundingClientRect().top) / (vh * 0.85), 0, 1);
      const e = ease(p);
      if (el.id === 'info') el.style.setProperty('--info-progress', String(p));
      if (el.id === 'experience') {
        el.style.setProperty('--experience-progress', String(e));
        const title = el.querySelector<HTMLElement>('.experience__head h2');
        if (title) title.style.setProperty('--entry-progress', String(ease(clamp((p - 0.03) / 0.38, 0, 1))));
        el.querySelectorAll<HTMLElement>('.experience-picker__group h3').forEach((heading, index) => {
          heading.style.setProperty('--entry-progress', String(ease(clamp((p - (0.18 + index * 0.25)) / 0.28, 0, 1))));
        });
        const rows = el.querySelectorAll<HTMLElement>('.experience-pick');
        rows.forEach((row, index) => {
          const start = 0.27 + (index / Math.max(rows.length - 1, 1)) * 0.32;
          row.style.setProperty('--entry-progress', String(ease(clamp((p - start) / 0.3, 0, 1))));
        });
      }
      if (el.id === 'contact') {
        el.style.setProperty('--contact-detail', String(ease(clamp((p - 0.45) / 0.45, 0, 1))));
        el.style.transform = p >= 1 ? '' : `translate3d(0, ${(1 - e) * 42}px, 0)`;
        el.style.opacity = p >= 1 ? '' : String(e);
        el.style.borderRadius = '';
      } else if (p >= 1) {
        el.style.transform = '';
        el.style.borderRadius = '';
      } else if (el.id === 'experience') {
        el.style.transform = '';
        el.style.borderRadius = '';
      } else {
        if (el.id !== 'info') {
          el.style.transform = `scale(${0.9 + 0.1 * e})`;
          el.style.borderRadius = `${(1 - e) * 40}px ${(1 - e) * 40}px 0 0`;
        } else {
          el.style.transform = '';
          el.style.borderRadius = '';
        }
      }
      if (el.id === 'taste') {
        el.style.setProperty('--taste-progress', String(e));
      }
    }
  }

  const queue = () => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(update);
  };
  window.addEventListener('scroll', queue, { passive: true });
  window.addEventListener('resize', queue);
  update();
}
