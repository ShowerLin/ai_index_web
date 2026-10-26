export const supplySnapshot = {
  "metadata": {
    "version": "2.8",
    "asOf": "2026-10-23",
    "coreWeight": 0.2,
    "forwardQuarters": [
      "2027Q1",
      "2027Q2",
      "2027Q3",
      "2027Q4"
    ],
    "sourceRetrievedAt": null,
    "workbookSha256": "b0ab9fec9c5be23bdf00fd230c9e858d03f4693101f6f09b27fc2961d33cb95c",
    "cloudWorkbookSha256": "b59c6514efe5b15eae66f9a6fbc6ba2207a8718c48983a56499c897eae2247dd",
    "forwardMethod": "CapEx: next four complete calendar quarters after the as-of quarter, raw saved Bloomberg estimates in USD billions. Not a day-exact rolling horizon and not lease-bridged. RPO: native fiscal-period stock estimates, never summed across quarters or issuers.",
    "rpoGrowthVsCapexStatus": "Withheld: RPO fiscal-calendar alignment, comparable scope and matched historical/forward growth bases are not verified. No fabricated historical estimates or revisions.",
    "limitations": [
      "All queried observations explicitly request estimates (FA_ACT_EST_DATA=E).",
      "Revenue and RPO scopes differ: Google Cloud segment, AWS revenue versus AMZN issuer RPO, Intelligent Cloud versus Microsoft commercial RPO, Oracle cloud/software revenue versus issuer RPO.",
      "Oracle revenue less cost of revenue is a gross-profit proxy, despite the source operating-income label.",
      "RPO is a stock of contracted obligations, not quarterly revenue or cash; no cross-company total or RPO/revenue ratio is calculated.",
      "This sheet contains no CapEx observations. Existing historical CapEx remains the scoring input.",
      "Forecast vintage retrieval time is unknown. As-of date defines the requested horizon, not source freshness.",
      "Single forecast vintage cannot support historical estimate revisions.",
      "No electrical-equipment shipment, order or lead-time inputs added to Supply."
    ]
  },
  "capex": [
    {
      "ticker": "MSFT",
      "quarters": [
        {
          "quarter": "2027Q1",
          "value": 48.851733333333335,
          "cell": "C13"
        },
        {
          "quarter": "2027Q2",
          "value": 50.983,
          "cell": "C14"
        },
        {
          "quarter": "2027Q3",
          "value": 52.47036666666666,
          "cell": "C15"
        },
        {
          "quarter": "2027Q4",
          "value": 54.0968,
          "cell": "C16"
        }
      ],
      "forward12m": 206.4019
    },
    {
      "ticker": "GOOGL",
      "quarters": [
        {
          "quarter": "2027Q1",
          "value": 69.33652,
          "cell": "AL13"
        },
        {
          "quarter": "2027Q2",
          "value": 76.46652,
          "cell": "AL14"
        },
        {
          "quarter": "2027Q3",
          "value": 83.26648,
          "cell": "AL15"
        },
        {
          "quarter": "2027Q4",
          "value": 90.36132,
          "cell": "AL16"
        }
      ],
      "forward12m": 319.43084
    },
    {
      "ticker": "AMZN",
      "quarters": [
        {
          "quarter": "2027Q1",
          "value": 63.5022,
          "cell": "AE13"
        },
        {
          "quarter": "2027Q2",
          "value": 71.19278571428572,
          "cell": "AE14"
        },
        {
          "quarter": "2027Q3",
          "value": 74.00285714285715,
          "cell": "AE15"
        },
        {
          "quarter": "2027Q4",
          "value": 81.562,
          "cell": "AE16"
        }
      ],
      "forward12m": 290.25984285714287
    },
    {
      "ticker": "META",
      "quarters": [
        {
          "quarter": "2027Q1",
          "value": 46.041464285714284,
          "cell": "AS13"
        },
        {
          "quarter": "2027Q2",
          "value": 51.21946428571429,
          "cell": "AS14"
        },
        {
          "quarter": "2027Q3",
          "value": 56.126464285714285,
          "cell": "AS15"
        },
        {
          "quarter": "2027Q4",
          "value": 62.34075,
          "cell": "AS16"
        }
      ],
      "forward12m": 215.72814285714287
    },
    {
      "ticker": "ORCL",
      "quarters": [
        {
          "quarter": "2027Q1",
          "value": 21.667850074321812,
          "cell": "AZ13"
        },
        {
          "quarter": "2027Q2",
          "value": 23.42173779264214,
          "cell": "AZ14"
        },
        {
          "quarter": "2027Q3",
          "value": 25.469949727663643,
          "cell": "AZ15"
        },
        {
          "quarter": "2027Q4",
          "value": 25.799287032967033,
          "cell": "AZ16"
        }
      ],
      "forward12m": 96.35882462759463
    }
  ],
  "rpo": [
    {
      "entity": "AMZN RPO",
      "period": "3Q26",
      "value": 561.8631275131579,
      "sourceCell": "B24",
      "yoy": null
    },
    {
      "entity": "AMZN RPO",
      "period": "4Q26",
      "value": 623.9638022935185,
      "sourceCell": "C24",
      "yoy": null
    },
    {
      "entity": "AMZN RPO",
      "period": "1Q27",
      "value": 723.3485620900959,
      "sourceCell": "D24",
      "yoy": null
    },
    {
      "entity": "AMZN RPO",
      "period": "2Q27",
      "value": 841.330610746408,
      "sourceCell": "E24",
      "yoy": null
    },
    {
      "entity": "AMZN RPO",
      "period": "3Q27",
      "value": 879.3532931067175,
      "sourceCell": "F24",
      "yoy": 56.5066739650262
    },
    {
      "entity": "AMZN RPO",
      "period": "4Q27",
      "value": 911.4211969210312,
      "sourceCell": "G24",
      "yoy": 46.069562620603755
    },
    {
      "entity": "Google Cloud RPO",
      "period": "3Q26",
      "value": 538.5075,
      "sourceCell": "B23",
      "yoy": null
    },
    {
      "entity": "Google Cloud RPO",
      "period": "4Q26",
      "value": 568.261225,
      "sourceCell": "C23",
      "yoy": null
    },
    {
      "entity": "Google Cloud RPO",
      "period": "1Q27",
      "value": 569.4531293333333,
      "sourceCell": "D23",
      "yoy": null
    },
    {
      "entity": "Google Cloud RPO",
      "period": "2Q27",
      "value": 586.6471817200002,
      "sourceCell": "E23",
      "yoy": null
    },
    {
      "entity": "Google Cloud RPO",
      "period": "3Q27",
      "value": 604.9281511070668,
      "sourceCell": "F23",
      "yoy": 12.334210964019388
    },
    {
      "entity": "Google Cloud RPO",
      "period": "4Q27",
      "value": 624.3721216845615,
      "sourceCell": "G23",
      "yoy": 9.874137846473975
    },
    {
      "entity": "MSFT Commerical RPO",
      "period": "3Q26",
      "value": 635.0,
      "sourceCell": "B25",
      "yoy": null
    },
    {
      "entity": "MSFT Commerical RPO",
      "period": "4Q26",
      "value": 637.0,
      "sourceCell": "C25",
      "yoy": null
    },
    {
      "entity": "MSFT Commerical RPO",
      "period": "1Q27",
      "value": 655.6375,
      "sourceCell": "D25",
      "yoy": null
    },
    {
      "entity": "MSFT Commerical RPO",
      "period": "2Q27",
      "value": 666.0208333333334,
      "sourceCell": "E25",
      "yoy": null
    },
    {
      "entity": "MSFT Commerical RPO",
      "period": "3Q27",
      "value": 685.495,
      "sourceCell": "F25",
      "yoy": 7.951968503937001
    },
    {
      "entity": "MSFT Commerical RPO",
      "period": "4Q27",
      "value": 709.4866666666667,
      "sourceCell": "G25",
      "yoy": 11.379382522239666
    },
    {
      "entity": "Oracle RPO",
      "period": "2Q27",
      "value": 704.1743885,
      "sourceCell": "B27",
      "yoy": null
    },
    {
      "entity": "Oracle RPO",
      "period": "3Q27",
      "value": 709.1660135,
      "sourceCell": "C27",
      "yoy": null
    },
    {
      "entity": "Oracle RPO",
      "period": "4Q27",
      "value": 616.74677975,
      "sourceCell": "D27",
      "yoy": null
    },
    {
      "entity": "Oracle RPO",
      "period": "1Q28",
      "value": 724.0711522500001,
      "sourceCell": "E27",
      "yoy": null
    },
    {
      "entity": "Oracle RPO",
      "period": "2Q28",
      "value": 777.278657285,
      "sourceCell": "F27",
      "yoy": 10.381557463446445
    },
    {
      "entity": "Oracle RPO",
      "period": "3Q28",
      "value": 780.7803147975001,
      "sourceCell": "G27",
      "yoy": 10.098383161942115
    }
  ],
  "hardware": [
    {
      "field": "ISPPDR48 Index",
      "name": "DDR5 spot price index",
      "pillar": "Context",
      "coreWeight": 0,
      "unit": "Source-native; verify Bloomberg field units before cross-series comparisons",
      "cells": [
        {
          "month": "2022-12",
          "level": null,
          "yoy": null,
          "unchangedFromPrevious": false,
          "partial": false
        },
        {
          "month": "2023-01",
          "level": null,
          "yoy": null,
          "unchangedFromPrevious": false,
          "partial": false
        },
        {
          "month": "2023-02",
          "level": null,
          "yoy": null,
          "unchangedFromPrevious": false,
          "partial": false
        },
        {
          "month": "2023-03",
          "level": null,
          "yoy": null,
          "unchangedFromPrevious": false,
          "partial": false
        },
        {
          "month": "2023-04",
          "level": null,
          "yoy": null,
          "unchangedFromPrevious": false,
          "partial": false
        },
        {
          "month": "2023-05",
          "level": null,
          "yoy": null,
          "unchangedFromPrevious": false,
          "partial": false
        },
        {
          "month": "2023-06",
          "level": null,
          "yoy": null,
          "unchangedFromPrevious": false,
          "partial": false
        },
        {
          "month": "2023-07",
          "level": null,
          "yoy": null,
          "unchangedFromPrevious": false,
          "partial": false
        },
        {
          "month": "2023-08",
          "level": null,
          "yoy": null,
          "unchangedFromPrevious": false,
          "partial": false
        },
        {
          "month": "2023-09",
          "level": null,
          "yoy": null,
          "unchangedFromPrevious": false,
          "partial": false
        },
        {
          "month": "2023-10",
          "level": 4.07,
          "yoy": null,
          "unchangedFromPrevious": false,
          "partial": false
        },
        {
          "month": "2023-11",
          "level": 4.16,
          "yoy": null,
          "unchangedFromPrevious": false,
          "partial": false
        },
        {
          "month": "2023-12",
          "level": 4.19,
          "yoy": null,
          "unchangedFromPrevious": false,
          "partial": false
        },
        {
          "month": "2024-01",
          "level": 4.21,
          "yoy": null,
          "unchangedFromPrevious": false,
          "partial": false
        },
        {
          "month": "2024-02",
          "level": 4.22,
          "yoy": null,
          "unchangedFromPrevious": false,
          "partial": false
        },
        {
          "month": "2024-03",
          "level": 4.21,
          "yoy": null,
          "unchangedFromPrevious": false,
          "partial": false
        },
        {
          "month": "2024-04",
          "level": 4.25,
          "yoy": null,
          "unchangedFromPrevious": false,
          "partial": false
        },
        {
          "month": "2024-05",
          "level": 4.25,
          "yoy": null,
          "unchangedFromPrevious": true,
          "partial": false
        },
        {
          "month": "2024-06",
          "level": 4.3,
          "yoy": null,
          "unchangedFromPrevious": false,
          "partial": false
        },
        {
          "month": "2024-07",
          "level": 4.44,
          "yoy": null,
          "unchangedFromPrevious": false,
          "partial": false
        },
        {
          "month": "2024-08",
          "level": 4.47,
          "yoy": null,
          "unchangedFromPrevious": false,
          "partial": false
        },
        {
          "month": "2024-09",
          "level": 4.5,
          "yoy": null,
          "unchangedFromPrevious": false,
          "partial": false
        },
        {
          "month": "2024-10",
          "level": 4.5,
          "yoy": 10.565110565110558,
          "unchangedFromPrevious": true,
          "partial": false
        },
        {
          "month": "2024-11",
          "level": 4.42,
          "yoy": 6.25,
          "unchangedFromPrevious": false,
          "partial": false
        },
        {
          "month": "2024-12",
          "level": 4.42,
          "yoy": 5.4892601431980825,
          "unchangedFromPrevious": true,
          "partial": false
        },
        {
          "month": "2025-01",
          "level": 4.36,
          "yoy": 3.5629453681710332,
          "unchangedFromPrevious": false,
          "partial": false
        },
        {
          "month": "2025-02",
          "level": 4.41,
          "yoy": 4.502369668246464,
          "unchangedFromPrevious": false,
          "partial": false
        },
        {
          "month": "2025-03",
          "level": 4.72,
          "yoy": 12.11401425178147,
          "unchangedFromPrevious": false,
          "partial": false
        },
        {
          "month": "2025-04",
          "level": 4.92,
          "yoy": 15.764705882352947,
          "unchangedFromPrevious": false,
          "partial": false
        },
        {
          "month": "2025-05",
          "level": 5.04,
          "yoy": 18.588235294117638,
          "unchangedFromPrevious": false,
          "partial": false
        },
        {
          "month": "2025-06",
          "level": 5.24,
          "yoy": 21.86046511627908,
          "unchangedFromPrevious": false,
          "partial": false
        },
        {
          "month": "2025-07",
          "level": 5.24,
          "yoy": 18.01801801801801,
          "unchangedFromPrevious": true,
          "partial": false
        },
        {
          "month": "2025-08",
          "level": 5.2,
          "yoy": 16.33109619686801,
          "unchangedFromPrevious": false,
          "partial": false
        },
        {
          "month": "2025-09",
          "level": 7.1,
          "yoy": 57.77777777777777,
          "unchangedFromPrevious": false,
          "partial": false
        },
        {
          "month": "2025-10",
          "level": 15.94,
          "yoy": 254.22222222222223,
          "unchangedFromPrevious": false,
          "partial": false
        },
        {
          "month": "2025-11",
          "level": 28.86,
          "yoy": 552.9411764705882,
          "unchangedFromPrevious": false,
          "partial": false
        },
        {
          "month": "2025-12",
          "level": 28.47,
          "yoy": 544.1176470588235,
          "unchangedFromPrevious": false,
          "partial": false
        },
        {
          "month": "2026-01",
          "level": 34.52,
          "yoy": 691.743119266055,
          "unchangedFromPrevious": false,
          "partial": false
        },
        {
          "month": "2026-02",
          "level": 33.42,
          "yoy": 657.8231292517007,
          "unchangedFromPrevious": false,
          "partial": false
        },
        {
          "month": "2026-03",
          "level": 31.37,
          "yoy": 564.6186440677966,
          "unchangedFromPrevious": false,
          "partial": false
        },
        {
          "month": "2026-04",
          "level": 33.31,
          "yoy": 577.0325203252032,
          "unchangedFromPrevious": false,
          "partial": false
        },
        {
          "month": "2026-05",
          "level": 39.46,
          "yoy": 682.936507936508,
          "unchangedFromPrevious": false,
          "partial": false
        },
        {
          "month": "2026-06",
          "level": 44.66,
          "yoy": 752.2900763358778,
          "unchangedFromPrevious": false,
          "partial": false
        },
        {
          "month": "2026-07",
          "level": 48.72,
          "yoy": 829.7709923664122,
          "unchangedFromPrevious": false,
          "partial": false
        },
        {
          "month": "2026-08",
          "level": 49.69,
          "yoy": 855.5769230769229,
          "unchangedFromPrevious": false,
          "partial": false
        },
        {
          "month": "2026-09",
          "level": 49.82,
          "yoy": 601.6901408450705,
          "unchangedFromPrevious": false,
          "partial": false
        },
        {
          "month": "2026-10",
          "level": 51.62,
          "yoy": 223.83939774153072,
          "unchangedFromPrevious": false,
          "partial": true
        }
      ]
    },
    {
      "field": "SDH100RT Index",
      "name": "Silicon H100 rental price index",
      "pillar": "Context",
      "coreWeight": 0,
      "unit": "Source-native; verify Bloomberg field units before cross-series comparisons",
      "cells": [
        {
          "month": "2022-12",
          "level": null,
          "yoy": null,
          "unchangedFromPrevious": false,
          "partial": false
        },
        {
          "month": "2023-01",
          "level": null,
          "yoy": null,
          "unchangedFromPrevious": false,
          "partial": false
        },
        {
          "month": "2023-02",
          "level": null,
          "yoy": null,
          "unchangedFromPrevious": false,
          "partial": false
        },
        {
          "month": "2023-03",
          "level": null,
          "yoy": null,
          "unchangedFromPrevious": false,
          "partial": false
        },
        {
          "month": "2023-04",
          "level": null,
          "yoy": null,
          "unchangedFromPrevious": false,
          "partial": false
        },
        {
          "month": "2023-05",
          "level": null,
          "yoy": null,
          "unchangedFromPrevious": false,
          "partial": false
        },
        {
          "month": "2023-06",
          "level": null,
          "yoy": null,
          "unchangedFromPrevious": false,
          "partial": false
        },
        {
          "month": "2023-07",
          "level": null,
          "yoy": null,
          "unchangedFromPrevious": false,
          "partial": false
        },
        {
          "month": "2023-08",
          "level": null,
          "yoy": null,
          "unchangedFromPrevious": false,
          "partial": false
        },
        {
          "month": "2023-09",
          "level": null,
          "yoy": null,
          "unchangedFromPrevious": false,
          "partial": false
        },
        {
          "month": "2023-10",
          "level": null,
          "yoy": null,
          "unchangedFromPrevious": false,
          "partial": false
        },
        {
          "month": "2023-11",
          "level": null,
          "yoy": null,
          "unchangedFromPrevious": false,
          "partial": false
        },
        {
          "month": "2023-12",
          "level": null,
          "yoy": null,
          "unchangedFromPrevious": false,
          "partial": false
        },
        {
          "month": "2024-01",
          "level": null,
          "yoy": null,
          "unchangedFromPrevious": false,
          "partial": false
        },
        {
          "month": "2024-02",
          "level": null,
          "yoy": null,
          "unchangedFromPrevious": false,
          "partial": false
        },
        {
          "month": "2024-03",
          "level": null,
          "yoy": null,
          "unchangedFromPrevious": false,
          "partial": false
        },
        {
          "month": "2024-04",
          "level": null,
          "yoy": null,
          "unchangedFromPrevious": false,
          "partial": false
        },
        {
          "month": "2024-05",
          "level": null,
          "yoy": null,
          "unchangedFromPrevious": false,
          "partial": false
        },
        {
          "month": "2024-06",
          "level": null,
          "yoy": null,
          "unchangedFromPrevious": false,
          "partial": false
        },
        {
          "month": "2024-07",
          "level": null,
          "yoy": null,
          "unchangedFromPrevious": false,
          "partial": false
        },
        {
          "month": "2024-08",
          "level": null,
          "yoy": null,
          "unchangedFromPrevious": false,
          "partial": false
        },
        {
          "month": "2024-09",
          "level": 2.74,
          "yoy": null,
          "unchangedFromPrevious": false,
          "partial": false
        },
        {
          "month": "2024-10",
          "level": 2.67,
          "yoy": null,
          "unchangedFromPrevious": false,
          "partial": false
        },
        {
          "month": "2024-11",
          "level": 2.44,
          "yoy": null,
          "unchangedFromPrevious": false,
          "partial": false
        },
        {
          "month": "2024-12",
          "level": 2.11,
          "yoy": null,
          "unchangedFromPrevious": false,
          "partial": false
        },
        {
          "month": "2025-01",
          "level": 1.9,
          "yoy": null,
          "unchangedFromPrevious": false,
          "partial": false
        },
        {
          "month": "2025-02",
          "level": 1.89,
          "yoy": null,
          "unchangedFromPrevious": false,
          "partial": false
        },
        {
          "month": "2025-03",
          "level": 2.5,
          "yoy": null,
          "unchangedFromPrevious": false,
          "partial": false
        },
        {
          "month": "2025-04",
          "level": 2.38,
          "yoy": null,
          "unchangedFromPrevious": false,
          "partial": false
        },
        {
          "month": "2025-05",
          "level": 2.21,
          "yoy": null,
          "unchangedFromPrevious": false,
          "partial": false
        },
        {
          "month": "2025-06",
          "level": 2.12,
          "yoy": null,
          "unchangedFromPrevious": false,
          "partial": false
        },
        {
          "month": "2025-07",
          "level": 2.12,
          "yoy": null,
          "unchangedFromPrevious": true,
          "partial": false
        },
        {
          "month": "2025-08",
          "level": 2.08,
          "yoy": null,
          "unchangedFromPrevious": false,
          "partial": false
        },
        {
          "month": "2025-09",
          "level": 2.01,
          "yoy": -26.642335766423376,
          "unchangedFromPrevious": false,
          "partial": false
        },
        {
          "month": "2025-10",
          "level": 1.99,
          "yoy": -25.468164794007485,
          "unchangedFromPrevious": false,
          "partial": false
        },
        {
          "month": "2025-11",
          "level": 1.96,
          "yoy": -19.672131147540984,
          "unchangedFromPrevious": false,
          "partial": false
        },
        {
          "month": "2025-12",
          "level": 2.2,
          "yoy": 4.2654028436019065,
          "unchangedFromPrevious": false,
          "partial": false
        },
        {
          "month": "2026-01",
          "level": 2.3,
          "yoy": 21.052631578947366,
          "unchangedFromPrevious": false,
          "partial": false
        },
        {
          "month": "2026-02",
          "level": 2.43,
          "yoy": 28.57142857142858,
          "unchangedFromPrevious": false,
          "partial": false
        },
        {
          "month": "2026-03",
          "level": 2.64,
          "yoy": 5.600000000000005,
          "unchangedFromPrevious": false,
          "partial": false
        },
        {
          "month": "2026-04",
          "level": 2.59,
          "yoy": 8.823529411764696,
          "unchangedFromPrevious": false,
          "partial": false
        },
        {
          "month": "2026-05",
          "level": 2.73,
          "yoy": 23.529411764705888,
          "unchangedFromPrevious": false,
          "partial": false
        },
        {
          "month": "2026-06",
          "level": 2.59,
          "yoy": 22.169811320754707,
          "unchangedFromPrevious": false,
          "partial": false
        },
        {
          "month": "2026-07",
          "level": 2.78,
          "yoy": 31.132075471698094,
          "unchangedFromPrevious": false,
          "partial": false
        },
        {
          "month": "2026-08",
          "level": 2.62,
          "yoy": 25.96153846153846,
          "unchangedFromPrevious": false,
          "partial": false
        },
        {
          "month": "2026-09",
          "level": 2.75,
          "yoy": 36.81592039800996,
          "unchangedFromPrevious": false,
          "partial": false
        },
        {
          "month": "2026-10",
          "level": 2.84,
          "yoy": 42.713567839195974,
          "unchangedFromPrevious": false,
          "partial": true
        }
      ]
    },
    {
      "field": "SDB200RT Index",
      "name": "Silicon B200 rental price index (non-hyperscale)",
      "pillar": "Context",
      "coreWeight": 0,
      "unit": "Source-native; verify Bloomberg field units before cross-series comparisons",
      "cells": [
        {
          "month": "2022-12",
          "level": null,
          "yoy": null,
          "unchangedFromPrevious": false,
          "partial": false
        },
        {
          "month": "2023-01",
          "level": null,
          "yoy": null,
          "unchangedFromPrevious": false,
          "partial": false
        },
        {
          "month": "2023-02",
          "level": null,
          "yoy": null,
          "unchangedFromPrevious": false,
          "partial": false
        },
        {
          "month": "2023-03",
          "level": null,
          "yoy": null,
          "unchangedFromPrevious": false,
          "partial": false
        },
        {
          "month": "2023-04",
          "level": null,
          "yoy": null,
          "unchangedFromPrevious": false,
          "partial": false
        },
        {
          "month": "2023-05",
          "level": null,
          "yoy": null,
          "unchangedFromPrevious": false,
          "partial": false
        },
        {
          "month": "2023-06",
          "level": null,
          "yoy": null,
          "unchangedFromPrevious": false,
          "partial": false
        },
        {
          "month": "2023-07",
          "level": null,
          "yoy": null,
          "unchangedFromPrevious": false,
          "partial": false
        },
        {
          "month": "2023-08",
          "level": null,
          "yoy": null,
          "unchangedFromPrevious": false,
          "partial": false
        },
        {
          "month": "2023-09",
          "level": null,
          "yoy": null,
          "unchangedFromPrevious": false,
          "partial": false
        },
        {
          "month": "2023-10",
          "level": null,
          "yoy": null,
          "unchangedFromPrevious": false,
          "partial": false
        },
        {
          "month": "2023-11",
          "level": null,
          "yoy": null,
          "unchangedFromPrevious": false,
          "partial": false
        },
        {
          "month": "2023-12",
          "level": null,
          "yoy": null,
          "unchangedFromPrevious": false,
          "partial": false
        },
        {
          "month": "2024-01",
          "level": null,
          "yoy": null,
          "unchangedFromPrevious": false,
          "partial": false
        },
        {
          "month": "2024-02",
          "level": null,
          "yoy": null,
          "unchangedFromPrevious": false,
          "partial": false
        },
        {
          "month": "2024-03",
          "level": null,
          "yoy": null,
          "unchangedFromPrevious": false,
          "partial": false
        },
        {
          "month": "2024-04",
          "level": null,
          "yoy": null,
          "unchangedFromPrevious": false,
          "partial": false
        },
        {
          "month": "2024-05",
          "level": null,
          "yoy": null,
          "unchangedFromPrevious": false,
          "partial": false
        },
        {
          "month": "2024-06",
          "level": null,
          "yoy": null,
          "unchangedFromPrevious": false,
          "partial": false
        },
        {
          "month": "2024-07",
          "level": null,
          "yoy": null,
          "unchangedFromPrevious": false,
          "partial": false
        },
        {
          "month": "2024-08",
          "level": null,
          "yoy": null,
          "unchangedFromPrevious": false,
          "partial": false
        },
        {
          "month": "2024-09",
          "level": null,
          "yoy": null,
          "unchangedFromPrevious": false,
          "partial": false
        },
        {
          "month": "2024-10",
          "level": null,
          "yoy": null,
          "unchangedFromPrevious": false,
          "partial": false
        },
        {
          "month": "2024-11",
          "level": null,
          "yoy": null,
          "unchangedFromPrevious": false,
          "partial": false
        },
        {
          "month": "2024-12",
          "level": null,
          "yoy": null,
          "unchangedFromPrevious": false,
          "partial": false
        },
        {
          "month": "2025-01",
          "level": null,
          "yoy": null,
          "unchangedFromPrevious": false,
          "partial": false
        },
        {
          "month": "2025-02",
          "level": null,
          "yoy": null,
          "unchangedFromPrevious": false,
          "partial": false
        },
        {
          "month": "2025-03",
          "level": null,
          "yoy": null,
          "unchangedFromPrevious": false,
          "partial": false
        },
        {
          "month": "2025-04",
          "level": null,
          "yoy": null,
          "unchangedFromPrevious": false,
          "partial": false
        },
        {
          "month": "2025-05",
          "level": null,
          "yoy": null,
          "unchangedFromPrevious": false,
          "partial": false
        },
        {
          "month": "2025-06",
          "level": null,
          "yoy": null,
          "unchangedFromPrevious": false,
          "partial": false
        },
        {
          "month": "2025-07",
          "level": 5.3,
          "yoy": null,
          "unchangedFromPrevious": false,
          "partial": false
        },
        {
          "month": "2025-08",
          "level": 5.29,
          "yoy": null,
          "unchangedFromPrevious": false,
          "partial": false
        },
        {
          "month": "2025-09",
          "level": 5.01,
          "yoy": null,
          "unchangedFromPrevious": false,
          "partial": false
        },
        {
          "month": "2025-10",
          "level": 4.77,
          "yoy": null,
          "unchangedFromPrevious": false,
          "partial": false
        },
        {
          "month": "2025-11",
          "level": 4.6,
          "yoy": null,
          "unchangedFromPrevious": false,
          "partial": false
        },
        {
          "month": "2025-12",
          "level": 4.4,
          "yoy": null,
          "unchangedFromPrevious": false,
          "partial": false
        },
        {
          "month": "2026-01",
          "level": 4.43,
          "yoy": null,
          "unchangedFromPrevious": false,
          "partial": false
        },
        {
          "month": "2026-02",
          "level": 4.43,
          "yoy": null,
          "unchangedFromPrevious": true,
          "partial": false
        },
        {
          "month": "2026-03",
          "level": 5.47,
          "yoy": null,
          "unchangedFromPrevious": false,
          "partial": false
        },
        {
          "month": "2026-04",
          "level": 5.16,
          "yoy": null,
          "unchangedFromPrevious": false,
          "partial": false
        },
        {
          "month": "2026-05",
          "level": 5.38,
          "yoy": null,
          "unchangedFromPrevious": false,
          "partial": false
        },
        {
          "month": "2026-06",
          "level": 5.36,
          "yoy": null,
          "unchangedFromPrevious": false,
          "partial": false
        },
        {
          "month": "2026-07",
          "level": 5.67,
          "yoy": 6.981132075471708,
          "unchangedFromPrevious": false,
          "partial": false
        },
        {
          "month": "2026-08",
          "level": 5.62,
          "yoy": 6.238185255198481,
          "unchangedFromPrevious": false,
          "partial": false
        },
        {
          "month": "2026-09",
          "level": 5.78,
          "yoy": 15.369261477045914,
          "unchangedFromPrevious": false,
          "partial": false
        },
        {
          "month": "2026-10",
          "level": 6.14,
          "yoy": 28.721174004192875,
          "unchangedFromPrevious": false,
          "partial": true
        }
      ]
    }
  ],
  "monthly": [
    {
      "month": "2024-01",
      "score": null
    },
    {
      "month": "2024-02",
      "score": null
    },
    {
      "month": "2024-03",
      "score": null
    },
    {
      "month": "2024-04",
      "score": null
    },
    {
      "month": "2024-05",
      "score": null
    },
    {
      "month": "2024-06",
      "score": null
    },
    {
      "month": "2024-07",
      "score": null
    },
    {
      "month": "2024-08",
      "score": null
    },
    {
      "month": "2024-09",
      "score": null
    },
    {
      "month": "2024-10",
      "score": null
    },
    {
      "month": "2024-11",
      "score": null
    },
    {
      "month": "2024-12",
      "score": null
    },
    {
      "month": "2025-01",
      "score": null
    },
    {
      "month": "2025-02",
      "score": null
    },
    {
      "month": "2025-03",
      "score": null
    },
    {
      "month": "2025-04",
      "score": null
    },
    {
      "month": "2025-05",
      "score": null
    },
    {
      "month": "2025-06",
      "score": null
    },
    {
      "month": "2025-07",
      "score": null
    },
    {
      "month": "2025-08",
      "score": null
    },
    {
      "month": "2025-09",
      "score": 30.584749021526953
    },
    {
      "month": "2025-10",
      "score": 24.891066600400915
    },
    {
      "month": "2025-11",
      "score": 32.09916360378605
    },
    {
      "month": "2025-12",
      "score": 38.30567520991626
    },
    {
      "month": "2026-01",
      "score": 57.32314931627234
    },
    {
      "month": "2026-02",
      "score": 58.681141769166246
    },
    {
      "month": "2026-03",
      "score": 44.266302817935674
    },
    {
      "month": "2026-04",
      "score": 49.06457973851402
    },
    {
      "month": "2026-05",
      "score": 60.70411213659529
    },
    {
      "month": "2026-06",
      "score": 63.75574559927488
    },
    {
      "month": "2026-07",
      "score": null
    },
    {
      "month": "2026-08",
      "score": null
    },
    {
      "month": "2026-09",
      "score": null
    }
  ]
} as const;
