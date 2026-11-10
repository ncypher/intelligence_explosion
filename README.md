# Intelligence Explosion

Is discovery accelerating? An interactive, source-linked collection of AI-assisted science milestones, with a growth graph, a discovery network and a reading view. Built for Tom Harwood.

## Run

No build or dependencies required. Serve `dist/` with any static server, for example `python -m http.server 8000 --directory dist`.

## Features

- Hero comparison of milestones in the last 90 days vs the 90 days before, computed from `data.js`
- Linear-calendar cumulative graph with clickable points and accessible values table; the step path draws in on first load and Play grows the curve through time (both skipped under reduced motion)
- Lineage: documented `buildsOn` links draw gold arcs on the graph; the detail panel lists “Builds on” and “Led to” chips
- Last-30-days filter (relative to the editorial cutoff)
- Source-linked examples of compounding tools and research
- Eight 2026 additions, including BootLoops and OpenAI mathematics release; batch releases count once.

- Neural-style SVG discovery network with stable field clusters, documented dependency arrows, animated lineage highlighting, keyboard-operable nodes, zoom and a Connected only filter
- Play/Pause and timeline controls directly above the visualization; supporting research cards below the explorer
- Search, five scientific field filters, and a 2020–2026 timeline with playback
- Reading view, five-stop guided tour, and random discovery
- 69 curated entries with primary sources, evidence status, AI contribution and limitations
- Responsive layout and reduced-motion support

A collapsible “How to read this” note under the explorer explains what the curve can and cannot show. Dates reflect the linked publication or announcement. Network clusters classify topics; proximity does not assert a relationship. Only documented buildsOn links create edges. Collection growth is not a scientific acceleration metric. This is a starter collection, not comprehensive current news coverage.

## Multimedia

`dist/media.js` curates contextual YouTube films/interviews for existing milestones. Videos do not add milestone counts. The screening room opens a keyboard-accessible dialog; detail panels play inline. Players use youtube-nocookie.com and load only after a click; thumbnails load from YouTube. Closing a dialog or starting another video removes the previous player. Every video retains an external watch link. A With video filter, reading badges and network markers expose available media. Official media pages without a verified video ID remain external links.

## Add discoveries

To add a milestone: append to DISCOVERIES, bump CUTOFF.

Edit `dist/data.js`. Each entry needs a unique `id`, `title`, ISO `date`, `field`, `summary`, `aiRole`, `impact`, `limit`, `status`, `source`, HTTPS `url`, and `buildsOn` (an array of earlier entry ids, empty unless the source documents the dependency; cite it in the summary). Fields: Biology, Mathematics, Materials, Earth & climate, Physics. Update `CUTOFF` at the top of `data.js` at each editorial review; graph bounds, the Last 30 days filter and the hero windows derive from it. The current editorial cutoff is November 10, 2026.

Regenerate the share image after data changes: `npm i playwright && node tools/make-og.js` (writes `dist/og.png`, 1200×630).

## Hosting

The app is static and portable. For GitHub Pages, select GitHub Actions as the Pages publishing source and deploy `dist/`, or publish this directory through another static host. The supplied source does not configure GitHub Pages automatically.

## Updates roadmap

Automatic ingestion is not enabled. Next: a scheduled Python collector for selected primary-source feeds; deduplication by DOI/URL; candidate review queue; approval before updating data.js. Keep API keys in server-side or GitHub Actions secrets, never browser code. Track corrections and source revisions. Do not treat an LLM summary as verification.

## Verification and deep time

Every DISCOVERIES entry has verification: verified, provisional, or claimed, and an optional short verifiedNote string. Upgrade claimed→provisional→verified only when a cited independent check exists; put the citation in verifiedNote. Initial states are editorial classifications; empty notes do not supply independent verification. Reading badges and graph/network dots share these states; the verification filter combines with field, search, year, and Last 30 days filters.

ERAS is a separate, sorted list of hand-picked context markers with id, year, title, line, and Wikipedia url. It never enters milestone search, hero statistics, cumulative totals, or recent filters. Deep time plots log10(years before CUTOFF + 1), reversed with today at right. Time dive uses the slider, wheel/pinch, or +/− keys while the graph is focused; reduced motion jumps immediately. The historical gap panel uses consecutive ERAS years and the median of consecutive milestone date gaps in the same last-90-day window as the hero (including same-day zero gaps). These differently selected lists cannot establish acceleration.

### Research desks

Every milestone has an **Explore sources & tools** button. Its research desk combines the original source with curated papers, code, datasets, demonstrations, videos and background reading from `dist/resources.js`. Documented upstream/downstream links open the related story’s desk without losing the explorer selection.

The November 10 resource pass adds 107 supplemental link placements across 68 stories. BioBasicsBench has its illustrated primary article and a note that no separate public artifact was found. The Yang–Mills desk labels the Clay problem statement as background; it does not imply the announced proof is available. Some publisher destinations restrict access, and external demos may require sign-in or be temporarily unavailable. Links were located through primary pages and research repositories; this is not an independent reproduction of the science.

Nine stories now have click-loaded YouTube players; the three featured films remain in the screening room. A FutureHouse Vimeo demonstration is linked from Robin’s desk. Additional video labels describe their role; upload dates are omitted where unconfirmed. Code links are not a blanket claim that all models or artifacts have unrestricted open-source licenses.

Run `node tools/check-resources.cjs` to check coverage, valid resource types, URLs and story/video mappings.
