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
    "workbookSha256": "2087ba73078d67f788935cd301735baecaf8c97a2b713e63945c2fb2460edc1d",
    "cloudWorkbookSha256": "239cdab3e4d684bc468e64daeda8722a54b66fce02480407923a7c5543ebce4e",
    "forwardMethod": "CapEx: next four complete calendar quarters after the as-of quarter, raw saved Bloomberg estimates in USD billions. Not a day-exact rolling horizon and not lease-bridged. RPO: native fiscal-period stock estimates, never summed across quarters or issuers.",
    "rpoGrowthVsCapexStatus": "Withheld: RPO fiscal-calendar alignment, comparable scope and matched historical/forward growth bases are not verified. No fabricated historical estimates or revisions.",
    "limitations": [
      "All queried observations explicitly request estimates (FA_ACT_EST_DATA=E).",
      "Revenue and RPO scopes differ: Google Cloud segment, AWS revenue versus AMZN issuer RPO, Intelligent Cloud versus Microsoft commercial RPO, Oracle cloud/software revenue versus issuer RPO.",
      "Oracle revenue less cost of revenue is a gross-profit proxy, despite the source operating-income label.",
      "RPO is a stock of contracted obligations at period end. Calendar-quarter chart totals can combine different issuer period ends.",
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
      "period": "3Q24",
      "value": 119.67559405095388,
      "sourceCell": "B30",
      "yoy": null
    },
    {
      "entity": "AMZN RPO",
      "period": "4Q24",
      "value": 180.39845595948097,
      "sourceCell": "C30",
      "yoy": null
    },
    {
      "entity": "AMZN RPO",
      "period": "1Q25",
      "value": 181.2767736152335,
      "sourceCell": "D30",
      "yoy": null
    },
    {
      "entity": "AMZN RPO",
      "period": "2Q25",
      "value": 182.60082639000436,
      "sourceCell": "E30",
      "yoy": null
    },
    {
      "entity": "AMZN RPO",
      "period": "3Q25",
      "value": 200.51814000000002,
      "sourceCell": "F30",
      "yoy": 67.55140560624757
    },
    {
      "entity": "AMZN RPO",
      "period": "4Q25",
      "value": 223.60488006578947,
      "sourceCell": "G30",
      "yoy": 23.950550949290307
    },
    {
      "entity": "AMZN RPO",
      "period": "1Q26",
      "value": 263.9203526,
      "sourceCell": "H30",
      "yoy": 45.58972301668413
    },
    {
      "entity": "AMZN RPO",
      "period": "2Q26",
      "value": 370.68799033707865,
      "sourceCell": "I30",
      "yoy": 103.00455242483517
    },
    {
      "entity": "AMZN RPO",
      "period": "3Q26",
      "value": 555.5754183421053,
      "sourceCell": "J30",
      "yoy": 177.06990417031858
    },
    {
      "entity": "AMZN RPO",
      "period": "4Q26",
      "value": 655.4952390695761,
      "sourceCell": "K30",
      "yoy": 193.14889678468333
    },
    {
      "entity": "AMZN RPO",
      "period": "1Q27",
      "value": 754.8799988661538,
      "sourceCell": "L30",
      "yoy": 186.02568594255274
    },
    {
      "entity": "AMZN RPO",
      "period": "2Q27",
      "value": 872.8620475224657,
      "sourceCell": "M30",
      "yoy": 135.47081919992706
    },
    {
      "entity": "AMZN RPO",
      "period": "3Q27",
      "value": 949.3056673827753,
      "sourceCell": "N30",
      "yoy": 70.86891105002483
    },
    {
      "entity": "AMZN RPO",
      "period": "4Q27",
      "value": 981.3735711970892,
      "sourceCell": "O30",
      "yoy": 49.71482822515565
    },
    {
      "entity": "Google Cloud RPO",
      "period": "3Q24",
      "value": 83.256,
      "sourceCell": "B27",
      "yoy": null
    },
    {
      "entity": "Google Cloud RPO",
      "period": "4Q24",
      "value": 82.0073,
      "sourceCell": "C27",
      "yoy": null
    },
    {
      "entity": "Google Cloud RPO",
      "period": "1Q25",
      "value": 94.2,
      "sourceCell": "D27",
      "yoy": null
    },
    {
      "entity": "Google Cloud RPO",
      "period": "2Q25",
      "value": 96.2,
      "sourceCell": "E27",
      "yoy": null
    },
    {
      "entity": "Google Cloud RPO",
      "period": "3Q25",
      "value": 121.4,
      "sourceCell": "F27",
      "yoy": 45.815316613817636
    },
    {
      "entity": "Google Cloud RPO",
      "period": "4Q25",
      "value": 115.4,
      "sourceCell": "G27",
      "yoy": 40.719179877888934
    },
    {
      "entity": "Google Cloud RPO",
      "period": "1Q26",
      "value": 251.60490196078433,
      "sourceCell": "H27",
      "yoy": 167.09649889679864
    },
    {
      "entity": "Google Cloud RPO",
      "period": "2Q26",
      "value": 491.1075,
      "sourceCell": "I27",
      "yoy": 410.5067567567567
    },
    {
      "entity": "Google Cloud RPO",
      "period": "3Q26",
      "value": 545.406,
      "sourceCell": "J27",
      "yoy": 349.26359143327835
    },
    {
      "entity": "Google Cloud RPO",
      "period": "4Q26",
      "value": 576.576,
      "sourceCell": "K27",
      "yoy": 399.632582322357
    },
    {
      "entity": "Google Cloud RPO",
      "period": "1Q27",
      "value": 612.9726875,
      "sourceCell": "L27",
      "yoy": 143.6250974138569
    },
    {
      "entity": "Google Cloud RPO",
      "period": "2Q27",
      "value": 645.095433375,
      "sourceCell": "M27",
      "yoy": 31.355239611490337
    },
    {
      "entity": "Google Cloud RPO",
      "period": "3Q27",
      "value": 696.8441108783334,
      "sourceCell": "N27",
      "yoy": 27.766124846139096
    },
    {
      "entity": "Google Cloud RPO",
      "period": "4Q27",
      "value": 738.6931811709252,
      "sourceCell": "O27",
      "yoy": 28.117226726559053
    },
    {
      "entity": "MSFT Commerical RPO",
      "period": "3Q24",
      "value": 237.55958519103706,
      "sourceCell": "B33",
      "yoy": null
    },
    {
      "entity": "MSFT Commerical RPO",
      "period": "4Q24",
      "value": 270.8621569391022,
      "sourceCell": "C33",
      "yoy": null
    },
    {
      "entity": "MSFT Commerical RPO",
      "period": "1Q25",
      "value": 254.91398892835474,
      "sourceCell": "D33",
      "yoy": null
    },
    {
      "entity": "MSFT Commerical RPO",
      "period": "2Q26",
      "value": 402.0,
      "sourceCell": "I33",
      "yoy": null
    },
    {
      "entity": "MSFT Commerical RPO",
      "period": "3Q26",
      "value": 635.0,
      "sourceCell": "J33",
      "yoy": null
    },
    {
      "entity": "MSFT Commerical RPO",
      "period": "4Q26",
      "value": 637.0,
      "sourceCell": "K33",
      "yoy": null
    },
    {
      "entity": "MSFT Commerical RPO",
      "period": "1Q27",
      "value": 655.6375,
      "sourceCell": "L33",
      "yoy": null
    },
    {
      "entity": "MSFT Commerical RPO",
      "period": "2Q27",
      "value": 681.3333333333334,
      "sourceCell": "M33",
      "yoy": 69.48590381426203
    },
    {
      "entity": "MSFT Commerical RPO",
      "period": "3Q27",
      "value": 695.8426666666667,
      "sourceCell": "N33",
      "yoy": 9.581522309711277
    },
    {
      "entity": "MSFT Commerical RPO",
      "period": "4Q27",
      "value": 716.0133333333333,
      "sourceCell": "O33",
      "yoy": 12.40397697540554
    },
    {
      "entity": "Oracle RPO",
      "period": "2Q25",
      "value": 86.45,
      "sourceCell": "B37",
      "yoy": null
    },
    {
      "entity": "Oracle RPO",
      "period": "3Q25",
      "value": 104.42436000000001,
      "sourceCell": "C37",
      "yoy": null
    },
    {
      "entity": "Oracle RPO",
      "period": "4Q25",
      "value": 127.81156200000001,
      "sourceCell": "D37",
      "yoy": null
    },
    {
      "entity": "Oracle RPO",
      "period": "1Q26",
      "value": 149.193007125,
      "sourceCell": "E37",
      "yoy": null
    },
    {
      "entity": "Oracle RPO",
      "period": "2Q26",
      "value": 519.376895,
      "sourceCell": "F37",
      "yoy": 500.782990167727
    },
    {
      "entity": "Oracle RPO",
      "period": "3Q26",
      "value": 537.7923385224748,
      "sourceCell": "G37",
      "yoy": 415.00659283185917
    },
    {
      "entity": "Oracle RPO",
      "period": "4Q26",
      "value": 589.5112629666665,
      "sourceCell": "H37",
      "yoy": 361.2346909324733
    },
    {
      "entity": "Oracle RPO",
      "period": "1Q27",
      "value": 641.7709154347826,
      "sourceCell": "I37",
      "yoy": 330.1615255312072
    },
    {
      "entity": "Oracle RPO",
      "period": "2Q27",
      "value": 680.8792635,
      "sourceCell": "J37",
      "yoy": 31.09540875898995
    },
    {
      "entity": "Oracle RPO",
      "period": "3Q27",
      "value": 695.3191635000001,
      "sourceCell": "K37",
      "yoy": 29.29138511164233
    },
    {
      "entity": "Oracle RPO",
      "period": "4Q27",
      "value": 692.86946175,
      "sourceCell": "L37",
      "yoy": 17.53286243645149
    },
    {
      "entity": "Oracle RPO",
      "period": "1Q28",
      "value": 726.49168789,
      "sourceCell": "M37",
      "yoy": 13.201092542160664
    },
    {
      "entity": "Oracle RPO",
      "period": "2Q28",
      "value": 752.2969661378,
      "sourceCell": "N37",
      "yoy": 10.489040637055624
    },
    {
      "entity": "Oracle RPO",
      "period": "3Q28",
      "value": 764.323805077356,
      "sourceCell": "O37",
      "yoy": 9.924167950443085
    }
  ],
  "hardware": [
    {
      "source": "AI_Infra.xlsx",
      "sheet": "High Freq Data Value",
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
          "level": 53.12,
          "yoy": 233.2496863237139,
          "unchangedFromPrevious": false,
          "partial": true
        },
        {
          "month": "2026-11",
          "level": 53.119998931884766,
          "yoy": 84.06098035996108,
          "unchangedFromPrevious": false,
          "partial": true
        }
      ],
      "daily": [
        {
          "date": "2023-10-02",
          "value": 4.0525
        },
        {
          "date": "2023-10-03",
          "value": 4.05
        },
        {
          "date": "2023-10-05",
          "value": 4.06
        },
        {
          "date": "2023-10-06",
          "value": 4.07
        },
        {
          "date": "2023-10-11",
          "value": 4.08
        },
        {
          "date": "2023-10-12",
          "value": 4.09
        },
        {
          "date": "2023-10-13",
          "value": 4.09
        },
        {
          "date": "2023-10-16",
          "value": 4.09
        },
        {
          "date": "2023-10-17",
          "value": 4.08
        },
        {
          "date": "2023-10-18",
          "value": 4.07
        },
        {
          "date": "2023-10-19",
          "value": 4.07
        },
        {
          "date": "2023-10-20",
          "value": 4.07
        },
        {
          "date": "2023-10-23",
          "value": 4.06
        },
        {
          "date": "2023-10-24",
          "value": 4.06
        },
        {
          "date": "2023-10-25",
          "value": 4.06
        },
        {
          "date": "2023-10-26",
          "value": 4.06
        },
        {
          "date": "2023-10-27",
          "value": 4.06
        },
        {
          "date": "2023-10-30",
          "value": 4.06
        },
        {
          "date": "2023-10-31",
          "value": 4.07
        },
        {
          "date": "2023-11-01",
          "value": 4.07
        },
        {
          "date": "2023-11-02",
          "value": 4.07
        },
        {
          "date": "2023-11-03",
          "value": 4.07
        },
        {
          "date": "2023-11-06",
          "value": 4.07
        },
        {
          "date": "2023-11-07",
          "value": 4.07
        },
        {
          "date": "2023-11-08",
          "value": 4.07
        },
        {
          "date": "2023-11-09",
          "value": 4.07
        },
        {
          "date": "2023-11-10",
          "value": 4.06
        },
        {
          "date": "2023-11-13",
          "value": 4.06
        },
        {
          "date": "2023-11-14",
          "value": 4.06
        },
        {
          "date": "2023-11-15",
          "value": 4.06
        },
        {
          "date": "2023-11-16",
          "value": 4.08
        },
        {
          "date": "2023-11-17",
          "value": 4.09
        },
        {
          "date": "2023-11-20",
          "value": 4.1
        },
        {
          "date": "2023-11-21",
          "value": 4.1
        },
        {
          "date": "2023-11-22",
          "value": 4.1
        },
        {
          "date": "2023-11-23",
          "value": 4.11
        },
        {
          "date": "2023-11-24",
          "value": 4.12
        },
        {
          "date": "2023-11-27",
          "value": 4.13
        },
        {
          "date": "2023-11-28",
          "value": 4.14
        },
        {
          "date": "2023-11-29",
          "value": 4.14
        },
        {
          "date": "2023-11-30",
          "value": 4.16
        },
        {
          "date": "2023-12-01",
          "value": 4.16
        },
        {
          "date": "2023-12-04",
          "value": 4.16
        },
        {
          "date": "2023-12-05",
          "value": 4.17
        },
        {
          "date": "2023-12-06",
          "value": 4.17
        },
        {
          "date": "2023-12-07",
          "value": 4.18
        },
        {
          "date": "2023-12-08",
          "value": 4.18
        },
        {
          "date": "2023-12-11",
          "value": 4.19
        },
        {
          "date": "2023-12-12",
          "value": 4.19
        },
        {
          "date": "2023-12-13",
          "value": 4.19
        },
        {
          "date": "2023-12-14",
          "value": 4.19
        },
        {
          "date": "2023-12-15",
          "value": 4.19
        },
        {
          "date": "2023-12-18",
          "value": 4.19
        },
        {
          "date": "2023-12-19",
          "value": 4.19
        },
        {
          "date": "2023-12-20",
          "value": 4.17
        },
        {
          "date": "2023-12-21",
          "value": 4.17
        },
        {
          "date": "2023-12-22",
          "value": 4.17
        },
        {
          "date": "2023-12-25",
          "value": 4.18
        },
        {
          "date": "2023-12-26",
          "value": 4.18
        },
        {
          "date": "2023-12-27",
          "value": 4.18
        },
        {
          "date": "2023-12-28",
          "value": 4.19
        },
        {
          "date": "2023-12-29",
          "value": 4.19
        },
        {
          "date": "2024-01-02",
          "value": 4.19
        },
        {
          "date": "2024-01-03",
          "value": 4.2
        },
        {
          "date": "2024-01-04",
          "value": 4.2
        },
        {
          "date": "2024-01-05",
          "value": 4.2
        },
        {
          "date": "2024-01-08",
          "value": 4.2
        },
        {
          "date": "2024-01-09",
          "value": 4.2
        },
        {
          "date": "2024-01-10",
          "value": 4.2
        },
        {
          "date": "2024-01-11",
          "value": 4.2
        },
        {
          "date": "2024-01-12",
          "value": 4.2
        },
        {
          "date": "2024-01-15",
          "value": 4.2
        },
        {
          "date": "2024-01-16",
          "value": 4.2
        },
        {
          "date": "2024-01-17",
          "value": 4.21
        },
        {
          "date": "2024-01-18",
          "value": 4.21
        },
        {
          "date": "2024-01-19",
          "value": 4.21
        },
        {
          "date": "2024-01-22",
          "value": 4.21
        },
        {
          "date": "2024-01-23",
          "value": 4.21
        },
        {
          "date": "2024-01-24",
          "value": 4.21
        },
        {
          "date": "2024-01-25",
          "value": 4.21
        },
        {
          "date": "2024-01-26",
          "value": 4.21
        },
        {
          "date": "2024-01-29",
          "value": 4.21
        },
        {
          "date": "2024-01-30",
          "value": 4.21
        },
        {
          "date": "2024-01-31",
          "value": 4.21
        },
        {
          "date": "2024-02-01",
          "value": 4.21
        },
        {
          "date": "2024-02-02",
          "value": 4.21
        },
        {
          "date": "2024-02-05",
          "value": 4.21
        },
        {
          "date": "2024-02-06",
          "value": 4.21
        },
        {
          "date": "2024-02-07",
          "value": 4.21
        },
        {
          "date": "2024-02-15",
          "value": 4.21
        },
        {
          "date": "2024-02-16",
          "value": 4.21
        },
        {
          "date": "2024-02-19",
          "value": 4.21
        },
        {
          "date": "2024-02-20",
          "value": 4.21
        },
        {
          "date": "2024-02-21",
          "value": 4.21
        },
        {
          "date": "2024-02-22",
          "value": 4.22
        },
        {
          "date": "2024-02-23",
          "value": 4.22
        },
        {
          "date": "2024-02-26",
          "value": 4.22
        },
        {
          "date": "2024-02-27",
          "value": 4.22
        },
        {
          "date": "2024-02-29",
          "value": 4.22
        },
        {
          "date": "2024-03-01",
          "value": 4.22
        },
        {
          "date": "2024-03-04",
          "value": 4.22
        },
        {
          "date": "2024-03-05",
          "value": 4.22
        },
        {
          "date": "2024-03-06",
          "value": 4.22
        },
        {
          "date": "2024-03-07",
          "value": 4.22
        },
        {
          "date": "2024-03-08",
          "value": 4.22
        },
        {
          "date": "2024-03-11",
          "value": 4.22
        },
        {
          "date": "2024-03-12",
          "value": 4.22
        },
        {
          "date": "2024-03-13",
          "value": 4.22
        },
        {
          "date": "2024-03-14",
          "value": 4.21
        },
        {
          "date": "2024-03-15",
          "value": 4.21
        },
        {
          "date": "2024-03-18",
          "value": 4.21
        },
        {
          "date": "2024-03-19",
          "value": 4.21
        },
        {
          "date": "2024-03-20",
          "value": 4.21
        },
        {
          "date": "2024-03-21",
          "value": 4.21
        },
        {
          "date": "2024-03-22",
          "value": 4.21
        },
        {
          "date": "2024-03-25",
          "value": 4.21
        },
        {
          "date": "2024-03-26",
          "value": 4.21
        },
        {
          "date": "2024-03-27",
          "value": 4.21
        },
        {
          "date": "2024-03-28",
          "value": 4.21
        },
        {
          "date": "2024-03-29",
          "value": 4.21
        },
        {
          "date": "2024-04-01",
          "value": 4.21
        },
        {
          "date": "2024-04-02",
          "value": 4.21
        },
        {
          "date": "2024-04-03",
          "value": 4.21
        },
        {
          "date": "2024-04-08",
          "value": 4.21
        },
        {
          "date": "2024-04-09",
          "value": 4.22
        },
        {
          "date": "2024-04-10",
          "value": 4.23
        },
        {
          "date": "2024-04-11",
          "value": 4.23
        },
        {
          "date": "2024-04-12",
          "value": 4.24
        },
        {
          "date": "2024-04-15",
          "value": 4.24
        },
        {
          "date": "2024-04-16",
          "value": 4.24
        },
        {
          "date": "2024-04-17",
          "value": 4.24
        },
        {
          "date": "2024-04-18",
          "value": 4.24
        },
        {
          "date": "2024-04-19",
          "value": 4.24
        },
        {
          "date": "2024-04-22",
          "value": 4.24
        },
        {
          "date": "2024-04-23",
          "value": 4.24
        },
        {
          "date": "2024-04-24",
          "value": 4.24
        },
        {
          "date": "2024-04-25",
          "value": 4.24
        },
        {
          "date": "2024-04-26",
          "value": 4.25
        },
        {
          "date": "2024-04-29",
          "value": 4.25
        },
        {
          "date": "2024-04-30",
          "value": 4.25
        },
        {
          "date": "2024-05-02",
          "value": 4.25
        },
        {
          "date": "2024-05-03",
          "value": 4.25
        },
        {
          "date": "2024-05-06",
          "value": 4.25
        },
        {
          "date": "2024-05-07",
          "value": 4.25
        },
        {
          "date": "2024-05-08",
          "value": 4.25
        },
        {
          "date": "2024-05-09",
          "value": 4.25
        },
        {
          "date": "2024-05-10",
          "value": 4.25
        },
        {
          "date": "2024-05-13",
          "value": 4.25
        },
        {
          "date": "2024-05-14",
          "value": 4.26
        },
        {
          "date": "2024-05-15",
          "value": 4.26
        },
        {
          "date": "2024-05-16",
          "value": 4.26
        },
        {
          "date": "2024-05-17",
          "value": 4.26
        },
        {
          "date": "2024-05-20",
          "value": 4.26
        },
        {
          "date": "2024-05-21",
          "value": 4.26
        },
        {
          "date": "2024-05-22",
          "value": 4.26
        },
        {
          "date": "2024-05-23",
          "value": 4.26
        },
        {
          "date": "2024-05-24",
          "value": 4.25
        },
        {
          "date": "2024-05-27",
          "value": 4.25
        },
        {
          "date": "2024-05-28",
          "value": 4.25
        },
        {
          "date": "2024-05-29",
          "value": 4.25
        },
        {
          "date": "2024-05-30",
          "value": 4.25
        },
        {
          "date": "2024-05-31",
          "value": 4.25
        },
        {
          "date": "2024-06-03",
          "value": 4.25
        },
        {
          "date": "2024-06-04",
          "value": 4.25
        },
        {
          "date": "2024-06-05",
          "value": 4.25
        },
        {
          "date": "2024-06-06",
          "value": 4.25
        },
        {
          "date": "2024-06-07",
          "value": 4.25
        },
        {
          "date": "2024-06-11",
          "value": 4.25
        },
        {
          "date": "2024-06-12",
          "value": 4.25
        },
        {
          "date": "2024-06-13",
          "value": 4.25
        },
        {
          "date": "2024-06-14",
          "value": 4.25
        },
        {
          "date": "2024-06-17",
          "value": 4.25
        },
        {
          "date": "2024-06-18",
          "value": 4.25
        },
        {
          "date": "2024-06-19",
          "value": 4.25
        },
        {
          "date": "2024-06-20",
          "value": 4.25
        },
        {
          "date": "2024-06-21",
          "value": 4.25
        },
        {
          "date": "2024-06-24",
          "value": 4.25
        },
        {
          "date": "2024-06-25",
          "value": 4.27
        },
        {
          "date": "2024-06-26",
          "value": 4.29
        },
        {
          "date": "2024-06-27",
          "value": 4.3
        },
        {
          "date": "2024-06-28",
          "value": 4.3
        },
        {
          "date": "2024-07-01",
          "value": 4.3
        },
        {
          "date": "2024-07-02",
          "value": 4.31
        },
        {
          "date": "2024-07-03",
          "value": 4.31
        },
        {
          "date": "2024-07-04",
          "value": 4.32
        },
        {
          "date": "2024-07-05",
          "value": 4.33
        },
        {
          "date": "2024-07-08",
          "value": 4.33
        },
        {
          "date": "2024-07-09",
          "value": 4.33
        },
        {
          "date": "2024-07-10",
          "value": 4.33
        },
        {
          "date": "2024-07-11",
          "value": 4.35
        },
        {
          "date": "2024-07-12",
          "value": 4.35
        },
        {
          "date": "2024-07-15",
          "value": 4.35
        },
        {
          "date": "2024-07-16",
          "value": 4.36
        },
        {
          "date": "2024-07-17",
          "value": 4.37
        },
        {
          "date": "2024-07-19",
          "value": 4.38
        },
        {
          "date": "2024-07-22",
          "value": 4.4
        },
        {
          "date": "2024-07-23",
          "value": 4.41
        },
        {
          "date": "2024-07-24",
          "value": 4.41
        },
        {
          "date": "2024-07-29",
          "value": 4.42
        },
        {
          "date": "2024-07-30",
          "value": 4.43
        },
        {
          "date": "2024-07-31",
          "value": 4.44
        },
        {
          "date": "2024-08-01",
          "value": 4.44
        },
        {
          "date": "2024-08-02",
          "value": 4.46
        },
        {
          "date": "2024-08-05",
          "value": 4.47
        },
        {
          "date": "2024-08-06",
          "value": 4.48
        },
        {
          "date": "2024-08-07",
          "value": 4.49
        },
        {
          "date": "2024-08-08",
          "value": 4.49
        },
        {
          "date": "2024-08-09",
          "value": 4.49
        },
        {
          "date": "2024-08-12",
          "value": 4.49
        },
        {
          "date": "2024-08-13",
          "value": 4.49
        },
        {
          "date": "2024-08-14",
          "value": 4.49
        },
        {
          "date": "2024-08-15",
          "value": 4.48
        },
        {
          "date": "2024-08-16",
          "value": 4.48
        },
        {
          "date": "2024-08-19",
          "value": 4.48
        },
        {
          "date": "2024-08-20",
          "value": 4.48
        },
        {
          "date": "2024-08-21",
          "value": 4.48
        },
        {
          "date": "2024-08-22",
          "value": 4.48
        },
        {
          "date": "2024-08-23",
          "value": 4.48
        },
        {
          "date": "2024-08-26",
          "value": 4.48
        },
        {
          "date": "2024-08-27",
          "value": 4.48
        },
        {
          "date": "2024-08-28",
          "value": 4.48
        },
        {
          "date": "2024-08-29",
          "value": 4.47
        },
        {
          "date": "2024-08-30",
          "value": 4.47
        },
        {
          "date": "2024-09-02",
          "value": 4.47
        },
        {
          "date": "2024-09-03",
          "value": 4.47
        },
        {
          "date": "2024-09-04",
          "value": 4.47
        },
        {
          "date": "2024-09-05",
          "value": 4.47
        },
        {
          "date": "2024-09-06",
          "value": 4.47
        },
        {
          "date": "2024-09-09",
          "value": 4.47
        },
        {
          "date": "2024-09-10",
          "value": 4.46
        },
        {
          "date": "2024-09-11",
          "value": 4.46
        },
        {
          "date": "2024-09-12",
          "value": 4.46
        },
        {
          "date": "2024-09-13",
          "value": 4.46
        },
        {
          "date": "2024-09-16",
          "value": 4.46
        },
        {
          "date": "2024-09-18",
          "value": 4.46
        },
        {
          "date": "2024-09-19",
          "value": 4.46
        },
        {
          "date": "2024-09-20",
          "value": 4.46
        },
        {
          "date": "2024-09-23",
          "value": 4.46
        },
        {
          "date": "2024-09-24",
          "value": 4.5
        },
        {
          "date": "2024-09-25",
          "value": 4.51
        },
        {
          "date": "2024-09-26",
          "value": 4.51
        },
        {
          "date": "2024-09-27",
          "value": 4.51
        },
        {
          "date": "2024-09-30",
          "value": 4.5
        },
        {
          "date": "2024-10-01",
          "value": 4.5
        },
        {
          "date": "2024-10-02",
          "value": 4.5
        },
        {
          "date": "2024-10-07",
          "value": 4.5
        },
        {
          "date": "2024-10-08",
          "value": 4.5
        },
        {
          "date": "2024-10-09",
          "value": 4.5
        },
        {
          "date": "2024-10-11",
          "value": 4.5
        },
        {
          "date": "2024-10-14",
          "value": 4.5
        },
        {
          "date": "2024-10-15",
          "value": 4.5
        },
        {
          "date": "2024-10-16",
          "value": 4.5
        },
        {
          "date": "2024-10-17",
          "value": 4.5
        },
        {
          "date": "2024-10-18",
          "value": 4.5
        },
        {
          "date": "2024-10-22",
          "value": 4.5
        },
        {
          "date": "2024-10-23",
          "value": 4.5
        },
        {
          "date": "2024-10-24",
          "value": 4.5
        },
        {
          "date": "2024-10-25",
          "value": 4.5
        },
        {
          "date": "2024-10-28",
          "value": 4.5
        },
        {
          "date": "2024-10-29",
          "value": 4.5
        },
        {
          "date": "2024-10-30",
          "value": 4.5
        },
        {
          "date": "2024-10-31",
          "value": 4.5
        },
        {
          "date": "2024-11-04",
          "value": 4.52
        },
        {
          "date": "2024-11-05",
          "value": 4.54
        },
        {
          "date": "2024-11-06",
          "value": 4.54
        },
        {
          "date": "2024-11-08",
          "value": 4.54
        },
        {
          "date": "2024-11-11",
          "value": 4.54
        },
        {
          "date": "2024-11-12",
          "value": 4.54
        },
        {
          "date": "2024-11-13",
          "value": 4.54
        },
        {
          "date": "2024-11-14",
          "value": 4.53
        },
        {
          "date": "2024-11-15",
          "value": 4.53
        },
        {
          "date": "2024-11-18",
          "value": 4.53
        },
        {
          "date": "2024-11-19",
          "value": 4.52
        },
        {
          "date": "2024-11-20",
          "value": 4.52
        },
        {
          "date": "2024-11-21",
          "value": 4.52
        },
        {
          "date": "2024-11-22",
          "value": 4.52
        },
        {
          "date": "2024-11-25",
          "value": 4.51
        },
        {
          "date": "2024-11-26",
          "value": 4.51
        },
        {
          "date": "2024-11-27",
          "value": 4.51
        },
        {
          "date": "2024-11-28",
          "value": 4.5
        },
        {
          "date": "2024-11-29",
          "value": 4.42
        },
        {
          "date": "2024-12-02",
          "value": 4.49
        },
        {
          "date": "2024-12-03",
          "value": 4.49
        },
        {
          "date": "2024-12-04",
          "value": 4.49
        },
        {
          "date": "2024-12-05",
          "value": 4.49
        },
        {
          "date": "2024-12-06",
          "value": 4.49
        },
        {
          "date": "2024-12-09",
          "value": 4.49
        },
        {
          "date": "2024-12-10",
          "value": 4.48
        },
        {
          "date": "2024-12-12",
          "value": 4.47
        },
        {
          "date": "2024-12-13",
          "value": 4.47
        },
        {
          "date": "2024-12-16",
          "value": 4.47
        },
        {
          "date": "2024-12-17",
          "value": 4.46
        },
        {
          "date": "2024-12-18",
          "value": 4.45
        },
        {
          "date": "2024-12-19",
          "value": 4.44
        },
        {
          "date": "2024-12-20",
          "value": 4.43
        },
        {
          "date": "2024-12-23",
          "value": 4.43
        },
        {
          "date": "2024-12-24",
          "value": 4.43
        },
        {
          "date": "2024-12-25",
          "value": 4.43
        },
        {
          "date": "2024-12-26",
          "value": 4.42
        },
        {
          "date": "2024-12-27",
          "value": 4.42
        },
        {
          "date": "2024-12-30",
          "value": 4.42
        },
        {
          "date": "2024-12-31",
          "value": 4.42
        },
        {
          "date": "2025-01-02",
          "value": 4.42
        },
        {
          "date": "2025-01-03",
          "value": 4.42
        },
        {
          "date": "2025-01-06",
          "value": 4.42
        },
        {
          "date": "2025-01-07",
          "value": 4.41
        },
        {
          "date": "2025-01-08",
          "value": 4.41
        },
        {
          "date": "2025-01-09",
          "value": 4.41
        },
        {
          "date": "2025-01-10",
          "value": 4.41
        },
        {
          "date": "2025-01-13",
          "value": 4.41
        },
        {
          "date": "2025-01-14",
          "value": 4.41
        },
        {
          "date": "2025-01-15",
          "value": 4.41
        },
        {
          "date": "2025-01-16",
          "value": 4.41
        },
        {
          "date": "2025-01-17",
          "value": 4.41
        },
        {
          "date": "2025-01-20",
          "value": 4.4
        },
        {
          "date": "2025-01-21",
          "value": 4.39
        },
        {
          "date": "2025-01-22",
          "value": 4.38
        },
        {
          "date": "2025-01-23",
          "value": 4.36
        },
        {
          "date": "2025-01-24",
          "value": 4.36
        },
        {
          "date": "2025-02-03",
          "value": 4.36
        },
        {
          "date": "2025-02-04",
          "value": 4.37
        },
        {
          "date": "2025-02-05",
          "value": 4.36
        },
        {
          "date": "2025-02-06",
          "value": 4.35
        },
        {
          "date": "2025-02-07",
          "value": 4.35
        },
        {
          "date": "2025-02-10",
          "value": 4.35
        },
        {
          "date": "2025-02-11",
          "value": 4.35
        },
        {
          "date": "2025-02-12",
          "value": 4.35
        },
        {
          "date": "2025-02-13",
          "value": 4.35
        },
        {
          "date": "2025-02-14",
          "value": 4.37
        },
        {
          "date": "2025-02-17",
          "value": 4.37
        },
        {
          "date": "2025-02-18",
          "value": 4.38
        },
        {
          "date": "2025-02-19",
          "value": 4.38
        },
        {
          "date": "2025-02-20",
          "value": 4.38
        },
        {
          "date": "2025-02-21",
          "value": 4.39
        },
        {
          "date": "2025-02-24",
          "value": 4.4
        },
        {
          "date": "2025-02-25",
          "value": 4.41
        },
        {
          "date": "2025-02-26",
          "value": 4.41
        },
        {
          "date": "2025-02-27",
          "value": 4.41
        },
        {
          "date": "2025-03-03",
          "value": 4.46
        },
        {
          "date": "2025-03-04",
          "value": 4.47
        },
        {
          "date": "2025-03-05",
          "value": 4.48
        },
        {
          "date": "2025-03-06",
          "value": 4.49
        },
        {
          "date": "2025-03-07",
          "value": 4.49
        },
        {
          "date": "2025-03-10",
          "value": 4.53
        },
        {
          "date": "2025-03-11",
          "value": 4.55
        },
        {
          "date": "2025-03-12",
          "value": 4.56
        },
        {
          "date": "2025-03-14",
          "value": 4.59
        },
        {
          "date": "2025-03-17",
          "value": 4.6
        },
        {
          "date": "2025-03-18",
          "value": 4.61
        },
        {
          "date": "2025-03-19",
          "value": 4.63
        },
        {
          "date": "2025-03-20",
          "value": 4.63
        },
        {
          "date": "2025-03-21",
          "value": 4.64
        },
        {
          "date": "2025-03-24",
          "value": 4.65
        },
        {
          "date": "2025-03-25",
          "value": 4.66
        },
        {
          "date": "2025-03-26",
          "value": 4.67
        },
        {
          "date": "2025-03-27",
          "value": 4.68
        },
        {
          "date": "2025-03-28",
          "value": 4.7
        },
        {
          "date": "2025-03-31",
          "value": 4.72
        },
        {
          "date": "2025-04-01",
          "value": 4.73
        },
        {
          "date": "2025-04-02",
          "value": 4.74
        },
        {
          "date": "2025-04-07",
          "value": 4.75
        },
        {
          "date": "2025-04-08",
          "value": 4.75
        },
        {
          "date": "2025-04-09",
          "value": 4.75
        },
        {
          "date": "2025-04-10",
          "value": 4.72
        },
        {
          "date": "2025-04-11",
          "value": 4.72
        },
        {
          "date": "2025-04-14",
          "value": 4.72
        },
        {
          "date": "2025-04-15",
          "value": 4.73
        },
        {
          "date": "2025-04-16",
          "value": 4.74
        },
        {
          "date": "2025-04-17",
          "value": 4.75
        },
        {
          "date": "2025-04-18",
          "value": 4.76
        },
        {
          "date": "2025-04-21",
          "value": 4.8
        },
        {
          "date": "2025-04-22",
          "value": 4.84
        },
        {
          "date": "2025-04-23",
          "value": 4.87
        },
        {
          "date": "2025-04-24",
          "value": 4.91
        },
        {
          "date": "2025-04-25",
          "value": 4.93
        },
        {
          "date": "2025-04-28",
          "value": 4.93
        },
        {
          "date": "2025-04-30",
          "value": 4.92
        },
        {
          "date": "2025-05-02",
          "value": 4.92
        },
        {
          "date": "2025-05-05",
          "value": 4.89
        },
        {
          "date": "2025-05-06",
          "value": 4.89
        },
        {
          "date": "2025-05-07",
          "value": 4.89
        },
        {
          "date": "2025-05-08",
          "value": 4.92
        },
        {
          "date": "2025-05-09",
          "value": 4.92
        },
        {
          "date": "2025-05-12",
          "value": 4.92
        },
        {
          "date": "2025-05-13",
          "value": 4.92
        },
        {
          "date": "2025-05-14",
          "value": 4.92
        },
        {
          "date": "2025-05-15",
          "value": 5.02
        },
        {
          "date": "2025-05-16",
          "value": 5.02
        },
        {
          "date": "2025-05-19",
          "value": 5.01
        },
        {
          "date": "2025-05-20",
          "value": 5.01
        },
        {
          "date": "2025-05-21",
          "value": 5.01
        },
        {
          "date": "2025-05-22",
          "value": 5.01
        },
        {
          "date": "2025-05-23",
          "value": 5.0
        },
        {
          "date": "2025-05-26",
          "value": 5.0
        },
        {
          "date": "2025-05-27",
          "value": 5.02
        },
        {
          "date": "2025-05-28",
          "value": 5.02
        },
        {
          "date": "2025-05-29",
          "value": 5.04
        },
        {
          "date": "2025-06-02",
          "value": 5.06
        },
        {
          "date": "2025-06-03",
          "value": 5.06
        },
        {
          "date": "2025-06-04",
          "value": 5.06
        },
        {
          "date": "2025-06-05",
          "value": 5.07
        },
        {
          "date": "2025-06-06",
          "value": 5.09
        },
        {
          "date": "2025-06-09",
          "value": 5.1
        },
        {
          "date": "2025-06-10",
          "value": 5.13
        },
        {
          "date": "2025-06-11",
          "value": 5.14
        },
        {
          "date": "2025-06-12",
          "value": 5.14
        },
        {
          "date": "2025-06-13",
          "value": 5.14
        },
        {
          "date": "2025-06-16",
          "value": 5.19
        },
        {
          "date": "2025-06-17",
          "value": 5.21
        },
        {
          "date": "2025-06-18",
          "value": 5.21
        },
        {
          "date": "2025-06-19",
          "value": 5.21
        },
        {
          "date": "2025-06-20",
          "value": 5.23
        },
        {
          "date": "2025-06-23",
          "value": 5.25
        },
        {
          "date": "2025-06-25",
          "value": 5.26
        },
        {
          "date": "2025-06-26",
          "value": 5.26
        },
        {
          "date": "2025-06-27",
          "value": 5.24
        },
        {
          "date": "2025-06-30",
          "value": 5.24
        },
        {
          "date": "2025-07-01",
          "value": 5.24
        },
        {
          "date": "2025-07-02",
          "value": 5.29
        },
        {
          "date": "2025-07-03",
          "value": 5.3
        },
        {
          "date": "2025-07-04",
          "value": 5.3
        },
        {
          "date": "2025-07-07",
          "value": 5.3
        },
        {
          "date": "2025-07-08",
          "value": 5.3
        },
        {
          "date": "2025-07-09",
          "value": 5.3
        },
        {
          "date": "2025-07-10",
          "value": 5.29
        },
        {
          "date": "2025-07-11",
          "value": 5.28
        },
        {
          "date": "2025-07-14",
          "value": 5.28
        },
        {
          "date": "2025-07-15",
          "value": 5.28
        },
        {
          "date": "2025-07-16",
          "value": 5.28
        },
        {
          "date": "2025-07-17",
          "value": 5.3
        },
        {
          "date": "2025-07-18",
          "value": 5.3
        },
        {
          "date": "2025-07-21",
          "value": 5.29
        },
        {
          "date": "2025-07-22",
          "value": 5.29
        },
        {
          "date": "2025-07-23",
          "value": 5.3
        },
        {
          "date": "2025-07-24",
          "value": 5.3
        },
        {
          "date": "2025-07-25",
          "value": 5.3
        },
        {
          "date": "2025-07-28",
          "value": 5.3
        },
        {
          "date": "2025-07-29",
          "value": 5.3
        },
        {
          "date": "2025-07-30",
          "value": 5.28
        },
        {
          "date": "2025-07-31",
          "value": 5.24
        },
        {
          "date": "2025-08-01",
          "value": 5.25
        },
        {
          "date": "2025-08-04",
          "value": 5.25
        },
        {
          "date": "2025-08-05",
          "value": 5.26
        },
        {
          "date": "2025-08-06",
          "value": 5.26
        },
        {
          "date": "2025-08-07",
          "value": 5.27
        },
        {
          "date": "2025-08-08",
          "value": 5.27
        },
        {
          "date": "2025-08-11",
          "value": 5.28
        },
        {
          "date": "2025-08-12",
          "value": 5.3
        },
        {
          "date": "2025-08-13",
          "value": 5.31
        },
        {
          "date": "2025-08-14",
          "value": 5.3
        },
        {
          "date": "2025-08-15",
          "value": 5.28
        },
        {
          "date": "2025-08-18",
          "value": 5.26
        },
        {
          "date": "2025-08-19",
          "value": 5.26
        },
        {
          "date": "2025-08-20",
          "value": 5.24
        },
        {
          "date": "2025-08-21",
          "value": 5.24
        },
        {
          "date": "2025-08-22",
          "value": 5.24
        },
        {
          "date": "2025-08-25",
          "value": 5.21
        },
        {
          "date": "2025-08-26",
          "value": 5.2
        },
        {
          "date": "2025-08-27",
          "value": 5.2
        },
        {
          "date": "2025-08-28",
          "value": 5.16
        },
        {
          "date": "2025-08-29",
          "value": 5.2
        },
        {
          "date": "2025-09-01",
          "value": 5.22
        },
        {
          "date": "2025-09-02",
          "value": 5.22
        },
        {
          "date": "2025-09-03",
          "value": 5.21
        },
        {
          "date": "2025-09-04",
          "value": 5.21
        },
        {
          "date": "2025-09-05",
          "value": 5.23
        },
        {
          "date": "2025-09-08",
          "value": 5.24
        },
        {
          "date": "2025-09-09",
          "value": 5.25
        },
        {
          "date": "2025-09-10",
          "value": 5.25
        },
        {
          "date": "2025-09-11",
          "value": 5.26
        },
        {
          "date": "2025-09-12",
          "value": 5.3
        },
        {
          "date": "2025-09-15",
          "value": 5.31
        },
        {
          "date": "2025-09-16",
          "value": 5.36
        },
        {
          "date": "2025-09-17",
          "value": 5.36
        },
        {
          "date": "2025-09-18",
          "value": 5.45
        },
        {
          "date": "2025-09-19",
          "value": 5.63
        },
        {
          "date": "2025-09-22",
          "value": 5.77
        },
        {
          "date": "2025-09-23",
          "value": 6.54
        },
        {
          "date": "2025-09-24",
          "value": 6.59
        },
        {
          "date": "2025-09-25",
          "value": 6.8
        },
        {
          "date": "2025-09-26",
          "value": 6.98
        },
        {
          "date": "2025-09-30",
          "value": 7.1
        },
        {
          "date": "2025-10-01",
          "value": 7.14
        },
        {
          "date": "2025-10-02",
          "value": 7.36
        },
        {
          "date": "2025-10-03",
          "value": 7.49
        },
        {
          "date": "2025-10-07",
          "value": 7.55
        },
        {
          "date": "2025-10-08",
          "value": 7.57
        },
        {
          "date": "2025-10-09",
          "value": 8.48
        },
        {
          "date": "2025-10-13",
          "value": 8.93
        },
        {
          "date": "2025-10-14",
          "value": 9.01
        },
        {
          "date": "2025-10-15",
          "value": 9.16
        },
        {
          "date": "2025-10-16",
          "value": 9.39
        },
        {
          "date": "2025-10-17",
          "value": 9.95
        },
        {
          "date": "2025-10-20",
          "value": 9.95
        },
        {
          "date": "2025-10-21",
          "value": 11.3
        },
        {
          "date": "2025-10-22",
          "value": 12.1
        },
        {
          "date": "2025-10-23",
          "value": 12.79
        },
        {
          "date": "2025-10-27",
          "value": 13.06
        },
        {
          "date": "2025-10-28",
          "value": 13.52
        },
        {
          "date": "2025-10-29",
          "value": 14.37
        },
        {
          "date": "2025-10-30",
          "value": 15.44
        },
        {
          "date": "2025-10-31",
          "value": 15.94
        },
        {
          "date": "2025-11-03",
          "value": 17.25
        },
        {
          "date": "2025-11-04",
          "value": 17.44
        },
        {
          "date": "2025-11-05",
          "value": 17.84
        },
        {
          "date": "2025-11-06",
          "value": 19.05
        },
        {
          "date": "2025-11-07",
          "value": 20.6
        },
        {
          "date": "2025-11-10",
          "value": 21.3
        },
        {
          "date": "2025-11-11",
          "value": 23.48
        },
        {
          "date": "2025-11-12",
          "value": 24.94
        },
        {
          "date": "2025-11-13",
          "value": 24.94
        },
        {
          "date": "2025-11-14",
          "value": 24.94
        },
        {
          "date": "2025-11-17",
          "value": 24.94
        },
        {
          "date": "2025-11-18",
          "value": 28.97
        },
        {
          "date": "2025-11-19",
          "value": 28.97
        },
        {
          "date": "2025-11-20",
          "value": 28.97
        },
        {
          "date": "2025-11-21",
          "value": 28.97
        },
        {
          "date": "2025-11-24",
          "value": 28.76
        },
        {
          "date": "2025-11-25",
          "value": 28.86
        },
        {
          "date": "2025-11-26",
          "value": 28.86
        },
        {
          "date": "2025-11-27",
          "value": 28.86
        },
        {
          "date": "2025-11-28",
          "value": 28.86
        },
        {
          "date": "2025-12-01",
          "value": 28.86
        },
        {
          "date": "2025-12-02",
          "value": 28.96
        },
        {
          "date": "2025-12-03",
          "value": 28.96
        },
        {
          "date": "2025-12-04",
          "value": 28.71
        },
        {
          "date": "2025-12-05",
          "value": 28.32
        },
        {
          "date": "2025-12-08",
          "value": 28.01
        },
        {
          "date": "2025-12-09",
          "value": 27.73
        },
        {
          "date": "2025-12-10",
          "value": 27.73
        },
        {
          "date": "2025-12-11",
          "value": 27.41
        },
        {
          "date": "2025-12-12",
          "value": 27.23
        },
        {
          "date": "2025-12-15",
          "value": 27.23
        },
        {
          "date": "2025-12-16",
          "value": 27.05
        },
        {
          "date": "2025-12-17",
          "value": 27.05
        },
        {
          "date": "2025-12-18",
          "value": 26.75
        },
        {
          "date": "2025-12-19",
          "value": 26.75
        },
        {
          "date": "2025-12-22",
          "value": 26.75
        },
        {
          "date": "2025-12-23",
          "value": 26.64
        },
        {
          "date": "2025-12-24",
          "value": 26.64
        },
        {
          "date": "2025-12-26",
          "value": 27.21
        },
        {
          "date": "2025-12-29",
          "value": 27.66
        },
        {
          "date": "2025-12-30",
          "value": 27.66
        },
        {
          "date": "2025-12-31",
          "value": 28.47
        },
        {
          "date": "2026-01-02",
          "value": 28.87
        },
        {
          "date": "2026-01-05",
          "value": 29.22
        },
        {
          "date": "2026-01-06",
          "value": 29.97
        },
        {
          "date": "2026-01-07",
          "value": 30.17
        },
        {
          "date": "2026-01-08",
          "value": 30.61
        },
        {
          "date": "2026-01-09",
          "value": 31.02
        },
        {
          "date": "2026-01-12",
          "value": 31.02
        },
        {
          "date": "2026-01-13",
          "value": 32.22
        },
        {
          "date": "2026-01-14",
          "value": 33.22
        },
        {
          "date": "2026-01-15",
          "value": 33.97
        },
        {
          "date": "2026-01-16",
          "value": 34.62
        },
        {
          "date": "2026-01-19",
          "value": 35.27
        },
        {
          "date": "2026-01-20",
          "value": 35.57
        },
        {
          "date": "2026-01-21",
          "value": 35.57
        },
        {
          "date": "2026-01-22",
          "value": 35.57
        },
        {
          "date": "2026-01-23",
          "value": 35.57
        },
        {
          "date": "2026-01-26",
          "value": 35.57
        },
        {
          "date": "2026-01-27",
          "value": 35.38
        },
        {
          "date": "2026-01-28",
          "value": 35.13
        },
        {
          "date": "2026-01-29",
          "value": 34.82
        },
        {
          "date": "2026-01-30",
          "value": 34.52
        },
        {
          "date": "2026-02-02",
          "value": 34.52
        },
        {
          "date": "2026-02-03",
          "value": 34.52
        },
        {
          "date": "2026-02-04",
          "value": 34.36
        },
        {
          "date": "2026-02-05",
          "value": 34.36
        },
        {
          "date": "2026-02-06",
          "value": 34.06
        },
        {
          "date": "2026-02-09",
          "value": 33.83
        },
        {
          "date": "2026-02-10",
          "value": 33.62
        },
        {
          "date": "2026-02-11",
          "value": 33.62
        },
        {
          "date": "2026-02-12",
          "value": 33.62
        },
        {
          "date": "2026-02-13",
          "value": 33.62
        },
        {
          "date": "2026-02-23",
          "value": 33.62
        },
        {
          "date": "2026-02-24",
          "value": 33.62
        },
        {
          "date": "2026-02-25",
          "value": 33.62
        },
        {
          "date": "2026-02-26",
          "value": 33.42
        },
        {
          "date": "2026-03-02",
          "value": 33.42
        },
        {
          "date": "2026-03-03",
          "value": 33.22
        },
        {
          "date": "2026-03-04",
          "value": 33.02
        },
        {
          "date": "2026-03-05",
          "value": 33.02
        },
        {
          "date": "2026-03-06",
          "value": 33.02
        },
        {
          "date": "2026-03-09",
          "value": 33.02
        },
        {
          "date": "2026-03-10",
          "value": 32.9
        },
        {
          "date": "2026-03-11",
          "value": 32.9
        },
        {
          "date": "2026-03-12",
          "value": 32.8
        },
        {
          "date": "2026-03-13",
          "value": 32.8
        },
        {
          "date": "2026-03-16",
          "value": 32.5
        },
        {
          "date": "2026-03-17",
          "value": 32.81
        },
        {
          "date": "2026-03-18",
          "value": 32.61
        },
        {
          "date": "2026-03-19",
          "value": 32.61
        },
        {
          "date": "2026-03-20",
          "value": 32.61
        },
        {
          "date": "2026-03-23",
          "value": 32.08
        },
        {
          "date": "2026-03-24",
          "value": 31.87
        },
        {
          "date": "2026-03-25",
          "value": 31.77
        },
        {
          "date": "2026-03-26",
          "value": 31.67
        },
        {
          "date": "2026-03-27",
          "value": 31.57
        },
        {
          "date": "2026-03-30",
          "value": 31.37
        },
        {
          "date": "2026-03-31",
          "value": 31.37
        },
        {
          "date": "2026-04-01",
          "value": 31.27
        },
        {
          "date": "2026-04-02",
          "value": 30.87
        },
        {
          "date": "2026-04-07",
          "value": 30.47
        },
        {
          "date": "2026-04-08",
          "value": 30.47
        },
        {
          "date": "2026-04-09",
          "value": 30.47
        },
        {
          "date": "2026-04-10",
          "value": 30.57
        },
        {
          "date": "2026-04-13",
          "value": 30.77
        },
        {
          "date": "2026-04-14",
          "value": 30.77
        },
        {
          "date": "2026-04-15",
          "value": 30.77
        },
        {
          "date": "2026-04-16",
          "value": 31.35
        },
        {
          "date": "2026-04-17",
          "value": 31.35
        },
        {
          "date": "2026-04-20",
          "value": 31.95
        },
        {
          "date": "2026-04-21",
          "value": 31.95
        },
        {
          "date": "2026-04-22",
          "value": 32.15
        },
        {
          "date": "2026-04-23",
          "value": 32.15
        },
        {
          "date": "2026-04-24",
          "value": 32.45
        },
        {
          "date": "2026-04-27",
          "value": 32.75
        },
        {
          "date": "2026-04-28",
          "value": 32.75
        },
        {
          "date": "2026-04-29",
          "value": 33.05
        },
        {
          "date": "2026-04-30",
          "value": 33.31
        },
        {
          "date": "2026-05-04",
          "value": 33.31
        },
        {
          "date": "2026-05-05",
          "value": 33.15
        },
        {
          "date": "2026-05-06",
          "value": 33.15
        },
        {
          "date": "2026-05-07",
          "value": 33.15
        },
        {
          "date": "2026-05-08",
          "value": 33.45
        },
        {
          "date": "2026-05-11",
          "value": 33.65
        },
        {
          "date": "2026-05-12",
          "value": 33.85
        },
        {
          "date": "2026-05-13",
          "value": 34.05
        },
        {
          "date": "2026-05-14",
          "value": 34.05
        },
        {
          "date": "2026-05-15",
          "value": 35.23
        },
        {
          "date": "2026-05-18",
          "value": 37.23
        },
        {
          "date": "2026-05-19",
          "value": 37.23
        },
        {
          "date": "2026-05-20",
          "value": 37.23
        },
        {
          "date": "2026-05-21",
          "value": 37.14
        },
        {
          "date": "2026-05-22",
          "value": 37.14
        },
        {
          "date": "2026-05-25",
          "value": 37.14
        },
        {
          "date": "2026-05-26",
          "value": 37.14
        },
        {
          "date": "2026-05-27",
          "value": 37.34
        },
        {
          "date": "2026-05-28",
          "value": 38.39
        },
        {
          "date": "2026-05-29",
          "value": 39.46
        },
        {
          "date": "2026-06-01",
          "value": 40.26
        },
        {
          "date": "2026-06-02",
          "value": 40.56
        },
        {
          "date": "2026-06-03",
          "value": 40.56
        },
        {
          "date": "2026-06-04",
          "value": 40.56
        },
        {
          "date": "2026-06-05",
          "value": 41.06
        },
        {
          "date": "2026-06-08",
          "value": 41.06
        },
        {
          "date": "2026-06-09",
          "value": 41.26
        },
        {
          "date": "2026-06-10",
          "value": 41.86
        },
        {
          "date": "2026-06-11",
          "value": 42.36
        },
        {
          "date": "2026-06-12",
          "value": 42.36
        },
        {
          "date": "2026-06-15",
          "value": 42.66
        },
        {
          "date": "2026-06-16",
          "value": 42.66
        },
        {
          "date": "2026-06-17",
          "value": 42.96
        },
        {
          "date": "2026-06-18",
          "value": 43.36
        },
        {
          "date": "2026-06-22",
          "value": 44.06
        },
        {
          "date": "2026-06-23",
          "value": 44.06
        },
        {
          "date": "2026-06-24",
          "value": 44.06
        },
        {
          "date": "2026-06-25",
          "value": 44.26
        },
        {
          "date": "2026-06-26",
          "value": 44.66
        },
        {
          "date": "2026-06-29",
          "value": 44.66
        },
        {
          "date": "2026-06-30",
          "value": 44.66
        },
        {
          "date": "2026-07-01",
          "value": 45.16
        },
        {
          "date": "2026-07-02",
          "value": 45.16
        },
        {
          "date": "2026-07-03",
          "value": 44.86
        },
        {
          "date": "2026-07-06",
          "value": 44.66
        },
        {
          "date": "2026-07-07",
          "value": 45.12
        },
        {
          "date": "2026-07-08",
          "value": 45.7
        },
        {
          "date": "2026-07-09",
          "value": 46.06
        },
        {
          "date": "2026-07-13",
          "value": 46.46
        },
        {
          "date": "2026-07-14",
          "value": 46.86
        },
        {
          "date": "2026-07-15",
          "value": 47.06
        },
        {
          "date": "2026-07-16",
          "value": 47.26
        },
        {
          "date": "2026-07-17",
          "value": 47.26
        },
        {
          "date": "2026-07-20",
          "value": 47.46
        },
        {
          "date": "2026-07-21",
          "value": 47.46
        },
        {
          "date": "2026-07-22",
          "value": 47.46
        },
        {
          "date": "2026-07-23",
          "value": 47.92
        },
        {
          "date": "2026-07-24",
          "value": 48.38
        },
        {
          "date": "2026-07-27",
          "value": 48.92
        },
        {
          "date": "2026-07-28",
          "value": 48.92
        },
        {
          "date": "2026-07-29",
          "value": 48.92
        },
        {
          "date": "2026-07-30",
          "value": 48.92
        },
        {
          "date": "2026-07-31",
          "value": 48.72
        },
        {
          "date": "2026-08-03",
          "value": 48.72
        },
        {
          "date": "2026-08-04",
          "value": 49.18
        },
        {
          "date": "2026-08-05",
          "value": 49.66
        },
        {
          "date": "2026-08-06",
          "value": 49.66
        },
        {
          "date": "2026-08-07",
          "value": 49.66
        },
        {
          "date": "2026-08-10",
          "value": 49.66
        },
        {
          "date": "2026-08-11",
          "value": 49.52
        },
        {
          "date": "2026-08-12",
          "value": 49.72
        },
        {
          "date": "2026-08-13",
          "value": 49.72
        },
        {
          "date": "2026-08-14",
          "value": 49.72
        },
        {
          "date": "2026-08-17",
          "value": 50.02
        },
        {
          "date": "2026-08-18",
          "value": 50.02
        },
        {
          "date": "2026-08-19",
          "value": 49.82
        },
        {
          "date": "2026-08-20",
          "value": 50.22
        },
        {
          "date": "2026-08-21",
          "value": 50.43
        },
        {
          "date": "2026-08-24",
          "value": 50.74
        },
        {
          "date": "2026-08-25",
          "value": 50.74
        },
        {
          "date": "2026-08-26",
          "value": 50.74
        },
        {
          "date": "2026-08-27",
          "value": 50.44
        },
        {
          "date": "2026-08-28",
          "value": 49.99
        },
        {
          "date": "2026-08-31",
          "value": 49.69
        },
        {
          "date": "2026-09-01",
          "value": 49.69
        },
        {
          "date": "2026-09-02",
          "value": 49.49
        },
        {
          "date": "2026-09-03",
          "value": 49.16
        },
        {
          "date": "2026-09-04",
          "value": 49.46
        },
        {
          "date": "2026-09-07",
          "value": 49.46
        },
        {
          "date": "2026-09-08",
          "value": 49.36
        },
        {
          "date": "2026-09-09",
          "value": 49.46
        },
        {
          "date": "2026-09-10",
          "value": 49.56
        },
        {
          "date": "2026-09-11",
          "value": 49.36
        },
        {
          "date": "2026-09-14",
          "value": 49.36
        },
        {
          "date": "2026-09-15",
          "value": 49.36
        },
        {
          "date": "2026-09-16",
          "value": 49.36
        },
        {
          "date": "2026-09-17",
          "value": 49.16
        },
        {
          "date": "2026-09-18",
          "value": 49.44
        },
        {
          "date": "2026-09-21",
          "value": 49.64
        },
        {
          "date": "2026-09-22",
          "value": 49.82
        },
        {
          "date": "2026-09-23",
          "value": 50.02
        },
        {
          "date": "2026-09-24",
          "value": 50.02
        },
        {
          "date": "2026-09-29",
          "value": 49.82
        },
        {
          "date": "2026-09-30",
          "value": 49.82
        },
        {
          "date": "2026-10-01",
          "value": 49.62
        },
        {
          "date": "2026-10-02",
          "value": 49.62
        },
        {
          "date": "2026-10-05",
          "value": 49.82
        },
        {
          "date": "2026-10-06",
          "value": 49.82
        },
        {
          "date": "2026-10-07",
          "value": 50.02
        },
        {
          "date": "2026-10-08",
          "value": 50.02
        },
        {
          "date": "2026-10-12",
          "value": 50.42
        },
        {
          "date": "2026-10-13",
          "value": 51.02
        },
        {
          "date": "2026-10-14",
          "value": 51.02
        },
        {
          "date": "2026-10-15",
          "value": 51.22
        },
        {
          "date": "2026-10-19",
          "value": 51.62
        },
        {
          "date": "2026-10-20",
          "value": 51.62
        },
        {
          "date": "2026-10-21",
          "value": 51.62
        },
        {
          "date": "2026-10-22",
          "value": 51.82
        },
        {
          "date": "2026-10-23",
          "value": 52.22
        },
        {
          "date": "2026-10-27",
          "value": 52.22
        },
        {
          "date": "2026-10-28",
          "value": 52.52
        },
        {
          "date": "2026-10-29",
          "value": 52.82
        },
        {
          "date": "2026-10-30",
          "value": 53.12
        },
        {
          "date": "2026-11-02",
          "value": 53.12
        },
        {
          "date": "2026-11-03",
          "value": 53.12
        },
        {
          "date": "2026-11-04",
          "value": 53.12
        },
        {
          "date": "2026-11-05",
          "value": 53.119998931884766
        }
      ]
    },
    {
      "source": "AI_Infra.xlsx",
      "sheet": "High Freq Data Value",
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
          "level": 2.92,
          "yoy": 46.73366834170854,
          "unchangedFromPrevious": false,
          "partial": true
        },
        {
          "month": "2026-11",
          "level": 2.96,
          "yoy": 51.020408163265294,
          "unchangedFromPrevious": false,
          "partial": true
        }
      ],
      "daily": [
        {
          "date": "2024-09-01",
          "value": 3.4
        },
        {
          "date": "2024-09-02",
          "value": 3.33
        },
        {
          "date": "2024-09-03",
          "value": 3.32
        },
        {
          "date": "2024-09-04",
          "value": 3.34
        },
        {
          "date": "2024-09-05",
          "value": 3.28
        },
        {
          "date": "2024-09-06",
          "value": 3.32
        },
        {
          "date": "2024-09-07",
          "value": 3.33
        },
        {
          "date": "2024-09-08",
          "value": 3.29
        },
        {
          "date": "2024-09-09",
          "value": 2.92
        },
        {
          "date": "2024-09-10",
          "value": 2.87
        },
        {
          "date": "2024-09-11",
          "value": 2.91
        },
        {
          "date": "2024-09-12",
          "value": 2.92
        },
        {
          "date": "2024-09-13",
          "value": 2.92
        },
        {
          "date": "2024-09-14",
          "value": 2.91
        },
        {
          "date": "2024-09-15",
          "value": 2.9
        },
        {
          "date": "2024-09-16",
          "value": 2.86
        },
        {
          "date": "2024-09-17",
          "value": 2.86
        },
        {
          "date": "2024-09-18",
          "value": 2.82
        },
        {
          "date": "2024-09-19",
          "value": 2.83
        },
        {
          "date": "2024-09-20",
          "value": 2.81
        },
        {
          "date": "2024-09-21",
          "value": 2.75
        },
        {
          "date": "2024-09-22",
          "value": 2.75
        },
        {
          "date": "2024-09-23",
          "value": 2.73
        },
        {
          "date": "2024-09-24",
          "value": 2.78
        },
        {
          "date": "2024-09-25",
          "value": 2.79
        },
        {
          "date": "2024-09-26",
          "value": 2.78
        },
        {
          "date": "2024-09-27",
          "value": 2.79
        },
        {
          "date": "2024-09-28",
          "value": 2.74
        },
        {
          "date": "2024-09-29",
          "value": 2.73
        },
        {
          "date": "2024-09-30",
          "value": 2.74
        },
        {
          "date": "2024-10-01",
          "value": 2.73
        },
        {
          "date": "2024-10-02",
          "value": 2.75
        },
        {
          "date": "2024-10-03",
          "value": 2.71
        },
        {
          "date": "2024-10-04",
          "value": 2.74
        },
        {
          "date": "2024-10-05",
          "value": 2.77
        },
        {
          "date": "2024-10-06",
          "value": 2.78
        },
        {
          "date": "2024-10-07",
          "value": 2.92
        },
        {
          "date": "2024-10-08",
          "value": 2.94
        },
        {
          "date": "2024-10-09",
          "value": 2.92
        },
        {
          "date": "2024-10-10",
          "value": 2.92
        },
        {
          "date": "2024-10-11",
          "value": 2.9
        },
        {
          "date": "2024-10-12",
          "value": 2.89
        },
        {
          "date": "2024-10-13",
          "value": 2.89
        },
        {
          "date": "2024-10-14",
          "value": 2.82
        },
        {
          "date": "2024-10-15",
          "value": 2.82
        },
        {
          "date": "2024-10-16",
          "value": 2.8
        },
        {
          "date": "2024-10-17",
          "value": 2.77
        },
        {
          "date": "2024-10-18",
          "value": 2.78
        },
        {
          "date": "2024-10-19",
          "value": 2.77
        },
        {
          "date": "2024-10-20",
          "value": 2.78
        },
        {
          "date": "2024-10-21",
          "value": 2.73
        },
        {
          "date": "2024-10-22",
          "value": 2.73
        },
        {
          "date": "2024-10-23",
          "value": 2.73
        },
        {
          "date": "2024-10-24",
          "value": 2.73
        },
        {
          "date": "2024-10-25",
          "value": 2.72
        },
        {
          "date": "2024-10-26",
          "value": 2.73
        },
        {
          "date": "2024-10-27",
          "value": 2.73
        },
        {
          "date": "2024-10-28",
          "value": 2.68
        },
        {
          "date": "2024-10-29",
          "value": 2.68
        },
        {
          "date": "2024-10-30",
          "value": 2.68
        },
        {
          "date": "2024-10-31",
          "value": 2.67
        },
        {
          "date": "2024-11-01",
          "value": 2.67
        },
        {
          "date": "2024-11-02",
          "value": 2.68
        },
        {
          "date": "2024-11-03",
          "value": 2.69
        },
        {
          "date": "2024-11-04",
          "value": 2.63
        },
        {
          "date": "2024-11-05",
          "value": 2.62
        },
        {
          "date": "2024-11-06",
          "value": 2.63
        },
        {
          "date": "2024-11-07",
          "value": 2.63
        },
        {
          "date": "2024-11-08",
          "value": 2.63
        },
        {
          "date": "2024-11-09",
          "value": 2.63
        },
        {
          "date": "2024-11-10",
          "value": 2.63
        },
        {
          "date": "2024-11-11",
          "value": 2.58
        },
        {
          "date": "2024-11-12",
          "value": 2.58
        },
        {
          "date": "2024-11-13",
          "value": 2.55
        },
        {
          "date": "2024-11-14",
          "value": 2.55
        },
        {
          "date": "2024-11-15",
          "value": 2.56
        },
        {
          "date": "2024-11-16",
          "value": 2.57
        },
        {
          "date": "2024-11-17",
          "value": 2.56
        },
        {
          "date": "2024-11-18",
          "value": 2.46
        },
        {
          "date": "2024-11-19",
          "value": 2.46
        },
        {
          "date": "2024-11-20",
          "value": 2.5
        },
        {
          "date": "2024-11-21",
          "value": 2.5
        },
        {
          "date": "2024-11-22",
          "value": 2.5
        },
        {
          "date": "2024-11-23",
          "value": 2.5
        },
        {
          "date": "2024-11-24",
          "value": 2.5
        },
        {
          "date": "2024-11-25",
          "value": 2.42
        },
        {
          "date": "2024-11-26",
          "value": 2.42
        },
        {
          "date": "2024-11-27",
          "value": 2.41
        },
        {
          "date": "2024-11-28",
          "value": 2.41
        },
        {
          "date": "2024-11-29",
          "value": 2.42
        },
        {
          "date": "2024-11-30",
          "value": 2.44
        },
        {
          "date": "2024-12-01",
          "value": 2.43
        },
        {
          "date": "2024-12-02",
          "value": 2.37
        },
        {
          "date": "2024-12-03",
          "value": 2.37
        },
        {
          "date": "2024-12-04",
          "value": 2.37
        },
        {
          "date": "2024-12-05",
          "value": 2.37
        },
        {
          "date": "2024-12-06",
          "value": 2.36
        },
        {
          "date": "2024-12-07",
          "value": 2.36
        },
        {
          "date": "2024-12-08",
          "value": 2.36
        },
        {
          "date": "2024-12-09",
          "value": 2.3
        },
        {
          "date": "2024-12-10",
          "value": 2.29
        },
        {
          "date": "2024-12-11",
          "value": 2.29
        },
        {
          "date": "2024-12-12",
          "value": 2.29
        },
        {
          "date": "2024-12-13",
          "value": 2.29
        },
        {
          "date": "2024-12-14",
          "value": 2.3
        },
        {
          "date": "2024-12-15",
          "value": 2.3
        },
        {
          "date": "2024-12-16",
          "value": 2.2
        },
        {
          "date": "2024-12-17",
          "value": 2.21
        },
        {
          "date": "2024-12-18",
          "value": 2.2
        },
        {
          "date": "2024-12-19",
          "value": 2.21
        },
        {
          "date": "2024-12-20",
          "value": 2.21
        },
        {
          "date": "2024-12-21",
          "value": 2.21
        },
        {
          "date": "2024-12-22",
          "value": 2.22
        },
        {
          "date": "2024-12-23",
          "value": 2.14
        },
        {
          "date": "2024-12-24",
          "value": 2.14
        },
        {
          "date": "2024-12-25",
          "value": 2.15
        },
        {
          "date": "2024-12-26",
          "value": 2.15
        },
        {
          "date": "2024-12-27",
          "value": 2.15
        },
        {
          "date": "2024-12-28",
          "value": 2.14
        },
        {
          "date": "2024-12-29",
          "value": 2.14
        },
        {
          "date": "2024-12-30",
          "value": 2.1
        },
        {
          "date": "2024-12-31",
          "value": 2.11
        },
        {
          "date": "2025-01-01",
          "value": 2.09
        },
        {
          "date": "2025-01-02",
          "value": 2.09
        },
        {
          "date": "2025-01-03",
          "value": 2.08
        },
        {
          "date": "2025-01-04",
          "value": 2.09
        },
        {
          "date": "2025-01-05",
          "value": 2.08
        },
        {
          "date": "2025-01-06",
          "value": 2.05
        },
        {
          "date": "2025-01-07",
          "value": 2.04
        },
        {
          "date": "2025-01-08",
          "value": 2.04
        },
        {
          "date": "2025-01-09",
          "value": 2.04
        },
        {
          "date": "2025-01-10",
          "value": 2.04
        },
        {
          "date": "2025-01-11",
          "value": 2.04
        },
        {
          "date": "2025-01-12",
          "value": 2.05
        },
        {
          "date": "2025-01-13",
          "value": 2.02
        },
        {
          "date": "2025-01-14",
          "value": 2.02
        },
        {
          "date": "2025-01-15",
          "value": 2.02
        },
        {
          "date": "2025-01-16",
          "value": 2.01
        },
        {
          "date": "2025-01-17",
          "value": 2.02
        },
        {
          "date": "2025-01-18",
          "value": 2.02
        },
        {
          "date": "2025-01-19",
          "value": 2.03
        },
        {
          "date": "2025-01-20",
          "value": 1.99
        },
        {
          "date": "2025-01-21",
          "value": 1.98
        },
        {
          "date": "2025-01-22",
          "value": 1.97
        },
        {
          "date": "2025-01-23",
          "value": 1.96
        },
        {
          "date": "2025-01-24",
          "value": 1.96
        },
        {
          "date": "2025-01-25",
          "value": 1.96
        },
        {
          "date": "2025-01-26",
          "value": 1.95
        },
        {
          "date": "2025-01-27",
          "value": 1.9
        },
        {
          "date": "2025-01-28",
          "value": 1.89
        },
        {
          "date": "2025-01-29",
          "value": 1.89
        },
        {
          "date": "2025-01-30",
          "value": 1.89
        },
        {
          "date": "2025-01-31",
          "value": 1.9
        },
        {
          "date": "2025-02-01",
          "value": 1.9
        },
        {
          "date": "2025-02-02",
          "value": 1.9
        },
        {
          "date": "2025-02-03",
          "value": 1.88
        },
        {
          "date": "2025-02-04",
          "value": 1.87
        },
        {
          "date": "2025-02-05",
          "value": 1.86
        },
        {
          "date": "2025-02-06",
          "value": 1.87
        },
        {
          "date": "2025-02-07",
          "value": 1.86
        },
        {
          "date": "2025-02-08",
          "value": 1.87
        },
        {
          "date": "2025-02-09",
          "value": 1.86
        },
        {
          "date": "2025-02-10",
          "value": 1.89
        },
        {
          "date": "2025-02-11",
          "value": 1.9
        },
        {
          "date": "2025-02-12",
          "value": 1.9
        },
        {
          "date": "2025-02-13",
          "value": 1.9
        },
        {
          "date": "2025-02-14",
          "value": 1.9
        },
        {
          "date": "2025-02-15",
          "value": 1.89
        },
        {
          "date": "2025-02-16",
          "value": 1.89
        },
        {
          "date": "2025-02-17",
          "value": 1.9
        },
        {
          "date": "2025-02-18",
          "value": 1.9
        },
        {
          "date": "2025-02-19",
          "value": 1.89
        },
        {
          "date": "2025-02-20",
          "value": 1.9
        },
        {
          "date": "2025-02-21",
          "value": 1.9
        },
        {
          "date": "2025-02-22",
          "value": 1.87
        },
        {
          "date": "2025-02-23",
          "value": 1.86
        },
        {
          "date": "2025-02-24",
          "value": 1.89
        },
        {
          "date": "2025-02-25",
          "value": 1.88
        },
        {
          "date": "2025-02-26",
          "value": 1.89
        },
        {
          "date": "2025-02-27",
          "value": 1.9
        },
        {
          "date": "2025-02-28",
          "value": 1.89
        },
        {
          "date": "2025-03-01",
          "value": 2.37
        },
        {
          "date": "2025-03-02",
          "value": 2.36
        },
        {
          "date": "2025-03-03",
          "value": 2.35
        },
        {
          "date": "2025-03-04",
          "value": 2.36
        },
        {
          "date": "2025-03-05",
          "value": 2.36
        },
        {
          "date": "2025-03-06",
          "value": 2.36
        },
        {
          "date": "2025-03-07",
          "value": 2.35
        },
        {
          "date": "2025-03-08",
          "value": 2.35
        },
        {
          "date": "2025-03-09",
          "value": 2.35
        },
        {
          "date": "2025-03-10",
          "value": 2.38
        },
        {
          "date": "2025-03-11",
          "value": 2.37
        },
        {
          "date": "2025-03-12",
          "value": 2.37
        },
        {
          "date": "2025-03-13",
          "value": 2.37
        },
        {
          "date": "2025-03-14",
          "value": 2.37
        },
        {
          "date": "2025-03-15",
          "value": 2.37
        },
        {
          "date": "2025-03-16",
          "value": 2.37
        },
        {
          "date": "2025-03-17",
          "value": 2.44
        },
        {
          "date": "2025-03-18",
          "value": 2.44
        },
        {
          "date": "2025-03-19",
          "value": 2.44
        },
        {
          "date": "2025-03-20",
          "value": 2.44
        },
        {
          "date": "2025-03-21",
          "value": 2.44
        },
        {
          "date": "2025-03-22",
          "value": 2.44
        },
        {
          "date": "2025-03-23",
          "value": 2.44
        },
        {
          "date": "2025-03-24",
          "value": 2.51
        },
        {
          "date": "2025-03-25",
          "value": 2.5
        },
        {
          "date": "2025-03-26",
          "value": 2.5
        },
        {
          "date": "2025-03-27",
          "value": 2.5
        },
        {
          "date": "2025-03-28",
          "value": 2.5
        },
        {
          "date": "2025-03-29",
          "value": 2.5
        },
        {
          "date": "2025-03-30",
          "value": 2.51
        },
        {
          "date": "2025-03-31",
          "value": 2.5
        },
        {
          "date": "2025-04-01",
          "value": 2.56
        },
        {
          "date": "2025-04-02",
          "value": 2.56
        },
        {
          "date": "2025-04-03",
          "value": 2.57
        },
        {
          "date": "2025-04-04",
          "value": 2.58
        },
        {
          "date": "2025-04-05",
          "value": 2.59
        },
        {
          "date": "2025-04-06",
          "value": 2.6
        },
        {
          "date": "2025-04-07",
          "value": 2.49
        },
        {
          "date": "2025-04-08",
          "value": 2.5
        },
        {
          "date": "2025-04-09",
          "value": 2.5
        },
        {
          "date": "2025-04-10",
          "value": 2.5
        },
        {
          "date": "2025-04-11",
          "value": 2.49
        },
        {
          "date": "2025-04-12",
          "value": 2.5
        },
        {
          "date": "2025-04-13",
          "value": 2.49
        },
        {
          "date": "2025-04-14",
          "value": 2.37
        },
        {
          "date": "2025-04-15",
          "value": 2.38
        },
        {
          "date": "2025-04-16",
          "value": 2.38
        },
        {
          "date": "2025-04-17",
          "value": 2.41
        },
        {
          "date": "2025-04-18",
          "value": 2.41
        },
        {
          "date": "2025-04-19",
          "value": 2.41
        },
        {
          "date": "2025-04-20",
          "value": 2.4
        },
        {
          "date": "2025-04-21",
          "value": 2.4
        },
        {
          "date": "2025-04-22",
          "value": 2.39
        },
        {
          "date": "2025-04-23",
          "value": 2.39
        },
        {
          "date": "2025-04-24",
          "value": 2.39
        },
        {
          "date": "2025-04-25",
          "value": 2.39
        },
        {
          "date": "2025-04-26",
          "value": 2.39
        },
        {
          "date": "2025-04-27",
          "value": 2.39
        },
        {
          "date": "2025-04-28",
          "value": 2.38
        },
        {
          "date": "2025-04-29",
          "value": 2.38
        },
        {
          "date": "2025-04-30",
          "value": 2.38
        },
        {
          "date": "2025-05-01",
          "value": 2.38
        },
        {
          "date": "2025-05-02",
          "value": 2.38
        },
        {
          "date": "2025-05-03",
          "value": 2.38
        },
        {
          "date": "2025-05-04",
          "value": 2.38
        },
        {
          "date": "2025-05-05",
          "value": 2.35
        },
        {
          "date": "2025-05-06",
          "value": 2.35
        },
        {
          "date": "2025-05-07",
          "value": 2.35
        },
        {
          "date": "2025-05-08",
          "value": 2.34
        },
        {
          "date": "2025-05-09",
          "value": 2.35
        },
        {
          "date": "2025-05-10",
          "value": 2.34
        },
        {
          "date": "2025-05-11",
          "value": 2.35
        },
        {
          "date": "2025-05-12",
          "value": 2.32
        },
        {
          "date": "2025-05-13",
          "value": 2.32
        },
        {
          "date": "2025-05-14",
          "value": 2.32
        },
        {
          "date": "2025-05-15",
          "value": 2.32
        },
        {
          "date": "2025-05-16",
          "value": 2.32
        },
        {
          "date": "2025-05-17",
          "value": 2.31
        },
        {
          "date": "2025-05-18",
          "value": 2.31
        },
        {
          "date": "2025-05-19",
          "value": 2.29
        },
        {
          "date": "2025-05-20",
          "value": 2.29
        },
        {
          "date": "2025-05-21",
          "value": 2.29
        },
        {
          "date": "2025-05-22",
          "value": 2.29
        },
        {
          "date": "2025-05-23",
          "value": 2.29
        },
        {
          "date": "2025-05-24",
          "value": 2.29
        },
        {
          "date": "2025-05-25",
          "value": 2.28
        },
        {
          "date": "2025-05-26",
          "value": 2.27
        },
        {
          "date": "2025-05-27",
          "value": 2.27
        },
        {
          "date": "2025-05-28",
          "value": 2.27
        },
        {
          "date": "2025-05-29",
          "value": 2.26
        },
        {
          "date": "2025-05-30",
          "value": 2.21
        },
        {
          "date": "2025-05-31",
          "value": 2.21
        },
        {
          "date": "2025-06-01",
          "value": 2.21
        },
        {
          "date": "2025-06-02",
          "value": 2.2
        },
        {
          "date": "2025-06-03",
          "value": 2.19
        },
        {
          "date": "2025-06-04",
          "value": 2.19
        },
        {
          "date": "2025-06-05",
          "value": 2.19
        },
        {
          "date": "2025-06-06",
          "value": 2.18
        },
        {
          "date": "2025-06-07",
          "value": 2.19
        },
        {
          "date": "2025-06-08",
          "value": 2.18
        },
        {
          "date": "2025-06-09",
          "value": 2.18
        },
        {
          "date": "2025-06-10",
          "value": 2.18
        },
        {
          "date": "2025-06-11",
          "value": 2.18
        },
        {
          "date": "2025-06-12",
          "value": 2.19
        },
        {
          "date": "2025-06-13",
          "value": 2.19
        },
        {
          "date": "2025-06-14",
          "value": 2.19
        },
        {
          "date": "2025-06-15",
          "value": 2.19
        },
        {
          "date": "2025-06-16",
          "value": 2.18
        },
        {
          "date": "2025-06-17",
          "value": 2.18
        },
        {
          "date": "2025-06-18",
          "value": 2.18
        },
        {
          "date": "2025-06-19",
          "value": 2.17
        },
        {
          "date": "2025-06-20",
          "value": 2.17
        },
        {
          "date": "2025-06-21",
          "value": 2.17
        },
        {
          "date": "2025-06-22",
          "value": 2.17
        },
        {
          "date": "2025-06-23",
          "value": 2.15
        },
        {
          "date": "2025-06-24",
          "value": 2.15
        },
        {
          "date": "2025-06-25",
          "value": 2.15
        },
        {
          "date": "2025-06-26",
          "value": 2.14
        },
        {
          "date": "2025-06-27",
          "value": 2.14
        },
        {
          "date": "2025-06-28",
          "value": 2.14
        },
        {
          "date": "2025-06-29",
          "value": 2.14
        },
        {
          "date": "2025-06-30",
          "value": 2.12
        },
        {
          "date": "2025-07-01",
          "value": 2.12
        },
        {
          "date": "2025-07-02",
          "value": 2.12
        },
        {
          "date": "2025-07-03",
          "value": 2.12
        },
        {
          "date": "2025-07-04",
          "value": 2.12
        },
        {
          "date": "2025-07-05",
          "value": 2.12
        },
        {
          "date": "2025-07-06",
          "value": 2.11
        },
        {
          "date": "2025-07-07",
          "value": 2.11
        },
        {
          "date": "2025-07-08",
          "value": 2.11
        },
        {
          "date": "2025-07-09",
          "value": 2.11
        },
        {
          "date": "2025-07-10",
          "value": 2.11
        },
        {
          "date": "2025-07-11",
          "value": 2.11
        },
        {
          "date": "2025-07-12",
          "value": 2.09
        },
        {
          "date": "2025-07-13",
          "value": 2.09
        },
        {
          "date": "2025-07-14",
          "value": 2.08
        },
        {
          "date": "2025-07-15",
          "value": 2.09
        },
        {
          "date": "2025-07-16",
          "value": 2.09
        },
        {
          "date": "2025-07-17",
          "value": 2.09
        },
        {
          "date": "2025-07-18",
          "value": 2.08
        },
        {
          "date": "2025-07-19",
          "value": 2.08
        },
        {
          "date": "2025-07-20",
          "value": 2.08
        },
        {
          "date": "2025-07-21",
          "value": 2.09
        },
        {
          "date": "2025-07-22",
          "value": 2.09
        },
        {
          "date": "2025-07-23",
          "value": 2.09
        },
        {
          "date": "2025-07-24",
          "value": 2.09
        },
        {
          "date": "2025-07-25",
          "value": 2.09
        },
        {
          "date": "2025-07-26",
          "value": 2.09
        },
        {
          "date": "2025-07-27",
          "value": 2.09
        },
        {
          "date": "2025-07-28",
          "value": 2.12
        },
        {
          "date": "2025-07-29",
          "value": 2.12
        },
        {
          "date": "2025-07-30",
          "value": 2.12
        },
        {
          "date": "2025-07-31",
          "value": 2.12
        },
        {
          "date": "2025-08-01",
          "value": 2.11
        },
        {
          "date": "2025-08-02",
          "value": 2.1
        },
        {
          "date": "2025-08-03",
          "value": 2.1
        },
        {
          "date": "2025-08-04",
          "value": 2.09
        },
        {
          "date": "2025-08-05",
          "value": 2.09
        },
        {
          "date": "2025-08-06",
          "value": 2.09
        },
        {
          "date": "2025-08-07",
          "value": 2.09
        },
        {
          "date": "2025-08-08",
          "value": 2.09
        },
        {
          "date": "2025-08-09",
          "value": 2.09
        },
        {
          "date": "2025-08-10",
          "value": 2.09
        },
        {
          "date": "2025-08-11",
          "value": 2.07
        },
        {
          "date": "2025-08-12",
          "value": 2.08
        },
        {
          "date": "2025-08-13",
          "value": 2.08
        },
        {
          "date": "2025-08-14",
          "value": 2.08
        },
        {
          "date": "2025-08-15",
          "value": 2.08
        },
        {
          "date": "2025-08-16",
          "value": 2.08
        },
        {
          "date": "2025-08-17",
          "value": 2.08
        },
        {
          "date": "2025-08-18",
          "value": 2.07
        },
        {
          "date": "2025-08-19",
          "value": 2.07
        },
        {
          "date": "2025-08-20",
          "value": 2.08
        },
        {
          "date": "2025-08-21",
          "value": 2.07
        },
        {
          "date": "2025-08-22",
          "value": 2.08
        },
        {
          "date": "2025-08-23",
          "value": 2.08
        },
        {
          "date": "2025-08-24",
          "value": 2.08
        },
        {
          "date": "2025-08-25",
          "value": 2.07
        },
        {
          "date": "2025-08-26",
          "value": 2.08
        },
        {
          "date": "2025-08-27",
          "value": 2.08
        },
        {
          "date": "2025-08-28",
          "value": 2.08
        },
        {
          "date": "2025-08-29",
          "value": 2.08
        },
        {
          "date": "2025-08-30",
          "value": 2.08
        },
        {
          "date": "2025-08-31",
          "value": 2.08
        },
        {
          "date": "2025-09-01",
          "value": 2.06
        },
        {
          "date": "2025-09-02",
          "value": 2.05
        },
        {
          "date": "2025-09-03",
          "value": 2.05
        },
        {
          "date": "2025-09-04",
          "value": 2.05
        },
        {
          "date": "2025-09-05",
          "value": 2.05
        },
        {
          "date": "2025-09-06",
          "value": 2.05
        },
        {
          "date": "2025-09-07",
          "value": 2.04
        },
        {
          "date": "2025-09-08",
          "value": 2.03
        },
        {
          "date": "2025-09-09",
          "value": 2.03
        },
        {
          "date": "2025-09-10",
          "value": 2.03
        },
        {
          "date": "2025-09-11",
          "value": 2.03
        },
        {
          "date": "2025-09-12",
          "value": 2.03
        },
        {
          "date": "2025-09-13",
          "value": 2.03
        },
        {
          "date": "2025-09-14",
          "value": 2.03
        },
        {
          "date": "2025-09-15",
          "value": 2.02
        },
        {
          "date": "2025-09-16",
          "value": 2.02
        },
        {
          "date": "2025-09-17",
          "value": 2.03
        },
        {
          "date": "2025-09-18",
          "value": 2.03
        },
        {
          "date": "2025-09-19",
          "value": 2.03
        },
        {
          "date": "2025-09-20",
          "value": 2.03
        },
        {
          "date": "2025-09-21",
          "value": 2.02
        },
        {
          "date": "2025-09-22",
          "value": 2.01
        },
        {
          "date": "2025-09-23",
          "value": 2.02
        },
        {
          "date": "2025-09-24",
          "value": 2.02
        },
        {
          "date": "2025-09-25",
          "value": 2.02
        },
        {
          "date": "2025-09-26",
          "value": 2.02
        },
        {
          "date": "2025-09-27",
          "value": 2.02
        },
        {
          "date": "2025-09-28",
          "value": 2.02
        },
        {
          "date": "2025-09-29",
          "value": 2.02
        },
        {
          "date": "2025-09-30",
          "value": 2.01
        },
        {
          "date": "2025-10-01",
          "value": 2.02
        },
        {
          "date": "2025-10-02",
          "value": 2.02
        },
        {
          "date": "2025-10-03",
          "value": 2.02
        },
        {
          "date": "2025-10-04",
          "value": 2.03
        },
        {
          "date": "2025-10-05",
          "value": 2.03
        },
        {
          "date": "2025-10-06",
          "value": 2.02
        },
        {
          "date": "2025-10-07",
          "value": 2.03
        },
        {
          "date": "2025-10-08",
          "value": 2.03
        },
        {
          "date": "2025-10-09",
          "value": 2.04
        },
        {
          "date": "2025-10-10",
          "value": 2.03
        },
        {
          "date": "2025-10-11",
          "value": 2.04
        },
        {
          "date": "2025-10-12",
          "value": 2.03
        },
        {
          "date": "2025-10-13",
          "value": 2.03
        },
        {
          "date": "2025-10-14",
          "value": 2.03
        },
        {
          "date": "2025-10-15",
          "value": 1.99
        },
        {
          "date": "2025-10-16",
          "value": 1.99
        },
        {
          "date": "2025-10-17",
          "value": 1.99
        },
        {
          "date": "2025-10-18",
          "value": 1.99
        },
        {
          "date": "2025-10-19",
          "value": 1.99
        },
        {
          "date": "2025-10-20",
          "value": 1.98
        },
        {
          "date": "2025-10-21",
          "value": 1.98
        },
        {
          "date": "2025-10-22",
          "value": 1.99
        },
        {
          "date": "2025-10-23",
          "value": 1.99
        },
        {
          "date": "2025-10-24",
          "value": 1.99
        },
        {
          "date": "2025-10-25",
          "value": 1.99
        },
        {
          "date": "2025-10-26",
          "value": 1.99
        },
        {
          "date": "2025-10-27",
          "value": 1.98
        },
        {
          "date": "2025-10-28",
          "value": 1.99
        },
        {
          "date": "2025-10-29",
          "value": 1.99
        },
        {
          "date": "2025-10-30",
          "value": 1.99
        },
        {
          "date": "2025-10-31",
          "value": 1.99
        },
        {
          "date": "2025-11-01",
          "value": 1.99
        },
        {
          "date": "2025-11-02",
          "value": 1.99
        },
        {
          "date": "2025-11-03",
          "value": 1.98
        },
        {
          "date": "2025-11-04",
          "value": 1.98
        },
        {
          "date": "2025-11-05",
          "value": 1.98
        },
        {
          "date": "2025-11-06",
          "value": 1.98
        },
        {
          "date": "2025-11-07",
          "value": 1.98
        },
        {
          "date": "2025-11-08",
          "value": 1.98
        },
        {
          "date": "2025-11-09",
          "value": 1.98
        },
        {
          "date": "2025-11-10",
          "value": 1.98
        },
        {
          "date": "2025-11-11",
          "value": 1.99
        },
        {
          "date": "2025-11-12",
          "value": 1.99
        },
        {
          "date": "2025-11-13",
          "value": 1.99
        },
        {
          "date": "2025-11-14",
          "value": 1.99
        },
        {
          "date": "2025-11-15",
          "value": 1.99
        },
        {
          "date": "2025-11-16",
          "value": 1.99
        },
        {
          "date": "2025-11-17",
          "value": 1.98
        },
        {
          "date": "2025-11-18",
          "value": 1.99
        },
        {
          "date": "2025-11-19",
          "value": 1.99
        },
        {
          "date": "2025-11-20",
          "value": 1.99
        },
        {
          "date": "2025-11-21",
          "value": 1.99
        },
        {
          "date": "2025-11-22",
          "value": 1.99
        },
        {
          "date": "2025-11-23",
          "value": 1.99
        },
        {
          "date": "2025-11-24",
          "value": 1.99
        },
        {
          "date": "2025-11-25",
          "value": 1.99
        },
        {
          "date": "2025-11-26",
          "value": 1.96
        },
        {
          "date": "2025-11-27",
          "value": 2.05
        },
        {
          "date": "2025-11-28",
          "value": 1.96
        },
        {
          "date": "2025-11-29",
          "value": 1.96
        },
        {
          "date": "2025-11-30",
          "value": 1.96
        },
        {
          "date": "2025-12-01",
          "value": 1.97
        },
        {
          "date": "2025-12-02",
          "value": 1.97
        },
        {
          "date": "2025-12-03",
          "value": 1.97
        },
        {
          "date": "2025-12-04",
          "value": 1.98
        },
        {
          "date": "2025-12-05",
          "value": 1.98
        },
        {
          "date": "2025-12-06",
          "value": 1.98
        },
        {
          "date": "2025-12-07",
          "value": 1.97
        },
        {
          "date": "2025-12-08",
          "value": 2.0
        },
        {
          "date": "2025-12-09",
          "value": 2.01
        },
        {
          "date": "2025-12-10",
          "value": 2.02
        },
        {
          "date": "2025-12-11",
          "value": 2.02
        },
        {
          "date": "2025-12-12",
          "value": 2.0
        },
        {
          "date": "2025-12-13",
          "value": 2.02
        },
        {
          "date": "2025-12-14",
          "value": 2.02
        },
        {
          "date": "2025-12-15",
          "value": 2.1
        },
        {
          "date": "2025-12-16",
          "value": 2.1
        },
        {
          "date": "2025-12-17",
          "value": 2.1
        },
        {
          "date": "2025-12-18",
          "value": 2.1
        },
        {
          "date": "2025-12-19",
          "value": 2.1
        },
        {
          "date": "2025-12-20",
          "value": 2.11
        },
        {
          "date": "2025-12-21",
          "value": 2.11
        },
        {
          "date": "2025-12-22",
          "value": 2.17
        },
        {
          "date": "2025-12-23",
          "value": 2.17
        },
        {
          "date": "2025-12-24",
          "value": 2.16
        },
        {
          "date": "2025-12-25",
          "value": 2.16
        },
        {
          "date": "2025-12-26",
          "value": 2.16
        },
        {
          "date": "2025-12-27",
          "value": 2.16
        },
        {
          "date": "2025-12-28",
          "value": 2.16
        },
        {
          "date": "2025-12-29",
          "value": 2.2
        },
        {
          "date": "2025-12-30",
          "value": 2.2
        },
        {
          "date": "2025-12-31",
          "value": 2.2
        },
        {
          "date": "2026-01-01",
          "value": 2.2
        },
        {
          "date": "2026-01-02",
          "value": 2.2
        },
        {
          "date": "2026-01-03",
          "value": 2.2
        },
        {
          "date": "2026-01-04",
          "value": 2.21
        },
        {
          "date": "2026-01-05",
          "value": 2.22
        },
        {
          "date": "2026-01-06",
          "value": 2.21
        },
        {
          "date": "2026-01-07",
          "value": 2.22
        },
        {
          "date": "2026-01-09",
          "value": 2.21
        },
        {
          "date": "2026-01-10",
          "value": 2.21
        },
        {
          "date": "2026-01-11",
          "value": 2.21
        },
        {
          "date": "2026-01-12",
          "value": 2.23
        },
        {
          "date": "2026-01-13",
          "value": 2.23
        },
        {
          "date": "2026-01-14",
          "value": 2.23
        },
        {
          "date": "2026-01-15",
          "value": 2.24
        },
        {
          "date": "2026-01-16",
          "value": 2.24
        },
        {
          "date": "2026-01-17",
          "value": 2.24
        },
        {
          "date": "2026-01-18",
          "value": 2.27
        },
        {
          "date": "2026-01-19",
          "value": 2.29
        },
        {
          "date": "2026-01-20",
          "value": 2.29
        },
        {
          "date": "2026-01-21",
          "value": 2.29
        },
        {
          "date": "2026-01-22",
          "value": 2.3
        },
        {
          "date": "2026-01-23",
          "value": 2.3
        },
        {
          "date": "2026-01-24",
          "value": 2.29
        },
        {
          "date": "2026-01-25",
          "value": 2.28
        },
        {
          "date": "2026-01-26",
          "value": 2.3
        },
        {
          "date": "2026-01-27",
          "value": 2.31
        },
        {
          "date": "2026-01-28",
          "value": 2.31
        },
        {
          "date": "2026-01-29",
          "value": 2.31
        },
        {
          "date": "2026-01-30",
          "value": 2.3
        },
        {
          "date": "2026-01-31",
          "value": 2.3
        },
        {
          "date": "2026-02-01",
          "value": 2.3
        },
        {
          "date": "2026-02-02",
          "value": 2.32
        },
        {
          "date": "2026-02-03",
          "value": 2.32
        },
        {
          "date": "2026-02-04",
          "value": 2.31
        },
        {
          "date": "2026-02-05",
          "value": 2.33
        },
        {
          "date": "2026-02-06",
          "value": 2.33
        },
        {
          "date": "2026-02-07",
          "value": 2.33
        },
        {
          "date": "2026-02-08",
          "value": 2.33
        },
        {
          "date": "2026-02-09",
          "value": 2.35
        },
        {
          "date": "2026-02-10",
          "value": 2.36
        },
        {
          "date": "2026-02-11",
          "value": 2.36
        },
        {
          "date": "2026-02-12",
          "value": 2.36
        },
        {
          "date": "2026-02-14",
          "value": 2.4
        },
        {
          "date": "2026-02-15",
          "value": 2.39
        },
        {
          "date": "2026-02-16",
          "value": 2.41
        },
        {
          "date": "2026-02-17",
          "value": 2.41
        },
        {
          "date": "2026-02-18",
          "value": 2.41
        },
        {
          "date": "2026-02-19",
          "value": 2.41
        },
        {
          "date": "2026-02-20",
          "value": 2.41
        },
        {
          "date": "2026-02-21",
          "value": 2.41
        },
        {
          "date": "2026-02-22",
          "value": 2.41
        },
        {
          "date": "2026-02-23",
          "value": 2.43
        },
        {
          "date": "2026-02-24",
          "value": 2.42
        },
        {
          "date": "2026-02-25",
          "value": 2.42
        },
        {
          "date": "2026-02-27",
          "value": 2.43
        },
        {
          "date": "2026-02-28",
          "value": 2.43
        },
        {
          "date": "2026-03-01",
          "value": 2.43
        },
        {
          "date": "2026-03-02",
          "value": 2.45
        },
        {
          "date": "2026-03-03",
          "value": 2.44
        },
        {
          "date": "2026-03-04",
          "value": 2.44
        },
        {
          "date": "2026-03-05",
          "value": 2.44
        },
        {
          "date": "2026-03-06",
          "value": 2.44
        },
        {
          "date": "2026-03-07",
          "value": 2.44
        },
        {
          "date": "2026-03-08",
          "value": 2.44
        },
        {
          "date": "2026-03-09",
          "value": 2.45
        },
        {
          "date": "2026-03-10",
          "value": 2.45
        },
        {
          "date": "2026-03-11",
          "value": 2.46
        },
        {
          "date": "2026-03-12",
          "value": 2.45
        },
        {
          "date": "2026-03-13",
          "value": 2.45
        },
        {
          "date": "2026-03-15",
          "value": 2.45
        },
        {
          "date": "2026-03-16",
          "value": 2.46
        },
        {
          "date": "2026-03-17",
          "value": 2.46
        },
        {
          "date": "2026-03-18",
          "value": 2.47
        },
        {
          "date": "2026-03-19",
          "value": 2.45
        },
        {
          "date": "2026-03-20",
          "value": 2.46
        },
        {
          "date": "2026-03-21",
          "value": 2.46
        },
        {
          "date": "2026-03-22",
          "value": 2.46
        },
        {
          "date": "2026-03-23",
          "value": 2.48
        },
        {
          "date": "2026-03-24",
          "value": 2.46
        },
        {
          "date": "2026-03-25",
          "value": 2.6
        },
        {
          "date": "2026-03-26",
          "value": 2.59
        },
        {
          "date": "2026-03-27",
          "value": 2.6
        },
        {
          "date": "2026-03-28",
          "value": 2.61
        },
        {
          "date": "2026-03-29",
          "value": 2.61
        },
        {
          "date": "2026-03-30",
          "value": 2.63
        },
        {
          "date": "2026-03-31",
          "value": 2.64
        },
        {
          "date": "2026-04-01",
          "value": 2.63
        },
        {
          "date": "2026-04-02",
          "value": 2.64
        },
        {
          "date": "2026-04-03",
          "value": 2.63
        },
        {
          "date": "2026-04-04",
          "value": 2.64
        },
        {
          "date": "2026-04-05",
          "value": 2.64
        },
        {
          "date": "2026-04-06",
          "value": 2.55
        },
        {
          "date": "2026-04-07",
          "value": 2.53
        },
        {
          "date": "2026-04-08",
          "value": 2.47
        },
        {
          "date": "2026-04-09",
          "value": 2.48
        },
        {
          "date": "2026-04-10",
          "value": 2.48
        },
        {
          "date": "2026-04-12",
          "value": 2.47
        },
        {
          "date": "2026-04-13",
          "value": 2.52
        },
        {
          "date": "2026-04-14",
          "value": 2.51
        },
        {
          "date": "2026-04-15",
          "value": 2.5
        },
        {
          "date": "2026-04-16",
          "value": 2.53
        },
        {
          "date": "2026-04-17",
          "value": 2.51
        },
        {
          "date": "2026-04-18",
          "value": 2.5
        },
        {
          "date": "2026-04-19",
          "value": 2.5
        },
        {
          "date": "2026-04-20",
          "value": 2.52
        },
        {
          "date": "2026-04-21",
          "value": 2.53
        },
        {
          "date": "2026-04-22",
          "value": 2.53
        },
        {
          "date": "2026-04-23",
          "value": 2.53
        },
        {
          "date": "2026-04-24",
          "value": 2.52
        },
        {
          "date": "2026-04-25",
          "value": 2.56
        },
        {
          "date": "2026-04-26",
          "value": 2.53
        },
        {
          "date": "2026-04-27",
          "value": 2.54
        },
        {
          "date": "2026-04-28",
          "value": 2.58
        },
        {
          "date": "2026-04-29",
          "value": 2.56
        },
        {
          "date": "2026-04-30",
          "value": 2.59
        },
        {
          "date": "2026-05-03",
          "value": 2.54
        },
        {
          "date": "2026-05-04",
          "value": 2.57
        },
        {
          "date": "2026-05-05",
          "value": 2.57
        },
        {
          "date": "2026-05-06",
          "value": 2.57
        },
        {
          "date": "2026-05-07",
          "value": 2.57
        },
        {
          "date": "2026-05-08",
          "value": 2.63
        },
        {
          "date": "2026-05-09",
          "value": 2.6
        },
        {
          "date": "2026-05-10",
          "value": 2.63
        },
        {
          "date": "2026-05-11",
          "value": 2.64
        },
        {
          "date": "2026-05-12",
          "value": 2.69
        },
        {
          "date": "2026-05-13",
          "value": 2.66
        },
        {
          "date": "2026-05-14",
          "value": 2.6
        },
        {
          "date": "2026-05-15",
          "value": 2.61
        },
        {
          "date": "2026-05-16",
          "value": 2.63
        },
        {
          "date": "2026-05-17",
          "value": 2.62
        },
        {
          "date": "2026-05-18",
          "value": 2.61
        },
        {
          "date": "2026-05-19",
          "value": 2.6
        },
        {
          "date": "2026-05-20",
          "value": 2.61
        },
        {
          "date": "2026-05-21",
          "value": 2.6
        },
        {
          "date": "2026-05-22",
          "value": 2.61
        },
        {
          "date": "2026-05-23",
          "value": 2.61
        },
        {
          "date": "2026-05-24",
          "value": 2.6
        },
        {
          "date": "2026-05-25",
          "value": 2.6
        },
        {
          "date": "2026-05-26",
          "value": 2.64
        },
        {
          "date": "2026-05-27",
          "value": 2.64
        },
        {
          "date": "2026-05-28",
          "value": 2.62
        },
        {
          "date": "2026-05-29",
          "value": 2.67
        },
        {
          "date": "2026-05-30",
          "value": 2.76
        },
        {
          "date": "2026-05-31",
          "value": 2.73
        },
        {
          "date": "2026-06-01",
          "value": 2.74
        },
        {
          "date": "2026-06-02",
          "value": 2.78
        },
        {
          "date": "2026-06-03",
          "value": 2.76
        },
        {
          "date": "2026-06-04",
          "value": 2.76
        },
        {
          "date": "2026-06-05",
          "value": 2.79
        },
        {
          "date": "2026-06-06",
          "value": 2.79
        },
        {
          "date": "2026-06-07",
          "value": 2.78
        },
        {
          "date": "2026-06-08",
          "value": 2.75
        },
        {
          "date": "2026-06-09",
          "value": 2.75
        },
        {
          "date": "2026-06-10",
          "value": 2.78
        },
        {
          "date": "2026-06-11",
          "value": 2.77
        },
        {
          "date": "2026-06-12",
          "value": 2.76
        },
        {
          "date": "2026-06-13",
          "value": 2.77
        },
        {
          "date": "2026-06-14",
          "value": 2.77
        },
        {
          "date": "2026-06-15",
          "value": 2.74
        },
        {
          "date": "2026-06-16",
          "value": 2.73
        },
        {
          "date": "2026-06-17",
          "value": 2.71
        },
        {
          "date": "2026-06-18",
          "value": 2.72
        },
        {
          "date": "2026-06-19",
          "value": 2.71
        },
        {
          "date": "2026-06-20",
          "value": 2.69
        },
        {
          "date": "2026-06-21",
          "value": 2.67
        },
        {
          "date": "2026-06-22",
          "value": 2.63
        },
        {
          "date": "2026-06-23",
          "value": 2.63
        },
        {
          "date": "2026-06-24",
          "value": 2.63
        },
        {
          "date": "2026-06-25",
          "value": 2.63
        },
        {
          "date": "2026-06-26",
          "value": 2.63
        },
        {
          "date": "2026-06-27",
          "value": 2.63
        },
        {
          "date": "2026-06-28",
          "value": 2.65
        },
        {
          "date": "2026-06-29",
          "value": 2.64
        },
        {
          "date": "2026-06-30",
          "value": 2.59
        },
        {
          "date": "2026-07-01",
          "value": 2.66
        },
        {
          "date": "2026-07-02",
          "value": 2.67
        },
        {
          "date": "2026-07-03",
          "value": 2.69
        },
        {
          "date": "2026-07-04",
          "value": 2.7
        },
        {
          "date": "2026-07-06",
          "value": 2.68
        },
        {
          "date": "2026-07-07",
          "value": 2.67
        },
        {
          "date": "2026-07-08",
          "value": 2.67
        },
        {
          "date": "2026-07-09",
          "value": 2.67
        },
        {
          "date": "2026-07-10",
          "value": 2.67
        },
        {
          "date": "2026-07-11",
          "value": 2.67
        },
        {
          "date": "2026-07-12",
          "value": 2.7
        },
        {
          "date": "2026-07-13",
          "value": 2.67
        },
        {
          "date": "2026-07-14",
          "value": 2.66
        },
        {
          "date": "2026-07-15",
          "value": 2.7
        },
        {
          "date": "2026-07-16",
          "value": 2.65
        },
        {
          "date": "2026-07-17",
          "value": 2.66
        },
        {
          "date": "2026-07-18",
          "value": 2.67
        },
        {
          "date": "2026-07-19",
          "value": 2.72
        },
        {
          "date": "2026-07-20",
          "value": 2.69
        },
        {
          "date": "2026-07-21",
          "value": 2.7
        },
        {
          "date": "2026-07-22",
          "value": 2.7
        },
        {
          "date": "2026-07-23",
          "value": 2.7
        },
        {
          "date": "2026-07-24",
          "value": 2.68
        },
        {
          "date": "2026-07-25",
          "value": 2.69
        },
        {
          "date": "2026-07-26",
          "value": 2.71
        },
        {
          "date": "2026-07-27",
          "value": 2.75
        },
        {
          "date": "2026-07-28",
          "value": 2.76
        },
        {
          "date": "2026-07-29",
          "value": 2.75
        },
        {
          "date": "2026-07-30",
          "value": 2.77
        },
        {
          "date": "2026-07-31",
          "value": 2.78
        },
        {
          "date": "2026-08-01",
          "value": 2.78
        },
        {
          "date": "2026-08-02",
          "value": 2.8
        },
        {
          "date": "2026-08-03",
          "value": 2.78
        },
        {
          "date": "2026-08-04",
          "value": 2.72
        },
        {
          "date": "2026-08-05",
          "value": 2.74
        },
        {
          "date": "2026-08-06",
          "value": 2.74
        },
        {
          "date": "2026-08-07",
          "value": 2.75
        },
        {
          "date": "2026-08-08",
          "value": 2.76
        },
        {
          "date": "2026-08-09",
          "value": 2.73
        },
        {
          "date": "2026-08-10",
          "value": 2.74
        },
        {
          "date": "2026-08-11",
          "value": 2.72
        },
        {
          "date": "2026-08-12",
          "value": 2.74
        },
        {
          "date": "2026-08-13",
          "value": 2.74
        },
        {
          "date": "2026-08-14",
          "value": 2.71
        },
        {
          "date": "2026-08-15",
          "value": 2.7
        },
        {
          "date": "2026-08-16",
          "value": 2.71
        },
        {
          "date": "2026-08-17",
          "value": 2.7
        },
        {
          "date": "2026-08-18",
          "value": 2.69
        },
        {
          "date": "2026-08-19",
          "value": 2.68
        },
        {
          "date": "2026-08-20",
          "value": 2.68
        },
        {
          "date": "2026-08-21",
          "value": 2.68
        },
        {
          "date": "2026-08-22",
          "value": 2.7
        },
        {
          "date": "2026-08-23",
          "value": 2.69
        },
        {
          "date": "2026-08-24",
          "value": 2.65
        },
        {
          "date": "2026-08-25",
          "value": 2.68
        },
        {
          "date": "2026-08-26",
          "value": 2.67
        },
        {
          "date": "2026-08-27",
          "value": 2.67
        },
        {
          "date": "2026-08-28",
          "value": 2.66
        },
        {
          "date": "2026-08-29",
          "value": 2.65
        },
        {
          "date": "2026-08-30",
          "value": 2.65
        },
        {
          "date": "2026-08-31",
          "value": 2.62
        },
        {
          "date": "2026-09-01",
          "value": 2.63
        },
        {
          "date": "2026-09-02",
          "value": 2.64
        },
        {
          "date": "2026-09-03",
          "value": 2.66
        },
        {
          "date": "2026-09-04",
          "value": 2.66
        },
        {
          "date": "2026-09-05",
          "value": 2.65
        },
        {
          "date": "2026-09-06",
          "value": 2.65
        },
        {
          "date": "2026-09-07",
          "value": 2.63
        },
        {
          "date": "2026-09-08",
          "value": 2.63
        },
        {
          "date": "2026-09-09",
          "value": 2.64
        },
        {
          "date": "2026-09-10",
          "value": 2.64
        },
        {
          "date": "2026-09-11",
          "value": 2.64
        },
        {
          "date": "2026-09-12",
          "value": 2.65
        },
        {
          "date": "2026-09-13",
          "value": 2.64
        },
        {
          "date": "2026-09-14",
          "value": 2.66
        },
        {
          "date": "2026-09-15",
          "value": 2.66
        },
        {
          "date": "2026-09-16",
          "value": 2.66
        },
        {
          "date": "2026-09-17",
          "value": 2.65
        },
        {
          "date": "2026-09-18",
          "value": 2.65
        },
        {
          "date": "2026-09-19",
          "value": 2.63
        },
        {
          "date": "2026-09-20",
          "value": 2.65
        },
        {
          "date": "2026-09-21",
          "value": 2.6
        },
        {
          "date": "2026-09-22",
          "value": 2.6
        },
        {
          "date": "2026-09-23",
          "value": 2.61
        },
        {
          "date": "2026-09-24",
          "value": 2.61
        },
        {
          "date": "2026-09-25",
          "value": 2.64
        },
        {
          "date": "2026-09-26",
          "value": 2.72
        },
        {
          "date": "2026-09-27",
          "value": 2.7
        },
        {
          "date": "2026-09-28",
          "value": 2.72
        },
        {
          "date": "2026-09-29",
          "value": 2.73
        },
        {
          "date": "2026-09-30",
          "value": 2.75
        },
        {
          "date": "2026-10-01",
          "value": 2.77
        },
        {
          "date": "2026-10-02",
          "value": 2.77
        },
        {
          "date": "2026-10-03",
          "value": 2.78
        },
        {
          "date": "2026-10-04",
          "value": 2.78
        },
        {
          "date": "2026-10-05",
          "value": 2.81
        },
        {
          "date": "2026-10-06",
          "value": 2.82
        },
        {
          "date": "2026-10-07",
          "value": 2.81
        },
        {
          "date": "2026-10-08",
          "value": 2.8
        },
        {
          "date": "2026-10-09",
          "value": 2.85
        },
        {
          "date": "2026-10-10",
          "value": 2.82
        },
        {
          "date": "2026-10-11",
          "value": 2.83
        },
        {
          "date": "2026-10-12",
          "value": 2.85
        },
        {
          "date": "2026-10-13",
          "value": 2.85
        },
        {
          "date": "2026-10-14",
          "value": 2.85
        },
        {
          "date": "2026-10-15",
          "value": 2.81
        },
        {
          "date": "2026-10-16",
          "value": 2.83
        },
        {
          "date": "2026-10-17",
          "value": 2.82
        },
        {
          "date": "2026-10-18",
          "value": 2.83
        },
        {
          "date": "2026-10-19",
          "value": 2.84
        },
        {
          "date": "2026-10-20",
          "value": 2.85
        },
        {
          "date": "2026-10-21",
          "value": 2.86
        },
        {
          "date": "2026-10-22",
          "value": 2.88
        },
        {
          "date": "2026-10-23",
          "value": 2.9
        },
        {
          "date": "2026-10-24",
          "value": 2.88
        },
        {
          "date": "2026-10-25",
          "value": 2.89
        },
        {
          "date": "2026-10-26",
          "value": 2.89
        },
        {
          "date": "2026-10-27",
          "value": 2.89
        },
        {
          "date": "2026-10-28",
          "value": 2.9
        },
        {
          "date": "2026-10-29",
          "value": 2.9
        },
        {
          "date": "2026-10-30",
          "value": 2.9
        },
        {
          "date": "2026-10-31",
          "value": 2.92
        },
        {
          "date": "2026-11-01",
          "value": 2.93
        },
        {
          "date": "2026-11-02",
          "value": 2.94
        },
        {
          "date": "2026-11-03",
          "value": 2.96
        },
        {
          "date": "2026-11-04",
          "value": 2.96
        }
      ]
    },
    {
      "source": "AI_Infra.xlsx",
      "sheet": "High Freq Data Value",
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
          "level": 6.64,
          "yoy": 39.20335429769393,
          "unchangedFromPrevious": false,
          "partial": true
        },
        {
          "month": "2026-11",
          "level": 6.53,
          "yoy": 41.95652173913045,
          "unchangedFromPrevious": false,
          "partial": true
        }
      ],
      "daily": [
        {
          "date": "2025-07-31",
          "value": 5.3
        },
        {
          "date": "2025-08-01",
          "value": 5.31
        },
        {
          "date": "2025-08-02",
          "value": 5.31
        },
        {
          "date": "2025-08-03",
          "value": 5.31
        },
        {
          "date": "2025-08-04",
          "value": 5.31
        },
        {
          "date": "2025-08-05",
          "value": 5.32
        },
        {
          "date": "2025-08-06",
          "value": 5.28
        },
        {
          "date": "2025-08-07",
          "value": 5.3
        },
        {
          "date": "2025-08-08",
          "value": 5.3
        },
        {
          "date": "2025-08-09",
          "value": 5.19
        },
        {
          "date": "2025-08-10",
          "value": 5.19
        },
        {
          "date": "2025-08-11",
          "value": 5.19
        },
        {
          "date": "2025-08-12",
          "value": 5.05
        },
        {
          "date": "2025-08-13",
          "value": 5.27
        },
        {
          "date": "2025-08-14",
          "value": 5.22
        },
        {
          "date": "2025-08-15",
          "value": 5.16
        },
        {
          "date": "2025-08-16",
          "value": 5.17
        },
        {
          "date": "2025-08-17",
          "value": 5.17
        },
        {
          "date": "2025-08-18",
          "value": 5.23
        },
        {
          "date": "2025-08-19",
          "value": 5.28
        },
        {
          "date": "2025-08-20",
          "value": 5.26
        },
        {
          "date": "2025-08-21",
          "value": 5.22
        },
        {
          "date": "2025-08-22",
          "value": 5.22
        },
        {
          "date": "2025-08-23",
          "value": 5.25
        },
        {
          "date": "2025-08-24",
          "value": 5.25
        },
        {
          "date": "2025-08-25",
          "value": 5.28
        },
        {
          "date": "2025-08-26",
          "value": 5.28
        },
        {
          "date": "2025-08-27",
          "value": 5.26
        },
        {
          "date": "2025-08-28",
          "value": 5.29
        },
        {
          "date": "2025-08-29",
          "value": 5.32
        },
        {
          "date": "2025-08-30",
          "value": 5.26
        },
        {
          "date": "2025-08-31",
          "value": 5.29
        },
        {
          "date": "2025-09-01",
          "value": 5.29
        },
        {
          "date": "2025-09-02",
          "value": 5.29
        },
        {
          "date": "2025-09-03",
          "value": 5.28
        },
        {
          "date": "2025-09-04",
          "value": 5.31
        },
        {
          "date": "2025-09-05",
          "value": 5.33
        },
        {
          "date": "2025-09-06",
          "value": 5.29
        },
        {
          "date": "2025-09-07",
          "value": 5.28
        },
        {
          "date": "2025-09-08",
          "value": 5.32
        },
        {
          "date": "2025-09-09",
          "value": 5.32
        },
        {
          "date": "2025-09-10",
          "value": 5.33
        },
        {
          "date": "2025-09-11",
          "value": 5.31
        },
        {
          "date": "2025-09-12",
          "value": 5.31
        },
        {
          "date": "2025-09-13",
          "value": 5.31
        },
        {
          "date": "2025-09-14",
          "value": 5.32
        },
        {
          "date": "2025-09-15",
          "value": 5.32
        },
        {
          "date": "2025-09-16",
          "value": 5.34
        },
        {
          "date": "2025-09-17",
          "value": 5.31
        },
        {
          "date": "2025-09-18",
          "value": 5.3
        },
        {
          "date": "2025-09-19",
          "value": 5.3
        },
        {
          "date": "2025-09-20",
          "value": 5.3
        },
        {
          "date": "2025-09-21",
          "value": 5.3
        },
        {
          "date": "2025-09-22",
          "value": 5.13
        },
        {
          "date": "2025-09-23",
          "value": 5.13
        },
        {
          "date": "2025-09-24",
          "value": 5.1
        },
        {
          "date": "2025-09-25",
          "value": 5.1
        },
        {
          "date": "2025-09-26",
          "value": 5.03
        },
        {
          "date": "2025-09-27",
          "value": 5.02
        },
        {
          "date": "2025-09-28",
          "value": 5.01
        },
        {
          "date": "2025-09-29",
          "value": 5.0
        },
        {
          "date": "2025-09-30",
          "value": 5.01
        },
        {
          "date": "2025-10-01",
          "value": 5.03
        },
        {
          "date": "2025-10-02",
          "value": 5.04
        },
        {
          "date": "2025-10-03",
          "value": 5.03
        },
        {
          "date": "2025-10-04",
          "value": 5.04
        },
        {
          "date": "2025-10-05",
          "value": 5.02
        },
        {
          "date": "2025-10-06",
          "value": 4.97
        },
        {
          "date": "2025-10-07",
          "value": 4.97
        },
        {
          "date": "2025-10-08",
          "value": 4.98
        },
        {
          "date": "2025-10-09",
          "value": 5.0
        },
        {
          "date": "2025-10-10",
          "value": 5.01
        },
        {
          "date": "2025-10-11",
          "value": 5.0
        },
        {
          "date": "2025-10-12",
          "value": 4.89
        },
        {
          "date": "2025-10-13",
          "value": 4.91
        },
        {
          "date": "2025-10-14",
          "value": 4.9
        },
        {
          "date": "2025-10-15",
          "value": 4.91
        },
        {
          "date": "2025-10-16",
          "value": 4.79
        },
        {
          "date": "2025-10-17",
          "value": 4.8
        },
        {
          "date": "2025-10-18",
          "value": 4.8
        },
        {
          "date": "2025-10-19",
          "value": 4.8
        },
        {
          "date": "2025-10-20",
          "value": 4.8
        },
        {
          "date": "2025-10-21",
          "value": 4.77
        },
        {
          "date": "2025-10-22",
          "value": 4.79
        },
        {
          "date": "2025-10-23",
          "value": 4.8
        },
        {
          "date": "2025-10-24",
          "value": 4.8
        },
        {
          "date": "2025-10-25",
          "value": 4.81
        },
        {
          "date": "2025-10-26",
          "value": 4.81
        },
        {
          "date": "2025-10-27",
          "value": 4.78
        },
        {
          "date": "2025-10-28",
          "value": 4.78
        },
        {
          "date": "2025-10-29",
          "value": 4.79
        },
        {
          "date": "2025-10-30",
          "value": 4.78
        },
        {
          "date": "2025-10-31",
          "value": 4.77
        },
        {
          "date": "2025-11-01",
          "value": 4.76
        },
        {
          "date": "2025-11-02",
          "value": 4.73
        },
        {
          "date": "2025-11-03",
          "value": 4.72
        },
        {
          "date": "2025-11-04",
          "value": 4.73
        },
        {
          "date": "2025-11-05",
          "value": 4.75
        },
        {
          "date": "2025-11-06",
          "value": 4.75
        },
        {
          "date": "2025-11-07",
          "value": 4.74
        },
        {
          "date": "2025-11-08",
          "value": 4.69
        },
        {
          "date": "2025-11-09",
          "value": 4.7
        },
        {
          "date": "2025-11-10",
          "value": 4.69
        },
        {
          "date": "2025-11-11",
          "value": 4.7
        },
        {
          "date": "2025-11-12",
          "value": 4.69
        },
        {
          "date": "2025-11-13",
          "value": 4.63
        },
        {
          "date": "2025-11-14",
          "value": 4.63
        },
        {
          "date": "2025-11-15",
          "value": 4.63
        },
        {
          "date": "2025-11-16",
          "value": 4.63
        },
        {
          "date": "2025-11-17",
          "value": 4.63
        },
        {
          "date": "2025-11-18",
          "value": 4.64
        },
        {
          "date": "2025-11-19",
          "value": 4.79
        },
        {
          "date": "2025-11-20",
          "value": 4.79
        },
        {
          "date": "2025-11-21",
          "value": 4.78
        },
        {
          "date": "2025-11-22",
          "value": 4.77
        },
        {
          "date": "2025-11-23",
          "value": 4.77
        },
        {
          "date": "2025-11-24",
          "value": 4.65
        },
        {
          "date": "2025-11-25",
          "value": 4.62
        },
        {
          "date": "2025-11-26",
          "value": 4.59
        },
        {
          "date": "2025-11-27",
          "value": 4.59
        },
        {
          "date": "2025-11-28",
          "value": 4.59
        },
        {
          "date": "2025-11-29",
          "value": 4.6
        },
        {
          "date": "2025-11-30",
          "value": 4.6
        },
        {
          "date": "2025-12-01",
          "value": 4.59
        },
        {
          "date": "2025-12-02",
          "value": 4.6
        },
        {
          "date": "2025-12-03",
          "value": 4.56
        },
        {
          "date": "2025-12-04",
          "value": 4.61
        },
        {
          "date": "2025-12-05",
          "value": 4.54
        },
        {
          "date": "2025-12-06",
          "value": 4.57
        },
        {
          "date": "2025-12-07",
          "value": 4.5
        },
        {
          "date": "2025-12-08",
          "value": 4.56
        },
        {
          "date": "2025-12-09",
          "value": 4.53
        },
        {
          "date": "2025-12-10",
          "value": 4.6
        },
        {
          "date": "2025-12-11",
          "value": 4.56
        },
        {
          "date": "2025-12-12",
          "value": 4.53
        },
        {
          "date": "2025-12-13",
          "value": 4.49
        },
        {
          "date": "2025-12-14",
          "value": 4.49
        },
        {
          "date": "2025-12-15",
          "value": 4.5
        },
        {
          "date": "2025-12-16",
          "value": 4.49
        },
        {
          "date": "2025-12-17",
          "value": 4.52
        },
        {
          "date": "2025-12-18",
          "value": 4.52
        },
        {
          "date": "2025-12-19",
          "value": 4.52
        },
        {
          "date": "2025-12-20",
          "value": 4.63
        },
        {
          "date": "2025-12-21",
          "value": 4.63
        },
        {
          "date": "2025-12-22",
          "value": 4.45
        },
        {
          "date": "2025-12-23",
          "value": 4.41
        },
        {
          "date": "2025-12-24",
          "value": 4.41
        },
        {
          "date": "2025-12-25",
          "value": 4.39
        },
        {
          "date": "2025-12-26",
          "value": 4.42
        },
        {
          "date": "2025-12-27",
          "value": 4.41
        },
        {
          "date": "2025-12-28",
          "value": 4.4
        },
        {
          "date": "2025-12-29",
          "value": 4.4
        },
        {
          "date": "2025-12-30",
          "value": 4.4
        },
        {
          "date": "2025-12-31",
          "value": 4.4
        },
        {
          "date": "2026-01-01",
          "value": 4.4
        },
        {
          "date": "2026-01-02",
          "value": 4.4
        },
        {
          "date": "2026-01-03",
          "value": 4.42
        },
        {
          "date": "2026-01-04",
          "value": 4.42
        },
        {
          "date": "2026-01-05",
          "value": 4.43
        },
        {
          "date": "2026-01-06",
          "value": 4.41
        },
        {
          "date": "2026-01-07",
          "value": 4.42
        },
        {
          "date": "2026-01-08",
          "value": 4.43
        },
        {
          "date": "2026-01-09",
          "value": 4.3
        },
        {
          "date": "2026-01-10",
          "value": 4.3
        },
        {
          "date": "2026-01-11",
          "value": 4.29
        },
        {
          "date": "2026-01-12",
          "value": 4.29
        },
        {
          "date": "2026-01-13",
          "value": 4.43
        },
        {
          "date": "2026-01-14",
          "value": 4.43
        },
        {
          "date": "2026-01-15",
          "value": 4.45
        },
        {
          "date": "2026-01-16",
          "value": 4.47
        },
        {
          "date": "2026-01-17",
          "value": 4.46
        },
        {
          "date": "2026-01-18",
          "value": 4.45
        },
        {
          "date": "2026-01-19",
          "value": 4.45
        },
        {
          "date": "2026-01-20",
          "value": 4.44
        },
        {
          "date": "2026-01-21",
          "value": 4.43
        },
        {
          "date": "2026-01-22",
          "value": 4.42
        },
        {
          "date": "2026-01-23",
          "value": 4.39
        },
        {
          "date": "2026-01-24",
          "value": 4.39
        },
        {
          "date": "2026-01-25",
          "value": 4.42
        },
        {
          "date": "2026-01-26",
          "value": 4.44
        },
        {
          "date": "2026-01-27",
          "value": 4.44
        },
        {
          "date": "2026-01-28",
          "value": 4.41
        },
        {
          "date": "2026-01-29",
          "value": 4.44
        },
        {
          "date": "2026-01-30",
          "value": 4.44
        },
        {
          "date": "2026-01-31",
          "value": 4.43
        },
        {
          "date": "2026-02-01",
          "value": 4.48
        },
        {
          "date": "2026-02-02",
          "value": 4.44
        },
        {
          "date": "2026-02-03",
          "value": 4.44
        },
        {
          "date": "2026-02-04",
          "value": 4.42
        },
        {
          "date": "2026-02-05",
          "value": 4.41
        },
        {
          "date": "2026-02-06",
          "value": 4.41
        },
        {
          "date": "2026-02-07",
          "value": 4.41
        },
        {
          "date": "2026-02-08",
          "value": 4.43
        },
        {
          "date": "2026-02-09",
          "value": 4.45
        },
        {
          "date": "2026-02-10",
          "value": 4.47
        },
        {
          "date": "2026-02-11",
          "value": 4.47
        },
        {
          "date": "2026-02-12",
          "value": 4.51
        },
        {
          "date": "2026-02-13",
          "value": 4.46
        },
        {
          "date": "2026-02-14",
          "value": 4.64
        },
        {
          "date": "2026-02-15",
          "value": 4.69
        },
        {
          "date": "2026-02-16",
          "value": 4.71
        },
        {
          "date": "2026-02-17",
          "value": 4.65
        },
        {
          "date": "2026-02-18",
          "value": 4.64
        },
        {
          "date": "2026-02-19",
          "value": 4.7
        },
        {
          "date": "2026-02-20",
          "value": 4.66
        },
        {
          "date": "2026-02-21",
          "value": 4.66
        },
        {
          "date": "2026-02-22",
          "value": 4.66
        },
        {
          "date": "2026-02-23",
          "value": 4.45
        },
        {
          "date": "2026-02-24",
          "value": 4.44
        },
        {
          "date": "2026-02-25",
          "value": 4.44
        },
        {
          "date": "2026-02-27",
          "value": 4.44
        },
        {
          "date": "2026-02-28",
          "value": 4.43
        },
        {
          "date": "2026-03-01",
          "value": 4.43
        },
        {
          "date": "2026-03-02",
          "value": 4.4
        },
        {
          "date": "2026-03-03",
          "value": 4.54
        },
        {
          "date": "2026-03-04",
          "value": 4.6
        },
        {
          "date": "2026-03-05",
          "value": 4.59
        },
        {
          "date": "2026-03-06",
          "value": 4.67
        },
        {
          "date": "2026-03-07",
          "value": 4.57
        },
        {
          "date": "2026-03-08",
          "value": 4.7
        },
        {
          "date": "2026-03-09",
          "value": 4.56
        },
        {
          "date": "2026-03-10",
          "value": 4.58
        },
        {
          "date": "2026-03-11",
          "value": 4.61
        },
        {
          "date": "2026-03-12",
          "value": 4.8
        },
        {
          "date": "2026-03-13",
          "value": 4.84
        },
        {
          "date": "2026-03-15",
          "value": 5.05
        },
        {
          "date": "2026-03-16",
          "value": 5.04
        },
        {
          "date": "2026-03-17",
          "value": 5.03
        },
        {
          "date": "2026-03-18",
          "value": 5.02
        },
        {
          "date": "2026-03-19",
          "value": 4.9
        },
        {
          "date": "2026-03-20",
          "value": 5.04
        },
        {
          "date": "2026-03-21",
          "value": 5.11
        },
        {
          "date": "2026-03-22",
          "value": 5.09
        },
        {
          "date": "2026-03-23",
          "value": 6.06
        },
        {
          "date": "2026-03-24",
          "value": 6.05
        },
        {
          "date": "2026-03-25",
          "value": 6.11
        },
        {
          "date": "2026-03-26",
          "value": 5.97
        },
        {
          "date": "2026-03-27",
          "value": 5.99
        },
        {
          "date": "2026-03-28",
          "value": 6.08
        },
        {
          "date": "2026-03-29",
          "value": 5.97
        },
        {
          "date": "2026-03-30",
          "value": 5.48
        },
        {
          "date": "2026-03-31",
          "value": 5.47
        },
        {
          "date": "2026-04-01",
          "value": 5.41
        },
        {
          "date": "2026-04-02",
          "value": 5.35
        },
        {
          "date": "2026-04-03",
          "value": 5.31
        },
        {
          "date": "2026-04-04",
          "value": 5.17
        },
        {
          "date": "2026-04-05",
          "value": 5.23
        },
        {
          "date": "2026-04-06",
          "value": 5.1
        },
        {
          "date": "2026-04-07",
          "value": 5.12
        },
        {
          "date": "2026-04-08",
          "value": 5.16
        },
        {
          "date": "2026-04-09",
          "value": 5.17
        },
        {
          "date": "2026-04-10",
          "value": 5.15
        },
        {
          "date": "2026-04-12",
          "value": 5.17
        },
        {
          "date": "2026-04-13",
          "value": 5.17
        },
        {
          "date": "2026-04-14",
          "value": 5.09
        },
        {
          "date": "2026-04-15",
          "value": 5.09
        },
        {
          "date": "2026-04-16",
          "value": 5.09
        },
        {
          "date": "2026-04-17",
          "value": 5.11
        },
        {
          "date": "2026-04-18",
          "value": 5.1
        },
        {
          "date": "2026-04-19",
          "value": 5.15
        },
        {
          "date": "2026-04-20",
          "value": 5.2
        },
        {
          "date": "2026-04-21",
          "value": 5.16
        },
        {
          "date": "2026-04-22",
          "value": 5.13
        },
        {
          "date": "2026-04-23",
          "value": 5.13
        },
        {
          "date": "2026-04-24",
          "value": 5.19
        },
        {
          "date": "2026-04-25",
          "value": 5.19
        },
        {
          "date": "2026-04-26",
          "value": 5.15
        },
        {
          "date": "2026-04-27",
          "value": 5.16
        },
        {
          "date": "2026-04-28",
          "value": 5.19
        },
        {
          "date": "2026-04-29",
          "value": 5.17
        },
        {
          "date": "2026-04-30",
          "value": 5.16
        },
        {
          "date": "2026-05-03",
          "value": 5.11
        },
        {
          "date": "2026-05-04",
          "value": 5.2
        },
        {
          "date": "2026-05-05",
          "value": 5.2
        },
        {
          "date": "2026-05-06",
          "value": 5.11
        },
        {
          "date": "2026-05-07",
          "value": 5.19
        },
        {
          "date": "2026-05-08",
          "value": 5.2
        },
        {
          "date": "2026-05-09",
          "value": 5.14
        },
        {
          "date": "2026-05-10",
          "value": 5.25
        },
        {
          "date": "2026-05-11",
          "value": 5.01
        },
        {
          "date": "2026-05-12",
          "value": 4.94
        },
        {
          "date": "2026-05-13",
          "value": 4.92
        },
        {
          "date": "2026-05-14",
          "value": 5.01
        },
        {
          "date": "2026-05-15",
          "value": 4.97
        },
        {
          "date": "2026-05-16",
          "value": 5.12
        },
        {
          "date": "2026-05-17",
          "value": 5.05
        },
        {
          "date": "2026-05-18",
          "value": 5.11
        },
        {
          "date": "2026-05-19",
          "value": 5.16
        },
        {
          "date": "2026-05-20",
          "value": 5.06
        },
        {
          "date": "2026-05-21",
          "value": 5.22
        },
        {
          "date": "2026-05-22",
          "value": 5.3
        },
        {
          "date": "2026-05-23",
          "value": 5.26
        },
        {
          "date": "2026-05-24",
          "value": 5.32
        },
        {
          "date": "2026-05-25",
          "value": 5.36
        },
        {
          "date": "2026-05-26",
          "value": 5.42
        },
        {
          "date": "2026-05-27",
          "value": 5.36
        },
        {
          "date": "2026-05-28",
          "value": 5.46
        },
        {
          "date": "2026-05-29",
          "value": 5.41
        },
        {
          "date": "2026-05-30",
          "value": 5.37
        },
        {
          "date": "2026-05-31",
          "value": 5.38
        },
        {
          "date": "2026-06-01",
          "value": 5.42
        },
        {
          "date": "2026-06-02",
          "value": 5.45
        },
        {
          "date": "2026-06-03",
          "value": 5.44
        },
        {
          "date": "2026-06-04",
          "value": 5.42
        },
        {
          "date": "2026-06-05",
          "value": 5.44
        },
        {
          "date": "2026-06-06",
          "value": 5.43
        },
        {
          "date": "2026-06-07",
          "value": 5.39
        },
        {
          "date": "2026-06-08",
          "value": 5.29
        },
        {
          "date": "2026-06-09",
          "value": 5.27
        },
        {
          "date": "2026-06-10",
          "value": 5.31
        },
        {
          "date": "2026-06-11",
          "value": 5.26
        },
        {
          "date": "2026-06-12",
          "value": 5.27
        },
        {
          "date": "2026-06-13",
          "value": 5.26
        },
        {
          "date": "2026-06-14",
          "value": 5.26
        },
        {
          "date": "2026-06-15",
          "value": 5.29
        },
        {
          "date": "2026-06-16",
          "value": 5.28
        },
        {
          "date": "2026-06-17",
          "value": 5.29
        },
        {
          "date": "2026-06-18",
          "value": 5.31
        },
        {
          "date": "2026-06-19",
          "value": 5.31
        },
        {
          "date": "2026-06-20",
          "value": 5.3
        },
        {
          "date": "2026-06-21",
          "value": 5.3
        },
        {
          "date": "2026-06-22",
          "value": 5.32
        },
        {
          "date": "2026-06-23",
          "value": 5.33
        },
        {
          "date": "2026-06-24",
          "value": 5.33
        },
        {
          "date": "2026-06-25",
          "value": 5.34
        },
        {
          "date": "2026-06-26",
          "value": 5.32
        },
        {
          "date": "2026-06-27",
          "value": 5.31
        },
        {
          "date": "2026-06-28",
          "value": 5.32
        },
        {
          "date": "2026-06-29",
          "value": 5.34
        },
        {
          "date": "2026-06-30",
          "value": 5.36
        },
        {
          "date": "2026-07-01",
          "value": 5.63
        },
        {
          "date": "2026-07-02",
          "value": 5.63
        },
        {
          "date": "2026-07-03",
          "value": 5.63
        },
        {
          "date": "2026-07-04",
          "value": 5.63
        },
        {
          "date": "2026-07-06",
          "value": 5.77
        },
        {
          "date": "2026-07-07",
          "value": 5.74
        },
        {
          "date": "2026-07-08",
          "value": 5.81
        },
        {
          "date": "2026-07-09",
          "value": 5.82
        },
        {
          "date": "2026-07-10",
          "value": 5.96
        },
        {
          "date": "2026-07-11",
          "value": 5.93
        },
        {
          "date": "2026-07-12",
          "value": 5.86
        },
        {
          "date": "2026-07-13",
          "value": 5.96
        },
        {
          "date": "2026-07-14",
          "value": 6.01
        },
        {
          "date": "2026-07-15",
          "value": 5.62
        },
        {
          "date": "2026-07-16",
          "value": 5.67
        },
        {
          "date": "2026-07-17",
          "value": 5.62
        },
        {
          "date": "2026-07-18",
          "value": 5.64
        },
        {
          "date": "2026-07-19",
          "value": 5.62
        },
        {
          "date": "2026-07-20",
          "value": 5.64
        },
        {
          "date": "2026-07-21",
          "value": 5.62
        },
        {
          "date": "2026-07-22",
          "value": 5.62
        },
        {
          "date": "2026-07-23",
          "value": 5.63
        },
        {
          "date": "2026-07-24",
          "value": 5.62
        },
        {
          "date": "2026-07-25",
          "value": 5.76
        },
        {
          "date": "2026-07-26",
          "value": 5.74
        },
        {
          "date": "2026-07-27",
          "value": 5.66
        },
        {
          "date": "2026-07-28",
          "value": 5.66
        },
        {
          "date": "2026-07-29",
          "value": 5.66
        },
        {
          "date": "2026-07-30",
          "value": 5.66
        },
        {
          "date": "2026-07-31",
          "value": 5.67
        },
        {
          "date": "2026-08-01",
          "value": 5.67
        },
        {
          "date": "2026-08-02",
          "value": 5.66
        },
        {
          "date": "2026-08-03",
          "value": 5.65
        },
        {
          "date": "2026-08-04",
          "value": 5.58
        },
        {
          "date": "2026-08-05",
          "value": 5.6
        },
        {
          "date": "2026-08-06",
          "value": 5.59
        },
        {
          "date": "2026-08-07",
          "value": 5.59
        },
        {
          "date": "2026-08-08",
          "value": 5.59
        },
        {
          "date": "2026-08-09",
          "value": 5.59
        },
        {
          "date": "2026-08-10",
          "value": 5.6
        },
        {
          "date": "2026-08-11",
          "value": 5.61
        },
        {
          "date": "2026-08-12",
          "value": 5.61
        },
        {
          "date": "2026-08-13",
          "value": 5.61
        },
        {
          "date": "2026-08-14",
          "value": 5.63
        },
        {
          "date": "2026-08-15",
          "value": 5.64
        },
        {
          "date": "2026-08-16",
          "value": 5.63
        },
        {
          "date": "2026-08-17",
          "value": 5.64
        },
        {
          "date": "2026-08-18",
          "value": 5.65
        },
        {
          "date": "2026-08-19",
          "value": 5.65
        },
        {
          "date": "2026-08-20",
          "value": 5.67
        },
        {
          "date": "2026-08-21",
          "value": 5.69
        },
        {
          "date": "2026-08-22",
          "value": 5.65
        },
        {
          "date": "2026-08-23",
          "value": 5.66
        },
        {
          "date": "2026-08-24",
          "value": 5.67
        },
        {
          "date": "2026-08-25",
          "value": 5.66
        },
        {
          "date": "2026-08-26",
          "value": 5.65
        },
        {
          "date": "2026-08-27",
          "value": 5.63
        },
        {
          "date": "2026-08-28",
          "value": 5.62
        },
        {
          "date": "2026-08-29",
          "value": 5.58
        },
        {
          "date": "2026-08-30",
          "value": 5.58
        },
        {
          "date": "2026-08-31",
          "value": 5.62
        },
        {
          "date": "2026-09-01",
          "value": 5.62
        },
        {
          "date": "2026-09-02",
          "value": 5.64
        },
        {
          "date": "2026-09-03",
          "value": 5.64
        },
        {
          "date": "2026-09-04",
          "value": 5.64
        },
        {
          "date": "2026-09-05",
          "value": 5.66
        },
        {
          "date": "2026-09-06",
          "value": 5.66
        },
        {
          "date": "2026-09-07",
          "value": 5.69
        },
        {
          "date": "2026-09-08",
          "value": 5.7
        },
        {
          "date": "2026-09-09",
          "value": 5.7
        },
        {
          "date": "2026-09-10",
          "value": 5.68
        },
        {
          "date": "2026-09-11",
          "value": 5.67
        },
        {
          "date": "2026-09-12",
          "value": 5.67
        },
        {
          "date": "2026-09-13",
          "value": 5.7
        },
        {
          "date": "2026-09-14",
          "value": 5.72
        },
        {
          "date": "2026-09-15",
          "value": 5.73
        },
        {
          "date": "2026-09-16",
          "value": 5.73
        },
        {
          "date": "2026-09-17",
          "value": 5.71
        },
        {
          "date": "2026-09-18",
          "value": 5.72
        },
        {
          "date": "2026-09-19",
          "value": 5.73
        },
        {
          "date": "2026-09-20",
          "value": 5.73
        },
        {
          "date": "2026-09-21",
          "value": 5.74
        },
        {
          "date": "2026-09-22",
          "value": 5.76
        },
        {
          "date": "2026-09-23",
          "value": 5.77
        },
        {
          "date": "2026-09-24",
          "value": 5.79
        },
        {
          "date": "2026-09-25",
          "value": 5.87
        },
        {
          "date": "2026-09-26",
          "value": 5.87
        },
        {
          "date": "2026-09-27",
          "value": 5.87
        },
        {
          "date": "2026-09-28",
          "value": 5.78
        },
        {
          "date": "2026-09-29",
          "value": 5.88
        },
        {
          "date": "2026-09-30",
          "value": 5.78
        },
        {
          "date": "2026-10-01",
          "value": 5.86
        },
        {
          "date": "2026-10-02",
          "value": 5.86
        },
        {
          "date": "2026-10-03",
          "value": 5.86
        },
        {
          "date": "2026-10-04",
          "value": 5.86
        },
        {
          "date": "2026-10-05",
          "value": 5.87
        },
        {
          "date": "2026-10-06",
          "value": 5.87
        },
        {
          "date": "2026-10-07",
          "value": 5.88
        },
        {
          "date": "2026-10-08",
          "value": 5.88
        },
        {
          "date": "2026-10-09",
          "value": 5.93
        },
        {
          "date": "2026-10-10",
          "value": 5.93
        },
        {
          "date": "2026-10-11",
          "value": 5.93
        },
        {
          "date": "2026-10-12",
          "value": 5.94
        },
        {
          "date": "2026-10-13",
          "value": 5.95
        },
        {
          "date": "2026-10-14",
          "value": 5.95
        },
        {
          "date": "2026-10-15",
          "value": 6.01
        },
        {
          "date": "2026-10-16",
          "value": 6.01
        },
        {
          "date": "2026-10-17",
          "value": 6.12
        },
        {
          "date": "2026-10-18",
          "value": 6.26
        },
        {
          "date": "2026-10-19",
          "value": 6.14
        },
        {
          "date": "2026-10-20",
          "value": 6.14
        },
        {
          "date": "2026-10-21",
          "value": 6.14
        },
        {
          "date": "2026-10-22",
          "value": 6.29
        },
        {
          "date": "2026-10-23",
          "value": 6.45
        },
        {
          "date": "2026-10-24",
          "value": 6.45
        },
        {
          "date": "2026-10-25",
          "value": 6.6
        },
        {
          "date": "2026-10-26",
          "value": 6.63
        },
        {
          "date": "2026-10-27",
          "value": 6.47
        },
        {
          "date": "2026-10-28",
          "value": 6.47
        },
        {
          "date": "2026-10-29",
          "value": 6.47
        },
        {
          "date": "2026-10-30",
          "value": 6.48
        },
        {
          "date": "2026-10-31",
          "value": 6.64
        },
        {
          "date": "2026-11-01",
          "value": 6.5
        },
        {
          "date": "2026-11-02",
          "value": 6.5
        },
        {
          "date": "2026-11-03",
          "value": 6.54
        },
        {
          "date": "2026-11-04",
          "value": 6.53
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
      "score": 19.369006453794793
    },
    {
      "month": "2024-11",
      "score": 19.369006453794793
    },
    {
      "month": "2024-12",
      "score": 19.369006453794793
    },
    {
      "month": "2025-01",
      "score": 45.99795882121264
    },
    {
      "month": "2025-02",
      "score": 45.99795882121264
    },
    {
      "month": "2025-03",
      "score": 45.99795882121264
    },
    {
      "month": "2025-04",
      "score": 51.15138256263131
    },
    {
      "month": "2025-05",
      "score": 51.15138256263131
    },
    {
      "month": "2025-06",
      "score": 51.15138256263131
    },
    {
      "month": "2025-07",
      "score": 61.169498043053906
    },
    {
      "month": "2025-08",
      "score": 61.169498043053906
    },
    {
      "month": "2025-09",
      "score": 61.169498043053906
    },
    {
      "month": "2025-10",
      "score": 49.78213320080182
    },
    {
      "month": "2025-11",
      "score": 49.78213320080182
    },
    {
      "month": "2025-12",
      "score": 49.78213320080182
    },
    {
      "month": "2026-01",
      "score": 58.454837404086554
    },
    {
      "month": "2026-02",
      "score": 58.454837404086554
    },
    {
      "month": "2026-03",
      "score": 58.454837404086554
    },
    {
      "month": "2026-04",
      "score": 64.0751835144191
    },
    {
      "month": "2026-05",
      "score": 64.0751835144191
    },
    {
      "month": "2026-06",
      "score": 64.0751835144191
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
    },
    {
      "month": "2026-11",
      "score": null
    }
  ]
} as const;
