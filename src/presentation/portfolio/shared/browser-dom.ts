export const $ = <T extends Element = HTMLElement>(selector: string, context: ParentNode = document): T | null => context.querySelector<T>(selector);
export const $$ = <T extends Element = HTMLElement>(selector: string, context: ParentNode = document): T[] => Array.from(context.querySelectorAll<T>(selector));
export const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
