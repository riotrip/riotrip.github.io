import { $$ } from '../../shared/browser-dom';

export function initExperienceDialog(): void {
  const picks = $$<HTMLButtonElement>('[data-experience-pick]');
  const modal = document.querySelector<HTMLDialogElement>('#experience-modal');
  picks.forEach((button) => {
    button.addEventListener('click', () => {
      const panel = document.getElementById(button.dataset.experiencePick!);
      if (!panel || !modal) return;
      document.querySelectorAll<HTMLElement>('.experience-detail__panel').forEach((item) => { item.hidden = item !== panel; });
      picks.forEach((item) => item.setAttribute('aria-expanded', String(item === button)));
      panel.classList.remove('is-entering');
      if (!modal.open) modal.showModal();
      requestAnimationFrame(() => panel.classList.add('is-entering'));
    });
  });

  modal?.addEventListener('click', (event) => {
    if (event.target === modal) modal.close();
  });
  modal?.addEventListener('close', () => {
    picks.forEach((item) => item.setAttribute('aria-expanded', 'false'));
  });
}
