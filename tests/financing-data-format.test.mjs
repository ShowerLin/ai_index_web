import test from 'node:test';import assert from 'node:assert/strict';import {readFileSync,mkdtempSync,writeFileSync,rmSync} from 'node:fs';import {tmpdir} from 'node:os';import {join} from 'node:path';import {spawnSync} from 'node:child_process';
const baseline='data/circular-financing.json';
const run=(script,...args)=>spawnSync(process.execPath,[script,...args],{encoding:'utf8'});
test('canonical graph validates and unchanged reconciliation yields no changes',()=>{
 assert.equal(run('scripts/validate-financing-data.mjs',baseline).status,0);
 const result=run('scripts/reconcile-financing-data.mjs',baseline,baseline);assert.equal(result.status,0);assert.equal(JSON.parse(result.stdout).changes.length,0);
});
test('reconciliation identifies a material edit without altering baseline; invalid references rejected',()=>{
 const dir=mkdtempSync(join(tmpdir(),'financing-format-')),file=join(dir,'candidate.json');const original=readFileSync(baseline,'utf8');
 try{const data=JSON.parse(original);data.flows[0].amount.value=51;data.flows[0].label='$51B equity investment paid';writeFileSync(file,JSON.stringify(data));
 const result=run('scripts/reconcile-financing-data.mjs',baseline,file);assert.equal(result.status,0);const report=JSON.parse(result.stdout);assert.equal(report.changes.length,1);assert.equal(report.changes[0].before.amount.value,50);assert.equal(report.changes[0].after.amount.value,51);assert.equal(readFileSync(baseline,'utf8'),original);
 data.flows[0].sourceIds=['missing-source'];writeFileSync(file,JSON.stringify(data));const invalid=run('scripts/validate-financing-data.mjs',file);assert.equal(invalid.status,1);assert.match(invalid.stderr,/missing source reference/);
 }finally{rmSync(dir,{recursive:true,force:true})}
});
