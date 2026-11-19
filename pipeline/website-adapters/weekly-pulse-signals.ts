export const weeklySignals = [
  {label: "OpenRouter token volume", score: "openrouter_score", growth: "openrouter_momentum_pct"},
  {label: "Ramp matched spending", score: "ramp_spending_score", growth: "ramp_spending_momentum_pct"},
  {label: "U.S. consumer card spending", score: "consumer_card_score", growth: "consumer_card_momentum_pct"},
  {label: "Token affordability", score: "token_affordability_score", growth: "token_affordability_momentum_pct"},
  {label: "H100 rental", score: "h100_rental_score", growth: "h100_rental_momentum_pct"},
  {label: "B200 rental", score: "b200_rental_score", growth: "b200_rental_momentum_pct"},
  {label: "DDR5 spot price", score: "ddr5_spot_score", growth: "ddr5_spot_momentum_pct"},
  {label: "NAND spot price", score: "nand_spot_score", growth: "nand_spot_momentum_pct"},
] as const;
export const weeklySignalCount = weeklySignals.length;
