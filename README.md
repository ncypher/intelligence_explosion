# Intelligence Explosion — The Discovery Tree

An interactive, source-linked atlas of AI-assisted science. Built for Tom Harwood.

## Run

No build or dependencies required. Serve `dist/` with any static server, for example `python -m http.server 8000 --directory dist`.

## Features

- SVG discovery tree with keyboard-operable leaves and zoom
- Search, five scientific field filters, and a 2020–2025 timeline with playback
- Reading view, five-stop guided tour, and random discovery
- 16 curated entries with primary sources, evidence status, AI contribution and limitations
- Responsive layout and reduced-motion support

Dates reflect the linked publication or announcement. Branches classify topics; they do not assert causal relationships. Collection growth is not a scientific acceleration metric. This is a starter collection, not comprehensive current news coverage.

## Add discoveries

Edit `dist/data.js`. Each entry needs a unique `id`, `title`, ISO `date`, `field`, `summary`, `aiRole`, `impact`, `limit`, `status`, `source`, and HTTPS `url`. Fields: Biology, Mathematics, Materials, Earth & climate, Physics. Extend the timeline range in index.html and app.js when adding years after 2025.

## Hosting

The app is static and portable. For GitHub Pages, select GitHub Actions as the Pages publishing source and deploy `dist/`, or publish this directory through another static host. The supplied source does not configure GitHub Pages automatically.

## Updates roadmap

Automatic ingestion is not enabled. Next: a scheduled Python collector for selected primary-source feeds; deduplication by DOI/URL; candidate review queue; approval before updating data.js. Keep API keys in server-side or GitHub Actions secrets, never browser code. Track corrections and source revisions. Do not treat an LLM summary as verification.
