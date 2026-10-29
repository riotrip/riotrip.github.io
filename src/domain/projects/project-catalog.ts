export const featuredProjects = [
  {
    name: 'ParisyApp',
    tag: 'a vegetable classifier',
    stack: 'Flask · Flutter · Machine Learning',
    meta: 'Nov–Dec 2025 / Back-End Developer',
    description: 'A Flutter app and Flask API classify 11 vegetable types in four categories. The team used a 137-image dataset and chose a KNN model after comparing several approaches.',
    link: {
      href: 'https://www.linkedin.com/posts/rio-tri-prayogo_projectbasedlearning-machinelearning-computervision-activity-7412804238990540800-V-7h',
      label: 'See the project',
    },
  },
  {
    name: 'WARAS',
    tag: 'a health PWA',
    stack: 'Next.js · Go · Capacitor',
    meta: 'Health PWA / Next.js + Go',
    description: 'WARAS has an installable Next.js PWA, Capacitor builds for Android and iOS, and a Go API.',
  },
  {
    name: 'Meda Tech',
    tag: 'a company site',
    stack: 'Next.js · React · Tailwind CSS',
    meta: 'Company landing page / Next.js',
    description: 'The site explains Meda Technology’s services, shows selected work, publishes articles, and lets visitors get in touch.',
    link: {
      href: 'https://meda.technology/',
      label: 'Visit the site',
    },
  },
  {
    name: 'MSJ Recruitment',
    tag: 'a hiring platform',
    stack: 'Laravel · Blade · MySQL',
    meta: 'Recruitment platform / Laravel',
    description: 'Candidates can view vacancies, apply, and track their applications. Staff can review applicants and send invitations.',
  },
] as const;
