import fs from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import {Workbook,SpreadsheetFile} from '@oai/artifact-tool';
const root=(process.env.AI_INDEX_DATA_ROOT??fileURLToPath(new URL('../../',import.meta.url))).replaceAll('\\','/').replace(/\/$/,'');
await fs.mkdir(`${root}/tmp/monetization`,{recursive:true});
const data=JSON.parse(await fs.readFile(`${root}/data/derived/monetization/snapshot.json`,'utf8'));
const wb=Workbook.create();
function sheet(name,rows){const sh=wb.worksheets.add(name);const n=Math.max(...rows.map(r=>r.length));sh.getRangeByIndexes(0,0,rows.length,n).values=rows.map(r=>Array.from({length:n},(_,i)=>r[i]??null));const all=sh.getUsedRange();all.format.font.name='Arial';all.format.font.size=10;all.format.columnWidth=22;all.format.rowHeight=25;all.format.verticalAlignment='center';sh.showGridLines=false;sh.getRangeByIndexes(0,0,1,n).format.fill='#18364b';sh.getRangeByIndexes(0,0,1,n).format.font.color='#FFFFFF';sh.getRangeByIndexes(0,0,1,n).format.font.bold=true;sh.getRangeByIndexes(0,0,1,n).format.wrapText=true;sh.getRangeByIndexes(0,0,1,n).format.rowHeight=40;sh.freezePanes.freezeRows(1);return sh;}
const sum=sheet('Monetization',[
 ['Monetization','Market cap (USD bn)','Latest reported BQ revenue (USD mn)','Revenue date','Market cap date','Forward P/S'],
 ...data.publicCompanies.map(c=>[c.name,null,null,new Date(c.latestReportedRevenue.date),new Date(c.latestMarketCap.date),'Pending annual denominator']),
 [],['Basis','Reported through June 2026; estimates from September 2026.'],
 ['Revenue','Bloomberg BQ observations; no annual totals or ARR conversion.'],
 ['P/S','Annual forward revenue needs confirmation before calculating forward P/S.'],
 ['Refresh','Rebuild from AI_Monetization.xlsx after saving updated Bloomberg values.'],
 ['Source','AI_Monetization.xlsx / Public Value; USD amounts converted to millions or billions for display.'],
 ['Index','Supplementary Monetization evidence; no index weight changes.']
]);sum.getRange('B5:F10').format.wrapText=true;sum.getRange('A5:F10').format.rowHeight=88;sum.getRange('D2:E3').setNumberFormat('yyyy-mm-dd');sum.getRange('B2:C3').setNumberFormat('#,##0.0');sum.getRange('F1:F3').format.columnWidth=28;
let offset=2;const sourceRows=[['Company','Date','Revenue status','Revenue (USD)','Market cap (USD)','Revenue source cell','Market cap source cell']];
for(const c of data.publicCompanies){for(const r of c.history)sourceRows.push([c.name,new Date(r.date),r.revenueStatus,r.revenueUsd,r.marketCapUsd,r.revenueCell,r.marketCapCell]);}
const raw=sheet('Saved Inputs',sourceRows);raw.getRange(`B2:B${sourceRows.length}`).setNumberFormat('yyyy-mm-dd');raw.getRange(`D2:E${sourceRows.length}`).setNumberFormat('#,##0');raw.getRange(`F1:G${sourceRows.length}`).format.columnWidth=31;
for(let ci=0;ci<data.publicCompanies.length;ci++){
 const c=data.publicCompanies[ci],start=offset,rows=[['Date','Revenue basis','Revenue (USD mn)','YoY, same BQ basis','Market cap (USD bn)','Reported (USD mn)','Estimate (USD mn)']];
 for(const r of c.history)rows.push([r.date,r.revenueStatus]);
 const sh=sheet(c.name,rows);sh.getRange(`C2:G${rows.length}`).setNumberFormat('#,##0.0;(#,##0.0);"-"');sh.getRange(`D2:D${rows.length}`).setNumberFormat('0.0%');
 for(let j=0;j<c.history.length;j++){
  const r=c.history[j],n=j+2,s=start+j;
  sh.getRange(`C${n}`).formulas=[[`=IF(ISNUMBER('Saved Inputs'!D${s}),'Saved Inputs'!D${s}/1000000,"")`]];
  sh.getRange(`E${n}`).formulas=[[`=IF(ISNUMBER('Saved Inputs'!E${s}),'Saved Inputs'!E${s}/1000000000,"")`]];
  const old=c.history.findIndex(x=>x.date===(Number(r.date.slice(0,4))-1)+r.date.slice(4));
  if(old>=0)sh.getRange(`D${n}`).formulas=[[`=IF(AND(ISNUMBER(C${n}),ISNUMBER(C${old+2}),C${old+2}>0),C${n}/C${old+2}-1,"")`]];
  sh.getRange(`F${n}`).formulas=[[`=IF(AND(B${n}="Reported",ISNUMBER(C${n})),C${n},"")`]];
  sh.getRange(`G${n}`).formulas=[[`=IF(AND(B${n}="Estimate",ISNUMBER(C${n})),C${n},"")`]];
 }
 const lastReported=c.history.findIndex(r=>r.date===c.latestReportedRevenue.date)+2,lastCap=c.history.findIndex(r=>r.date===c.latestMarketCap.date)+2;
 sum.getRange(`B${ci+2}`).formulas=[[`='${c.name}'!E${lastCap}`]];sum.getRange(`C${ci+2}`).formulas=[[`='${c.name}'!C${lastReported}`]];
 const chart=sh.charts.add('line',[sh.getRange(`A1:A${rows.length}`),sh.getRange(`F1:F${rows.length}`),sh.getRange(`G1:G${rows.length}`)]);chart.title=`${c.name} revenue (USD mn)`;chart.setPosition('I2','S16');chart.yAxis={numberFormatCode:'#,##0',numberFormatSourceLinked:false};chart.series.items[0].line={fill:'#185e87',style:'solid',width:2};chart.series.items[1].line={fill:'#bd782c',style:'dashed',width:2};
 const cap=sh.charts.add('line',[sh.getRange(`A1:A${rows.length}`),sh.getRange(`E1:E${rows.length}`)]);cap.title=`${c.name} market cap (USD bn)`;cap.setPosition('I18','S32');cap.yAxis={numberFormatCode:'0.0',numberFormatSourceLinked:false};
 offset+=c.history.length;
}
sheet('Private Labs',[['Company','Annualized revenue (USD bn)','Revenue definition','Revenue observation date','Latest closed valuation (USD bn)','Valuation date','Revenue confidence'],...data.privateLabs.map(l=>[l.company,l.latestAnnualizedRevenue['Annualized revenue (USD)']/1e9,l.latestAnnualizedRevenue['Annualized revenue type'],l.latestAnnualizedRevenue.Date,l.latestClosedValuation['Valuation (post-money)']/1e9,l.latestClosedValuation['Close date'],l.latestAnnualizedRevenue.Confidence]),[],['Note','Different observation dates; private valuations and ARR/run rate are not public forward P/S.']]);
wb.worksheets.getItem('Private Labs').getUsedRange().format.wrapText=true;wb.worksheets.getItem('Private Labs').getUsedRange().format.rowHeight=85;
wb.recalculate();
const original=raw.getRange('D6').values[0][0],expected=sum.getRange('C2').values[0][0];
raw.getRange('D6').values=[[original*2]];wb.recalculate();
if(Math.abs(sum.getRange('C2').values[0][0]-expected*2)>1e-8)throw Error('Summary formula propagation failed');
raw.getRange('D6').values=[[original]];wb.recalculate();
const errors=await wb.inspect({kind:'match',searchTerm:'#REF!|#DIV/0!|#VALUE!|#NUM!',options:{useRegex:true,maxResults:20},maxChars:1000});console.log(errors.ndjson);
const out=`${root}/outputs/monetization`;await fs.mkdir(out,{recursive:true});
for(const name of ['Monetization','Z.AI','MiniMax','Saved Inputs','Private Labs']){
 const blob=await wb.render({sheetName:name,range:['Z.AI','MiniMax'].includes(name)?'A1:S17':name==='Monetization'?'A1:F10':'A1:G5',scale:1.2});await fs.writeFile(`${root}/tmp/monetization/review_${name}.png`,new Uint8Array(await blob.arrayBuffer()));
}
await (await SpreadsheetFile.exportXlsx(wb)).save(`${out}/AI_Monetization_Analysis.xlsx`);
