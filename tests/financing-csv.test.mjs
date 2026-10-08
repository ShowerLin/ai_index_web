import test from 'node:test';import assert from 'node:assert/strict';import {mkdtempSync,readFileSync,rmSync,writeFileSync} from 'node:fs';import {tmpdir} from 'node:os';import {join} from 'node:path';import {spawnSync} from 'node:child_process';
const script='scripts/financing-csv.py';const baseline='data/circular-financing.json';
const run=(...args)=>spawnSync('python3',[script,...args],{encoding:'utf8'});
test('CSV round-trip is lossless; quoted multiline briefs survive; live JSON cannot be overwritten',()=>{
 const dir=mkdtempSync(join(tmpdir(),'financing-csv-')),folder=join(dir,'csv'),out=join(dir,'candidate.json');
 try{const source=JSON.parse(readFileSync(baseline));source.flows[0].newsBrief='A quoted "brief", with commas\nand a second line.';const input=join(dir,'input.json');writeFileSync(input,JSON.stringify(source));
 assert.equal(run('export','--json',input,'--folder',folder).status,0);
 const imported=run('import','--folder',folder,'--json',out,'--node',process.execPath);assert.equal(imported.status,0,imported.stderr);assert.deepEqual(JSON.parse(readFileSync(out)),source);
 assert.equal(run('import','--folder',folder,'--json',out,'--node',process.execPath).status,1);
 assert.equal(run('import','--folder',folder,'--json',baseline,'--node',process.execPath).status,1);
 }finally{rmSync(dir,{recursive:true,force:true})}
});
