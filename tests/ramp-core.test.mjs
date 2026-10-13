import test from 'node:test';
import assert from 'node:assert/strict';
import {coreContributionSnapshot as core} from '../data/core-v2.3.ts';
import {coreContributionSnapshot as previous} from '../data/core-v2.2.ts';
import {rampSnapshot as ramp} from '../app/ramp-snapshot.ts';

test('spending signal compares matched three-month windows, not cumulative dollar growth',()=>{
 const shift=(month,n)=>{const d=new Date(`${month}-01T00:00:00Z`);d.setUTCMonth(d.getUTCMonth()+n);return d.toISOString().slice(0,7);};
 const median=new Map(ramp.monthly.filter(r=>r.month>='2023-09').map(r=>[r.month,r.medianSpend]));
 for(const month of core.months){
  const row=month.rows.find(r=>r.ticker==='RAMP_MEDIAN_SPEND');
  const current=[0,1,2].map(i=>median.get(shift(month.month,-i)));
  const prior=[0,1,2].map(i=>median.get(shift(month.month,-12-i)));
  if(current.concat(prior).some(v=>v===undefined||v===null)){assert.equal(row.growth,null);continue;}
  const expected=(current.reduce((a,b)=>a+b,0)/prior.reduce((a,b)=>a+b,0)-1)*100;
  assert.ok(Math.abs(row.growth-expected)<1e-10);
 }
});

test('Ramp affects only the approved weights and contributions, keeping all other signal scores',()=>{
 for(const month of core.months){
  const old=previous.months.find(r=>r.month===month.month);
  for(const row of old.rows){
   const next=month.rows.find(r=>r.ticker===row.ticker);
   for(const key of ['growth','level','score','baselineMean','baselineStd'])assert.equal(next[key],row[key]);
   if(!['Adoption','Demand'].includes(row.pillar))assert.equal(next.weight,row.weight);
  }
  if(month.score===null||old.score===null)continue;
  const pillar=p=>old.rows.filter(r=>r.pillar===p).reduce((s,r)=>s+r.weight*r.score/.2,0);
  const a=month.rows.find(r=>r.ticker==='RAMP_PAID_ADOPTION');
  const s=month.rows.find(r=>r.ticker==='RAMP_MEDIAN_SPEND');
  const expected=.2/3*(a.score-pillar('Adoption'))+.2/4*(s.score-pillar('Demand'));
  assert.ok(Math.abs((month.score-old.score)-expected)<1e-10);
 }
});

test('Ramp ends in August without extending the headline to an incomplete period',()=>{
 assert.equal(core.metadata.version,'2.3');
 assert.equal(core.metadata.rampBaseline.adoption.count,42);
 assert.equal(core.metadata.rampBaseline.spend.count,20);
 assert.equal(core.months.filter(m=>m.score!==null).at(-1).month,'2026-06');
 const september=core.months.find(m=>m.month==='2026-09');
 for(const ticker of ['RAMP_PAID_ADOPTION','RAMP_MEDIAN_SPEND']){
  const row=september.rows.find(r=>r.ticker===ticker);
  assert.equal(row.level,null);assert.equal(row.score,null);assert.equal(row.contribution,null);
 }
});

test('production page renders both Ramp constituents, the revised score and source disclosure',async()=>{
 const {default:worker}=await import('../dist/server/index.js');
 const response=await worker(new Request('http://localhost/',{headers:{accept:'text/html'}}),
   {ASSETS:{fetch:async()=>new Response('Not found',{status:404})}}, {waitUntil(){},passThroughOnException(){}});
 assert.equal(response.status,200);
 const html=await response.text();
 for(const text of ['Ramp paid business AI adoption','Ramp median AI spend per employee','Paid AI spending intensity','Methodology v2.4','69.7','id="source-S14"','id="ramp-spending"'])assert.ok(html.includes(text),text);
 assert.ok(html.includes('median spending contributes 2.5%')||html.includes('Median spending contributes 2.5%'));
});
