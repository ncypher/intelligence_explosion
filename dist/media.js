// Curated media accompanies existing milestones; it does not add discovery counts.
// Watch-page titles, publishers and dates checked November 10, 2026.
const DISCOVERY_MEDIA = {
  alphafold2: { videoId: 'gg7WjuFs8F4', title: 'AlphaFold: The making of a scientific breakthrough', publisher: 'Google DeepMind', date: '2020-11-30', type: 'Official research film', caption: 'Meet the people behind the protein-structure prediction breakthrough.', note: 'A film about the research, not experimental evidence for every predicted structure.' },
  'weathernext3': { videoId: 'O_EWbnkjXdk', title: 'How AI is transforming weather prediction', publisher: 'Google DeepMind', date: '2026-09-09', type: 'Researcher conversation', caption: 'Hannah Fry and Peter Battaglia explore forecasting, uncertainty and WeatherNext 3.', note: 'A discussion of forecasting research; individual predictions still carry uncertainty.' },
  'fusion-control': { videoId: 'GD8EdXuU9Ms', title: 'Can AI solve nuclear fusion?', publisher: 'Lex Clips · Demis Hassabis interview', date: '2022-07-03', type: 'First-person interview', caption: 'How reinforcement learning helped researchers control the shape of plasma.', note: 'Plasma control is one part of fusion research, not a demonstration of commercial fusion power.' }
};
const DISCOVERY_MEDIA_LINKS = {
  'fable-mythos-52-science': {title:'See the electronic prototypes', publisher:'Anthropic · official demonstration and write-up', url:'https://www.anthropic.com/research/claude-electronics-design', note:'Human engineers assembled and tested the devices. These remain prototypes.'}
};
Object.assign(DISCOVERY_MEDIA, RESOURCE_VIDEOS);
const mediaURL = m => `https://www.youtube.com/watch?v=${m.videoId}`;
function videoPoster(id, cinema = false) {
  const m=DISCOVERY_MEDIA[id];if(!m)return '';
  return `<button class="video-poster" data-video="${id}" ${cinema?'data-cinema="true"':''} aria-label="Play ${esc(m.title)}"><img src="https://i.ytimg.com/vi/${m.videoId}/hqdefault.jpg" alt="" loading="lazy" decoding="async"><span class="poster-shade"></span><span class="video-play" aria-hidden="true">▶</span><span class="poster-label">${esc(m.type)}<strong>${esc(m.title)}</strong><small>${esc(m.publisher)}</small></span></button>`;
}
function mediaPanel(d) {
  const m=DISCOVERY_MEDIA[d.id],link=DISCOVERY_MEDIA_LINKS[d.id];
  if(m)return `<section class="entry-media" aria-label="Video context"><p class="media-kicker">WATCH THE DISCOVERY</p><div class="video-slot">${videoPoster(d.id)}</div><p class="media-caption">${esc(m.caption)}</p><p class="media-attribution">${esc(m.publisher)}${m.date ? ` · ${m.date}` : ""}<br>${esc(m.note)}</p><a class="media-fallback" href="${mediaURL(m)}" target="_blank" rel="noopener noreferrer">Watch on YouTube ↗</a><small class="media-privacy">Player loads only when you press Play. Captions available through YouTube where provided.</small></section>`;
  if(link)return `<section class="entry-media"><p class="media-kicker">SEE IT IN ACTION</p><a class="media-demo" href="${link.url}" target="_blank" rel="noopener noreferrer">${esc(link.title)} <span>↗</span></a><p class="media-attribution">${esc(link.publisher)}<br>${esc(link.note)}</p></section>`;
  return '';
}
function stopMediaPlayers() {
  document.querySelectorAll('.video-slot iframe').forEach(frame=>{
    const slot=frame.parentElement,id=frame.dataset.discovery;
    slot.innerHTML=videoPoster(id);bindMedia(slot);
  });
  $('cinema-screen').replaceChildren();
}
function mountVideo(slot,id) {
  const m=DISCOVERY_MEDIA[id];if(!m||!/^[A-Za-z0-9_-]{11}$/.test(m.videoId))return;
  const frame=document.createElement('iframe');
  frame.src=`https://www.youtube-nocookie.com/embed/${m.videoId}?autoplay=1&rel=0&cc_load_policy=1`;
  frame.title=m.title;frame.dataset.discovery=id;
  frame.allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen';
  frame.allowFullscreen=true;frame.referrerPolicy='strict-origin-when-cross-origin';
  slot.replaceChildren(frame);
}
function bindMedia(root=document) {
  root.querySelectorAll('[data-video]').forEach(button=>button.onclick=()=>{
    stop();stopMediaPlayers();
    const id=button.dataset.video,m=DISCOVERY_MEDIA[id];
    if(button.dataset.cinema){
      $('cinema-title').textContent=m.title;
      $('cinema-caption').textContent=`${m.publisher}${m.date ? ` · ${m.date}` : ""} · ${m.note}`;
      $('cinema-link').href=mediaURL(m);
      $('cinema').showModal();mountVideo($('cinema-screen'),id);
    }else mountVideo(button.parentElement,id);
  });
}
function initMedia() {
  $('screening-cards').innerHTML=Object.keys(DISCOVERY_MEDIA).slice(0,3).map((id,i)=>`<article class="screening-card ${i===0?'screening-feature':''}">${videoPoster(id,true)}<div class="screening-copy"><span>${String(i+1).padStart(2,'0')} / ${esc(byId.get(id).field)}</span><p>${esc(DISCOVERY_MEDIA[id].caption)}</p><button data-media-discovery="${id}">Explore this milestone →</button></div></article>`).join('');
  document.querySelectorAll('[data-media-discovery]').forEach(button=>button.onclick=()=>{
    stop();field='All fields';verification='all';query='';year=lastYear;recentOnly=false;mediaOnly=false;tourIndex=-1;
    $('search').value='';$('year').value=year;$('recent').setAttribute('aria-pressed','false');
    render();choose(button.dataset.mediaDiscovery);
    $('detail').scrollIntoView({behavior:reducedMotion()?'auto':'smooth',block:'nearest'});
  });
  $('cinema-close').onclick=()=>$('cinema').close();
  $('cinema').addEventListener('close',()=>{$('cinema-screen').replaceChildren()});
  $('cinema').addEventListener('click',e=>{if(e.target===$('cinema'))$('cinema').close()});
  bindMedia();
}
