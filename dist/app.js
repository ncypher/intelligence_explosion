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

['All fields', ...fields].forEach(f => { const b = document.createElement('button'); b.innerHTML = (colors[f] ? `<span class="dot" style="--color:${colors[f]}"></span>` : '') + esc(f); b.onclick = () => { stop(); field = f; render() }; b.dataset.field = f; $('filters').append(b) });

// Stable, deterministic layout: field proximity is visual grouping, never a dependency.
let linkedOnly = false;
const networkCenters = [[270,245],[730,245],[235,470],[765,470],[500,130]];
const networkPositions = new Map();
fields.forEach((f, fi) => {
  const group = data.filter(d => d.field === f), [cx,cy] = networkCenters[fi];
  group.forEach((d,i) => {
    const angle = i * 2.39996323 + fi, radius = 26 * Math.sqrt(i + 1);
    networkPositions.set(d.id, {x:cx+Math.cos(angle)*radius,y:cy+Math.sin(angle)*radius, cx, cy});
  });
});
// Relax connected nodes toward one another while preventing overlap.
for(let step=0;step<160;step++) {
  const force = new Map(data.map(d=>[d.id,{x:0,y:0}]));
  for(let i=0;i<data.length;i++) for(let j=i+1;j<data.length;j++) {
    const a=networkPositions.get(data[i].id), b=networkPositions.get(data[j].id);
    const dx=a.x-b.x,dy=a.y-b.y,dist=Math.max(1,Math.hypot(dx,dy));
    if(dist<70){const k=(70-dist)*.035; force.get(data[i].id).x+=dx/dist*k;force.get(data[i].id).y+=dy/dist*k;force.get(data[j].id).x-=dx/dist*k;force.get(data[j].id).y-=dy/dist*k;}
  }
  for(const d of data) for(const id of d.buildsOn) {
    const a=networkPositions.get(d.id),b=networkPositions.get(id);if(!b)continue;
    const dx=b.x-a.x,dy=b.y-a.y,dist=Math.max(1,Math.hypot(dx,dy)),k=(dist-70)*.008;
    force.get(d.id).x+=dx/dist*k;force.get(d.id).y+=dy/dist*k;force.get(id).x-=dx/dist*k;force.get(id).y-=dy/dist*k;
  }
  for(const d of data){const p=networkPositions.get(d.id),f=force.get(d.id);p.x=Math.max(55,Math.min(945,p.x+f.x+(p.cx-p.x)*.003));p.y=Math.max(90,Math.min(565,p.y+f.y+(p.cy-p.y)*.003));}
}
function draw(items) {
  const shown=items.filter(d=>!linkedOnly || d.buildsOn.length || ledTo.get(d.id).length), ids=new Set(shown.map(d=>d.id));
  let out='<defs><filter id="node-glow"><feGaussianBlur stdDeviation="5"/></filter><marker id="neural-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0 0 L10 5 L0 10" fill="#d5b67c"/></marker></defs><g id="branches">';
  fields.forEach((f,i)=>{const [x,y]=networkCenters[i];out+=`<ellipse cx="${x}" cy="${y}" rx="190" ry="145" fill="${colors[f]}" opacity=".025"/><text class="branch-label" fill="${colors[f]}" x="${x}" y="${i===4?50:i<2?75:610}" text-anchor="middle">${esc(f.toUpperCase())}</text>`});
  let edges=0;
  for(const d of shown)for(const parent of d.buildsOn){if(!ids.has(parent))continue;edges++;const a=networkPositions.get(parent),b=networkPositions.get(d.id),dx=b.x-a.x,dy=b.y-a.y,dist=Math.hypot(dx,dy)||1;
    const path=`M${a.x+dx/dist*11} ${a.y+dy/dist*11} Q${(a.x+b.x)/2-dy*.14} ${(a.y+b.y)/2+dx*.14} ${b.x-dx/dist*13} ${b.y-dy/dist*13}`;
    out+=`<path class="neural-edge" data-from="${parent}" data-to="${d.id}" d="${path}" marker-end="url(#neural-arrow)"/>`;
  }
  for(const d of shown){const {x,y}=networkPositions.get(d.id);out+=`<g class="leaf neuron" role="button" tabindex="0" aria-label="${esc(d.title)}, ${d.date}, ${verificationLabel(d)}" data-id="${d.id}" data-x="${x}" data-y="${y}"><title>${esc(d.title)} · ${d.date}</title><circle class="neuron-glow" cx="${x}" cy="${y}" r="19" fill="${colors[d.field]}" filter="url(#node-glow)"/><circle class="halo" cx="${x}" cy="${y}" r="20" fill="${colors[d.field]}"/><circle class="node-hit" cx="${x}" cy="${y}" r="22" fill="transparent"/>${evidenceDot(d,x,y,7,'core')}</g>`;}
  out+='<g id="tree-tip" aria-hidden="true"></g></g>'; $('tree').innerHTML=out;
  $('network-count').textContent=`${shown.length} nodes · ${edges} links in view`;
  if(!shown.length) $('network-count').textContent='No connected nodes match these filters';
  applyZoom();
  document.querySelectorAll('.leaf').forEach(el=>{
    el.onclick=()=>choose(el.dataset.id);
    el.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();choose(el.dataset.id)}};
    el.onmouseenter=el.onfocus=()=>{treeTip(el.dataset.id);highlightNetwork(el.dataset.id)};
    el.onmouseleave=el.onblur=()=>{treeTip(selected);highlightNetwork(selected)};
  });
  highlightNetwork(selected);
}
function highlightNetwork(id){
  const focus=byId.has(id)?new Set([id,...ancestors(id),...descendants(id)]):new Set();
  document.querySelectorAll('.neuron').forEach(el=>{el.classList.toggle('chosen',el.dataset.id===id);el.classList.toggle('connected',focus.has(el.dataset.id));});
  document.querySelectorAll('.neural-edge').forEach(el=>el.classList.toggle('lit',focus.has(el.dataset.from)&&focus.has(el.dataset.to)));
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
  $('detail').innerHTML = `<div class="meta"><span class="dot" style="--color:${colors[d.field]}"></span>${esc(d.field.toUpperCase())} &nbsp; / &nbsp; ${d.date.slice(0, 4)}</div><h2>${esc(d.title)}</h2><span class="badge">${esc(d.status)}</span> ${verificationBadge(d)}${d.verifiedNote ? `<p class="quiet">Evidence note: ${esc(d.verifiedNote)}</p>` : ''}<p>${esc(d.summary)}</p><h3>WHAT DID AI CONTRIBUTE?</h3><p>${esc(d.aiRole)}</p><h3>WHY IT MATTERS</h3><p>${esc(d.impact)}</p><h3>THE LIMITS</h3><p>${esc(d.limit)}</p>${lineage}<a class="source" target="_blank" rel="noopener noreferrer" href="${esc(d.url)}">Read the primary source ↗<small>${esc(d.source)} · ${d.date}</small></a><div class="detail-count">${tourIndex >= 0 ? `GUIDED JOURNEY · ${tourIndex + 1} / 5 &nbsp; <button id="next">${tourIndex === 4 ? 'Finish' : 'Next →'}</button>` : 'ONE DISCOVERY. MANY POSSIBLE NEXT STEPS.'}</div>`;
  if ($('next')) $('next').onclick = nextTour;
  document.querySelectorAll('[data-chip]').forEach(b => b.onclick = () => { tourIndex = -1; choose(b.dataset.chip) });
  document.querySelectorAll('.leaf').forEach(e => e.classList.toggle('chosen', e.dataset.id === id));
  treeTip(id);
  highlightNetwork(id);
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
  $('hint').textContent = view === 'tree' ? 'SELECT A NODE TO ILLUMINATE ITS LINEAGE' : 'SELECT A POINT TO TRACE WHAT IT BUILDS ON';
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
  $('play').textContent = '▶ Play'; $('play').setAttribute('aria-label', 'Play timeline');
}
function playing() { $('play').textContent = 'Ⅱ Pause'; $('play').setAttribute('aria-label', 'Pause timeline') }
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
$('search').oninput = e => { stop(); query = e.target.value.trim().toLowerCase(); tourIndex = -1; render() };
for (const v of ['graph', 'tree', 'list']) $(v + '-tab').onclick = () => { stop(); view = v; for (const t of ['graph', 'tree', 'list']) { $(t + '-tab').classList.toggle('active', v === t); $(t + '-tab').setAttribute('aria-pressed', v === t) } render() };
$('linked-only').onclick = () => { linkedOnly = !linkedOnly; $('linked-only').setAttribute('aria-pressed', linkedOnly); draw(visible()); };
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
