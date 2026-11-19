import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { edgeRoutes, mapHeight, mapWidth, mapX, nodeHeight, nodePositions, nodeWidth } from "../app/chain-map-layout.ts";
import { chainEdges } from "../app/industry-chain-data.ts";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  return worker(
    new Request("http://localhost/", { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("server-renders the AI Investment Atmosphere dashboard", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
  const html = await response.text();
  assert.match(html, /<title>AI Investment Atmosphere<\/title>/i);
  assert.match(html, /AI buildout is still/);
  assert.match(html, /EXECUTIVE SUMMARY · INVESTMENT CONCLUSION/);
  assert.match(html, /AI capacity is arriving faster than evidence of capital productivity/);
  const stageIds = ["adoption", "monetization", "utilization", "financial"];
  const stagePositions = stageIds.map(id => html.indexOf(`class="section pillar-research" id="${id}"`));
  assert.ok(stagePositions.every((position, index) => position >= 0 && (index === 0 || position > stagePositions[index - 1])));
  assert.equal((html.match(/CORE PILLAR · 20% WEIGHT/g) ?? []).length, 1);
  assert.match(html, /DEMAND 20% \+ IMPORTS 20%/);
  assert.match(html, /INVESTMENT 20% \+ HYPERSCALER CAPEX 20%/);
  for (const id of ["sustainability", "roic", "fundamentals", "credit", "financing"]) {
    assert.ok(html.indexOf(`id="${id}"`) > stagePositions[3]);
  }
  assert.match(html, /Cash absorption and funding headroom/);
  assert.match(html, /OpenRouter token consumption/);
  assert.match(html, /Business AI adoption percentage levels underlying the heatmap/);
  assert.doesNotMatch(html, /Adoption constituent momentum/);
  assert.match(html, /id="useful-task-economics" class="evidence-card"/);
  assert.ok(html.indexOf('id="adoption-usage"') > stagePositions[0] && html.indexOf('id="adoption-usage"') < stagePositions[1]);
  assert.ok(html.indexOf('id="infrastructure"') > stagePositions[2] && html.indexOf('id="infrastructure"') < stagePositions[3]);
  assert.match(html, /View supplementary financial and credit adjustment/);
  assert.match(html, /core uncertainty/);
  assert.match(html, /Satellite-adjusted/);
  assert.match(html, /Satellite-adjusted/);
  assert.match(html, /69\.3/);
  assert.match(html, /MONTHLY CONSTITUENT SCORE HEATMAP/);
  assert.match(html, /id="heatmap-demand-evidence"/);
  assert.match(html, /Demand · DRAM, NAND and TSMC revenue/);
  assert.match(html, /Demand heatmap comparison basis/);
  assert.match(html, /Methodology v2.2 contributions/);
  assert.match(html, /Core atmosphere/);
  assert.match(html, /Separate funding signal · September is partial/);
  assert.match(html, /SELECTED PILLAR · CONSTITUENTS/);
  assert.match(html, /2026Q2 constituent QoQ/);
  assert.match(html, /\$188\.3B/);
  assert.match(html, /Quarterly CapEx/);
  assert.match(html, /Hyperscaler capital expenditure/);
  assert.match(html, /PHYSICAL INFRASTRUCTURE · SUPPLEMENTARY ANALYSIS/);
  assert.match(html, /How quickly is spending becoming compute capacity/);
  assert.match(html, /Physical deployment/);
  assert.match(html, /Installed compute/);
  assert.match(html, /CapEx conversion/);
  assert.match(html, /source-S11/);
  assert.match(html, /MODEL TRAINING ECONOMICS · SUPPLEMENTARY ANALYSIS/);
  assert.match(html, /Frontier training costs now reach hundreds of millions of dollars/);
  assert.match(html, /Revenue required to cover one training run/);
  assert.match(html, /source-S12/);
  assert.match(html, /COST PER SUCCESSFUL TASK · DERIVED ANALYSIS/);
  assert.match(html, /Lower task prices require much higher paid volume/);
  assert.match(html, /Daily successful tasks required per \$1B of capital/);
  assert.match(html, /source-S13/);
  assert.match(html, /PAID DEMAND · FRONTIER LAB MONETIZATION/);
  assert.match(html, /Reported lab revenue provides evidence of paid demand/);
  assert.match(html, /source-S10/);
  assert.match(html, /Growth since end-2025/);
  assert.match(html, /622\.2/);
  assert.match(html, /FY2025 revenue/);
  assert.match(html, /Investment is absorbing more operating cash/);
  assert.match(html, /Incremental cash coverage/);
  assert.match(html, /76\.1/);
  assert.match(html, /149\.6/);
  assert.match(html, /source-S7/);
  assert.match(html, /RETURN ON INVESTED CAPITAL · SUPPLEMENTARY ANALYSIS/);
  assert.match(html, /Consolidated ROIC/);
  assert.match(html, /29\.3%/);
  assert.match(html, /8Q incremental ROIC/);
  assert.match(html, /18\.3%/);
  assert.match(html, /Hyperscaler return comparison/);
  assert.match(html, /Alphabet/);
  assert.match(html, /source-S8/);
  assert.match(html, /DEMAND-TO-RETURNS CONVERSION/);
  assert.match(html, /Demand is visible\. Value capture is the unresolved question/);
  assert.match(html, /450\.9T/);
  assert.match(html, /Evidence of persistent return pressure/);
  assert.match(html, /source-S9/);
  assert.match(html, /China capital expenditure/);
  assert.match(html, /AI INDUSTRY VALUE CHAIN/);
  assert.match(html, /Where does the AI investment dollar go/);
  assert.match(html, /AI industry chain relationship map/);
  assert.match(html, /Demand signal/);
  assert.match(html, /Production dependency/);
  assert.match(html, /Capacity constraint/);
  assert.match(html, /One-day returns are unavailable because the current source reports zero for all 32 companies/);
  assert.match(html, /THREE-SIGNAL OVERVIEW/);
  assert.match(html, /Market · <!-- -->1M/);
  assert.match(html, /CDS pressure/);
  assert.match(html, /CDS pressure is/);
  assert.match(html, /Import price CSV/);
  assert.match(html, /Accelerators &amp; custom silicon/);
  assert.match(html, /Compute proxy/);
  assert.match(html, /Compute proxy/);
  assert.match(html, /FINANCIAL · BALANCE-SHEET RESILIENCE/);
  assert.match(html, /Fundamental composite leaders/);
  assert.match(html, /SNDK/);
  assert.match(html, /FINANCIAL · EXTERNAL FUNDING/);
  assert.match(html, /415\.9/);
  assert.match(html, /Memory exports and foundry revenue/);
  assert.match(html, /Overall issuer spreads versus IG/);
  assert.match(html, /All sectors: all median lines and min–max ranges versus IG benchmark/);
  assert.match(html, /All rating groups: all median lines and min–max ranges versus IG benchmark/);
  assert.doesNotMatch(html, /aria-label="Credit (sector|rating)"/);
  assert.match(html, /Monthly financing by issuer sector/);
  assert.match(html, /December 2025 is missing/i);
  assert.match(html, /Signal construction and analytical scope/);
  assert.match(html, /source-S1/);
  assert.match(html, /source-S2/);
  assert.equal((html.match(/data-section-notes=/g) ?? []).length, 16);
  for (const heading of ["(1) Data source and reliability", "(2) Methodology", "(3) Scope and other necessary information"]) {
    assert.equal(html.split(heading).length - 1, 16);
  }
  for (const source of new Set([...html.matchAll(/href="#(source-S\d+)"/g)].map(match => match[1]))) {
    assert.equal(html.split(`id="${source}"`).length - 1, 1);
  }
  assert.doesNotMatch(html, /class="(?:chart-callout|task-chart-note|roic-history-note|heat-frequency-note|credit-method)"/);
  assert.doesNotMatch(html, /codex-preview|Building your site|react-loading-skeleton/i);
});

test("keeps production metadata and methodology in source", async () => {
  const [page, layout, css, snapshot, roicMetrics, roicSnapshot] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../app/industry-chain-snapshot.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/roic-metrics.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/roic-snapshot.ts", import.meta.url), "utf8"),
  ]);
  assert.match(layout, /title:\s*"AI Investment Atmosphere"/);
  assert.match(layout, /og-atmosphere\.png/);
  assert.match(page, /50 \+ 15/);
  assert.match(page, /Token pricing remains context/);
  assert.match(page, /const heatmap =/);
  assert.match(page, /setHeatmapPillar/);
  assert.match(page, /const chinaCapexHistory =/);
  assert.match(page, /function ChinaCapexChart\(\{company\}/);
  assert.match(page, /const \[capexCountry,setCapexCountry\]/);
  assert.match(page, /China capital expenditure/);
  assert.match(page, /All companies/);
  assert.match(page, /ChinaCapexChart company=\{chinaCompany\}/);
  assert.match(page, /issuer definitions differ/);
  assert.doesNotMatch(page, /id="china"/);
  assert.doesNotMatch(page, /function TencentCapexChart/);
  assert.match(page, /2026Q2 constituent QoQ/);
  assert.match(page, /const proxyHistory/);
  assert.match(page, /aia-industry-chain-prices/);
  assert.match(page, /const \[chainView,setChainView\]/);
  assert.match(page, /chainView==="map"/);
  assert.match(page, /selectedChainNodeId/);
  assert.match(page, /Structural links represent industry relationships rather than company-level supplier contracts/);
  assert.match(page, /parsePriceCsv/);
  assert.match(page, /function fundamentalSignal/);
  assert.match(page, /function creditSignal/);
  assert.match(page, /THREE-SIGNAL OVERVIEW/);
  assert.match(page, /coverage is always shown/);
  assert.match(page, /snapshotPriceRows/);
  assert.match(snapshot, /priceAsOf:\s*"2026-09-16"/);
  assert.match(snapshot, /q2FinancialCoverage:\s*26/);
  assert.match(snapshot, /q1FinancialFallback:\s*6/);
  assert.match(snapshot, /fundamentalCompositeScores/);
  assert.match(snapshot, /SNDK:84\.7240/);
  assert.match(snapshot, /MSFT:\{change1m:3\.686936/);
  assert.match(snapshot, /VST:\{change1m:-3\.134625/);
  assert.match(page, /OwnerTimeSeries/);
  assert.doesNotMatch(page, /capexMetric|metric-toggle/);
  assert.match(page, /const fundamentalSnapshot/);
  assert.match(page, /80% resilience \+ 20% CapEx momentum/);
  assert.match(page, /const satelliteOverlay/);
  assert.match(page, /fundamentalOverlayDelta=0\.10/);
  assert.match(page, /normalizedCreditScore=clampScore\(50\+2\.5\*cdsSnapshot\.composite\)/);
  assert.match(page, /SUPPLEMENTARY ADJUSTMENT FORMULA/);
  assert.match(page, /weights are not renormalized/);
  assert.match(page, /const bondHistory/);
  assert.match(page, /<RoicAnalysis compact\/>/);
  assert.match(page, /<DemandToReturns compact\/>/);
  assert.match(page, /<FrontierLabs compact\/>/);
  assert.match(page, /<InfrastructureDeployment compact\/>/);
  assert.match(page, /<TaskEconomics compact\/>/);
  assert.match(roicMetrics, /INCREMENTAL_CAPITAL_FLOOR = 0\.05/);
  assert.match(roicMetrics, /sum\(ttm, "nopat"\)/);
  assert.match(roicSnapshot, /"ticker": "MSFT"/);
  assert.match(roicSnapshot, /"readiness": "ready"/);
  assert.match(css, /@media\(max-width:720px\)/);
  assert.match(css, /\.chain-map-canvas/);
  assert.match(css, /\.map-connections/);
  assert.match(page, /edgeRoutes\[edge.id\]/);
  assert.doesNotMatch(page, /_sites-preview|SkeletonPreview/);
});

test("renders fluid card positions and SVG connectors in the same coordinate space", async () => {
  const html = await (await render()).text();
  const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");
  assert.match(css, /\.chain-map-canvas\{width:100%;min-width:920px/);
  assert.doesNotMatch(css, /\.chain-map-canvas\{width:920px/);
  assert.match(css, /\.chain-map-panel\{min-width:0/);
  assert.match(html, /class="map-connections" width="100%"/);
  assert.equal((html.match(/class="map-node map-node-/g) ?? []).length, 8);
  assert.equal((html.match(/class="map-edge /g) ?? []).length, 9);
  assert.match(html, /left:26\.6304\d+%;top:88px;width:20%;height:154px/);
  assert.match(html, /x2="26\.6304\d+%" y2="165"/);
  assert.match(html, /marker-start="url\(#map-arrow-constraint\)"/);
  assert.match(html, /tabindex="0" role="region" aria-label="Scrollable supply chain map"/);
  assert.match(html, /Scroll horizontally to explore the map/);
});

test("all connector endpoints meet their cards at minimum, desktop and ultrawide widths", () => {
  const onBoundary = ([x, y], id, width) => {
    const [left, top] = nodePositions[id];
    const scale = width / mapWidth;
    const px = parseFloat(mapX(x)) / 100 * width;
    const right = (left + nodeWidth) * scale;
    const bottom = top + nodeHeight;
    const near = (a, b) => Math.abs(a - b) < 0.001;
    return ((near(px, left * scale) || near(px, right)) && y >= top && y <= bottom)
      || ((near(y, top) || near(y, bottom)) && px >= left * scale - 0.001 && px <= right + 0.001);
  };
  for (const width of [920, 1448, 2944]) {
    for (const edge of chainEdges) {
      const route = edgeRoutes[edge.id];
      assert.ok(onBoundary(route[0], edge.source, width), `${edge.id} source at ${width}`);
      assert.ok(onBoundary(route.at(-1), edge.target, width), `${edge.id} target at ${width}`);
      for (const [x, y] of route) {
        assert.ok(x >= 0 && x <= mapWidth && y >= 0 && y <= mapHeight);
      }
    }
  }
});
