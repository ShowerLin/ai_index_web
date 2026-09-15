import test from "node:test";
import assert from "node:assert/strict";
import { calculateRoic } from "../app/roic-metrics.ts";
import { roicSnapshot } from "../app/roic-snapshot.ts";

const close = (actual, expected) => assert.ok(Math.abs(actual - expected) < 0.000001, `${actual} != ${expected}`);

test("MSFT consolidated ROIC reconciles to the generated workbook snapshot", () => {
  const msft = roicSnapshot.companies.find(company => company.ticker === "MSFT");
  const result = calculateRoic(msft);
  assert.equal(result.status, "ready");
  assert.equal(result.latest.period, "2026-06-30");
  close(result.latest.nopat, 125.2041157014979);
  close(result.latest.averageCapital, 427.7275);
  close(result.latest.roic, 0.2927193498231886);
  close(result.roicChange, -0.03212076770381789);
  close(result.incrementalRoic4q, 0.18986081627059204);
  close(result.incrementalRoic8q, 0.18306384140499465);
});

test("lease sensitivity adds confirmed MSFT leases once", () => {
  const msft = roicSnapshot.companies.find(company => company.ticker === "MSFT");
  const result = calculateRoic(msft, true);
  assert.equal(result.status, "ready");
  close(result.latest.averageCapital, 506.5035);
  close(result.latest.roic, 0.24719299215404808);
});

test("core ROIC is available for all five hyperscalers", () => {
  for (const company of roicSnapshot.companies) {
    assert.equal(calculateRoic(company).status, "ready");
  }
});

test("Oracle uses its latest complete quarter", () => {
  const oracle = roicSnapshot.companies.find(company => company.ticker === "ORCL");
  const result = calculateRoic(oracle);
  assert.equal(result.status, "ready");
  assert.equal(result.latest.period, "2026-03-31");
});

test("lease sensitivity stays unavailable without confirmed debt treatment", () => {
  for (const company of roicSnapshot.companies.filter(item => item.ticker !== "MSFT")) {
    assert.equal(calculateRoic(company, true).status, "unavailable");
  }
});

test("unsafe capital denominators suppress ROIC and incremental return", () => {
  const base = roicSnapshot.companies.find(company => company.ticker === "MSFT");
  const noCapital = {...base, quarters: base.quarters.map(row => ({...row, shareholdersEquity: null}))};
  assert.equal(calculateRoic(noCapital).status, "unavailable");

  const flatCapital = {...base, quarters: base.quarters.map(row => ({...row, shareholdersEquity: 300, totalDebt: 100, cashAndShortTermInvestments: 50}))};
  const flatResult = calculateRoic(flatCapital);
  assert.equal(flatResult.status, "ready");
  assert.equal(flatResult.incrementalRoic4q, null);
  assert.match(flatResult.incrementalRoic4qReason, /non-positive/);
});
