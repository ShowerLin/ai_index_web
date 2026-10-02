import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { taskEconomicsSnapshot as snapshot } from "../app/task-economics-snapshot.ts";
import { usefulTaskSnapshot } from "../app/useful-task-snapshot.ts";

test("training-economics snapshot is generated from Epoch model and chip data", () => {
  assert.equal(snapshot.metadata.observationCount, 48);
  assert.equal(snapshot.metadata.costObservationAsOf, "2025-07-09");
  assert.equal(snapshot.latest.model, "Grok 4");
  assert.ok(snapshot.latest.trainingCost > 380_000_000);
  assert.equal(snapshot.annualRanges.at(-1).year, 2025);
  assert.equal(snapshot.hardware.length, 7);
  assert.ok(snapshot.hardware.some(row => row.name === "NVIDIA H100 SXM5 80GB"));
  assert.ok(snapshot.hardware.some(row => row.name === "Google TPU v7 Ironwood"));
  assert.deepEqual(snapshot.recovery.contributionMargins, [0.30, 0.50, 0.70]);
  assert.ok(snapshot.recovery.models.every(row => row.revenueRequired.every(value => value > row.trainingCost)));
});

test("buyer-side useful-task economics remain available separately", async () => {
  assert.equal(usefulTaskSnapshot.metadata.observationCount, 23);
  assert.equal(usefulTaskSnapshot.metadata.epochEnrichedCount, 15);
  assert.equal(usefulTaskSnapshot.metadata.publicSuccessProxyCount, 20);
  assert.equal(usefulTaskSnapshot.metadata.bestValueCandidateCount, 7);
  assert.ok(usefulTaskSnapshot.latest.Frontier.costPerUsefulTask > 8.80 && usefulTaskSnapshot.latest.Frontier.costPerUsefulTask < 8.81);
  assert.equal(usefulTaskSnapshot.latest.Frontier.model, "GPT-6 Astra");
  assert.ok(usefulTaskSnapshot.latest["Best value"].costPerUsefulTask > 0.75 && usefulTaskSnapshot.latest["Best value"].costPerUsefulTask < 0.77);
  assert.ok(usefulTaskSnapshot.sensitivity.every(row => row.tasksPerDay.every(value => value > 0)));
  const epochPoint = usefulTaskSnapshot.observations.find(row => row.model === "GPT-4o (Nov 2024)");
  assert.equal(epochPoint?.priceSource, "Epoch AI API prices");
  assert.equal(epochPoint?.successSource, "Epoch AI SWE-Bench Verified");
  assert.ok(epochPoint.costPerUsefulTask > 68 && epochPoint.costPerUsefulTask < 69);
  const component = await readFile(new URL("../app/useful-task-economics.tsx", import.meta.url), "utf8");
  assert.match(component, /Cost per successful task and observed model range/i);
  const notes = await readFile(new URL("../app/section-notes.tsx", import.meta.url), "utf8");
  assert.match(notes, /derived buyer-side price-performance measure/i);
  assert.match(component, /Daily successful tasks required per \$1B of capital/i);
  assert.match(component, /Public success proxies/i);
  const deepSwePoint = usefulTaskSnapshot.observations.find(row => row.model === "GPT-5.6 Sol");
  assert.equal(deepSwePoint?.successBenchmark, "DeepSWE");
  assert.equal(deepSwePoint?.successAgent, "mini-swe-agent");
  const splitLabs = usefulTaskSnapshot.observations.filter(row => ["GPT-5.5", "Claude Fable 5"].includes(row.model));
  assert.deepEqual(splitLabs.map(row => row.model), ["GPT-5.5", "Claude Fable 5"]);
  assert.notEqual(splitLabs[0].costPerUsefulTask, splitLabs[1].costPerUsefulTask);
  const deepSeekValue = usefulTaskSnapshot.observations.find(row => row.model === "DeepSeek V3.2 Reasoner");
  assert.ok(deepSeekValue?.costPerUsefulTask < 0.05);
  assert.equal(deepSeekValue?.successVerification, "verified");
  assert.equal(usefulTaskSnapshot.observations.find(row => row.model === "Grok 4.5")?.series, "Comparator");
  assert.equal(usefulTaskSnapshot.observations.find(row => row.model === "Grok 4.5")?.classification, "Comparator");
  assert.equal(usefulTaskSnapshot.observations.find(row => row.model === "GPT-4.1")?.classification, "Comparator");
});

test("training-economics presentation separates estimates from total development cost", async () => {
  const component = await readFile(new URL("../app/task-economics.tsx", import.meta.url), "utf8");
  assert.match(component, /constant 2023 USD/i);
  assert.match(component, /Estimated frontier-model training compute cost/i);
  const notes = await readFile(new URL("../app/section-notes.tsx", import.meta.url), "utf8");
  assert.match(notes, /shading shows the interquartile range/i);
  assert.match(component, /neither total model-development cost nor customer API price/i);
  assert.match(component, /Revenue required to cover one training run/i);
  assert.match(component, /Selected accelerator price-performance/i);
});
