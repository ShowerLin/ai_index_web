import test from 'node:test';
import assert from 'node:assert/strict';
import {financingLoops,financingSensitivity} from '../app/circular-financing-data.ts';
import {financingSvg} from '../app/circular-financing-svg.ts';
test('baseline stress calculations preserve financing boundaries',()=>{
 const [paid,broad,aws]=financingSensitivity(.35,.25,3);
 assert.ok(Math.abs(paid.stress-2/3*.35*.25)<1e-10);
 assert.ok(Math.abs(broad.stress-1.225)<1e-10);
 assert.ok(Math.abs(aws.stress-.704375)<1e-10);
 assert.ok(Math.abs(aws.percent-.474633433)<1e-6);
 assert.equal(financingSensitivity(0,.25,3).every(r=>r.stress===0),true);
 assert.equal(financingSensitivity(.35,0,3).every(r=>r.stress===0),true);
});
test('every financing loop has dated directed evidence and readable exported labels',()=>{
 assert.equal(new Set(financingLoops.map(l=>l.id)).size,financingLoops.length);
 for(const l of financingLoops){const svg=financingSvg(l);assert.match(svg,/<title/);assert.match(svg,/5 Oct 2026/);for(const f of l.flows){assert.ok(l.nodes[f.from]&&l.nodes[f.to]);assert.notEqual(f.from,f.to);assert.match(f.url,/^https:\/\//);assert.ok(f.date.length>0);assert.ok(svg.includes(f.label.split(' ')[0].replace(/>/g,'&gt;')));}}
 const amazon=financingLoops.find(l=>l.id==='amazon-anthropic');
 assert.equal(amazon.flows.filter(f=>f.kind==='paid').length,1);
 assert.match(amazon.flows.find(f=>f.kind==='commitment').label,/15B/);
});
