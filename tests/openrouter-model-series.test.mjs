import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import ts from 'typescript';
const mod={exports:{}};
const compiled=ts.transpileModule(fs.readFileSync(new URL('../app/openrouter-model-series.ts',import.meta.url),'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText;
new Function('exports',compiled)(mod.exports);
const {buildModelSeries}=mod.exports;
const fixture=()=>({metadata:{start:'2026-11-09',through:'2026-11-16'},models:['a/model','b/model:free'],daily:Array.from({length:8},(_,i)=>({date:`2026-11-${String(9+i).padStart(2,'0')}`,total:200,values:i===1?[[0,100]]:[[0,100],[1,50]]}))});
test('Other preserves suppressed named counts and all tokens reconcile',()=>{
 const view=buildModelSeries(fixture(),{range:'all',frequency:'daily',count:5});
 assert.deepEqual(view.series.map(s=>s.tokens),[800,350,450]);
 assert.equal(view.totalTokens,1600);
 for(const row of view.buckets)assert.ok(Math.abs(row.values.reduce((s,v)=>s+v,0)-row.total)<1e-20);
 assert.equal(view.buckets[1].values[1],0);
 assert.equal(view.buckets[1].values[2],100/1e12);
});
test('Weekly averages exclude edge days and withhold a week with a missing day',()=>{
 const d=fixture(),options={range:'all',frequency:'weekly',count:5};
 const full=buildModelSeries(d,options);
 assert.equal(full.coveredDays,7);assert.equal(full.excludedEdgeDays,0);
 assert.equal(full.start,'2026-11-09');assert.equal(full.end,'2026-11-15');
 assert.equal(full.buckets[0].total,200/1e12);
 assert.equal(full.totalTokens,1400);
 d.daily.splice(1,1);const gap=buildModelSeries(d,options);
 assert.equal(gap.buckets[0].total,null);assert.equal(gap.totalTokens,0);
 assert.equal(gap.coveredDays,0);assert.equal(gap.expectedDays,7);
});
test('Last seven days in weekly mode shows the latest complete calendar week',()=>{
 const view=buildModelSeries(fixture(),{range:'7',frequency:'weekly',count:5});
 assert.equal(view.start,'2026-11-09');assert.equal(view.end,'2026-11-15');
 assert.equal(view.coveredDays,7);assert.equal(view.totalTokens,1400);
});
test('Every selectable view reconciles with the saved aggregate token series',()=>{
 const read=n=>{const text=fs.readFileSync(new URL('../app/'+n,import.meta.url),'utf8');return JSON.parse(text.slice(text.indexOf(' = ')+3,text.lastIndexOf(' as const')));};
 const data=read('openrouter-model-snapshot.ts'),aggregate=read('token-activity-snapshot.ts');
 const totals=new Map(aggregate.daily.map(r=>[r.date,r.openrouter]));
 for(const day of data.daily){assert.ok(Math.abs(day.total/1e12-totals.get(day.date))<1e-10);assert.ok(day.values.reduce((s,[,v])=>s+v,0)<=day.total);}
 for(const range of ['7','30','90','all'])for(const frequency of ['daily','weekly'])for(const count of [5,10]){
  const view=buildModelSeries(data,{range,frequency,count});
  assert.ok(Math.abs(view.series.reduce((s,v)=>s+v.tokens,0)-view.totalTokens)<Math.max(1,view.totalTokens*1e-12));
  for(const row of view.buckets)if(row.values)assert.ok(Math.abs(row.values.reduce((s,v)=>s+v,0)-row.total)<1e-8);
 }
});
