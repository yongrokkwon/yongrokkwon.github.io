# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Communication Guidelines

**IMPORTANT: Always respond in Korean (한글) when working in this repository.** The repository owner is Korean and prefers all communication in Korean.

## Project Overview

This is a personal portfolio website built with Gatsby v4, featuring a full-page scrolling experience powered by `@fullpage/react-fullpage`. The site showcases work experience, featured projects, and other projects, and is deployed to GitHub Pages.

The site is a Korean-language portfolio for an Android Software Engineer (권용록 / Yongrok Kwon).

## Development Commands

```bash
# Install dependencies (uses yarn)
yarn

# Start development server (runs on http://localhost:8000)
npm start
# or
npm run develop

# Build for production
npm run build

# Preview production build locally
npm run serve

# Clean Gatsby cache and public directory (useful for fixing build issues)
npm run clean

# Format code with Prettier
npm run format

# Deploy to GitHub Pages (builds and pushes to gh-pages branch)
npm run deploy
```

## Architecture

### Gatsby Configuration

- **gatsby-config.js**: Site metadata, plugin configuration, and Google Analytics (GA4) setup
- **gatsby-node.js**: Dynamic page generation for blog posts and tags, webpack alias configuration
- **gatsby-browser.js**: Browser APIs (currently minimal)
- **gatsby-ssr.js**: Server-side rendering APIs

### Webpack Aliases

The following path aliases are configured in `gatsby-node.js`:

- `@components` → `src/components`
- `@config` → `src/config`
- `@fonts` → `src/fonts`
- `@hooks` → `src/hooks`
- `@images` → `src/images`
- `@pages` → `src/pages`
- `@styles` → `src/styles`
- `@utils` → `src/utils`

### Site Structure

The main page (`src/pages/index.js`) uses a full-page scrolling layout with these sections in order:

1. Hero (landing section)
2. About
3. Jobs (work experience)
4. Featured (featured projects)
5. Projects (other notable projects)
6. Contact

Each section corresponds to a component in `src/components/sections/`.

### Full-Page Scrolling

The site uses `@fullpage/react-fullpage` library wrapped in a custom `FullPageWrapper` component (`src/components/FullPageWrapper.js`):

- SSR-compatible: Dynamically imports fullpage.js only on the client
- Responsive: Disables full-page scrolling below 768px width
- Navigation anchors: Uses `fp-*` anchor IDs defined in `src/pages/index.js`
- Fixed elements: Navigation header and side elements remain fixed during scrolling

### Content Management

Content is stored in markdown files in the `content/` directory:

- `content/featured/`: Featured project folders with `index.md` and images
- `content/jobs/`: Work experience markdown files
- `content/projects/`: Individual markdown files for other projects
- `content/posts/`: Blog posts (if used)

Frontmatter format typically includes: `date`, `title`, `cover`, `github`, `external`, `tech`, `company`, `range`, etc.

### Styling

- **styled-components**: Primary styling solution
- **src/config.js**: Central configuration for colors, email, social media, navigation links, and ScrollReveal settings
- **src/styles/**: Global styles, theme, variables, mixins, fonts, transitions, and Prism syntax highlighting

Color scheme:

- Green: `#64ffda`
- Navy: `#0a192f`
- Dark Navy: `#020c1b`

### Animation

- **ScrollReveal**: Used for scroll animations (configuration in `src/config.js` and `src/utils/sr.js`)
- **anime.js**: Animation library (webpack configured to null-load during SSR in `gatsby-node.js`)

### GraphQL Data Fetching

Components query markdown content using Gatsby's GraphQL layer. Featured projects, jobs, and other projects are queried from their respective content directories.

## Important Notes

### SSR Compatibility

Several libraries are client-side only and must be handled carefully:

- `scrollreveal`
- `animejs`
- `miniraf`
- `@fullpage/react-fullpage`

These are null-loaded during HTML build in `gatsby-node.js` to prevent SSR errors.

### Git Hooks

Husky is configured with pre-commit hooks:

- **lint-staged**: Runs Prettier and ESLint on staged files before commit

### Deployment

- Deploys to GitHub Pages (`gh-pages` branch)
- Run `npm run deploy` to build and deploy
- Site URL: https://yongrokkwon.github.io

### Google Analytics

Uses GA4 (Google Analytics 4) with tracking ID configured in `gatsby-config.js`:

- Tracking ID: `G-QQR2RJ43R3`
- Anonymize IP enabled
- Respects DNT (Do Not Track)

## Troubleshooting

If you encounter build issues:

1. Run `npm run clean` to clear Gatsby cache
2. Delete `node_modules` and reinstall: `rm -rf node_modules && yarn`
3. Check that SSR-incompatible libraries are properly configured in `gatsby-node.js`
