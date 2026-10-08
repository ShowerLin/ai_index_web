import {mkdirSync,writeFileSync} from 'node:fs';
import {financingLoops} from '../app/circular-financing-data.ts';
import {financingSvg} from '../app/circular-financing-svg.ts';
mkdirSync('public/financing-maps',{recursive:true});
for(const loop of financingLoops)writeFileSync(`public/financing-maps/${loop.id}.svg`,financingSvg(loop));
const width=2220,cellH=720,header=170,height=header+Math.ceil(financingLoops.length/2)*cellH+100;
const esc=s=>s.replace(/[&<>]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;'}[c]));
const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}"><rect width="100%" height="100%" fill="#eef3f7"/><g font-family="Arial,sans-serif" fill="#172d40"><text x="55" y="65" font-size="38" font-weight="bold">AI circular financing · selected disclosed loops</text><text x="55" y="110" font-size="23">Research cutoff: 5 October 2026 · USD · funding, purchases and guarantees have different timing</text><text x="55" y="145" font-size="18">Purple: funding · blue: commercial purchases · amber: contingent support · pink: warrants · dashed: commitment / conditional</text>${financingLoops.map((l,i)=>{const x=40+i%2*1100,y=header+Math.floor(i/2)*cellH;return `<g transform="translate(${x},${y})"><rect width="1060" height="680" rx="18" fill="white"/><text x="25" y="38" font-size="24" font-weight="bold">${esc(l.title)}</text><g transform="translate(0,60)">${financingSvg(l,`export-${i}`).replace('<svg ','<svg width="1060" height="600" ')}</g></g>`}).join('')}<text x="55" y="${height-45}" font-size="20">No aggregate funding total: loops overlap. Diagrams show disclosed relationships, not proof of unreliable revenue. Full sources and estimates: dashboard.</text></g></svg>`;
writeFileSync('public/circular-financing-map.svg',svg);
console.log(`Exported ${financingLoops.length} dated diagrams and complete map.`);

const csvCell=value=>'"'+String(value).replace(/"/g,'""')+'"';
const ledger=[['Research cutoff','Loop','From','To','Kind','Amount / obligation','Timing','Explanation','Source'],...financingLoops.flatMap(l=>l.flows.map(f=>['2026-10-05',l.title,l.nodes[f.from],l.nodes[f.to],f.kind,f.label,f.date,f.note,f.url]))];
writeFileSync('public/financing-edge-ledger.csv',ledger.map(row=>row.map(csvCell).join(',')).join('\n')+'\n');
