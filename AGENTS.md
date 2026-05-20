# AI Agent Guide for this Repository

## What this repository is

This is a static website project built with plain HTML, CSS, and vanilla JavaScript. There is no Node.js package manifest, no build pipeline, and no test configuration in the workspace.

## Key entry points

- `index.html` — main landing page
- `styles.css` — global stylesheet
- `hero-nav-example.html`, `hero-nav.css`, `hero-nav.js` — navigation demo example
- `work.js` — site JavaScript
- `corporate-services.html`, `experiences.html`, `specialized.html`, `therapy-services.html` — secondary site content pages
- `TRACKER/index.html` — separate tracker/demo page using CDN assets

## Workflow guidance for AI agents

- Treat this as a static website project. Do not introduce build tools, package managers, or JavaScript frameworks unless the user explicitly asks.
- Use browser-safe HTML/CSS/JS solutions that work without bundlers.
- Preserve existing file structure and page navigation.
- If styling or layout changes are requested, update the relevant CSS and HTML directly.
- For JavaScript behavior, keep code simple and avoid framework-specific patterns.

## Editor / runtime note

- VS Code Live Server is configured to use port `5501` via `.vscode/settings.json`.

## Files to avoid modifying unless requested

- `Eden Consultants Profile UTD 4-25.pdf`
- `Ningya Joseph profile.pdf`

## When asked to add docs or metadata

- Prefer a small `README.md` or `docs/` file if the user wants repository documentation.
- Do not invent additional configuration files unless required by the task.
