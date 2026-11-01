import { runBoot } from './features/chrome/boot';
import { playHero, revealMasks, splitMasks } from './shared/heading-animations';
import { createLenis } from '../../infrastructure/scroll/smooth-scroll';
import { initSectionNavigation } from './features/chrome/navigation';
import { initExperienceDialog } from './features/experience/experience-dialog';
import { initSwipe } from './shared/hero-projects-swipe';
import { initSectionScrollEffects } from './shared/section-scroll-effects';
import { prefersReducedMotion } from './shared/browser-dom';

/** Mount browser interactions after Astro renders the static markup. */
export async function mountPortfolio(): Promise<void> {
  const html = document.documentElement;

  try {
    history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);
    html.classList.add('is-booting');
    const lenis = createLenis(prefersReducedMotion);
    lenis?.stop();

    splitMasks();
    if (!prefersReducedMotion) html.classList.add('motion-ready');

    const swipe = initSwipe();
    initSectionNavigation(swipe, lenis);
    initExperienceDialog();
    initSectionScrollEffects();
    await runBoot();
    html.classList.remove('is-booting');
    lenis?.start();
    playHero();
    revealMasks();
  } catch (error) {
    console.error(error);
    html.classList.remove('motion-ready', 'is-booting');
    document.getElementById('boot')?.remove();
  }
}
