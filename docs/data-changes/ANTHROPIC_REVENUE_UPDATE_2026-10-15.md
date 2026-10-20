> Archived shared-data change record. Paths below are relative to the OneDrive AI_Index data root. For current operation see ../DATA_PIPELINE.md.

# Anthropic quarterly revenue update — 15 October 2026

Accepted $16.8 billion for Q3 2026 as **media-reported quarterly revenue**, with period end September 30 and report date October 14. Verification means the news report was checked; it does not establish audited company financials.

[Reuters, syndicated by Investing.com](https://www.investing.com/news/stock-market-news/anthropics-q3-revenue-surges-45-to-nearly-17-billion-4950208) attributes the disclosure to two people attending Anthropic's investor meeting. The accessible report was published October 14 and updated that evening. [The Information's public briefing](https://www.theinformation.com/briefings/anthropic-reports-16-8-billion-third-quarter-revenue) separately corroborates the amount and period. No public company filing was verified in this review.

## Data treatment

- Saved the reviewed observation, source URLs, dates, units and qualification in quarterly_revenue.json (`../data/research/frontier_labs/quarterly_revenue.json` in shared storage), separate from Bloomberg and the downloaded Epoch CSV.
- Extended the lab builder to validate and include a distinct quarterly-revenue collection. The existing annualized series and its as-of date remain unchanged; the quarterly review date is separate.
- Added the quarterly observation to the local website's compact and full lab views, explicitly labeled media-reported and linked to Reuters.
- Did not multiply the quarter by four or use it as ARR. The monthly core index and weights are unaffected. Other financial claims in the article were not accepted as additional observations in this update.

## Refresh and validation

Run `python pipeline/run.py build --group labs`, then `python pipeline/run.py sync --web-root <local-website>` after reviewing future observations. The existing source registry covers the entire `data/research/frontier_labs` directory, so batch input hashes include this file. Keep distinct report dates for subsequent revisions and review conflicts before presenting a replacement.

The saved-input lab build succeeded, changing only the frontier-labs snapshot. Integration checks passed for the exact amount/period, retained source qualification, input hash, synchronized website copy, and unchanged annualized lab series. The website production build passed. This is a local integration, not a hosted-site deployment.
