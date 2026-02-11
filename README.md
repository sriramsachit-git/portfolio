# 3D Portfolio Website

A modern, immersive 3D portfolio built with React, TypeScript, Vite, Three.js (React Three Fiber), and GSAP.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Build

```bash
npm run build
npm run preview   # preview production build
```

## Deploy (Vercel)

1. Push the repo to GitHub.
2. In [Vercel](https://vercel.com), import the project and deploy (Vite is auto-detected).
3. Optional: add env vars in Project Settings (e.g. `VITE_GA_TRACKING_ID`, EmailJS keys for the contact form).

## Content

- **Site config**: `src/data/config.ts` (name, title, email, social links, nav).
- **Projects**: `src/data/projects.ts` (add thumbnails under `public/images/projects/` or use URLs).
- **Skills / experience / education**: `src/data/skills.ts`.
- **Resume**: place `resume.pdf` in `public/` and it will be served at `/resume.pdf`.

## Stack

- React 18, TypeScript, Vite
- Three.js, React Three Fiber, Drei
- GSAP, Lenis (smooth scroll)
- SCSS modules, design tokens in `src/styles/`
