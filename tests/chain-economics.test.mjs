import test from 'node:test';
import assert from 'node:assert/strict';
import {chainShares} from '../app/chain-economics.ts';
const c=(currency,revenue,ebitda)=>({currency,periods:[{period:'2026-03-31',revenue,ebitda,sourceRange:'A1'}]});
test('shares use same currency, available amounts and signed EBITDA',()=>{
 const companies={A:c('USD',100,40),B:c('USD',300,-10),C:c('TWD',10000,1000),D:c('USD',null,null)};
 const r=chainShares(companies,'2026-03-31','USD','revenue');assert.equal(r.total,400);assert.equal(r.count,2);assert.equal(r.rows[0].share,25);assert.equal(r.rows[2].share,null);assert.equal(r.rows[3].share,null);
 const e=chainShares(companies,'2026-03-31','USD','ebitda');assert.equal(e.total,30);assert.ok(e.rows[1].share<0);assert.ok(Math.abs(e.rows.reduce((s,r)=>s+(r.share??0),0)-100)<1e-10);
});
test('nonpositive or missing denominator has no share',()=>{assert.equal(chainShares({A:c('USD',0,-1)},'2026-03-31','USD','ebitda').rows[0].share,null);assert.equal(chainShares({A:c('USD',1,1)},'2026-06-30','USD','revenue').count,0)});
