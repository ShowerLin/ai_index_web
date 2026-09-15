import test from 'node:test';
import assert from 'node:assert/strict';
import { cashMetrics, rollingCash } from '../app/sustainability-metrics.ts';
import { sustainabilitySnapshot } from '../app/sustainability-snapshot.ts';

test('cash measures reconcile to workbook and keep the earlier Oracle cohort separate', () => {
  const latest = sustainabilitySnapshot.companies.map(c => ({ ticker: c.ticker, ...rollingCash(c.quarters).at(-1) }));
  assert.equal(latest.find(c => c.ticker === 'ORCL').period, '2026-03-31');
  const four = latest.filter(c => c.ticker !== 'ORCL');
  assert.ok(four.every(c => c.period === '2026-06-30'));
  const close = (a, b) => assert.ok(Math.abs(a - b) < 0.000001, `${a} != ${b}`);
  close(four.reduce((s, c) => s + c.current.cfo, 0), 660.314);
  close(four.reduce((s, c) => s + c.current.capex, 0), 510.703);
  close(four.reduce((s, c) => s + c.fcf, 0), 149.611);
  close(latest.find(c => c.ticker === 'AMZN').fcf, -11.625);
});

test('missing quarters, missing values and unsafe ratio denominators stay unavailable', () => {
  const quarters = Array.from({length: 8}, (_, i) => ({period: `${2024 + Math.floor(i / 4)}-${['03-31','06-30','09-30','12-31'][i % 4]}`, cfo: 10, capex: 5}));
  assert.equal(rollingCash(quarters).length, 1);
  assert.equal(rollingCash(quarters.slice(1)).length, 0);
  assert.equal(rollingCash(quarters.map((q, i) => i === 2 ? {...q, cfo: null} : q)).length, 0);
  assert.equal(rollingCash(quarters.map((q, i) => i === 2 ? {...q, period: '2024-06-30'} : q)).length, 0);
  const flat = cashMetrics({cfo: 0, capex: 5}, {cfo: 0, capex: 5});
  assert.equal(flat.absorption, null);
  assert.equal(flat.cfoGrowth, null);
  assert.equal(flat.incrementalCoverage, null);
  assert.equal(cashMetrics({cfo: 10, capex: 4}, {cfo: 8, capex: 5}).incrementalCoverage, null);
});
