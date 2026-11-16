# Architecture

This is a static Astro portfolio. Keep the dependency direction inward: routes and presentation may consume domain data; domain modules do not import Astro, browser APIs, or presentation code.

## Source layout

```text
src/
├── pages/                         Astro routes and page composition
├── domain/
│   ├── portfolio/                 Site identity and biography
│   ├── projects/                  Project catalog
│   └── experience/                Experience catalog
└── presentation/
    ├── components/                Shared page chrome and primitives
    ├── features/
    │   └── works/                 Projects UI, interaction, and bundled media
    ├── layouts/                   Shared document and metadata shell
    └── styles/                    Global site styles and design tokens

public/images/
├── branding/                      Logo and favicon with stable public URLs
├── profile/                       About portrait
└── seo/                            Open Graph image
```

## Dependency rules

- `src/pages` owns Astro URL entry points and composes domain data with presentation.
- `src/domain` stays framework-independent and contains data and domain rules only.
- `src/presentation/components` is for UI shared across features; feature-only UI and browser behavior belong under that feature.
- `src/presentation/features/works` owns project selection behavior, its placeholder, media mapping, and bundled project screenshots.
- `src/presentation/layouts` owns document metadata and the shared page shell.
- `public/images` is for files addressed by stable URL paths, including CSS masks, social metadata, and standalone profile/brand images. Feature assets imported from source stay beside the feature so Astro can bundle and fingerprint them.
- Do not add empty application or infrastructure layers. Add them only when a real use case or external adapter needs an owner.
