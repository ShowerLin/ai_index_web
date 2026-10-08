import test from 'node:test';import assert from 'node:assert/strict';
import {summarizeNode} from '../app/financing-node-summary.ts';
const edge=(from,to,kind,amount,label='Funding')=>({from,to,kind,amount,label});
test('node summaries separate direction and selected visible categories',()=>{
 const edges=[edge('aws','oai','paid',50),edge('aws','anth','paid',18),edge('oai','aws','purchase',100)];
 assert.equal(summarizeNode(edges,'aws','out')[0].value,'$68B');
 assert.equal(summarizeNode(edges,'aws','in')[0].value,'$100B');
 assert.equal(summarizeNode(edges.filter(e=>e.kind==='paid'),'aws','in').length,0);
 assert.equal(summarizeNode(edges.filter(e=>e.to==='oai'),'aws','out')[0].value,'$50B');
});
test('unknown, bounded amounts and overlapping support are never treated as exact cash totals',()=>{
 assert.equal(summarizeNode([edge('a','b','purchase',100,'>$100B'),edge('c','b','purchase',null)],'b','in')[0].value,'>$100B + ?');
 assert.equal(summarizeNode([edge('a','b','commitment',10,'Up to $10B'),edge('c','b','commitment',5,'Up to $5B')],'b','in')[0].value,'≤$15B');
 assert.equal(summarizeNode([edge('a','b','guarantee',36),edge('a','c','guarantee',6.3)],'a','out')[0].value,'2 supports');
 assert.equal(summarizeNode([edge('a','b','incentive',null)],'a','out')[0].value,'1 warrant');
});
