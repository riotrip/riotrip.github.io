class PartialsLoader {
  constructor() {
    this.loadedPartials = new Map();
  }

  async loadPartial(path) {
    if (this.loadedPartials.has(path)) {
      return this.loadedPartials.get(path);
    }

    try {
      const response = await fetch(path);
      if (!response.ok) {
        throw new Error(`Failed to load partial: ${path}`);
      }
      const html = await response.text();
      this.loadedPartials.set(path, html);
      return html;
    } catch (error) {
      console.error(`Error loading partial ${path}:`, error);
      return '';
    }
  }

  async loadAllPartials() {
    const partialElements = document.querySelectorAll('[data-partial]');
    
    const loadPromises = Array.from(partialElements).map(async (element) => {
      const partialPath = element.dataset.partial;
      const html = await this.loadPartial(partialPath);
      element.innerHTML = html;
      element.removeAttribute('data-partial');
    });

    await Promise.all(loadPromises);
    document.dispatchEvent(new CustomEvent('partialsLoaded'));
  }

  async injectPartial(selector, path) {
    const element = document.querySelector(selector);
    if (!element) {
      console.error(`Element not found: ${selector}`);
      return;
    }

    const html = await this.loadPartial(path);
    element.innerHTML = html;
  }
}

const partialsLoader = new PartialsLoader();

document.addEventListener('DOMContentLoaded', () => {
  partialsLoader.loadAllPartials();
});

export { partialsLoader, PartialsLoader };
