# Engineering Evidence Lab

An evidence-first portfolio homepage for software engineering, applied AI, and cybersecurity. Built with React, Vite, Three.js, and plain CSS; there is no backend.

## Run locally

Requires Node.js and npm.

```sh
npm install
npm run dev
```

Open the local URL printed by Vite (normally `http://localhost:5173`). Run the lightweight data checks with `npm test`. Build the production site with `npm run build`, or inspect that build with `npm run preview`.

## Design and interaction

The hero contains a lightweight Three.js particle network with a translucent wireframe core. On fine-pointer devices, the scene eases toward cursor position and gently rotates. Touch devices render a reduced static field, reduced-motion settings render a static frame, and the CSS composition remains as a fallback if WebGL initialization fails. The canvas is decorative, hidden from assistive technology, and does not intercept clicks. The scene code is split from the initial app bundle and mounted shortly after first paint; an error boundary keeps the CSS fallback visible if the scene chunk fails to load.

## Known limitations

- Project 5 now has a local case-study route at `/projects/project-5`; its screenshots, test run output, and public source link remain unavailable unless explicitly marked otherwise on the page.
- Project statuses are provisional. Repository links, resume, email, and LinkedIn are omitted until verified.
- Google Fonts are an optional remote enhancement; system fallbacks are provided.
- `npm test` checks the central project and evidence data; it does not simulate WebGL or browser interactions.

