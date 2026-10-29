import Lenis from 'lenis';

export function createLenis(reducedMotion: boolean): Lenis | null {
  if (reducedMotion) return null;
  const lenis = new Lenis({ lerp: 0.09 });
  const frame = (time: number) => {
    lenis.raf(time);
    requestAnimationFrame(frame);
  };
  requestAnimationFrame(frame);
  return lenis;
}
