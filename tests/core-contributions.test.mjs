import test from 'node:test';
import {readFileSync} from 'node:fs';
import assert from 'node:assert/strict';
import {coreContributionSnapshot as snapshot} from '../app/core-contribution-snapshot.ts';
import {monthlyHeatmapSnapshot as macro} from '../app/monthly-heatmap-snapshot.ts';
test('revised contribution source matches heatmap and reconciles without reweighting',()=>{
 assert.equal(snapshot.metadata.sourceSha256,macro.metadata.sourceSha256);
 for(const month of snapshot.months){
  assert.equal(month.rows.length,14);
  assert.ok(Math.abs(month.rows.reduce((sum,r)=>sum+r.weight,0)-1)<1e-12);
  if(month.score!==null){
   assert.ok(Math.abs(50+month.rows.reduce((sum,r)=>sum+r.contribution,0)-month.score)<1e-10);
   for(const row of month.rows) assert.ok(row.score>=0&&row.score<=100);
  }
 }
});
test('monthly impacts reconcile and held quarterly scores do not invent monthly movement',()=>{
 for(let i=1;i<snapshot.months.length;i++){
  const current=snapshot.months[i],prior=snapshot.months[i-1];
  if(current.score===null||prior.score===null)continue;
  const delta=current.rows.reduce((s,r)=>s+r.contribution-prior.rows.find(p=>p.ticker===r.ticker).contribution,0);
  assert.ok(Math.abs(delta-(current.score-prior.score))<1e-10);
  if(!['01','04','07','10'].includes(current.month.slice(5)))for(const row of current.rows.filter(r=>r.pillar==='Hyperscaler CapEx'))assert.equal(row.score,prior.rows.find(r=>r.ticker===row.ticker).score);
 }
});

test('v2 normalizes adoption levels and smoothed annual activity using disclosed baselines',()=>{
 assert.equal(snapshot.metadata.version,'2.2');
 const latest=snapshot.months.find(m=>m.month==='2026-06');
 assert.ok(Math.abs(latest.score-69.30016945142992)<1e-10);
 for(const row of latest.rows){
  assert.ok(Math.abs(row.score-Math.max(0,Math.min(100,50+15*(row.growth-row.baselineMean)/row.baselineStd)))<1e-10);
  if(row.pillar==='Adoption')assert.equal(row.growth,row.level);
  if(row.pillar==='Hyperscaler CapEx'){assert.equal(row.treatment,'Combined trailing 4Q YoY growth (%)');assert.equal(row.baselineCount,7);}
 }
 for(const pillar of ['Adoption','Demand','Investment','Imports','Hyperscaler CapEx'])assert.ok(Math.abs(latest.rows.filter(r=>r.pillar===pillar).reduce((s,r)=>s+r.weight,0)-.2)<1e-12);
});

test('CapEx pillar computes YoY from combined spending rather than averaged company growth',()=>{
 const page=readFileSync(new URL('../app/page.tsx',import.meta.url),'utf8');
 const block=page.split('const capexHistory = [')[1].split('] as const;')[0];
 const quarters=[...block.matchAll(/\{q:"(\d{4}Q[1-4])",([^}]+)\}/g)].map(match=>({quarter:match[1],total:[...match[2].matchAll(/(?:Microsoft|Alphabet|Meta|Amazon|Oracle):([\d.]+)/g)].reduce((sum,m)=>sum+Number(m[1]),0)}));
 for(let i=7;i<quarters.length;i++){
  const total=(start,end)=>quarters.slice(start,end).reduce((sum,r)=>sum+r.total,0);
  const expected=(total(i-3,i+1)/total(i-7,i-3)-1)*100;
  const month=quarters[i].quarter.slice(0,4)+'-'+String(Number(quarters[i].quarter.slice(-1))*3).padStart(2,'0');
  const rows=snapshot.months.find(r=>r.month===month).rows.filter(r=>r.pillar==='Hyperscaler CapEx');
  assert.equal(rows.length,1);assert.equal(rows[0].weight,.2);
  assert.ok(Math.abs(rows[0].growth-expected)<1e-10);
 }
 const latest=snapshot.months.find(m=>m.month==='2026-06');
 assert.equal(latest.companyCapexRows.length,5);
 assert.ok(Math.abs(latest.rows.find(r=>r.pillar==='Hyperscaler CapEx').growth-latest.companyCapexRows.reduce((sum,r)=>sum+r.growth,0)/5)>1);
});

test('v2.2 Demand has three equal constituents and no missing-weight redistribution',()=>{
 for(const month of snapshot.months){
  const rows=month.rows.filter(r=>r.pillar==='Demand');
  assert.deepEqual(rows.map(r=>r.ticker),['KOTCDRAM','KOTCNAND','TSMC_REVENUE']);
  for(const r of rows)assert.equal(r.weight,.2/3);
  if(rows.some(r=>r.score===null))assert.equal(month.score,null);
 }
 const june=snapshot.months.find(m=>m.month==='2026-06').rows.filter(r=>r.pillar==='Demand');
 assert.ok(Math.abs(june.reduce((s,r)=>s+r.score,0)/3-71.82215666396049)<1e-8);
 assert.equal(june.find(r=>r.ticker==='TSMC_REVENUE').baselineCount,19);
});

test('later available observations remain visible without inventing a complete core',()=>{
 const august=snapshot.months.find(m=>m.month==='2026-08');
 assert.ok(august);
 for(const ticker of ['KOTCDRAM','KOTCNAND','TSMC_REVENUE'])assert.notEqual(august.rows.find(r=>r.ticker===ticker).score,null);
 assert.equal(august.rows.find(r=>r.ticker==='HYPERSCALER_TOTAL').score,null);
 assert.equal(august.score,null);
 const june=snapshot.months.find(m=>m.month==='2026-06');
 for(const r of august.rows)assert.equal(r.baselineMean,june.rows.find(p=>p.ticker===r.ticker).baselineMean);
});
