export const coreProjectionSnapshot = {
  "metadata": {
    "source": "Indexlist.xlsx",
    "sheet": "Supply Chain Financial Value",
    "workbookSha256": "f60e92129d05c5ca01c414ed069cacdd3bb350ebe2ef124e189c7bc240664539",
    "actualThrough": "2026-06-30",
    "estimateThrough": "2027-12-31",
    "anchorMonth": "2026-06",
    "bridgeFactors": {
      "Microsoft": 1.1451874196972236,
      "Alphabet": 1.0,
      "Amazon": 1.0103859208972845,
      "Meta": 1.0319431531411873,
      "Oracle": 0.8156716421920397
    },
    "method": "Conditional composite: June 2026 composite + 25% \u00d7 (projected CapEx score \u2212 June CapEx score). The other three pillars are held at their June scores. CapEx uses five-company TTM total YoY growth and unchanged June baseline. Each company headline estimate is multiplied by its June approved-core CapEx / June source headline CapEx ratio to bridge accounting bases. This fixed-ratio bridge is an assumption, not a Bloomberg forecast of lease-inclusive spending. Quarter scores held across constituent months; retrospective period alignment.",
    "reportedCapexAsOf": "2026-11-24",
    "sourceRetrievedAt": null
  },
  "quarters": [
    {
      "quarter": "2026Q3",
      "availableEstimate": {
        "tickers": [
          "MSFT",
          "META",
          "AMZN",
          "GOOGL"
        ],
        "expected": 5,
        "total": 209.5252135177421,
        "growth": 74.7878212285556,
        "capexScore": 57.97990980960883,
        "composite": 60.98548795266121
      },
      "total": 230.60187930265104,
      "companies": {
        "Microsoft": 45.0825931512206,
        "Alphabet": 51.355,
        "Amazon": 78.06140586260331,
        "Meta": 35.02621450391818,
        "Oracle": 21.076665784908958
      },
      "rawEstimates": {
        "Microsoft": {
          "value": 39.367,
          "cell": "C10"
        },
        "Alphabet": {
          "value": 51.355,
          "cell": "AL10"
        },
        "Amazon": {
          "value": 77.259,
          "cell": "AE10"
        },
        "Meta": {
          "value": 33.942,
          "cell": "AS10"
        },
        "Oracle": {
          "value": 25.83964513988427,
          "cell": "AZ10"
        }
      },
      "growth": 79.89707299355973,
      "capexScore": 73.0205401306551,
      "composite": 64.74564553292278,
      "supplyScore": 73.0205401306551
    },
    {
      "quarter": "2026Q4",
      "availableEstimate": null,
      "total": 246.007240571303,
      "companies": {
        "Microsoft": 53.00836370873135,
        "Alphabet": 68.96068421052632,
        "Amazon": 49.09667266824085,
        "Meta": 57.95872298094427,
        "Oracle": 16.9827970028602
      },
      "rawEstimates": {
        "Microsoft": {
          "value": 46.2879375,
          "cell": "C11"
        },
        "Alphabet": {
          "value": 68.96068421052632,
          "cell": "AL11"
        },
        "Amazon": {
          "value": 48.592,
          "cell": "AE11"
        },
        "Meta": {
          "value": 56.16464705882353,
          "cell": "AS11"
        },
        "Oracle": {
          "value": 20.82062943517388,
          "cell": "AZ11"
        }
      },
      "growth": 81.49234466131242,
      "capexScore": 77.7167055419299,
      "composite": 65.91968688574147,
      "supplyScore": 77.7167055419299
    },
    {
      "quarter": "2027Q1",
      "availableEstimate": null,
      "total": 266.21370039232613,
      "companies": {
        "Microsoft": 58.57204206468912,
        "Alphabet": 71.573,
        "Amazon": 68.21045402183043,
        "Meta": 50.20193492976583,
        "Oracle": 17.656269376040783
      },
      "rawEstimates": {
        "Microsoft": {
          "value": 51.14625,
          "cell": "C12"
        },
        "Alphabet": {
          "value": 71.573,
          "cell": "AL12"
        },
        "Amazon": {
          "value": 67.50930769230769,
          "cell": "AE12"
        },
        "Meta": {
          "value": 48.64796551724138,
          "cell": "AS12"
        },
        "Oracle": {
          "value": 21.64629547325103,
          "cell": "AZ12"
        }
      },
      "growth": 80.40996323702385,
      "capexScore": 74.53038793264709,
      "composite": 65.12310748342077,
      "supplyScore": 74.53038793264709
    },
    {
      "quarter": "2027Q2",
      "availableEstimate": null,
      "total": 294.1049218469045,
      "companies": {
        "Microsoft": 62.371165542427796,
        "Alphabet": 78.57967741935484,
        "Amazon": 77.76889913850354,
        "Meta": 56.11493361301816,
        "Oracle": 19.27024613360018
      },
      "rawEstimates": {
        "Microsoft": {
          "value": 54.46371875,
          "cell": "C13"
        },
        "Alphabet": {
          "value": 78.57967741935484,
          "cell": "AL13"
        },
        "Amazon": {
          "value": 76.9695,
          "cell": "AE13"
        },
        "Meta": {
          "value": 54.377931034482756,
          "cell": "AS13"
        },
        "Oracle": {
          "value": 23.625004397373964,
          "cell": "AZ13"
        }
      },
      "growth": 73.00207752320918,
      "capexScore": 52.72303225579167,
      "composite": 59.67126856420692,
      "supplyScore": 52.72303225579167
    },
    {
      "quarter": "2027Q3",
      "availableEstimate": null,
      "total": 312.464169808424,
      "companies": {
        "Microsoft": 62.04232258905461,
        "Alphabet": 85.04248387096774,
        "Amazon": 85.70775391547373,
        "Meta": 58.56439556571731,
        "Oracle": 21.10721386721061
      },
      "rawEstimates": {
        "Microsoft": {
          "value": 54.176566666666666,
          "cell": "C14"
        },
        "Alphabet": {
          "value": 85.04248387096774,
          "cell": "AL14"
        },
        "Amazon": {
          "value": 84.82675,
          "cell": "AE14"
        },
        "Meta": {
          "value": 56.751571428571424,
          "cell": "AS14"
        },
        "Oracle": {
          "value": 25.87709658568856,
          "cell": "AZ14"
        }
      },
      "growth": 58.00448022118794,
      "capexScore": 8.573061360113932,
      "composite": 48.633775840287484,
      "supplyScore": 8.573061360113932
    },
    {
      "quarter": "2027Q4",
      "availableEstimate": null,
      "total": 335.84586863951813,
      "companies": {
        "Microsoft": 64.79348267322123,
        "Alphabet": 94.26616129032259,
        "Amazon": 88.52252069344009,
        "Meta": 67.63064270297706,
        "Oracle": 20.633061279557193
      },
      "rawEstimates": {
        "Microsoft": {
          "value": 56.57893333333334,
          "cell": "C15"
        },
        "Alphabet": {
          "value": 94.26616129032259,
          "cell": "AL15"
        },
        "Amazon": {
          "value": 87.61258333333333,
          "cell": "AE15"
        },
        "Meta": {
          "value": 65.53717857142857,
          "cell": "AS15"
        },
        "Oracle": {
          "value": 25.295793322062554,
          "cell": "AZ15"
        }
      },
      "growth": 48.2830540895778,
      "capexScore": 0,
      "composite": 46.490510500259006,
      "supplyScore": 0
    }
  ],
  "months": [
    {
      "month": "2026-06",
      "value": 62.509306378863776,
      "capexScore": 64.0751835144191,
      "supplyScore": 64.0751835144191
    },
    {
      "month": "2026-07",
      "value": 60.98548795266121,
      "capexScore": 57.97990980960883,
      "supplyScore": 57.97990980960883
    },
    {
      "month": "2026-08",
      "value": 60.98548795266121,
      "capexScore": 57.97990980960883,
      "supplyScore": 57.97990980960883
    },
    {
      "month": "2026-09",
      "value": 60.98548795266121,
      "capexScore": 57.97990980960883,
      "supplyScore": 57.97990980960883
    },
    {
      "month": "2026-10",
      "value": 65.91968688574147,
      "capexScore": 77.7167055419299,
      "supplyScore": 77.7167055419299
    },
    {
      "month": "2026-11",
      "value": 65.91968688574147,
      "capexScore": 77.7167055419299,
      "supplyScore": 77.7167055419299
    },
    {
      "month": "2026-12",
      "value": 65.91968688574147,
      "capexScore": 77.7167055419299,
      "supplyScore": 77.7167055419299
    },
    {
      "month": "2027-01",
      "value": 65.12310748342077,
      "capexScore": 74.53038793264709,
      "supplyScore": 74.53038793264709
    },
    {
      "month": "2027-02",
      "value": 65.12310748342077,
      "capexScore": 74.53038793264709,
      "supplyScore": 74.53038793264709
    },
    {
      "month": "2027-03",
      "value": 65.12310748342077,
      "capexScore": 74.53038793264709,
      "supplyScore": 74.53038793264709
    },
    {
      "month": "2027-04",
      "value": 59.67126856420692,
      "capexScore": 52.72303225579167,
      "supplyScore": 52.72303225579167
    },
    {
      "month": "2027-05",
      "value": 59.67126856420692,
      "capexScore": 52.72303225579167,
      "supplyScore": 52.72303225579167
    },
    {
      "month": "2027-06",
      "value": 59.67126856420692,
      "capexScore": 52.72303225579167,
      "supplyScore": 52.72303225579167
    },
    {
      "month": "2027-07",
      "value": 48.633775840287484,
      "capexScore": 8.573061360113932,
      "supplyScore": 8.573061360113932
    },
    {
      "month": "2027-08",
      "value": 48.633775840287484,
      "capexScore": 8.573061360113932,
      "supplyScore": 8.573061360113932
    },
    {
      "month": "2027-09",
      "value": 48.633775840287484,
      "capexScore": 8.573061360113932,
      "supplyScore": 8.573061360113932
    },
    {
      "month": "2027-10",
      "value": 46.490510500259006,
      "capexScore": 0,
      "supplyScore": 0
    },
    {
      "month": "2027-11",
      "value": 46.490510500259006,
      "capexScore": 0,
      "supplyScore": 0
    },
    {
      "month": "2027-12",
      "value": 46.490510500259006,
      "capexScore": 0,
      "supplyScore": 0
    }
  ]
} as const;
