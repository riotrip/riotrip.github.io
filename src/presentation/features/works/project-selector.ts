const list = document.querySelector<HTMLElement>('.projects-index');

if (list) {
  const buttons = [...list.querySelectorAll<HTMLButtonElement>('[data-project-choice]')];
  const detail = {
    visual: list.querySelector<HTMLElement>('[data-project-visual]')!,
    placeholder: list.querySelector<SVGElement>('[data-project-placeholder]')!,
    description: list.querySelector<HTMLElement>('[data-detail-description]')!,
    stack: list.querySelector<HTMLElement>('[data-detail-stack]')!,
    link: list.querySelector<HTMLAnchorElement>('[data-detail-link]')!,
  };

  const selectProject = (button: HTMLButtonElement) => {
    for (const choice of buttons) {
      const selected = choice === button;
      choice.setAttribute('aria-pressed', String(selected));
      choice.closest('.projects-index__item')?.classList.toggle('is-active', selected);
    }

    const variant = button.dataset.type?.toLowerCase().includes('mobile') ? 'mobile' : 'web';
    detail.visual.dataset.placeholderVariant = variant;
    detail.placeholder.dataset.variant = variant;
    detail.description.textContent = button.dataset.description ?? '';
    detail.stack.textContent = button.dataset.stack ?? '';
    detail.link.hidden = !button.dataset.link;

    if (button.dataset.link) {
      detail.link.href = button.dataset.link;
      detail.link.textContent = button.dataset.linkLabel ?? 'Visit project';
    }

    const images = JSON.parse(button.dataset.images ?? '[]') as Array<{ src: string; width: number; height: number }>;
    for (const phone of detail.visual.querySelectorAll('.project-detail__phone')) phone.remove();
    for (const image of detail.visual.querySelectorAll('img')) image.remove();

    if (images.length) {
      detail.visual.dataset.hasImages = 'true';
      detail.visual.dataset.imageCount = String(images.length);
      detail.placeholder.setAttribute('hidden', '');
      images.forEach((image, index) => {
        const element = document.createElement('img');
        element.src = image.src;
        element.width = image.width;
        element.height = image.height;
        element.alt = '';
        element.loading = 'lazy';
        if (images.length === 2) {
          const phone = document.createElement('div');
          phone.className = `project-detail__phone project-detail__phone--${index === 0 ? 'left' : 'right'}`;
          phone.append(element);
          detail.visual.append(phone);
        } else {
          detail.visual.append(element);
        }
      });
    } else {
      delete detail.visual.dataset.hasImages;
      delete detail.visual.dataset.imageCount;
      detail.placeholder.removeAttribute('hidden');
    }
  };

  for (const button of buttons) {
    button.addEventListener('focus', () => selectProject(button));
    button.addEventListener('pointerenter', () => selectProject(button));
  }
}
