export const monetizationSnapshot = {
  "metadata": {
    "source": "AI_Monetization.xlsx",
    "workbookSha256": "3201aab7decdf40eab5f29407d55c9c1737066a18beef7ff6c366c3e4c1104ea",
    "currency": "USD",
    "sourceUnit": "USD",
    "coreWeight": 0,
    "classificationStatus": "User-confirmed reported/estimate cutoff",
    "reportedThrough": "2026-06-30",
    "query": "get(\nHEADLINE_REVENUE() as #Revenue,\npx_last(dates=range(2024-12-31,today(),frq=Q))*eqy_sh_out(dates=range(2024-12-31,today(),frq=Q)) as #MKT_CAP\n)\nfor(\n  ['2513 HK Equity', '100 HK Equity']\n)\nwith(\ncurrency = 'USD',\nFPO=RANGE(-4,6),\nfpt=BQ\n)",
    "limitations": [
      "BQ field values are retained without annualization or summation.",
      "Repeated adjacent quarter values may reflect source blending or reporting cadence.",
      "Public Value query text differs from Public Formula; Formula query describes the saved forecast extent.",
      "Source values are saved Bloomberg observations, not independently refreshed figures."
    ]
  },
  "publicCompanies": [
    {
      "name": "Z.AI",
      "ticker": "2513 HK Equity",
      "currency": "USD",
      "revenueBasis": "Bloomberg HEADLINE_REVENUE / BQ; accounting period basis pending review",
      "history": [
        {
          "date": "2025-06-30",
          "revenueUsd": 24978635.83001005,
          "marketCapUsd": null,
          "revenueStatus": "Reported",
          "revenueCell": "Public Value!B5",
          "marketCapCell": null,
          "revenueYoY": null
        },
        {
          "date": "2025-09-30",
          "revenueUsd": 37266538.16522727,
          "marketCapUsd": null,
          "revenueStatus": "Reported",
          "revenueCell": "Public Value!B6",
          "marketCapCell": null,
          "revenueYoY": null
        },
        {
          "date": "2025-12-31",
          "revenueUsd": 37642948.6575,
          "marketCapUsd": null,
          "revenueStatus": "Reported",
          "revenueCell": "Public Value!B7",
          "marketCapCell": null,
          "revenueYoY": null
        },
        {
          "date": "2026-03-31",
          "revenueUsd": 68498404.80662984,
          "marketCapUsd": 19574497642.80886,
          "revenueStatus": "Reported",
          "revenueCell": "Public Value!B8",
          "marketCapCell": "Public Value!C8",
          "revenueYoY": null
        },
        {
          "date": "2026-06-30",
          "revenueUsd": 70492181.37991162,
          "marketCapUsd": 59372408950.88488,
          "revenueStatus": "Reported",
          "revenueCell": "Public Value!B9",
          "marketCapCell": "Public Value!C9",
          "revenueYoY": 1.8220989272448693
        },
        {
          "date": "2026-09-30",
          "revenueUsd": 458963924.58333355,
          "marketCapUsd": 21488894570.467316,
          "revenueStatus": "Estimate",
          "revenueCell": "Public Value!B10",
          "marketCapCell": "Public Value!C10",
          "revenueYoY": 11.31571128363043
        },
        {
          "date": "2026-10-22",
          "revenueUsd": null,
          "marketCapUsd": 15233687400.583107,
          "revenueStatus": null,
          "revenueCell": null,
          "marketCapCell": "Public Value!C11",
          "revenueYoY": null
        },
        {
          "date": "2026-12-31",
          "revenueUsd": 458963924.58333355,
          "marketCapUsd": null,
          "revenueStatus": "Estimate",
          "revenueCell": "Public Value!B12",
          "marketCapCell": null,
          "revenueYoY": 11.192560385194197
        },
        {
          "date": "2027-03-31",
          "revenueUsd": 609549774.364641,
          "marketCapUsd": null,
          "revenueStatus": "Estimate",
          "revenueCell": "Public Value!B13",
          "marketCapCell": null,
          "revenueYoY": 7.8987440814920085
        },
        {
          "date": "2027-06-30",
          "revenueUsd": 616322549.6353592,
          "marketCapUsd": null,
          "revenueStatus": "Estimate",
          "revenueCell": "Public Value!B14",
          "marketCapCell": null,
          "revenueYoY": 7.743133459209345
        },
        {
          "date": "2027-09-30",
          "revenueUsd": 810990870,
          "marketCapUsd": null,
          "revenueStatus": "Estimate",
          "revenueCell": "Public Value!B15",
          "marketCapCell": null,
          "revenueYoY": 0.7670035193642966
        },
        {
          "date": "2027-12-31",
          "revenueUsd": 810990870,
          "marketCapUsd": null,
          "revenueStatus": "Estimate",
          "revenueCell": "Public Value!B16",
          "marketCapCell": null,
          "revenueYoY": 0.7670035193642966
        }
      ],
      "latestMarketCap": {
        "date": "2026-10-22",
        "value": 15233687400.583107
      },
      "forwardPS": null,
      "forwardPSStatus": "Annual revenue denominator pending period-basis review",
      "latestReportedRevenue": {
        "date": "2026-06-30",
        "revenueUsd": 70492181.37991162,
        "marketCapUsd": 59372408950.88488,
        "revenueStatus": "Reported",
        "revenueCell": "Public Value!B9",
        "marketCapCell": "Public Value!C9",
        "revenueYoY": 1.8220989272448693
      }
    },
    {
      "name": "MiniMax",
      "ticker": "100 HK Equity",
      "currency": "USD",
      "revenueBasis": "Bloomberg HEADLINE_REVENUE / BQ; accounting period basis pending review",
      "history": [
        {
          "date": "2025-06-30",
          "revenueUsd": 19705364.383561645,
          "marketCapUsd": null,
          "revenueStatus": "Reported",
          "revenueCell": "Public Value!D5",
          "marketCapCell": null,
          "revenueYoY": null
        },
        {
          "date": "2025-09-30",
          "revenueUsd": 19921906.84931507,
          "marketCapUsd": null,
          "revenueStatus": "Reported",
          "revenueCell": "Public Value!D6",
          "marketCapCell": null,
          "revenueYoY": null
        },
        {
          "date": "2025-12-31",
          "revenueUsd": 19921906.84931507,
          "marketCapUsd": null,
          "revenueStatus": "Reported",
          "revenueCell": "Public Value!D7",
          "marketCapCell": null,
          "revenueYoY": null
        },
        {
          "date": "2026-03-31",
          "revenueUsd": 57964475.138121545,
          "marketCapUsd": 27565612803.759773,
          "revenueStatus": "Reported",
          "revenueCell": "Public Value!D8",
          "marketCapCell": "Public Value!E8",
          "revenueYoY": null
        },
        {
          "date": "2026-06-30",
          "revenueUsd": 58608524.86187846,
          "marketCapUsd": 12363717901.514763,
          "revenueStatus": "Reported",
          "revenueCell": "Public Value!D9",
          "marketCapCell": "Public Value!E9",
          "revenueYoY": 1.9742421262085421
        },
        {
          "date": "2026-09-30",
          "revenueUsd": 179115384.6153845,
          "marketCapUsd": 8549467949.738112,
          "revenueStatus": "Estimate",
          "revenueCell": "Public Value!D10",
          "marketCapCell": "Public Value!E10",
          "revenueYoY": 7.990875520610247
        },
        {
          "date": "2026-10-22",
          "revenueUsd": null,
          "marketCapUsd": 5524614798.118496,
          "revenueStatus": null,
          "revenueCell": null,
          "marketCapCell": "Public Value!E11",
          "revenueYoY": null
        },
        {
          "date": "2026-12-31",
          "revenueUsd": 179115384.6153845,
          "marketCapUsd": null,
          "revenueStatus": "Estimate",
          "revenueCell": "Public Value!D12",
          "marketCapCell": null,
          "revenueYoY": 7.990875520610247
        },
        {
          "date": "2027-03-31",
          "revenueUsd": 272983425.41436464,
          "marketCapUsd": null,
          "revenueStatus": "Estimate",
          "revenueCell": "Public Value!D13",
          "marketCapCell": null,
          "revenueYoY": 3.709495337685399
        },
        {
          "date": "2027-06-30",
          "revenueUsd": 276016574.58563536,
          "marketCapUsd": null,
          "revenueStatus": "Estimate",
          "revenueCell": "Public Value!D14",
          "marketCapCell": null,
          "revenueYoY": 3.7094953376853983
        },
        {
          "date": "2027-09-30",
          "revenueUsd": 410166666.6666665,
          "marketCapUsd": null,
          "revenueStatus": "Estimate",
          "revenueCell": "Public Value!D15",
          "marketCapCell": null,
          "revenueYoY": 1.2899577696657367
        },
        {
          "date": "2027-12-31",
          "revenueUsd": 410166666.6666665,
          "marketCapUsd": null,
          "revenueStatus": "Estimate",
          "revenueCell": "Public Value!D16",
          "marketCapCell": null,
          "revenueYoY": 1.2899577696657367
        }
      ],
      "latestMarketCap": {
        "date": "2026-10-22",
        "value": 5524614798.118496
      },
      "forwardPS": null,
      "forwardPSStatus": "Annual revenue denominator pending period-basis review",
      "latestReportedRevenue": {
        "date": "2026-06-30",
        "revenueUsd": 58608524.86187846,
        "marketCapUsd": 12363717901.514763,
        "revenueStatus": "Reported",
        "revenueCell": "Public Value!D9",
        "marketCapCell": "Public Value!E9",
        "revenueYoY": 1.9742421262085421
      }
    }
  ],
  "privateLabs": [
    {
      "company": "OpenAI",
      "latestAnnualizedRevenue": {
        "Id": "OpenAI September 2026 nearly 70B",
        "Company": "OpenAI",
        "Date": "2026-09-30",
        "Annualized revenue (USD)": 50000000000,
        "Annualized revenue type": "Annualized run rate",
        "Scope": "Full company",
        "Revenue amount (normalize to annual)": 50000000000,
        "Period revenue": null,
        "Period type": null,
        "Other revenue info": null,
        "Confidence": "Likely",
        "Source 1": "https://www.ft.com/content/b66a9858-f8fb-46cb-b506-44bfe26fca2a",
        "Source 2": "https://news.bloomberglaw.com/artificial-intelligence/openais-annualized-revenue-nears-50-billion-ft-says",
        "Source 3": "https://www.axios.com/2026/10/08/openai-50-billion-arr-anthropic-revenue-accounting",
        "Notes": "Reviewed 2026-10-22. Replaces same Id original September 29 USD70B comparison-adjusted estimate. End-September net run rate approximately USD50B. Partner-sales accounting differs from Anthropic; not a like-for-like revenue comparison.",
        "Report date": "2026-10-08",
        "Source type": "Media report",
        "Graph note": "Approximate end-September net run rate; supersedes grossed-up USD70B media estimate."
      },
      "latestClosedValuation": {
        "Id": "852B March 2026",
        "Company": "OpenAI",
        "Close date": "2026-03-31",
        "Status": "Closed",
        "Funding (equity)": 12000000000,
        "Funding (debt)": null,
        "Valuation (post-money)": 852000000000,
        "Report date": "2026-03-31",
        "Source 1": "https://openai.com/index/accelerating-the-next-phase-ai/",
        "Source 2": null,
        "Source 3": null,
        "Graph note": null,
        "Notes": "$12 billion is from subtracting the $110B from Nvidia, Amazon, and Softbank from the $122B total announced in March. \n\n\"Our ambition is matched by the commitment of the partners backing us. The round was anchored by our strategic partners Amazon, NVIDIA, and SoftBank, with continued participation from our long-term partner, Microsoft. SoftBank co-led the round alongside a16z, D. E. Shaw Ventures, MGX, TPG, and accounts advised by T. Rowe Price Associates, Inc. There was also significant participation from a diverse set of global institutions including Altimeter, Appaloosa LP, ARK Invest, affiliated funds of BlackRock, Blackstone, Coatue, D1 Capital Partners, Dragoneer, Fidelity Management & Research Company, Goanna Capital, Insight Partners, The Paragon Group, Sands Capital, Sequoia Capital, Sound Ventures, Temasek, Thrive Capital, UC Investments (University of California CIO Office), and Winslow Capital.\"\n\nOpenAI also expanded their revolving line of credit by $4.7 billion.",
        "Type": "Primary",
        "Confidence": "Confident",
        "Exclude from graph view": null
      },
      "note": "Private valuation and annualized revenue have different observation dates; no public forward P/S implied."
    },
    {
      "company": "Anthropic",
      "latestAnnualizedRevenue": {
        "Id": "July 2026 65B",
        "Company": "Anthropic",
        "Date": "2026-07-31",
        "Annualized revenue (USD)": 65000000000,
        "Annualized revenue type": "Annualized run rate",
        "Scope": "Full company",
        "Revenue amount (normalize to annual)": 65000000000,
        "Period revenue": null,
        "Period type": null,
        "Other revenue info": null,
        "Confidence": "Likely",
        "Source 1": "https://www.bloomberg.com/news/articles/2026-08-17/anthropic-revenue-run-rate-surpasses-65-billion-ahead-of-ipo",
        "Source 2": null,
        "Source 3": null,
        "Notes": "65B by end of July (entered as July 31, but could have been reached beforehand).\n\n\"The company\u2019s run rate, a metric that projects full-year revenue from a shorter period, hit $65 billion by the end of July, said the people, who spoke on condition of anonymity to discuss private information. Anthropic shared the figures as part of a regular update with investors, one person said.\"",
        "Report date": "2026-08-17",
        "Source type": "Media report",
        "Graph note": "\"by end of July\""
      },
      "latestClosedValuation": {
        "Id": "May 2026 965B Series H",
        "Company": "Anthropic",
        "Close date": "2026-05-28",
        "Status": "Closed",
        "Funding (equity)": 65000000000,
        "Funding (debt)": null,
        "Valuation (post-money)": 965000000000,
        "Report date": null,
        "Source 1": "https://www.anthropic.com/news/series-h",
        "Source 2": null,
        "Source 3": null,
        "Graph note": null,
        "Notes": "\"Anthropic has raised $65 billion in Series H funding led by Altimeter Capital, Dragoneer, Greenoaks, and Sequoia Capital, valuing the company at $965 billion post-money.\" ... \"The round was co-led by Capital Group, Coatue, D1 Capital Partners, GIC, ICONIQ, and XN. Significant investors in this round include AMP PBC, Baillie Gifford, Blackstone, Brookfield, D.E. Shaw Ventures, DST Global, Fidelity Management & Research Company, General Catalyst, Insight Partners, Jane Street, Lightspeed Venture Partners, MGX, NTTVC, NX1 Capital, Situational Awareness LP, T. Rowe Price Associates, Inc., T. Rowe Price Investment Management, Inc., and Temasek. It also includes $15 billion of previously committed investments from hyperscalers, including $5 billion from Amazon.\"",
        "Type": "Primary",
        "Confidence": "Confident",
        "Exclude from graph view": null
      },
      "note": "Private valuation and annualized revenue have different observation dates; no public forward P/S implied."
    }
  ],
  "valuationResearch": [
    {
      "company": "OpenAI",
      "date": "2024-02-16",
      "valueUsd": 80000000000,
      "basis": "Secondary equity",
      "status": "Completed reported",
      "event": "Employee tender",
      "source": "Reuters / NYT",
      "url": "https://www.investing.com/news/stock-market-news/openai-valued-at-80-billion-after-deal-nyt-reports-3306784",
      "note": "At least $80B; date is report date, exact closing date unavailable.",
      "reviewed": "2026-10-22"
    },
    {
      "company": "OpenAI",
      "date": "2024-10-02",
      "valueUsd": 157000000000,
      "basis": "Post-money",
      "status": "Completed confirmed",
      "event": "Funding round",
      "source": "OpenAI",
      "url": "https://openai.com/index/scale-the-benefits-of-ai/",
      "note": null,
      "reviewed": "2026-10-22"
    },
    {
      "company": "OpenAI",
      "date": "2025-03-31",
      "valueUsd": 300000000000,
      "basis": "Post-money",
      "status": "Announced confirmed",
      "event": "Funding round",
      "source": "OpenAI",
      "url": "https://openai.com/index/march-funding-updates/",
      "note": "Announcement; not an assertion that every commitment was funded on this date.",
      "reviewed": "2026-10-22"
    },
    {
      "company": "OpenAI",
      "date": "2025-10-02",
      "valueUsd": 500000000000,
      "basis": "Secondary equity",
      "status": "Completed reported",
      "event": "Employee share sale",
      "source": "AP",
      "url": "https://apnews.com/article/53dffc56355460a232439c76d1ccf22b",
      "note": "Report date; exact closing date unavailable.",
      "reviewed": "2026-10-22"
    },
    {
      "company": "OpenAI",
      "date": "2026-03-31",
      "valueUsd": 852000000000,
      "basis": "Post-money",
      "status": "Completed confirmed",
      "event": "Funding round final close",
      "source": "OpenAI",
      "url": "https://openai.com/index/accelerating-the-next-phase-ai/",
      "note": "Final round; February announcement not counted again.",
      "reviewed": "2026-10-22"
    },
    {
      "company": "OpenAI",
      "date": "2026-09-15",
      "valueUsd": 1200000000000,
      "basis": "Unspecified",
      "status": "Rumored",
      "event": "Prospective funding",
      "source": "Reuters / FT",
      "url": "https://www.marketscreener.com/news/openai-mulls-funding-round-at-1-2-trillion-valuation-ahead-of-ipo-ft-reports-ce785bd2d98bf621",
      "note": "Earlier stage of current financing discussions; not a completed round.",
      "reviewed": "2026-10-22"
    },
    {
      "company": "OpenAI",
      "date": "2026-09-29",
      "valueUsd": 1400000000000,
      "basis": "Pre-money",
      "status": "Rumored",
      "event": "Prospective funding",
      "source": "Reuters / Bloomberg",
      "url": "https://www.marketscreener.com/news/openai-targets-30-billion-funding-at-1-4-trillion-valuation-bloomberg-news-reports-ce785addd08eff25",
      "note": "About $1.4T excluding at least $30B new funding; no post-money inference.",
      "reviewed": "2026-10-22"
    },
    {
      "company": "OpenAI",
      "date": "2026-10-19",
      "valueUsd": 1400000000000,
      "basis": "Unspecified",
      "status": "Rumored",
      "event": "Prospective funding update",
      "source": "Reuters",
      "url": "https://www.marketscreener.com/news/openai-seeks-to-accelerate-fundraising-ahead-of-anthropic-ipo-sources-say-ce785cdbdf8cf321",
      "note": "Over $1.4T; lower-bound plot value. Latest update to same financing discussions, not a new round.",
      "reviewed": "2026-10-22"
    },
    {
      "company": "Anthropic",
      "date": "2024-03-27",
      "valueUsd": 18400000000,
      "basis": "Post-money per database",
      "status": "Completed database",
      "event": "Series D-3",
      "source": "Forge",
      "url": "https://forgeglobal.com/anthropic_stock/",
      "note": "Historical financing database observation; earlier December 2023 $18.4B negotiation was pre-money and is not treated as identical.",
      "reviewed": "2026-10-22"
    },
    {
      "company": "Anthropic",
      "date": "2025-03-03",
      "valueUsd": 61500000000,
      "basis": "Post-money",
      "status": "Completed confirmed",
      "event": "Series E",
      "source": "Anthropic",
      "url": "https://www.anthropic.com/news/anthropic-raises-series-e-at-usd61-5b-post-money-valuation",
      "note": null,
      "reviewed": "2026-10-22"
    },
    {
      "company": "Anthropic",
      "date": "2025-09-02",
      "valueUsd": 183000000000,
      "basis": "Post-money",
      "status": "Completed confirmed",
      "event": "Series F",
      "source": "Anthropic",
      "url": "https://www.anthropic.com/news/anthropic-raises-series-f-at-usd183b-post-money-valuation",
      "note": null,
      "reviewed": "2026-10-22"
    },
    {
      "company": "Anthropic",
      "date": "2026-02-12",
      "valueUsd": 380000000000,
      "basis": "Post-money",
      "status": "Completed confirmed",
      "event": "Series G",
      "source": "Anthropic",
      "url": "https://www.anthropic.com/news/anthropic-raises-30-billion-series-g-funding-380-billion-post-money-valuation",
      "note": null,
      "reviewed": "2026-10-22"
    },
    {
      "company": "Anthropic",
      "date": "2026-05-28",
      "valueUsd": 965000000000,
      "basis": "Post-money",
      "status": "Completed confirmed",
      "event": "Series H",
      "source": "Anthropic",
      "url": "https://www.anthropic.com/news/series-h",
      "note": null,
      "reviewed": "2026-10-22"
    },
    {
      "company": "Anthropic",
      "date": "2026-10-14",
      "valueUsd": 2000000000000,
      "basis": "Prospective IPO equity",
      "status": "Rumored",
      "event": "IPO target",
      "source": "Reuters",
      "url": "https://www.marketscreener.com/news/anthropic-s-q3-revenue-surges-45-to-nearly-17-billion-ce785dd2d08cf221",
      "note": "Over $2T target; lower-bound plot value, not an offer price.",
      "reviewed": "2026-10-22"
    },
    {
      "company": "Anthropic",
      "date": "2026-10-15",
      "valueUsd": 1500000000000,
      "basis": "Prospective IPO equity",
      "status": "Rumored",
      "event": "Investor IPO expectations",
      "source": "Reuters",
      "url": "https://www.aol.com/articles/exclusive-investors-temper-anthropic-ipo-210007000.html",
      "note": "Around $1.5T discussed by some investors versus company desired $2T; neither priced nor completed. Reiterated in Oct 19 Reuters report.",
      "reviewed": "2026-10-22"
    }
  ],
  "appSpending": {
    "history": [
      {
        "date": "2025-10-12",
        "openai": 1175593.86,
        "anthropic": 108367.2
      },
      {
        "date": "2025-10-19",
        "openai": 1161884.11,
        "anthropic": 97959.05
      },
      {
        "date": "2025-10-26",
        "openai": 1131924.42,
        "anthropic": 97691.66
      },
      {
        "date": "2025-11-02",
        "openai": 1052421.09,
        "anthropic": 110445.1
      },
      {
        "date": "2025-11-09",
        "openai": 1196345.71,
        "anthropic": 120305.54
      },
      {
        "date": "2025-11-16",
        "openai": 1278138.73,
        "anthropic": 101170.78
      },
      {
        "date": "2025-11-23",
        "openai": 1239219.5,
        "anthropic": 111758.33
      },
      {
        "date": "2025-11-30",
        "openai": 1491180.52,
        "anthropic": 119428.01
      },
      {
        "date": "2025-12-07",
        "openai": 1272371,
        "anthropic": 125141.56
      },
      {
        "date": "2025-12-14",
        "openai": 1324750.91,
        "anthropic": 121230.68
      },
      {
        "date": "2025-12-21",
        "openai": 1160211.82,
        "anthropic": 114656.95
      },
      {
        "date": "2025-12-28",
        "openai": 1121686.92,
        "anthropic": 107420.42
      },
      {
        "date": "2026-01-04",
        "openai": 1123752.77,
        "anthropic": 122002.89
      },
      {
        "date": "2026-01-11",
        "openai": 1333737.05,
        "anthropic": 172270.12
      },
      {
        "date": "2026-01-18",
        "openai": 1315880.32,
        "anthropic": 159092.22
      },
      {
        "date": "2026-01-25",
        "openai": 1212957.75,
        "anthropic": 171073.04
      },
      {
        "date": "2026-02-01",
        "openai": 1175361.25,
        "anthropic": 187788.3
      },
      {
        "date": "2026-02-08",
        "openai": 1365909.41,
        "anthropic": 244983.65
      },
      {
        "date": "2026-02-15",
        "openai": 1460987.25,
        "anthropic": 268332.14
      },
      {
        "date": "2026-02-22",
        "openai": 1330209.05,
        "anthropic": 307534.86
      },
      {
        "date": "2026-03-01",
        "openai": 1705196.03,
        "anthropic": 402889.81
      },
      {
        "date": "2026-03-08",
        "openai": 1488458.68,
        "anthropic": 379351.15
      },
      {
        "date": "2026-03-15",
        "openai": 1519114.14,
        "anthropic": 392612.46
      },
      {
        "date": "2026-03-22",
        "openai": 1359255.4,
        "anthropic": 439196.81
      },
      {
        "date": "2026-03-29",
        "openai": 1294996.31,
        "anthropic": 567372.76
      },
      {
        "date": "2026-04-05",
        "openai": 1378710.61,
        "anthropic": 587420.89
      },
      {
        "date": "2026-04-12",
        "openai": 1531620.35,
        "anthropic": 669478.6
      },
      {
        "date": "2026-04-19",
        "openai": 1457840.14,
        "anthropic": 736650.17
      },
      {
        "date": "2026-04-26",
        "openai": 1419036.29,
        "anthropic": 745532.57
      },
      {
        "date": "2026-05-03",
        "openai": 1504534.07,
        "anthropic": 838022.06
      },
      {
        "date": "2026-05-10",
        "openai": 1575436.72,
        "anthropic": 903306.38
      },
      {
        "date": "2026-05-17",
        "openai": 1544476.18,
        "anthropic": 961028.68
      },
      {
        "date": "2026-05-24",
        "openai": 1478154.59,
        "anthropic": 962433.12
      },
      {
        "date": "2026-05-31",
        "openai": 1341468.41,
        "anthropic": 639431.72
      },
      {
        "date": "2026-06-07",
        "openai": 1545535.37,
        "anthropic": 829991
      },
      {
        "date": "2026-06-14",
        "openai": 1659416.8,
        "anthropic": 908002.61
      },
      {
        "date": "2026-06-21",
        "openai": 1520197.2,
        "anthropic": 732638.57
      },
      {
        "date": "2026-06-28",
        "openai": 1536543.76,
        "anthropic": 888445.67
      },
      {
        "date": "2026-07-05",
        "openai": 1690632.22,
        "anthropic": 1108156.38
      },
      {
        "date": "2026-07-12",
        "openai": 1834433.96,
        "anthropic": 1255116.69
      },
      {
        "date": "2026-07-19",
        "openai": 1809840.96,
        "anthropic": 1098135.77
      },
      {
        "date": "2026-07-26",
        "openai": 1806729.24,
        "anthropic": 992851.39
      },
      {
        "date": "2026-08-02",
        "openai": 1785944.89,
        "anthropic": 973832.08
      },
      {
        "date": "2026-08-09",
        "openai": 2346128.35,
        "anthropic": 1053515.79
      },
      {
        "date": "2026-08-16",
        "openai": 2161436.13,
        "anthropic": 1052516.12
      },
      {
        "date": "2026-08-23",
        "openai": 2023413.97,
        "anthropic": 1094458.76
      },
      {
        "date": "2026-08-30",
        "openai": 2056776.95,
        "anthropic": 1050867.59
      },
      {
        "date": "2026-09-06",
        "openai": 2309867.06,
        "anthropic": 981261.29
      },
      {
        "date": "2026-09-13",
        "openai": 2606804.45,
        "anthropic": 1060063.74
      },
      {
        "date": "2026-09-20",
        "openai": 2621803.36,
        "anthropic": 1099625.34
      },
      {
        "date": "2026-09-27",
        "openai": 2483894.58,
        "anthropic": 1096573.12
      },
      {
        "date": "2026-10-04",
        "openai": 2780251.33,
        "anthropic": 1123790.22
      }
    ],
    "field": "observed_sales",
    "frequency": "Weekly",
    "source": "AI_Monetization.xlsx / App Revenue Value",
    "basis": "USD value of observed transactions (Transaction Spend, formerly Observed Sales). User-confirmed Bloomberg definition: aggregated U.S. consumer credit/debit card panel, 20M+ members. U.S. residents with cards at U.S. financial institutions; not extrapolated to total market."
  },
  "anthropicFiling": {
    "filingDate": "2026-11-02",
    "reviewedOn": "2026-11-05",
    "sourceUrl": "https://www.sec.gov/Archives/edgar/data/2130357/000162828026068676/anthropicpbc-sx1ax1.htm",
    "accession": "0001628280-26-068676",
    "currency": "USD",
    "unit": "USD millions",
    "annualRevenue": {
      "2023": 41,
      "2024": 386,
      "2025": 4585
    },
    "h1Revenue2025": 1163,
    "h1Revenue2026": 16286,
    "h1ComputeInfrastructure2026": 8945,
    "h1ConsumptionRevenue2026": 13064,
    "h1SubscriptionRevenue2026": 3222,
    "notes": [
      "Quarterly results are unaudited. See MD&A p. 161.",
      "Offering price and share count remain pending."
    ],
    "quarterlyRevenue": [
      {
        "period": "2025 Q1",
        "value": 376.0
      },
      {
        "period": "2025 Q2",
        "value": 787.0
      },
      {
        "period": "2025 Q3",
        "value": 1382.0
      },
      {
        "period": "2025 Q4",
        "value": 2040.0
      },
      {
        "period": "2026 Q1",
        "value": 4731.0
      },
      {
        "period": "2026 Q2",
        "value": 11555.0
      },
      {
        "period": "2026 Q3",
        "value": 16956.0
      }
    ],
    "nineMonthRevenue2026": 33242,
    "q3OperatingIncome2026": -567
  },
  "anthropicComputeDemand": {
    "sourceUrl": "https://www.sec.gov/Archives/edgar/data/2130357/000162828026068676/anthropicpbc-sx1ax1.htm",
    "observations": [
      {
        "period": "2025 Q1",
        "metric": "Compute and infrastructure expense",
        "usdMillions": 944,
        "basis": "Quarterly operating expense, MD&A p. 161"
      },
      {
        "period": "2025 Q2",
        "metric": "Compute and infrastructure expense",
        "usdMillions": 1390,
        "basis": "Quarterly operating expense, MD&A p. 161"
      },
      {
        "period": "2025 Q3",
        "metric": "Compute and infrastructure expense",
        "usdMillions": 2047,
        "basis": "Quarterly operating expense, MD&A p. 161"
      },
      {
        "period": "2025 Q4",
        "metric": "Compute and infrastructure expense",
        "usdMillions": 2945,
        "basis": "Quarterly operating expense, MD&A p. 161"
      },
      {
        "period": "2026 Q1",
        "metric": "Compute and infrastructure expense",
        "usdMillions": 3387,
        "basis": "Quarterly operating expense, MD&A p. 161"
      },
      {
        "period": "2026 Q2",
        "metric": "Compute and infrastructure expense",
        "usdMillions": 5558,
        "basis": "Quarterly operating expense, MD&A p. 161"
      },
      {
        "period": "2026 Q3",
        "metric": "Compute and infrastructure expense",
        "usdMillions": 9863,
        "basis": "Quarterly operating expense, MD&A p. 161"
      },
      {
        "period": "2025-12-31",
        "metric": "Noncancelable purchase commitments",
        "usdMillions": 54559,
        "basis": "Future minimum payments, Note 13"
      },
      {
        "period": "2026-09-30",
        "metric": "Fixed or minimum guaranteed commitments",
        "usdMillions": 313800,
        "basis": "Approximate, unaudited. Excludes agreements with no fixed or minimum dollar commitment. Note 13."
      },
      {
        "period": "2026-09-30",
        "metric": "Maximum potential developer guarantees",
        "usdMillions": 4700,
        "basis": "Contingent, unaudited. Note 13."
      }
    ]
  }
} as const;
