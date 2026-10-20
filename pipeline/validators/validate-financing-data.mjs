import {readFileSync} from 'node:fs';
const path=process.argv[2]||'data/circular-financing.json';
const data=JSON.parse(readFileSync(path,'utf8'));const errors=[];
const check=(ok,msg)=>{if(!ok)errors.push(msg)};
const unique=(rows,label)=>{const ids=rows.map(r=>r.id);check(ids.every(i=>typeof i==='string'&&i.length),'Missing '+label+' id');check(new Set(ids).size===ids.length,'Duplicate '+label+' id');return new Set(ids)};
check(data.schemaVersion==='1.0.0','Unsupported schemaVersion');check(/^\d{4}-\d{2}-\d{2}$/.test(data.informationCutoff),'Invalid information cutoff');
check(data.currency==='USD'&&data.amountUnit==='billion','Dataset units must be USD billions');
const nodes=unique(data.nodes,'node'),flows=unique(data.flows,'flow'),sources=unique(data.sources,'source');
for(const n of data.nodes){check(['company','aggregate_group','composite_group'].includes(n.entityType),n.id+': invalid entityType');check(n.roles.every(r=>['hardware','cloud','lab','project','platform'].includes(r)),n.id+': invalid additional role');check(['hardware','cloud','lab','project','platform'].includes(n.role),n.id+': invalid role');check(n.roles.includes(n.role),n.id+': primary role missing from roles');check([50,850].includes(n.x)&&Number.isFinite(n.y),n.id+': unsupported layout position')}
for(const s of data.sources){check(['regulatory_filing','company_announcement','news_report'].includes(s.sourceType),s.id+': invalid source type');try{check(new URL(s.url).protocol==='https:',s.id+': source must use HTTPS')}catch{errors.push(s.id+': invalid URL')}check(typeof s.archivedFullText==='boolean',s.id+': archive flag required')}
for(const f of data.flows){
 check(['completed','conditional','conditional_equity_incentive','procurement_relationship','contracted','announced_payment_unverified','cancelled','superseded'].includes(f.status),f.id+': invalid status');check(['baseline','proposed','verified','disputed','superseded'].includes(f.reconciliation.status),f.id+': invalid review status');check(['not_assessed','unresolved','disjoint','included_in_aggregate'].includes(f.reconciliation.overlapStatus),f.id+': invalid overlap status');check([null,'typical','maximum','contract_term'].includes(f.time.durationBasis),f.id+': invalid duration basis');
 check(nodes.has(f.from)&&nodes.has(f.to)&&f.from!==f.to,f.id+': invalid endpoints');
 check(['paid','commitment','purchase','guarantee','incentive'].includes(f.kind),f.id+': invalid kind');
 check(f.amount.currency==='USD'&&f.amount.unit==='billion',f.id+': incompatible units');
 check(f.amount.value===null||(Number.isFinite(f.amount.value)&&f.amount.value>=0),f.id+': amount must be null or nonnegative');
 check(['exact','upper_bound','lower_bound','unknown'].includes(f.amount.bound),f.id+': invalid amount bound');
 check((f.amount.value===null)===(f.amount.bound==='unknown'),f.id+': null value must have unknown bound');
 const labelAmount=f.label.match(/\$(\d+(?:\.\d+)?)B/);check(!labelAmount||f.amount.value===null||Math.abs(Number(labelAmount[1])-f.amount.value)<1e-9,f.id+': label amount differs from structured amount');
 check(f.sourceIds.length>0&&f.sourceIds.every(id=>sources.has(id)),f.id+': missing source reference');
 check(typeof f.newsBrief==='string'&&f.newsBrief.length>0&&f.time.label.length>0,f.id+': missing brief or timing');
 check(f.kind!=='paid'||f.status==='completed',f.id+': paid funding must be completed');
 for(const key of ['asOf','announcedAt','effectiveAt','periodStart','periodEnd'])check(f.time[key]===null||/^\d{4}-\d{2}-\d{2}$/.test(f.time[key]),f.id+': invalid '+key);
 check(f.time.durationYears===null||(Number.isFinite(f.time.durationYears)&&f.time.durationYears>0),f.id+': invalid duration');
 check(f.reconciliation.supersedes.every(id=>flows.has(id)),f.id+': dangling supersedes reference');
}
if(errors.length){console.error(errors.join('\n'));process.exit(1)}
console.log(`Valid financing dataset: ${data.nodes.length} nodes, ${data.flows.length} flows, ${data.sources.length} sources; cutoff ${data.informationCutoff}.`);
