const {chromium}=require('playwright');const fs=require('fs'),assert=require('assert/strict');
(async()=>{const b=await chromium.launch({channel: 'chromium'});const errors=[];fs.mkdirSync('docs/screenshots/2026-10-29',{recursive:true});
for(const width of [1440,390]){const p=await b.newPage({viewport:{width,height:1000},reducedMotion:'reduce'});p.on('pageerror',e=>errors.push(e.message));p.on('console',m=>{if(m.type()==='error') errors.push(m.text())});await p.goto('http://127.0.0.1:8000');await p.evaluate(()=>document.fonts.ready);
assert.equal(await p.locator('#stat-recent').textContent(),'22');assert.equal(await p.locator('#stat-before').textContent(),'3');assert.equal(await p.locator('.plot-point').count(),63);
await p.screenshot({path:`docs/screenshots/2026-10-29/linear-${width}.png`,fullPage:true});
await p.selectOption('#axis','log');assert.equal(await p.locator('.era-band').count(),18);await p.screenshot({path:`docs/screenshots/2026-10-29/log-full-${width}.png`,fullPage:true});
await p.locator('#dive').fill('100');await p.waitForFunction(()=>document.querySelector('#dive-label').textContent==='2020 → now');await p.screenshot({path:`docs/screenshots/2026-10-29/log-2020-${width}.png`,fullPage:true});
await p.click('#list-tab');await p.screenshot({path:`docs/screenshots/2026-10-29/reading-${width}.png`,fullPage:true});
for(const [v,n] of [['claimed',6],['provisional',22],['verified',35],['all',63]]){await p.click(`[data-verification="${v}"]`);assert.equal(await p.locator('#list .row').count(),n)}
await p.fill('#search','Printing press');assert.equal(await p.locator('#list .row').count(),0);await p.fill('#search','');await p.click('#tree-tab');assert.equal(await p.locator('.leaf .evidence.claimed').count(),6);assert.equal(await p.locator('.evidence.claimed').first().evaluate(e=>getComputedStyle(e).animationName),'none');assert(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));await p.close();}
assert.deepEqual(errors,[]);console.log('1440 / 390: data, filters, tree, reading, log zoom, search isolation, reduced motion, overflow and console checks passed');await b.close()})().catch(e=>{console.error(e);process.exit(1)});
