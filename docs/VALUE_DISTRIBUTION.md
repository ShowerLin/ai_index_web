# Supply-chain financial scale

The former procurement allocations were unsupported analyst scenarios and have been removed from the active page. The map uses TTM revenue and EBITDA for 36 covered companies, each assigned once to its existing industry sector. It describes financial scale, not measured procurement flows, AI-only market share or value added.

TTM amounts sum four consecutive calendarized quarters. Default date is the latest common complete period (2026-03-31). Missing values stay blank. Company percentages use available same-currency amounts only; negative EBITDA contributions are retained. The financial query spells Currncy=USD and cached Asian amounts remain local currency, so full-universe shares are withheld. USD, EUR, TWD, KRW and JPY groups are explicitly separated. A source refresh with validated USD conversion is needed for global shares.

Regenerate with scripts/build-value-chain-financials.py then scripts/build-chain-economics.py. Source workbook remains in OneDrive; all application dependencies and generated application modules remain in Projects/AI_INDEX_Web.
