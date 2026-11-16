import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://prayogo.is-a.dev',
  output: 'static',
  trailingSlash: 'always',
  outDir: './docs',
  integrations: [sitemap({ filter: (page) => !page.endsWith('/404/') })],
});
