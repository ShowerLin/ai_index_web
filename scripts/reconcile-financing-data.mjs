import {readFileSync} from 'node:fs';import {createHash} from 'node:crypto';import {execFileSync} from 'node:child_process';
const [baselinePath,candidatePath]=process.argv.slice(2);
if(!baselinePath||!candidatePath){console.error('Usage: node scripts/reconcile-financing-data.mjs baseline.json candidate.json');process.exit(1)}
for(const p of [baselinePath,candidatePath])execFileSync(process.execPath,['scripts/validate-financing-data.mjs',p],{stdio:['ignore','pipe','pipe']});
const baseline=JSON.parse(readFileSync(baselinePath)),candidate=JSON.parse(readFileSync(candidatePath));
const report={baselineSha256:createHash('sha256').update(readFileSync(baselinePath)).digest('hex'),baselineCutoff:baseline.informationCutoff,candidateCutoff:candidate.informationCutoff,changes:[],warnings:[]};
for(const collection of ['nodes','flows','sources']){
 const before=new Map(baseline[collection].map(r=>[r.id,r])),after=new Map(candidate[collection].map(r=>[r.id,r]));
 for(const [id,row] of before){if(!after.has(id)){report.changes.push({collection,id,operation:'removed',before:row});report.warnings.push(`Review removal of ${collection}/${id}; retain history for replaced disclosures.`)}else if(JSON.stringify(row)!==JSON.stringify(after.get(id)))report.changes.push({collection,id,operation:'changed',before:row,after:after.get(id)});}
 for(const [id,row] of after)if(!before.has(id))report.changes.push({collection,id,operation:'added',after:row});
}
if(candidate.informationCutoff<baseline.informationCutoff)report.warnings.push('Candidate cutoff precedes baseline cutoff.');
console.log(JSON.stringify(report,null,2));
// Read-only comparison: never writes the candidate into the live dataset.
