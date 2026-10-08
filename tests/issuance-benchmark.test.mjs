import test from 'node:test';
import assert from 'node:assert/strict';
import {workbookAmendments as data} from '../app/workbook-amendments-snapshot.ts';
const near=(a,b)=>assert.ok(Math.abs(a-b)<1e-8);
test('issuance ratio reconciles issuer records and USD billion benchmark amounts',()=>{
 for(const r of data.bondBenchmark.monthly){
  const records=data.bondRows.filter(b=>b.month===r.month);
  if(records.length)near(r.coveredAmount,records.reduce((s,b)=>s+b.amount,0));else assert.equal(r.coveredAmount,null);
  if(r.relativeSupplyPct!==null)near(r.relativeSupplyPct,r.coveredAmount/r.usIgAmount*100);
 }
 const march=data.bondBenchmark.monthly.find(r=>r.month==='2026-03');
 near(march.usIgAmount,270.22969523);near(march.coveredAmount,97.8996087);near(march.relativeSupplyPct,36.22829408761866);
});
test('missing numerator and partial benchmark-only months do not become zero shares',()=>{
 for(const month of ['2025-12','2026-10']){
  const r=data.bondBenchmark.monthly.find(r=>r.month===month);assert.ok(r.usIgAmount>0);assert.equal(r.coveredAmount,null);assert.equal(r.relativeSupplyPct,null);
 }
 const [start,end]=data.metadata.bondWindow.split(' through ');
 const matched=data.bondBenchmark.monthly.filter(r=>r.month>=start&&r.month<=end&&r.relativeSupplyPct!==null);
 assert.equal(matched.length,11);
 near(data.bondBenchmark.matchedWindowRatio,matched.reduce((s,r)=>s+r.coveredAmount,0)/matched.reduce((s,r)=>s+r.usIgAmount,0)*100);
 assert.match(data.bondBenchmark.interpretation,/not a strict share/);
});
