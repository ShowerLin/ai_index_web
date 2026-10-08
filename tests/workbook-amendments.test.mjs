import test from 'node:test';
import assert from 'node:assert/strict';
import {workbookAmendments as data} from '../app/workbook-amendments-snapshot.ts';
const near=(a,b)=>assert.ok(Math.abs(a-b)<1e-8,`${a} differs from ${b}`);
const shift=(month,offset)=>{const n=Number(month.slice(0,4))*12+Number(month.slice(5))-1+offset;return `${Math.floor(n/12)}-${String(n%12+1).padStart(2,'0')}`;};
test('demand comparisons preserve gaps and compute YoY from matched source levels',()=>{
 assert.equal(data.demand.length,3);
 for(const series of data.demand){
  const levels=new Map(series.cells.map(p=>[p.month,p.level]));
  for(const p of series.cells){
   const prior=levels.get(shift(p.month,-12));
   if(p.yoy!==null)near(p.yoy,(p.level/prior-1)*100);
   if(p.ttmYoy!==null){const sums=[0,12].map(offset=>Array.from({length:12},(_,i)=>levels.get(shift(p.month,-i-offset))).reduce((s,v)=>{assert.notEqual(v,null);assert.notEqual(v,undefined);return s+v;},0));near(p.ttmYoy,(sums[0]/sums[1]-1)*100);}
  }
 }
 const tsmc=data.demand.find(s=>s.field==='TSMC Monthly Revenue');
 assert.equal(tsmc.cells.find(p=>p.month==='2024-08').yoy,null);
 near(tsmc.cells.find(p=>p.month==='2026-08').yoy,53.320053714712955);
});
test('relative credit separates basket moves from IG market moves on identical dates',()=>{
 for(const group of data.credit){
  const base=group.cells[0];near(base.relativeChange,0);
  for(const p of group.cells){if(p.relativeChange!==null){assert.equal(p.coverage,p.count);near(p.relativeChange,(p.spread-base.spread)-(p.benchmark-base.benchmark));}}
  for(const p of group.cells)if(p.median!==null){assert.ok(p.minimum<=p.median&&p.median<=p.maximum);assert.equal(p.coverage,p.count);} 
 }
 assert.equal(data.metadata.creditAsOf,data.credit[0].cells.at(-1).date);
 const below=data.credit.find(g=>g.name==='Below IG');assert.ok(below.members.includes('IRM'));assert.ok(below.members.includes('9984'));
 assert.ok(!data.credit.find(g=>g.name==='All rated IG').members.includes('IRM'));
});
test('issuer, sector and monthly financing totals reconcile without filling missing months',()=>{
 for(const month of data.bondMonthly){
  near(month.amount,Object.values(month.sectors).reduce((s,v)=>s+v,0));
  const rows=data.bondRows.filter(r=>r.month===month.month);near(month.amount,rows.reduce((s,r)=>s+r.amount,0));
  near(month.issues,rows.reduce((s,r)=>s+(r.issues??0),0));
 }
 assert.ok(data.metadata.bondMissingMonths.includes('2025-12'));
 assert.ok(!data.bondMonthly.some(r=>r.month==='2025-12'));
 near(data.bondSectors.reduce((s,r)=>s+r.amount,0),data.bondIssuers.reduce((s,r)=>s+r.amount,0));
 assert.ok(data.bondRows.filter(r=>r.issuer==='ZENLIN').every(r=>r.sector==='Unclassified'));
 near(data.bondSectors.find(r=>r.sector==='Hyperscalers').amount,298.8302615);
});

test('credit ranges and medians reconcile to latest issuer observations',()=>{
 for(const group of data.credit){
  const values=group.members.map(t=>data.creditIssuers.find(r=>r.ticker===t).spread).sort((a,b)=>a-b);
  const latest=group.cells.at(-1);near(latest.minimum,values[0]);near(latest.maximum,values.at(-1));
  const mid=Math.floor(values.length/2);near(latest.median,values.length%2?values[mid]:(values[mid-1]+values[mid])/2);
 }
});

test('central credit bands preserve quantile ordering and relative baseline',()=>{
 for(const group of data.credit)for(const p of group.cells){
  if(p.median===null)continue;
  assert.ok(p.minimum<=p.q25&&p.q25<=p.median&&p.median<=p.q75&&p.q75<=p.maximum);
  assert.ok(p.relativeMin<=p.relativeQ25&&p.relativeQ25<=p.relativeMedian&&p.relativeMedian<=p.relativeQ75&&p.relativeQ75<=p.relativeMax);
  if(p.date===data.metadata.creditBaseline)near(p.relativeMedian,0);
 }
});
