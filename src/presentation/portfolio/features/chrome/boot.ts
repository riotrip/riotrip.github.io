import { animate } from 'animejs';
import { $, prefersReducedMotion } from '../../shared/browser-dom';

/**
 * TTY boot, drawn on the hero's own background. When it finishes (or is
 * skipped with Enter / Esc / click) the terminal slowly fades into the hero.
 * Resolves during the fade so the hero can start entering underneath it.
 */
export async function runBoot(): Promise<void> {
  const overlay = $('#boot');
  if (!overlay) return;
  if (prefersReducedMotion) { overlay.remove(); return; }

  await new Promise<void>((resolve) => {
    let finished = false;
    let timer = 0;

    const finish = () => {
      if (finished) return;
      finished = true;
      window.clearTimeout(timer);
      window.removeEventListener('keydown', onKey);

      animate(overlay, { opacity: [1, 0], duration: 1600, ease: 'inOutSine', onComplete: () => overlay.remove() });
      window.setTimeout(resolve, 520);
    };

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' || event.key === 'Enter') finish();
    };

    $('#boot-skip')?.addEventListener('click', finish, { once: true });
    window.addEventListener('keydown', onKey);
    timer = window.setTimeout(finish, 2800);
  });
}
