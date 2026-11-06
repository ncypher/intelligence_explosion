const fs=require('fs');const assert=require('assert/strict'),vm=require('vm'),cp=require('child_process');
const read=s=>vm.runInNewContext(s+';({CUTOFF,DISCOVERIES,ERAS:typeof ERAS===\'undefined\'?[]:ERAS})');
const now=read(fs.readFileSync('dist/data.js','utf8')), base=read(cp.execFileSync('git',['show','origin/main:dist/data.js'],{encoding:'utf8'}));
const hero=d=>[90,180].map((n,i)=>d.DISCOVERIES.filter(x=>Date.parse(x.date)>Date.parse(d.CUTOFF)-n*864e5 && Date.parse(x.date)<=Date.parse(d.CUTOFF)-i*90*864e5).length);
assert(now.DISCOVERIES.length >= base.DISCOVERIES.length);
assert.equal(new Set(now.DISCOVERIES.map(d=>d.id)).size,now.DISCOVERIES.length);
for(const d of now.DISCOVERIES){
  for(const key of ['id','title','date','field','summary','aiRole','impact','limit','status','source','url']) assert(d[key], `${d.id}: missing ${key}`);
  assert(Number.isFinite(Date.parse(d.date)) && d.date <= now.CUTOFF);
  assert(d.url.startsWith('https://'));
  assert(['Biology','Mathematics','Materials','Earth & climate','Physics'].includes(d.field));
  for(const id of d.buildsOn) assert(now.DISCOVERIES.some(p=>p.id===id && p.date<=d.date));
}
assert(now.DISCOVERIES.every(d=>['verified','provisional','claimed'].includes(d.verification)));
assert(now.ERAS.every((e,i)=>!i||e.year>now.ERAS[i-1].year));
console.log(JSON.stringify({count:now.DISCOVERIES.length,hero:hero(now),eras:now.ERAS.length,verification:Object.fromEntries(['verified','provisional','claimed'].map(v=>[v,now.DISCOVERIES.filter(d=>d.verification===v).length]))},null,2));
