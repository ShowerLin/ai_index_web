const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict'),path=require('node:path');
const root=path.resolve(__dirname,'..'),data=JSON.parse(fs.readFileSync(path.join(root,'research-snapshot.json'))),nodes={};
const defaults={'research-company':'ALL','research-lag':'0','research-month':'2026-08','research-price':'-30'};
function node(id){return nodes[id]??= {innerHTML:'',textContent:id==='research-data'?JSON.stringify(data):'',value:defaults[id],events:{},addEventListener(k,fn){this.events[k]=fn;}};}
vm.runInNewContext(fs.readFileSync(path.join(root,'research.js'),'utf8'),{document:{getElementById:node}});
assert.match(node('research-app').innerHTML,/\$510\.7B/);assert.match(node('research-app').innerHTML,/\$149\.6B/);
assert.match(node('research-return-copy').textContent,/77\.3%/);assert.match(node('research-return-copy').textContent,/76\.1%/);
assert.match(node('research-statistics').textContent,/2 of 2/);
assert.match(node('research-price-copy').textContent,/6\.9%/);assert.match(node('research-price-copy').textContent,/34\.5%/);
assert.deepEqual(data.missingDays,['2025-06-15','2025-07-15']);
assert.equal(data.months.at(-1).complete,false);assert.equal(data.months.at(-1).days,9);
const expected={MSFT:'29.3%',GOOGL:'28.8%',AMZN:'13.1%',META:'28.4%',ORCL:'12.8%'};
for(const ticker of ['ALL',...Object.keys(expected)])for(const lag of ['0','1','2']){
  node('research-company').value=ticker;node('research-lag').value=lag;node('research-company').events.change();
  assert.ok(!/NaN|Infinity|undefined/.test(Object.values(nodes).map(x=>x.innerHTML+x.textContent).join('')));
  if(expected[ticker])assert.ok(node('research-return-copy').textContent.includes('ROIC '+expected[ticker]));
  if(ticker==='ORCL')assert.match(node('research-return-copy').textContent,/Latest financial period 2026Q1/);
}
for(const month of data.months.filter(m=>m.complete)){node('research-month').value=month.month;node('research-month').events.change();assert.ok(!/NaN|undefined/.test(node('research-mix').innerHTML));}
node('research-price').value='-90';node('research-price').events.input();assert.match(node('research-price-copy').textContent,/-84\.7%/);
assert.equal(data.rows,31365);
console.log('Passed: source coverage, reference financial tie-outs, all 18 company/lag combinations, 18 month selections, price sensitivity and finite rendering.');
