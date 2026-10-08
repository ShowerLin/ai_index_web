import test from 'node:test';
import assert from 'node:assert/strict';
import {equityBasket,latestEquityObservation} from '../app/equity-basket.ts';
import {supplyChainStockSnapshot as data} from '../app/supply-chain-stock-snapshot.ts';
import {industryChain} from '../app/industry-chain-data.ts';
const near=(a,b)=>assert.ok(Math.abs(a-b)<1e-8,`${a} != ${b}`);
const row=(date,dailyReturn,cumulativeReturn,marketCap)=>({date,dailyReturn,cumulativeReturn,marketCap});

test('market-cap baskets use lagged weights and compound daily sector returns',()=>{
 const dates=['2025-12-31','2026-01-02','2026-01-05'];
 const holdings=[{openingMarketCap:100,rows:[row(dates[1],10,10,110),row(dates[2],20,32,132)]},{openingMarketCap:300,rows:[row(dates[1],-10,-10,270),row(dates[2],0,-10,270)]}];
 const cap=equityBasket(holdings,dates,'cap');
 near(cap[0].value,0);near(cap[1].value,-5);near(cap[2].value,.5);
 near(equityBasket(holdings,dates,'equal')[2].value,11);
 // A changed later valuation must not alter earlier return weights.
 holdings[0].rows[1].marketCap=100000;
 near(equityBasket(holdings,dates,'cap')[1].value,-5);
 near(equityBasket(holdings,dates,'cap')[2].value,.5);
});
test('non-reporting dates hold valuations without repeating previous returns',()=>{
 const dates=['2025-12-31','2026-01-02','2026-01-05'];
 const holdings=[{openingMarketCap:100,rows:[row(dates[1],10,10,110),row(dates[2],null,null,null)]}];
 near(equityBasket(holdings,dates,'cap')[2].value,10);
 assert.deepEqual(latestEquityObservation(holdings[0].rows,dates[2]),{marketCap:110,marketCapDate:dates[1],cumulativeReturn:10,returnDate:dates[1]});
});
test('missing caps do not silently reweight the available company',()=>{
 const holdings=[{openingMarketCap:100,rows:[row('2026-01-02',10,10,110)]},{openingMarketCap:null,rows:[row('2026-01-02',-10,-10,null)]}];
 assert.equal(equityBasket(holdings,['2025-12-31','2026-01-02'],'cap')[1].value,null);
});
test('workbook import preserves 36 unique companies, USD caps and usable weights',()=>{
 const tickers=industryChain.flatMap(s=>s.companies.map(c=>c.ticker));
 assert.equal(new Set(tickers).size,36);assert.equal(data.metadata.marketCapCurrency,'USD');
 assert.equal(data.metadata.marketCapCoverage,36);
 assert.deepEqual([...data.metadata.inferredOpeningCaps].sort(),['000660','005930','8035']);
 const end=Object.values(data.companies).map(c=>c.asOf).sort()[0];
 for(const ticker of tickers){
  assert.ok(data.companies[ticker].openingMarketCap>0);
  const last=latestEquityObservation(data.series[ticker],end);assert.ok(last.marketCap>0);assert.ok(last.returnDate<=end);assert.ok(last.marketCapDate<=end);
 }
 const msft=data.series.MSFT.find(r=>r.date==='2025-12-31');near(msft.marketCap,3594446481511.1);
 for(const sector of industryChain){
  const holdings=sector.companies.map(c=>({openingMarketCap:data.companies[c.ticker].openingMarketCap,rows:data.series[c.ticker]}));
  const dates=[data.metadata.baseline,...[...new Set(holdings.flatMap(h=>h.rows.filter(r=>r.date>data.metadata.baseline&&r.date<=end&&r.dailyReturn!==null).map(r=>r.date)))].sort()];
  assert.ok(equityBasket(holdings,dates,'cap').every(p=>p.value!==null&&Number.isFinite(p.value)));
 }
});
