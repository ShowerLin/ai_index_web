import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { infrastructureSnapshot as snapshot } from "../app/infrastructure-snapshot.ts";

test("infrastructure snapshot preserves coverage and calculation boundaries", () => {
  assert.equal(snapshot.metadata.facilityCount, 93);
  assert.equal(snapshot.metadata.timelineRows, 545);
  assert.equal(snapshot.metadata.chipAsOf, "2026-03-31");
  assert.equal(snapshot.deploymentByOwner.length, 5);
  assert.equal(snapshot.computeByOwner.length, 5);
  assert.equal(snapshot.computeHistory.at(-1).h100e, 13.34);
  assert.match(snapshot.deploymentHistory.at(-1).quarter, /\*$/);
  assert.ok(snapshot.deploymentHistory.at(-1).itMw > 8_000);
  assert.equal(snapshot.conversion.find(row => row.company === "Oracle")?.computeCapex, null);
  for (const row of snapshot.conversion.filter(row => row.computeCapex !== null)) {
    assert.ok(row.capexPerMillionH100e > 0);
    assert.ok(row.capexPerMw > 0);
  }
});

test("infrastructure build script documents source mappings and does not claim utilization", async () => {
  const [script, component] = await Promise.all([
    readFile(new URL("../scripts/build-infrastructure-snapshot.py", import.meta.url), "utf8"),
    readFile(new URL("../app/infrastructure-deployment.tsx", import.meta.url), "utf8"),
  ]);
  assert.match(script, /"Google": "Alphabet"/);
  assert.match(script, /latest milestone on or before each quarter end/i);
  assert.match(component, /not measures of workload utilization/i);
  assert.match(component, /overlapping modeled views/i);
  assert.match(component, /PHYSICAL INFRASTRUCTURE · SUPPLEMENTARY ANALYSIS/);
});
