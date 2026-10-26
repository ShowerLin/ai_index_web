import fs from 'node:fs/promises';
import {Workbook,SpreadsheetFile} from '@oai/artifact-tool';
const rows=[];
function add(company,date,value,basis,status,event,source,url,note=''){rows.push({company,date,valueUsd:value*1e9,basis,status,event,source,url,note,reviewed:'2026-10-22'});}
add('OpenAI','2024-02-16',80,'Secondary equity','Completed reported','Employee tender','Reuters / NYT','https://www.investing.com/news/stock-market-news/openai-valued-at-80-billion-after-deal-nyt-reports-3306784','At least $80B; date is report date, exact closing date unavailable.');
add('OpenAI','2024-10-02',157,'Post-money','Completed confirmed','Funding round','OpenAI','https://openai.com/index/scale-the-benefits-of-ai/');
add('OpenAI','2025-03-31',300,'Post-money','Announced confirmed','Funding round','OpenAI','https://openai.com/index/march-funding-updates/','Announcement; not an assertion that every commitment was funded on this date.');
add('OpenAI','2025-10-02',500,'Secondary equity','Completed reported','Employee share sale','AP','https://apnews.com/article/53dffc56355460a232439c76d1ccf22b','Report date; exact closing date unavailable.');
add('OpenAI','2026-03-31',852,'Post-money','Completed confirmed','Funding round final close','OpenAI','https://openai.com/index/accelerating-the-next-phase-ai/','Final round; February announcement not counted again.');
add('OpenAI','2026-09-15',1200,'Unspecified','Rumored','Prospective funding','Reuters / FT','https://www.marketscreener.com/news/openai-mulls-funding-round-at-1-2-trillion-valuation-ahead-of-ipo-ft-reports-ce785bd2d98bf621','Earlier stage of current financing discussions; not a completed round.');
add('OpenAI','2026-09-29',1400,'Pre-money','Rumored','Prospective funding','Reuters / Bloomberg','https://www.marketscreener.com/news/openai-targets-30-billion-funding-at-1-4-trillion-valuation-bloomberg-news-reports-ce785addd08eff25','About $1.4T excluding at least $30B new funding; no post-money inference.');
add('OpenAI','2026-10-19',1400,'Unspecified','Rumored','Prospective funding update','Reuters','https://www.marketscreener.com/news/openai-seeks-to-accelerate-fundraising-ahead-of-anthropic-ipo-sources-say-ce785cdbdf8cf321','Over $1.4T; lower-bound plot value. Latest update to same financing discussions, not a new round.');
add('Anthropic','2024-03-27',18.4,'Post-money per database','Completed database','Series D-3','Forge','https://forgeglobal.com/anthropic_stock/','Historical financing database observation; earlier December 2023 $18.4B negotiation was pre-money and is not treated as identical.');
add('Anthropic','2025-03-03',61.5,'Post-money','Completed confirmed','Series E','Anthropic','https://www.anthropic.com/news/anthropic-raises-series-e-at-usd61-5b-post-money-valuation');
add('Anthropic','2025-09-02',183,'Post-money','Completed confirmed','Series F','Anthropic','https://www.anthropic.com/news/anthropic-raises-series-f-at-usd183b-post-money-valuation');
add('Anthropic','2026-02-12',380,'Post-money','Completed confirmed','Series G','Anthropic','https://www.anthropic.com/news/anthropic-raises-30-billion-series-g-funding-380-billion-post-money-valuation');
add('Anthropic','2026-05-28',965,'Post-money','Completed confirmed','Series H','Anthropic','https://www.anthropic.com/news/series-h');
add('Anthropic','2026-10-14',2000,'Prospective IPO equity','Rumored','IPO target','Reuters','https://www.marketscreener.com/news/anthropic-s-q3-revenue-surges-45-to-nearly-17-billion-ce785dd2d08cf221','Over $2T target; lower-bound plot value, not an offer price.');
add('Anthropic','2026-10-15',1500,'Prospective IPO equity','Rumored','Investor IPO expectations','Reuters','https://www.aol.com/articles/exclusive-investors-temper-anthropic-ipo-210007000.html','Around $1.5T discussed by some investors versus company desired $2T; neither priced nor completed. Reiterated in Oct 19 Reuters report.');
await fs.writeFile('tmp/monetization/valuation-research.json',JSON.stringify(rows,null,2));
const wb=Workbook.create(),sh=wb.worksheets.add('Valuation Research');
const headers=Object.keys(rows[0]);sh.getRangeByIndexes(0,0,rows.length+1,headers.length).values=[headers,...rows.map(r=>headers.map(h=>h==='date'||h==='reviewed'?(Date.parse(r[h])-Date.UTC(1899,11,30))/86400000:r[h]))];
sh.showGridLines=false;sh.freezePanes.freezeRows(1);const all=sh.getUsedRange();all.format.font.name='Arial';all.format.font.size=10;all.format.columnWidth=23;all.format.rowHeight=32;all.format.verticalAlignment='center';
sh.getRange('A1:J1').format.fill='#18364b';sh.getRange('A1:J1').format.font.color='#FFFFFF';sh.getRange('A1:J1').format.font.bold=true;
sh.getRange('B2:B16').setNumberFormat('yyyy-mm-dd');sh.getRange('J2:J16').setNumberFormat('yyyy-mm-dd');sh.getRange('C2:C16').setNumberFormat('#,##0');sh.getRange('C2:C16').format.font.color='#0000FF';
sh.getRange('D1:H16').format.columnWidth=28;sh.getRange('H1:H16').format.columnWidth=55;sh.getRange('I1:I16').format.columnWidth=85;sh.getRange('I2:I16').format.wrapText=true;sh.getRange('A2:J16').format.rowHeight=48;
wb.recalculate();console.log((await wb.inspect({kind:'region',sheetId:'Valuation Research',range:'A1:H4',maxChars:1200})).ndjson);
await fs.writeFile('tmp/monetization/valuation-preview.png',new Uint8Array(await (await wb.render({sheetName:'Valuation Research',range:'A1:H7',scale:1.5})).arrayBuffer()));
await(await SpreadsheetFile.exportXlsx(wb)).save('tmp/monetization/valuation-sheet.xlsx');


