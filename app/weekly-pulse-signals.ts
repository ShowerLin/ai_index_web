export const weeklyPillars = ["Adoption", "Monetization", "Infrastructure"] as const;
export type WeeklyPillar = (typeof weeklyPillars)[number];

export const weeklySignals = [
  {pillar: "Adoption", label: "OpenRouter token volume", score: "openrouter_score", growth: "openrouter_momentum_pct", method: "Growth in completed weeks of OpenRouter routed token volume. Each week requires seven covered days."},
  {pillar: "Monetization", label: "Ramp matched spending", score: "ramp_spending_score", growth: "ramp_spending_momentum_pct", method: "Growth in estimated spending on Ramp models with matched prices. Each week requires at least 95% matched-price coverage."},
  {pillar: "Monetization", label: "U.S. consumer card spending", score: "consumer_card_score", growth: "consumer_card_momentum_pct", method: "Growth in observed U.S. consumer card spending on OpenAI and Anthropic."},
  {pillar: "Monetization", label: "Token affordability", score: "token_affordability_score", growth: "token_affordability_momentum_pct", method: "Change in tokens per dollar implied by Bloomberg’s SDLLMTK price proxy. Falling token prices increase affordability."},
  {pillar: "Infrastructure", label: "H100 rental", score: "h100_rental_score", growth: "h100_rental_momentum_pct", method: "Growth in average H100 rental prices. Higher prices contribute to stronger pricing momentum."},
  {pillar: "Infrastructure", label: "B200 rental", score: "b200_rental_score", growth: "b200_rental_momentum_pct", method: "Growth in average B200 rental prices. Higher prices contribute to stronger pricing momentum."},
  {pillar: "Infrastructure", label: "DDR5 spot price", score: "ddr5_spot_score", growth: "ddr5_spot_momentum_pct", method: "Growth in average DDR5 spot prices. Higher prices contribute to stronger pricing momentum."},
  {pillar: "Infrastructure", label: "NAND spot price", score: "nand_spot_score", growth: "nand_spot_momentum_pct", method: "Growth in average NAND spot prices. Higher prices contribute to stronger pricing momentum."},
] as const;
export const weeklySignalCount = weeklySignals.length;
