const fs=require('fs');const assert=require('assert/strict'),vm=require('vm'),cp=require('child_process');
const read=s=>vm.runInNewContext(s+';({CUTOFF,DISCOVERIES,ERAS:typeof ERAS===\'undefined\'?[]:ERAS})');
const now=read(fs.readFileSync('dist/data.js','utf8')), base=read(cp.execFileSync('git',['show','origin/main:dist/data.js'],{encoding:'utf8'}));
const hero=d=>[90,180].map((n,i)=>d.DISCOVERIES.filter(x=>Date.parse(x.date)>Date.parse(d.CUTOFF)-n*864e5 && Date.parse(x.date)<=Date.parse(d.CUTOFF)-i*90*864e5).length);
assert.equal(now.DISCOVERIES.length,63);assert.deepEqual(hero(now),[22,3]);assert.deepEqual(hero(now),hero(base));
assert(now.DISCOVERIES.every(d=>['verified','provisional','claimed'].includes(d.verification)));
assert(now.ERAS.every((e,i)=>!i||e.year>now.ERAS[i-1].year));
console.log(JSON.stringify({count:63,hero:hero(now),eras:now.ERAS.length,verification:Object.fromEntries(['verified','provisional','claimed'].map(v=>[v,now.DISCOVERIES.filter(d=>d.verification===v).length]))},null,2));
