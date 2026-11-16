# Rio Tri Prayogo

Portfolio for selected web, mobile, and machine-learning work by Rio Tri Prayogo.

**Live site:** [prayogo.is-a.dev](https://prayogo.is-a.dev) · [GitHub](https://github.com/riotrip)

## Pages

- `/` — Home
- `/about/` — Biography, skills, and education
- `/works/` — Selected projects
- `/experience/` — Professional and campus experience
- `/contact/` — Email and social links

## Run locally

Requires Node.js `>=22.23.4` and pnpm `12.15.0`.

```sh
pnpm install
pnpm dev
```

Astro prints the local development URL. To create and preview a production build:

```sh
pnpm build
pnpm preview
```

The static site is generated in `docs/`; the build also creates the sitemap.

## Updating content

- Project entries: `src/domain/projects/project-catalog.ts`
- Experience entries: `src/domain/experience/experience-catalog.ts`
- Site biography and skills: `src/domain/portfolio/site-profile.ts`
- Social preview image: `public/images/seo/og-image.jpg`

The routes and shared page layout are in `src/pages/` and `src/presentation/`. See [`documentation/architecture.md`](documentation/architecture.md) for the source layout and dependency rules.
