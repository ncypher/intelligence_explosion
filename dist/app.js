const $ = id => document.getElementById(id);
const colors = { 'Biology': '#9bc9a1', 'Mathematics': '#baa6de', 'Materials': '#e1af77', 'Earth & climate': '#81bfc8', 'Physics': '#d4ca86' }, fields = Object.keys(colors);
let field = 'All fields', query = '', year = 2026, selected = null, view = 'graph', timer = null, raf = null, pausedAt = null, zoom = 1, tourIndex = -1, recentOnly = false;
const data = DISCOVERIES.slice().sort((a, b) => a.date.localeCompare(b.date) || a.id.localeCompare(b.id));
for (const d of data) d.buildsOn = d.buildsOn || [];
const byId = new Map(data.map(d => [d.id, d]));
const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const cutoffMs = Date.parse(CUTOFF), recentStart = new Date(cutoffMs - 29 * 864e5).toISOString().slice(0, 10);
const firstYear = +data[0].date.slice(0, 4), lastYear = +CUTOFF.slice(0, 4);
const fmtDate = s => new Date(s + 'T00:00:00Z').toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' });
let verification = 'all';
const verificationLabel = d => d.verification[0].toUpperCase() + d.verification.slice(1);
const verificationBadge = d => '<span class="badge verification-badge">' + verificationLabel(d) + '</span>';
const evidenceDot = (d,x,y,r,cls) => '<circle class="'+cls+' evidence '+d.verification+'" cx="'+x+'" cy="'+y+'" r="'+r+'" fill="'+(d.verification === 'claimed' ? '#091518' : colors[d.field])+'" stroke="'+colors[d.field]+'"/>' + (d.verification === 'provisional' ? '<circle class="verification-ring" cx="'+x+'" cy="'+y+'" r="'+(r+3)+'" fill="none" stroke="'+colors[d.field]+'" stroke-width=".8"/>' : '');
const visible = () => data.filter(d => (verification === 'all' || d.verification === verification) && +d.date.slice(0, 4) <= year && (!recentOnly || (d.date >= recentStart && d.date <= CUTOFF)) && (field === 'All fields' || d.field === field) && `${d.title} ${d.summary} ${d.field} ${d.aiRole}`.toLowerCase().includes(query));

// Lineage lookups: buildsOn (ancestors) and the reverse "led to" relation.
const ledTo = new Map(data.map(d => [d.id, []]));
for (const d of data) for (const p of d.buildsOn) if (ledTo.has(p)) ledTo.get(p).push(d.id);
function closure(id, next) { const seen = new Set(), stack = [...next(id)]; while (stack.length) { const n = stack.pop(); if (seen.has(n) || n === id || !byId.has(n)) continue; seen.add(n); stack.push(...next(n)) } return seen }
const ancestors = id => closure(id, n => byId.get(n)?.buildsOn || []);
const descendants = id => closure(id, n => ledTo.get(n) || []);

// Hero: two equal 90-day windows ending at the editorial cutoff, computed from data.
(function hero() {
  const day = 864e5, inWin = (a, b) => data.filter(d => { const t = Date.parse(d.date); return t > cutoffMs - a * day && t <= cutoffMs - b * day }).length;
  $('unverified').textContent = data.filter(d => d.verification === 'claimed' && Date.parse(d.date) > cutoffMs - 90 * day && Date.parse(d.date) <= cutoffMs).length + ' of the last-90-day milestones are still unverified claims';
  $('stat-recent').textContent = inWin(90, 0);
  $('stat-before').textContent = inWin(180, 90);
  $('total').textContent = data.length;
  $('review-date').textContent = fmtDate(CUTOFF);
  $('span').textContent = $('about-span').textContent = `${firstYear}–${lastYear}`;
})();

['All fields', ...fields].forEach(f => { const b = document.createElement('button'); b.innerHTML = (colors[f] ? `<span class="dot" style="--color:${colors[f]}"></span>` : '') + esc(f); b.onclick = () => { field = f; render() }; b.dataset.field = f; $('filters').append(b) });

// Tree: one curved branch per field; leaves sit along it in date order, newest at the tip.
const branches = {
  'Biology': { p: [[495, 440], [430, 360], [230, 330], [115, 150]], label: [115, 122] },
  'Mathematics': { p: [[505, 430], [575, 350], [775, 320], [885, 145]], label: [885, 117] },
  'Materials': { p: [[492, 478], [400, 455], [230, 470], [105, 420]], label: [105, 466] },
  'Earth & climate': { p: [[508, 478], [600, 455], [770, 470], [895, 425]], label: [895, 471] },
  'Physics': { p: [[500, 415], [488, 330], [515, 230], [500, 95]], label: [500, 70] }
};
const bez = (p, t) => { const u = 1 - t; return [0, 1].map(k => u * u * u * p[0][k] + 3 * u * u * t * p[1][k] + 3 * u * t * t * p[2][k] + t * t * t * p[3][k]) };
const bezD = (p, t) => { const u = 1 - t; return [0, 1].map(k => 3 * u * u * (p[1][k] - p[0][k]) + 6 * u * t * (p[2][k] - p[1][k]) + 3 * t * t * (p[3][k] - p[2][k])) };

function draw(items) {
  let out = '<defs><radialGradient id="glow"><stop stop-color="#d5b67c" stop-opacity=".19"/><stop offset="1" stop-color="#d5b67c" stop-opacity="0"/></radialGradient></defs><circle cx="500" cy="520" r="180" fill="url(#glow)"/><g id="branches">';
  out += '<path class="trunk" stroke-width="4" opacity=".6" d="M500 600 C485 560 515 520 500 470 C490 440 502 425 500 410"/>';
  for (let r = 0; r < 9; r++) out += `<path class="trunk" stroke-width=".8" opacity=".28" d="M500 582 Q${440 + r * 15} 610 ${330 + r * 43} ${615 + (r % 3) * 8}"/>`;
  let leaves = '';
  fields.forEach(f => {
    const { p, label } = branches[f], all = data.filter(d => d.field === f), n = all.length;
    out += `<path class="trunk" opacity=".42" stroke-width="2" d="M${p[0]} C${p[1]} ${p[2]} ${p[3]}"/><text class="branch-label" fill="${colors[f]}" x="${label[0]}" y="${label[1]}" text-anchor="middle">${esc(f.toUpperCase())}</text>`;
    all.forEach((d, j) => {
      const t = .96 - Math.min(.76 / Math.max(n - 1, 1), .13) * (n - 1 - j), [bx, by] = bez(p, t), [dx, dy] = bezD(p, t), len = Math.hypot(dx, dy) || 1;
      const side = j % 2 ? 1 : -1, off = 17, nx = bx - dy / len * off * side, ny = by + dx / len * off * side, shown = items.includes(d);
      out += `<path class="twig" stroke="${colors[f]}" opacity="${shown ? '.45' : '.07'}" d="M${bx} ${by} L${nx} ${ny}"/>`;
      if (!shown) return;
      leaves += `<g class="leaf ${selected === d.id ? 'chosen' : ''}" role="button" tabindex="0" aria-label="${esc(d.title)}, ${d.date}, ${verificationLabel(d)}" data-id="${d.id}" data-x="${nx}" data-y="${ny}"><circle class="halo" cx="${nx}" cy="${ny}" r="12" fill="${colors[f]}"/>${evidenceDot(d,nx,ny,5.5,'core')}</g>`;
    });
  });
  out += `<g id="leaves">${leaves}</g><g id="tree-tip" aria-hidden="true"></g></g>`;
  $('tree').innerHTML = out;
  applyZoom();
  document.querySelectorAll('.leaf').forEach(el => {
    el.onclick = () => choose(el.dataset.id);
    el.onkeydown = e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); choose(el.dataset.id) } };
    el.onmouseenter = el.onfocus = () => treeTip(el.dataset.id);
    el.onmouseleave = el.onblur = () => treeTip(selected);
  });
}

// One label layer for the tree: shows the hovered/focused leaf, else the selected one. Avoids collisions.
function treeTip(id) {
  const layer = $('tree-tip'), el = id && document.querySelector(`.leaf[data-id="${id}"]`), d = byId.get(id);
  if (!layer) return;
  if (!el || !d) { layer.innerHTML = ''; return }
  const x = +el.dataset.x, y = +el.dataset.y, label = `${d.title} · ${d.date.slice(0, 4)}`, w = label.length * 6.6 + 18;
  const lx = Math.min(990 - w / 2, Math.max(10 + w / 2, x)), ly = y < 60 ? y + 30 : y - 16;
  layer.innerHTML = `<rect x="${lx - w / 2}" y="${ly - 14}" width="${w}" height="21" rx="4"/><text x="${lx}" y="${ly + 1}" text-anchor="middle">${esc(label)}</text>`;
}

const chips = ids => ids.map(id => byId.get(id)).filter(Boolean).map(a => `<button class="chip" data-chip="${a.id}"><span class="dot" style="--color:${colors[a.field]}"></span>${esc(a.title)}<small>${a.date.slice(0, 4)}</small></button>`).join('');

function choose(id) {
  selected = id;
  const d = byId.get(id);
  if (!d) return;
  const up = d.buildsOn.filter(x => byId.has(x)), down = ledTo.get(id);
  const lineage = up.length || down.length
    ? (up.length ? `<h3>BUILDS ON</h3><div class="chips">${chips(up)}</div>` : '') + (down.length ? `<h3>LED TO</h3><div class="chips">${chips(down)}</div>` : '')
    : '<h3>LINEAGE</h3><p class="quiet">No documented dependency in this collection yet.</p>';
  $('detail').innerHTML = `<div class="meta"><span class="dot" style="--color:${colors[d.field]}"></span>${esc(d.field.toUpperCase())} &nbsp; / &nbsp; ${d.date.slice(0, 4)}</div><h2>${esc(d.title)}</h2><span class="badge">${esc(d.status)}</span> ${verificationBadge(d)}${d.verifiedNote ? `<p class="quiet">Independent check: ${esc(d.verifiedNote)}</p>` : ''}<p>${esc(d.summary)}</p><h3>WHAT DID AI CONTRIBUTE?</h3><p>${esc(d.aiRole)}</p><h3>WHY IT MATTERS</h3><p>${esc(d.impact)}</p><h3>THE LIMITS</h3><p>${esc(d.limit)}</p>${lineage}<a class="source" target="_blank" rel="noopener noreferrer" href="${esc(d.url)}">Read the primary source ↗<small>${esc(d.source)} · ${d.date}</small></a><div class="detail-count">${tourIndex >= 0 ? `GUIDED JOURNEY · ${tourIndex + 1} / 5 &nbsp; <button id="next">${tourIndex === 4 ? 'Finish' : 'Next →'}</button>` : 'A LEAF IN THE STORY. NOT THE WHOLE STORY.'}</div>`;
  if ($('next')) $('next').onclick = nextTour;
  document.querySelectorAll('[data-chip]').forEach(b => b.onclick = () => { tourIndex = -1; choose(b.dataset.chip) });
  document.querySelectorAll('.leaf').forEach(e => e.classList.toggle('chosen', e.dataset.id === id));
  treeTip(id);
  drawLineage(id);
}

function render() {
  const items = visible();
  pausedAt = null;
  document.querySelectorAll('[data-field]').forEach(b => { const active = b.dataset.field === field; b.classList.toggle('selected', active); b.setAttribute('aria-pressed', active) });
  document.querySelectorAll('[data-verification]').forEach(b => b.setAttribute('aria-pressed', b.dataset.verification === verification));
  $('year-label').textContent = year;
  $('coverage').textContent = recentOnly ? `${fmtDate(recentStart).replace(/, \d{4}$/, '')}–${fmtDate(CUTOFF)} · filtered collection` : `Through ${fmtDate(CUTOFF)} · publication dates`;
  $('shown').textContent = `${items.length} of ${data.length} milestones · through ${year}`;
  $('hint').textContent = view === 'tree' ? 'HOVER OR FOCUS A LEAF TO READ ITS TITLE' : 'SELECT A POINT TO TRACE WHAT IT BUILDS ON';
  $('graph-wrap').hidden = view !== 'graph' || !items.length;
  drawGraph(items);
  $('tree-wrap').hidden = view !== 'tree' || !items.length;
  $('list').hidden = view !== 'list' || !items.length;
  $('empty').hidden = !!items.length;
  draw(items);
  $('list').innerHTML = items.slice().reverse().map(d => `<button class="row" data-entry="${d.id}"><small><span class="dot" style="--color:${colors[d.field]}"></span>${esc(d.field)} · ${d.date}</small>${verificationBadge(d)}<strong>${esc(d.title)}</strong><p>${esc(d.summary)}</p></button>`).join('');
  document.querySelectorAll('[data-entry]').forEach(b => b.onclick = () => choose(b.dataset.entry));
  if (items.find(d => d.id === selected)) choose(selected);
  else if (items.length) choose(items[items.length - 1].id);
  else $('detail').innerHTML = '<h2>Room to explore.</h2><p>Change the year or clear your filters to return to the collection.</p>';
}

// Playback. Graph view (with motion allowed): the curve grows continuously through calendar time.
// Other views, or reduced motion: step through years as before.
const PLAY_MS = 9000, playStart = Date.parse(`${firstYear}-01-01`);
function stop() {
  clearInterval(timer); cancelAnimationFrame(raf); timer = raf = null;
  $('play').textContent = '▶'; $('play').setAttribute('aria-label', 'Play timeline');
}
function playing() { $('play').textContent = 'Ⅱ'; $('play').setAttribute('aria-label', 'Pause timeline') }
function playGraph(from) {
  const t0 = performance.now() - (from - playStart) / (cutoffMs - playStart) * PLAY_MS;
  const frame = now => {
    const k = Math.min(1, (now - t0) / PLAY_MS), t = playStart + k * (cutoffMs - playStart);
    const shown = setGraphCursor(t), y = new Date(t).getUTCFullYear();
    if (y !== year) { year = y; $('year').value = y; $('year-label').textContent = y }
    $('shown').textContent = `${shown} of ${data.length} milestones · through ${new Date(t).toLocaleDateString('en-US', { month: 'short', year: 'numeric', timeZone: 'UTC' })}`;
    pausedAt = t;
    if (k < 1) raf = requestAnimationFrame(frame);
    else { stop(); year = lastYear; $('year').value = year; render() }
  };
  raf = requestAnimationFrame(frame);
}
$('play').onclick = () => {
  if (timer || raf) { stop(); return }
  recentOnly = false; $('recent').setAttribute('aria-pressed', 'false'); tourIndex = -1;
  playing();
  if (view === 'graph' && !reducedMotion()) {
    const resume = pausedAt != null && pausedAt < cutoffMs ? pausedAt : null;
    if (resume == null) { year = lastYear; render(); setGraphCursor(playStart) }
    playGraph(resume ?? playStart);
    return;
  }
  if (year === lastYear) year = firstYear - 1;
  const tick = () => { year++; $('year').value = year; render(); if (year >= lastYear) stop() };
  tick();
  if (year < lastYear) timer = setInterval(tick, 1800);
};

$('year').oninput = e => { stop(); year = +e.target.value; tourIndex = -1; render() };
$('search').oninput = e => { query = e.target.value.trim().toLowerCase(); tourIndex = -1; render() };
for (const v of ['graph', 'tree', 'list']) $(v + '-tab').onclick = () => { stop(); view = v; for (const t of ['graph', 'tree', 'list']) { $(t + '-tab').classList.toggle('active', v === t); $(t + '-tab').setAttribute('aria-pressed', v === t) } render() };
$('surprise').onclick = () => { const a = visible(); if (a.length) { tourIndex = -1; choose(a[Math.floor(Math.random() * a.length)].id) } };
function applyZoom() { const g = $('branches'); if (g) g.setAttribute('transform', `translate(${500 * (1 - zoom)},${325 * (1 - zoom)}) scale(${zoom})`) }
$('plus').onclick = () => { zoom = Math.min(1.8, zoom + .2); applyZoom() };
$('minus').onclick = () => { zoom = Math.max(.7, zoom - .2); applyZoom() };
$('reset').onclick = () => { zoom = 1; applyZoom() };
$('recent').onclick = () => { stop(); recentOnly = !recentOnly; $('recent').setAttribute('aria-pressed', recentOnly); if (recentOnly) { year = lastYear; $('year').value = year } tourIndex = -1; render() };
const journey = () => fields.map(f => data.find(d => d.field === f)).filter(Boolean);
function nextTour() { tourIndex++; if (tourIndex >= 5) { tourIndex = -1; choose(selected); return } choose(journey()[tourIndex].id) }
$('tour').onclick = () => { stop(); verification = 'all'; field = 'All fields'; query = ''; recentOnly = false; $('recent').setAttribute('aria-pressed', 'false'); $('search').value = ''; year = lastYear; $('year').value = year; tourIndex = -1; render(); nextTour(); $('detail').scrollIntoView({ behavior: reducedMotion() ? 'auto' : 'smooth', block: 'nearest' }) };
document.querySelectorAll('[data-verification]').forEach(b => b.onclick = () => { stop(); verification = b.dataset.verification; render() });
$('axis').onchange = () => { stop(); deepTime = $('axis').value === 'log'; $('time-dive').hidden = $('gaps').hidden = !deepTime; render() };
$('dive').oninput = e => setDive(+e.target.value);
$('graph').addEventListener('wheel', e => { if (!deepTime) return; e.preventDefault(); setDive(diveZoom - e.deltaY * .08) }, { passive: false });
$('graph').onkeydown = e => { if (deepTime && ['+', '=', '-'].includes(e.key)) { e.preventDefault(); setDive(diveZoom + (e.key === '-' ? -5 : 5)) } };
$('about').onclick = () => $('info').showModal();
$('close').onclick = () => $('info').close();
$('info').onclick = e => { if (e.target === $('info')) $('info').close() };
render();

// Touch pinch zoom uses the same bounded window as the keyboard and slider.
let pinchDistance = null;
$('graph').addEventListener('touchstart', e => { if (deepTime && e.touches.length === 2) { e.preventDefault(); pinchDistance = Math.hypot(e.touches[0].clientX-e.touches[1].clientX,e.touches[0].clientY-e.touches[1].clientY) } }, { passive: false });
$('graph').addEventListener('touchmove', e => { if (!deepTime || e.touches.length !== 2 || pinchDistance == null) return; e.preventDefault(); const distance = Math.hypot(e.touches[0].clientX-e.touches[1].clientX,e.touches[0].clientY-e.touches[1].clientY); setDive(diveZoom + (distance-pinchDistance)*.4); pinchDistance = distance }, { passive: false });
$('graph').addEventListener('touchend', () => { pinchDistance = null });
