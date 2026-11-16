import parisyApp1 from './assets/parisy-app-1.png';
import parisyApp2 from './assets/parisy-app-2.png';
import siprak from './assets/siprak.png';
import newsphere from './assets/newsphere.png';
import presma from './assets/presma.png';
import careReport from './assets/care-report.png';

type ProjectImage = {
  src: string;
  width: number;
  height: number;
};

export const projectMedia: Record<string, ProjectImage[]> = {
  'Care Report': [careReport],
  'PRESMA': [presma],
  'Newsphere': [newsphere],
  'SIPRAK': [siprak],
  'ParisyApp': [parisyApp1, parisyApp2],
};
