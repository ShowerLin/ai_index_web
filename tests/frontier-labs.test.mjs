import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { frontierLabsSnapshot as snapshot } from "../app/frontier-labs-snapshot.ts";

test("frontier lab snapshot separates run rate from recognized revenue", () => {
  assert.equal(snapshot.labs.OpenAI.latest, "~$70B");
  assert.equal(snapshot.labs.OpenAI.latestDate, "29 Sep 2026");
  assert.match(snapshot.labs.OpenAI.latestSource, /marketscreener/);
  assert.match(snapshot.labs.OpenAI.series.at(-1).note, /Approximate/);
  assert.equal(snapshot.labs.Anthropic.latest, "$65B");
  assert.equal(snapshot.labs.OpenAI.fy2025Revenue, "$13B");
  assert.equal(snapshot.labs.Anthropic.fy2025Revenue, "$4.5B");
  assert.equal(snapshot.labs.OpenAI.growthFromEnd2025, 227.1);
  assert.equal(snapshot.labs.Anthropic.growthFromEnd2025, 622.2);
  assert.ok(snapshot.labs.OpenAI.series.every(row => row.value > 0));
  assert.ok(snapshot.labs.Anthropic.series.every(row => row.value > 0));
});

test("frontier labs page documents scope exclusions", async () => {
  const component = await readFile(new URL("../app/frontier-labs.tsx", import.meta.url), "utf8");
  const notes = await readFile(new URL("../app/section-notes.tsx", import.meta.url), "utf8");
  assert.match(component, /SectionNotes section="labs"/);
  assert.match(notes, /excludes product\/division records/i);
  assert.match(notes, /FY2025 recognized revenue appears separately/i);
  assert.doesNotMatch(component, /Q1 2026 revenue|Q2 2026 revenue/);
});
