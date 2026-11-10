// Resources are context and routes into the work, not additional milestones.
function storyResources(d) {
  const all = [{title: d.source, url: d.url, type: 'Primary source', note: 'The publication or announcement used for this milestone.'}, ...(DISCOVERY_RESOURCES[d.id]?.resources || [])];
  const video = DISCOVERY_MEDIA[d.id], demo = DISCOVERY_MEDIA_LINKS[d.id];
  if (video) all.push({title: video.title, url: mediaURL(video), type: 'Video', note: video.publisher});
  if (demo) all.push({title: demo.title, url: demo.url, type: 'Demo', note: demo.note});
  const seen = new Set();
  return all.filter(r => {
    if (!/^https:\/\//.test(r.url)) return false;
    const key = r.url.replace(/\/$/, '');
    if (seen.has(key)) return false;
    seen.add(key); return true;
  });
}
function researchButton(d) {
  return `<button class="research-open" data-research="${d.id}"><span>Explore sources & tools <span aria-hidden="true">↗</span></span><small>${storyResources(d).length} links · open the research desk</small></button>`;
}
function openResearch(id) {
  const d = byId.get(id); if (!d) return;
  stop(); stopMediaPlayers();
  const resources = storyResources(d);
  $('research-title').textContent = d.title;
  $('research-meta').textContent = `${d.field} / ${d.date} / ${resources.length} links`;
  $('research-summary').textContent = d.summary;
  $('research-evidence').innerHTML = `${verificationBadge(d)} <span>${esc(d.limit)}</span>`;
  $('research-links').innerHTML = resources.map(r => `<a class="research-card ${r.type === 'Primary source' ? 'research-primary' : ''}" href="${esc(r.url)}" target="_blank" rel="noopener noreferrer"><span class="resource-type">${esc(r.type)} <span aria-hidden="true">↗</span></span><strong>${esc(r.title)}</strong><p>${esc(r.note || '')}</p><small>${esc(new URL(r.url).hostname.replace(/^www\./, ''))}</small></a>`).join('');
  const upstream = d.buildsOn.filter(x => byId.has(x)), downstream = ledTo.get(id) || [];
  const related = (ids, label) => ids.length ? `<div><h3>${label}</h3>${ids.map(key => `<button data-related-research="${key}">${esc(byId.get(key).title)} <span aria-hidden="true">→</span></button>`).join('')}</div>` : '';
  $('research-lineage').innerHTML = related(upstream, 'Earlier work this builds on') + related(downstream, 'Follow-on work in the collection');
  $('research-lineage').hidden = !upstream.length && !downstream.length;
  $('research-note').textContent = DISCOVERY_RESOURCES[d.id]?.coverageNote || 'Links include research artifacts and explanatory context. A linked resource does not independently verify the milestone. Code links may have license or access restrictions.';
  $('research-lineage').querySelectorAll('[data-related-research]').forEach(b => b.onclick = () => {
    openResearch(b.dataset.relatedResearch);
    $('research-title').focus();
  });
  if (!$('research-desk').open) $('research-desk').showModal();
  $('research-desk').scrollTop = 0;
}
function bindResearch(root) {
  root.querySelectorAll('[data-research]').forEach(b => b.onclick = () => openResearch(b.dataset.research));
}
function initResearch() {
  $('research-close').onclick = () => $('research-desk').close();
  $('research-desk').addEventListener('click', e => { if (e.target === $('research-desk')) $('research-desk').close(); });
  const count = data.reduce((total, d) => total + storyResources(d).length, 0);
  $('resource-coverage').textContent = `${data.length} research desks · ${count} source & resource links`;
}
