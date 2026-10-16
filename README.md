# Intelligence Explosion

Is discovery accelerating? An interactive, source-linked collection of AI-assisted science milestones, with a growth graph, a tree view and a reading view. Built for Tom Harwood.

## Run

No build or dependencies required. Serve `dist/` with any static server, for example `python -m http.server 8000 --directory dist`.

## Features

- Hero comparison of milestones in the last 90 days vs the 90 days before, computed from `data.js`
- Linear-calendar cumulative graph with clickable points and accessible values table; the step path draws in on first load and Play grows the curve through time (both skipped under reduced motion)
- Lineage: documented `buildsOn` links draw gold arcs on the graph; the detail panel lists “Builds on” and “Led to” chips
- Last-30-days filter (relative to the editorial cutoff)
- Source-linked examples of compounding tools and research
- Eight 2026 additions, including BootLoops and OpenAI mathematics release; batch releases count once.

- SVG tree with keyboard-operable leaves ordered by date along each branch (newest at the tip); titles appear on hover, focus or selection
- Search, five scientific field filters, and a 2020–2026 timeline with playback
- Reading view, five-stop guided tour, and random discovery
- 49 curated entries with primary sources, evidence status, AI contribution and limitations
- Responsive layout and reduced-motion support

A collapsible “How to read this” note under the explorer explains what the curve can and cannot show. Dates reflect the linked publication or announcement. Branches classify topics; they do not assert causal relationships. Collection growth is not a scientific acceleration metric. This is a starter collection, not comprehensive current news coverage.

## Add discoveries

Edit `dist/data.js`. Each entry needs a unique `id`, `title`, ISO `date`, `field`, `summary`, `aiRole`, `impact`, `limit`, `status`, `source`, HTTPS `url`, and `buildsOn` (an array of earlier entry ids, empty unless the source documents the dependency; cite it in the summary). Fields: Biology, Mathematics, Materials, Earth & climate, Physics. Update `CUTOFF` at the top of `data.js` at each editorial review; graph bounds, the Last 30 days filter and the hero windows derive from it. The current editorial cutoff is October 16, 2026.

Regenerate the share image after data changes: `npm i playwright && node tools/make-og.js` (writes `dist/og.png`, 1200×630).

## Hosting

The app is static and portable. For GitHub Pages, select GitHub Actions as the Pages publishing source and deploy `dist/`, or publish this directory through another static host. The supplied source does not configure GitHub Pages automatically.

## Updates roadmap

Automatic ingestion is not enabled. Next: a scheduled Python collector for selected primary-source feeds; deduplication by DOI/URL; candidate review queue; approval before updating data.js. Keep API keys in server-side or GitHub Actions secrets, never browser code. Track corrections and source revisions. Do not treat an LLM summary as verification.
