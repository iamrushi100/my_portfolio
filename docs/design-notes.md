# Milestone 1 design notes

## Direction

The homepage uses a cinematic technical-lab composition with a near-black navy base, warm white type, muted teal highlights, and spacious full-width layouts. Large display typography and alternating project showcases create hierarchy without relying on a repeated card grid.

## Interactive field

A custom Three.js canvas renders a low-density particle network with a wireframe core. Fine-pointer input is normalized and eased into scene rotation in the render loop; no React state updates occur for pointer movement. The field is static on touch devices and when reduced motion is requested. ResizeObserver updates camera dimensions, and effect cleanup cancels animation, removes listeners, disconnects resize observation, and disposes GPU resources. The canvas is decorative and pointer-transparent. If WebGL setup fails, CSS orbital rings remain as a visual fallback.

## Responsive and accessible behavior

- Semantic landmarks, skip link, ordered section headings, keyboard-visible focus, and real anchor navigation.
- Project and evidence labels retain provisional/in-preparation wording; no unsupported metrics, claims, or repository links were added.
- Project diagrams are decorative inline SVGs with accessible content conveyed in adjacent text.
- The scene does not intercept clicks or receive keyboard focus.

## Deliberate deferrals

No case-study pages, backend, analytics, chatbot, CMS, or remote project media. Browser-based screenshot, console, and assistive-technology checks remain separate from the production build and must be verified in a browser-capable environment.
