type ProjectLink = {
  href: string;
  label: string;
};

type Project = {
  name: string;
  year: string;
  type: string;
  stack: string;
  description: string;
  link?: ProjectLink;
};

export const featuredProjects: readonly Project[] = [
  {
    name: 'Care Report',
    year: '2022',
    type: 'Web application',
    stack: 'PHP · Laravel 8 · MySQL',
    description: 'Sistem Pelaporan Aduan Masyarakat. Residents file complaints; staff manage and follow up on reports.',
    link: {
      href: 'https://github.com/riotrip/aduan-masyarakat-beta',
      label: 'View source',
    },
  },
  {
    name: 'PRESMA',
    year: '2024',
    type: 'Web application',
    stack: 'PHP · HTML · CSS',
    link: {
      href: 'https://github.com/Kiaakk/PBL-PRESMA',
      label: 'View source',
    },
    description: 'Pencatatan Prestasi Mahasiswa (SIPRESMA). A central record of student achievements.',
  },
  {
    name: 'Newsphere',
    year: '2024',
    type: 'Web application',
    stack: 'PHP · MongoDB · HTML/CSS · Bootstrap',
    link: {
      href: 'https://github.com/clockingoffbye/news-website',
      label: 'View source',
    },
    description: 'A categorized news portal with article pages and an admin panel.',
  },
  {
    name: 'SIPRAK',
    year: '2025',
    type: 'Web application',
    stack: 'PHP 8.1 · Laravel 10 · Relational database',
    link: {
      href: 'https://github.com/naufal11705/PBL-SARPRAS',
      label: 'View source',
    },
    description: 'Sistem Manajemen Pelaporan dan Perbaikan Fasilitas Kampus. Report facility damage, assign technicians, and track repairs.',
  },
  {
    name: 'ParisyApp',
    year: '2025',
    type: 'Mobile and machine-learning app',
    stack: 'Flutter/Dart · Flask/Python · Hugging Face · REST API',
    description: 'Shop agricultural products with image-based product recognition.',
    link: {
      href: 'https://www.linkedin.com/posts/rio-tri-prayogo_projectbasedlearning-machinelearning-computervision-activity-7412804238990540800-V-7h',
      label: 'See the project',
    },
  },
  {
    name: 'MSJ Rekrutmen',
    year: '2026',
    type: 'Web application',
    stack: 'PHP 8.2 · Laravel 12 · Blade',
    link: {
      href: 'https://spunindo.com/',
      label: 'Visit site',
    },
    description: 'Manage vacancies, applications, candidates, and selection stages.',
  },
  {
    name: 'Meda Landing',
    year: '2026',
    type: 'Landing page',
    stack: 'Next.js 14 · React 18 · Tailwind CSS',
    description: 'An overview of Meda services, products, articles, and contact details.',
    link: {
      href: 'https://meda.technology/',
      label: 'Visit site',
    },
  },
];
