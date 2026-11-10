const fs = require('fs'), vm = require('vm'), assert = require('assert/strict');
const ctx = {URL};
vm.createContext(ctx);
for (const file of ['data.js', 'resources.js', 'media.js', 'research.js']) vm.runInContext(fs.readFileSync(`dist/${file}`, 'utf8'), ctx);
const report = vm.runInContext(`(() => {
  const ids = new Set(DISCOVERIES.map(d => d.id));
  const types = new Set(['Paper','Code','Dataset','Demo','Video','Background','Research']);
  const errors = [];
  for (const [id, record] of Object.entries(DISCOVERY_RESOURCES)) {
    if (!ids.has(id)) errors.push('Unknown story: '+id);
    const urls = new Set();
    for (const r of record.resources) {
      const u = new URL(r.url);
      if (u.protocol !== 'https:' || !r.title || !r.note || !types.has(r.type)) errors.push('Invalid resource: '+id);
      if (urls.has(r.url)) errors.push('Duplicate supplemental URL: '+id);
      urls.add(r.url);
    }
    if (!record.resources.length && !record.coverageNote) errors.push('Missing coverage explanation: '+id);
  }
  for (const d of DISCOVERIES) {
    if (!DISCOVERY_RESOURCES[d.id]) errors.push('Unreviewed story: '+d.id);
    if (!storyResources(d).length) errors.push('No launching point: '+d.id);
  }
  for (const [id, video] of Object.entries(DISCOVERY_MEDIA)) {
    if (!ids.has(id) || !/^[A-Za-z0-9_-]{11}$/.test(video.videoId)) errors.push('Invalid video mapping: '+id);
  }
  return {errors, stories: ids.size, supplemental: Object.values(DISCOVERY_RESOURCES).reduce((n,r)=>n+r.resources.length,0), links: DISCOVERIES.reduce((n,d)=>n+storyResources(d).length,0), videos: Object.keys(DISCOVERY_MEDIA).length};
})()`, ctx);
assert.equal(report.errors.length, 0, report.errors.join('\n'));
console.log(JSON.stringify(report, null, 2));
