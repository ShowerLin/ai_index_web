import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {coreContributionSnapshot as core} from '../app/core-contribution-snapshot.ts';
import {coreContributionSnapshot as previous} from '../data/core-v2.3.ts';
import {tokenActivitySnapshot as activity} from '../app/token-activity-snapshot.ts';

test('core token windows reconcile to cached daily traffic without estimating missing days',()=>{
 const source=JSON.parse(readFileSync(new URL('../data/openrouter-rankings-daily.json',import.meta.url),'utf8'));
 const daily=new Map();for(const row of source.data)daily.set(row.date,(daily.get(row.date)??0)+Number(row.total_tokens));
 for(const window of activity.monthly){
  const start=new Date(`${window.start}T00:00:00Z`),end=new Date(`${window.end}T00:00:00Z`);
  assert.equal((end-start)/86400000,27);assert.equal(start.getUTCDay(),1);assert.equal(end.getUTCDay(),0);
  const days=Array.from({length:28},(_,i)=>new Date(start.getTime()+i*86400000).toISOString().slice(0,10));
  assert.equal(window.openrouterDays,days.filter(d=>daily.has(d)).length);
  if(window.complete)assert.ok(Math.abs(window.openrouter-days.reduce((s,d)=>s+daily.get(d),0)/28/1e12)<1e-10);
  else {assert.equal(window.openrouter,null);assert.equal(window.ramp,null);}
 }
});

test('token source rows and weighted pillar sums exactly reconcile to the core',()=>{
 for(const month of core.months){
  const old=previous.months.find(m=>m.month===month.month);
  const tokens=month.rows.filter(r=>r.ticker.endsWith('TOKEN_VOLUME'));
  assert.equal(tokens.length,2);
  assert.equal(tokens.reduce((s,r)=>s+r.weight,0),.1);
  for(const row of tokens){
   assert.equal(row.baselineCount,15);
   if(row.score!==null)assert.ok(Math.abs(row.growth-Math.log(row.level))<1e-10);
  }
  for(const row of old.rows){
   const next=month.rows.find(r=>r.ticker===row.ticker);
   for(const key of ['growth','level','score','baselineMean','baselineStd'])assert.equal(next[key],row[key]);
  }
  if(month.score!==null){
   const tokenContribution=tokens.reduce((s,r)=>s+r.weight*r.score,0);
   const oldDemand=old.rows.filter(r=>r.pillar==='Demand').reduce((s,r)=>s+r.weight*r.score,0);
   assert.ok(Math.abs(month.score-(old.score-oldDemand/2+tokenContribution))<1e-10);
  }
 }
 const page=readFileSync(new URL('../app/page.tsx',import.meta.url),'utf8');
 assert.match(page,/members\.reduce\(\(s,r\)=>s\+r\.score!\*r\.weight\/\.2,0\)/);
});

test('missing weeks remain source-specific in the fast panel but withhold matched core windows',()=>{
 for(const month of ['2025-06','2025-07'])assert.equal(core.months.find(m=>m.month===month).score,null);
 for(const end of ['2025-06-15','2025-07-20']){
  const week=activity.weekly.find(r=>r.end===end);
  assert.equal(week.openrouterDays,6);assert.equal(week.openrouter,null);assert.notEqual(week.ramp,null);
 }
 assert.equal(activity.partialWeeks.at(-1).openrouterDays,2);
 assert.equal(activity.partialWeeks.at(-1).openrouter,null);
 assert.equal(activity.weekly.at(-1).end,'2026-10-04');
 assert.equal(activity.metadata.rampThrough,'2026-09-27');
 assert.equal(activity.daily.find(r=>r.date==='2025-06-15').dayChange,null);
 assert.equal(activity.daily.find(r=>r.date==='2025-06-16').dayChange,null);
});

test('the production page separates frequency controls, core alignment and source definitions',async()=>{
 const {default:worker}=await import('../dist/server/index.js');
 const response=await worker(new Request('http://localhost/',{headers:{accept:'text/html'}}),{ASSETS:{fetch:async()=>new Response('Not found',{status:404})}},{waitUntil(){},passThroughOnException(){}});
 assert.equal(response.status,200);const html=await response.text();
 for(const text of ['Methodology v2.4','id="token-activity"','Weekly · both sources','Daily · OpenRouter','Monthly core alignment and coverage','OpenRouter token volume','Ramp business token volume'])assert.ok(html.includes(text),text);
});
