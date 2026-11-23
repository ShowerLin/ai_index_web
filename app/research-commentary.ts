export const commentaryReviewDate = "2026-11-17";
export const executiveCommentary = [
  "AI investment continues to expand, but growth is becoming less uniform and the earnings test more demanding. The November 17 refresh adds business-adoption and spending observations, updates investment estimates and extends market coverage. Broader adoption and stronger GPU rental pricing coexist with slower usage and spending momentum.",
  "The five covered hyperscalers’ next-four-fiscal-quarter CapEx estimate rose 0.8% to $1.10T versus the prior saved update. The larger signal is the trajectory: quarterly headline spending rises from $230B in Q3 2026 to an estimated $309B in Q3 2027, while year-over-year growth slows from 118% to 34%. A larger investment base supports suppliers, while slower growth raises the risk of earnings expectations outrunning demand.",
  "October Ramp paid adoption reached 56.8%. In the separate matched-model sample, lower effective unit costs offset higher volume and spending fell 2.0% in the window ending October 25. OpenRouter estimated spending grew 22.1%, with historical values repriced in this refresh. Subsequent token-volume and consumer-spending growth moderated. A broad acceleration in paid demand remains to be demonstrated.",
  "The pillar review adds a profitability concern from the previously collected Anthropic filing. Q3 compute expense grew faster than revenue, and adjusted operating margin fell from 19% to 15%. The reported loss also reflects a material non-cash charitable charge. Commercial scale is increasing alongside pressure on the share of revenue retained as profit.",
  "Infrastructure is progressing at different speeds. September order growth slowed while import growth accelerated, and completed-quarter operational capacity additions eased in Q3. GPU rentals strengthened, but memory prices diverged. These observations warrant attention to product mix, delivery lags and power constraints. The partial Q4 capacity observation provides limited evidence about the full-quarter pace.",
  "Market confirmation remains mixed. Semiconductor relative performance recovered but remained negative, while BBB credit pressure eased modestly over the latest week. The latest weekly activity pulse is 55.2 with six of eight inputs; its missing spending signals limit the evidence of a broad upturn. Cash-funding and ROIC coverage still largely ends in June, leaving the latest investment increase ahead of comparable return evidence."
] as const;
export const pillarCommentary = {
  "adoption": {
    "title": "Adoption breadth and token activity track how widely AI is used.",
    "summary": "Ramp paid adoption reached 56.8% of sampled businesses in October, up 1.0 percentage point from revised September. Current and expected business-use surveys measure breadth, while OpenRouter and Ramp token activity measure usage in their respective samples.",
    "paragraphs": [
      "Adoption splits its weight equally between breadth and usage. Breadth uses three adoption-rate levels. OpenRouter and Ramp usage each rank month-over-month growth in their trailing three-month average against their own history through June 2026.",
      "OpenRouter routed traffic and Ramp sampled business activity cover different populations. Their volumes are normalized separately. The latest complete source readings carry forward with their dates, so a held reading is visible when the next monthly observation is unavailable."
    ],
    "watch": "Watch current use, expected use and observed paid adoption together with sustained token activity. Compare usage breadth with the business paid-demand evidence in Monetization to assess how usage translates into spending.",
    "sources": [
      "source-S14",
      "source-S9",
      "source-S13"
    ]
  },
  "monetization": {
    "title": "Business paid demand connects AI usage with spending and revenue scale.",
    "summary": "Business paid demand combines Ramp median spending, Ramp matched spending growth and OpenRouter estimated routed-spending growth. Consumer card spending grew 3.7% in the four-week window ending November 8. OpenAI and Anthropic annualized revenue levels track the scale of commercialization.",
    "paragraphs": [
      "In the matched Ramp window ending October 25, volume rose 30.7%, effective unit cost fell 25.0% and spending declined 2.0%. OpenRouter estimated spending grew 22.1%, down from 28.1% in the preceding window. Effective cost includes model mix and commercial terms. Broader adoption can therefore coexist with slower spending growth.",
      "Anthropic Q3 revenue rose 46.7% sequentially to $16.956B. Compute and infrastructure expense grew 77.5% to $9.863B, increasing from 48.1% to 58.2% of revenue. Its reported operating loss was $567M. Adjusted operating income rose from $2.235B to $2.463B, while adjusted margin fell from 19% to 15%; the reported result includes a $1.960B non-cash charitable charge. Cost growth and other expenses both matter to the earnings assessment.",
      "OpenAI’s collected run rate remains approximately $50B at end-September, reported October 8. Run-rate, recognized-revenue and funding-valuation dates differ. Rising valuations increase the earnings required to support them; prospective IPO values remain uncertain."
    ],
    "watch": "Watch sustained business spending growth, consumer demand and disclosed revenue scale alongside compute expense, operating margins and cash generation. OpenRouter spending is a routed-demand proxy across mixed use cases; Ramp observes sampled business payments.",
    "sources": [
      "source-S14",
      "source-S9",
      "source-S17",
      "source-S18",
      "source-S10",
      "source-S16"
    ]
  },
  "hyperscalers": {
    "title": "Capital spending reaches new highs as growth slows sharply.",
    "summary": "The November 17 next-four-fiscal-quarter CapEx estimate rose $8.6B, or 0.8%, to $1.10T versus the prior saved November 10 snapshot. Microsoft accounts for $5.6B of the revision. Reported CapEx is unchanged between those imports.",
    "paragraphs": [
      "The five-company headline total rises from $230.4B in Q3 2026 to an estimated $309.4B in Q3 2027, while year-over-year growth slows from 117.8% to 34.3%. Quarters group native fiscal period ends, including Oracle’s different calendar. Higher comparison bases contribute to deceleration. Supplier revenue can keep growing while its growth rate and earnings momentum moderate.",
      "Cloud revisions differ by company. Alphabet’s 2027 Q2 cloud-revenue and RPO estimates increased $1.26B and $11.70B between the November 9 and 17 captures. Microsoft’s near-term CapEx estimates rose while commercial RPO estimates eased. RPO conversion timing and segment profit are the next tests; business scopes differ across issuers."
    ],
    "watch": "Track comparable-quarter estimate revisions, reported cloud operating profit and operating-cash-flow growth relative to cash CapEx. Repeated investment cuts would reinforce the slowdown. Improving cash coverage and incremental ROIC would support a more constructive return assessment.",
    "sources": [
      "source-S2",
      "source-S7",
      "source-S8"
    ]
  },
  "infrastructure": {
    "title": "Capacity expands, while orders, deliveries and pricing move at different speeds.",
    "summary": "Completed September communication-equipment and IT-equipment orders grew 25.7% and 13.7% year over year, slowing from 41.6% and 16.5% in August. Telecom and computer import growth accelerated to 75.6% and 177.8%. These nominal series cover different products and delivery stages.",
    "paragraphs": [
      "Covered modeled operational IT capacity rose from 8.00 GW in Q2 to 9.38 GW in Q3. Quarterly additions slowed from 2.48 GW to 1.38 GW. The 9.80 GW Q4 observation is partial through November 6 and cannot establish a full-quarter slowdown. This facility evidence is retained from the earlier snapshot.",
      "By November 15, four-week B200 and H100 rental-price momentum reached +11.6% and +7.0%. DDR5 rose 5.0%, while NAND fell 7.2%. Firmer GPU pricing alongside slower orders and mixed memory prices suggests uneven product availability. Power, permitting and commissioning delays can also slow the conversion of spending into revenue."
    ],
    "watch": "Watch completed-quarter capacity additions, order growth, delivery timing and sustained GPU pricing together. Paid utilization and revenue per installed unit would provide stronger evidence of capital productivity. Current capacity estimates leave those outcomes unmeasured.",
    "sources": [
      "source-S1",
      "source-S11"
    ]
  },
  "funding": {
    "title": "Long-lived commitments raise the cost of a demand or delivery shortfall.",
    "summary": "Large compute commitments and supplier financing make the timing of revenue and cash collection increasingly important. The retained transaction records identify dependencies across labs, cloud providers and equipment vendors.",
    "paragraphs": [
      "Anthropic disclosed $313.8B of fixed or minimum commitments at September 30, with terms of one to 20 years. These future obligations create a recovery hurdle that persists through changes in demand and pricing.",
      "Supplier investment, customer purchases and guarantees can connect funding conditions across the chain. Overlapping arrangements, future commitments and contingent support require separate treatment when assessing exposure. Training-cost scenarios cover only part of the full cost base."
    ],
    "watch": "Watch cash collections, funding maturities, guarantee triggers and changes to contracted capacity. Delayed deployment combined with fixed payments would increase funding pressure.",
    "sources": [
      "source-S17",
      "source-S12"
    ]
  },
  "market": {
    "title": "Semiconductor performance recovers as financing pressure remains selective.",
    "summary": "The four-week XSOX relative-return measure versus SPXT improved from −20.9% on November 6 to −7.8% on November 13. Relative performance remains negative, leaving market confirmation incomplete.",
    "paragraphs": [
      "Credit data now extend to November 17. The covered BBB group’s median spread change relative to the IG benchmark eased to +18.5 bp since year-end from +19.6 bp on November 10. Oracle CDS was approximately 181 bp. This is modest recent relief within a still uneven financing environment.",
      "The November 15 weekly pulse is 55.2 with six of eight signals. Ramp matched spending and consumer card spending are missing from that week. The latest complete reading was 46.9 on November 1. Changing coverage limits comparison of headline scores."
    ],
    "watch": "Look for broadening equity participation, a full-coverage improvement in activity and sustained credit stabilization. Renewed spread widening alongside weaker demand revisions would raise downside risk. Assess bond issuance on matched complete periods.",
    "sources": [
      "source-S4",
      "source-S5",
      "source-S6"
    ]
  }
} as const;
