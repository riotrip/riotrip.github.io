import { runBoot } from './features/chrome/boot';
import { playHero, revealMasks, splitMasks } from './shared/heading-animations';
import { createLenis } from '../../infrastructure/scroll/smooth-scroll';
import { initSectionNavigation } from './features/chrome/navigation';
import { initExperienceDialog } from './features/experience/experience-dialog';
import { initSwipe } from './shared/hero-projects-swipe';
import { initOffDuty } from './features/off-duty/off-duty-chat';
import { initSectionScrollEffects } from './shared/section-scroll-effects';
import { prefersReducedMotion } from './shared/browser-dom';
import { createConversation } from '../../application/off-duty/conversation';
import { askAI } from '../../infrastructure/ai/openrouter-chat';
import { offDutyPersona } from '../../domain/portfolio/off-duty-persona';

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
    initOffDuty(createConversation(askAI, offDutyPersona));
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
