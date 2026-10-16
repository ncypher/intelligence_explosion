// Cumulative step graph: draw-in animation, play cursor and lineage arcs.
const GX0 = 85, GX1 = 935, GY0 = 455, GY1 = 100, DRAW_MS = 1600;
let graphPoints = new Map(), graphModelCache = null, graphDrawnOnce = false;
const reducedMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
const dayMs = 864e5;

function graphModel(items, recent) {
  const end = Date.parse(CUTOFF), start = recent ? end - 29 * dayMs : Date.parse('2020-01-01');
  const step = items.length > 40 ? 10 : 5, max = Math.max(step, Math.ceil(items.length / step) * step);
  const xOf = t => GX0 + (GX1 - GX0) * (t - start) / (end - start);
  const yOf = c => GY0 - (GY0 - GY1) * c / max;
  return { start, end, max, step, xOf, yOf, points: items.map((d, i) => ({ d, count: i + 1, t: Date.parse(d.date), x: xOf(Date.parse(d.date)), y: yOf(i + 1) })) };
}

function drawGraph(items) {
  const m = graphModel(items, recentOnly);
  graphModelCache = m;
  graphPoints = new Map(m.points.map(p => [p.d.id, p]));
  let s = '<text x="85" y="55">CUMULATIVE MILESTONES IN THIS COLLECTION</text>';
  for (let v = 0; v <= m.max; v += m.step) {
    const y = m.yOf(v);
    s += `<line x1="${GX0}" x2="${GX1}" y1="${y}" y2="${y}" stroke="#2c4245"/><text x="65" y="${y + 4}" text-anchor="end">${v}</text>`;
  }
  if (!recentOnly) {
    // Shade the two equal windows used by the hero comparison.
    const w0 = m.xOf(m.end - 180 * dayMs), w1 = m.xOf(m.end - 90 * dayMs);
    s += `<rect class="window before" x="${w0}" y="${GY1 - 10}" width="${w1 - w0}" height="${GY0 - GY1 + 10}"/><rect class="window recent" x="${w1}" y="${GY1 - 10}" width="${GX1 - w1}" height="${GY0 - GY1 + 10}"/>`;
    s += `<text class="window-label" x="${GX1}" y="${GY1 - 16}" text-anchor="end">LAST 90 DAYS</text>`;
  }
  const ticks = recentOnly
    ? [0, 7, 14, 21, 29].map(k => new Date(m.end - (29 - k) * dayMs).toISOString().slice(0, 10))
    : Array.from({ length: 7 }, (_, i) => `${2020 + i}-01-01`);
  for (const t of ticks) s += `<text x="${m.xOf(Date.parse(t))}" y="485" text-anchor="middle">${recentOnly ? t.slice(5) : t.slice(0, 4)}</text>`;
  s += '<text x="510" y="520" text-anchor="middle">Publication / announcement date · linear calendar scale</text>';
  let path = `M${GX0} ${GY0}`;
  for (const p of m.points) path += ` H${p.x} V${p.y}`;
  path += ` H${GX1}`;
  s += `<clipPath id="grow"><rect id="grow-rect" x="0" y="0" width="1000" height="560"/></clipPath>`;
  s += `<g clip-path="url(#grow)"><path id="step-fill" d="${path} L${GX1} ${GY0} Z" fill="#d5b67c" opacity=".05"/><path id="step" d="${path}" fill="none" stroke="#d5b67c" stroke-width="2.5"/></g>`;
  s += '<g id="cursor" style="display:none"><line y1="' + (GY1 - 10) + '" y2="' + GY0 + '" stroke="#d5b67c" stroke-opacity=".5" stroke-dasharray="2 4"/></g>';
  s += '<g id="lineage"></g><g id="points">';
  for (const p of m.points) {
    s += `<g class="plot-point" tabindex="0" role="button" aria-label="${esc(p.d.title)}, ${p.d.date}, milestone ${p.count}" data-plot="${p.d.id}"><title>${esc(p.d.title)} · ${p.d.date} · count ${p.count}</title><circle cx="${p.x}" cy="${p.y}" r="10" fill="transparent"/><circle class="pt" cx="${p.x}" cy="${p.y}" r="5" fill="${colors[p.d.field]}"/></g>`;
  }
  s += '</g>';
  $('graph').innerHTML = s;
  $('graph-table').innerHTML = '<table><thead><tr><th>Date</th><th>Milestone</th><th>Cumulative count</th></tr></thead><tbody>' + m.points.map(p => `<tr><td>${p.d.date}</td><td>${esc(p.d.title)}</td><td>${p.count}</td></tr>`).join('') + '</tbody></table>';
  document.querySelectorAll('[data-plot]').forEach(e => {
    e.onclick = () => choose(e.dataset.plot);
    e.onkeydown = k => { if (k.key === 'Enter' || k.key === ' ') { k.preventDefault(); choose(e.dataset.plot) } };
  });
  if (!graphDrawnOnce && view === 'graph' && items.length) { graphDrawnOnce = true; animateDrawIn(m) }
}

// First render: draw the step path with stroke-dashoffset; points appear as the line reaches them.
function animateDrawIn(m) {
  if (reducedMotion()) return;
  const step = $('step'), fill = $('step-fill');
  const total = step.getTotalLength();
  step.style.strokeDasharray = total;
  step.style.strokeDashoffset = total;
  fill.style.opacity = 0;
  let run = 0, lx = GX0, ly = GY0;
  for (const p of m.points) {
    run += Math.abs(p.x - lx) + Math.abs(p.y - ly); lx = p.x; ly = p.y;
    const g = document.querySelector(`[data-plot="${p.d.id}"]`);
    if (g) { g.classList.add('pop'); g.style.animationDelay = `${Math.round(DRAW_MS * run / total)}ms` }
  }
  step.getBoundingClientRect();
  step.style.transition = `stroke-dashoffset ${DRAW_MS}ms cubic-bezier(.45,.05,.35,1)`;
  fill.style.transition = `opacity 600ms ease ${DRAW_MS - 300}ms`;
  step.style.strokeDashoffset = 0;
  fill.style.opacity = '';
  setTimeout(() => { step.style.strokeDasharray = ''; step.style.strokeDashoffset = ''; step.style.transition = '' }, DRAW_MS + 50);
}

// Play: reveal the curve up to time t (null = show everything).
function setGraphCursor(t) {
  const m = graphModelCache, rect = $('grow-rect'), cur = $('cursor');
  if (!m || !rect) return 0;
  if (t == null) { rect.setAttribute('width', 1000); cur.style.display = 'none'; document.querySelectorAll('.plot-point.future').forEach(e => e.classList.remove('future')); return m.points.length }
  const x = m.xOf(t);
  rect.setAttribute('width', Math.max(0, x));
  cur.style.display = '';
  cur.firstChild.setAttribute('x1', x); cur.firstChild.setAttribute('x2', x);
  let shown = 0;
  for (const p of m.points) {
    const future = p.t > t;
    if (!future) shown++;
    const g = document.querySelector(`[data-plot="${p.d.id}"]`);
    if (g) g.classList.toggle('future', future);
  }
  return shown;
}

// Lineage: gold arcs to documented ancestors (solid) and descendants (dashed); dim the rest.
function drawLineage(id) {
  const layer = $('lineage');
  if (!layer) return;
  const up = ancestors(id), down = descendants(id);
  const related = new Set([id, ...up, ...down]);
  const linked = related.size > 1;
  let s = '';
  const arc = (a, b, cls) => {
    const p = graphPoints.get(a), q = graphPoints.get(b);
    if (!p || !q) return;
    const dx = q.x - p.x, dy = q.y - p.y, lift = Math.min(140, 30 + Math.hypot(dx, dy) * .3);
    s += `<path class="arc ${cls}" d="M${p.x} ${p.y} Q${(p.x + q.x) / 2} ${Math.min(p.y, q.y) - lift} ${q.x} ${q.y}"/>`;
  };
  for (const n of [id, ...up]) for (const parent of byId.get(n)?.buildsOn || []) if (n === id || up.has(n)) arc(parent, n, n === id ? 'direct' : 'deep');
  for (const n of down) for (const parent of byId.get(n).buildsOn) if (parent === id || down.has(parent)) arc(parent, n, 'down');
  layer.innerHTML = s;
  document.querySelectorAll('.plot-point').forEach(e => {
    const r = related.has(e.dataset.plot);
    e.classList.toggle('dim', linked && !r);
    e.classList.toggle('chosen', e.dataset.plot === id);
  });
}
