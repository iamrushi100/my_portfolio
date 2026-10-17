# Rushikesh Wani — AI Engineer & Cybersecurity

An evidence-first portfolio for AI/GenAI engineering, retrieval evaluation, software development, and demonstrated cybersecurity work. Built with React, Vite, Three.js, and CSS; there is no backend.

## Run locally

Requires Node.js and npm.

```sh
npm install
npm run dev
```

Open the local URL printed by Vite (normally `http://localhost:5173`). Run the lightweight data checks with `npm test`. Build the production site with `npm run build`, or inspect that build with `npm run preview`.

## Design and interaction

The hero contains a lightweight Three.js particle network with a translucent wireframe core. On fine-pointer devices, the scene eases toward cursor position and gently rotates. Touch devices render a reduced static field, reduced-motion settings render a static frame, and the CSS composition remains as a fallback if WebGL initialization fails. The canvas is decorative, hidden from assistive technology, and does not intercept clicks. The scene code is split from the initial app bundle and mounted shortly after first paint; an error boundary keeps the CSS fallback visible if the scene chunk fails to load.

## Repository

- Source repository: https://github.com/iamrushi100/my_portfolio
- Portfolio owner: Rushikesh Wani
- The three project repositories are separate from this website; portfolio edits do not imply changes or publication in those projects.

## Known limitations

- The Project 1, Project 3, and Project 5 case studies link to their verified public project repositories. Those repositories are separate from this portfolio website; the links do not imply that local portfolio edits or newer project work have been published there.
- Raw test output and project screenshots are not captured unless a case study explicitly says otherwise. Test counts shown as documented prior runs are historical evidence, not current test runs.
- Resume, email, and LinkedIn are not yet enabled: the repository does not currently contain the resume PDF, and the exact email and LinkedIn URLs must be confirmed before publishing contact links.
- Google Fonts are an optional remote enhancement; system fallbacks are provided.
- `npm test` checks the central project and evidence data; it does not simulate WebGL or browser interactions.

