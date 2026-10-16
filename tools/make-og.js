// Renders dist/og.png (1200×630) from dist/data.js. Requires `playwright` (npm i playwright).
// Usage: node tools/make-og.js
const fs = require('fs'), path = require('path');
const { chromium } = require('playwright');
const dist = path.join(__dirname, '..', 'dist');
const src = fs.readFileSync(path.join(dist, 'data.js'), 'utf8');
const { CUTOFF, DISCOVERIES } = new Function(src + ';return {CUTOFF, DISCOVERIES}')();
const items = DISCOVERIES.slice().sort((a, b) => a.date.localeCompare(b.date));
const colors = { 'Biology': '#9bc9a1', 'Mathematics': '#baa6de', 'Materials': '#e1af77', 'Earth & climate': '#81bfc8', 'Physics': '#d4ca86' };
const t0 = Date.parse('2020-01-01'), t1 = Date.parse(CUTOFF), X0 = 640, X1 = 1130, Y0 = 520, Y1 = 150;
const x = t => X0 + (X1 - X0) * (t - t0) / (t1 - t0), y = c => Y0 - (Y0 - Y1) * c / items.length;
let d = `M${X0} ${Y0}`;
items.forEach((e, i) => { d += ` H${x(Date.parse(e.date)).toFixed(1)} V${y(i + 1).toFixed(1)}` });
const dots = items.map((e, i) => `<circle cx="${x(Date.parse(e.date)).toFixed(1)}" cy="${y(i + 1).toFixed(1)}" r="4.5" fill="${colors[e.field]}"/>`).join('');
const years = [2020, 2022, 2024, 2026].map(yr => `<text x="${x(Date.parse(yr + '-01-01'))}" y="556" text-anchor="middle">${yr}</text>`).join('');
const html = `<!doctype html><html><head><meta charset="utf-8"><link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500&family=Libre+Caslon+Display&display=swap" rel="stylesheet">
<style>html,body{margin:0;width:1200px;height:630px;background:#091518;overflow:hidden}svg text{font-family:'DM Sans',sans-serif}</style></head><body>
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
<defs><radialGradient id="g" cx="75%" cy="70%" r="60%"><stop stop-color="#1e302c"/><stop offset="1" stop-color="#091518"/></radialGradient></defs>
<rect width="1200" height="630" fill="url(#g)"/>
<text x="70" y="92" fill="#d5b67c" font-size="34">✳</text><text x="112" y="86" fill="#e4e9e3" font-size="15" letter-spacing="3">INTELLIGENCE EXPLOSION</text>
<text x="70" y="250" fill="#e4e9e3" font-family="Libre Caslon Display" font-size="86" style="font-family:'Libre Caslon Display',Georgia,serif">Is discovery</text>
<text x="70" y="345" fill="#d5b67c" font-size="86" font-style="italic" style="font-family:'Libre Caslon Display',Georgia,serif">accelerating?</text>
<text x="72" y="420" fill="#98aaa8" font-size="20">AI-assisted science, source by source.</text>
<text x="72" y="450" fill="#98aaa8" font-size="20">Every milestone links its evidence and its limits.</text>
<text x="72" y="556" fill="#738984" font-size="13" letter-spacing="2">CUMULATIVE CURATED MILESTONES · LINEAR CALENDAR</text>
${[0, .25, .5, .75, 1].map(k => `<line x1="${X0}" x2="${X1}" y1="${Y0 - (Y0 - Y1) * k}" y2="${Y0 - (Y0 - Y1) * k}" stroke="#24363a"/>`).join('')}
<path d="${d} H${X1} L${X1} ${Y0} Z" fill="#d5b67c" opacity=".07"/><path d="${d} H${X1}" fill="none" stroke="#d5b67c" stroke-width="3.5"/>${dots}
<g fill="#98aaa8" font-size="14">${years}</g>
</svg></body></html>`;
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1200, height: 630 } });
  await p.setContent(html, { waitUntil: 'networkidle' });
  await p.evaluate(() => document.fonts.ready);
  await p.screenshot({ path: path.join(dist, 'og.png') });
  await b.close();
  console.log(`og.png written from ${items.length} entries`);
})();
