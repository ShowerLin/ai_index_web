import type { ChainNodeId } from "./industry-chain-data";

// X coordinates share one proportional space; Y coordinates stay in readable CSS pixels.
// Keep card bounds and connector endpoints together so resizing cannot detach arrows.
export const mapWidth = 920;
export const mapHeight = 670;
export const nodeWidth = 184;
export const nodeHeight = 154;
export const mapX = (x: number) => `${x / mapWidth * 100}%`;

export const nodePositions: Record<ChainNodeId, readonly [number, number]> = {
  applications: [18, 88], platforms: [245, 88], datacenters: [698, 88],
  memory: [245, 290], silicon: [472, 290], systems: [698, 290],
  equipment: [245, 492], power: [698, 492],
};

type Point = readonly [number, number];
type Anchor = "left" | "right" | "top" | "bottom";
function anchor(id: ChainNodeId, side: Anchor): Point {
  const [x, y] = nodePositions[id];
  return [x + (side === "left" ? 0 : side === "right" ? nodeWidth : nodeWidth / 2),
    y + (side === "top" ? 0 : side === "bottom" ? nodeHeight : nodeHeight / 2)];
}

export const edgeRoutes = {
  "edge-app-platform": [anchor("applications", "right"), anchor("platforms", "left")],
  "edge-platform-datacenter": [anchor("platforms", "right"), anchor("datacenters", "left")],
  "edge-platform-silicon": [anchor("platforms", "bottom"), anchor("silicon", "top")],
  "edge-equipment-memory": [anchor("equipment", "top"), anchor("memory", "bottom")],
  "edge-equipment-silicon": [anchor("equipment", "right"), anchor("silicon", "bottom")],
  "edge-memory-silicon": [anchor("memory", "right"), anchor("silicon", "left")],
  "edge-silicon-systems": [anchor("silicon", "right"), anchor("systems", "left")],
  "edge-systems-datacenter": [anchor("systems", "top"), anchor("datacenters", "bottom")],
  "edge-datacenter-power": [anchor("datacenters", "right"), [902, 165], [902, 569], anchor("power", "right")],
} satisfies Record<string, readonly Point[]>;
