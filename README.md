# Yeshey Ngedup portfolio

Responsive Next.js portfolio for Yeshey Ngedup, a GCIT 2nd-year Cybersecurity student. Routes: Introduction (`/`), Projects, Skills, and Contact. The home route has a pinned 3D hero and built-in 2D fallback.

## Setup

Requires Node.js 20.9+ and npm. Install packages and start the local server:

```bash
npm install
npm run dev
```

Open `http://localhost:3000`. `npm run build` creates the static export in `out/`. Run tests with `npm test` and type-check with `npm run typecheck`.

## Replace placeholders

Edit `content/portfolio.ts` for the name, role, intro/bio, project groups and links, skills, contact info, and visible navigation labels. Replace every bracketed value and the `example.com` project URLs. Project artwork is a clearly marked CSS geometric placeholder in `components/ProjectSections.tsx`; replace it with project images there when available.

## GitHub Pages

`next.config.mjs` enables `output: 'export'` and `trailingSlash: true`. Repository Pages sites use `/<repository-name>/`; the base path applies to routes and static assets. The included `.github/workflows/deploy-pages.yml` exports the site with `NEXT_PUBLIC_BASE_PATH=/<repository-name>` and deploys `out/`. Set **Settings > Pages > Source** to **GitHub Actions**. For a user/organization root domain, use an empty base path. To export locally under a repo subpath, set `NEXT_PUBLIC_BASE_PATH=/your-repository-name` before `npm run build` (PowerShell: `$env:NEXT_PUBLIC_BASE_PATH='/your-repository-name'`).

## Vercel

Import the repository in Vercel, keep the default Next.js build command (`next build` / `npm run build`), and leave `NEXT_PUBLIC_BASE_PATH` unset for a root-domain deployment. Static export remains enabled, so Vercel serves the exported pages; no server-only Next.js features are used.

## Accessibility and performance

Text navigation, keyboard focus, a skip link, semantic headings, responsive layouts, and reduced-motion behavior are included. One lazy-loaded canvas is used on the home route only. Drei's `Stars` and `Sparkles` keep the particle effect small and avoid a custom shader or particle system; low pixel ratio and disabled antialiasing limit GPU work. WebGL detection, reduced-motion preference, and a React error boundary all lead to the built-in 2D hero when needed.
