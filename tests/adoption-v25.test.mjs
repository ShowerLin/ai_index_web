import test from 'node:test';
import assert from 'node:assert/strict';
import {coreContributionSnapshot as core} from '../app/core-contribution-snapshot.ts';
import {adoptionPriceSnapshot as prices} from '../app/adoption-price-snapshot.ts';
import {tokenActivitySnapshot as tokens} from '../app/token-activity-snapshot.ts';

test('v2.7 keeps five equal pillars and scores adoption from two spending-growth signals',()=>{
 assert.equal(core.metadata.version,'2.7');
 for(const month of core.months){
  for(const pillar of ['Adoption','Demand','Investment','Imports','Hyperscaler CapEx'])assert.ok(Math.abs(month.rows.filter(r=>r.pillar===pillar).reduce((s,r)=>s+r.weight,0)-.2)<1e-12);
  assert.deepEqual(month.rows.filter(r=>r.pillar==='Adoption').map(r=>r.weight),[.1,.1]);
  assert.equal(month.contextRows.length,3);assert.ok(month.contextRows.every(r=>r.weight===0));
  if(month.score!==null)assert.ok(Math.abs(month.score-50-month.rows.reduce((s,r)=>s+r.contribution,0))<1e-10);
  const window=tokens.monthly.find(r=>r.month===month.month);
  const observation=prices.spendingMonthly.find(r=>r.month===month.month);
  for(const row of month.rows.filter(r=>r.pillar==='Adoption')){
   const prefix=row.ticker.startsWith('RAMP')?'ramp':'openrouter';
   assert.equal(row.growth,observation[prefix+'SpendingGrowth']);
   if(row.growth!==null)assert.ok(Math.abs(row.growth-row.volumeGrowth-row.priceChange-row.interaction)<1e-8);
  }
 }
 for(const month of ['2025-06','2025-07'])assert.equal(core.months.find(r=>r.month===month).score,null);
});

test('weighted price data preserves daily values and uses ratio of matched totals',()=>{
 assert.equal(prices.metadata.coreWeight,0);
 assert.equal(prices.siliconDaily.length,324);
 for(const month of prices.siliconMonthly){
  const rows=prices.siliconDaily.filter(r=>r.date.startsWith(month.month));
  assert.equal(month.days,rows.length);
  assert.ok(Math.abs(month.value-rows.reduce((s,r)=>s+r.value,0)/rows.length)<1e-12);
 }
 assert.equal(prices.siliconMonthly.at(-1).complete,false);
 for(const row of prices.rampWeekly){
  assert.ok(row.coverage>=0&&row.coverage<=1);
  if(row.value!==null)assert.ok(Math.abs(row.value-row.spendUsd/row.tokens*1e6)<1e-12);
 }
});

test('production adoption section includes volume, price and zero-weight breadth',async()=>{
 const {default:worker}=await import('../dist/server/index.js');
 const response=await worker(new Request('http://localhost/',{headers:{accept:'text/html'}}),{ASSETS:{fetch:async()=>new Response('Not found',{status:404})}},{waitUntil(){},passThroughOnException(){}});
 assert.equal(response.status,200);const html=await response.text();
 const adoption=html.slice(html.indexOf('id="adoption"'),html.indexOf('id="imports"'));
 for(const text of ['Adoption volume','Token prices and effective cost','SDLLMTK','zero score weight','95% coverage'])assert.ok(adoption.includes(text),text);
 assert.equal((html.match(/id="token-activity"/g)||[]).length,1);
 assert.ok(html.includes('Methodology v2.7'));
 assert.ok(!html.includes('Token volume receives half of Demand'));
});
