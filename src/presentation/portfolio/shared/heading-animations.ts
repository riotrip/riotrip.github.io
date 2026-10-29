import { animate, stagger } from 'animejs';
import { $$, prefersReducedMotion } from './browser-dom';

/** Wrap each <br>-separated line of [data-mask] headings so it can slide up from behind a mask. */
export function splitMasks(): void {
  $$('[data-mask]').forEach((el) => {
    const lines = el.innerHTML.split(/<br\s*\/?>/i);
    el.innerHTML = lines.map((line) => `<span class="mask"><span class="mask__in">${line}</span></span>`).join('');
  });
}

function playMask(el: Element): ReturnType<typeof animate> {
  return animate($$('.mask__in', el), {
    translateY: ['112%', '0%'],
    skewY: [7, 0],
    duration: 1000,
    delay: stagger(110),
    ease: 'outExpo',
  });
}

/** Replay section headings whenever they leave and re-enter the viewport. */
export function revealMasks(): void {
  const targets = $$('[data-mask]:not([data-mask-manual])');
  if (prefersReducedMotion || !('IntersectionObserver' in window)) return;
  const active = new Map<Element, ReturnType<typeof animate>>();

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          active.get(entry.target)?.revert();
          active.delete(entry.target);
        } else if (entry.intersectionRatio >= 0.2 && !active.has(entry.target)) {
          active.set(entry.target, playMask(entry.target));
        }
      });
    },
    { threshold: [0, 0.2], rootMargin: '0px 0px -6% 0px' },
  );
  targets.forEach((el) => observer.observe(el));
}

/** Hero entrance, played once the boot panel starts leaving. */
export function playHero(): void {
  animate($$('[data-hero]'), {
    opacity: [0, 1],
    translateY: [14, 0],
    duration: 900,
    delay: stagger(90, { start: 380 }),
    ease: 'outCubic',
  });
}

