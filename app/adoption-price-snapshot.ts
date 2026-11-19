export const adoptionPriceSnapshot = {
  "metadata": {
    "workbook": "AI_Aoption.xlsx",
    "sheet": "Value",
    "ticker": "SDLLMTK Index",
    "workbookSha256": "3d95b8a5bc755456e31e0fa10b4df4320a087c86ca646d9c72d6c2d1d19ef2f2",
    "through": "2026-11-17",
    "unit": "USD per million tokens",
    "coreWeight": 0,
    "siliconMethod": "Saved daily Bloomberg px_last with fill=PREV. Carried dates are not independently verified fresh quotes. Monthly values are arithmetic calendar-day averages, not the old monthly sampled endpoints. Partial months excluded from completed-month comparisons.",
    "rampMethod": "Sum spending divided by sum tokens for identical model/week pairs with positive volume, multiplied by one million. Coverage is matched tokens / all published model tokens. No price shown below 95% coverage. Sample effective unit cost includes model mix, caching and commercial terms; not a pure repricing index.",
    "derivedListPriceStatus": "Deferred: historical dated model prices, input/output/cache weights and complete model mapping are not established. No synthetic history or assumed input/output ratio.",
    "version": "2.7",
    "scoringMethod": "OpenRouter blends catalog input and output rates by assumed token shares. Unresolved tokens use the same day\u2019s token-weighted catalog-matched rate. Each day uses the latest saved catalog available that day, with the first saved catalog used for earlier dates. Ramp effective price is matched spending divided by matched tokens.",
    "baseline": {
      "ramp": {
        "mean": 27.693169524987777,
        "std": 24.54727837814648,
        "count": 6,
        "start": "2026-01",
        "end": "2026-06",
        "provisional": true
      },
      "openrouter": {
        "mean": 42.861488744110744,
        "std": 18.745966255563285,
        "count": 6,
        "start": "2026-01",
        "end": "2026-06",
        "provisional": true
      }
    },
    "spendingCoreWeight": 0.1,
    "openrouterPricing": {
      "source": "https://openrouter.ai/api/v1/models",
      "outputShare": 0.2,
      "firstVintage": "2026-11-17",
      "latestVintage": "2026-11-17"
    },
    "spendingCorePillar": "Monetization"
  },
  "siliconDaily": [
    {
      "date": "2025-12-01",
      "value": 1.0867,
      "cell": "B1069"
    },
    {
      "date": "2025-12-02",
      "value": 1.0795,
      "cell": "B1070"
    },
    {
      "date": "2025-12-03",
      "value": 1.0153,
      "cell": "B1071"
    },
    {
      "date": "2025-12-04",
      "value": 1.0159,
      "cell": "B1072"
    },
    {
      "date": "2025-12-05",
      "value": 1.0263,
      "cell": "B1073"
    },
    {
      "date": "2025-12-06",
      "value": 1.0282,
      "cell": "B1074"
    },
    {
      "date": "2025-12-07",
      "value": 1.0392,
      "cell": "B1075"
    },
    {
      "date": "2025-12-08",
      "value": 1.042,
      "cell": "B1076"
    },
    {
      "date": "2025-12-09",
      "value": 1.0401,
      "cell": "B1077"
    },
    {
      "date": "2025-12-10",
      "value": 1.027,
      "cell": "B1078"
    },
    {
      "date": "2025-12-11",
      "value": 1.0534,
      "cell": "B1079"
    },
    {
      "date": "2025-12-12",
      "value": 1.0547,
      "cell": "B1080"
    },
    {
      "date": "2025-12-13",
      "value": 1.0654,
      "cell": "B1081"
    },
    {
      "date": "2025-12-14",
      "value": 1.0456,
      "cell": "B1082"
    },
    {
      "date": "2025-12-15",
      "value": 1.0459,
      "cell": "B1083"
    },
    {
      "date": "2025-12-16",
      "value": 1.0458,
      "cell": "B1084"
    },
    {
      "date": "2025-12-17",
      "value": 1.038,
      "cell": "B1085"
    },
    {
      "date": "2025-12-18",
      "value": 1.0344,
      "cell": "B1086"
    },
    {
      "date": "2025-12-19",
      "value": 1.1153,
      "cell": "B1087"
    },
    {
      "date": "2025-12-20",
      "value": 1.1067,
      "cell": "B1088"
    },
    {
      "date": "2025-12-21",
      "value": 1.1169,
      "cell": "B1089"
    },
    {
      "date": "2025-12-22",
      "value": 1.1121,
      "cell": "B1090"
    },
    {
      "date": "2025-12-23",
      "value": 1.1205,
      "cell": "B1091"
    },
    {
      "date": "2025-12-24",
      "value": 1.126,
      "cell": "B1092"
    },
    {
      "date": "2025-12-25",
      "value": 1.1674,
      "cell": "B1093"
    },
    {
      "date": "2025-12-26",
      "value": 1.1749,
      "cell": "B1094"
    },
    {
      "date": "2025-12-27",
      "value": 1.188,
      "cell": "B1095"
    },
    {
      "date": "2025-12-28",
      "value": 1.1955,
      "cell": "B1096"
    },
    {
      "date": "2025-12-29",
      "value": 1.2257,
      "cell": "B1097"
    },
    {
      "date": "2025-12-30",
      "value": 1.2384,
      "cell": "B1098"
    },
    {
      "date": "2025-12-31",
      "value": 1.2446,
      "cell": "B1099"
    },
    {
      "date": "2026-01-01",
      "value": 1.2393,
      "cell": "B1100"
    },
    {
      "date": "2026-01-02",
      "value": 1.2433,
      "cell": "B1101"
    },
    {
      "date": "2026-01-03",
      "value": 1.2521,
      "cell": "B1102"
    },
    {
      "date": "2026-01-04",
      "value": 1.2868,
      "cell": "B1103"
    },
    {
      "date": "2026-01-05",
      "value": 1.287,
      "cell": "B1104"
    },
    {
      "date": "2026-01-06",
      "value": 1.2894,
      "cell": "B1105"
    },
    {
      "date": "2026-01-07",
      "value": 1.3251,
      "cell": "B1106"
    },
    {
      "date": "2026-01-08",
      "value": 1.3714,
      "cell": "B1107"
    },
    {
      "date": "2026-01-09",
      "value": 1.4048,
      "cell": "B1108"
    },
    {
      "date": "2026-01-10",
      "value": 1.4153,
      "cell": "B1109"
    },
    {
      "date": "2026-01-11",
      "value": 1.4197,
      "cell": "B1110"
    },
    {
      "date": "2026-01-12",
      "value": 1.4324,
      "cell": "B1111"
    },
    {
      "date": "2026-01-13",
      "value": 1.4799,
      "cell": "B1112"
    },
    {
      "date": "2026-01-14",
      "value": 1.5155,
      "cell": "B1113"
    },
    {
      "date": "2026-01-15",
      "value": 1.625,
      "cell": "B1114"
    },
    {
      "date": "2026-01-16",
      "value": 1.6764,
      "cell": "B1115"
    },
    {
      "date": "2026-01-17",
      "value": 1.7079,
      "cell": "B1116"
    },
    {
      "date": "2026-01-18",
      "value": 1.6852,
      "cell": "B1117"
    },
    {
      "date": "2026-01-19",
      "value": 1.784,
      "cell": "B1118"
    },
    {
      "date": "2026-01-20",
      "value": 1.7871,
      "cell": "B1119"
    },
    {
      "date": "2026-01-21",
      "value": 1.7859,
      "cell": "B1120"
    },
    {
      "date": "2026-01-22",
      "value": 1.7585,
      "cell": "B1121"
    },
    {
      "date": "2026-01-23",
      "value": 1.7658,
      "cell": "B1122"
    },
    {
      "date": "2026-01-24",
      "value": 1.7601,
      "cell": "B1123"
    },
    {
      "date": "2026-01-25",
      "value": 1.7482,
      "cell": "B1124"
    },
    {
      "date": "2026-01-26",
      "value": 1.7413,
      "cell": "B1125"
    },
    {
      "date": "2026-01-27",
      "value": 1.7117,
      "cell": "B1126"
    },
    {
      "date": "2026-01-28",
      "value": 1.6771,
      "cell": "B1127"
    },
    {
      "date": "2026-01-29",
      "value": 1.6497,
      "cell": "B1128"
    },
    {
      "date": "2026-01-30",
      "value": 1.6078,
      "cell": "B1129"
    },
    {
      "date": "2026-01-31",
      "value": 1.5755,
      "cell": "B1130"
    },
    {
      "date": "2026-02-01",
      "value": 1.5623,
      "cell": "B1131"
    },
    {
      "date": "2026-02-02",
      "value": 1.5365,
      "cell": "B1132"
    },
    {
      "date": "2026-02-03",
      "value": 1.5114,
      "cell": "B1133"
    },
    {
      "date": "2026-02-04",
      "value": 1.4925,
      "cell": "B1134"
    },
    {
      "date": "2026-02-05",
      "value": 1.4817,
      "cell": "B1135"
    },
    {
      "date": "2026-02-06",
      "value": 1.4705,
      "cell": "B1136"
    },
    {
      "date": "2026-02-07",
      "value": 1.4381,
      "cell": "B1137"
    },
    {
      "date": "2026-02-08",
      "value": 1.4335,
      "cell": "B1138"
    },
    {
      "date": "2026-02-09",
      "value": 1.4253,
      "cell": "B1139"
    },
    {
      "date": "2026-02-10",
      "value": 1.4232,
      "cell": "B1140"
    },
    {
      "date": "2026-02-11",
      "value": 1.4238,
      "cell": "B1141"
    },
    {
      "date": "2026-02-12",
      "value": 1.4218,
      "cell": "B1142"
    },
    {
      "date": "2026-02-13",
      "value": 1.4362,
      "cell": "B1143"
    },
    {
      "date": "2026-02-14",
      "value": 1.4035,
      "cell": "B1144"
    },
    {
      "date": "2026-02-15",
      "value": 1.3644,
      "cell": "B1145"
    },
    {
      "date": "2026-02-16",
      "value": 1.3326,
      "cell": "B1146"
    },
    {
      "date": "2026-02-17",
      "value": 1.3016,
      "cell": "B1147"
    },
    {
      "date": "2026-02-18",
      "value": 1.2785,
      "cell": "B1148"
    },
    {
      "date": "2026-02-19",
      "value": 1.273,
      "cell": "B1149"
    },
    {
      "date": "2026-02-20",
      "value": 1.2725,
      "cell": "B1150"
    },
    {
      "date": "2026-02-21",
      "value": 1.2677,
      "cell": "B1151"
    },
    {
      "date": "2026-02-22",
      "value": 1.2804,
      "cell": "B1152"
    },
    {
      "date": "2026-02-23",
      "value": 1.2791,
      "cell": "B1153"
    },
    {
      "date": "2026-02-24",
      "value": 1.2955,
      "cell": "B1154"
    },
    {
      "date": "2026-02-25",
      "value": 1.2805,
      "cell": "B1155"
    },
    {
      "date": "2026-02-26",
      "value": 1.2736,
      "cell": "B1156"
    },
    {
      "date": "2026-02-27",
      "value": 1.2647,
      "cell": "B1157"
    },
    {
      "date": "2026-02-28",
      "value": 1.2813,
      "cell": "B1158"
    },
    {
      "date": "2026-03-01",
      "value": 1.3214,
      "cell": "B1159"
    },
    {
      "date": "2026-03-02",
      "value": 1.3545,
      "cell": "B1160"
    },
    {
      "date": "2026-03-03",
      "value": 1.3742,
      "cell": "B1161"
    },
    {
      "date": "2026-03-04",
      "value": 1.3959,
      "cell": "B1162"
    },
    {
      "date": "2026-03-05",
      "value": 1.3988,
      "cell": "B1163"
    },
    {
      "date": "2026-03-06",
      "value": 1.4309,
      "cell": "B1164"
    },
    {
      "date": "2026-03-07",
      "value": 1.453,
      "cell": "B1165"
    },
    {
      "date": "2026-03-08",
      "value": 1.4549,
      "cell": "B1166"
    },
    {
      "date": "2026-03-09",
      "value": 1.4765,
      "cell": "B1167"
    },
    {
      "date": "2026-03-10",
      "value": 1.4853,
      "cell": "B1168"
    },
    {
      "date": "2026-03-11",
      "value": 1.4859,
      "cell": "B1169"
    },
    {
      "date": "2026-03-12",
      "value": 1.4978,
      "cell": "B1170"
    },
    {
      "date": "2026-03-13",
      "value": 1.4641,
      "cell": "B1171"
    },
    {
      "date": "2026-03-14",
      "value": 1.4955,
      "cell": "B1172"
    },
    {
      "date": "2026-03-15",
      "value": 1.4871,
      "cell": "B1173"
    },
    {
      "date": "2026-03-16",
      "value": 1.51,
      "cell": "B1174"
    },
    {
      "date": "2026-03-17",
      "value": 1.5113,
      "cell": "B1175"
    },
    {
      "date": "2026-03-18",
      "value": 1.5057,
      "cell": "B1176"
    },
    {
      "date": "2026-03-19",
      "value": 1.5247,
      "cell": "B1177"
    },
    {
      "date": "2026-03-20",
      "value": 1.5316,
      "cell": "B1178"
    },
    {
      "date": "2026-03-21",
      "value": 1.526,
      "cell": "B1179"
    },
    {
      "date": "2026-03-22",
      "value": 1.5478,
      "cell": "B1180"
    },
    {
      "date": "2026-03-23",
      "value": 1.5426,
      "cell": "B1181"
    },
    {
      "date": "2026-03-24",
      "value": 1.549,
      "cell": "B1182"
    },
    {
      "date": "2026-03-25",
      "value": 1.5341,
      "cell": "B1183"
    },
    {
      "date": "2026-03-26",
      "value": 1.5407,
      "cell": "B1184"
    },
    {
      "date": "2026-03-27",
      "value": 1.5302,
      "cell": "B1185"
    },
    {
      "date": "2026-03-28",
      "value": 1.5282,
      "cell": "B1186"
    },
    {
      "date": "2026-03-29",
      "value": 1.5752,
      "cell": "B1187"
    },
    {
      "date": "2026-03-30",
      "value": 1.5584,
      "cell": "B1188"
    },
    {
      "date": "2026-03-31",
      "value": 1.537,
      "cell": "B1189"
    },
    {
      "date": "2026-04-01",
      "value": 1.5449,
      "cell": "B1190"
    },
    {
      "date": "2026-04-02",
      "value": 1.5658,
      "cell": "B1191"
    },
    {
      "date": "2026-04-03",
      "value": 1.5495,
      "cell": "B1192"
    },
    {
      "date": "2026-04-04",
      "value": 1.5812,
      "cell": "B1193"
    },
    {
      "date": "2026-04-05",
      "value": 1.5432,
      "cell": "B1194"
    },
    {
      "date": "2026-04-06",
      "value": 1.5472,
      "cell": "B1195"
    },
    {
      "date": "2026-04-07",
      "value": 1.5168,
      "cell": "B1196"
    },
    {
      "date": "2026-04-08",
      "value": 1.555,
      "cell": "B1197"
    },
    {
      "date": "2026-04-09",
      "value": 1.5425,
      "cell": "B1198"
    },
    {
      "date": "2026-04-10",
      "value": 1.5473,
      "cell": "B1199"
    },
    {
      "date": "2026-04-11",
      "value": 1.5505,
      "cell": "B1200"
    },
    {
      "date": "2026-04-12",
      "value": 1.5652,
      "cell": "B1201"
    },
    {
      "date": "2026-04-13",
      "value": 1.5902,
      "cell": "B1202"
    },
    {
      "date": "2026-04-14",
      "value": 1.6609,
      "cell": "B1203"
    },
    {
      "date": "2026-04-15",
      "value": 1.6507,
      "cell": "B1204"
    },
    {
      "date": "2026-04-16",
      "value": 1.7005,
      "cell": "B1205"
    },
    {
      "date": "2026-04-17",
      "value": 1.7051,
      "cell": "B1206"
    },
    {
      "date": "2026-04-18",
      "value": 1.7427,
      "cell": "B1207"
    },
    {
      "date": "2026-04-19",
      "value": 1.7608,
      "cell": "B1208"
    },
    {
      "date": "2026-04-20",
      "value": 1.7498,
      "cell": "B1209"
    },
    {
      "date": "2026-04-21",
      "value": 1.8018,
      "cell": "B1210"
    },
    {
      "date": "2026-04-22",
      "value": 1.8083,
      "cell": "B1211"
    },
    {
      "date": "2026-04-23",
      "value": 1.8243,
      "cell": "B1212"
    },
    {
      "date": "2026-04-24",
      "value": 1.8413,
      "cell": "B1213"
    },
    {
      "date": "2026-04-25",
      "value": 1.8645,
      "cell": "B1214"
    },
    {
      "date": "2026-04-26",
      "value": 1.8763,
      "cell": "B1215"
    },
    {
      "date": "2026-04-27",
      "value": 1.8069,
      "cell": "B1216"
    },
    {
      "date": "2026-04-28",
      "value": 1.8261,
      "cell": "B1217"
    },
    {
      "date": "2026-04-29",
      "value": 1.7696,
      "cell": "B1218"
    },
    {
      "date": "2026-04-30",
      "value": 1.7557,
      "cell": "B1219"
    },
    {
      "date": "2026-05-01",
      "value": 1.8479,
      "cell": "B1220"
    },
    {
      "date": "2026-05-02",
      "value": 1.8363,
      "cell": "B1221"
    },
    {
      "date": "2026-05-03",
      "value": 1.8499,
      "cell": "B1222"
    },
    {
      "date": "2026-05-04",
      "value": 1.7715,
      "cell": "B1223"
    },
    {
      "date": "2026-05-05",
      "value": 1.7689,
      "cell": "B1224"
    },
    {
      "date": "2026-05-06",
      "value": 1.7445,
      "cell": "B1225"
    },
    {
      "date": "2026-05-07",
      "value": 1.7617,
      "cell": "B1226"
    },
    {
      "date": "2026-05-08",
      "value": 1.8433,
      "cell": "B1227"
    },
    {
      "date": "2026-05-09",
      "value": 1.8923,
      "cell": "B1228"
    },
    {
      "date": "2026-05-10",
      "value": 1.9651,
      "cell": "B1229"
    },
    {
      "date": "2026-05-11",
      "value": 1.9735,
      "cell": "B1230"
    },
    {
      "date": "2026-05-12",
      "value": 1.9695,
      "cell": "B1231"
    },
    {
      "date": "2026-05-13",
      "value": 1.9315,
      "cell": "B1232"
    },
    {
      "date": "2026-05-14",
      "value": 1.934,
      "cell": "B1233"
    },
    {
      "date": "2026-05-15",
      "value": 1.9824,
      "cell": "B1234"
    },
    {
      "date": "2026-05-16",
      "value": 1.9955,
      "cell": "B1235"
    },
    {
      "date": "2026-05-17",
      "value": 1.9863,
      "cell": "B1236"
    },
    {
      "date": "2026-05-18",
      "value": 1.9782,
      "cell": "B1237"
    },
    {
      "date": "2026-05-19",
      "value": 1.9784,
      "cell": "B1238"
    },
    {
      "date": "2026-05-20",
      "value": 1.978,
      "cell": "B1239"
    },
    {
      "date": "2026-05-21",
      "value": 1.9789,
      "cell": "B1240"
    },
    {
      "date": "2026-05-22",
      "value": 2.0038,
      "cell": "B1241"
    },
    {
      "date": "2026-05-23",
      "value": 2.0342,
      "cell": "B1242"
    },
    {
      "date": "2026-05-24",
      "value": 2.0247,
      "cell": "B1243"
    },
    {
      "date": "2026-05-25",
      "value": 2.0105,
      "cell": "B1244"
    },
    {
      "date": "2026-05-26",
      "value": 2.0092,
      "cell": "B1245"
    },
    {
      "date": "2026-05-27",
      "value": 2.0469,
      "cell": "B1246"
    },
    {
      "date": "2026-05-28",
      "value": 2.0651,
      "cell": "B1247"
    },
    {
      "date": "2026-05-29",
      "value": 2.0604,
      "cell": "B1248"
    },
    {
      "date": "2026-05-30",
      "value": 2.0447,
      "cell": "B1249"
    },
    {
      "date": "2026-05-31",
      "value": 2.0371,
      "cell": "B1250"
    },
    {
      "date": "2026-06-01",
      "value": 2.0348,
      "cell": "B1251"
    },
    {
      "date": "2026-06-02",
      "value": 2.0409,
      "cell": "B1252"
    },
    {
      "date": "2026-06-03",
      "value": 2.0246,
      "cell": "B1253"
    },
    {
      "date": "2026-06-04",
      "value": 1.9942,
      "cell": "B1254"
    },
    {
      "date": "2026-06-05",
      "value": 1.9612,
      "cell": "B1255"
    },
    {
      "date": "2026-06-06",
      "value": 1.9246,
      "cell": "B1256"
    },
    {
      "date": "2026-06-07",
      "value": 1.8755,
      "cell": "B1257"
    },
    {
      "date": "2026-06-08",
      "value": 1.8492,
      "cell": "B1258"
    },
    {
      "date": "2026-06-09",
      "value": 1.8043,
      "cell": "B1259"
    },
    {
      "date": "2026-06-10",
      "value": 1.7533,
      "cell": "B1260"
    },
    {
      "date": "2026-06-11",
      "value": 1.7527,
      "cell": "B1261"
    },
    {
      "date": "2026-06-12",
      "value": 1.7767,
      "cell": "B1262"
    },
    {
      "date": "2026-06-13",
      "value": 1.7112,
      "cell": "B1263"
    },
    {
      "date": "2026-06-14",
      "value": 1.6687,
      "cell": "B1264"
    },
    {
      "date": "2026-06-15",
      "value": 1.6503,
      "cell": "B1265"
    },
    {
      "date": "2026-06-16",
      "value": 1.6434,
      "cell": "B1266"
    },
    {
      "date": "2026-06-17",
      "value": 1.6502,
      "cell": "B1267"
    },
    {
      "date": "2026-06-18",
      "value": 1.6648,
      "cell": "B1268"
    },
    {
      "date": "2026-06-19",
      "value": 1.6804,
      "cell": "B1269"
    },
    {
      "date": "2026-06-20",
      "value": 1.6876,
      "cell": "B1270"
    },
    {
      "date": "2026-06-21",
      "value": 1.6854,
      "cell": "B1271"
    },
    {
      "date": "2026-06-22",
      "value": 1.6756,
      "cell": "B1272"
    },
    {
      "date": "2026-06-23",
      "value": 1.6837,
      "cell": "B1273"
    },
    {
      "date": "2026-06-24",
      "value": 1.6988,
      "cell": "B1274"
    },
    {
      "date": "2026-06-25",
      "value": 1.7209,
      "cell": "B1275"
    },
    {
      "date": "2026-06-26",
      "value": 1.724,
      "cell": "B1276"
    },
    {
      "date": "2026-06-27",
      "value": 1.7392,
      "cell": "B1277"
    },
    {
      "date": "2026-06-28",
      "value": 1.6915,
      "cell": "B1278"
    },
    {
      "date": "2026-06-29",
      "value": 1.7132,
      "cell": "B1279"
    },
    {
      "date": "2026-06-30",
      "value": 1.7095,
      "cell": "B1280"
    },
    {
      "date": "2026-07-01",
      "value": 1.664,
      "cell": "B1281"
    },
    {
      "date": "2026-07-02",
      "value": 1.6245,
      "cell": "B1282"
    },
    {
      "date": "2026-07-03",
      "value": 1.6166,
      "cell": "B1283"
    },
    {
      "date": "2026-07-04",
      "value": 1.6166,
      "cell": "B1284"
    },
    {
      "date": "2026-07-05",
      "value": 1.6251,
      "cell": "B1285"
    },
    {
      "date": "2026-07-06",
      "value": 1.6368,
      "cell": "B1286"
    },
    {
      "date": "2026-07-07",
      "value": 1.6431,
      "cell": "B1287"
    },
    {
      "date": "2026-07-08",
      "value": 1.6417,
      "cell": "B1288"
    },
    {
      "date": "2026-07-09",
      "value": 1.6417,
      "cell": "B1289"
    },
    {
      "date": "2026-07-10",
      "value": 1.6312,
      "cell": "B1290"
    },
    {
      "date": "2026-07-11",
      "value": 1.6265,
      "cell": "B1291"
    },
    {
      "date": "2026-07-12",
      "value": 1.6072,
      "cell": "B1292"
    },
    {
      "date": "2026-07-13",
      "value": 1.5866,
      "cell": "B1293"
    },
    {
      "date": "2026-07-14",
      "value": 1.5789,
      "cell": "B1294"
    },
    {
      "date": "2026-07-15",
      "value": 1.5726,
      "cell": "B1295"
    },
    {
      "date": "2026-07-16",
      "value": 1.5747,
      "cell": "B1296"
    },
    {
      "date": "2026-07-17",
      "value": 1.5747,
      "cell": "B1297"
    },
    {
      "date": "2026-07-18",
      "value": 1.594,
      "cell": "B1298"
    },
    {
      "date": "2026-07-19",
      "value": 1.5848,
      "cell": "B1299"
    },
    {
      "date": "2026-07-20",
      "value": 1.5578,
      "cell": "B1300"
    },
    {
      "date": "2026-07-21",
      "value": 1.5489,
      "cell": "B1301"
    },
    {
      "date": "2026-07-22",
      "value": 1.5393,
      "cell": "B1302"
    },
    {
      "date": "2026-07-23",
      "value": 1.5175,
      "cell": "B1303"
    },
    {
      "date": "2026-07-24",
      "value": 1.4658,
      "cell": "B1304"
    },
    {
      "date": "2026-07-25",
      "value": 1.4685,
      "cell": "B1305"
    },
    {
      "date": "2026-07-26",
      "value": 1.452,
      "cell": "B1306"
    },
    {
      "date": "2026-07-27",
      "value": 1.4288,
      "cell": "B1307"
    },
    {
      "date": "2026-07-28",
      "value": 1.3939,
      "cell": "B1308"
    },
    {
      "date": "2026-07-29",
      "value": 1.3916,
      "cell": "B1309"
    },
    {
      "date": "2026-07-30",
      "value": 1.395,
      "cell": "B1310"
    },
    {
      "date": "2026-07-31",
      "value": 1.3572,
      "cell": "B1311"
    },
    {
      "date": "2026-08-01",
      "value": 1.3394,
      "cell": "B1312"
    },
    {
      "date": "2026-08-02",
      "value": 1.3136,
      "cell": "B1313"
    },
    {
      "date": "2026-08-03",
      "value": 1.2901,
      "cell": "B1314"
    },
    {
      "date": "2026-08-04",
      "value": 1.2723,
      "cell": "B1315"
    },
    {
      "date": "2026-08-05",
      "value": 1.1997,
      "cell": "B1316"
    },
    {
      "date": "2026-08-06",
      "value": 1.1771,
      "cell": "B1317"
    },
    {
      "date": "2026-08-07",
      "value": 1.1692,
      "cell": "B1318"
    },
    {
      "date": "2026-08-08",
      "value": 1.1635,
      "cell": "B1319"
    },
    {
      "date": "2026-08-09",
      "value": 1.1269,
      "cell": "B1320"
    },
    {
      "date": "2026-08-10",
      "value": 1.124,
      "cell": "B1321"
    },
    {
      "date": "2026-08-11",
      "value": 1.0991,
      "cell": "B1322"
    },
    {
      "date": "2026-08-12",
      "value": 1.0775,
      "cell": "B1323"
    },
    {
      "date": "2026-08-13",
      "value": 1.0516,
      "cell": "B1324"
    },
    {
      "date": "2026-08-14",
      "value": 1.0293,
      "cell": "B1325"
    },
    {
      "date": "2026-08-15",
      "value": 1.0189,
      "cell": "B1326"
    },
    {
      "date": "2026-08-16",
      "value": 1.0217,
      "cell": "B1327"
    },
    {
      "date": "2026-08-17",
      "value": 1.0481,
      "cell": "B1328"
    },
    {
      "date": "2026-08-18",
      "value": 1.0575,
      "cell": "B1329"
    },
    {
      "date": "2026-08-19",
      "value": 1.0828,
      "cell": "B1330"
    },
    {
      "date": "2026-08-20",
      "value": 1.0564,
      "cell": "B1331"
    },
    {
      "date": "2026-08-21",
      "value": 1.0602,
      "cell": "B1332"
    },
    {
      "date": "2026-08-22",
      "value": 1.0446,
      "cell": "B1333"
    },
    {
      "date": "2026-08-23",
      "value": 1.0501,
      "cell": "B1334"
    },
    {
      "date": "2026-08-24",
      "value": 1.0524,
      "cell": "B1335"
    },
    {
      "date": "2026-08-25",
      "value": 1.0569,
      "cell": "B1336"
    },
    {
      "date": "2026-08-26",
      "value": 1.0748,
      "cell": "B1337"
    },
    {
      "date": "2026-08-27",
      "value": 1.058,
      "cell": "B1338"
    },
    {
      "date": "2026-08-28",
      "value": 1.0586,
      "cell": "B1339"
    },
    {
      "date": "2026-08-29",
      "value": 1.0296,
      "cell": "B1340"
    },
    {
      "date": "2026-08-30",
      "value": 1.0018,
      "cell": "B1341"
    },
    {
      "date": "2026-08-31",
      "value": 0.9665,
      "cell": "B1342"
    },
    {
      "date": "2026-09-01",
      "value": 0.9673,
      "cell": "B1343"
    },
    {
      "date": "2026-09-02",
      "value": 0.9778,
      "cell": "B1344"
    },
    {
      "date": "2026-09-03",
      "value": 0.9735,
      "cell": "B1345"
    },
    {
      "date": "2026-09-04",
      "value": 0.9735,
      "cell": "B1346"
    },
    {
      "date": "2026-09-05",
      "value": 0.9861,
      "cell": "B1347"
    },
    {
      "date": "2026-09-06",
      "value": 0.9911,
      "cell": "B1348"
    },
    {
      "date": "2026-09-07",
      "value": 0.9805,
      "cell": "B1349"
    },
    {
      "date": "2026-09-08",
      "value": 0.973,
      "cell": "B1350"
    },
    {
      "date": "2026-09-09",
      "value": 0.9745,
      "cell": "B1351"
    },
    {
      "date": "2026-09-10",
      "value": 0.9754,
      "cell": "B1352"
    },
    {
      "date": "2026-09-11",
      "value": 0.9754,
      "cell": "B1353"
    },
    {
      "date": "2026-09-12",
      "value": 0.976,
      "cell": "B1354"
    },
    {
      "date": "2026-09-13",
      "value": 0.9682,
      "cell": "B1355"
    },
    {
      "date": "2026-09-14",
      "value": 0.9543,
      "cell": "B1356"
    },
    {
      "date": "2026-09-15",
      "value": 0.9527,
      "cell": "B1357"
    },
    {
      "date": "2026-09-16",
      "value": 0.9485,
      "cell": "B1358"
    },
    {
      "date": "2026-09-17",
      "value": 0.9551,
      "cell": "B1359"
    },
    {
      "date": "2026-09-18",
      "value": 1.0093,
      "cell": "B1360"
    },
    {
      "date": "2026-09-19",
      "value": 1.0088,
      "cell": "B1361"
    },
    {
      "date": "2026-09-20",
      "value": 0.9979,
      "cell": "B1362"
    },
    {
      "date": "2026-09-21",
      "value": 0.9959,
      "cell": "B1363"
    },
    {
      "date": "2026-09-22",
      "value": 0.9649,
      "cell": "B1364"
    },
    {
      "date": "2026-09-23",
      "value": 0.9582,
      "cell": "B1365"
    },
    {
      "date": "2026-09-24",
      "value": 0.9615,
      "cell": "B1366"
    },
    {
      "date": "2026-09-25",
      "value": 0.9732,
      "cell": "B1367"
    },
    {
      "date": "2026-09-26",
      "value": 0.9938,
      "cell": "B1368"
    },
    {
      "date": "2026-09-27",
      "value": 0.9961,
      "cell": "B1369"
    },
    {
      "date": "2026-09-28",
      "value": 1.0047,
      "cell": "B1370"
    },
    {
      "date": "2026-09-29",
      "value": 1.0063,
      "cell": "B1371"
    },
    {
      "date": "2026-09-30",
      "value": 0.9824,
      "cell": "B1372"
    },
    {
      "date": "2026-10-01",
      "value": 0.9683,
      "cell": "B1373"
    },
    {
      "date": "2026-10-02",
      "value": 0.9374,
      "cell": "B1374"
    },
    {
      "date": "2026-10-03",
      "value": 0.9536,
      "cell": "B1375"
    },
    {
      "date": "2026-10-04",
      "value": 0.9554,
      "cell": "B1376"
    },
    {
      "date": "2026-10-05",
      "value": 0.9762,
      "cell": "B1377"
    },
    {
      "date": "2026-10-06",
      "value": 0.9853,
      "cell": "B1378"
    },
    {
      "date": "2026-10-07",
      "value": 0.9931,
      "cell": "B1379"
    },
    {
      "date": "2026-10-08",
      "value": 0.9831,
      "cell": "B1380"
    },
    {
      "date": "2026-10-09",
      "value": 0.9792,
      "cell": "B1381"
    },
    {
      "date": "2026-10-10",
      "value": 0.9721,
      "cell": "B1382"
    },
    {
      "date": "2026-10-11",
      "value": 0.9726,
      "cell": "B1383"
    },
    {
      "date": "2026-10-12",
      "value": 0.9742,
      "cell": "B1384"
    },
    {
      "date": "2026-10-13",
      "value": 0.9706,
      "cell": "B1385"
    },
    {
      "date": "2026-10-14",
      "value": 0.9747,
      "cell": "B1386"
    },
    {
      "date": "2026-10-15",
      "value": 0.9752,
      "cell": "B1387"
    },
    {
      "date": "2026-10-16",
      "value": 0.9588,
      "cell": "B1388"
    },
    {
      "date": "2026-10-17",
      "value": 0.9419,
      "cell": "B1389"
    },
    {
      "date": "2026-10-18",
      "value": 0.9432,
      "cell": "B1390"
    },
    {
      "date": "2026-10-19",
      "value": 0.9523,
      "cell": "B1391"
    },
    {
      "date": "2026-10-20",
      "value": 0.9552,
      "cell": "B1392"
    },
    {
      "date": "2026-10-21",
      "value": 0.9552,
      "cell": "B1393"
    },
    {
      "date": "2026-10-22",
      "value": 0.948,
      "cell": "B1394"
    },
    {
      "date": "2026-10-23",
      "value": 0.9348,
      "cell": "B1395"
    },
    {
      "date": "2026-10-24",
      "value": 0.9364,
      "cell": "B1396"
    },
    {
      "date": "2026-10-25",
      "value": 0.9526,
      "cell": "B1397"
    },
    {
      "date": "2026-10-26",
      "value": 0.9236,
      "cell": "B1398"
    },
    {
      "date": "2026-10-27",
      "value": 0.9226,
      "cell": "B1399"
    },
    {
      "date": "2026-10-28",
      "value": 0.9141,
      "cell": "B1400"
    },
    {
      "date": "2026-10-29",
      "value": 0.906,
      "cell": "B1401"
    },
    {
      "date": "2026-10-30",
      "value": 0.8946,
      "cell": "B1402"
    },
    {
      "date": "2026-10-31",
      "value": 0.8856,
      "cell": "B1403"
    },
    {
      "date": "2026-11-01",
      "value": 0.8875,
      "cell": "B1404"
    },
    {
      "date": "2026-11-02",
      "value": 0.8847,
      "cell": "B1405"
    },
    {
      "date": "2026-11-03",
      "value": 0.8733,
      "cell": "B1406"
    },
    {
      "date": "2026-11-04",
      "value": 0.8618,
      "cell": "B1407"
    },
    {
      "date": "2026-11-05",
      "value": 0.8618,
      "cell": "B1408"
    },
    {
      "date": "2026-11-06",
      "value": 0.8476,
      "cell": "B1409"
    },
    {
      "date": "2026-11-07",
      "value": 0.8338,
      "cell": "B1410"
    },
    {
      "date": "2026-11-08",
      "value": 0.8252,
      "cell": "B1411"
    },
    {
      "date": "2026-11-09",
      "value": 0.8209,
      "cell": "B1412"
    },
    {
      "date": "2026-11-10",
      "value": 0.8132,
      "cell": "B1413"
    },
    {
      "date": "2026-11-11",
      "value": 0.8164,
      "cell": "B1414"
    },
    {
      "date": "2026-11-12",
      "value": 0.8059,
      "cell": "B1415"
    },
    {
      "date": "2026-11-13",
      "value": 0.8052,
      "cell": "B1416"
    },
    {
      "date": "2026-11-14",
      "value": 0.7938,
      "cell": "B1417"
    },
    {
      "date": "2026-11-15",
      "value": 0.8028,
      "cell": "B1418"
    },
    {
      "date": "2026-11-16",
      "value": 0.8028,
      "cell": "B1419"
    },
    {
      "date": "2026-11-17",
      "value": 0.8028,
      "cell": "B1420"
    }
  ],
  "siliconMonthly": [
    {
      "month": "2025-12",
      "value": 1.0940451612903226,
      "days": 31,
      "expectedDays": 31,
      "complete": true,
      "endValue": 1.2446
    },
    {
      "month": "2026-01",
      "value": 1.548683870967742,
      "days": 31,
      "expectedDays": 31,
      "complete": true,
      "endValue": 1.5755
    },
    {
      "month": "2026-02",
      "value": 1.3752035714285713,
      "days": 28,
      "expectedDays": 28,
      "complete": true,
      "endValue": 1.2813
    },
    {
      "month": "2026-03",
      "value": 1.488009677419355,
      "days": 31,
      "expectedDays": 31,
      "complete": true,
      "endValue": 1.537
    },
    {
      "month": "2026-04",
      "value": 1.6781533333333334,
      "days": 30,
      "expectedDays": 30,
      "complete": true,
      "endValue": 1.7557
    },
    {
      "month": "2026-05",
      "value": 1.9452967741935485,
      "days": 31,
      "expectedDays": 31,
      "complete": true,
      "endValue": 2.0371
    },
    {
      "month": "2026-06",
      "value": 1.7730133333333336,
      "days": 30,
      "expectedDays": 30,
      "complete": true,
      "endValue": 1.7095
    },
    {
      "month": "2026-07",
      "value": 1.5534709677419356,
      "days": 31,
      "expectedDays": 31,
      "complete": true,
      "endValue": 1.3572
    },
    {
      "month": "2026-08",
      "value": 1.1023290322580646,
      "days": 31,
      "expectedDays": 31,
      "complete": true,
      "endValue": 0.9665
    },
    {
      "month": "2026-09",
      "value": 0.9785299999999999,
      "days": 30,
      "expectedDays": 30,
      "complete": true,
      "endValue": 0.9824
    },
    {
      "month": "2026-10",
      "value": 0.9514806451612903,
      "days": 31,
      "expectedDays": 31,
      "complete": true,
      "endValue": 0.8856
    },
    {
      "month": "2026-11",
      "value": 0.831735294117647,
      "days": 17,
      "expectedDays": 30,
      "complete": false,
      "endValue": 0.8028
    }
  ],
  "rampWeekly": [
    {
      "end": "2025-01-12",
      "value": 3338577.3085129666,
      "coverage": 0.9696650325370325,
      "matchedModels": 16,
      "totalModels": 21,
      "spendUsd": 5.294420318288201,
      "tokens": 1.5858312775289258
    },
    {
      "end": "2025-01-19",
      "value": 3536159.8124182867,
      "coverage": 0.9703782727013968,
      "matchedModels": 16,
      "totalModels": 21,
      "spendUsd": 5.783129236268923,
      "tokens": 1.6354264351853467
    },
    {
      "end": "2025-01-26",
      "value": 4382970.677602199,
      "coverage": 0.9695948091158189,
      "matchedModels": 16,
      "totalModels": 23,
      "spendUsd": 6.9064833744971725,
      "tokens": 1.5757539537717185
    },
    {
      "end": "2025-02-02",
      "value": 4149248.3823827044,
      "coverage": 0.9757292693295366,
      "matchedModels": 18,
      "totalModels": 24,
      "spendUsd": 7.306035717577292,
      "tokens": 1.7608094392704936
    },
    {
      "end": "2025-02-09",
      "value": 3562273.9865379706,
      "coverage": 0.9861190130959492,
      "matchedModels": 19,
      "totalModels": 22,
      "spendUsd": 6.854295340398323,
      "tokens": 1.9241347988114004
    },
    {
      "end": "2025-02-16",
      "value": 3364302.4777998324,
      "coverage": 0.9873084406983748,
      "matchedModels": 18,
      "totalModels": 22,
      "spendUsd": 7.485970794970939,
      "tokens": 2.2251182360590156
    },
    {
      "end": "2025-02-23",
      "value": 3866127.172020329,
      "coverage": 0.9873272624720499,
      "matchedModels": 19,
      "totalModels": 24,
      "spendUsd": 8.669237694401277,
      "tokens": 2.2423570950127276
    },
    {
      "end": "2025-03-02",
      "value": 3388899.6163097396,
      "coverage": 0.9898743167292012,
      "matchedModels": 20,
      "totalModels": 25,
      "spendUsd": 9.734530942794565,
      "tokens": 2.87247544776636
    },
    {
      "end": "2025-03-09",
      "value": 4015253.8510314953,
      "coverage": 0.9881879111392701,
      "matchedModels": 20,
      "totalModels": 24,
      "spendUsd": 10.333567169321302,
      "tokens": 2.573577550188183
    },
    {
      "end": "2025-03-16",
      "value": 3833949.759418728,
      "coverage": 0.9855756789096318,
      "matchedModels": 22,
      "totalModels": 27,
      "spendUsd": 9.724646240872831,
      "tokens": 2.536456357306884
    },
    {
      "end": "2025-03-23",
      "value": 4381761.944380987,
      "coverage": 0.9852413577259306,
      "matchedModels": 24,
      "totalModels": 30,
      "spendUsd": 11.289708187756377,
      "tokens": 2.576522488227342
    },
    {
      "end": "2025-03-30",
      "value": 4704868.5862032715,
      "coverage": 0.9859642904699006,
      "matchedModels": 24,
      "totalModels": 28,
      "spendUsd": 12.016389095696832,
      "tokens": 2.5540328864729887
    },
    {
      "end": "2025-04-06",
      "value": 4476949.20399326,
      "coverage": 0.9900790142223326,
      "matchedModels": 25,
      "totalModels": 30,
      "spendUsd": 12.744478013499863,
      "tokens": 2.846688097808279
    },
    {
      "end": "2025-04-13",
      "value": 4682328.571984938,
      "coverage": 0.98860823059887,
      "matchedModels": 25,
      "totalModels": 28,
      "spendUsd": 12.23957330533593,
      "tokens": 2.613992827963228
    },
    {
      "end": "2025-04-20",
      "value": 4612610.217275173,
      "coverage": 0.9867744972853003,
      "matchedModels": 30,
      "totalModels": 35,
      "spendUsd": 11.733366048882715,
      "tokens": 2.5437584136068656
    },
    {
      "end": "2025-04-27",
      "value": 4278991.764407933,
      "coverage": 0.9896772553758383,
      "matchedModels": 30,
      "totalModels": 34,
      "spendUsd": 14.382331546131454,
      "tokens": 3.3611496207498495
    },
    {
      "end": "2025-05-04",
      "value": 4329812.182689325,
      "coverage": 0.9893522527620756,
      "matchedModels": 30,
      "totalModels": 34,
      "spendUsd": 14.078878020555369,
      "tokens": 3.25161402539422
    },
    {
      "end": "2025-05-11",
      "value": 4116684.1950723575,
      "coverage": 0.9894916146197441,
      "matchedModels": 29,
      "totalModels": 33,
      "spendUsd": 13.980906162746674,
      "tokens": 3.396157076970277
    },
    {
      "end": "2025-05-18",
      "value": 4086923.872738814,
      "coverage": 0.9886828578466944,
      "matchedModels": 31,
      "totalModels": 37,
      "spendUsd": 14.742161063779454,
      "tokens": 3.6071533316572717
    },
    {
      "end": "2025-05-25",
      "value": 3872028.7751083304,
      "coverage": 0.9887726651665931,
      "matchedModels": 33,
      "totalModels": 39,
      "spendUsd": 14.816919991701575,
      "tokens": 3.8266554440280554
    },
    {
      "end": "2025-06-01",
      "value": 4061576.394663793,
      "coverage": 0.989823892767321,
      "matchedModels": 32,
      "totalModels": 38,
      "spendUsd": 15.033975421726618,
      "tokens": 3.701512408206492
    },
    {
      "end": "2025-06-08",
      "value": 4064929.903546286,
      "coverage": 0.9917426258181761,
      "matchedModels": 33,
      "totalModels": 39,
      "spendUsd": 16.20026912933837,
      "tokens": 3.985374782282246
    },
    {
      "end": "2025-06-15",
      "value": 4255604.767323094,
      "coverage": 0.9896877930777189,
      "matchedModels": 34,
      "totalModels": 39,
      "spendUsd": 16.99110534780702,
      "tokens": 3.9926417693377445
    },
    {
      "end": "2025-06-22",
      "value": 3823089.23355367,
      "coverage": 0.9904650765276583,
      "matchedModels": 33,
      "totalModels": 39,
      "spendUsd": 17.398938133653242,
      "tokens": 4.551015440850811
    },
    {
      "end": "2025-06-29",
      "value": 3564163.43818801,
      "coverage": 0.9900152730115426,
      "matchedModels": 33,
      "totalModels": 39,
      "spendUsd": 18.35118543149206,
      "tokens": 5.148805813692327
    },
    {
      "end": "2025-07-06",
      "value": 3714487.910167488,
      "coverage": 0.9903716953267716,
      "matchedModels": 35,
      "totalModels": 40,
      "spendUsd": 18.745517966794793,
      "tokens": 5.04659549852985
    },
    {
      "end": "2025-07-13",
      "value": 3312788.0234838915,
      "coverage": 0.9907178363333873,
      "matchedModels": 35,
      "totalModels": 42,
      "spendUsd": 21.549959820808386,
      "tokens": 6.505082627697194
    },
    {
      "end": "2025-07-20",
      "value": 3725153.177814191,
      "coverage": 0.9919786082848195,
      "matchedModels": 35,
      "totalModels": 44,
      "spendUsd": 25.797288885592188,
      "tokens": 6.925161907229079
    },
    {
      "end": "2025-07-27",
      "value": 3548319.3482292783,
      "coverage": 0.9941094586630944,
      "matchedModels": 34,
      "totalModels": 40,
      "spendUsd": 24.280483131859445,
      "tokens": 6.842812258140226
    },
    {
      "end": "2025-08-03",
      "value": 3491810.297741055,
      "coverage": 0.994907724380801,
      "matchedModels": 32,
      "totalModels": 38,
      "spendUsd": 23.335602328736357,
      "tokens": 6.682952491386138
    },
    {
      "end": "2025-08-10",
      "value": 4247242.783948294,
      "coverage": 0.9956506260565708,
      "matchedModels": 36,
      "totalModels": 42,
      "spendUsd": 26.58938616323368,
      "tokens": 6.260387624584021
    },
    {
      "end": "2025-08-17",
      "value": 3997190.317831348,
      "coverage": 0.9957408190186431,
      "matchedModels": 36,
      "totalModels": 42,
      "spendUsd": 26.729606764377653,
      "tokens": 6.6870988466918035
    },
    {
      "end": "2025-08-24",
      "value": 3610639.2665482205,
      "coverage": 0.9956170858510034,
      "matchedModels": 36,
      "totalModels": 41,
      "spendUsd": 27.05527487328137,
      "tokens": 7.493209062434608
    },
    {
      "end": "2025-08-31",
      "value": 3064325.3354197857,
      "coverage": 0.996412338106735,
      "matchedModels": 39,
      "totalModels": 47,
      "spendUsd": 27.44052242183089,
      "tokens": 8.954833256329744
    },
    {
      "end": "2025-09-07",
      "value": 3242566.2188888406,
      "coverage": 0.9964217192213147,
      "matchedModels": 39,
      "totalModels": 45,
      "spendUsd": 28.520355636519113,
      "tokens": 8.795612398100058
    },
    {
      "end": "2025-09-14",
      "value": 3188836.6820392343,
      "coverage": 0.9966311676974516,
      "matchedModels": 40,
      "totalModels": 45,
      "spendUsd": 29.37265869135614,
      "tokens": 9.211089064797314
    },
    {
      "end": "2025-09-21",
      "value": 3141767.9318263787,
      "coverage": 0.9972794162740088,
      "matchedModels": 40,
      "totalModels": 44,
      "spendUsd": 35.25430952946045,
      "tokens": 11.221169193412178
    },
    {
      "end": "2025-09-28",
      "value": 3304831.6106780022,
      "coverage": 0.996173075896281,
      "matchedModels": 40,
      "totalModels": 45,
      "spendUsd": 36.2449392481522,
      "tokens": 10.967257493859535
    },
    {
      "end": "2025-10-05",
      "value": 3206801.7674366855,
      "coverage": 0.9970885288891811,
      "matchedModels": 41,
      "totalModels": 46,
      "spendUsd": 43.48125622832768,
      "tokens": 13.55907205423672
    },
    {
      "end": "2025-10-12",
      "value": 3362439.190052772,
      "coverage": 0.9977137373153309,
      "matchedModels": 42,
      "totalModels": 46,
      "spendUsd": 50.881890014559076,
      "tokens": 15.132434265305035
    },
    {
      "end": "2025-10-19",
      "value": 3310726.038787492,
      "coverage": 0.997751737292797,
      "matchedModels": 45,
      "totalModels": 48,
      "spendUsd": 50.79562628165757,
      "tokens": 15.342745272955526
    },
    {
      "end": "2025-10-26",
      "value": 3282522.5587562947,
      "coverage": 0.9973580752106791,
      "matchedModels": 46,
      "totalModels": 48,
      "spendUsd": 49.61384274848874,
      "tokens": 15.114547382512669
    },
    {
      "end": "2025-11-02",
      "value": 3251655.3245435925,
      "coverage": 0.9976825147562651,
      "matchedModels": 45,
      "totalModels": 47,
      "spendUsd": 51.31446172665771,
      "tokens": 15.781027386062295
    },
    {
      "end": "2025-11-09",
      "value": 3200956.7280154172,
      "coverage": 0.9979304122286715,
      "matchedModels": 46,
      "totalModels": 50,
      "spendUsd": 54.40257977610877,
      "tokens": 16.99572484062857
    },
    {
      "end": "2025-11-16",
      "value": 3190244.329483796,
      "coverage": 0.9977251918844293,
      "matchedModels": 51,
      "totalModels": 55,
      "spendUsd": 53.462958673843346,
      "tokens": 16.758264619341563
    },
    {
      "end": "2025-11-23",
      "value": 3300306.1690542586,
      "coverage": 0.9975643739019955,
      "matchedModels": 53,
      "totalModels": 58,
      "spendUsd": 54.36357251152654,
      "tokens": 16.472281578380063
    },
    {
      "end": "2025-11-30",
      "value": 3313121.32638253,
      "coverage": 0.9975144034147679,
      "matchedModels": 51,
      "totalModels": 53,
      "spendUsd": 51.18656852296877,
      "tokens": 15.449651093477286
    },
    {
      "end": "2025-12-07",
      "value": 3255867.032472688,
      "coverage": 0.9980173067455573,
      "matchedModels": 53,
      "totalModels": 56,
      "spendUsd": 63.734999072676565,
      "tokens": 19.575430580244745
    },
    {
      "end": "2025-12-14",
      "value": 3255980.7321066945,
      "coverage": 0.997890633581851,
      "matchedModels": 55,
      "totalModels": 59,
      "spendUsd": 63.465364026204306,
      "tokens": 19.491934764964274
    },
    {
      "end": "2025-12-21",
      "value": 3081459.807223879,
      "coverage": 0.9979699720270201,
      "matchedModels": 56,
      "totalModels": 59,
      "spendUsd": 57.339410413222915,
      "tokens": 18.607872242500747
    },
    {
      "end": "2025-12-28",
      "value": 2904095.008140614,
      "coverage": 0.9974469061155707,
      "matchedModels": 48,
      "totalModels": 53,
      "spendUsd": 37.80812535991324,
      "tokens": 13.018900984276133
    },
    {
      "end": "2026-01-04",
      "value": 2769469.110562752,
      "coverage": 0.9973300857572548,
      "matchedModels": 47,
      "totalModels": 51,
      "spendUsd": 36.223181443107386,
      "tokens": 13.079467579166064
    },
    {
      "end": "2026-01-11",
      "value": 2991644.8833282785,
      "coverage": 0.9982927604424302,
      "matchedModels": 52,
      "totalModels": 55,
      "spendUsd": 58.61753932760724,
      "tokens": 19.593749129206067
    },
    {
      "end": "2026-01-18",
      "value": 3007408.024089762,
      "coverage": 0.9982751472426423,
      "matchedModels": 51,
      "totalModels": 55,
      "spendUsd": 65.46651901818755,
      "tokens": 21.76841934775445
    },
    {
      "end": "2026-01-25",
      "value": 3081853.3234430104,
      "coverage": 0.9984699308435553,
      "matchedModels": 53,
      "totalModels": 56,
      "spendUsd": 72.97321337109281,
      "tokens": 23.67835380613377
    },
    {
      "end": "2026-02-01",
      "value": 3134529.1286729085,
      "coverage": 0.9987038917409158,
      "matchedModels": 56,
      "totalModels": 58,
      "spendUsd": 82.57760752485892,
      "tokens": 26.34450156148987
    },
    {
      "end": "2026-02-08",
      "value": 3155161.483035826,
      "coverage": 0.998371826880195,
      "matchedModels": 55,
      "totalModels": 61,
      "spendUsd": 91.05169538607453,
      "tokens": 28.85801436016093
    },
    {
      "end": "2026-02-15",
      "value": 3397803.9400604693,
      "coverage": 0.9981427325228717,
      "matchedModels": 57,
      "totalModels": 61,
      "spendUsd": 104.32936028066086,
      "tokens": 30.704938283991794
    },
    {
      "end": "2026-02-22",
      "value": 3483370.5457572127,
      "coverage": 0.9988881392187363,
      "matchedModels": 58,
      "totalModels": 62,
      "spendUsd": 108.8089633161676,
      "tokens": 31.236689260262086
    },
    {
      "end": "2026-03-01",
      "value": 3519372.278918062,
      "coverage": 0.9989311235297834,
      "matchedModels": 58,
      "totalModels": 63,
      "spendUsd": 133.65998903449847,
      "tokens": 37.97836046932458
    },
    {
      "end": "2026-03-08",
      "value": 3319488.1213521403,
      "coverage": 0.9990275332400539,
      "matchedModels": 61,
      "totalModels": 64,
      "spendUsd": 142.58572673897933,
      "tokens": 42.95413073534341
    },
    {
      "end": "2026-03-15",
      "value": 3416277.6831262372,
      "coverage": 0.9990482261711578,
      "matchedModels": 61,
      "totalModels": 64,
      "spendUsd": 150.2996727662156,
      "tokens": 43.99515692432715
    },
    {
      "end": "2026-03-22",
      "value": 3131020.46127564,
      "coverage": 0.998994041312145,
      "matchedModels": 68,
      "totalModels": 73,
      "spendUsd": 137.11364102030254,
      "tokens": 43.79199775795771
    },
    {
      "end": "2026-03-29",
      "value": 2857027.999161485,
      "coverage": 0.999061089426712,
      "matchedModels": 63,
      "totalModels": 68,
      "spendUsd": 134.97821593524452,
      "tokens": 47.24427481104825
    },
    {
      "end": "2026-04-05",
      "value": 2813350.066874207,
      "coverage": 0.9990969751882982,
      "matchedModels": 63,
      "totalModels": 70,
      "spendUsd": 135.89853138767995,
      "tokens": 48.30487787062739
    },
    {
      "end": "2026-04-12",
      "value": 2691235.6595982932,
      "coverage": 0.9987975506152438,
      "matchedModels": 63,
      "totalModels": 67,
      "spendUsd": 138.6710309739316,
      "tokens": 51.52690009860761
    },
    {
      "end": "2026-04-19",
      "value": 2516874.4853711915,
      "coverage": 0.9983929947806869,
      "matchedModels": 64,
      "totalModels": 69,
      "spendUsd": 147.114157155496,
      "tokens": 58.45112976851504
    },
    {
      "end": "2026-04-26",
      "value": 2426425.3603969933,
      "coverage": 0.9988761501932975,
      "matchedModels": 65,
      "totalModels": 70,
      "spendUsd": 161.95178560248766,
      "tokens": 66.74501027140202
    },
    {
      "end": "2026-05-03",
      "value": 2439535.7318133377,
      "coverage": 0.9988510936364654,
      "matchedModels": 68,
      "totalModels": 72,
      "spendUsd": 170.16575581551564,
      "tokens": 69.75333609441715
    },
    {
      "end": "2026-05-10",
      "value": 2393740.803329315,
      "coverage": 0.9987900364628516,
      "matchedModels": 73,
      "totalModels": 78,
      "spendUsd": 174.86485211526758,
      "tokens": 73.05087161987556
    },
    {
      "end": "2026-05-17",
      "value": 2508361.627309417,
      "coverage": 0.9982755601017513,
      "matchedModels": 71,
      "totalModels": 77,
      "spendUsd": 194.86200155841132,
      "tokens": 77.68497151163535
    },
    {
      "end": "2026-05-24",
      "value": 2378803.1857958212,
      "coverage": 0.9987106082715769,
      "matchedModels": 76,
      "totalModels": 81,
      "spendUsd": 193.97884005357548,
      "tokens": 81.54472013988011
    },
    {
      "end": "2026-05-31",
      "value": 2389785.81172465,
      "coverage": 0.9985882939651043,
      "matchedModels": 74,
      "totalModels": 79,
      "spendUsd": 187.90394232064992,
      "tokens": 78.62794288875797
    },
    {
      "end": "2026-06-07",
      "value": 2364185.437163463,
      "coverage": 0.9963454916305611,
      "matchedModels": 73,
      "totalModels": 79,
      "spendUsd": 217.3471629426408,
      "tokens": 91.93321282082373
    },
    {
      "end": "2026-06-14",
      "value": 2432991.5169617864,
      "coverage": 0.9983326100160068,
      "matchedModels": 73,
      "totalModels": 81,
      "spendUsd": 222.61426975606153,
      "tokens": 91.49816931299969
    },
    {
      "end": "2026-06-21",
      "value": 2324491.7756579467,
      "coverage": 0.9983509438277772,
      "matchedModels": 76,
      "totalModels": 83,
      "spendUsd": 211.7009633684161,
      "tokens": 91.07408577881253
    },
    {
      "end": "2026-06-28",
      "value": 2204787.4543817034,
      "coverage": 0.9986283014434973,
      "matchedModels": 72,
      "totalModels": 78,
      "spendUsd": 229.8796440140819,
      "tokens": 104.26385707031694
    },
    {
      "end": "2026-07-05",
      "value": 2325376.522063178,
      "coverage": 0.9983055457936578,
      "matchedModels": 75,
      "totalModels": 83,
      "spendUsd": 214.73756618310978,
      "tokens": 92.34528866429984
    },
    {
      "end": "2026-07-12",
      "value": 2409685.44211173,
      "coverage": 0.9984326626453146,
      "matchedModels": 79,
      "totalModels": 87,
      "spendUsd": 289.39516141755865,
      "tokens": 120.09665509036189
    },
    {
      "end": "2026-07-19",
      "value": 2420913.6496566967,
      "coverage": 0.9978994175327673,
      "matchedModels": 84,
      "totalModels": 94,
      "spendUsd": 295.6105060717275,
      "tokens": 122.10700126113431
    },
    {
      "end": "2026-07-26",
      "value": 2527514.869806931,
      "coverage": 0.9964801814693883,
      "matchedModels": 98,
      "totalModels": 107,
      "spendUsd": 329.00242931082863,
      "tokens": 130.16834569046873
    },
    {
      "end": "2026-08-02",
      "value": 2311698.54033374,
      "coverage": 0.9969968183441271,
      "matchedModels": 96,
      "totalModels": 103,
      "spendUsd": 346.5961593805769,
      "tokens": 149.9313830645664
    },
    {
      "end": "2026-08-09",
      "value": 2154918.26063245,
      "coverage": 0.9967751014441022,
      "matchedModels": 89,
      "totalModels": 97,
      "spendUsd": 336.0721522481547,
      "tokens": 155.9558700614103
    },
    {
      "end": "2026-08-16",
      "value": 2026542.3839021253,
      "coverage": 0.996834167358059,
      "matchedModels": 98,
      "totalModels": 105,
      "spendUsd": 323.28682712197775,
      "tokens": 159.52630928916776
    },
    {
      "end": "2026-08-23",
      "value": 1927586.6921513672,
      "coverage": 0.9969777615642925,
      "matchedModels": 105,
      "totalModels": 110,
      "spendUsd": 317.48144687050495,
      "tokens": 164.7041080762837
    },
    {
      "end": "2026-08-30",
      "value": 1783514.099835156,
      "coverage": 0.996236424908667,
      "matchedModels": 100,
      "totalModels": 107,
      "spendUsd": 304.46015558642193,
      "tokens": 170.7080171749481
    },
    {
      "end": "2026-09-06",
      "value": 1764277.8557943734,
      "coverage": 0.9971349563763573,
      "matchedModels": 108,
      "totalModels": 114,
      "spendUsd": 310.26959819169605,
      "tokens": 175.8620940418684
    },
    {
      "end": "2026-09-13",
      "value": 1784208.657099128,
      "coverage": 0.9973800986698083,
      "matchedModels": 106,
      "totalModels": 114,
      "spendUsd": 292.4957657581234,
      "tokens": 163.9358516697707
    },
    {
      "end": "2026-09-20",
      "value": 1786238.6216983201,
      "coverage": 0.997416065360553,
      "matchedModels": 108,
      "totalModels": 114,
      "spendUsd": 341.8451207087801,
      "tokens": 191.3770739005523
    },
    {
      "end": "2026-09-27",
      "value": 1634036.7192600402,
      "coverage": 0.9964338865812178,
      "matchedModels": 113,
      "totalModels": 119,
      "spendUsd": 332.2278600195384,
      "tokens": 203.3172548105192
    },
    {
      "end": "2026-10-04",
      "value": 1431580.2967245595,
      "coverage": 0.9978897165165812,
      "matchedModels": 108,
      "totalModels": 114,
      "spendUsd": 314.9603480181585,
      "tokens": 220.008859257692
    },
    {
      "end": "2026-10-11",
      "value": 1355612.7291970218,
      "coverage": 0.9984133738303677,
      "matchedModels": 112,
      "totalModels": 118,
      "spendUsd": 319.70454825757616,
      "tokens": 235.8376705764254
    },
    {
      "end": "2026-10-18",
      "value": 1263065.350616185,
      "coverage": 0.9985996932676401,
      "matchedModels": 111,
      "totalModels": 115,
      "spendUsd": 309.9573845765072,
      "tokens": 245.40090853200493
    },
    {
      "end": "2026-10-25",
      "value": 1185450.302792384,
      "coverage": 0.9979983760453712,
      "matchedModels": 109,
      "totalModels": 116,
      "spendUsd": 306.4745614974794,
      "tokens": 258.53007989922827
    },
    {
      "end": "2026-11-01",
      "value": 1224663.7275796651,
      "coverage": 0.9992474532409447,
      "matchedModels": 104,
      "totalModels": 108,
      "spendUsd": 348.1578531420917,
      "tokens": 284.28853186512276
    }
  ],
  "rampPublishedWeekly": [
    {
      "end": "2025-01-12",
      "value": 3338577.3085129666,
      "coverage": 0.9696650325370325,
      "matchedModels": 16,
      "totalModels": 21,
      "spendUsd": 5.294420318288201,
      "tokens": 1.5858312775289258
    },
    {
      "end": "2025-01-19",
      "value": 3536159.8124182867,
      "coverage": 0.9703782727013968,
      "matchedModels": 16,
      "totalModels": 21,
      "spendUsd": 5.783129236268923,
      "tokens": 1.6354264351853467
    },
    {
      "end": "2025-01-26",
      "value": 4382970.677602199,
      "coverage": 0.9695948091158189,
      "matchedModels": 16,
      "totalModels": 23,
      "spendUsd": 6.9064833744971725,
      "tokens": 1.5757539537717185
    },
    {
      "end": "2025-02-02",
      "value": 4149248.3823827044,
      "coverage": 0.9757292693295366,
      "matchedModels": 18,
      "totalModels": 24,
      "spendUsd": 7.306035717577292,
      "tokens": 1.7608094392704936
    },
    {
      "end": "2025-02-09",
      "value": 3562273.9865379706,
      "coverage": 0.9861190130959492,
      "matchedModels": 19,
      "totalModels": 22,
      "spendUsd": 6.854295340398323,
      "tokens": 1.9241347988114004
    },
    {
      "end": "2025-02-16",
      "value": 3364302.4777998324,
      "coverage": 0.9873084406983748,
      "matchedModels": 18,
      "totalModels": 22,
      "spendUsd": 7.485970794970939,
      "tokens": 2.2251182360590156
    },
    {
      "end": "2025-02-23",
      "value": 3866127.172020329,
      "coverage": 0.9873272624720499,
      "matchedModels": 19,
      "totalModels": 24,
      "spendUsd": 8.669237694401277,
      "tokens": 2.2423570950127276
    },
    {
      "end": "2025-03-02",
      "value": 3388899.6163097396,
      "coverage": 0.9898743167292012,
      "matchedModels": 20,
      "totalModels": 25,
      "spendUsd": 9.734530942794565,
      "tokens": 2.87247544776636
    },
    {
      "end": "2025-03-09",
      "value": 4015253.8510314953,
      "coverage": 0.9881879111392701,
      "matchedModels": 20,
      "totalModels": 24,
      "spendUsd": 10.333567169321302,
      "tokens": 2.573577550188183
    },
    {
      "end": "2025-03-16",
      "value": 3833949.759418728,
      "coverage": 0.9855756789096318,
      "matchedModels": 22,
      "totalModels": 27,
      "spendUsd": 9.724646240872831,
      "tokens": 2.536456357306884
    },
    {
      "end": "2025-03-23",
      "value": 4381761.944380987,
      "coverage": 0.9852413577259306,
      "matchedModels": 24,
      "totalModels": 30,
      "spendUsd": 11.289708187756377,
      "tokens": 2.576522488227342
    },
    {
      "end": "2025-03-30",
      "value": 4704868.5862032715,
      "coverage": 0.9859642904699006,
      "matchedModels": 24,
      "totalModels": 28,
      "spendUsd": 12.016389095696832,
      "tokens": 2.5540328864729887
    },
    {
      "end": "2025-04-06",
      "value": 4476949.20399326,
      "coverage": 0.9900790142223326,
      "matchedModels": 25,
      "totalModels": 30,
      "spendUsd": 12.744478013499863,
      "tokens": 2.846688097808279
    },
    {
      "end": "2025-04-13",
      "value": 4682328.571984938,
      "coverage": 0.98860823059887,
      "matchedModels": 25,
      "totalModels": 28,
      "spendUsd": 12.23957330533593,
      "tokens": 2.613992827963228
    },
    {
      "end": "2025-04-20",
      "value": 4612610.217275173,
      "coverage": 0.9867744972853003,
      "matchedModels": 30,
      "totalModels": 35,
      "spendUsd": 11.733366048882715,
      "tokens": 2.5437584136068656
    },
    {
      "end": "2025-04-27",
      "value": 4278991.764407933,
      "coverage": 0.9896772553758383,
      "matchedModels": 30,
      "totalModels": 34,
      "spendUsd": 14.382331546131454,
      "tokens": 3.3611496207498495
    },
    {
      "end": "2025-05-04",
      "value": 4329812.182689325,
      "coverage": 0.9893522527620756,
      "matchedModels": 30,
      "totalModels": 34,
      "spendUsd": 14.078878020555369,
      "tokens": 3.25161402539422
    },
    {
      "end": "2025-05-11",
      "value": 4116684.1950723575,
      "coverage": 0.9894916146197441,
      "matchedModels": 29,
      "totalModels": 33,
      "spendUsd": 13.980906162746674,
      "tokens": 3.396157076970277
    },
    {
      "end": "2025-05-18",
      "value": 4086923.872738814,
      "coverage": 0.9886828578466944,
      "matchedModels": 31,
      "totalModels": 37,
      "spendUsd": 14.742161063779454,
      "tokens": 3.6071533316572717
    },
    {
      "end": "2025-05-25",
      "value": 3872028.7751083304,
      "coverage": 0.9887726651665931,
      "matchedModels": 33,
      "totalModels": 39,
      "spendUsd": 14.816919991701575,
      "tokens": 3.8266554440280554
    },
    {
      "end": "2025-06-01",
      "value": 4061576.394663793,
      "coverage": 0.989823892767321,
      "matchedModels": 32,
      "totalModels": 38,
      "spendUsd": 15.033975421726618,
      "tokens": 3.701512408206492
    },
    {
      "end": "2025-06-08",
      "value": 4064929.903546286,
      "coverage": 0.9917426258181761,
      "matchedModels": 33,
      "totalModels": 39,
      "spendUsd": 16.20026912933837,
      "tokens": 3.985374782282246
    },
    {
      "end": "2025-06-15",
      "value": 4255604.767323094,
      "coverage": 0.9896877930777189,
      "matchedModels": 34,
      "totalModels": 39,
      "spendUsd": 16.99110534780702,
      "tokens": 3.9926417693377445
    },
    {
      "end": "2025-06-22",
      "value": 3823089.23355367,
      "coverage": 0.9904650765276583,
      "matchedModels": 33,
      "totalModels": 39,
      "spendUsd": 17.398938133653242,
      "tokens": 4.551015440850811
    },
    {
      "end": "2025-06-29",
      "value": 3564163.43818801,
      "coverage": 0.9900152730115426,
      "matchedModels": 33,
      "totalModels": 39,
      "spendUsd": 18.35118543149206,
      "tokens": 5.148805813692327
    },
    {
      "end": "2025-07-06",
      "value": 3714487.910167488,
      "coverage": 0.9903716953267716,
      "matchedModels": 35,
      "totalModels": 40,
      "spendUsd": 18.745517966794793,
      "tokens": 5.04659549852985
    },
    {
      "end": "2025-07-13",
      "value": 3312788.0234838915,
      "coverage": 0.9907178363333873,
      "matchedModels": 35,
      "totalModels": 42,
      "spendUsd": 21.549959820808386,
      "tokens": 6.505082627697194
    },
    {
      "end": "2025-07-20",
      "value": 3725153.177814191,
      "coverage": 0.9919786082848195,
      "matchedModels": 35,
      "totalModels": 44,
      "spendUsd": 25.797288885592188,
      "tokens": 6.925161907229079
    },
    {
      "end": "2025-07-27",
      "value": 3548319.3482292783,
      "coverage": 0.9941094586630944,
      "matchedModels": 34,
      "totalModels": 40,
      "spendUsd": 24.280483131859445,
      "tokens": 6.842812258140226
    },
    {
      "end": "2025-08-03",
      "value": 3491810.297741055,
      "coverage": 0.994907724380801,
      "matchedModels": 32,
      "totalModels": 38,
      "spendUsd": 23.335602328736357,
      "tokens": 6.682952491386138
    },
    {
      "end": "2025-08-10",
      "value": 4247242.783948294,
      "coverage": 0.9956506260565708,
      "matchedModels": 36,
      "totalModels": 42,
      "spendUsd": 26.58938616323368,
      "tokens": 6.260387624584021
    },
    {
      "end": "2025-08-17",
      "value": 3997190.317831348,
      "coverage": 0.9957408190186431,
      "matchedModels": 36,
      "totalModels": 42,
      "spendUsd": 26.729606764377653,
      "tokens": 6.6870988466918035
    },
    {
      "end": "2025-08-24",
      "value": 3610639.2665482205,
      "coverage": 0.9956170858510034,
      "matchedModels": 36,
      "totalModels": 41,
      "spendUsd": 27.05527487328137,
      "tokens": 7.493209062434608
    },
    {
      "end": "2025-08-31",
      "value": 3064325.3354197857,
      "coverage": 0.996412338106735,
      "matchedModels": 39,
      "totalModels": 47,
      "spendUsd": 27.44052242183089,
      "tokens": 8.954833256329744
    },
    {
      "end": "2025-09-07",
      "value": 3242566.2188888406,
      "coverage": 0.9964217192213147,
      "matchedModels": 39,
      "totalModels": 45,
      "spendUsd": 28.520355636519113,
      "tokens": 8.795612398100058
    },
    {
      "end": "2025-09-14",
      "value": 3188836.6820392343,
      "coverage": 0.9966311676974516,
      "matchedModels": 40,
      "totalModels": 45,
      "spendUsd": 29.37265869135614,
      "tokens": 9.211089064797314
    },
    {
      "end": "2025-09-21",
      "value": 3141767.9318263787,
      "coverage": 0.9972794162740088,
      "matchedModels": 40,
      "totalModels": 44,
      "spendUsd": 35.25430952946045,
      "tokens": 11.221169193412178
    },
    {
      "end": "2025-09-28",
      "value": 3304831.6106780022,
      "coverage": 0.996173075896281,
      "matchedModels": 40,
      "totalModels": 45,
      "spendUsd": 36.2449392481522,
      "tokens": 10.967257493859535
    },
    {
      "end": "2025-10-05",
      "value": 3206801.7674366855,
      "coverage": 0.9970885288891811,
      "matchedModels": 41,
      "totalModels": 46,
      "spendUsd": 43.48125622832768,
      "tokens": 13.55907205423672
    },
    {
      "end": "2025-10-12",
      "value": 3362439.190052772,
      "coverage": 0.9977137373153309,
      "matchedModels": 42,
      "totalModels": 46,
      "spendUsd": 50.881890014559076,
      "tokens": 15.132434265305035
    },
    {
      "end": "2025-10-19",
      "value": 3310726.038787492,
      "coverage": 0.997751737292797,
      "matchedModels": 45,
      "totalModels": 48,
      "spendUsd": 50.79562628165757,
      "tokens": 15.342745272955526
    },
    {
      "end": "2025-10-26",
      "value": 3282522.5587562947,
      "coverage": 0.9973580752106791,
      "matchedModels": 46,
      "totalModels": 48,
      "spendUsd": 49.61384274848874,
      "tokens": 15.114547382512669
    },
    {
      "end": "2025-11-02",
      "value": 3251655.3245435925,
      "coverage": 0.9976825147562651,
      "matchedModels": 45,
      "totalModels": 47,
      "spendUsd": 51.31446172665771,
      "tokens": 15.781027386062295
    },
    {
      "end": "2025-11-09",
      "value": 3200956.7280154172,
      "coverage": 0.9979304122286715,
      "matchedModels": 46,
      "totalModels": 50,
      "spendUsd": 54.40257977610877,
      "tokens": 16.99572484062857
    },
    {
      "end": "2025-11-16",
      "value": 3190244.329483796,
      "coverage": 0.9977251918844293,
      "matchedModels": 51,
      "totalModels": 55,
      "spendUsd": 53.462958673843346,
      "tokens": 16.758264619341563
    },
    {
      "end": "2025-11-23",
      "value": 3300306.1690542586,
      "coverage": 0.9975643739019955,
      "matchedModels": 53,
      "totalModels": 58,
      "spendUsd": 54.36357251152654,
      "tokens": 16.472281578380063
    },
    {
      "end": "2025-11-30",
      "value": 3313121.32638253,
      "coverage": 0.9975144034147679,
      "matchedModels": 51,
      "totalModels": 53,
      "spendUsd": 51.18656852296877,
      "tokens": 15.449651093477286
    },
    {
      "end": "2025-12-07",
      "value": 3255867.032472688,
      "coverage": 0.9980173067455573,
      "matchedModels": 53,
      "totalModels": 56,
      "spendUsd": 63.734999072676565,
      "tokens": 19.575430580244745
    },
    {
      "end": "2025-12-14",
      "value": 3255980.7321066945,
      "coverage": 0.997890633581851,
      "matchedModels": 55,
      "totalModels": 59,
      "spendUsd": 63.465364026204306,
      "tokens": 19.491934764964274
    },
    {
      "end": "2025-12-21",
      "value": 3081459.807223879,
      "coverage": 0.9979699720270201,
      "matchedModels": 56,
      "totalModels": 59,
      "spendUsd": 57.339410413222915,
      "tokens": 18.607872242500747
    },
    {
      "end": "2025-12-28",
      "value": 2904095.008140614,
      "coverage": 0.9974469061155707,
      "matchedModels": 48,
      "totalModels": 53,
      "spendUsd": 37.80812535991324,
      "tokens": 13.018900984276133
    },
    {
      "end": "2026-01-04",
      "value": 2769469.110562752,
      "coverage": 0.9973300857572548,
      "matchedModels": 47,
      "totalModels": 51,
      "spendUsd": 36.223181443107386,
      "tokens": 13.079467579166064
    },
    {
      "end": "2026-01-11",
      "value": 2991644.8833282785,
      "coverage": 0.9982927604424302,
      "matchedModels": 52,
      "totalModels": 55,
      "spendUsd": 58.61753932760724,
      "tokens": 19.593749129206067
    },
    {
      "end": "2026-01-18",
      "value": 3007408.024089762,
      "coverage": 0.9982751472426423,
      "matchedModels": 51,
      "totalModels": 55,
      "spendUsd": 65.46651901818755,
      "tokens": 21.76841934775445
    },
    {
      "end": "2026-01-25",
      "value": 3081853.3234430104,
      "coverage": 0.9984699308435553,
      "matchedModels": 53,
      "totalModels": 56,
      "spendUsd": 72.97321337109281,
      "tokens": 23.67835380613377
    },
    {
      "end": "2026-02-01",
      "value": 3134529.1286729085,
      "coverage": 0.9987038917409158,
      "matchedModels": 56,
      "totalModels": 58,
      "spendUsd": 82.57760752485892,
      "tokens": 26.34450156148987
    },
    {
      "end": "2026-02-08",
      "value": 3155161.483035826,
      "coverage": 0.998371826880195,
      "matchedModels": 55,
      "totalModels": 61,
      "spendUsd": 91.05169538607453,
      "tokens": 28.85801436016093
    },
    {
      "end": "2026-02-15",
      "value": 3397803.9400604693,
      "coverage": 0.9981427325228717,
      "matchedModels": 57,
      "totalModels": 61,
      "spendUsd": 104.32936028066086,
      "tokens": 30.704938283991794
    },
    {
      "end": "2026-02-22",
      "value": 3483370.5457572127,
      "coverage": 0.9988881392187363,
      "matchedModels": 58,
      "totalModels": 62,
      "spendUsd": 108.8089633161676,
      "tokens": 31.236689260262086
    },
    {
      "end": "2026-03-01",
      "value": 3519372.278918062,
      "coverage": 0.9989311235297834,
      "matchedModels": 58,
      "totalModels": 63,
      "spendUsd": 133.65998903449847,
      "tokens": 37.97836046932458
    },
    {
      "end": "2026-03-08",
      "value": 3319488.1213521403,
      "coverage": 0.9990275332400539,
      "matchedModels": 61,
      "totalModels": 64,
      "spendUsd": 142.58572673897933,
      "tokens": 42.95413073534341
    },
    {
      "end": "2026-03-15",
      "value": 3416277.6831262372,
      "coverage": 0.9990482261711578,
      "matchedModels": 61,
      "totalModels": 64,
      "spendUsd": 150.2996727662156,
      "tokens": 43.99515692432715
    },
    {
      "end": "2026-03-22",
      "value": 3131020.46127564,
      "coverage": 0.998994041312145,
      "matchedModels": 68,
      "totalModels": 73,
      "spendUsd": 137.11364102030254,
      "tokens": 43.79199775795771
    },
    {
      "end": "2026-03-29",
      "value": 2857027.999161485,
      "coverage": 0.999061089426712,
      "matchedModels": 63,
      "totalModels": 68,
      "spendUsd": 134.97821593524452,
      "tokens": 47.24427481104825
    },
    {
      "end": "2026-04-05",
      "value": 2813350.066874207,
      "coverage": 0.9990969751882982,
      "matchedModels": 63,
      "totalModels": 70,
      "spendUsd": 135.89853138767995,
      "tokens": 48.30487787062739
    },
    {
      "end": "2026-04-12",
      "value": 2691235.6595982932,
      "coverage": 0.9987975506152438,
      "matchedModels": 63,
      "totalModels": 67,
      "spendUsd": 138.6710309739316,
      "tokens": 51.52690009860761
    },
    {
      "end": "2026-04-19",
      "value": 2516874.4853711915,
      "coverage": 0.9983929947806869,
      "matchedModels": 64,
      "totalModels": 69,
      "spendUsd": 147.114157155496,
      "tokens": 58.45112976851504
    },
    {
      "end": "2026-04-26",
      "value": 2426425.3603969933,
      "coverage": 0.9988761501932975,
      "matchedModels": 65,
      "totalModels": 70,
      "spendUsd": 161.95178560248766,
      "tokens": 66.74501027140202
    },
    {
      "end": "2026-05-03",
      "value": 2439535.7318133377,
      "coverage": 0.9988510936364654,
      "matchedModels": 68,
      "totalModels": 72,
      "spendUsd": 170.16575581551564,
      "tokens": 69.75333609441715
    },
    {
      "end": "2026-05-10",
      "value": 2393740.803329315,
      "coverage": 0.9987900364628516,
      "matchedModels": 73,
      "totalModels": 78,
      "spendUsd": 174.86485211526758,
      "tokens": 73.05087161987556
    },
    {
      "end": "2026-05-17",
      "value": 2508361.627309417,
      "coverage": 0.9982755601017513,
      "matchedModels": 71,
      "totalModels": 77,
      "spendUsd": 194.86200155841132,
      "tokens": 77.68497151163535
    },
    {
      "end": "2026-05-24",
      "value": 2378803.1857958212,
      "coverage": 0.9987106082715769,
      "matchedModels": 76,
      "totalModels": 81,
      "spendUsd": 193.97884005357548,
      "tokens": 81.54472013988011
    },
    {
      "end": "2026-05-31",
      "value": 2389785.81172465,
      "coverage": 0.9985882939651043,
      "matchedModels": 74,
      "totalModels": 79,
      "spendUsd": 187.90394232064992,
      "tokens": 78.62794288875797
    },
    {
      "end": "2026-06-07",
      "value": 2364185.437163463,
      "coverage": 0.9963454916305611,
      "matchedModels": 73,
      "totalModels": 79,
      "spendUsd": 217.3471629426408,
      "tokens": 91.93321282082373
    },
    {
      "end": "2026-06-14",
      "value": 2432991.5169617864,
      "coverage": 0.9983326100160068,
      "matchedModels": 73,
      "totalModels": 81,
      "spendUsd": 222.61426975606153,
      "tokens": 91.49816931299969
    },
    {
      "end": "2026-06-21",
      "value": 2324491.7756579467,
      "coverage": 0.9983509438277772,
      "matchedModels": 76,
      "totalModels": 83,
      "spendUsd": 211.7009633684161,
      "tokens": 91.07408577881253
    },
    {
      "end": "2026-06-28",
      "value": 2204787.4543817034,
      "coverage": 0.9986283014434973,
      "matchedModels": 72,
      "totalModels": 78,
      "spendUsd": 229.8796440140819,
      "tokens": 104.26385707031694
    },
    {
      "end": "2026-07-05",
      "value": 2325376.522063178,
      "coverage": 0.9983055457936578,
      "matchedModels": 75,
      "totalModels": 83,
      "spendUsd": 214.73756618310978,
      "tokens": 92.34528866429984
    },
    {
      "end": "2026-07-12",
      "value": 2409685.44211173,
      "coverage": 0.9984326626453146,
      "matchedModels": 79,
      "totalModels": 87,
      "spendUsd": 289.39516141755865,
      "tokens": 120.09665509036189
    },
    {
      "end": "2026-07-19",
      "value": 2420913.6496566967,
      "coverage": 0.9978994175327673,
      "matchedModels": 84,
      "totalModels": 94,
      "spendUsd": 295.6105060717275,
      "tokens": 122.10700126113431
    },
    {
      "end": "2026-07-26",
      "value": 2527514.869806931,
      "coverage": 0.9964801814693883,
      "matchedModels": 98,
      "totalModels": 107,
      "spendUsd": 329.00242931082863,
      "tokens": 130.16834569046873
    },
    {
      "end": "2026-08-02",
      "value": 2311698.54033374,
      "coverage": 0.9969968183441271,
      "matchedModels": 96,
      "totalModels": 103,
      "spendUsd": 346.5961593805769,
      "tokens": 149.9313830645664
    },
    {
      "end": "2026-08-09",
      "value": 2154918.26063245,
      "coverage": 0.9967751014441022,
      "matchedModels": 89,
      "totalModels": 97,
      "spendUsd": 336.0721522481547,
      "tokens": 155.9558700614103
    },
    {
      "end": "2026-08-16",
      "value": 2026542.3839021253,
      "coverage": 0.996834167358059,
      "matchedModels": 98,
      "totalModels": 105,
      "spendUsd": 323.28682712197775,
      "tokens": 159.52630928916776
    },
    {
      "end": "2026-08-23",
      "value": 1927586.6921513672,
      "coverage": 0.9969777615642925,
      "matchedModels": 105,
      "totalModels": 110,
      "spendUsd": 317.48144687050495,
      "tokens": 164.7041080762837
    },
    {
      "end": "2026-08-30",
      "value": 1783514.099835156,
      "coverage": 0.996236424908667,
      "matchedModels": 100,
      "totalModels": 107,
      "spendUsd": 304.46015558642193,
      "tokens": 170.7080171749481
    },
    {
      "end": "2026-09-06",
      "value": 1764277.8557943734,
      "coverage": 0.9971349563763573,
      "matchedModels": 108,
      "totalModels": 114,
      "spendUsd": 310.26959819169605,
      "tokens": 175.8620940418684
    },
    {
      "end": "2026-09-13",
      "value": 1784208.657099128,
      "coverage": 0.9973800986698083,
      "matchedModels": 106,
      "totalModels": 114,
      "spendUsd": 292.4957657581234,
      "tokens": 163.9358516697707
    },
    {
      "end": "2026-09-20",
      "value": 1786238.6216983201,
      "coverage": 0.997416065360553,
      "matchedModels": 108,
      "totalModels": 114,
      "spendUsd": 341.8451207087801,
      "tokens": 191.3770739005523
    },
    {
      "end": "2026-09-27",
      "value": 1634036.7192600402,
      "coverage": 0.9964338865812178,
      "matchedModels": 113,
      "totalModels": 119,
      "spendUsd": 332.2278600195384,
      "tokens": 203.3172548105192
    },
    {
      "end": "2026-10-04",
      "value": 1431580.2967245595,
      "coverage": 0.9978897165165812,
      "matchedModels": 108,
      "totalModels": 114,
      "spendUsd": 314.9603480181585,
      "tokens": 220.008859257692
    },
    {
      "end": "2026-10-11",
      "value": 1355612.7291970218,
      "coverage": 0.9984133738303677,
      "matchedModels": 112,
      "totalModels": 118,
      "spendUsd": 319.70454825757616,
      "tokens": 235.8376705764254
    },
    {
      "end": "2026-10-18",
      "value": 1263065.350616185,
      "coverage": 0.9985996932676401,
      "matchedModels": 111,
      "totalModels": 115,
      "spendUsd": 309.9573845765072,
      "tokens": 245.40090853200493
    },
    {
      "end": "2026-10-25",
      "value": 1185450.302792384,
      "coverage": 0.9979983760453712,
      "matchedModels": 109,
      "totalModels": 116,
      "spendUsd": 306.4745614974794,
      "tokens": 258.53007989922827
    },
    {
      "end": "2026-11-01",
      "value": 1224663.7275796651,
      "coverage": 0.9992474532409447,
      "matchedModels": 104,
      "totalModels": 108,
      "spendUsd": 348.1578531420917,
      "tokens": 284.28853186512276
    }
  ],
  "rampPublicChart": {
    "indexed": true,
    "weekly": [
      {
        "end": "2025-01-12",
        "volume": 1.6354423685669632,
        "volumeWow": null,
        "spendingIndex": 5.294420318288201
      },
      {
        "end": "2025-01-19",
        "volume": 1.6853493953781027,
        "volumeWow": 3.0515918977242817,
        "spendingIndex": 5.783129236268922
      },
      {
        "end": "2025-01-26",
        "volume": 1.6251674812581358,
        "volumeWow": -3.570886504899795,
        "spendingIndex": 6.906483374497173
      },
      {
        "end": "2025-02-02",
        "volume": 1.8046086087797872,
        "volumeWow": 11.041392938944107,
        "spendingIndex": 7.306035717577291
      },
      {
        "end": "2025-02-09",
        "volume": 1.9512196532653026,
        "volumeWow": 8.124257180876949,
        "spendingIndex": 6.854295340398324
      },
      {
        "end": "2025-02-16",
        "volume": 2.2537214758187147,
        "volumeWow": 15.503217285003522,
        "spendingIndex": 7.485970794970939
      },
      {
        "end": "2025-02-23",
        "volume": 2.2711386388727473,
        "volumeWow": 0.7728179032284954,
        "spendingIndex": 8.669237694401279
      },
      {
        "end": "2025-03-02",
        "volume": 2.901858750369194,
        "volumeWow": 27.771096871897583,
        "spendingIndex": 9.734530942794565
      },
      {
        "end": "2025-03-09",
        "volume": 2.6043402486285587,
        "volumeWow": -10.252687237198677,
        "spendingIndex": 10.333567169321302
      },
      {
        "end": "2025-03-16",
        "volume": 2.5735784796485976,
        "volumeWow": -1.1811731971719253,
        "spendingIndex": 9.724646240872833
      },
      {
        "end": "2025-03-23",
        "volume": 2.6151180804816208,
        "volumeWow": 1.6140794291493732,
        "spendingIndex": 11.289708187756375
      },
      {
        "end": "2025-03-30",
        "volume": 2.590390860155557,
        "volumeWow": -0.9455489031497066,
        "spendingIndex": 12.016389095696832
      },
      {
        "end": "2025-04-06",
        "volume": 2.8752130455408538,
        "volumeWow": 10.995336254706856,
        "spendingIndex": 12.744478013499867
      },
      {
        "end": "2025-04-13",
        "volume": 2.6441139645173166,
        "volumeWow": -8.03763329405962,
        "spendingIndex": 12.239573305335933
      },
      {
        "end": "2025-04-20",
        "volume": 2.5778517995803085,
        "volumeWow": -2.5060253009595357,
        "spendingIndex": 11.733366048882713
      },
      {
        "end": "2025-04-27",
        "volume": 3.3962078066282584,
        "volumeWow": 31.74565765111803,
        "spendingIndex": 14.382331546131457
      },
      {
        "end": "2025-05-04",
        "volume": 3.286609007374632,
        "volumeWow": -3.2270934375607574,
        "spendingIndex": 14.078878020555369
      },
      {
        "end": "2025-05-11",
        "volume": 3.4322242116982475,
        "volumeWow": 4.430560617246471,
        "spendingIndex": 13.980906162746676
      },
      {
        "end": "2025-05-18",
        "volume": 3.6484432829284454,
        "volumeWow": 6.299677931681913,
        "spendingIndex": 14.742161063779456
      },
      {
        "end": "2025-05-25",
        "volume": 3.870106424699071,
        "volumeWow": 6.075553998819627,
        "spendingIndex": 14.816919991701571
      },
      {
        "end": "2025-06-01",
        "volume": 3.7395666393320846,
        "volumeWow": -3.3730283108981074,
        "spendingIndex": 15.033975421726623
      },
      {
        "end": "2025-06-08",
        "volume": 4.018557515357736,
        "volumeWow": 7.460513555000636,
        "spendingIndex": 16.20026912933837
      },
      {
        "end": "2025-06-15",
        "volume": 4.034243725409078,
        "volumeWow": 0.3903442962155834,
        "spendingIndex": 16.991105347807018
      },
      {
        "end": "2025-06-22",
        "volume": 4.594826762398952,
        "volumeWow": 13.895616505743735,
        "spendingIndex": 17.39893813365325
      },
      {
        "end": "2025-06-29",
        "volume": 5.200733720026456,
        "volumeWow": 13.186720391416017,
        "spendingIndex": 18.35118543149206
      },
      {
        "end": "2025-07-06",
        "volume": 5.095658046714204,
        "volumeWow": -2.020400946651757,
        "spendingIndex": 18.745517966794793
      },
      {
        "end": "2025-07-13",
        "volume": 6.566029588981948,
        "volumeWow": 28.85538096921305,
        "spendingIndex": 21.549959820808393
      },
      {
        "end": "2025-07-20",
        "volume": 6.981160530470541,
        "volumeWow": 6.322404367248047,
        "spendingIndex": 25.797288885592195
      },
      {
        "end": "2025-07-27",
        "volume": 6.883358968682007,
        "volumeWow": -1.4009355802901524,
        "spendingIndex": 24.280483131859445
      },
      {
        "end": "2025-08-03",
        "volume": 6.717158111869514,
        "volumeWow": -2.4145313003240965,
        "spendingIndex": 23.33560232873636
      },
      {
        "end": "2025-08-10",
        "volume": 6.287735336821169,
        "volumeWow": -6.39292343423532,
        "spendingIndex": 26.58941046917103
      },
      {
        "end": "2025-08-17",
        "volume": 6.715702237940093,
        "volumeWow": 6.8063758761081505,
        "spendingIndex": 26.729716147459662
      },
      {
        "end": "2025-08-24",
        "volume": 7.526195732197374,
        "volumeWow": 12.068633562673913,
        "spendingIndex": 27.05531258939104
      },
      {
        "end": "2025-08-31",
        "volume": 8.987075845873866,
        "volumeWow": 19.41060484816768,
        "spendingIndex": 27.44058109133482
      },
      {
        "end": "2025-09-07",
        "volume": 8.827198593155584,
        "volumeWow": -1.7789685483925677,
        "spendingIndex": 28.520431906874222
      },
      {
        "end": "2025-09-14",
        "volume": 9.242224569474365,
        "volumeWow": 4.701672585463101,
        "spendingIndex": 29.37271819899584
      },
      {
        "end": "2025-09-21",
        "volume": 11.251780604613513,
        "volumeWow": 21.74320716871996,
        "spendingIndex": 35.254309529460464
      },
      {
        "end": "2025-09-28",
        "volume": 11.009389592257378,
        "volumeWow": -2.1542458111629803,
        "spendingIndex": 36.24497184405744
      },
      {
        "end": "2025-10-05",
        "volume": 13.598664172119577,
        "volumeWow": 23.518784199290856,
        "spendingIndex": 43.48127479872194
      },
      {
        "end": "2025-10-12",
        "volume": 15.167110263534813,
        "volumeWow": 11.533824731335862,
        "spendingIndex": 50.88207955982108
      },
      {
        "end": "2025-10-19",
        "volume": 15.377317522478132,
        "volumeWow": 1.385941390883838,
        "spendingIndex": 50.79565910883224
      },
      {
        "end": "2025-10-26",
        "volume": 15.154584655385596,
        "volumeWow": -1.4484507246920741,
        "spendingIndex": 49.613842748488736
      },
      {
        "end": "2025-11-02",
        "volume": 15.817684636798127,
        "volumeWow": 4.375573441908087,
        "spendingIndex": 51.31446172665771
      },
      {
        "end": "2025-11-09",
        "volume": 17.03097193187261,
        "volumeWow": 7.670448127736096,
        "spendingIndex": 54.40267265224056
      },
      {
        "end": "2025-11-16",
        "volume": 16.796473373284076,
        "volumeWow": -1.3768947510839458,
        "spendingIndex": 53.46299608833267
      },
      {
        "end": "2025-11-23",
        "volume": 16.51249985396768,
        "volumeWow": -1.6906734705874449,
        "spendingIndex": 54.363630035685276
      },
      {
        "end": "2025-11-30",
        "volume": 15.488148382207669,
        "volumeWow": -6.20349117831408,
        "spendingIndex": 51.18656852296877
      },
      {
        "end": "2025-12-07",
        "volume": 19.61431975972282,
        "volumeWow": 26.640830625403723,
        "spendingIndex": 63.73504705703954
      },
      {
        "end": "2025-12-14",
        "volume": 19.53313730884464,
        "volumeWow": -0.413893787154862,
        "spendingIndex": 63.465404647103135
      },
      {
        "end": "2025-12-21",
        "volume": 18.64572358295059,
        "volumeWow": -4.543119273995099,
        "spendingIndex": 57.339435406320334
      },
      {
        "end": "2025-12-28",
        "volume": 13.052224538924659,
        "volumeWow": -29.998830665603972,
        "spendingIndex": 37.80846712602772
      },
      {
        "end": "2026-01-04",
        "volume": 13.114482121769209,
        "volumeWow": 0.47698829160411904,
        "spendingIndex": 36.22318144310739
      },
      {
        "end": "2026-01-11",
        "volume": 19.627257559718625,
        "volumeWow": 49.660942593673774,
        "spendingIndex": 58.61782422915522
      },
      {
        "end": "2026-01-18",
        "volume": 21.806031541385636,
        "volumeWow": 11.100756053349748,
        "spendingIndex": 65.46718840939585
      },
      {
        "end": "2026-01-25",
        "volume": 23.71463884358457,
        "volumeWow": 8.752657715717739,
        "spendingIndex": 72.9732133710928
      },
      {
        "end": "2026-02-01",
        "volume": 26.378691201019343,
        "volumeWow": 11.233788441840309,
        "spendingIndex": 82.5776075248589
      },
      {
        "end": "2026-02-08",
        "volume": 28.905076829280247,
        "volumeWow": 9.57737292198666,
        "spendingIndex": 91.05169538607454
      },
      {
        "end": "2026-02-15",
        "volume": 30.76207167925076,
        "volumeWow": 6.424459138919891,
        "spendingIndex": 104.32936028066086
      },
      {
        "end": "2026-02-22",
        "volume": 31.271458768840073,
        "volumeWow": 1.6558933185663705,
        "spendingIndex": 108.81026496713547
      },
      {
        "end": "2026-03-01",
        "volume": 38.01899808179543,
        "volumeWow": 21.57730908184825,
        "spendingIndex": 133.6599890344984
      },
      {
        "end": "2026-03-08",
        "volume": 42.99594286058787,
        "volumeWow": 13.09067842367877,
        "spendingIndex": 142.58572673897936
      },
      {
        "end": "2026-03-15",
        "volume": 44.037070255295035,
        "volumeWow": 2.421454968630332,
        "spendingIndex": 150.2996727662156
      },
      {
        "end": "2026-03-22",
        "volume": 43.83609505862358,
        "volumeWow": -0.45637731008523197,
        "spendingIndex": 137.1138491779671
      },
      {
        "end": "2026-03-29",
        "volume": 47.28867464767171,
        "volumeWow": 7.87611119200029,
        "spendingIndex": 134.97821593524455
      },
      {
        "end": "2026-04-05",
        "volume": 48.3485377998702,
        "volumeWow": 2.241262120571341,
        "spendingIndex": 135.89853138768004
      },
      {
        "end": "2026-04-12",
        "volume": 51.58893317956961,
        "volumeWow": 6.702157970345302,
        "spendingIndex": 138.67103097393164
      },
      {
        "end": "2026-04-19",
        "volume": 58.54521223013465,
        "volumeWow": 13.484052919551148,
        "spendingIndex": 147.114157155496
      },
      {
        "end": "2026-04-26",
        "volume": 66.82010603465291,
        "volumeWow": 14.134193880774703,
        "spendingIndex": 161.95373062450514
      },
      {
        "end": "2026-05-03",
        "volume": 69.83356832545458,
        "volumeWow": 4.509813691763509,
        "spendingIndex": 170.16575581551558
      },
      {
        "end": "2026-05-10",
        "volume": 73.13936758778686,
        "volumeWow": 4.733825496251076,
        "spendingIndex": 174.86535063693134
      },
      {
        "end": "2026-05-17",
        "volume": 77.81916598631061,
        "volumeWow": 6.398467135919295,
        "spendingIndex": 194.86200155841118
      },
      {
        "end": "2026-05-24",
        "volume": 81.64999897318192,
        "volumeWow": 4.922737141060085,
        "spendingIndex": 193.97884005357548
      },
      {
        "end": "2026-05-31",
        "volume": 78.73909935049332,
        "volumeWow": -3.5650945000558987,
        "spendingIndex": 187.9039423206499
      },
      {
        "end": "2026-06-07",
        "volume": 92.27041582771776,
        "volumeWow": 17.185002862417996,
        "spendingIndex": 217.34716294264086
      },
      {
        "end": "2026-06-14",
        "volume": 91.6509872511653,
        "volumeWow": -0.6713187222533112,
        "spendingIndex": 222.6142697560615
      },
      {
        "end": "2026-06-21",
        "volume": 91.22452013680221,
        "volumeWow": -0.4653164435581947,
        "spendingIndex": 211.70096336841618
      },
      {
        "end": "2026-06-28",
        "volume": 104.40707210040576,
        "volumeWow": 14.450667368635873,
        "spendingIndex": 229.87964401408195
      },
      {
        "end": "2026-07-05",
        "volume": 92.50202911663175,
        "volumeWow": -11.402525465253177,
        "spendingIndex": 214.73756618310972
      },
      {
        "end": "2026-07-12",
        "volume": 120.28518255018798,
        "volumeWow": 30.035182686128614,
        "spendingIndex": 289.3951614175587
      },
      {
        "end": "2026-07-19",
        "volume": 122.36403701190129,
        "volumeWow": 1.7282714442786284,
        "spendingIndex": 295.6155101057903
      },
      {
        "end": "2026-07-26",
        "volume": 130.62813301366944,
        "volumeWow": 6.753696758929562,
        "spendingIndex": 329.0024293108287
      },
      {
        "end": "2026-08-02",
        "volume": 150.38301056324482,
        "volumeWow": 15.122988512365975,
        "spendingIndex": 346.59615938057703
      },
      {
        "end": "2026-08-09",
        "volume": 156.46043910553684,
        "volumeWow": 4.041299957707722,
        "spendingIndex": 336.0721522481549
      },
      {
        "end": "2026-08-16",
        "volume": 160.03294681598388,
        "volumeWow": 2.283329722753291,
        "spendingIndex": 323.28682712197786
      },
      {
        "end": "2026-08-23",
        "volume": 165.20339211765085,
        "volumeWow": 3.230863021982766,
        "spendingIndex": 317.48144687050495
      },
      {
        "end": "2026-08-30",
        "volume": 171.35291674423402,
        "volumeWow": 3.722396100803871,
        "spendingIndex": 304.4601555864221
      },
      {
        "end": "2026-09-06",
        "volume": 176.36739432038453,
        "volumeWow": 2.926403396818311,
        "spendingIndex": 310.27399065600724
      },
      {
        "end": "2026-09-13",
        "volume": 164.36647561788095,
        "volumeWow": -6.804499634837846,
        "spendingIndex": 292.50340844226065
      },
      {
        "end": "2026-09-20",
        "volume": 191.87286083202596,
        "volumeWow": 16.734790419240863,
        "spendingIndex": 341.84512070878
      },
      {
        "end": "2026-09-27",
        "volume": 204.04490207383884,
        "volumeWow": 6.343805574707528,
        "spendingIndex": 332.22786001953824
      },
      {
        "end": "2026-10-04",
        "volume": 220.47412215619946,
        "volumeWow": 8.051766996077792,
        "spendingIndex": 314.9603480181586
      },
      {
        "end": "2026-10-11",
        "volume": 236.21245143346266,
        "volumeWow": 7.138402059772386,
        "spendingIndex": 319.70454825757616
      },
      {
        "end": "2026-10-18",
        "volume": 245.74502694768375,
        "volumeWow": 4.035593998695819,
        "spendingIndex": 309.9573845765072
      },
      {
        "end": "2026-10-25",
        "volume": 259.0485977779537,
        "volumeWow": 5.413566653009894,
        "spendingIndex": 306.49439470410243
      },
      {
        "end": "2026-11-01",
        "volume": 284.5026333998306,
        "volumeWow": 9.825969273802082,
        "spendingIndex": 348.1578531420918
      }
    ],
    "blendedPriceDaily": [
      {
        "date": "2025-01-07",
        "value": 0.8100836510335078
      },
      {
        "date": "2025-01-08",
        "value": 0.8834095055807178
      },
      {
        "date": "2025-01-09",
        "value": 0.9070661756674256
      },
      {
        "date": "2025-01-10",
        "value": 0.91868824087665
      },
      {
        "date": "2025-01-11",
        "value": 0.9281617216853657
      },
      {
        "date": "2025-01-12",
        "value": 0.94671423881862
      },
      {
        "date": "2025-01-13",
        "value": 0.9603451118724188
      },
      {
        "date": "2025-01-14",
        "value": 0.9718473958538332
      },
      {
        "date": "2025-01-15",
        "value": 0.9668396853892763
      },
      {
        "date": "2025-01-16",
        "value": 0.9650420950425909
      },
      {
        "date": "2025-01-17",
        "value": 0.9616446916350203
      },
      {
        "date": "2025-01-18",
        "value": 0.9723724443255662
      },
      {
        "date": "2025-01-19",
        "value": 0.9880592298810601
      },
      {
        "date": "2025-01-20",
        "value": 1.030249225332146
      },
      {
        "date": "2025-01-21",
        "value": 1.079760060005512
      },
      {
        "date": "2025-01-22",
        "value": 1.121544753127834
      },
      {
        "date": "2025-01-23",
        "value": 1.143296384902755
      },
      {
        "date": "2025-01-24",
        "value": 1.203615233218455
      },
      {
        "date": "2025-01-25",
        "value": 1.218188000448887
      },
      {
        "date": "2025-01-26",
        "value": 1.230884147450157
      },
      {
        "date": "2025-01-27",
        "value": 1.229398897318475
      },
      {
        "date": "2025-01-28",
        "value": 1.216497229366655
      },
      {
        "date": "2025-01-29",
        "value": 1.193946483843265
      },
      {
        "date": "2025-01-30",
        "value": 1.202840507842135
      },
      {
        "date": "2025-01-31",
        "value": 1.202363056210571
      },
      {
        "date": "2025-02-01",
        "value": 1.22132182468173
      },
      {
        "date": "2025-02-02",
        "value": 1.198954119450093
      },
      {
        "date": "2025-02-03",
        "value": 1.171357119106008
      },
      {
        "date": "2025-02-04",
        "value": 1.142495092393701
      },
      {
        "date": "2025-02-05",
        "value": 1.142356306824795
      },
      {
        "date": "2025-02-06",
        "value": 1.147969650110637
      },
      {
        "date": "2025-02-07",
        "value": 1.109936900531143
      },
      {
        "date": "2025-02-08",
        "value": 1.075179739330246
      },
      {
        "date": "2025-02-09",
        "value": 1.067425738356119
      },
      {
        "date": "2025-02-10",
        "value": 1.06216444173938
      },
      {
        "date": "2025-02-11",
        "value": 1.050131313778928
      },
      {
        "date": "2025-02-12",
        "value": 1.023356119523081
      },
      {
        "date": "2025-02-13",
        "value": 0.9818604226446698
      },
      {
        "date": "2025-02-14",
        "value": 0.9703924027333518
      },
      {
        "date": "2025-02-15",
        "value": 0.9754173493001461
      },
      {
        "date": "2025-02-16",
        "value": 0.9922045996288185
      },
      {
        "date": "2025-02-17",
        "value": 1.018150442258819
      },
      {
        "date": "2025-02-18",
        "value": 1.047731534348988
      },
      {
        "date": "2025-02-19",
        "value": 1.087149603315617
      },
      {
        "date": "2025-02-20",
        "value": 1.110552214865376
      },
      {
        "date": "2025-02-21",
        "value": 1.138908048920476
      },
      {
        "date": "2025-02-22",
        "value": 1.138895079291953
      },
      {
        "date": "2025-02-23",
        "value": 1.131960245952024
      },
      {
        "date": "2025-02-24",
        "value": 1.12314915894284
      },
      {
        "date": "2025-02-25",
        "value": 1.052275573468764
      },
      {
        "date": "2025-02-26",
        "value": 0.9864095164156492
      },
      {
        "date": "2025-02-27",
        "value": 0.9797582710830551
      },
      {
        "date": "2025-02-28",
        "value": 0.9842703062603938
      },
      {
        "date": "2025-03-01",
        "value": 0.9924513023252515
      },
      {
        "date": "2025-03-02",
        "value": 1.005927558847449
      },
      {
        "date": "2025-03-03",
        "value": 1.006911441836838
      },
      {
        "date": "2025-03-04",
        "value": 1.07634966566644
      },
      {
        "date": "2025-03-05",
        "value": 1.161894522016265
      },
      {
        "date": "2025-03-06",
        "value": 1.196215028444428
      },
      {
        "date": "2025-03-07",
        "value": 1.190452953924912
      },
      {
        "date": "2025-03-08",
        "value": 1.187849525969266
      },
      {
        "date": "2025-03-09",
        "value": 1.187507611581567
      },
      {
        "date": "2025-03-10",
        "value": 1.187624224075718
      },
      {
        "date": "2025-03-11",
        "value": 1.155481364052214
      },
      {
        "date": "2025-03-12",
        "value": 1.130218628182807
      },
      {
        "date": "2025-03-13",
        "value": 1.1123680880184
      },
      {
        "date": "2025-03-14",
        "value": 1.104770966488942
      },
      {
        "date": "2025-03-15",
        "value": 1.128944637822
      },
      {
        "date": "2025-03-16",
        "value": 1.135999941323966
      },
      {
        "date": "2025-03-17",
        "value": 1.151462727311698
      },
      {
        "date": "2025-03-18",
        "value": 1.186734142300942
      },
      {
        "date": "2025-03-19",
        "value": 1.218636285416211
      },
      {
        "date": "2025-03-20",
        "value": 1.263220138466332
      },
      {
        "date": "2025-03-21",
        "value": 1.304348162564877
      },
      {
        "date": "2025-03-22",
        "value": 1.297568343036375
      },
      {
        "date": "2025-03-23",
        "value": 1.301841570558166
      },
      {
        "date": "2025-03-24",
        "value": 1.339802500110072
      },
      {
        "date": "2025-03-25",
        "value": 1.381206391345347
      },
      {
        "date": "2025-03-26",
        "value": 1.389992816374177
      },
      {
        "date": "2025-03-27",
        "value": 1.386527608651651
      },
      {
        "date": "2025-03-28",
        "value": 1.384940540250977
      },
      {
        "date": "2025-03-29",
        "value": 1.400101850135582
      },
      {
        "date": "2025-03-30",
        "value": 1.409832843312267
      },
      {
        "date": "2025-03-31",
        "value": 1.393889799050323
      },
      {
        "date": "2025-04-01",
        "value": 1.379867844016137
      },
      {
        "date": "2025-04-02",
        "value": 1.391093462475364
      },
      {
        "date": "2025-04-03",
        "value": 1.371777705751811
      },
      {
        "date": "2025-04-04",
        "value": 1.365469459112056
      },
      {
        "date": "2025-04-05",
        "value": 1.365872742001915
      },
      {
        "date": "2025-04-06",
        "value": 1.364490798546194
      },
      {
        "date": "2025-04-07",
        "value": 1.376302076860198
      },
      {
        "date": "2025-04-08",
        "value": 1.383828802170821
      },
      {
        "date": "2025-04-09",
        "value": 1.376518914955441
      },
      {
        "date": "2025-04-10",
        "value": 1.398646402479455
      },
      {
        "date": "2025-04-11",
        "value": 1.426832857972863
      },
      {
        "date": "2025-04-12",
        "value": 1.435177041104327
      },
      {
        "date": "2025-04-13",
        "value": 1.439416228944961
      },
      {
        "date": "2025-04-14",
        "value": 1.436450529817129
      },
      {
        "date": "2025-04-15",
        "value": 1.437679200421583
      },
      {
        "date": "2025-04-16",
        "value": 1.457969207116423
      },
      {
        "date": "2025-04-17",
        "value": 1.471676493734149
      },
      {
        "date": "2025-04-18",
        "value": 1.447258820199019
      },
      {
        "date": "2025-04-19",
        "value": 1.443826719725465
      },
      {
        "date": "2025-04-20",
        "value": 1.424038402534408
      },
      {
        "date": "2025-04-21",
        "value": 1.384028011363269
      },
      {
        "date": "2025-04-22",
        "value": 1.369669684386979
      },
      {
        "date": "2025-04-23",
        "value": 1.350465245807931
      },
      {
        "date": "2025-04-24",
        "value": 1.333910612661276
      },
      {
        "date": "2025-04-25",
        "value": 1.351355224253805
      },
      {
        "date": "2025-04-26",
        "value": 1.316253274188856
      },
      {
        "date": "2025-04-27",
        "value": 1.324267964467537
      },
      {
        "date": "2025-04-28",
        "value": 1.345529198509869
      },
      {
        "date": "2025-04-29",
        "value": 1.339879427040287
      },
      {
        "date": "2025-04-30",
        "value": 1.346064100161198
      },
      {
        "date": "2025-05-01",
        "value": 1.339265731251267
      },
      {
        "date": "2025-05-02",
        "value": 1.321737493720113
      },
      {
        "date": "2025-05-03",
        "value": 1.334310480331443
      },
      {
        "date": "2025-05-04",
        "value": 1.337537355541857
      },
      {
        "date": "2025-05-05",
        "value": 1.342405755803667
      },
      {
        "date": "2025-05-06",
        "value": 1.329368357019977
      },
      {
        "date": "2025-05-07",
        "value": 1.30603417677553
      },
      {
        "date": "2025-05-08",
        "value": 1.311652222155846
      },
      {
        "date": "2025-05-09",
        "value": 1.298533817468438
      },
      {
        "date": "2025-05-10",
        "value": 1.291229331958667
      },
      {
        "date": "2025-05-11",
        "value": 1.272589912554207
      },
      {
        "date": "2025-05-12",
        "value": 1.25123104931811
      },
      {
        "date": "2025-05-13",
        "value": 1.250621285420311
      },
      {
        "date": "2025-05-14",
        "value": 1.233420732121072
      },
      {
        "date": "2025-05-15",
        "value": 1.236085835206739
      },
      {
        "date": "2025-05-16",
        "value": 1.253836038697489
      },
      {
        "date": "2025-05-17",
        "value": 1.258570371731244
      },
      {
        "date": "2025-05-18",
        "value": 1.267013203747158
      },
      {
        "date": "2025-05-19",
        "value": 1.262540208811121
      },
      {
        "date": "2025-05-20",
        "value": 1.264475952416073
      },
      {
        "date": "2025-05-21",
        "value": 1.248697489325461
      },
      {
        "date": "2025-05-22",
        "value": 1.216040405260928
      },
      {
        "date": "2025-05-23",
        "value": 1.196606029368169
      },
      {
        "date": "2025-05-24",
        "value": 1.200946963727064
      },
      {
        "date": "2025-05-25",
        "value": 1.201210916600729
      },
      {
        "date": "2025-05-26",
        "value": 1.202445858418657
      },
      {
        "date": "2025-05-27",
        "value": 1.19672343712519
      },
      {
        "date": "2025-05-28",
        "value": 1.21447169273333
      },
      {
        "date": "2025-05-29",
        "value": 1.232764253658364
      },
      {
        "date": "2025-05-30",
        "value": 1.261100689460725
      },
      {
        "date": "2025-05-31",
        "value": 1.248815428473422
      },
      {
        "date": "2025-06-01",
        "value": 1.25748155686209
      },
      {
        "date": "2025-06-02",
        "value": 1.279981965788996
      },
      {
        "date": "2025-06-03",
        "value": 1.299282544055854
      },
      {
        "date": "2025-06-04",
        "value": 1.282266796664441
      },
      {
        "date": "2025-06-05",
        "value": 1.285183300232995
      },
      {
        "date": "2025-06-06",
        "value": 1.271439622513097
      },
      {
        "date": "2025-06-07",
        "value": 1.275553705523238
      },
      {
        "date": "2025-06-08",
        "value": 1.261286924234754
      },
      {
        "date": "2025-06-09",
        "value": 1.241628402619791
      },
      {
        "date": "2025-06-10",
        "value": 1.250212101097518
      },
      {
        "date": "2025-06-11",
        "value": 1.301319921594891
      },
      {
        "date": "2025-06-12",
        "value": 1.302444272805075
      },
      {
        "date": "2025-06-13",
        "value": 1.302841102001152
      },
      {
        "date": "2025-06-14",
        "value": 1.307788956075389
      },
      {
        "date": "2025-06-15",
        "value": 1.314347506717695
      },
      {
        "date": "2025-06-16",
        "value": 1.316121340429706
      },
      {
        "date": "2025-06-17",
        "value": 1.29896794457567
      },
      {
        "date": "2025-06-18",
        "value": 1.263680281893595
      },
      {
        "date": "2025-06-19",
        "value": 1.227863126621752
      },
      {
        "date": "2025-06-20",
        "value": 1.198604004006778
      },
      {
        "date": "2025-06-21",
        "value": 1.188652653654516
      },
      {
        "date": "2025-06-22",
        "value": 1.181829632042081
      },
      {
        "date": "2025-06-23",
        "value": 1.168440912174947
      },
      {
        "date": "2025-06-24",
        "value": 1.137558638306738
      },
      {
        "date": "2025-06-25",
        "value": 1.108020087878321
      },
      {
        "date": "2025-06-26",
        "value": 1.120057245192702
      },
      {
        "date": "2025-06-27",
        "value": 1.11890458405705
      },
      {
        "date": "2025-06-28",
        "value": 1.099764363841374
      },
      {
        "date": "2025-06-29",
        "value": 1.098571833992239
      },
      {
        "date": "2025-06-30",
        "value": 1.106611370061437
      },
      {
        "date": "2025-07-01",
        "value": 1.106323930380446
      },
      {
        "date": "2025-07-02",
        "value": 1.128942384597862
      },
      {
        "date": "2025-07-03",
        "value": 1.102458154538641
      },
      {
        "date": "2025-07-04",
        "value": 1.129433111219
      },
      {
        "date": "2025-07-05",
        "value": 1.153937727250619
      },
      {
        "date": "2025-07-06",
        "value": 1.147572893413166
      },
      {
        "date": "2025-07-07",
        "value": 1.134832480399186
      },
      {
        "date": "2025-07-08",
        "value": 1.139348569600455
      },
      {
        "date": "2025-07-09",
        "value": 1.098906509056026
      },
      {
        "date": "2025-07-10",
        "value": 1.137721932993981
      },
      {
        "date": "2025-07-11",
        "value": 1.109420418560937
      },
      {
        "date": "2025-07-12",
        "value": 1.033775979369648
      },
      {
        "date": "2025-07-13",
        "value": 1.023998764377868
      },
      {
        "date": "2025-07-14",
        "value": 1.025849095295989
      },
      {
        "date": "2025-07-15",
        "value": 1.036906108971555
      },
      {
        "date": "2025-07-16",
        "value": 1.060990363785643
      },
      {
        "date": "2025-07-17",
        "value": 1.052441117089811
      },
      {
        "date": "2025-07-18",
        "value": 1.059314144742653
      },
      {
        "date": "2025-07-19",
        "value": 1.126832321280567
      },
      {
        "date": "2025-07-20",
        "value": 1.143051447752265
      },
      {
        "date": "2025-07-21",
        "value": 1.151394624525142
      },
      {
        "date": "2025-07-22",
        "value": 1.123984426622494
      },
      {
        "date": "2025-07-23",
        "value": 1.128878724792557
      },
      {
        "date": "2025-07-24",
        "value": 1.149114071599301
      },
      {
        "date": "2025-07-25",
        "value": 1.145004150062509
      },
      {
        "date": "2025-07-26",
        "value": 1.123866016754052
      },
      {
        "date": "2025-07-27",
        "value": 1.097693100889368
      },
      {
        "date": "2025-07-28",
        "value": 1.074886619072122
      },
      {
        "date": "2025-07-29",
        "value": 1.096118916109609
      },
      {
        "date": "2025-07-30",
        "value": 1.072453969209769
      },
      {
        "date": "2025-07-31",
        "value": 1.031736719955973
      },
      {
        "date": "2025-08-01",
        "value": 1.042581486406221
      },
      {
        "date": "2025-08-02",
        "value": 1.054963539725624
      },
      {
        "date": "2025-08-03",
        "value": 1.08233287007934
      },
      {
        "date": "2025-08-04",
        "value": 1.117516857436199
      },
      {
        "date": "2025-08-05",
        "value": 1.150138117870035
      },
      {
        "date": "2025-08-06",
        "value": 1.211053874895705
      },
      {
        "date": "2025-08-07",
        "value": 1.24964745617145
      },
      {
        "date": "2025-08-08",
        "value": 1.279253938229259
      },
      {
        "date": "2025-08-09",
        "value": 1.303207273307359
      },
      {
        "date": "2025-08-10",
        "value": 1.321408926342402
      },
      {
        "date": "2025-08-11",
        "value": 1.335590893825277
      },
      {
        "date": "2025-08-12",
        "value": 1.331984788697835
      },
      {
        "date": "2025-08-13",
        "value": 1.328341249732593
      },
      {
        "date": "2025-08-14",
        "value": 1.31588623464779
      },
      {
        "date": "2025-08-15",
        "value": 1.301622859722896
      },
      {
        "date": "2025-08-16",
        "value": 1.274228525560676
      },
      {
        "date": "2025-08-17",
        "value": 1.246546177046147
      },
      {
        "date": "2025-08-18",
        "value": 1.220869832311891
      },
      {
        "date": "2025-08-19",
        "value": 1.200236598209773
      },
      {
        "date": "2025-08-20",
        "value": 1.186900140527819
      },
      {
        "date": "2025-08-21",
        "value": 1.185224298946246
      },
      {
        "date": "2025-08-22",
        "value": 1.165078389640617
      },
      {
        "date": "2025-08-23",
        "value": 1.14379934488676
      },
      {
        "date": "2025-08-24",
        "value": 1.127311332642467
      },
      {
        "date": "2025-08-25",
        "value": 1.089695840518369
      },
      {
        "date": "2025-08-26",
        "value": 1.050494619891722
      },
      {
        "date": "2025-08-27",
        "value": 0.991039677862689
      },
      {
        "date": "2025-08-28",
        "value": 0.9690987967503367
      },
      {
        "date": "2025-08-29",
        "value": 0.9598931795169175
      },
      {
        "date": "2025-08-30",
        "value": 0.9624467635003554
      },
      {
        "date": "2025-08-31",
        "value": 0.9564387490212143
      },
      {
        "date": "2025-09-01",
        "value": 0.9547236792935359
      },
      {
        "date": "2025-09-02",
        "value": 0.9621332503309843
      },
      {
        "date": "2025-09-03",
        "value": 0.9931009568917877
      },
      {
        "date": "2025-09-04",
        "value": 0.994681485722365
      },
      {
        "date": "2025-09-05",
        "value": 0.9961909868898395
      },
      {
        "date": "2025-09-06",
        "value": 0.9994788216962005
      },
      {
        "date": "2025-09-07",
        "value": 1.013676555697468
      },
      {
        "date": "2025-09-08",
        "value": 1.023762214508712
      },
      {
        "date": "2025-09-09",
        "value": 1.025243729452209
      },
      {
        "date": "2025-09-10",
        "value": 1.024431177130842
      },
      {
        "date": "2025-09-11",
        "value": 1.030076691897352
      },
      {
        "date": "2025-09-12",
        "value": 1.022244208633684
      },
      {
        "date": "2025-09-13",
        "value": 1.010438265722518
      },
      {
        "date": "2025-09-14",
        "value": 0.992366529620276
      },
      {
        "date": "2025-09-15",
        "value": 1.003125211669566
      },
      {
        "date": "2025-09-16",
        "value": 1.014523720065591
      },
      {
        "date": "2025-09-17",
        "value": 1.014121812314067
      },
      {
        "date": "2025-09-18",
        "value": 0.98165293491616
      },
      {
        "date": "2025-09-19",
        "value": 0.9655876747148024
      },
      {
        "date": "2025-09-20",
        "value": 0.9684893860171186
      },
      {
        "date": "2025-09-21",
        "value": 0.9792845479868485
      },
      {
        "date": "2025-09-22",
        "value": 0.9643947271847128
      },
      {
        "date": "2025-09-23",
        "value": 0.9491004429490898
      },
      {
        "date": "2025-09-24",
        "value": 0.9430302351620772
      },
      {
        "date": "2025-09-25",
        "value": 0.9806107016354814
      },
      {
        "date": "2025-09-26",
        "value": 1.031033689468271
      },
      {
        "date": "2025-09-27",
        "value": 1.040451873108223
      },
      {
        "date": "2025-09-28",
        "value": 1.032843275936057
      },
      {
        "date": "2025-09-29",
        "value": 1.025738466870837
      },
      {
        "date": "2025-09-30",
        "value": 1.0195897131678
      },
      {
        "date": "2025-10-01",
        "value": 1.02559019003692
      },
      {
        "date": "2025-10-02",
        "value": 1.009120429654467
      },
      {
        "date": "2025-10-03",
        "value": 0.9805619313810207
      },
      {
        "date": "2025-10-04",
        "value": 0.98857313181485
      },
      {
        "date": "2025-10-05",
        "value": 1.001892633757386
      },
      {
        "date": "2025-10-06",
        "value": 1.01808591611564
      },
      {
        "date": "2025-10-07",
        "value": 1.029909916349756
      },
      {
        "date": "2025-10-08",
        "value": 1.025365613961133
      },
      {
        "date": "2025-10-09",
        "value": 1.035744855982497
      },
      {
        "date": "2025-10-10",
        "value": 1.044933928156451
      },
      {
        "date": "2025-10-11",
        "value": 1.04210911616354
      },
      {
        "date": "2025-10-12",
        "value": 1.053259157928816
      },
      {
        "date": "2025-10-13",
        "value": 1.058354205939316
      },
      {
        "date": "2025-10-14",
        "value": 1.053675389716887
      },
      {
        "date": "2025-10-15",
        "value": 1.068874783627449
      },
      {
        "date": "2025-10-16",
        "value": 1.073003916089301
      },
      {
        "date": "2025-10-17",
        "value": 1.068763673272364
      },
      {
        "date": "2025-10-18",
        "value": 1.055646359483047
      },
      {
        "date": "2025-10-19",
        "value": 1.035339482897192
      },
      {
        "date": "2025-10-20",
        "value": 1.029121281964114
      },
      {
        "date": "2025-10-21",
        "value": 1.038281569993539
      },
      {
        "date": "2025-10-22",
        "value": 1.024242348625317
      },
      {
        "date": "2025-10-23",
        "value": 1.01942468171686
      },
      {
        "date": "2025-10-24",
        "value": 1.019229753036866
      },
      {
        "date": "2025-10-25",
        "value": 1.023311587405815
      },
      {
        "date": "2025-10-26",
        "value": 1.025338915846293
      },
      {
        "date": "2025-10-27",
        "value": 1.021797816696172
      },
      {
        "date": "2025-10-28",
        "value": 1.018133282281342
      },
      {
        "date": "2025-10-29",
        "value": 1.019295698878871
      },
      {
        "date": "2025-10-30",
        "value": 1.02426413422884
      },
      {
        "date": "2025-10-31",
        "value": 1.023715488055074
      },
      {
        "date": "2025-11-01",
        "value": 1.021970881106716
      },
      {
        "date": "2025-11-02",
        "value": 1.02029284120173
      },
      {
        "date": "2025-11-03",
        "value": 1.020455312352099
      },
      {
        "date": "2025-11-04",
        "value": 1.029143470010109
      },
      {
        "date": "2025-11-05",
        "value": 1.028153308527121
      },
      {
        "date": "2025-11-06",
        "value": 1.026954724101594
      },
      {
        "date": "2025-11-07",
        "value": 1.015109894707512
      },
      {
        "date": "2025-11-08",
        "value": 1.00577523561145
      },
      {
        "date": "2025-11-09",
        "value": 1.004881819292262
      },
      {
        "date": "2025-11-10",
        "value": 1.004557973375989
      },
      {
        "date": "2025-11-11",
        "value": 0.9844395809963405
      },
      {
        "date": "2025-11-12",
        "value": 0.993972544650265
      },
      {
        "date": "2025-11-13",
        "value": 0.9870342598134036
      },
      {
        "date": "2025-11-14",
        "value": 0.9991153397959852
      },
      {
        "date": "2025-11-15",
        "value": 1.007780004337758
      },
      {
        "date": "2025-11-16",
        "value": 1.002218175701265
      },
      {
        "date": "2025-11-17",
        "value": 1.005070780284832
      },
      {
        "date": "2025-11-18",
        "value": 1.02091477583082
      },
      {
        "date": "2025-11-19",
        "value": 1.016015056489065
      },
      {
        "date": "2025-11-20",
        "value": 1.025206425420419
      },
      {
        "date": "2025-11-21",
        "value": 1.026904032897735
      },
      {
        "date": "2025-11-22",
        "value": 1.031631842801607
      },
      {
        "date": "2025-11-23",
        "value": 1.038782030160355
      },
      {
        "date": "2025-11-24",
        "value": 1.042516808740444
      },
      {
        "date": "2025-11-25",
        "value": 1.045883952329627
      },
      {
        "date": "2025-11-26",
        "value": 1.046699597816348
      },
      {
        "date": "2025-11-27",
        "value": 1.042039265778401
      },
      {
        "date": "2025-11-28",
        "value": 1.043228090559703
      },
      {
        "date": "2025-11-29",
        "value": 1.043429854903073
      },
      {
        "date": "2025-11-30",
        "value": 1.043407419939652
      },
      {
        "date": "2025-12-01",
        "value": 1.038616997123152
      },
      {
        "date": "2025-12-02",
        "value": 1.032385012917738
      },
      {
        "date": "2025-12-03",
        "value": 1.041673493552805
      },
      {
        "date": "2025-12-04",
        "value": 1.046083262770519
      },
      {
        "date": "2025-12-05",
        "value": 1.034061141232338
      },
      {
        "date": "2025-12-06",
        "value": 1.02656090124491
      },
      {
        "date": "2025-12-07",
        "value": 1.022970016723442
      },
      {
        "date": "2025-12-08",
        "value": 1.018019680446216
      },
      {
        "date": "2025-12-09",
        "value": 1.012705140129478
      },
      {
        "date": "2025-12-10",
        "value": 1.005936135726136
      },
      {
        "date": "2025-12-11",
        "value": 1.004489891591171
      },
      {
        "date": "2025-12-12",
        "value": 1.020193958881982
      },
      {
        "date": "2025-12-13",
        "value": 1.027489675603094
      },
      {
        "date": "2025-12-14",
        "value": 1.021480276010359
      },
      {
        "date": "2025-12-15",
        "value": 1.024232538042908
      },
      {
        "date": "2025-12-16",
        "value": 1.022924030695374
      },
      {
        "date": "2025-12-17",
        "value": 1.015135118527011
      },
      {
        "date": "2025-12-18",
        "value": 0.9982408227770846
      },
      {
        "date": "2025-12-19",
        "value": 0.9738869072891708
      },
      {
        "date": "2025-12-20",
        "value": 0.9648223996921912
      },
      {
        "date": "2025-12-21",
        "value": 0.9688882904524184
      },
      {
        "date": "2025-12-22",
        "value": 0.9592989289002894
      },
      {
        "date": "2025-12-23",
        "value": 0.9547833957232079
      },
      {
        "date": "2025-12-24",
        "value": 0.9516189946315222
      },
      {
        "date": "2025-12-25",
        "value": 0.9460515787811046
      },
      {
        "date": "2025-12-26",
        "value": 0.949123819807774
      },
      {
        "date": "2025-12-27",
        "value": 0.9315206573172845
      },
      {
        "date": "2025-12-28",
        "value": 0.9163393626868016
      },
      {
        "date": "2025-12-29",
        "value": 0.9043044165265978
      },
      {
        "date": "2025-12-30",
        "value": 0.8848912393210848
      },
      {
        "date": "2025-12-31",
        "value": 0.8568707925603677
      },
      {
        "date": "2026-01-01",
        "value": 0.8411457823414765
      },
      {
        "date": "2026-01-02",
        "value": 0.8439379246223955
      },
      {
        "date": "2026-01-03",
        "value": 0.8598444384366007
      },
      {
        "date": "2026-01-04",
        "value": 0.8736530940777101
      },
      {
        "date": "2026-01-05",
        "value": 0.8935077936746373
      },
      {
        "date": "2026-01-06",
        "value": 0.9131688539262921
      },
      {
        "date": "2026-01-07",
        "value": 0.9381165447508963
      },
      {
        "date": "2026-01-08",
        "value": 0.9547467996582456
      },
      {
        "date": "2026-01-09",
        "value": 0.9460334875835724
      },
      {
        "date": "2026-01-10",
        "value": 0.9419954773322055
      },
      {
        "date": "2026-01-11",
        "value": 0.940896375633066
      },
      {
        "date": "2026-01-12",
        "value": 0.9401817817495423
      },
      {
        "date": "2026-01-13",
        "value": 0.9388167277977808
      },
      {
        "date": "2026-01-14",
        "value": 0.935168935141526
      },
      {
        "date": "2026-01-15",
        "value": 0.9345291580357298
      },
      {
        "date": "2026-01-16",
        "value": 0.9454317693300504
      },
      {
        "date": "2026-01-17",
        "value": 0.9451518276842524
      },
      {
        "date": "2026-01-18",
        "value": 0.9456367875636719
      },
      {
        "date": "2026-01-19",
        "value": 0.940932150116285
      },
      {
        "date": "2026-01-20",
        "value": 0.9440328291549941
      },
      {
        "date": "2026-01-21",
        "value": 0.9480279685584576
      },
      {
        "date": "2026-01-22",
        "value": 0.9536871739712693
      },
      {
        "date": "2026-01-23",
        "value": 0.9656547167876592
      },
      {
        "date": "2026-01-24",
        "value": 0.969762920003441
      },
      {
        "date": "2026-01-25",
        "value": 0.9688294130635164
      },
      {
        "date": "2026-01-26",
        "value": 0.9748519766228246
      },
      {
        "date": "2026-01-27",
        "value": 0.985596058099152
      },
      {
        "date": "2026-01-28",
        "value": 0.9956891043234949
      },
      {
        "date": "2026-01-29",
        "value": 1.003052595732945
      },
      {
        "date": "2026-01-30",
        "value": 0.9962074721274723
      },
      {
        "date": "2026-01-31",
        "value": 1.000204382285868
      },
      {
        "date": "2026-02-01",
        "value": 0.9995093256642319
      },
      {
        "date": "2026-02-02",
        "value": 1.003533133040386
      },
      {
        "date": "2026-02-03",
        "value": 1.004336440973981
      },
      {
        "date": "2026-02-04",
        "value": 0.9978522162611182
      },
      {
        "date": "2026-02-05",
        "value": 0.9944557576822056
      },
      {
        "date": "2026-02-06",
        "value": 0.9964090887820555
      },
      {
        "date": "2026-02-07",
        "value": 0.9952624234703964
      },
      {
        "date": "2026-02-08",
        "value": 1.000152955781035
      },
      {
        "date": "2026-02-09",
        "value": 1.007665269592262
      },
      {
        "date": "2026-02-10",
        "value": 1.024226457992798
      },
      {
        "date": "2026-02-11",
        "value": 1.02495836329295
      },
      {
        "date": "2026-02-12",
        "value": 1.038894106112835
      },
      {
        "date": "2026-02-13",
        "value": 1.052556776677974
      },
      {
        "date": "2026-02-14",
        "value": 1.059282254936543
      },
      {
        "date": "2026-02-15",
        "value": 1.08152973316616
      },
      {
        "date": "2026-02-16",
        "value": 1.07690616967417
      },
      {
        "date": "2026-02-17",
        "value": 1.065282930955862
      },
      {
        "date": "2026-02-18",
        "value": 1.093425202158987
      },
      {
        "date": "2026-02-19",
        "value": 1.107238943807086
      },
      {
        "date": "2026-02-20",
        "value": 1.118846708126968
      },
      {
        "date": "2026-02-21",
        "value": 1.12318677226625
      },
      {
        "date": "2026-02-22",
        "value": 1.117945287009084
      },
      {
        "date": "2026-02-23",
        "value": 1.13906135157292
      },
      {
        "date": "2026-02-24",
        "value": 1.148953419655215
      },
      {
        "date": "2026-02-25",
        "value": 1.143555369743302
      },
      {
        "date": "2026-02-26",
        "value": 1.139430505528414
      },
      {
        "date": "2026-02-27",
        "value": 1.135944975751476
      },
      {
        "date": "2026-02-28",
        "value": 1.136438203409419
      },
      {
        "date": "2026-03-01",
        "value": 1.13590862372413
      },
      {
        "date": "2026-03-02",
        "value": 1.126921268337479
      },
      {
        "date": "2026-03-03",
        "value": 1.122334431205917
      },
      {
        "date": "2026-03-04",
        "value": 1.117007333630343
      },
      {
        "date": "2026-03-05",
        "value": 1.112684766340065
      },
      {
        "date": "2026-03-06",
        "value": 1.100123542373863
      },
      {
        "date": "2026-03-07",
        "value": 1.091367600925964
      },
      {
        "date": "2026-03-08",
        "value": 1.079102132341014
      },
      {
        "date": "2026-03-09",
        "value": 1.072780023572531
      },
      {
        "date": "2026-03-10",
        "value": 1.073585071543151
      },
      {
        "date": "2026-03-11",
        "value": 1.071773135199393
      },
      {
        "date": "2026-03-12",
        "value": 1.068597185077705
      },
      {
        "date": "2026-03-13",
        "value": 1.079124184158513
      },
      {
        "date": "2026-03-14",
        "value": 1.100381899874109
      },
      {
        "date": "2026-03-15",
        "value": 1.120897349046205
      },
      {
        "date": "2026-03-16",
        "value": 1.123970521348298
      },
      {
        "date": "2026-03-17",
        "value": 1.117232534253803
      },
      {
        "date": "2026-03-18",
        "value": 1.111068615085675
      },
      {
        "date": "2026-03-19",
        "value": 1.093128438475393
      },
      {
        "date": "2026-03-20",
        "value": 1.080203968870069
      },
      {
        "date": "2026-03-21",
        "value": 1.058000057833845
      },
      {
        "date": "2026-03-22",
        "value": 1.037885212179848
      },
      {
        "date": "2026-03-23",
        "value": 1.020313768385647
      },
      {
        "date": "2026-03-24",
        "value": 1.002638692188177
      },
      {
        "date": "2026-03-25",
        "value": 0.98889945824039
      },
      {
        "date": "2026-03-26",
        "value": 0.9867966898595502
      },
      {
        "date": "2026-03-27",
        "value": 0.9726469128130683
      },
      {
        "date": "2026-03-28",
        "value": 0.9717171539265742
      },
      {
        "date": "2026-03-29",
        "value": 0.9739807911669244
      },
      {
        "date": "2026-03-30",
        "value": 0.9776915979067928
      },
      {
        "date": "2026-03-31",
        "value": 0.9777997921584615
      },
      {
        "date": "2026-04-01",
        "value": 0.9749902353155632
      },
      {
        "date": "2026-04-02",
        "value": 0.9746984851691551
      },
      {
        "date": "2026-04-03",
        "value": 0.9807187042911675
      },
      {
        "date": "2026-04-04",
        "value": 0.9851419892008361
      },
      {
        "date": "2026-04-05",
        "value": 0.9817539737133956
      },
      {
        "date": "2026-04-06",
        "value": 0.9803921621768419
      },
      {
        "date": "2026-04-07",
        "value": 0.9812360040070784
      },
      {
        "date": "2026-04-08",
        "value": 0.9787573788682395
      },
      {
        "date": "2026-04-09",
        "value": 0.9767143071022529
      },
      {
        "date": "2026-04-10",
        "value": 0.969141018484721
      },
      {
        "date": "2026-04-11",
        "value": 0.9650192206036593
      },
      {
        "date": "2026-04-12",
        "value": 0.9624051520071724
      },
      {
        "date": "2026-04-13",
        "value": 0.9546641939462622
      },
      {
        "date": "2026-04-14",
        "value": 0.9471759007865509
      },
      {
        "date": "2026-04-15",
        "value": 0.9468358549276772
      },
      {
        "date": "2026-04-16",
        "value": 0.9410952683587797
      },
      {
        "date": "2026-04-17",
        "value": 0.9334448218805833
      },
      {
        "date": "2026-04-18",
        "value": 0.9237026670806747
      },
      {
        "date": "2026-04-19",
        "value": 0.9135658784034816
      },
      {
        "date": "2026-04-20",
        "value": 0.900067029209449
      },
      {
        "date": "2026-04-21",
        "value": 0.8934570891611361
      },
      {
        "date": "2026-04-22",
        "value": 0.8834067683513537
      },
      {
        "date": "2026-04-23",
        "value": 0.878883455121306
      },
      {
        "date": "2026-04-24",
        "value": 0.8845351401955776
      },
      {
        "date": "2026-04-25",
        "value": 0.8940355034792757
      },
      {
        "date": "2026-04-26",
        "value": 0.8970903202931768
      },
      {
        "date": "2026-04-27",
        "value": 0.9062249537652893
      },
      {
        "date": "2026-04-28",
        "value": 0.9177622708639102
      },
      {
        "date": "2026-04-29",
        "value": 0.9316225834775189
      },
      {
        "date": "2026-04-30",
        "value": 0.9421174838711049
      },
      {
        "date": "2026-05-01",
        "value": 0.9487900807518868
      },
      {
        "date": "2026-05-02",
        "value": 0.9457618282569941
      },
      {
        "date": "2026-05-03",
        "value": 0.9491501978170411
      },
      {
        "date": "2026-05-04",
        "value": 0.9519971843443809
      },
      {
        "date": "2026-05-05",
        "value": 0.9437218892847454
      },
      {
        "date": "2026-05-06",
        "value": 0.9358814474194519
      },
      {
        "date": "2026-05-07",
        "value": 0.9307858109343521
      },
      {
        "date": "2026-05-08",
        "value": 0.930810020740992
      },
      {
        "date": "2026-05-09",
        "value": 0.9337147440951153
      },
      {
        "date": "2026-05-10",
        "value": 0.9378680879600917
      },
      {
        "date": "2026-05-11",
        "value": 0.9457746056507264
      },
      {
        "date": "2026-05-12",
        "value": 0.9582109631868866
      },
      {
        "date": "2026-05-13",
        "value": 0.9711238011540756
      },
      {
        "date": "2026-05-14",
        "value": 0.9850951308733458
      },
      {
        "date": "2026-05-15",
        "value": 0.9833699903136744
      },
      {
        "date": "2026-05-16",
        "value": 0.9873597896231484
      },
      {
        "date": "2026-05-17",
        "value": 0.9891480581239737
      },
      {
        "date": "2026-05-18",
        "value": 0.9809746019148609
      },
      {
        "date": "2026-05-19",
        "value": 0.9788182155751337
      },
      {
        "date": "2026-05-20",
        "value": 0.9758848405476797
      },
      {
        "date": "2026-05-21",
        "value": 0.965474273008573
      },
      {
        "date": "2026-05-22",
        "value": 0.9666904737936013
      },
      {
        "date": "2026-05-23",
        "value": 0.9598227975762834
      },
      {
        "date": "2026-05-24",
        "value": 0.9528735301919491
      },
      {
        "date": "2026-05-25",
        "value": 0.9474723054585675
      },
      {
        "date": "2026-05-26",
        "value": 0.9393830401004545
      },
      {
        "date": "2026-05-27",
        "value": 0.9331634061052584
      },
      {
        "date": "2026-05-28",
        "value": 0.9432461540860955
      },
      {
        "date": "2026-05-29",
        "value": 0.9473980792594364
      },
      {
        "date": "2026-05-30",
        "value": 0.9495353617077115
      },
      {
        "date": "2026-05-31",
        "value": 0.9541471325576583
      },
      {
        "date": "2026-06-01",
        "value": 0.9666238266651305
      },
      {
        "date": "2026-06-02",
        "value": 0.9728581554999525
      },
      {
        "date": "2026-06-03",
        "value": 0.9721670249339465
      },
      {
        "date": "2026-06-04",
        "value": 0.9649974776989767
      },
      {
        "date": "2026-06-05",
        "value": 0.9519425940995716
      },
      {
        "date": "2026-06-06",
        "value": 0.9575043359224374
      },
      {
        "date": "2026-06-07",
        "value": 0.9530546542848286
      },
      {
        "date": "2026-06-08",
        "value": 0.9433453123865767
      },
      {
        "date": "2026-06-09",
        "value": 0.9500867171377505
      },
      {
        "date": "2026-06-10",
        "value": 0.9671516852655621
      },
      {
        "date": "2026-06-11",
        "value": 0.9796865260214656
      },
      {
        "date": "2026-06-12",
        "value": 1.000879404744238
      },
      {
        "date": "2026-06-13",
        "value": 0.9951435089444522
      },
      {
        "date": "2026-06-14",
        "value": 0.9937863992350037
      },
      {
        "date": "2026-06-15",
        "value": 1.000018964338517
      },
      {
        "date": "2026-06-16",
        "value": 0.9925266287489521
      },
      {
        "date": "2026-06-17",
        "value": 0.9768066803315788
      },
      {
        "date": "2026-06-18",
        "value": 0.9313837248166503
      },
      {
        "date": "2026-06-19",
        "value": 0.9163987282913995
      },
      {
        "date": "2026-06-20",
        "value": 0.9201135417846695
      },
      {
        "date": "2026-06-21",
        "value": 0.9278738823709237
      },
      {
        "date": "2026-06-22",
        "value": 0.9162088833934199
      },
      {
        "date": "2026-06-23",
        "value": 0.9197348757758105
      },
      {
        "date": "2026-06-24",
        "value": 0.9193857750007286
      },
      {
        "date": "2026-06-25",
        "value": 0.9446974712464777
      },
      {
        "date": "2026-06-26",
        "value": 0.9253847337570573
      },
      {
        "date": "2026-06-27",
        "value": 0.901585943095021
      },
      {
        "date": "2026-06-28",
        "value": 0.8810992280245147
      },
      {
        "date": "2026-06-29",
        "value": 0.8829345805299402
      },
      {
        "date": "2026-06-30",
        "value": 0.8808746754137339
      },
      {
        "date": "2026-07-01",
        "value": 0.8820976688916424
      },
      {
        "date": "2026-07-02",
        "value": 0.8939783255490691
      },
      {
        "date": "2026-07-03",
        "value": 0.9135916089944959
      },
      {
        "date": "2026-07-04",
        "value": 0.9389830153180245
      },
      {
        "date": "2026-07-05",
        "value": 0.9611003698634198
      },
      {
        "date": "2026-07-06",
        "value": 0.9671339715699238
      },
      {
        "date": "2026-07-07",
        "value": 0.9661810014045541
      },
      {
        "date": "2026-07-08",
        "value": 0.9763691929307549
      },
      {
        "date": "2026-07-09",
        "value": 0.9795047066972523
      },
      {
        "date": "2026-07-10",
        "value": 0.9835224920123844
      },
      {
        "date": "2026-07-11",
        "value": 0.9933708510140088
      },
      {
        "date": "2026-07-12",
        "value": 1.003416855168964
      },
      {
        "date": "2026-07-13",
        "value": 1.010998370355877
      },
      {
        "date": "2026-07-14",
        "value": 1.017810935672173
      },
      {
        "date": "2026-07-15",
        "value": 1.019303582831956
      },
      {
        "date": "2026-07-16",
        "value": 1.025116599223476
      },
      {
        "date": "2026-07-17",
        "value": 1.02670118935465
      },
      {
        "date": "2026-07-18",
        "value": 1.02394784988928
      },
      {
        "date": "2026-07-19",
        "value": 1.023478201931786
      },
      {
        "date": "2026-07-20",
        "value": 1.031823202203582
      },
      {
        "date": "2026-07-21",
        "value": 1.032766882351477
      },
      {
        "date": "2026-07-22",
        "value": 1.031714893468657
      },
      {
        "date": "2026-07-23",
        "value": 1.037960242473325
      },
      {
        "date": "2026-07-24",
        "value": 1.040449787689801
      },
      {
        "date": "2026-07-25",
        "value": 1.042468349248409
      },
      {
        "date": "2026-07-26",
        "value": 1.047263037958649
      },
      {
        "date": "2026-07-27",
        "value": 1.038447582170585
      },
      {
        "date": "2026-07-28",
        "value": 1.029604022531821
      },
      {
        "date": "2026-07-29",
        "value": 1.024224188956216
      },
      {
        "date": "2026-07-30",
        "value": 1.006785052532692
      },
      {
        "date": "2026-07-31",
        "value": 0.9979982289577546
      },
      {
        "date": "2026-08-01",
        "value": 0.9905589038945112
      },
      {
        "date": "2026-08-02",
        "value": 0.9790393005564658
      },
      {
        "date": "2026-08-03",
        "value": 0.9628324726231745
      },
      {
        "date": "2026-08-04",
        "value": 0.947104804155521
      },
      {
        "date": "2026-08-05",
        "value": 0.9290191917606425
      },
      {
        "date": "2026-08-06",
        "value": 0.9134540812253842
      },
      {
        "date": "2026-08-07",
        "value": 0.9000289948742535
      },
      {
        "date": "2026-08-08",
        "value": 0.8990502644250563
      },
      {
        "date": "2026-08-09",
        "value": 0.9017153393083628
      },
      {
        "date": "2026-08-10",
        "value": 0.8966124150391716
      },
      {
        "date": "2026-08-11",
        "value": 0.8899582290228082
      },
      {
        "date": "2026-08-12",
        "value": 0.8825461858498377
      },
      {
        "date": "2026-08-13",
        "value": 0.8747166466898733
      },
      {
        "date": "2026-08-14",
        "value": 0.8708244977651537
      },
      {
        "date": "2026-08-15",
        "value": 0.8689653004612181
      },
      {
        "date": "2026-08-16",
        "value": 0.8627569217448671
      },
      {
        "date": "2026-08-17",
        "value": 0.8599031840671628
      },
      {
        "date": "2026-08-18",
        "value": 0.8590922256162744
      },
      {
        "date": "2026-08-19",
        "value": 0.8562976065741168
      },
      {
        "date": "2026-08-20",
        "value": 0.8518331591706882
      },
      {
        "date": "2026-08-21",
        "value": 0.8430995450998992
      },
      {
        "date": "2026-08-22",
        "value": 0.8330787601782736
      },
      {
        "date": "2026-08-23",
        "value": 0.8277990660543115
      },
      {
        "date": "2026-08-24",
        "value": 0.813691780705401
      },
      {
        "date": "2026-08-25",
        "value": 0.7980936669313609
      },
      {
        "date": "2026-08-26",
        "value": 0.7859264771133211
      },
      {
        "date": "2026-08-27",
        "value": 0.773741015582065
      },
      {
        "date": "2026-08-28",
        "value": 0.7679335796273893
      },
      {
        "date": "2026-08-29",
        "value": 0.7666835254397979
      },
      {
        "date": "2026-08-30",
        "value": 0.7627752355166821
      },
      {
        "date": "2026-08-31",
        "value": 0.7604377471331274
      },
      {
        "date": "2026-09-01",
        "value": 0.7585762673226941
      },
      {
        "date": "2026-09-02",
        "value": 0.7543972941525094
      },
      {
        "date": "2026-09-03",
        "value": 0.7541715163937683
      },
      {
        "date": "2026-09-04",
        "value": 0.7579467650453225
      },
      {
        "date": "2026-09-05",
        "value": 0.7652322555482789
      },
      {
        "date": "2026-09-06",
        "value": 0.7722244680853442
      },
      {
        "date": "2026-09-07",
        "value": 0.78051202573886
      },
      {
        "date": "2026-09-08",
        "value": 0.7886927602336489
      },
      {
        "date": "2026-09-09",
        "value": 0.7986199998343495
      },
      {
        "date": "2026-09-10",
        "value": 0.8132560614741774
      },
      {
        "date": "2026-09-11",
        "value": 0.8162581215378373
      },
      {
        "date": "2026-09-12",
        "value": 0.8173596869944476
      },
      {
        "date": "2026-09-13",
        "value": 0.817341493599182
      },
      {
        "date": "2026-09-14",
        "value": 0.8173544111008999
      },
      {
        "date": "2026-09-15",
        "value": 0.8218622276725057
      },
      {
        "date": "2026-09-16",
        "value": 0.8276118446342239
      },
      {
        "date": "2026-09-17",
        "value": 0.8282513865876229
      },
      {
        "date": "2026-09-18",
        "value": 0.828909305289946
      },
      {
        "date": "2026-09-19",
        "value": 0.8282319838832302
      },
      {
        "date": "2026-09-20",
        "value": 0.8290220470127442
      },
      {
        "date": "2026-09-21",
        "value": 0.8243012338981671
      },
      {
        "date": "2026-09-22",
        "value": 0.8185652287447545
      },
      {
        "date": "2026-09-23",
        "value": 0.7996512034090615
      },
      {
        "date": "2026-09-24",
        "value": 0.7735936516303114
      },
      {
        "date": "2026-09-25",
        "value": 0.7520204157259861
      },
      {
        "date": "2026-09-26",
        "value": 0.7386206072749149
      },
      {
        "date": "2026-09-27",
        "value": 0.7301687649674609
      },
      {
        "date": "2026-09-28",
        "value": 0.7100299370651164
      },
      {
        "date": "2026-09-29",
        "value": 0.6804352298103068
      },
      {
        "date": "2026-09-30",
        "value": 0.662458482979826
      },
      {
        "date": "2026-10-01",
        "value": 0.6501951398540653
      },
      {
        "date": "2026-10-02",
        "value": 0.6368915624597157
      },
      {
        "date": "2026-10-03",
        "value": 0.630047024674959
      },
      {
        "date": "2026-10-04",
        "value": 0.6224720924969318
      },
      {
        "date": "2026-10-05",
        "value": 0.6117657498511311
      },
      {
        "date": "2026-10-06",
        "value": 0.6073604398610131
      },
      {
        "date": "2026-10-07",
        "value": 0.6003518224907244
      },
      {
        "date": "2026-10-08",
        "value": 0.5947473564071375
      },
      {
        "date": "2026-10-09",
        "value": 0.5907898996471872
      },
      {
        "date": "2026-10-10",
        "value": 0.5912635797624484
      },
      {
        "date": "2026-10-11",
        "value": 0.5898948663374326
      },
      {
        "date": "2026-10-12",
        "value": 0.5894737232674743
      },
      {
        "date": "2026-10-13",
        "value": 0.5835333672173082
      },
      {
        "date": "2026-10-14",
        "value": 0.5744826235471442
      },
      {
        "date": "2026-10-15",
        "value": 0.5686571320497518
      },
      {
        "date": "2026-10-16",
        "value": 0.5625064349479261
      },
      {
        "date": "2026-10-17",
        "value": 0.5574785856785605
      },
      {
        "date": "2026-10-18",
        "value": 0.5518427128861764
      },
      {
        "date": "2026-10-19",
        "value": 0.5444219432644404
      },
      {
        "date": "2026-10-20",
        "value": 0.5385329820591463
      },
      {
        "date": "2026-10-21",
        "value": 0.536139712983141
      },
      {
        "date": "2026-10-22",
        "value": 0.5336300561076014
      },
      {
        "date": "2026-10-23",
        "value": 0.5305377414045146
      },
      {
        "date": "2026-10-24",
        "value": 0.5285180043240318
      },
      {
        "date": "2026-10-25",
        "value": 0.5246366771653515
      },
      {
        "date": "2026-10-26",
        "value": 0.5214487885583707
      },
      {
        "date": "2026-10-27",
        "value": 0.5205711786260889
      },
      {
        "date": "2026-10-28",
        "value": 0.5199475520761031
      },
      {
        "date": "2026-10-29",
        "value": 0.515344959380429
      },
      {
        "date": "2026-10-30",
        "value": 0.5190636802572316
      },
      {
        "date": "2026-10-31",
        "value": 0.5229000275370456
      },
      {
        "date": "2026-11-01",
        "value": 0.5306243944688581
      }
    ]
  },
  "monthlyScoring": [
    {
      "month": "2024-01",
      "windowStart": "2024-01-01",
      "windowEnd": "2024-01-28",
      "silicon": null,
      "ramp": null,
      "rampSpendUsd": null,
      "rampMatchedTokens": null,
      "rampWeeks": 0,
      "rampCoverage": 0,
      "rampSpendingMom": null,
      "rampSpendingYoy": null
    },
    {
      "month": "2024-02",
      "windowStart": "2024-01-29",
      "windowEnd": "2024-02-25",
      "silicon": null,
      "ramp": null,
      "rampSpendUsd": null,
      "rampMatchedTokens": null,
      "rampWeeks": 0,
      "rampCoverage": 0,
      "rampSpendingMom": null,
      "rampSpendingYoy": null
    },
    {
      "month": "2024-03",
      "windowStart": "2024-03-04",
      "windowEnd": "2024-03-31",
      "silicon": null,
      "ramp": null,
      "rampSpendUsd": null,
      "rampMatchedTokens": null,
      "rampWeeks": 0,
      "rampCoverage": 0,
      "rampSpendingMom": null,
      "rampSpendingYoy": null
    },
    {
      "month": "2024-04",
      "windowStart": "2024-04-01",
      "windowEnd": "2024-04-28",
      "silicon": null,
      "ramp": null,
      "rampSpendUsd": null,
      "rampMatchedTokens": null,
      "rampWeeks": 0,
      "rampCoverage": 0,
      "rampSpendingMom": null,
      "rampSpendingYoy": null
    },
    {
      "month": "2024-05",
      "windowStart": "2024-04-29",
      "windowEnd": "2024-05-26",
      "silicon": null,
      "ramp": null,
      "rampSpendUsd": null,
      "rampMatchedTokens": null,
      "rampWeeks": 0,
      "rampCoverage": 0,
      "rampSpendingMom": null,
      "rampSpendingYoy": null
    },
    {
      "month": "2024-06",
      "windowStart": "2024-06-03",
      "windowEnd": "2024-06-30",
      "silicon": null,
      "ramp": null,
      "rampSpendUsd": null,
      "rampMatchedTokens": null,
      "rampWeeks": 0,
      "rampCoverage": 0,
      "rampSpendingMom": null,
      "rampSpendingYoy": null
    },
    {
      "month": "2024-07",
      "windowStart": "2024-07-01",
      "windowEnd": "2024-07-28",
      "silicon": null,
      "ramp": null,
      "rampSpendUsd": null,
      "rampMatchedTokens": null,
      "rampWeeks": 0,
      "rampCoverage": 0,
      "rampSpendingMom": null,
      "rampSpendingYoy": null
    },
    {
      "month": "2024-08",
      "windowStart": "2024-07-29",
      "windowEnd": "2024-08-25",
      "silicon": null,
      "ramp": null,
      "rampSpendUsd": null,
      "rampMatchedTokens": null,
      "rampWeeks": 0,
      "rampCoverage": 0,
      "rampSpendingMom": null,
      "rampSpendingYoy": null
    },
    {
      "month": "2024-09",
      "windowStart": "2024-09-02",
      "windowEnd": "2024-09-29",
      "silicon": null,
      "ramp": null,
      "rampSpendUsd": null,
      "rampMatchedTokens": null,
      "rampWeeks": 0,
      "rampCoverage": 0,
      "rampSpendingMom": null,
      "rampSpendingYoy": null
    },
    {
      "month": "2024-10",
      "windowStart": "2024-09-30",
      "windowEnd": "2024-10-27",
      "silicon": null,
      "ramp": null,
      "rampSpendUsd": null,
      "rampMatchedTokens": null,
      "rampWeeks": 0,
      "rampCoverage": 0,
      "rampSpendingMom": null,
      "rampSpendingYoy": null
    },
    {
      "month": "2024-11",
      "windowStart": "2024-10-28",
      "windowEnd": "2024-11-24",
      "silicon": null,
      "ramp": null,
      "rampSpendUsd": null,
      "rampMatchedTokens": null,
      "rampWeeks": 0,
      "rampCoverage": 0,
      "rampSpendingMom": null,
      "rampSpendingYoy": null
    },
    {
      "month": "2024-12",
      "windowStart": "2024-12-02",
      "windowEnd": "2024-12-29",
      "silicon": null,
      "ramp": null,
      "rampSpendUsd": null,
      "rampMatchedTokens": null,
      "rampWeeks": 0,
      "rampCoverage": 0,
      "rampSpendingMom": null,
      "rampSpendingYoy": null
    },
    {
      "month": "2025-01",
      "windowStart": "2024-12-30",
      "windowEnd": "2025-01-26",
      "silicon": null,
      "ramp": null,
      "rampSpendUsd": null,
      "rampMatchedTokens": null,
      "rampWeeks": 3,
      "rampCoverage": 0.9695948091158189,
      "rampSpendingMom": null,
      "rampSpendingYoy": null
    },
    {
      "month": "2025-02",
      "windowStart": "2025-01-27",
      "windowEnd": "2025-02-23",
      "silicon": null,
      "ramp": 3718594.1290427367,
      "rampSpendUsd": 30.315539547347832,
      "rampMatchedTokens": 8.152419569153636,
      "rampWeeks": 4,
      "rampCoverage": 0.9757292693295366,
      "rampSpendingMom": null,
      "rampSpendingYoy": null
    },
    {
      "month": "2025-03",
      "windowStart": "2025-03-03",
      "windowEnd": "2025-03-30",
      "silicon": null,
      "ramp": 4234552.280017895,
      "rampSpendUsd": 43.36431069364734,
      "rampMatchedTokens": 10.240589282195398,
      "rampWeeks": 4,
      "rampCoverage": 0.9852413577259306,
      "rampSpendingMom": 43.043176341689374,
      "rampSpendingYoy": null
    },
    {
      "month": "2025-04",
      "windowStart": "2025-03-31",
      "windowEnd": "2025-04-27",
      "silicon": null,
      "ramp": 4496005.362600539,
      "rampSpendUsd": 51.099748913849965,
      "rampMatchedTokens": 11.365588960128221,
      "rampWeeks": 4,
      "rampCoverage": 0.9867744972853003,
      "rampSpendingMom": 17.83825938073962,
      "rampSpendingYoy": null
    },
    {
      "month": "2025-05",
      "windowStart": "2025-04-28",
      "windowEnd": "2025-05-25",
      "silicon": null,
      "ramp": 4091789.8231432526,
      "rampSpendUsd": 57.61886523878307,
      "rampMatchedTokens": 14.081579878049824,
      "rampWeeks": 4,
      "rampCoverage": 0.9886828578466944,
      "rampSpendingMom": 12.757628879789241,
      "rampSpendingYoy": null
    },
    {
      "month": "2025-06",
      "windowStart": "2025-06-02",
      "windowEnd": "2025-06-29",
      "silicon": null,
      "ramp": 3899882.9380737506,
      "rampSpendUsd": 68.94149804229069,
      "rampMatchedTokens": 17.67783780616313,
      "rampWeeks": 4,
      "rampCoverage": 0.9896877930777189,
      "rampSpendingMom": 19.650912520724884,
      "rampSpendingYoy": null
    },
    {
      "month": "2025-07",
      "windowStart": "2025-06-30",
      "windowEnd": "2025-07-27",
      "silicon": null,
      "ramp": 3569292.6887092325,
      "rampSpendUsd": 90.37324980505481,
      "rampMatchedTokens": 25.31965229159635,
      "rampWeeks": 4,
      "rampCoverage": 0.9903716953267716,
      "rampSpendingMom": 31.08686693987599,
      "rampSpendingYoy": null
    },
    {
      "month": "2025-08",
      "windowStart": "2025-08-04",
      "windowEnd": "2025-08-31",
      "silicon": null,
      "ramp": 3667727.5307002985,
      "rampSpendUsd": 107.81479022272359,
      "rampMatchedTokens": 29.395528790040174,
      "rampWeeks": 4,
      "rampCoverage": 0.9956170858510034,
      "rampSpendingMom": 19.29945028566764,
      "rampSpendingYoy": null
    },
    {
      "month": "2025-09",
      "windowStart": "2025-09-01",
      "windowEnd": "2025-09-28",
      "silicon": null,
      "ramp": 3219103.136630841,
      "rampSpendUsd": 129.3922631054879,
      "rampMatchedTokens": 40.19512815016908,
      "rampWeeks": 4,
      "rampCoverage": 0.996173075896281,
      "rampSpendingMom": 20.01346275236413,
      "rampSpendingYoy": null
    },
    {
      "month": "2025-10",
      "windowStart": "2025-09-29",
      "windowEnd": "2025-10-26",
      "silicon": null,
      "ramp": 3292925.9536668435,
      "rampSpendUsd": 194.77261527303307,
      "rampMatchedTokens": 59.14879897500995,
      "rampWeeks": 4,
      "rampCoverage": 0.9970885288891811,
      "rampSpendingMom": 50.52879561604344,
      "rampSpendingYoy": null
    },
    {
      "month": "2025-11",
      "windowStart": "2025-11-03",
      "windowEnd": "2025-11-30",
      "silicon": null,
      "ramp": 3249526.958389263,
      "rampSpendUsd": 213.41567948444742,
      "rampMatchedTokens": 65.67592213182748,
      "rampWeeks": 4,
      "rampCoverage": 0.9975144034147679,
      "rampSpendingMom": 9.571707082784942,
      "rampSpendingYoy": null
    },
    {
      "month": "2025-12",
      "windowStart": "2025-12-01",
      "windowEnd": "2025-12-28",
      "silicon": 1.0940451612903226,
      "ramp": 3145209.820268285,
      "rampSpendUsd": 222.34789887201703,
      "rampMatchedTokens": 70.6941385719859,
      "rampWeeks": 4,
      "rampCoverage": 0.9974469061155707,
      "rampSpendingMom": 4.185362298190709,
      "rampSpendingYoy": null
    },
    {
      "month": "2026-01",
      "windowStart": "2025-12-29",
      "windowEnd": "2026-01-25",
      "silicon": 1.548683870967742,
      "ramp": 2986181.303547409,
      "rampSpendUsd": 233.28045315999498,
      "rampMatchedTokens": 78.11998986226035,
      "rampWeeks": 4,
      "rampCoverage": 0.9973300857572548,
      "rampSpendingMom": 4.916868719443435,
      "rampSpendingYoy": null
    },
    {
      "month": "2026-02",
      "windowStart": "2026-01-26",
      "windowEnd": "2026-02-22",
      "silicon": 1.3752035714285713,
      "ramp": 3301638.6057774397,
      "rampSpendUsd": 386.7676265077619,
      "rampMatchedTokens": 117.14414346590468,
      "rampWeeks": 4,
      "rampCoverage": 0.9981427325228717,
      "rampSpendingMom": 65.7951282538439,
      "rampSpendingYoy": 1175.8065080903316
    },
    {
      "month": "2026-03",
      "windowStart": "2026-03-02",
      "windowEnd": "2026-03-29",
      "silicon": 1.488009677419355,
      "ramp": 3174287.036177862,
      "rampSpendUsd": 564.977256460742,
      "rampMatchedTokens": 177.98556022867652,
      "rampWeeks": 4,
      "rampCoverage": 0.998994041312145,
      "rampSpendingMom": 46.07666664402266,
      "rampSpendingYoy": 1202.8623017948912
    },
    {
      "month": "2026-04",
      "windowStart": "2026-03-30",
      "windowEnd": "2026-04-26",
      "silicon": 1.6781533333333334,
      "ramp": 2593613.7626081505,
      "rampSpendUsd": 583.6355051195952,
      "rampMatchedTokens": 225.02791800915207,
      "rampWeeks": 4,
      "rampCoverage": 0.9983929947806869,
      "rampSpendingMom": 3.302477833485984,
      "rampSpendingYoy": 1042.14945772739
    },
    {
      "month": "2026-05",
      "windowStart": "2026-05-04",
      "windowEnd": "2026-05-31",
      "silicon": 1.9452967741935485,
      "ramp": 2417462.4404156706,
      "rampSpendUsd": 751.6096360479044,
      "rampMatchedTokens": 310.908506160149,
      "rampWeeks": 4,
      "rampCoverage": 0.9982755601017513,
      "rampSpendingMom": 28.780656669249225,
      "rampSpendingYoy": 1204.4506047335315
    },
    {
      "month": "2026-06",
      "windowStart": "2026-06-01",
      "windowEnd": "2026-06-28",
      "silicon": 1.7730133333333336,
      "ramp": 2327384.9858904905,
      "rampSpendUsd": 881.5420400812003,
      "rampMatchedTokens": 378.76932498295287,
      "rampWeeks": 4,
      "rampCoverage": 0.9963454916305611,
      "rampSpendingMom": 17.28721902988144,
      "rampSpendingYoy": 1178.6812951764366
    },
    {
      "month": "2026-07",
      "windowStart": "2026-06-29",
      "windowEnd": "2026-07-26",
      "silicon": 1.5534709677419356,
      "ramp": 2428886.7351326384,
      "rampSpendUsd": 1128.7456629832245,
      "rampMatchedTokens": 464.71729070626475,
      "rampWeeks": 4,
      "rampCoverage": 0.9964801814693883,
      "rampSpendingMom": 28.04218195643329,
      "rampSpendingYoy": 1148.9820443749172
    },
    {
      "month": "2026-08",
      "windowStart": "2026-08-03",
      "windowEnd": "2026-08-30",
      "silicon": 1.1023290322580646,
      "ramp": 1968523.2652495033,
      "rampSpendUsd": 1281.3005818270594,
      "rampMatchedTokens": 650.8943046018098,
      "rampWeeks": 4,
      "rampCoverage": 0.996236424908667,
      "rampSpendingMom": 13.515437874697046,
      "rampSpendingYoy": 1088.4274682352495
    },
    {
      "month": "2026-09",
      "windowStart": "2026-08-31",
      "windowEnd": "2026-09-27",
      "silicon": 0.9785299999999999,
      "ramp": 1738395.8812660016,
      "rampSpendUsd": 1276.838344678138,
      "rampMatchedTokens": 734.4922744227106,
      "rampWeeks": 4,
      "rampCoverage": 0.9964338865812178,
      "rampSpendingMom": -0.34825841900100185,
      "rampSpendingYoy": 886.7965162933946
    },
    {
      "month": "2026-10",
      "windowStart": "2026-09-28",
      "windowEnd": "2026-10-25",
      "silicon": 0.9514806451612903,
      "ramp": 1303527.9724106116,
      "rampSpendUsd": 1251.0968423497213,
      "rampMatchedTokens": 959.7775182653506,
      "rampWeeks": 4,
      "rampCoverage": 0.9978897165165812,
      "rampSpendingMom": -2.016034561908886,
      "rampSpendingYoy": 542.3371378958631
    },
    {
      "month": "2026-11",
      "windowStart": "2026-11-02",
      "windowEnd": "2026-11-29",
      "silicon": null,
      "ramp": null,
      "rampSpendUsd": null,
      "rampMatchedTokens": null,
      "rampWeeks": 0,
      "rampCoverage": 0,
      "rampSpendingMom": null,
      "rampSpendingYoy": null
    }
  ],
  "spendingMonthly": [
    {
      "month": "2024-01",
      "windowStart": "2024-01-01",
      "windowEnd": "2024-01-28",
      "silicon": null,
      "ramp": null,
      "rampSpendUsd": null,
      "rampMatchedTokens": null,
      "rampWeeks": 0,
      "rampCoverage": 0,
      "rampSpendingMom": null,
      "rampSpendingYoy": null,
      "openrouterVolume": null,
      "openrouterTotalVolume": null,
      "openrouterPrice": null,
      "openrouterSpendProxy": null,
      "openrouterMatchedSpend": null,
      "openrouterImputedSpend": null,
      "openrouterPriceCoverage": null,
      "openrouterKnownFreeShare": null,
      "openrouterUnmatchedShare": null,
      "openrouterPriceVintages": [],
      "openrouterRepricedHistory": false,
      "rampVolume": null,
      "rampPrice": null,
      "rampVolumeGrowth": null,
      "rampPriceChange": null,
      "rampSpendingGrowth": null,
      "rampInteraction": null,
      "openrouterVolumeGrowth": null,
      "openrouterPriceChange": null,
      "openrouterSpendingGrowth": null,
      "openrouterInteraction": null
    },
    {
      "month": "2024-02",
      "windowStart": "2024-01-29",
      "windowEnd": "2024-02-25",
      "silicon": null,
      "ramp": null,
      "rampSpendUsd": null,
      "rampMatchedTokens": null,
      "rampWeeks": 0,
      "rampCoverage": 0,
      "rampSpendingMom": null,
      "rampSpendingYoy": null,
      "openrouterVolume": null,
      "openrouterTotalVolume": null,
      "openrouterPrice": null,
      "openrouterSpendProxy": null,
      "openrouterMatchedSpend": null,
      "openrouterImputedSpend": null,
      "openrouterPriceCoverage": null,
      "openrouterKnownFreeShare": null,
      "openrouterUnmatchedShare": null,
      "openrouterPriceVintages": [],
      "openrouterRepricedHistory": false,
      "rampVolume": null,
      "rampPrice": null,
      "rampVolumeGrowth": null,
      "rampPriceChange": null,
      "rampSpendingGrowth": null,
      "rampInteraction": null,
      "openrouterVolumeGrowth": null,
      "openrouterPriceChange": null,
      "openrouterSpendingGrowth": null,
      "openrouterInteraction": null
    },
    {
      "month": "2024-03",
      "windowStart": "2024-03-04",
      "windowEnd": "2024-03-31",
      "silicon": null,
      "ramp": null,
      "rampSpendUsd": null,
      "rampMatchedTokens": null,
      "rampWeeks": 0,
      "rampCoverage": 0,
      "rampSpendingMom": null,
      "rampSpendingYoy": null,
      "openrouterVolume": null,
      "openrouterTotalVolume": null,
      "openrouterPrice": null,
      "openrouterSpendProxy": null,
      "openrouterMatchedSpend": null,
      "openrouterImputedSpend": null,
      "openrouterPriceCoverage": null,
      "openrouterKnownFreeShare": null,
      "openrouterUnmatchedShare": null,
      "openrouterPriceVintages": [],
      "openrouterRepricedHistory": false,
      "rampVolume": null,
      "rampPrice": null,
      "rampVolumeGrowth": null,
      "rampPriceChange": null,
      "rampSpendingGrowth": null,
      "rampInteraction": null,
      "openrouterVolumeGrowth": null,
      "openrouterPriceChange": null,
      "openrouterSpendingGrowth": null,
      "openrouterInteraction": null
    },
    {
      "month": "2024-04",
      "windowStart": "2024-04-01",
      "windowEnd": "2024-04-28",
      "silicon": null,
      "ramp": null,
      "rampSpendUsd": null,
      "rampMatchedTokens": null,
      "rampWeeks": 0,
      "rampCoverage": 0,
      "rampSpendingMom": null,
      "rampSpendingYoy": null,
      "openrouterVolume": null,
      "openrouterTotalVolume": null,
      "openrouterPrice": null,
      "openrouterSpendProxy": null,
      "openrouterMatchedSpend": null,
      "openrouterImputedSpend": null,
      "openrouterPriceCoverage": null,
      "openrouterKnownFreeShare": null,
      "openrouterUnmatchedShare": null,
      "openrouterPriceVintages": [],
      "openrouterRepricedHistory": false,
      "rampVolume": null,
      "rampPrice": null,
      "rampVolumeGrowth": null,
      "rampPriceChange": null,
      "rampSpendingGrowth": null,
      "rampInteraction": null,
      "openrouterVolumeGrowth": null,
      "openrouterPriceChange": null,
      "openrouterSpendingGrowth": null,
      "openrouterInteraction": null
    },
    {
      "month": "2024-05",
      "windowStart": "2024-04-29",
      "windowEnd": "2024-05-26",
      "silicon": null,
      "ramp": null,
      "rampSpendUsd": null,
      "rampMatchedTokens": null,
      "rampWeeks": 0,
      "rampCoverage": 0,
      "rampSpendingMom": null,
      "rampSpendingYoy": null,
      "openrouterVolume": null,
      "openrouterTotalVolume": null,
      "openrouterPrice": null,
      "openrouterSpendProxy": null,
      "openrouterMatchedSpend": null,
      "openrouterImputedSpend": null,
      "openrouterPriceCoverage": null,
      "openrouterKnownFreeShare": null,
      "openrouterUnmatchedShare": null,
      "openrouterPriceVintages": [],
      "openrouterRepricedHistory": false,
      "rampVolume": null,
      "rampPrice": null,
      "rampVolumeGrowth": null,
      "rampPriceChange": null,
      "rampSpendingGrowth": null,
      "rampInteraction": null,
      "openrouterVolumeGrowth": null,
      "openrouterPriceChange": null,
      "openrouterSpendingGrowth": null,
      "openrouterInteraction": null
    },
    {
      "month": "2024-06",
      "windowStart": "2024-06-03",
      "windowEnd": "2024-06-30",
      "silicon": null,
      "ramp": null,
      "rampSpendUsd": null,
      "rampMatchedTokens": null,
      "rampWeeks": 0,
      "rampCoverage": 0,
      "rampSpendingMom": null,
      "rampSpendingYoy": null,
      "openrouterVolume": null,
      "openrouterTotalVolume": null,
      "openrouterPrice": null,
      "openrouterSpendProxy": null,
      "openrouterMatchedSpend": null,
      "openrouterImputedSpend": null,
      "openrouterPriceCoverage": null,
      "openrouterKnownFreeShare": null,
      "openrouterUnmatchedShare": null,
      "openrouterPriceVintages": [],
      "openrouterRepricedHistory": false,
      "rampVolume": null,
      "rampPrice": null,
      "rampVolumeGrowth": null,
      "rampPriceChange": null,
      "rampSpendingGrowth": null,
      "rampInteraction": null,
      "openrouterVolumeGrowth": null,
      "openrouterPriceChange": null,
      "openrouterSpendingGrowth": null,
      "openrouterInteraction": null
    },
    {
      "month": "2024-07",
      "windowStart": "2024-07-01",
      "windowEnd": "2024-07-28",
      "silicon": null,
      "ramp": null,
      "rampSpendUsd": null,
      "rampMatchedTokens": null,
      "rampWeeks": 0,
      "rampCoverage": 0,
      "rampSpendingMom": null,
      "rampSpendingYoy": null,
      "openrouterVolume": null,
      "openrouterTotalVolume": null,
      "openrouterPrice": null,
      "openrouterSpendProxy": null,
      "openrouterMatchedSpend": null,
      "openrouterImputedSpend": null,
      "openrouterPriceCoverage": null,
      "openrouterKnownFreeShare": null,
      "openrouterUnmatchedShare": null,
      "openrouterPriceVintages": [],
      "openrouterRepricedHistory": false,
      "rampVolume": null,
      "rampPrice": null,
      "rampVolumeGrowth": null,
      "rampPriceChange": null,
      "rampSpendingGrowth": null,
      "rampInteraction": null,
      "openrouterVolumeGrowth": null,
      "openrouterPriceChange": null,
      "openrouterSpendingGrowth": null,
      "openrouterInteraction": null
    },
    {
      "month": "2024-08",
      "windowStart": "2024-07-29",
      "windowEnd": "2024-08-25",
      "silicon": null,
      "ramp": null,
      "rampSpendUsd": null,
      "rampMatchedTokens": null,
      "rampWeeks": 0,
      "rampCoverage": 0,
      "rampSpendingMom": null,
      "rampSpendingYoy": null,
      "openrouterVolume": null,
      "openrouterTotalVolume": null,
      "openrouterPrice": null,
      "openrouterSpendProxy": null,
      "openrouterMatchedSpend": null,
      "openrouterImputedSpend": null,
      "openrouterPriceCoverage": null,
      "openrouterKnownFreeShare": null,
      "openrouterUnmatchedShare": null,
      "openrouterPriceVintages": [],
      "openrouterRepricedHistory": false,
      "rampVolume": null,
      "rampPrice": null,
      "rampVolumeGrowth": null,
      "rampPriceChange": null,
      "rampSpendingGrowth": null,
      "rampInteraction": null,
      "openrouterVolumeGrowth": null,
      "openrouterPriceChange": null,
      "openrouterSpendingGrowth": null,
      "openrouterInteraction": null
    },
    {
      "month": "2024-09",
      "windowStart": "2024-09-02",
      "windowEnd": "2024-09-29",
      "silicon": null,
      "ramp": null,
      "rampSpendUsd": null,
      "rampMatchedTokens": null,
      "rampWeeks": 0,
      "rampCoverage": 0,
      "rampSpendingMom": null,
      "rampSpendingYoy": null,
      "openrouterVolume": null,
      "openrouterTotalVolume": null,
      "openrouterPrice": null,
      "openrouterSpendProxy": null,
      "openrouterMatchedSpend": null,
      "openrouterImputedSpend": null,
      "openrouterPriceCoverage": null,
      "openrouterKnownFreeShare": null,
      "openrouterUnmatchedShare": null,
      "openrouterPriceVintages": [],
      "openrouterRepricedHistory": false,
      "rampVolume": null,
      "rampPrice": null,
      "rampVolumeGrowth": null,
      "rampPriceChange": null,
      "rampSpendingGrowth": null,
      "rampInteraction": null,
      "openrouterVolumeGrowth": null,
      "openrouterPriceChange": null,
      "openrouterSpendingGrowth": null,
      "openrouterInteraction": null
    },
    {
      "month": "2024-10",
      "windowStart": "2024-09-30",
      "windowEnd": "2024-10-27",
      "silicon": null,
      "ramp": null,
      "rampSpendUsd": null,
      "rampMatchedTokens": null,
      "rampWeeks": 0,
      "rampCoverage": 0,
      "rampSpendingMom": null,
      "rampSpendingYoy": null,
      "openrouterVolume": null,
      "openrouterTotalVolume": null,
      "openrouterPrice": null,
      "openrouterSpendProxy": null,
      "openrouterMatchedSpend": null,
      "openrouterImputedSpend": null,
      "openrouterPriceCoverage": null,
      "openrouterKnownFreeShare": null,
      "openrouterUnmatchedShare": null,
      "openrouterPriceVintages": [],
      "openrouterRepricedHistory": false,
      "rampVolume": null,
      "rampPrice": null,
      "rampVolumeGrowth": null,
      "rampPriceChange": null,
      "rampSpendingGrowth": null,
      "rampInteraction": null,
      "openrouterVolumeGrowth": null,
      "openrouterPriceChange": null,
      "openrouterSpendingGrowth": null,
      "openrouterInteraction": null
    },
    {
      "month": "2024-11",
      "windowStart": "2024-10-28",
      "windowEnd": "2024-11-24",
      "silicon": null,
      "ramp": null,
      "rampSpendUsd": null,
      "rampMatchedTokens": null,
      "rampWeeks": 0,
      "rampCoverage": 0,
      "rampSpendingMom": null,
      "rampSpendingYoy": null,
      "openrouterVolume": null,
      "openrouterTotalVolume": null,
      "openrouterPrice": null,
      "openrouterSpendProxy": null,
      "openrouterMatchedSpend": null,
      "openrouterImputedSpend": null,
      "openrouterPriceCoverage": null,
      "openrouterKnownFreeShare": null,
      "openrouterUnmatchedShare": null,
      "openrouterPriceVintages": [],
      "openrouterRepricedHistory": false,
      "rampVolume": null,
      "rampPrice": null,
      "rampVolumeGrowth": null,
      "rampPriceChange": null,
      "rampSpendingGrowth": null,
      "rampInteraction": null,
      "openrouterVolumeGrowth": null,
      "openrouterPriceChange": null,
      "openrouterSpendingGrowth": null,
      "openrouterInteraction": null
    },
    {
      "month": "2024-12",
      "windowStart": "2024-12-02",
      "windowEnd": "2024-12-29",
      "silicon": null,
      "ramp": null,
      "rampSpendUsd": null,
      "rampMatchedTokens": null,
      "rampWeeks": 0,
      "rampCoverage": 0,
      "rampSpendingMom": null,
      "rampSpendingYoy": null,
      "openrouterVolume": null,
      "openrouterTotalVolume": null,
      "openrouterPrice": null,
      "openrouterSpendProxy": null,
      "openrouterMatchedSpend": null,
      "openrouterImputedSpend": null,
      "openrouterPriceCoverage": null,
      "openrouterKnownFreeShare": null,
      "openrouterUnmatchedShare": null,
      "openrouterPriceVintages": [],
      "openrouterRepricedHistory": false,
      "rampVolume": null,
      "rampPrice": null,
      "rampVolumeGrowth": null,
      "rampPriceChange": null,
      "rampSpendingGrowth": null,
      "rampInteraction": null,
      "openrouterVolumeGrowth": null,
      "openrouterPriceChange": null,
      "openrouterSpendingGrowth": null,
      "openrouterInteraction": null
    },
    {
      "month": "2025-01",
      "windowStart": "2024-12-30",
      "windowEnd": "2025-01-26",
      "silicon": null,
      "ramp": null,
      "rampSpendUsd": null,
      "rampMatchedTokens": null,
      "rampWeeks": 3,
      "rampCoverage": 0.9695948091158189,
      "rampSpendingMom": null,
      "rampSpendingYoy": null,
      "openrouterVolume": null,
      "openrouterTotalVolume": null,
      "openrouterPrice": null,
      "openrouterSpendProxy": null,
      "openrouterMatchedSpend": null,
      "openrouterImputedSpend": null,
      "openrouterPriceCoverage": null,
      "openrouterKnownFreeShare": null,
      "openrouterUnmatchedShare": null,
      "openrouterPriceVintages": [],
      "openrouterRepricedHistory": false,
      "rampVolume": null,
      "rampPrice": null,
      "rampVolumeGrowth": null,
      "rampPriceChange": null,
      "rampSpendingGrowth": null,
      "rampInteraction": null,
      "openrouterVolumeGrowth": null,
      "openrouterPriceChange": null,
      "openrouterSpendingGrowth": null,
      "openrouterInteraction": null
    },
    {
      "month": "2025-02",
      "windowStart": "2025-01-27",
      "windowEnd": "2025-02-23",
      "silicon": null,
      "ramp": 3718594.1290427367,
      "rampSpendUsd": 30.315539547347832,
      "rampMatchedTokens": 8.152419569153636,
      "rampWeeks": 4,
      "rampCoverage": 0.9757292693295366,
      "rampSpendingMom": null,
      "rampSpendingYoy": null,
      "openrouterVolume": 3106295922144,
      "openrouterTotalVolume": 3106295922144,
      "openrouterPrice": 0.4578135039144641,
      "openrouterSpendProxy": 1422104.220311956,
      "openrouterMatchedSpend": 254428.72485735914,
      "openrouterImputedSpend": 1167675.4954545968,
      "openrouterPriceCoverage": 0.16850956670854317,
      "openrouterKnownFreeShare": 0.06667138190493344,
      "openrouterUnmatchedShare": 0.7648190513865234,
      "openrouterPriceVintages": [
        "2026-11-17"
      ],
      "openrouterRepricedHistory": true,
      "rampVolume": 8.152419569153636,
      "rampPrice": 3718594.1290427367,
      "rampVolumeGrowth": null,
      "rampPriceChange": null,
      "rampSpendingGrowth": null,
      "rampInteraction": null,
      "openrouterVolumeGrowth": null,
      "openrouterPriceChange": null,
      "openrouterSpendingGrowth": null,
      "openrouterInteraction": null
    },
    {
      "month": "2025-03",
      "windowStart": "2025-03-03",
      "windowEnd": "2025-03-30",
      "silicon": null,
      "ramp": 4234552.280017895,
      "rampSpendUsd": 43.36431069364734,
      "rampMatchedTokens": 10.240589282195398,
      "rampWeeks": 4,
      "rampCoverage": 0.9852413577259306,
      "rampSpendingMom": 43.043176341689374,
      "rampSpendingYoy": null,
      "openrouterVolume": 5790425193479,
      "openrouterTotalVolume": 5790425193479,
      "openrouterPrice": 0.4366373871517273,
      "openrouterSpendProxy": 2528316.1269782055,
      "openrouterMatchedSpend": 454447.6790753973,
      "openrouterImputedSpend": 2073868.4479028082,
      "openrouterPriceCoverage": 0.1545532732703018,
      "openrouterKnownFreeShare": 0.14234039211303545,
      "openrouterUnmatchedShare": 0.7031063346166627,
      "openrouterPriceVintages": [
        "2026-11-17"
      ],
      "openrouterRepricedHistory": true,
      "rampVolume": 10.240589282195398,
      "rampPrice": 4234552.280017895,
      "rampVolumeGrowth": 25.614109962431076,
      "rampPriceChange": 13.8750864727466,
      "rampSpendingGrowth": 43.043176341689396,
      "rampInteraction": 3.5539799065117137,
      "openrouterVolumeGrowth": 86.40932282724643,
      "openrouterPriceChange": -4.625489764210466,
      "openrouterSpendingGrowth": 77.78697868033811,
      "openrouterInteraction": -3.9968543826978618
    },
    {
      "month": "2025-04",
      "windowStart": "2025-03-31",
      "windowEnd": "2025-04-27",
      "silicon": null,
      "ramp": 4496005.362600539,
      "rampSpendUsd": 51.099748913849965,
      "rampMatchedTokens": 11.365588960128221,
      "rampWeeks": 4,
      "rampCoverage": 0.9867744972853003,
      "rampSpendingMom": 17.83825938073962,
      "rampSpendingYoy": null,
      "openrouterVolume": 7760137033269,
      "openrouterTotalVolume": 7760137033269,
      "openrouterPrice": 0.48889350918741203,
      "openrouterSpendProxy": 3793880.625970074,
      "openrouterMatchedSpend": 881958.6033932293,
      "openrouterImputedSpend": 2911922.022576845,
      "openrouterPriceCoverage": 0.20118816040898133,
      "openrouterKnownFreeShare": 0.17871902652094887,
      "openrouterUnmatchedShare": 0.6200928130700698,
      "openrouterPriceVintages": [
        "2026-11-17"
      ],
      "openrouterRepricedHistory": true,
      "rampVolume": 11.365588960128221,
      "rampPrice": 4496005.362600539,
      "rampVolumeGrowth": 10.985692785167966,
      "rampPriceChange": 6.174279245916869,
      "rampSpendingGrowth": 17.83825938073964,
      "rampInteraction": 0.6782873496548126,
      "openrouterVolumeGrowth": 34.01670471467673,
      "openrouterPriceChange": 11.967853320248611,
      "openrouterSpendingGrowth": 50.05562735955995,
      "openrouterInteraction": 4.071069324634604
    },
    {
      "month": "2025-05",
      "windowStart": "2025-04-28",
      "windowEnd": "2025-05-25",
      "silicon": null,
      "ramp": 4091789.8231432526,
      "rampSpendUsd": 57.61886523878307,
      "rampMatchedTokens": 14.081579878049824,
      "rampWeeks": 4,
      "rampCoverage": 0.9886828578466944,
      "rampSpendingMom": 12.757628879789241,
      "rampSpendingYoy": null,
      "openrouterVolume": 8456197502974,
      "openrouterTotalVolume": 8456197502974,
      "openrouterPrice": 0.5084827973106963,
      "openrouterSpendProxy": 4299830.9609239455,
      "openrouterMatchedSpend": 1372663.2559442138,
      "openrouterImputedSpend": 2927167.7049797317,
      "openrouterPriceCoverage": 0.2999081742186217,
      "openrouterKnownFreeShare": 0.08086542288723818,
      "openrouterUnmatchedShare": 0.6192264028941401,
      "openrouterPriceVintages": [
        "2026-11-17"
      ],
      "openrouterRepricedHistory": true,
      "rampVolume": 14.081579878049824,
      "rampPrice": 4091789.8231432526,
      "rampVolumeGrowth": 23.89661395858682,
      "rampPriceChange": -8.990548428160317,
      "rampSpendingGrowth": 12.757628879789241,
      "rampInteraction": -2.148436650637266,
      "openrouterVolumeGrowth": 8.96969301857522,
      "openrouterPriceChange": 4.006861976106735,
      "openrouterSpendingGrowth": 13.335958213616749,
      "openrouterInteraction": 0.35940321893479094
    },
    {
      "month": "2025-06",
      "windowStart": "2025-06-02",
      "windowEnd": "2025-06-29",
      "silicon": null,
      "ramp": 3899882.9380737506,
      "rampSpendUsd": 68.94149804229069,
      "rampMatchedTokens": 17.67783780616313,
      "rampWeeks": 4,
      "rampCoverage": 0.9896877930777189,
      "rampSpendingMom": 19.650912520724884,
      "rampSpendingYoy": null,
      "openrouterVolume": null,
      "openrouterTotalVolume": null,
      "openrouterPrice": null,
      "openrouterSpendProxy": null,
      "openrouterMatchedSpend": null,
      "openrouterImputedSpend": null,
      "openrouterPriceCoverage": null,
      "openrouterKnownFreeShare": null,
      "openrouterUnmatchedShare": null,
      "openrouterPriceVintages": [],
      "openrouterRepricedHistory": false,
      "rampVolume": 17.67783780616313,
      "rampPrice": 3899882.9380737506,
      "rampVolumeGrowth": 25.538738971463726,
      "rampPriceChange": -4.690047469791159,
      "rampSpendingGrowth": 19.650912520724862,
      "rampInteraction": -1.197778980947703,
      "openrouterVolumeGrowth": null,
      "openrouterPriceChange": null,
      "openrouterSpendingGrowth": null,
      "openrouterInteraction": null
    },
    {
      "month": "2025-07",
      "windowStart": "2025-06-30",
      "windowEnd": "2025-07-27",
      "silicon": null,
      "ramp": 3569292.6887092325,
      "rampSpendUsd": 90.37324980505481,
      "rampMatchedTokens": 25.31965229159635,
      "rampWeeks": 4,
      "rampCoverage": 0.9903716953267716,
      "rampSpendingMom": 31.08686693987599,
      "rampSpendingYoy": null,
      "openrouterVolume": null,
      "openrouterTotalVolume": null,
      "openrouterPrice": null,
      "openrouterSpendProxy": null,
      "openrouterMatchedSpend": null,
      "openrouterImputedSpend": null,
      "openrouterPriceCoverage": null,
      "openrouterKnownFreeShare": null,
      "openrouterUnmatchedShare": null,
      "openrouterPriceVintages": [],
      "openrouterRepricedHistory": false,
      "rampVolume": 25.31965229159635,
      "rampPrice": 3569292.6887092325,
      "rampVolumeGrowth": 43.22821924957931,
      "rampPriceChange": -8.476927503054865,
      "rampSpendingGrowth": 31.08686693987601,
      "rampInteraction": -3.664424806648446,
      "openrouterVolumeGrowth": null,
      "openrouterPriceChange": null,
      "openrouterSpendingGrowth": null,
      "openrouterInteraction": null
    },
    {
      "month": "2025-08",
      "windowStart": "2025-08-04",
      "windowEnd": "2025-08-31",
      "silicon": null,
      "ramp": 3667727.5307002985,
      "rampSpendUsd": 107.81479022272359,
      "rampMatchedTokens": 29.395528790040174,
      "rampWeeks": 4,
      "rampCoverage": 0.9956170858510034,
      "rampSpendingMom": 19.29945028566764,
      "rampSpendingYoy": null,
      "openrouterVolume": 13567542724594,
      "openrouterTotalVolume": 13567542724594,
      "openrouterPrice": 1.1625121303885655,
      "openrouterSpendProxy": 15772432.996905653,
      "openrouterMatchedSpend": 8264569.877341096,
      "openrouterImputedSpend": 7507863.1195645565,
      "openrouterPriceCoverage": 0.4596514477207676,
      "openrouterKnownFreeShare": 0.11935370623183039,
      "openrouterUnmatchedShare": 0.420994846047402,
      "openrouterPriceVintages": [
        "2026-11-17"
      ],
      "openrouterRepricedHistory": true,
      "rampVolume": 29.395528790040174,
      "rampPrice": 3667727.5307002985,
      "rampVolumeGrowth": 16.09767958700057,
      "rampPriceChange": 2.7578248850940623,
      "rampSpendingGrowth": 19.29945028566764,
      "rampInteraction": 0.4439458135730088,
      "openrouterVolumeGrowth": null,
      "openrouterPriceChange": null,
      "openrouterSpendingGrowth": null,
      "openrouterInteraction": null
    },
    {
      "month": "2025-09",
      "windowStart": "2025-09-01",
      "windowEnd": "2025-09-28",
      "silicon": null,
      "ramp": 3219103.136630841,
      "rampSpendUsd": 129.3922631054879,
      "rampMatchedTokens": 40.19512815016908,
      "rampWeeks": 4,
      "rampCoverage": 0.996173075896281,
      "rampSpendingMom": 20.01346275236413,
      "rampSpendingYoy": null,
      "openrouterVolume": 19672552788000,
      "openrouterTotalVolume": 19672552788000,
      "openrouterPrice": 1.079737257909116,
      "openrouterSpendProxy": 21241188.203387454,
      "openrouterMatchedSpend": 8820699.621557117,
      "openrouterImputedSpend": 12420488.58183034,
      "openrouterPriceCoverage": 0.3643596564007349,
      "openrouterKnownFreeShare": 0.12488007350472384,
      "openrouterUnmatchedShare": 0.5107602700945413,
      "openrouterPriceVintages": [
        "2026-11-17"
      ],
      "openrouterRepricedHistory": true,
      "rampVolume": 40.19512815016908,
      "rampPrice": 3219103.136630841,
      "rampVolumeGrowth": 36.73891848405204,
      "rampPriceChange": -12.231671799889654,
      "rampSpendingGrowth": 20.013462752364152,
      "rampInteraction": -4.493783931798241,
      "openrouterVolumeGrowth": 44.997168517032904,
      "openrouterPriceChange": -7.120344839049741,
      "openrouterSpendingGrowth": 34.6728701117621,
      "openrouterInteraction": -3.203953566221067
    },
    {
      "month": "2025-10",
      "windowStart": "2025-09-29",
      "windowEnd": "2025-10-26",
      "silicon": null,
      "ramp": 3292925.9536668435,
      "rampSpendUsd": 194.77261527303307,
      "rampMatchedTokens": 59.14879897500995,
      "rampWeeks": 4,
      "rampCoverage": 0.9970885288891811,
      "rampSpendingMom": 50.52879561604344,
      "rampSpendingYoy": null,
      "openrouterVolume": 19930844524077,
      "openrouterTotalVolume": 19930844524077,
      "openrouterPrice": 1.6064277478260764,
      "openrouterSpendProxy": 32017461.681084704,
      "openrouterMatchedSpend": 16161571.744814694,
      "openrouterImputedSpend": 15855889.93627001,
      "openrouterPriceCoverage": 0.4685028349835782,
      "openrouterKnownFreeShare": 0.07228340143216874,
      "openrouterUnmatchedShare": 0.45921376358425303,
      "openrouterPriceVintages": [
        "2026-11-17"
      ],
      "openrouterRepricedHistory": true,
      "rampVolume": 59.14879897500995,
      "rampPrice": 3292925.9536668435,
      "rampVolumeGrowth": 47.15414951292085,
      "rampPriceChange": 2.2932728124165136,
      "rampSpendingGrowth": 50.52879561604342,
      "rampInteraction": 1.0813732907060478,
      "openrouterVolumeGrowth": 1.3129548506513933,
      "openrouterPriceChange": 48.7795050192936,
      "openrouterSpendingGrowth": 50.73291274721954,
      "openrouterInteraction": 0.6404528772745551
    },
    {
      "month": "2025-11",
      "windowStart": "2025-11-03",
      "windowEnd": "2025-11-30",
      "silicon": null,
      "ramp": 3249526.958389263,
      "rampSpendUsd": 213.41567948444742,
      "rampMatchedTokens": 65.67592213182748,
      "rampWeeks": 4,
      "rampCoverage": 0.9975144034147679,
      "rampSpendingMom": 9.571707082784942,
      "rampSpendingYoy": null,
      "openrouterVolume": 25212639718120,
      "openrouterTotalVolume": 25212639718120,
      "openrouterPrice": 1.6916262373349993,
      "openrouterSpendProxy": 42650362.85964629,
      "openrouterMatchedSpend": 20174051.04441106,
      "openrouterImputedSpend": 22476311.81523523,
      "openrouterPriceCoverage": 0.42132873210985217,
      "openrouterKnownFreeShare": 0.10706223641160557,
      "openrouterUnmatchedShare": 0.4716090314785423,
      "openrouterPriceVintages": [
        "2026-11-17"
      ],
      "openrouterRepricedHistory": true,
      "rampVolume": 65.67592213182748,
      "rampPrice": 3249526.958389263,
      "rampVolumeGrowth": 11.035089925621655,
      "rampPriceChange": -1.3179462851040769,
      "rampSpendingGrowth": 9.571707082784965,
      "rampInteraction": -0.14543655773262484,
      "openrouterVolumeGrowth": 26.500609081880345,
      "openrouterPriceChange": 5.303599220333388,
      "openrouterSpendingGrowth": 33.209694398863945,
      "openrouterInteraction": 1.405486096650205
    },
    {
      "month": "2025-12",
      "windowStart": "2025-12-01",
      "windowEnd": "2025-12-28",
      "silicon": 1.0940451612903226,
      "ramp": 3145209.820268285,
      "rampSpendUsd": 222.34789887201703,
      "rampMatchedTokens": 70.6941385719859,
      "rampWeeks": 4,
      "rampCoverage": 0.9974469061155707,
      "rampSpendingMom": 4.185362298190709,
      "rampSpendingYoy": null,
      "openrouterVolume": 23461885537668,
      "openrouterTotalVolume": 23461885537668,
      "openrouterPrice": 1.7967689065202481,
      "openrouterSpendProxy": 42155586.42241895,
      "openrouterMatchedSpend": 24498425.522140473,
      "openrouterImputedSpend": 17657160.90027848,
      "openrouterPriceCoverage": 0.5191386892444806,
      "openrouterKnownFreeShare": 0.10847223386897306,
      "openrouterUnmatchedShare": 0.37238907688654643,
      "openrouterPriceVintages": [
        "2026-11-17"
      ],
      "openrouterRepricedHistory": true,
      "rampVolume": 70.6941385719859,
      "rampPrice": 3145209.820268285,
      "rampVolumeGrowth": 7.640877017433656,
      "rampPriceChange": -3.2102253483899834,
      "rampSpendingGrowth": 4.185362298190709,
      "rampInteraction": -0.24528937085295976,
      "openrouterVolumeGrowth": -6.943954302388078,
      "openrouterPriceChange": 6.21547874256736,
      "openrouterSpendingGrowth": -1.160075563379237,
      "openrouterInteraction": -0.43160000355852257
    },
    {
      "month": "2026-01",
      "windowStart": "2025-12-29",
      "windowEnd": "2026-01-25",
      "silicon": 1.548683870967742,
      "ramp": 2986181.303547409,
      "rampSpendUsd": 233.28045315999498,
      "rampMatchedTokens": 78.11998986226035,
      "rampWeeks": 4,
      "rampCoverage": 0.9973300857572548,
      "rampSpendingMom": 4.916868719443435,
      "rampSpendingYoy": null,
      "openrouterVolume": 27123177250475,
      "openrouterTotalVolume": 27123177250475,
      "openrouterPrice": 2.0208377655346026,
      "openrouterSpendProxy": 54811540.90904886,
      "openrouterMatchedSpend": 36399545.002535194,
      "openrouterImputedSpend": 18411995.90651367,
      "openrouterPriceCoverage": 0.5857946930604064,
      "openrouterKnownFreeShare": 0.11416013981336844,
      "openrouterUnmatchedShare": 0.3000451671262252,
      "openrouterPriceVintages": [
        "2026-11-17"
      ],
      "openrouterRepricedHistory": true,
      "rampVolume": 78.11998986226035,
      "rampPrice": 2986181.303547409,
      "rampVolumeGrowth": 10.50419658584978,
      "rampPriceChange": -5.056213283325917,
      "rampSpendingGrowth": 4.916868719443457,
      "rampInteraction": -0.531114583080404,
      "openrouterVolumeGrowth": 15.605274805934943,
      "openrouterPriceChange": 12.470655419360654,
      "openrouterSpendingGrowth": 30.02201027358804,
      "openrouterInteraction": 1.9460800482924485
    },
    {
      "month": "2026-02",
      "windowStart": "2026-01-26",
      "windowEnd": "2026-02-22",
      "silicon": 1.3752035714285713,
      "ramp": 3301638.6057774397,
      "rampSpendUsd": 386.7676265077619,
      "rampMatchedTokens": 117.14414346590468,
      "rampWeeks": 4,
      "rampCoverage": 0.9981427325228717,
      "rampSpendingMom": 65.7951282538439,
      "rampSpendingYoy": 1175.8065080903316,
      "openrouterVolume": 45016619210492,
      "openrouterTotalVolume": 45016619210492,
      "openrouterPrice": 1.7597292282936652,
      "openrouterSpendProxy": 79217060.58366887,
      "openrouterMatchedSpend": 59815793.27164266,
      "openrouterImputedSpend": 19401267.312026214,
      "openrouterPriceCoverage": 0.7172311247138882,
      "openrouterKnownFreeShare": 0.05913600757552102,
      "openrouterUnmatchedShare": 0.22363286771059085,
      "openrouterPriceVintages": [
        "2026-11-17"
      ],
      "openrouterRepricedHistory": true,
      "rampVolume": 117.14414346590468,
      "rampPrice": 3301638.6057774397,
      "rampVolumeGrowth": 49.95412015855474,
      "rampPriceChange": 10.56390319821794,
      "rampSpendingGrowth": 65.79512825384388,
      "rampInteraction": 5.2771048970711965,
      "openrouterVolumeGrowth": 65.97103943529933,
      "openrouterPriceChange": -12.92080649392765,
      "openrouterSpendingGrowth": 44.526242593903966,
      "openrouterInteraction": -8.523990347467727
    },
    {
      "month": "2026-03",
      "windowStart": "2026-03-02",
      "windowEnd": "2026-03-29",
      "silicon": 1.488009677419355,
      "ramp": 3174287.036177862,
      "rampSpendUsd": 564.977256460742,
      "rampMatchedTokens": 177.98556022867652,
      "rampWeeks": 4,
      "rampCoverage": 0.998994041312145,
      "rampSpendingMom": 46.07666664402266,
      "rampSpendingYoy": 1202.8623017948912,
      "openrouterVolume": 74600104311721,
      "openrouterTotalVolume": 74600104311721,
      "openrouterPrice": 1.8833545984504971,
      "openrouterSpendProxy": 140498449.5003665,
      "openrouterMatchedSpend": 100329663.59580255,
      "openrouterImputedSpend": 40168785.904563956,
      "openrouterPriceCoverage": 0.6380257813909745,
      "openrouterKnownFreeShare": 0.10664521191578295,
      "openrouterUnmatchedShare": 0.2553290066932425,
      "openrouterPriceVintages": [
        "2026-11-17"
      ],
      "openrouterRepricedHistory": true,
      "rampVolume": 177.98556022867652,
      "rampPrice": 3174287.036177862,
      "rampVolumeGrowth": 51.93722448487576,
      "rampPriceChange": -3.8572231793246203,
      "rampSpendingGrowth": 46.07666664402266,
      "rampInteraction": -2.00333466152849,
      "openrouterVolumeGrowth": 65.71680774804607,
      "openrouterPriceChange": 7.025249576419568,
      "openrouterSpendingGrowth": 77.3588270824217,
      "openrouterInteraction": 4.616769757956067
    },
    {
      "month": "2026-04",
      "windowStart": "2026-03-30",
      "windowEnd": "2026-04-26",
      "silicon": 1.6781533333333334,
      "ramp": 2593613.7626081505,
      "rampSpendUsd": 583.6355051195952,
      "rampMatchedTokens": 225.02791800915207,
      "rampWeeks": 4,
      "rampCoverage": 0.9983929947806869,
      "rampSpendingMom": 3.302477833485984,
      "rampSpendingYoy": 1042.14945772739,
      "openrouterVolume": 90348944984078,
      "openrouterTotalVolume": 90348944984078,
      "openrouterPrice": 1.9467332404756927,
      "openrouterSpendProxy": 175885294.44241425,
      "openrouterMatchedSpend": 129097867.29211491,
      "openrouterImputedSpend": 46787427.15029935,
      "openrouterPriceCoverage": 0.6233890774468214,
      "openrouterKnownFreeShare": 0.15080834434547266,
      "openrouterUnmatchedShare": 0.225802578207706,
      "openrouterPriceVintages": [
        "2026-11-17"
      ],
      "openrouterRepricedHistory": true,
      "rampVolume": 225.02791800915207,
      "rampPrice": 2593613.7626081505,
      "rampVolumeGrowth": 26.430434985869276,
      "rampPriceChange": -18.293029803281314,
      "rampSpendingGrowth": 3.302477833486006,
      "rampInteraction": -4.8349273491019575,
      "openrouterVolumeGrowth": 21.111016958568207,
      "openrouterPriceChange": 3.365199632471727,
      "openrouterSpendingGrowth": 25.186644456140716,
      "openrouterInteraction": 0.7104278651007813
    },
    {
      "month": "2026-05",
      "windowStart": "2026-05-04",
      "windowEnd": "2026-05-31",
      "silicon": 1.9452967741935485,
      "ramp": 2417462.4404156706,
      "rampSpendUsd": 751.6096360479044,
      "rampMatchedTokens": 310.908506160149,
      "rampWeeks": 4,
      "rampCoverage": 0.9982755601017513,
      "rampSpendingMom": 28.780656669249225,
      "rampSpendingYoy": 1204.4506047335315,
      "openrouterVolume": 113365423650400,
      "openrouterTotalVolume": 113365423650400,
      "openrouterPrice": 2.0802170177208312,
      "openrouterSpendProxy": 235824683.49869367,
      "openrouterMatchedSpend": 193640128.5923117,
      "openrouterImputedSpend": 42184554.90638198,
      "openrouterPriceCoverage": 0.7620527182969441,
      "openrouterKnownFreeShare": 0.07136685440168117,
      "openrouterUnmatchedShare": 0.16658042730137468,
      "openrouterPriceVintages": [
        "2026-11-17"
      ],
      "openrouterRepricedHistory": true,
      "rampVolume": 310.908506160149,
      "rampPrice": 2417462.4404156706,
      "rampVolumeGrowth": 38.164414847185355,
      "rampPriceChange": -6.79173301483954,
      "rampSpendingGrowth": 28.780656669249204,
      "rampInteraction": -2.5920251630966114,
      "openrouterVolumeGrowth": 25.475094004006515,
      "openrouterPriceChange": 6.856808856488272,
      "openrouterSpendingGrowth": 34.07868136236023,
      "openrouterInteraction": 1.7467785018654314
    },
    {
      "month": "2026-06",
      "windowStart": "2026-06-01",
      "windowEnd": "2026-06-28",
      "silicon": 1.7730133333333336,
      "ramp": 2327384.9858904905,
      "rampSpendUsd": 881.5420400812003,
      "rampMatchedTokens": 378.76932498295287,
      "rampWeeks": 4,
      "rampCoverage": 0.9963454916305611,
      "rampSpendingMom": 17.28721902988144,
      "rampSpendingYoy": 1178.6812951764366,
      "openrouterVolume": 174100171044427,
      "openrouterTotalVolume": 174100171044427,
      "openrouterPrice": 1.9775732840185398,
      "openrouterSpendProxy": 344295847.000517,
      "openrouterMatchedSpend": 298420092.5023579,
      "openrouterImputedSpend": 45875754.498159096,
      "openrouterPriceCoverage": 0.8361672980898657,
      "openrouterKnownFreeShare": 0.03459982372264203,
      "openrouterUnmatchedShare": 0.12923287818749224,
      "openrouterPriceVintages": [
        "2026-11-17"
      ],
      "openrouterRepricedHistory": true,
      "rampVolume": 378.76932498295287,
      "rampPrice": 2327384.9858904905,
      "rampVolumeGrowth": 21.826620204417544,
      "rampPriceChange": -3.72611598919782,
      "rampSpendingGrowth": 17.28721902988144,
      "rampInteraction": -0.813285185338284,
      "openrouterVolumeGrowth": 53.574313435569906,
      "openrouterPriceChange": -4.934280069237773,
      "openrouterSpendingGrowth": 45.99652669624983,
      "openrouterInteraction": -2.6435066700823002
    },
    {
      "month": "2026-07",
      "windowStart": "2026-06-29",
      "windowEnd": "2026-07-26",
      "silicon": 1.5534709677419356,
      "ramp": 2428886.7351326384,
      "rampSpendUsd": 1128.7456629832245,
      "rampMatchedTokens": 464.71729070626475,
      "rampWeeks": 4,
      "rampCoverage": 0.9964801814693883,
      "rampSpendingMom": 28.04218195643329,
      "rampSpendingYoy": 1148.9820443749172,
      "openrouterVolume": 220154848718944,
      "openrouterTotalVolume": 220154848718944,
      "openrouterPrice": 1.7450902454399253,
      "openrouterSpendProxy": 384190078.9857316,
      "openrouterMatchedSpend": 353799671.19758284,
      "openrouterImputedSpend": 30390407.788148765,
      "openrouterPriceCoverage": 0.8213752089852603,
      "openrouterKnownFreeShare": 0.10770196841203022,
      "openrouterUnmatchedShare": 0.07092282260270945,
      "openrouterPriceVintages": [
        "2026-11-17"
      ],
      "openrouterRepricedHistory": true,
      "rampVolume": 464.71729070626475,
      "rampPrice": 2428886.7351326384,
      "rampVolumeGrowth": 22.69137442087743,
      "rampPriceChange": 4.36119292070245,
      "rampSpendingGrowth": 28.042181956433264,
      "rampInteraction": 0.9896146148533931,
      "openrouterVolumeGrowth": 26.452976696251906,
      "openrouterPriceChange": -11.755975895173698,
      "openrouterSpendingGrowth": 11.587195237110915,
      "openrouterInteraction": -3.1098055639672895
    },
    {
      "month": "2026-08",
      "windowStart": "2026-08-03",
      "windowEnd": "2026-08-30",
      "silicon": 1.1023290322580646,
      "ramp": 1968523.2652495033,
      "rampSpendUsd": 1281.3005818270594,
      "rampMatchedTokens": 650.8943046018098,
      "rampWeeks": 4,
      "rampCoverage": 0.996236424908667,
      "rampSpendingMom": 13.515437874697046,
      "rampSpendingYoy": 1088.4274682352495,
      "openrouterVolume": 350761520275156,
      "openrouterTotalVolume": 350761520275156,
      "openrouterPrice": 1.1232624605184707,
      "openrouterSpendProxy": 393997248.3194712,
      "openrouterMatchedSpend": 338105849.9489965,
      "openrouterImputedSpend": 55891398.37047471,
      "openrouterPriceCoverage": 0.8259522590906274,
      "openrouterKnownFreeShare": 0.03413432656714949,
      "openrouterUnmatchedShare": 0.13991341434222312,
      "openrouterPriceVintages": [
        "2026-11-17"
      ],
      "openrouterRepricedHistory": true,
      "rampVolume": 650.8943046018098,
      "rampPrice": 1968523.2652495033,
      "rampVolumeGrowth": 40.06242453612998,
      "rampPriceChange": -18.953682080938826,
      "rampSpendingGrowth": 13.515437874697046,
      "rampInteraction": -7.593304580494109,
      "openrouterVolumeGrowth": 59.324912585935465,
      "openrouterPriceChange": -35.63298726506239,
      "openrouterSpendingGrowth": 2.5526867741173076,
      "openrouterInteraction": -21.139238546755777
    },
    {
      "month": "2026-09",
      "windowStart": "2026-08-31",
      "windowEnd": "2026-09-27",
      "silicon": 0.9785299999999999,
      "ramp": 1738395.8812660016,
      "rampSpendUsd": 1276.838344678138,
      "rampMatchedTokens": 734.4922744227106,
      "rampWeeks": 4,
      "rampCoverage": 0.9964338865812178,
      "rampSpendingMom": -0.34825841900100185,
      "rampSpendingYoy": 886.7965162933946,
      "openrouterVolume": 516966701064470,
      "openrouterTotalVolume": 516966701064470,
      "openrouterPrice": 0.9761013558405396,
      "openrouterSpendProxy": 504611897.8334401,
      "openrouterMatchedSpend": 465823275.6843687,
      "openrouterImputedSpend": 38788622.149071395,
      "openrouterPriceCoverage": 0.8615679180667978,
      "openrouterKnownFreeShare": 0.06759372439898065,
      "openrouterUnmatchedShare": 0.07083835753422163,
      "openrouterPriceVintages": [
        "2026-11-17"
      ],
      "openrouterRepricedHistory": true,
      "rampVolume": 734.4922744227106,
      "rampPrice": 1738395.8812660016,
      "rampVolumeGrowth": 12.843555279231179,
      "rampPriceChange": -11.690356321713768,
      "rampSpendingGrowth": -0.34825841900099075,
      "rampInteraction": -1.5014573765184045,
      "openrouterVolumeGrowth": 47.38409750845356,
      "openrouterPriceChange": -13.101221651260841,
      "openrouterSpendingGrowth": 28.07498021516066,
      "openrouterInteraction": -6.207895642032066
    },
    {
      "month": "2026-10",
      "windowStart": "2026-09-28",
      "windowEnd": "2026-10-25",
      "silicon": 0.9514806451612903,
      "ramp": 1303527.9724106116,
      "rampSpendUsd": 1251.0968423497213,
      "rampMatchedTokens": 959.7775182653506,
      "rampWeeks": 4,
      "rampCoverage": 0.9978897165165812,
      "rampSpendingMom": -2.016034561908886,
      "rampSpendingYoy": 542.3371378958631,
      "openrouterVolume": 689529444468996,
      "openrouterTotalVolume": 689529444468996,
      "openrouterPrice": 0.893331781954726,
      "openrouterSpendProxy": 615978567.3377404,
      "openrouterMatchedSpend": 557439974.9261416,
      "openrouterImputedSpend": 58538592.41159872,
      "openrouterPriceCoverage": 0.8223770872211621,
      "openrouterKnownFreeShare": 0.09156458220677315,
      "openrouterUnmatchedShare": 0.08605833057206472,
      "openrouterPriceVintages": [
        "2026-11-17"
      ],
      "openrouterRepricedHistory": true,
      "rampVolume": 959.7775182653506,
      "rampPrice": 1303527.9724106116,
      "rampVolumeGrowth": 30.672241450014926,
      "rampPriceChange": -25.015470500234606,
      "rampSpendingGrowth": -2.016034561908897,
      "rampInteraction": -7.672805511689216,
      "openrouterVolumeGrowth": 33.379856584419734,
      "openrouterPriceChange": -8.479608535584827,
      "openrouterSpendingGrowth": 22.069766880736474,
      "openrouterInteraction": -2.8304811680984296
    },
    {
      "month": "2026-11",
      "windowStart": "2026-11-02",
      "windowEnd": "2026-11-29",
      "silicon": null,
      "ramp": null,
      "rampSpendUsd": null,
      "rampMatchedTokens": null,
      "rampWeeks": 0,
      "rampCoverage": 0,
      "rampSpendingMom": null,
      "rampSpendingYoy": null,
      "openrouterVolume": null,
      "openrouterTotalVolume": null,
      "openrouterPrice": null,
      "openrouterSpendProxy": null,
      "openrouterMatchedSpend": null,
      "openrouterImputedSpend": null,
      "openrouterPriceCoverage": null,
      "openrouterKnownFreeShare": null,
      "openrouterUnmatchedShare": null,
      "openrouterPriceVintages": [],
      "openrouterRepricedHistory": false,
      "rampVolume": null,
      "rampPrice": null,
      "rampVolumeGrowth": null,
      "rampPriceChange": null,
      "rampSpendingGrowth": null,
      "rampInteraction": null,
      "openrouterVolumeGrowth": null,
      "openrouterPriceChange": null,
      "openrouterSpendingGrowth": null,
      "openrouterInteraction": null
    }
  ],
  "openrouterSpendingDaily": [
    {
      "date": "2025-01-01",
      "totalTokens": 49151682771,
      "catalogMatchedTokens": 14520246932,
      "knownFreeTokens": 422908351,
      "unmatchedTokens": 34208527488,
      "matchedSpendUsd": 6280.92424780464,
      "imputedSpendUsd": 14797.349575891549,
      "estimatedSpendUsd": 21078.27382369619,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-01-02",
      "totalTokens": 62408153540,
      "catalogMatchedTokens": 15477903749,
      "knownFreeTokens": 408710190,
      "unmatchedTokens": 46521539601,
      "matchedSpendUsd": 8195.98431100844,
      "imputedSpendUsd": 24634.46051073863,
      "estimatedSpendUsd": 32830.44482174707,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-01-03",
      "totalTokens": 61193115505,
      "catalogMatchedTokens": 13026738056,
      "knownFreeTokens": 414837351,
      "unmatchedTokens": 47751540098,
      "matchedSpendUsd": 7497.6810792349615,
      "imputedSpendUsd": 27483.91939394227,
      "estimatedSpendUsd": 34981.600473177234,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-01-04",
      "totalTokens": 53598360079,
      "catalogMatchedTokens": 11707966480,
      "knownFreeTokens": 359083261,
      "unmatchedTokens": 41531310338,
      "matchedSpendUsd": 5020.10560379274,
      "imputedSpendUsd": 17807.66661032063,
      "estimatedSpendUsd": 22827.77221411337,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-01-05",
      "totalTokens": 58396306085,
      "catalogMatchedTokens": 12931606083,
      "knownFreeTokens": 366018056,
      "unmatchedTokens": 45098681946,
      "matchedSpendUsd": 5621.902512753541,
      "imputedSpendUsd": 19606.257082590575,
      "estimatedSpendUsd": 25228.159595344114,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-01-06",
      "totalTokens": 69386292686,
      "catalogMatchedTokens": 17507909408,
      "knownFreeTokens": 405989094,
      "unmatchedTokens": 51472394184,
      "matchedSpendUsd": 7410.47992638548,
      "imputedSpendUsd": 21786.447197929934,
      "estimatedSpendUsd": 29196.927124315414,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-01-07",
      "totalTokens": 75431755847,
      "catalogMatchedTokens": 17991481790,
      "knownFreeTokens": 343124676,
      "unmatchedTokens": 57097149381,
      "matchedSpendUsd": 7513.060089242422,
      "imputedSpendUsd": 23843.1897511819,
      "estimatedSpendUsd": 31356.249840424323,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-01-08",
      "totalTokens": 70221822873,
      "catalogMatchedTokens": 15621065571,
      "knownFreeTokens": 456665179,
      "unmatchedTokens": 54144092123,
      "matchedSpendUsd": 6259.114599931341,
      "imputedSpendUsd": 21694.683756800987,
      "estimatedSpendUsd": 27953.798356732328,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-01-09",
      "totalTokens": 72356616201,
      "catalogMatchedTokens": 15864750501,
      "knownFreeTokens": 719066614,
      "unmatchedTokens": 55772799086,
      "matchedSpendUsd": 6886.99053760368,
      "imputedSpendUsd": 24211.331879233894,
      "estimatedSpendUsd": 31098.322416837575,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-01-10",
      "totalTokens": 71507703702,
      "catalogMatchedTokens": 15776279186,
      "knownFreeTokens": 710268384,
      "unmatchedTokens": 55021156132,
      "matchedSpendUsd": 6764.474311756582,
      "imputedSpendUsd": 23591.696931196926,
      "estimatedSpendUsd": 30356.171242953507,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-01-11",
      "totalTokens": 63816995783,
      "catalogMatchedTokens": 15955213059,
      "knownFreeTokens": 894791516,
      "unmatchedTokens": 46966991208,
      "matchedSpendUsd": 6741.157009020661,
      "imputedSpendUsd": 19843.787782942007,
      "estimatedSpendUsd": 26584.94479196267,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-01-12",
      "totalTokens": 75866094246,
      "catalogMatchedTokens": 17280627766,
      "knownFreeTokens": 1102007028,
      "unmatchedTokens": 57483459452,
      "matchedSpendUsd": 6868.581802635122,
      "imputedSpendUsd": 22848.1192287098,
      "estimatedSpendUsd": 29716.70103134492,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-01-13",
      "totalTokens": 85115007863,
      "catalogMatchedTokens": 20095688902,
      "knownFreeTokens": 970310698,
      "unmatchedTokens": 64049008263,
      "matchedSpendUsd": 7907.1511106212,
      "imputedSpendUsd": 25201.683271010603,
      "estimatedSpendUsd": 33108.8343816318,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-01-14",
      "totalTokens": 75222327281,
      "catalogMatchedTokens": 16910144645,
      "knownFreeTokens": 989353566,
      "unmatchedTokens": 57322829070,
      "matchedSpendUsd": 7364.040286708402,
      "imputedSpendUsd": 24962.98118563962,
      "estimatedSpendUsd": 32327.02147234802,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-01-15",
      "totalTokens": 84115145855,
      "catalogMatchedTokens": 16517580601,
      "knownFreeTokens": 771102457,
      "unmatchedTokens": 66826462797,
      "matchedSpendUsd": 6818.369956328461,
      "imputedSpendUsd": 27585.610582410645,
      "estimatedSpendUsd": 34403.98053873911,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-01-16",
      "totalTokens": 77055116590,
      "catalogMatchedTokens": 15574102058,
      "knownFreeTokens": 981876578,
      "unmatchedTokens": 60499137954,
      "matchedSpendUsd": 7205.007929870141,
      "imputedSpendUsd": 27988.565060479305,
      "estimatedSpendUsd": 35193.57299034944,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-01-17",
      "totalTokens": 68495216858,
      "catalogMatchedTokens": 14889174381,
      "knownFreeTokens": 882344239,
      "unmatchedTokens": 52723698238,
      "matchedSpendUsd": 7104.48430307914,
      "imputedSpendUsd": 25157.518942765902,
      "estimatedSpendUsd": 32262.003245845044,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-01-18",
      "totalTokens": 60483766614,
      "catalogMatchedTokens": 12920929416,
      "knownFreeTokens": 999838467,
      "unmatchedTokens": 46562998731,
      "matchedSpendUsd": 5739.947966104381,
      "imputedSpendUsd": 20684.98180407708,
      "estimatedSpendUsd": 26424.92977018146,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-01-19",
      "totalTokens": 67857660985,
      "catalogMatchedTokens": 14300717055,
      "knownFreeTokens": 1171899816,
      "unmatchedTokens": 52385044114,
      "matchedSpendUsd": 6347.909581229641,
      "imputedSpendUsd": 23253.066413766483,
      "estimatedSpendUsd": 29600.975994996123,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-01-20",
      "totalTokens": 75688773433,
      "catalogMatchedTokens": 14726763823,
      "knownFreeTokens": 1230846833,
      "unmatchedTokens": 59731162777,
      "matchedSpendUsd": 7220.183169442382,
      "imputedSpendUsd": 29284.77304023637,
      "estimatedSpendUsd": 36504.956209678756,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-01-21",
      "totalTokens": 81360080410,
      "catalogMatchedTokens": 12943568525,
      "knownFreeTokens": 1227268951,
      "unmatchedTokens": 67189242934,
      "matchedSpendUsd": 6251.178273728241,
      "imputedSpendUsd": 32449.4697769037,
      "estimatedSpendUsd": 38700.64805063194,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-01-22",
      "totalTokens": 81625733261,
      "catalogMatchedTokens": 15538597650,
      "knownFreeTokens": 857472625,
      "unmatchedTokens": 65229662986,
      "matchedSpendUsd": 8395.781756126082,
      "imputedSpendUsd": 35244.75160447388,
      "estimatedSpendUsd": 43640.53336059996,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-01-23",
      "totalTokens": 77114501415,
      "catalogMatchedTokens": 17651382375,
      "knownFreeTokens": 1349327730,
      "unmatchedTokens": 58113791310,
      "matchedSpendUsd": 7982.697539129082,
      "imputedSpendUsd": 26281.500735989695,
      "estimatedSpendUsd": 34264.198275118775,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-01-24",
      "totalTokens": 72673110544,
      "catalogMatchedTokens": 17816713774,
      "knownFreeTokens": 793563101,
      "unmatchedTokens": 54062833669,
      "matchedSpendUsd": 8594.290611869961,
      "imputedSpendUsd": 26078.41770072171,
      "estimatedSpendUsd": 34672.70831259167,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-01-25",
      "totalTokens": 67152928393,
      "catalogMatchedTokens": 14958627549,
      "knownFreeTokens": 2548252477,
      "unmatchedTokens": 49646048367,
      "matchedSpendUsd": 7069.311856406241,
      "imputedSpendUsd": 23462.272671399794,
      "estimatedSpendUsd": 30531.584527806037,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-01-26",
      "totalTokens": 71483471593,
      "catalogMatchedTokens": 15744028756,
      "knownFreeTokens": 1201245999,
      "unmatchedTokens": 54538196838,
      "matchedSpendUsd": 7141.057195651859,
      "imputedSpendUsd": 24737.021826097418,
      "estimatedSpendUsd": 31878.079021749276,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-01-27",
      "totalTokens": 73948446787,
      "catalogMatchedTokens": 14681882742,
      "knownFreeTokens": 893086474,
      "unmatchedTokens": 58373477571,
      "matchedSpendUsd": 7185.12379199208,
      "imputedSpendUsd": 28567.22600820702,
      "estimatedSpendUsd": 35752.3498001991,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-01-28",
      "totalTokens": 75487441672,
      "catalogMatchedTokens": 14190655331,
      "knownFreeTokens": 987640410,
      "unmatchedTokens": 60309145931,
      "matchedSpendUsd": 7300.375877171721,
      "imputedSpendUsd": 31026.011403835248,
      "estimatedSpendUsd": 38326.387281006966,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-01-29",
      "totalTokens": 78035168383,
      "catalogMatchedTokens": 15438224302,
      "knownFreeTokens": 1393036573,
      "unmatchedTokens": 61203907508,
      "matchedSpendUsd": 7239.887892072981,
      "imputedSpendUsd": 28702.09813296466,
      "estimatedSpendUsd": 35941.986025037644,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-01-30",
      "totalTokens": 89094205165,
      "catalogMatchedTokens": 17571495863,
      "knownFreeTokens": 1421051583,
      "unmatchedTokens": 70101657719,
      "matchedSpendUsd": 10091.4000065652,
      "imputedSpendUsd": 40259.74081440376,
      "estimatedSpendUsd": 50351.14082096896,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-01-31",
      "totalTokens": 84790953671,
      "catalogMatchedTokens": 19455978501,
      "knownFreeTokens": 2934506468,
      "unmatchedTokens": 62400468702,
      "matchedSpendUsd": 8507.710240988721,
      "imputedSpendUsd": 27286.47683236364,
      "estimatedSpendUsd": 35794.18707335236,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-02-01",
      "totalTokens": 82720395965,
      "catalogMatchedTokens": 17428421258,
      "knownFreeTokens": 1937558936,
      "unmatchedTokens": 63354415771,
      "matchedSpendUsd": 7282.750556966162,
      "imputedSpendUsd": 26473.677673514267,
      "estimatedSpendUsd": 33756.42823048043,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-02-02",
      "totalTokens": 87631768147,
      "catalogMatchedTokens": 19877110055,
      "knownFreeTokens": 2014783740,
      "unmatchedTokens": 65739874352,
      "matchedSpendUsd": 8222.05576083936,
      "imputedSpendUsd": 27192.932530790742,
      "estimatedSpendUsd": 35414.9882916301,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-02-03",
      "totalTokens": 88421824989,
      "catalogMatchedTokens": 19486891261,
      "knownFreeTokens": 2098087338,
      "unmatchedTokens": 66836846390,
      "matchedSpendUsd": 8116.05359331414,
      "imputedSpendUsd": 27836.734964236053,
      "estimatedSpendUsd": 35952.78855755019,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-02-04",
      "totalTokens": 102119870049,
      "catalogMatchedTokens": 21553029254,
      "knownFreeTokens": 2472318026,
      "unmatchedTokens": 78094522769,
      "matchedSpendUsd": 10427.900946609498,
      "imputedSpendUsd": 37784.10627623194,
      "estimatedSpendUsd": 48212.007222841436,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-02-05",
      "totalTokens": 105669269279,
      "catalogMatchedTokens": 20586861578,
      "knownFreeTokens": 2114127506,
      "unmatchedTokens": 82968280195,
      "matchedSpendUsd": 8855.400074636702,
      "imputedSpendUsd": 35688.650834298714,
      "estimatedSpendUsd": 44544.05090893542,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-02-06",
      "totalTokens": 114992702177,
      "catalogMatchedTokens": 23527098490,
      "knownFreeTokens": 4016117479,
      "unmatchedTokens": 87449486208,
      "matchedSpendUsd": 11147.088511614003,
      "imputedSpendUsd": 41433.37791823661,
      "estimatedSpendUsd": 52580.46642985062,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-02-07",
      "totalTokens": 118370770895,
      "catalogMatchedTokens": 18668599634,
      "knownFreeTokens": 6285417193,
      "unmatchedTokens": 93416754068,
      "matchedSpendUsd": 7757.230882428042,
      "imputedSpendUsd": 38816.80167765255,
      "estimatedSpendUsd": 46574.03256008059,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-02-08",
      "totalTokens": 105864690395,
      "catalogMatchedTokens": 17757175012,
      "knownFreeTokens": 6834042724,
      "unmatchedTokens": 81273472659,
      "matchedSpendUsd": 10297.56163710842,
      "imputedSpendUsd": 47131.29163858119,
      "estimatedSpendUsd": 57428.85327568961,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-02-09",
      "totalTokens": 107394888620,
      "catalogMatchedTokens": 15981736773,
      "knownFreeTokens": 7401322763,
      "unmatchedTokens": 84011829084,
      "matchedSpendUsd": 7462.232345724282,
      "imputedSpendUsd": 39227.01251551171,
      "estimatedSpendUsd": 46689.244861235995,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-02-10",
      "totalTokens": 110479150384,
      "catalogMatchedTokens": 18393857808,
      "knownFreeTokens": 7589409891,
      "unmatchedTokens": 84495882685,
      "matchedSpendUsd": 7910.698449169081,
      "imputedSpendUsd": 36339.38323839206,
      "estimatedSpendUsd": 44250.08168756114,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-02-11",
      "totalTokens": 124503350714,
      "catalogMatchedTokens": 20704835696,
      "knownFreeTokens": 9591526751,
      "unmatchedTokens": 94206988267,
      "matchedSpendUsd": 8591.71157358344,
      "imputedSpendUsd": 39092.28178818112,
      "estimatedSpendUsd": 47683.99336176456,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-02-12",
      "totalTokens": 124490739152,
      "catalogMatchedTokens": 19851034518,
      "knownFreeTokens": 9300842731,
      "unmatchedTokens": 95338861903,
      "matchedSpendUsd": 8033.455939789361,
      "imputedSpendUsd": 38582.399610102424,
      "estimatedSpendUsd": 46615.855549891785,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-02-13",
      "totalTokens": 123401049224,
      "catalogMatchedTokens": 20374432074,
      "knownFreeTokens": 10517333577,
      "unmatchedTokens": 92509283573,
      "matchedSpendUsd": 8231.966884362022,
      "imputedSpendUsd": 37376.912205606524,
      "estimatedSpendUsd": 45608.87908996855,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-02-14",
      "totalTokens": 123551521514,
      "catalogMatchedTokens": 22769276988,
      "knownFreeTokens": 9644615817,
      "unmatchedTokens": 91137628709,
      "matchedSpendUsd": 9329.963261389461,
      "imputedSpendUsd": 37344.652095596146,
      "estimatedSpendUsd": 46674.61535698561,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-02-15",
      "totalTokens": 115361835640,
      "catalogMatchedTokens": 18491144119,
      "knownFreeTokens": 9805141756,
      "unmatchedTokens": 87065549765,
      "matchedSpendUsd": 8559.22685147092,
      "imputedSpendUsd": 40301.11855658214,
      "estimatedSpendUsd": 48860.345408053065,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-02-16",
      "totalTokens": 118560036919,
      "catalogMatchedTokens": 19383008892,
      "knownFreeTokens": 11321608823,
      "unmatchedTokens": 87855419204,
      "matchedSpendUsd": 8990.505581664142,
      "imputedSpendUsd": 40750.362399049816,
      "estimatedSpendUsd": 49740.867980713956,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-02-17",
      "totalTokens": 128184132562,
      "catalogMatchedTokens": 18727912981,
      "knownFreeTokens": 10976407478,
      "unmatchedTokens": 98479812103,
      "matchedSpendUsd": 8990.4977206115,
      "imputedSpendUsd": 47276.09142228054,
      "estimatedSpendUsd": 56266.58914289204,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-02-18",
      "totalTokens": 142100553307,
      "catalogMatchedTokens": 18596398516,
      "knownFreeTokens": 11197047409,
      "unmatchedTokens": 112307107382,
      "matchedSpendUsd": 9646.1031195747,
      "imputedSpendUsd": 58254.60978026725,
      "estimatedSpendUsd": 67900.71289984195,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-02-19",
      "totalTokens": 133578195110,
      "catalogMatchedTokens": 17638010190,
      "knownFreeTokens": 12658398212,
      "unmatchedTokens": 103281786708,
      "matchedSpendUsd": 10287.788652983805,
      "imputedSpendUsd": 60241.55683711259,
      "estimatedSpendUsd": 70529.3454900964,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-02-20",
      "totalTokens": 139567174082,
      "catalogMatchedTokens": 17671246587,
      "knownFreeTokens": 15070596123,
      "unmatchedTokens": 106825331372,
      "matchedSpendUsd": 10884.06708366518,
      "imputedSpendUsd": 65795.81509223895,
      "estimatedSpendUsd": 76679.88217590413,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-02-21",
      "totalTokens": 133191771578,
      "catalogMatchedTokens": 16079486458,
      "knownFreeTokens": 15460503873,
      "unmatchedTokens": 101651781247,
      "matchedSpendUsd": 9631.762928304199,
      "imputedSpendUsd": 60890.368655015074,
      "estimatedSpendUsd": 70522.13158331928,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-02-22",
      "totalTokens": 135116394860,
      "catalogMatchedTokens": 23176691586,
      "knownFreeTokens": 14659682576,
      "unmatchedTokens": 97280020698,
      "matchedSpendUsd": 17911.906161937524,
      "imputedSpendUsd": 75182.02482473661,
      "estimatedSpendUsd": 93093.93098667414,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-02-23",
      "totalTokens": 139667620904,
      "catalogMatchedTokens": 15378083442,
      "knownFreeTokens": 16504829505,
      "unmatchedTokens": 107784707957,
      "matchedSpendUsd": 7536.298530822482,
      "imputedSpendUsd": 52821.77972860744,
      "estimatedSpendUsd": 60358.07825942992,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-02-24",
      "totalTokens": 149673286419,
      "catalogMatchedTokens": 17182947277,
      "knownFreeTokens": 15869054260,
      "unmatchedTokens": 116621284882,
      "matchedSpendUsd": 9098.37416807298,
      "imputedSpendUsd": 61750.99467587505,
      "estimatedSpendUsd": 70849.36884394803,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-02-25",
      "totalTokens": 165872108916,
      "catalogMatchedTokens": 21699457073,
      "knownFreeTokens": 16922139677,
      "unmatchedTokens": 127250512166,
      "matchedSpendUsd": 11884.305974381881,
      "imputedSpendUsd": 69692.25160288636,
      "estimatedSpendUsd": 81576.55757726825,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-02-26",
      "totalTokens": 163891595218,
      "catalogMatchedTokens": 18620063092,
      "knownFreeTokens": 16634368354,
      "unmatchedTokens": 128637163772,
      "matchedSpendUsd": 10247.270577308082,
      "imputedSpendUsd": 70793.52078218923,
      "estimatedSpendUsd": 81040.7913594973,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-02-27",
      "totalTokens": 157817685268,
      "catalogMatchedTokens": 16806570290,
      "knownFreeTokens": 16079903959,
      "unmatchedTokens": 124931211019,
      "matchedSpendUsd": 9367.038128125758,
      "imputedSpendUsd": 69629.63869577806,
      "estimatedSpendUsd": 78996.67682390382,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-02-28",
      "totalTokens": 154373044616,
      "catalogMatchedTokens": 16954765894,
      "knownFreeTokens": 17086959127,
      "unmatchedTokens": 120331319595,
      "matchedSpendUsd": 11536.110689087482,
      "imputedSpendUsd": 81874.05422702568,
      "estimatedSpendUsd": 93410.16491611316,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-03-01",
      "totalTokens": 150042042719,
      "catalogMatchedTokens": 16517340919,
      "knownFreeTokens": 17256122847,
      "unmatchedTokens": 116268578953,
      "matchedSpendUsd": 9259.730282117143,
      "imputedSpendUsd": 65180.93237098377,
      "estimatedSpendUsd": 74440.66265310091,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-03-02",
      "totalTokens": 157225740186,
      "catalogMatchedTokens": 16813060857,
      "knownFreeTokens": 17386069809,
      "unmatchedTokens": 123026609520,
      "matchedSpendUsd": 8650.897908258481,
      "imputedSpendUsd": 63301.420723377145,
      "estimatedSpendUsd": 71952.31863163563,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-03-03",
      "totalTokens": 163696491542,
      "catalogMatchedTokens": 17587795623,
      "knownFreeTokens": 17404825474,
      "unmatchedTokens": 128703870445,
      "matchedSpendUsd": 10566.943293292281,
      "imputedSpendUsd": 77326.71733125196,
      "estimatedSpendUsd": 87893.66062454424,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-03-04",
      "totalTokens": 166790068558,
      "catalogMatchedTokens": 19799022892,
      "knownFreeTokens": 18746650255,
      "unmatchedTokens": 128244395411,
      "matchedSpendUsd": 10461.4563545242,
      "imputedSpendUsd": 67762.08869613544,
      "estimatedSpendUsd": 78223.54505065964,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-03-05",
      "totalTokens": 173962185656,
      "catalogMatchedTokens": 22656634633,
      "knownFreeTokens": 19787019081,
      "unmatchedTokens": 131518531942,
      "matchedSpendUsd": 12359.609514724685,
      "imputedSpendUsd": 71745.77006177939,
      "estimatedSpendUsd": 84105.37957650407,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-03-06",
      "totalTokens": 182100870835,
      "catalogMatchedTokens": 21536031183,
      "knownFreeTokens": 18911608214,
      "unmatchedTokens": 141653231438,
      "matchedSpendUsd": 11544.291401574043,
      "imputedSpendUsd": 75932.5693670863,
      "estimatedSpendUsd": 87476.86076866034,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-03-07",
      "totalTokens": 227794006971,
      "catalogMatchedTokens": 27194263202,
      "knownFreeTokens": 26491197031,
      "unmatchedTokens": 174108546738,
      "matchedSpendUsd": 13419.33368212936,
      "imputedSpendUsd": 85915.93999928652,
      "estimatedSpendUsd": 99335.27368141589,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-03-08",
      "totalTokens": 180393189127,
      "catalogMatchedTokens": 23068540022,
      "knownFreeTokens": 24170878213,
      "unmatchedTokens": 133153770892,
      "matchedSpendUsd": 10128.281150471901,
      "imputedSpendUsd": 58461.386223555855,
      "estimatedSpendUsd": 68589.66737402776,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-03-09",
      "totalTokens": 187301072720,
      "catalogMatchedTokens": 22911934851,
      "knownFreeTokens": 25541473490,
      "unmatchedTokens": 138847664379,
      "matchedSpendUsd": 10204.69526846722,
      "imputedSpendUsd": 61841.049782151626,
      "estimatedSpendUsd": 72045.74505061885,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-03-10",
      "totalTokens": 194916718158,
      "catalogMatchedTokens": 26313372278,
      "knownFreeTokens": 24668622626,
      "unmatchedTokens": 143934723254,
      "matchedSpendUsd": 14126.747801430938,
      "imputedSpendUsd": 77273.62018809101,
      "estimatedSpendUsd": 91400.36798952194,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-03-11",
      "totalTokens": 204393400391,
      "catalogMatchedTokens": 27285324691,
      "knownFreeTokens": 23051539555,
      "unmatchedTokens": 154056536145,
      "matchedSpendUsd": 15042.650338779544,
      "imputedSpendUsd": 84932.78463338874,
      "estimatedSpendUsd": 99975.43497216828,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-03-12",
      "totalTokens": 203060022546,
      "catalogMatchedTokens": 24769647642,
      "knownFreeTokens": 23916226560,
      "unmatchedTokens": 154374148344,
      "matchedSpendUsd": 13664.02451211202,
      "imputedSpendUsd": 85159.55404355984,
      "estimatedSpendUsd": 98823.57855567186,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-03-13",
      "totalTokens": 221928492539,
      "catalogMatchedTokens": 30284356514,
      "knownFreeTokens": 24108030865,
      "unmatchedTokens": 167536105160,
      "matchedSpendUsd": 16015.524192140361,
      "imputedSpendUsd": 88599.49010329999,
      "estimatedSpendUsd": 104615.01429544036,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-03-14",
      "totalTokens": 214068053396,
      "catalogMatchedTokens": 27952751855,
      "knownFreeTokens": 24466716017,
      "unmatchedTokens": 161648585524,
      "matchedSpendUsd": 14531.180707925578,
      "imputedSpendUsd": 84032.68556936884,
      "estimatedSpendUsd": 98563.86627729442,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-03-15",
      "totalTokens": 190299583462,
      "catalogMatchedTokens": 26844934246,
      "knownFreeTokens": 23569335854,
      "unmatchedTokens": 139885313362,
      "matchedSpendUsd": 12992.256349308098,
      "imputedSpendUsd": 67700.88665697517,
      "estimatedSpendUsd": 80693.14300628327,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-03-16",
      "totalTokens": 190302450623,
      "catalogMatchedTokens": 28976765632,
      "knownFreeTokens": 22780713671,
      "unmatchedTokens": 138544971320,
      "matchedSpendUsd": 13982.685864080182,
      "imputedSpendUsd": 66854.62541327284,
      "estimatedSpendUsd": 80837.31127735302,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-03-17",
      "totalTokens": 230930657288,
      "catalogMatchedTokens": 30411305877,
      "knownFreeTokens": 24258784880,
      "unmatchedTokens": 176260566531,
      "matchedSpendUsd": 16046.028052319602,
      "imputedSpendUsd": 93001.00451171992,
      "estimatedSpendUsd": 109047.03256403952,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-03-18",
      "totalTokens": 230236003769,
      "catalogMatchedTokens": 32668304010,
      "knownFreeTokens": 23702259771,
      "unmatchedTokens": 173865439988,
      "matchedSpendUsd": 17670.161090394915,
      "imputedSpendUsd": 94043.15362376688,
      "estimatedSpendUsd": 111713.3147141618,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-03-19",
      "totalTokens": 205403798836,
      "catalogMatchedTokens": 32690015512,
      "knownFreeTokens": 24824827451,
      "unmatchedTokens": 147888955873,
      "matchedSpendUsd": 17833.863040111082,
      "imputedSpendUsd": 80680.02853091192,
      "estimatedSpendUsd": 98513.891571023,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-03-20",
      "totalTokens": 203790419935,
      "catalogMatchedTokens": 30008646284,
      "knownFreeTokens": 23716048260,
      "unmatchedTokens": 150065725391,
      "matchedSpendUsd": 15719.14645296398,
      "imputedSpendUsd": 78607.51506971924,
      "estimatedSpendUsd": 94326.66152268322,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-03-21",
      "totalTokens": 212462970583,
      "catalogMatchedTokens": 33717229561,
      "knownFreeTokens": 24447782851,
      "unmatchedTokens": 154297958171,
      "matchedSpendUsd": 16217.801030362638,
      "imputedSpendUsd": 74216.46492281611,
      "estimatedSpendUsd": 90434.26595317875,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-03-22",
      "totalTokens": 188084657023,
      "catalogMatchedTokens": 33762167006,
      "knownFreeTokens": 25222894739,
      "unmatchedTokens": 129099595278,
      "matchedSpendUsd": 16559.1539696534,
      "imputedSpendUsd": 63318.805195425644,
      "estimatedSpendUsd": 79877.95916507904,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-03-23",
      "totalTokens": 198759550985,
      "catalogMatchedTokens": 37401415891,
      "knownFreeTokens": 29105205148,
      "unmatchedTokens": 132252929946,
      "matchedSpendUsd": 17318.6593563467,
      "imputedSpendUsd": 61239.48487107176,
      "estimatedSpendUsd": 78558.14422741847,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-03-24",
      "totalTokens": 222905959539,
      "catalogMatchedTokens": 43454832344,
      "knownFreeTokens": 31238716443,
      "unmatchedTokens": 148212410752,
      "matchedSpendUsd": 21296.6941367185,
      "imputedSpendUsd": 72637.13167879372,
      "estimatedSpendUsd": 93933.82581551222,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-03-25",
      "totalTokens": 228382944505,
      "catalogMatchedTokens": 43460571700,
      "knownFreeTokens": 37517766821,
      "unmatchedTokens": 147404605984,
      "matchedSpendUsd": 19608.728899627786,
      "imputedSpendUsd": 66506.64830754418,
      "estimatedSpendUsd": 86115.37720717196,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-03-26",
      "totalTokens": 244887222843,
      "catalogMatchedTokens": 50026523282,
      "knownFreeTokens": 48592881423,
      "unmatchedTokens": 146267818138,
      "matchedSpendUsd": 25602.573391702143,
      "imputedSpendUsd": 74856.94193883172,
      "estimatedSpendUsd": 100459.51533053386,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-03-27",
      "totalTokens": 247700609528,
      "catalogMatchedTokens": 52594902166,
      "knownFreeTokens": 52956716685,
      "unmatchedTokens": 142148990677,
      "matchedSpendUsd": 27745.13833334668,
      "imputedSpendUsd": 74987.18027521187,
      "estimatedSpendUsd": 102732.31860855855,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-03-28",
      "totalTokens": 252577751172,
      "catalogMatchedTokens": 53334802924,
      "knownFreeTokens": 53968046091,
      "unmatchedTokens": 145274902157,
      "matchedSpendUsd": 29545.667844030977,
      "imputedSpendUsd": 80477.35755808643,
      "estimatedSpendUsd": 110023.0254021174,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-03-29",
      "totalTokens": 218184167792,
      "catalogMatchedTokens": 47450955071,
      "knownFreeTokens": 51758917113,
      "unmatchedTokens": 118974295608,
      "matchedSpendUsd": 24725.98532981424,
      "imputedSpendUsd": 61995.7318757166,
      "estimatedSpendUsd": 86721.71720553085,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-03-30",
      "totalTokens": 205111873157,
      "catalogMatchedTokens": 26766120387,
      "knownFreeTokens": 55285707959,
      "unmatchedTokens": 123060044811,
      "matchedSpendUsd": 9518.397717044281,
      "imputedSpendUsd": 43761.83147398878,
      "estimatedSpendUsd": 53280.22919103306,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-03-31",
      "totalTokens": 263186845381,
      "catalogMatchedTokens": 53746651865,
      "knownFreeTokens": 54928363352,
      "unmatchedTokens": 154511830164,
      "matchedSpendUsd": 26380.028599096197,
      "imputedSpendUsd": 75837.77513924243,
      "estimatedSpendUsd": 102217.80373833863,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-04-01",
      "totalTokens": 279117467876,
      "catalogMatchedTokens": 48676679791,
      "knownFreeTokens": 60546921805,
      "unmatchedTokens": 169893866280,
      "matchedSpendUsd": 24774.93536162652,
      "imputedSpendUsd": 86470.76122480434,
      "estimatedSpendUsd": 111245.69658643086,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-04-02",
      "totalTokens": 287084138362,
      "catalogMatchedTokens": 73189616290,
      "knownFreeTokens": 62841202678,
      "unmatchedTokens": 151053319394,
      "matchedSpendUsd": 30685.03183208878,
      "imputedSpendUsd": 63329.69277475035,
      "estimatedSpendUsd": 94014.72460683913,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-04-03",
      "totalTokens": 310210765749,
      "catalogMatchedTokens": 91880146186,
      "knownFreeTokens": 64212789311,
      "unmatchedTokens": 154117830252,
      "matchedSpendUsd": 36752.27167881568,
      "imputedSpendUsd": 61647.48972541543,
      "estimatedSpendUsd": 98399.7614042311,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-04-04",
      "totalTokens": 282175536516,
      "catalogMatchedTokens": 78480004407,
      "knownFreeTokens": 53895934528,
      "unmatchedTokens": 149799597581,
      "matchedSpendUsd": 27597.363942797783,
      "imputedSpendUsd": 52676.781100674474,
      "estimatedSpendUsd": 80274.14504347226,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-04-05",
      "totalTokens": 283090401484,
      "catalogMatchedTokens": 78123666499,
      "knownFreeTokens": 56339915213,
      "unmatchedTokens": 148626819772,
      "matchedSpendUsd": 25942.772399424462,
      "imputedSpendUsd": 49354.976930641504,
      "estimatedSpendUsd": 75297.74933006597,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-04-06",
      "totalTokens": 330016992208,
      "catalogMatchedTokens": 84274628437,
      "knownFreeTokens": 64471281085,
      "unmatchedTokens": 181271082686,
      "matchedSpendUsd": 27870.222338007974,
      "imputedSpendUsd": 59947.64345578752,
      "estimatedSpendUsd": 87817.8657937955,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-04-07",
      "totalTokens": 371768869788,
      "catalogMatchedTokens": 87682843094,
      "knownFreeTokens": 63652204677,
      "unmatchedTokens": 220433822017,
      "matchedSpendUsd": 30905.804024319263,
      "imputedSpendUsd": 77696.89329400014,
      "estimatedSpendUsd": 108602.6973183194,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-04-08",
      "totalTokens": 335124133287,
      "catalogMatchedTokens": 85315237937,
      "knownFreeTokens": 46498972452,
      "unmatchedTokens": 203309922898,
      "matchedSpendUsd": 31042.32449359808,
      "imputedSpendUsd": 73975.20949339157,
      "estimatedSpendUsd": 105017.53398698964,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-04-09",
      "totalTokens": 329550655879,
      "catalogMatchedTokens": 87365966189,
      "knownFreeTokens": 45027948766,
      "unmatchedTokens": 197156740924,
      "matchedSpendUsd": 36956.95747411184,
      "imputedSpendUsd": 83399.90511064883,
      "estimatedSpendUsd": 120356.86258476067,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-04-10",
      "totalTokens": 318345562644,
      "catalogMatchedTokens": 71396648240,
      "knownFreeTokens": 44781319869,
      "unmatchedTokens": 202167594535,
      "matchedSpendUsd": 32520.610316579863,
      "imputedSpendUsd": 92085.74523572138,
      "estimatedSpendUsd": 124606.35555230125,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-04-11",
      "totalTokens": 290444046062,
      "catalogMatchedTokens": 46203650157,
      "knownFreeTokens": 45072125106,
      "unmatchedTokens": 199168270799,
      "matchedSpendUsd": 18826.075286557418,
      "imputedSpendUsd": 81152.82770981157,
      "estimatedSpendUsd": 99978.90299636898,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-04-12",
      "totalTokens": 274911788714,
      "catalogMatchedTokens": 36658273143,
      "knownFreeTokens": 45815667930,
      "unmatchedTokens": 192437847641,
      "matchedSpendUsd": 17512.42781961528,
      "imputedSpendUsd": 91931.60581866241,
      "estimatedSpendUsd": 109444.0336382777,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-04-13",
      "totalTokens": 262977334963,
      "catalogMatchedTokens": 32488791627,
      "knownFreeTokens": 48766010154,
      "unmatchedTokens": 181722533182,
      "matchedSpendUsd": 11971.30665650668,
      "imputedSpendUsd": 66960.20572556497,
      "estimatedSpendUsd": 78931.51238207165,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-04-14",
      "totalTokens": 272286805249,
      "catalogMatchedTokens": 43716745762,
      "knownFreeTokens": 47196516071,
      "unmatchedTokens": 181373543416,
      "matchedSpendUsd": 26762.64460003744,
      "imputedSpendUsd": 111033.78345492388,
      "estimatedSpendUsd": 137796.42805496132,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-04-15",
      "totalTokens": 252985364647,
      "catalogMatchedTokens": 54331397140,
      "knownFreeTokens": 48658964672,
      "unmatchedTokens": 149995002835,
      "matchedSpendUsd": 53130.298279791445,
      "imputedSpendUsd": 146679.07803965802,
      "estimatedSpendUsd": 199809.37631944945,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-04-16",
      "totalTokens": 251118350224,
      "catalogMatchedTokens": 49383383141,
      "knownFreeTokens": 46423553355,
      "unmatchedTokens": 155311413728,
      "matchedSpendUsd": 47016.07935548474,
      "imputedSpendUsd": 147866.2110248509,
      "estimatedSpendUsd": 194882.29038033565,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-04-17",
      "totalTokens": 248960978027,
      "catalogMatchedTokens": 44398843558,
      "knownFreeTokens": 48292257930,
      "unmatchedTokens": 156269876539,
      "matchedSpendUsd": 42583.63837925952,
      "imputedSpendUsd": 149880.92884480683,
      "estimatedSpendUsd": 192464.56722406636,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-04-18",
      "totalTokens": 260110794546,
      "catalogMatchedTokens": 42493476903,
      "knownFreeTokens": 45778343164,
      "unmatchedTokens": 171838974479,
      "matchedSpendUsd": 38558.879451012464,
      "imputedSpendUsd": 155927.89258093364,
      "estimatedSpendUsd": 194486.7720319461,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-04-19",
      "totalTokens": 243572111478,
      "catalogMatchedTokens": 36286368150,
      "knownFreeTokens": 48136301014,
      "unmatchedTokens": 159149442314,
      "matchedSpendUsd": 31082.87461853972,
      "imputedSpendUsd": 136327.28799441954,
      "estimatedSpendUsd": 167410.16261295928,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-04-20",
      "totalTokens": 249634165943,
      "catalogMatchedTokens": 38181573802,
      "knownFreeTokens": 48053987687,
      "unmatchedTokens": 163398604454,
      "matchedSpendUsd": 28360.191467102883,
      "imputedSpendUsd": 121367.8548664255,
      "estimatedSpendUsd": 149728.0463335284,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-04-21",
      "totalTokens": 265611051403,
      "catalogMatchedTokens": 41395745114,
      "knownFreeTokens": 51475868473,
      "unmatchedTokens": 172739437816,
      "matchedSpendUsd": 33896.460112594956,
      "imputedSpendUsd": 141445.8284946266,
      "estimatedSpendUsd": 175342.28860722156,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-04-22",
      "totalTokens": 267828807102,
      "catalogMatchedTokens": 43483759331,
      "knownFreeTokens": 49892569944,
      "unmatchedTokens": 174452477827,
      "matchedSpendUsd": 39031.43173239779,
      "imputedSpendUsd": 156590.18639627815,
      "estimatedSpendUsd": 195621.61812867594,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-04-23",
      "totalTokens": 258244769365,
      "catalogMatchedTokens": 41984692529,
      "knownFreeTokens": 46343396314,
      "unmatchedTokens": 169916680522,
      "matchedSpendUsd": 32385.615336596962,
      "imputedSpendUsd": 131068.15658721219,
      "estimatedSpendUsd": 163453.77192380914,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-04-24",
      "totalTokens": 248136852554,
      "catalogMatchedTokens": 38174988739,
      "knownFreeTokens": 46972603501,
      "unmatchedTokens": 162989260314,
      "matchedSpendUsd": 30648.91849640522,
      "imputedSpendUsd": 130856.47750433406,
      "estimatedSpendUsd": 161505.39600073927,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-04-25",
      "totalTokens": 254213410032,
      "catalogMatchedTokens": 44968214722,
      "knownFreeTokens": 45498400381,
      "unmatchedTokens": 163746794929,
      "matchedSpendUsd": 36087.895296119445,
      "imputedSpendUsd": 131410.0910388571,
      "estimatedSpendUsd": 167497.98633497654,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-04-26",
      "totalTokens": 232948687662,
      "catalogMatchedTokens": 45476866777,
      "knownFreeTokens": 28250132050,
      "unmatchedTokens": 159221688835,
      "matchedSpendUsd": 31438.929546928422,
      "imputedSpendUsd": 110072.65478892217,
      "estimatedSpendUsd": 141511.58433585058,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-04-27",
      "totalTokens": 236480346124,
      "catalogMatchedTokens": 41488834715,
      "knownFreeTokens": 29060584773,
      "unmatchedTokens": 165930926636,
      "matchedSpendUsd": 31236.6144978125,
      "imputedSpendUsd": 124928.07822147917,
      "estimatedSpendUsd": 156164.69271929166,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-04-28",
      "totalTokens": 276156543714,
      "catalogMatchedTokens": 51173345600,
      "knownFreeTokens": 30903030282,
      "unmatchedTokens": 194080167832,
      "matchedSpendUsd": 39808.53128640389,
      "imputedSpendUsd": 150977.9425719371,
      "estimatedSpendUsd": 190786.473858341,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-04-29",
      "totalTokens": 264007460755,
      "catalogMatchedTokens": 52738900946,
      "knownFreeTokens": 29937675959,
      "unmatchedTokens": 181330883850,
      "matchedSpendUsd": 39522.91496359832,
      "imputedSpendUsd": 135890.67982314934,
      "estimatedSpendUsd": 175413.59478674765,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-04-30",
      "totalTokens": 257745468847,
      "catalogMatchedTokens": 44295138003,
      "knownFreeTokens": 28324209296,
      "unmatchedTokens": 185126121548,
      "matchedSpendUsd": 33176.75853872285,
      "imputedSpendUsd": 138658.21195527774,
      "estimatedSpendUsd": 171834.9704940006,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-05-01",
      "totalTokens": 247853999972,
      "catalogMatchedTokens": 46305182000,
      "knownFreeTokens": 28141907228,
      "unmatchedTokens": 173406910744,
      "matchedSpendUsd": 30304.81161498657,
      "imputedSpendUsd": 113487.59546682509,
      "estimatedSpendUsd": 143792.40708181166,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-05-02",
      "totalTokens": 257124033765,
      "catalogMatchedTokens": 52195588626,
      "knownFreeTokens": 24741218681,
      "unmatchedTokens": 180187226458,
      "matchedSpendUsd": 35668.04326271845,
      "imputedSpendUsd": 123131.5894288386,
      "estimatedSpendUsd": 158799.63269155705,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-05-03",
      "totalTokens": 240108996884,
      "catalogMatchedTokens": 69989755732,
      "knownFreeTokens": 22420980798,
      "unmatchedTokens": 147698260354,
      "matchedSpendUsd": 38129.97699838693,
      "imputedSpendUsd": 80465.079654863,
      "estimatedSpendUsd": 118595.05665324992,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-05-04",
      "totalTokens": 259953508223,
      "catalogMatchedTokens": 74774282419,
      "knownFreeTokens": 24262388521,
      "unmatchedTokens": 160916837283,
      "matchedSpendUsd": 40429.50494792017,
      "imputedSpendUsd": 87005.69044155221,
      "estimatedSpendUsd": 127435.19538947238,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-05-05",
      "totalTokens": 311745800261,
      "catalogMatchedTokens": 91743116385,
      "knownFreeTokens": 22427845873,
      "unmatchedTokens": 197574838003,
      "matchedSpendUsd": 52817.17693318563,
      "imputedSpendUsd": 113745.2659942138,
      "estimatedSpendUsd": 166562.44292739942,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-05-06",
      "totalTokens": 310263302559,
      "catalogMatchedTokens": 91962324953,
      "knownFreeTokens": 22152162629,
      "unmatchedTokens": 196148814977,
      "matchedSpendUsd": 53551.45734040712,
      "imputedSpendUsd": 114221.28467261595,
      "estimatedSpendUsd": 167772.74201302306,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-05-07",
      "totalTokens": 313740594702,
      "catalogMatchedTokens": 89866141135,
      "knownFreeTokens": 23847673066,
      "unmatchedTokens": 200026780501,
      "matchedSpendUsd": 51570.00005834117,
      "imputedSpendUsd": 114786.06905586661,
      "estimatedSpendUsd": 166356.06911420778,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-05-08",
      "totalTokens": 314099176805,
      "catalogMatchedTokens": 94892648970,
      "knownFreeTokens": 27155480747,
      "unmatchedTokens": 192051047088,
      "matchedSpendUsd": 53222.920373213325,
      "imputedSpendUsd": 107716.64294025944,
      "estimatedSpendUsd": 160939.56331347275,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-05-09",
      "totalTokens": 310235395101,
      "catalogMatchedTokens": 94677545573,
      "knownFreeTokens": 25601292719,
      "unmatchedTokens": 189956556809,
      "matchedSpendUsd": 54179.177421368026,
      "imputedSpendUsd": 108702.54326324609,
      "estimatedSpendUsd": 162881.72068461412,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-05-10",
      "totalTokens": 281325208183,
      "catalogMatchedTokens": 84385154864,
      "knownFreeTokens": 26614180874,
      "unmatchedTokens": 170325872445,
      "matchedSpendUsd": 44653.1153125977,
      "imputedSpendUsd": 90129.36973645409,
      "estimatedSpendUsd": 134782.4850490518,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-05-11",
      "totalTokens": 288603619977,
      "catalogMatchedTokens": 88099396131,
      "knownFreeTokens": 26895180016,
      "unmatchedTokens": 173609043830,
      "matchedSpendUsd": 46270.94474177695,
      "imputedSpendUsd": 91181.72004023565,
      "estimatedSpendUsd": 137452.6647820126,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-05-12",
      "totalTokens": 322905510657,
      "catalogMatchedTokens": 90858190467,
      "knownFreeTokens": 24544660388,
      "unmatchedTokens": 207502659802,
      "matchedSpendUsd": 47211.56045486146,
      "imputedSpendUsd": 107822.13818516234,
      "estimatedSpendUsd": 155033.6986400238,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-05-13",
      "totalTokens": 342403647632,
      "catalogMatchedTokens": 119194291988,
      "knownFreeTokens": 22429014535,
      "unmatchedTokens": 200780341109,
      "matchedSpendUsd": 51361.51654324747,
      "imputedSpendUsd": 86517.42159319996,
      "estimatedSpendUsd": 137878.93813644742,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-05-14",
      "totalTokens": 326602519998,
      "catalogMatchedTokens": 113654992420,
      "knownFreeTokens": 21131083634,
      "unmatchedTokens": 191816443944,
      "matchedSpendUsd": 51525.713876120535,
      "imputedSpendUsd": 86960.36132640883,
      "estimatedSpendUsd": 138486.07520252938,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-05-15",
      "totalTokens": 331569364598,
      "catalogMatchedTokens": 117794418030,
      "knownFreeTokens": 20491740790,
      "unmatchedTokens": 193283205778,
      "matchedSpendUsd": 62174.17100572008,
      "imputedSpendUsd": 102018.61250772169,
      "estimatedSpendUsd": 164192.78351344177,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-05-16",
      "totalTokens": 298119972316,
      "catalogMatchedTokens": 102803855317,
      "knownFreeTokens": 19941069158,
      "unmatchedTokens": 175375047841,
      "matchedSpendUsd": 52971.14364519772,
      "imputedSpendUsd": 90364.47925346275,
      "estimatedSpendUsd": 143335.62289866048,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-05-17",
      "totalTokens": 264429024209,
      "catalogMatchedTokens": 92721063692,
      "knownFreeTokens": 21402123501,
      "unmatchedTokens": 150305837016,
      "matchedSpendUsd": 46529.33423531811,
      "imputedSpendUsd": 75426.5562706236,
      "estimatedSpendUsd": 121955.8905059417,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-05-18",
      "totalTokens": 269232227294,
      "catalogMatchedTokens": 88563401603,
      "knownFreeTokens": 22726883841,
      "unmatchedTokens": 157941941850,
      "matchedSpendUsd": 43849.83258526269,
      "imputedSpendUsd": 78200.78704022127,
      "estimatedSpendUsd": 122050.61962548396,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-05-19",
      "totalTokens": 333465897864,
      "catalogMatchedTokens": 115734724820,
      "knownFreeTokens": 22989118959,
      "unmatchedTokens": 194742054085,
      "matchedSpendUsd": 58175.7347742922,
      "imputedSpendUsd": 97889.91251735389,
      "estimatedSpendUsd": 156065.6472916461,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-05-20",
      "totalTokens": 332801509438,
      "catalogMatchedTokens": 113595681993,
      "knownFreeTokens": 23478451544,
      "unmatchedTokens": 195727375901,
      "matchedSpendUsd": 56365.0682171244,
      "imputedSpendUsd": 97118.01277180976,
      "estimatedSpendUsd": 153483.08098893415,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-05-21",
      "totalTokens": 339695778677,
      "catalogMatchedTokens": 115517524835,
      "knownFreeTokens": 23671957075,
      "unmatchedTokens": 200506296767,
      "matchedSpendUsd": 62381.00558947702,
      "imputedSpendUsd": 108276.07704729753,
      "estimatedSpendUsd": 170657.08263677455,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-05-22",
      "totalTokens": 366743895165,
      "catalogMatchedTokens": 122067191732,
      "knownFreeTokens": 22902666243,
      "unmatchedTokens": 221774037190,
      "matchedSpendUsd": 71295.66061716243,
      "imputedSpendUsd": 129531.33651104712,
      "estimatedSpendUsd": 200826.99712820956,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-05-23",
      "totalTokens": 366523366643,
      "catalogMatchedTokens": 116687748929,
      "knownFreeTokens": 24301782885,
      "unmatchedTokens": 225533834829,
      "matchedSpendUsd": 61703.2950528377,
      "imputedSpendUsd": 119259.99843667573,
      "estimatedSpendUsd": 180963.29348951342,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-05-24",
      "totalTokens": 307671303826,
      "catalogMatchedTokens": 96480009788,
      "knownFreeTokens": 24422997469,
      "unmatchedTokens": 186768296569,
      "matchedSpendUsd": 44293.65390679468,
      "imputedSpendUsd": 85744.70822677933,
      "estimatedSpendUsd": 130038.362133574,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-05-25",
      "totalTokens": 321070374909,
      "catalogMatchedTokens": 103311136998,
      "knownFreeTokens": 25955210385,
      "unmatchedTokens": 191804027526,
      "matchedSpendUsd": 49520.23164717025,
      "imputedSpendUsd": 91937.61824663312,
      "estimatedSpendUsd": 141457.84989380336,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-05-26",
      "totalTokens": 388143121737,
      "catalogMatchedTokens": 125800469629,
      "knownFreeTokens": 25819999716,
      "unmatchedTokens": 236522652392,
      "matchedSpendUsd": 63795.956596013406,
      "imputedSpendUsd": 119945.40966717967,
      "estimatedSpendUsd": 183741.36626319308,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-05-27",
      "totalTokens": 403216090874,
      "catalogMatchedTokens": 128985139395,
      "knownFreeTokens": 26325980226,
      "unmatchedTokens": 247904971253,
      "matchedSpendUsd": 65461.67214360111,
      "imputedSpendUsd": 125815.06696857375,
      "estimatedSpendUsd": 191276.73911217487,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-05-28",
      "totalTokens": 391273310120,
      "catalogMatchedTokens": 128544934812,
      "knownFreeTokens": 26449174684,
      "unmatchedTokens": 236279200624,
      "matchedSpendUsd": 67404.37029721732,
      "imputedSpendUsd": 123896.36943441696,
      "estimatedSpendUsd": 191300.73973163427,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-05-29",
      "totalTokens": 379196749612,
      "catalogMatchedTokens": 118018176087,
      "knownFreeTokens": 27771400076,
      "unmatchedTokens": 233407173449,
      "matchedSpendUsd": 63449.5782762903,
      "imputedSpendUsd": 125485.64308503416,
      "estimatedSpendUsd": 188935.22136132445,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-05-30",
      "totalTokens": 352460561300,
      "catalogMatchedTokens": 115188790270,
      "knownFreeTokens": 28298147388,
      "unmatchedTokens": 208973623642,
      "matchedSpendUsd": 62481.501822985185,
      "imputedSpendUsd": 113352.92102589284,
      "estimatedSpendUsd": 175834.42284887802,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-05-31",
      "totalTokens": 288600168394,
      "catalogMatchedTokens": 98184656578,
      "knownFreeTokens": 27622475898,
      "unmatchedTokens": 162793035918,
      "matchedSpendUsd": 48305.0205035051,
      "imputedSpendUsd": 80091.13859454938,
      "estimatedSpendUsd": 128396.15909805449,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-06-01",
      "totalTokens": 295219520457,
      "catalogMatchedTokens": 99363293562,
      "knownFreeTokens": 28874270415,
      "unmatchedTokens": 166981956480,
      "matchedSpendUsd": 47398.65046184031,
      "imputedSpendUsd": 79654.35831382925,
      "estimatedSpendUsd": 127053.00877566956,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-06-02",
      "totalTokens": 364374914687,
      "catalogMatchedTokens": 124114786751,
      "knownFreeTokens": 30234034989,
      "unmatchedTokens": 210026092947,
      "matchedSpendUsd": 67187.92164237387,
      "imputedSpendUsd": 113694.88716994692,
      "estimatedSpendUsd": 180882.80881232079,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-06-03",
      "totalTokens": 395741118681,
      "catalogMatchedTokens": 123661405121,
      "knownFreeTokens": 31290462014,
      "unmatchedTokens": 240789251546,
      "matchedSpendUsd": 66595.77244213443,
      "imputedSpendUsd": 129673.00660039282,
      "estimatedSpendUsd": 196268.77904252725,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-06-04",
      "totalTokens": 402370845061,
      "catalogMatchedTokens": 121370082414,
      "knownFreeTokens": 31703861966,
      "unmatchedTokens": 249296900681,
      "matchedSpendUsd": 67421.05584222732,
      "imputedSpendUsd": 138484.3771035383,
      "estimatedSpendUsd": 205905.4329457656,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-06-05",
      "totalTokens": 352830171237,
      "catalogMatchedTokens": 109539886444,
      "knownFreeTokens": 31794569466,
      "unmatchedTokens": 211495715327,
      "matchedSpendUsd": 78037.47386613653,
      "imputedSpendUsd": 150671.97797460054,
      "estimatedSpendUsd": 228709.45184073708,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-06-06",
      "totalTokens": 304215269313,
      "catalogMatchedTokens": 92797507388,
      "knownFreeTokens": 30063251366,
      "unmatchedTokens": 181354510559,
      "matchedSpendUsd": 106059.17067289489,
      "imputedSpendUsd": 207271.82797329707,
      "estimatedSpendUsd": 313330.99864619196,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-06-07",
      "totalTokens": 270384691186,
      "catalogMatchedTokens": 74801554190,
      "knownFreeTokens": 27789713927,
      "unmatchedTokens": 167793423069,
      "matchedSpendUsd": 76043.24882239405,
      "imputedSpendUsd": 170578.76884198468,
      "estimatedSpendUsd": 246622.01766437874,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-06-08",
      "totalTokens": 275452808619,
      "catalogMatchedTokens": 75640398087,
      "knownFreeTokens": 32098477752,
      "unmatchedTokens": 167713932780,
      "matchedSpendUsd": 77599.71871853537,
      "imputedSpendUsd": 172058.243188227,
      "estimatedSpendUsd": 249657.9619067624,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-06-09",
      "totalTokens": 318563944013,
      "catalogMatchedTokens": 90402498637,
      "knownFreeTokens": 32451847779,
      "unmatchedTokens": 195709597597,
      "matchedSpendUsd": 98125.5182724257,
      "imputedSpendUsd": 212428.92602122875,
      "estimatedSpendUsd": 310554.44429365447,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-06-10",
      "totalTokens": 338769282506,
      "catalogMatchedTokens": 81948567417,
      "knownFreeTokens": 32143157581,
      "unmatchedTokens": 224677557508,
      "matchedSpendUsd": 97368.65153114495,
      "imputedSpendUsd": 266954.64598600176,
      "estimatedSpendUsd": 364323.2975171467,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-06-11",
      "totalTokens": 324423607390,
      "catalogMatchedTokens": 76290105610,
      "knownFreeTokens": 32970861322,
      "unmatchedTokens": 215162640458,
      "matchedSpendUsd": 96866.98944443624,
      "imputedSpendUsd": 273196.07248453144,
      "estimatedSpendUsd": 370063.0619289677,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-06-12",
      "totalTokens": 282516932434,
      "catalogMatchedTokens": 69645585729,
      "knownFreeTokens": 30442579045,
      "unmatchedTokens": 182428767660,
      "matchedSpendUsd": 87690.94124839152,
      "imputedSpendUsd": 229696.54400118464,
      "estimatedSpendUsd": 317387.48524957616,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-06-13",
      "totalTokens": 296812822131,
      "catalogMatchedTokens": 70607196716,
      "knownFreeTokens": 32654179320,
      "unmatchedTokens": 193551446095,
      "matchedSpendUsd": 92658.26809279155,
      "imputedSpendUsd": 253998.7793900621,
      "estimatedSpendUsd": 346657.04748285364,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-06-14",
      "totalTokens": 260938723000,
      "catalogMatchedTokens": 59380930084,
      "knownFreeTokens": 33002969091,
      "unmatchedTokens": 168554823825,
      "matchedSpendUsd": 69149.19776485182,
      "imputedSpendUsd": 196282.38948778607,
      "estimatedSpendUsd": 265431.5872526379,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-06-16",
      "totalTokens": 316856763083,
      "catalogMatchedTokens": 69959367383,
      "knownFreeTokens": 33739517809,
      "unmatchedTokens": 213157877891,
      "matchedSpendUsd": 87054.27325621762,
      "imputedSpendUsd": 265244.02439276106,
      "estimatedSpendUsd": 352298.29764897865,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-06-17",
      "totalTokens": 311927875980,
      "catalogMatchedTokens": 71334555375,
      "knownFreeTokens": 34968444086,
      "unmatchedTokens": 205624876519,
      "matchedSpendUsd": 86081.8100078711,
      "imputedSpendUsd": 248134.4624684361,
      "estimatedSpendUsd": 334216.27247630723,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-06-18",
      "totalTokens": 345151126563,
      "catalogMatchedTokens": 81207629380,
      "knownFreeTokens": 32484537758,
      "unmatchedTokens": 231458959425,
      "matchedSpendUsd": 95670.02171070037,
      "imputedSpendUsd": 272679.8435367141,
      "estimatedSpendUsd": 368349.86524741445,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-06-19",
      "totalTokens": 315354469724,
      "catalogMatchedTokens": 78463972226,
      "knownFreeTokens": 30843881762,
      "unmatchedTokens": 206046615736,
      "matchedSpendUsd": 94277.9673243955,
      "imputedSpendUsd": 247574.21214553236,
      "estimatedSpendUsd": 341852.17946992785,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-06-20",
      "totalTokens": 325911386735,
      "catalogMatchedTokens": 81259873304,
      "knownFreeTokens": 32455331917,
      "unmatchedTokens": 212196181514,
      "matchedSpendUsd": 94025.13061938746,
      "imputedSpendUsd": 245530.45522416508,
      "estimatedSpendUsd": 339555.58584355254,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-06-21",
      "totalTokens": 320183191755,
      "catalogMatchedTokens": 66777814808,
      "knownFreeTokens": 31011539172,
      "unmatchedTokens": 222393837775,
      "matchedSpendUsd": 75111.79552640817,
      "imputedSpendUsd": 250148.95317131278,
      "estimatedSpendUsd": 325260.74869772093,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-06-22",
      "totalTokens": 319506734767,
      "catalogMatchedTokens": 70682750347,
      "knownFreeTokens": 30985073049,
      "unmatchedTokens": 217838911371,
      "matchedSpendUsd": 79341.95648214259,
      "imputedSpendUsd": 244525.9322998143,
      "estimatedSpendUsd": 323867.88878195686,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-06-23",
      "totalTokens": 355834204069,
      "catalogMatchedTokens": 83477338218,
      "knownFreeTokens": 32149217986,
      "unmatchedTokens": 240207647865,
      "matchedSpendUsd": 96361.00829333212,
      "imputedSpendUsd": 277280.65654889337,
      "estimatedSpendUsd": 373641.6648422255,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-06-24",
      "totalTokens": 371824750027,
      "catalogMatchedTokens": 86405404296,
      "knownFreeTokens": 29699197075,
      "unmatchedTokens": 255720148656,
      "matchedSpendUsd": 101467.4868070539,
      "imputedSpendUsd": 300296.96662447916,
      "estimatedSpendUsd": 401764.45343153307,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-06-25",
      "totalTokens": 383015104888,
      "catalogMatchedTokens": 97342651390,
      "knownFreeTokens": 31991625175,
      "unmatchedTokens": 253680828323,
      "matchedSpendUsd": 113203.90171856407,
      "imputedSpendUsd": 295016.204585434,
      "estimatedSpendUsd": 408220.10630399804,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-06-26",
      "totalTokens": 373973432435,
      "catalogMatchedTokens": 114755337274,
      "knownFreeTokens": 31757152029,
      "unmatchedTokens": 227460943132,
      "matchedSpendUsd": 134030.1944570324,
      "imputedSpendUsd": 265666.3747723503,
      "estimatedSpendUsd": 399696.5692293827,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-06-27",
      "totalTokens": 333429689986,
      "catalogMatchedTokens": 99098691392,
      "knownFreeTokens": 32274647535,
      "unmatchedTokens": 202056351059,
      "matchedSpendUsd": 109530.22782643385,
      "imputedSpendUsd": 223325.63482323414,
      "estimatedSpendUsd": 332855.862649668,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-06-28",
      "totalTokens": 259521603134,
      "catalogMatchedTokens": 89807275037,
      "knownFreeTokens": 30343980449,
      "unmatchedTokens": 139370347648,
      "matchedSpendUsd": 90183.71965292002,
      "imputedSpendUsd": 139954.5454980002,
      "estimatedSpendUsd": 230138.2651509202,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-06-29",
      "totalTokens": 281077592894,
      "catalogMatchedTokens": 100496534490,
      "knownFreeTokens": 32322656473,
      "unmatchedTokens": 148258401931,
      "matchedSpendUsd": 98451.38463192483,
      "imputedSpendUsd": 145241.27650268178,
      "estimatedSpendUsd": 243692.6611346066,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-06-30",
      "totalTokens": 315454333288,
      "catalogMatchedTokens": 108521964247,
      "knownFreeTokens": 31602428258,
      "unmatchedTokens": 175329940783,
      "matchedSpendUsd": 125641.22872410883,
      "imputedSpendUsd": 202988.1171516883,
      "estimatedSpendUsd": 328629.3458757971,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-07-01",
      "totalTokens": 347819643900,
      "catalogMatchedTokens": 104815813829,
      "knownFreeTokens": 30540059460,
      "unmatchedTokens": 212463770611,
      "matchedSpendUsd": 124680.22954222381,
      "imputedSpendUsd": 252729.34227656317,
      "estimatedSpendUsd": 377409.57181878696,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-07-02",
      "totalTokens": 307981945626,
      "catalogMatchedTokens": 106328873223,
      "knownFreeTokens": 31137764341,
      "unmatchedTokens": 170515308062,
      "matchedSpendUsd": 130574.07555882879,
      "imputedSpendUsd": 209396.35720703224,
      "estimatedSpendUsd": 339970.43276586104,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-07-03",
      "totalTokens": 311736368098,
      "catalogMatchedTokens": 111230684943,
      "knownFreeTokens": 30169465559,
      "unmatchedTokens": 170336217596,
      "matchedSpendUsd": 130633.21853560144,
      "imputedSpendUsd": 200048.82959363965,
      "estimatedSpendUsd": 330682.0481292411,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-07-04",
      "totalTokens": 299561203271,
      "catalogMatchedTokens": 110532698490,
      "knownFreeTokens": 30447477323,
      "unmatchedTokens": 158581027458,
      "matchedSpendUsd": 132255.6806183438,
      "imputedSpendUsd": 189746.94372011122,
      "estimatedSpendUsd": 322002.62433845503,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-07-05",
      "totalTokens": 253061798022,
      "catalogMatchedTokens": 88130836045,
      "knownFreeTokens": 30409677685,
      "unmatchedTokens": 134521284292,
      "matchedSpendUsd": 101285.1892913793,
      "imputedSpendUsd": 154599.8467128767,
      "estimatedSpendUsd": 255885.036004256,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-07-06",
      "totalTokens": 274289625800,
      "catalogMatchedTokens": 86692767366,
      "knownFreeTokens": 33212414503,
      "unmatchedTokens": 154384443931,
      "matchedSpendUsd": 101247.5827779816,
      "imputedSpendUsd": 180303.98891922925,
      "estimatedSpendUsd": 281551.57169721083,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-07-07",
      "totalTokens": 333244344472,
      "catalogMatchedTokens": 107086237139,
      "knownFreeTokens": 35213389292,
      "unmatchedTokens": 190944718041,
      "matchedSpendUsd": 137009.9545343877,
      "imputedSpendUsd": 244301.48856029916,
      "estimatedSpendUsd": 381311.44309468684,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-07-08",
      "totalTokens": 348300492893,
      "catalogMatchedTokens": 119473222927,
      "knownFreeTokens": 32758778415,
      "unmatchedTokens": 196068491551,
      "matchedSpendUsd": 137073.49201955134,
      "imputedSpendUsd": 224952.438324385,
      "estimatedSpendUsd": 362025.9303439363,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-07-09",
      "totalTokens": 350738237774,
      "catalogMatchedTokens": 125383680123,
      "knownFreeTokens": 35569986214,
      "unmatchedTokens": 189784571437,
      "matchedSpendUsd": 149648.02128860436,
      "imputedSpendUsd": 226511.8200294638,
      "estimatedSpendUsd": 376159.84131806815,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-07-10",
      "totalTokens": 375287543974,
      "catalogMatchedTokens": 125606754905,
      "knownFreeTokens": 41914003172,
      "unmatchedTokens": 207766785897,
      "matchedSpendUsd": 150155.92318051567,
      "imputedSpendUsd": 248373.69269039776,
      "estimatedSpendUsd": 398529.61587091343,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-07-11",
      "totalTokens": 353861055816,
      "catalogMatchedTokens": 121509680494,
      "knownFreeTokens": 43587320539,
      "unmatchedTokens": 188764054783,
      "matchedSpendUsd": 141868.3148461919,
      "imputedSpendUsd": 220390.98651831946,
      "estimatedSpendUsd": 362259.30136451137,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-07-12",
      "totalTokens": 300696977506,
      "catalogMatchedTokens": 95831904458,
      "knownFreeTokens": 52829101874,
      "unmatchedTokens": 152035971174,
      "matchedSpendUsd": 106738.71880364593,
      "imputedSpendUsd": 169339.479028021,
      "estimatedSpendUsd": 276078.1978316669,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-07-13",
      "totalTokens": 309570142792,
      "catalogMatchedTokens": 92172514309,
      "knownFreeTokens": 55140725727,
      "unmatchedTokens": 162256902756,
      "matchedSpendUsd": 102052.143955557,
      "imputedSpendUsd": 179648.61783336735,
      "estimatedSpendUsd": 281700.76178892434,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-07-14",
      "totalTokens": 372143032204,
      "catalogMatchedTokens": 118146894626,
      "knownFreeTokens": 51431354743,
      "unmatchedTokens": 202564782835,
      "matchedSpendUsd": 142786.68626946997,
      "imputedSpendUsd": 244810.10853026176,
      "estimatedSpendUsd": 387596.7947997317,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-07-16",
      "totalTokens": 393212930827,
      "catalogMatchedTokens": 149341997297,
      "knownFreeTokens": 57507416480,
      "unmatchedTokens": 186363517050,
      "matchedSpendUsd": 173839.09317138052,
      "imputedSpendUsd": 216933.38371370442,
      "estimatedSpendUsd": 390772.47688508494,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-07-17",
      "totalTokens": 387832453655,
      "catalogMatchedTokens": 141140569390,
      "knownFreeTokens": 57961043337,
      "unmatchedTokens": 188730840928,
      "matchedSpendUsd": 172182.98794594134,
      "imputedSpendUsd": 230240.25090007606,
      "estimatedSpendUsd": 402423.2388460174,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-07-18",
      "totalTokens": 384226470319,
      "catalogMatchedTokens": 144965690814,
      "knownFreeTokens": 55822911465,
      "unmatchedTokens": 183437868040,
      "matchedSpendUsd": 168488.22592090516,
      "imputedSpendUsd": 213203.00534026683,
      "estimatedSpendUsd": 381691.231261172,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-07-19",
      "totalTokens": 345796902507,
      "catalogMatchedTokens": 132672423316,
      "knownFreeTokens": 56212365011,
      "unmatchedTokens": 156912114180,
      "matchedSpendUsd": 148831.77947757975,
      "imputedSpendUsd": 176023.83819714398,
      "estimatedSpendUsd": 324855.61767472373,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-07-20",
      "totalTokens": 339423137933,
      "catalogMatchedTokens": 133440884315,
      "knownFreeTokens": 48735951698,
      "unmatchedTokens": 157246301920,
      "matchedSpendUsd": 141216.92155283838,
      "imputedSpendUsd": 166409.55878478417,
      "estimatedSpendUsd": 307626.4803376226,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-07-21",
      "totalTokens": 411420971977,
      "catalogMatchedTokens": 165364778236,
      "knownFreeTokens": 48228318902,
      "unmatchedTokens": 197827874839,
      "matchedSpendUsd": 192477.21739418298,
      "imputedSpendUsd": 230262.812179226,
      "estimatedSpendUsd": 422740.029573409,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-07-22",
      "totalTokens": 439002125731,
      "catalogMatchedTokens": 173954164501,
      "knownFreeTokens": 57971162156,
      "unmatchedTokens": 207076799074,
      "matchedSpendUsd": 203873.70133353546,
      "imputedSpendUsd": 242693.3187177276,
      "estimatedSpendUsd": 446567.02005126304,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-07-23",
      "totalTokens": 464710917479,
      "catalogMatchedTokens": 193224824856,
      "knownFreeTokens": 62396524196,
      "unmatchedTokens": 209089568427,
      "matchedSpendUsd": 200667.91580633534,
      "imputedSpendUsd": 217143.77510426487,
      "estimatedSpendUsd": 417811.69091060024,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-07-24",
      "totalTokens": 480589511202,
      "catalogMatchedTokens": 196224738856,
      "knownFreeTokens": 73807047238,
      "unmatchedTokens": 210557725108,
      "matchedSpendUsd": 200776.6710354383,
      "imputedSpendUsd": 215442.14737879118,
      "estimatedSpendUsd": 416218.8184142295,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-07-25",
      "totalTokens": 444545364757,
      "catalogMatchedTokens": 165397258872,
      "knownFreeTokens": 68575533312,
      "unmatchedTokens": 210572572573,
      "matchedSpendUsd": 168514.31019643298,
      "imputedSpendUsd": 214540.99091744117,
      "estimatedSpendUsd": 383055.3011138742,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-07-26",
      "totalTokens": 374916246404,
      "catalogMatchedTokens": 142290603779,
      "knownFreeTokens": 67833600196,
      "unmatchedTokens": 164792042429,
      "matchedSpendUsd": 132554.7454619728,
      "imputedSpendUsd": 153516.5826709252,
      "estimatedSpendUsd": 286071.328132898,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-07-27",
      "totalTokens": 381299360956,
      "catalogMatchedTokens": 134370410113,
      "knownFreeTokens": 76024069161,
      "unmatchedTokens": 170904881682,
      "matchedSpendUsd": 136078.47496516464,
      "imputedSpendUsd": 173077.35865233067,
      "estimatedSpendUsd": 309155.8336174953,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-07-28",
      "totalTokens": 481812982036,
      "catalogMatchedTokens": 181154663261,
      "knownFreeTokens": 75319910684,
      "unmatchedTokens": 225338408091,
      "matchedSpendUsd": 181463.39233222135,
      "imputedSpendUsd": 225722.43639139325,
      "estimatedSpendUsd": 407185.82872361457,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-07-29",
      "totalTokens": 514471143689,
      "catalogMatchedTokens": 199942514986,
      "knownFreeTokens": 76652539704,
      "unmatchedTokens": 237876088999,
      "matchedSpendUsd": 193798.33118216792,
      "imputedSpendUsd": 230566.21589147748,
      "estimatedSpendUsd": 424364.5470736454,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-07-30",
      "totalTokens": 509064942422,
      "catalogMatchedTokens": 194318447776,
      "knownFreeTokens": 81199668839,
      "unmatchedTokens": 233546825807,
      "matchedSpendUsd": 191039.08927349077,
      "imputedSpendUsd": 229605.44104549196,
      "estimatedSpendUsd": 420644.5303189827,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-07-31",
      "totalTokens": 498032267972,
      "catalogMatchedTokens": 187161056192,
      "knownFreeTokens": 76117089043,
      "unmatchedTokens": 234754122737,
      "matchedSpendUsd": 181388.5268266398,
      "imputedSpendUsd": 227513.70053213413,
      "estimatedSpendUsd": 408902.22735877393,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-08-01",
      "totalTokens": 499064274817,
      "catalogMatchedTokens": 170027695486,
      "knownFreeTokens": 71570863781,
      "unmatchedTokens": 257465715550,
      "matchedSpendUsd": 169185.24830256568,
      "imputedSpendUsd": 256190.0335719786,
      "estimatedSpendUsd": 425375.2818745443,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-08-02",
      "totalTokens": 456016334999,
      "catalogMatchedTokens": 167731592531,
      "knownFreeTokens": 73714519820,
      "unmatchedTokens": 214570222648,
      "matchedSpendUsd": 153561.19257512412,
      "imputedSpendUsd": 196442.7737419059,
      "estimatedSpendUsd": 350003.96631703,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-08-03",
      "totalTokens": 449623336077,
      "catalogMatchedTokens": 159813357605,
      "knownFreeTokens": 76361454045,
      "unmatchedTokens": 213448524427,
      "matchedSpendUsd": 137731.472406168,
      "imputedSpendUsd": 183955.7092900653,
      "estimatedSpendUsd": 321687.18169623334,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-08-04",
      "totalTokens": 537927259052,
      "catalogMatchedTokens": 203090499142,
      "knownFreeTokens": 80778086929,
      "unmatchedTokens": 254058672981,
      "matchedSpendUsd": 194371.8373317344,
      "imputedSpendUsd": 243151.9508101246,
      "estimatedSpendUsd": 437523.788141859,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-08-05",
      "totalTokens": 539539996362,
      "catalogMatchedTokens": 208111137490,
      "knownFreeTokens": 80533871841,
      "unmatchedTokens": 250894987031,
      "matchedSpendUsd": 196051.84925433958,
      "imputedSpendUsd": 236356.52934929857,
      "estimatedSpendUsd": 432408.37860363815,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-08-06",
      "totalTokens": 552586703600,
      "catalogMatchedTokens": 232641084611,
      "knownFreeTokens": 57994514298,
      "unmatchedTokens": 261951104691,
      "matchedSpendUsd": 322293.4762891481,
      "imputedSpendUsd": 362898.6354229415,
      "estimatedSpendUsd": 685192.1117120895,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-08-07",
      "totalTokens": 548248080187,
      "catalogMatchedTokens": 249528644264,
      "knownFreeTokens": 53203990644,
      "unmatchedTokens": 245515445279,
      "matchedSpendUsd": 347009.5748669409,
      "imputedSpendUsd": 341428.57843365,
      "estimatedSpendUsd": 688438.1533005909,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-08-08",
      "totalTokens": 486043209609,
      "catalogMatchedTokens": 249101665284,
      "knownFreeTokens": 55548739820,
      "unmatchedTokens": 181392804505,
      "matchedSpendUsd": 324908.51811998326,
      "imputedSpendUsd": 236594.43320924634,
      "estimatedSpendUsd": 561502.9513292296,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-08-09",
      "totalTokens": 378181043372,
      "catalogMatchedTokens": 180838299405,
      "knownFreeTokens": 55051408816,
      "unmatchedTokens": 142291335151,
      "matchedSpendUsd": 256702.36815190315,
      "imputedSpendUsd": 201984.44035880995,
      "estimatedSpendUsd": 458686.8085107131,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-08-10",
      "totalTokens": 388699957625,
      "catalogMatchedTokens": 178865345615,
      "knownFreeTokens": 61128011154,
      "unmatchedTokens": 148706600856,
      "matchedSpendUsd": 240977.7665386385,
      "imputedSpendUsd": 200346.1566052316,
      "estimatedSpendUsd": 441323.9231438701,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-08-11",
      "totalTokens": 478600254157,
      "catalogMatchedTokens": 213831066033,
      "knownFreeTokens": 71934774044,
      "unmatchedTokens": 192834414080,
      "matchedSpendUsd": 314097.10277764156,
      "imputedSpendUsd": 283255.0569102276,
      "estimatedSpendUsd": 597352.1596878691,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-08-12",
      "totalTokens": 519093889487,
      "catalogMatchedTokens": 240901892826,
      "knownFreeTokens": 72570309119,
      "unmatchedTokens": 205621687542,
      "matchedSpendUsd": 347461.23652583204,
      "imputedSpendUsd": 296575.36091456,
      "estimatedSpendUsd": 644036.597440392,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-08-13",
      "totalTokens": 486377558919,
      "catalogMatchedTokens": 229623177940,
      "knownFreeTokens": 68765375342,
      "unmatchedTokens": 187989005637,
      "matchedSpendUsd": 340685.8605269389,
      "imputedSpendUsd": 278914.3357809453,
      "estimatedSpendUsd": 619600.1963078843,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-08-14",
      "totalTokens": 477464329038,
      "catalogMatchedTokens": 214102639205,
      "knownFreeTokens": 59989630784,
      "unmatchedTokens": 203372059049,
      "matchedSpendUsd": 306238.9779420851,
      "imputedSpendUsd": 290890.62954292016,
      "estimatedSpendUsd": 597129.6074850053,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-08-15",
      "totalTokens": 445390829459,
      "catalogMatchedTokens": 196534642093,
      "knownFreeTokens": 62994052036,
      "unmatchedTokens": 185862135330,
      "matchedSpendUsd": 281334.44079091866,
      "imputedSpendUsd": 266057.0134120594,
      "estimatedSpendUsd": 547391.454202978,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-08-16",
      "totalTokens": 389454674939,
      "catalogMatchedTokens": 169501523374,
      "knownFreeTokens": 64431562184,
      "unmatchedTokens": 155521589381,
      "matchedSpendUsd": 223437.09249502246,
      "imputedSpendUsd": 205008.72829810582,
      "estimatedSpendUsd": 428445.8207931283,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-08-17",
      "totalTokens": 407273603704,
      "catalogMatchedTokens": 184968164195,
      "knownFreeTokens": 69999089368,
      "unmatchedTokens": 152306350141,
      "matchedSpendUsd": 239600.32427547214,
      "imputedSpendUsd": 197291.52333763425,
      "estimatedSpendUsd": 436891.84761310637,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-08-18",
      "totalTokens": 485260347251,
      "catalogMatchedTokens": 227323260576,
      "knownFreeTokens": 66572305946,
      "unmatchedTokens": 191364780729,
      "matchedSpendUsd": 318468.7779957935,
      "imputedSpendUsd": 268092.70514498255,
      "estimatedSpendUsd": 586561.483140776,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-08-19",
      "totalTokens": 493722773971,
      "catalogMatchedTokens": 232521006519,
      "knownFreeTokens": 64534080605,
      "unmatchedTokens": 196667686847,
      "matchedSpendUsd": 334837.32774008164,
      "imputedSpendUsd": 283207.45597362507,
      "estimatedSpendUsd": 618044.7837137068,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-08-20",
      "totalTokens": 493617116586,
      "catalogMatchedTokens": 232056176439,
      "knownFreeTokens": 59326019520,
      "unmatchedTokens": 202234920627,
      "matchedSpendUsd": 343378.14032210247,
      "imputedSpendUsd": 299251.03489474056,
      "estimatedSpendUsd": 642629.175216843,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-08-21",
      "totalTokens": 469360617547,
      "catalogMatchedTokens": 222718281675,
      "knownFreeTokens": 56066670347,
      "unmatchedTokens": 190575665525,
      "matchedSpendUsd": 324423.770120267,
      "imputedSpendUsd": 277603.05726954417,
      "estimatedSpendUsd": 602026.8273898112,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-08-22",
      "totalTokens": 459620039867,
      "catalogMatchedTokens": 226551559095,
      "knownFreeTokens": 50478804087,
      "unmatchedTokens": 182589676685,
      "matchedSpendUsd": 288587.2702289908,
      "imputedSpendUsd": 232587.48064683302,
      "estimatedSpendUsd": 521174.75087582384,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-08-23",
      "totalTokens": 397945064237,
      "catalogMatchedTokens": 194232659159,
      "knownFreeTokens": 47417007569,
      "unmatchedTokens": 156295397509,
      "matchedSpendUsd": 218091.2553887821,
      "imputedSpendUsd": 175493.96482454066,
      "estimatedSpendUsd": 393585.2202133228,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-08-24",
      "totalTokens": 407889643724,
      "catalogMatchedTokens": 204615997520,
      "knownFreeTokens": 47176368048,
      "unmatchedTokens": 156097278156,
      "matchedSpendUsd": 234651.6274177218,
      "imputedSpendUsd": 179010.83394616775,
      "estimatedSpendUsd": 413662.4613638895,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-08-25",
      "totalTokens": 493622049699,
      "catalogMatchedTokens": 244731576671,
      "knownFreeTokens": 48540358445,
      "unmatchedTokens": 200350114583,
      "matchedSpendUsd": 308329.3275209211,
      "imputedSpendUsd": 252414.57166420447,
      "estimatedSpendUsd": 560743.8991851256,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-08-26",
      "totalTokens": 503923094951,
      "catalogMatchedTokens": 254452730436,
      "knownFreeTokens": 43990155149,
      "unmatchedTokens": 205480209366,
      "matchedSpendUsd": 370148.0297726169,
      "imputedSpendUsd": 298908.54196677555,
      "estimatedSpendUsd": 669056.5717393925,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-08-27",
      "totalTokens": 521637394678,
      "catalogMatchedTokens": 255822223171,
      "knownFreeTokens": 42832693820,
      "unmatchedTokens": 222982477687,
      "matchedSpendUsd": 359810.08694781223,
      "imputedSpendUsd": 313621.48170672724,
      "estimatedSpendUsd": 673431.5686545395,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-08-28",
      "totalTokens": 535672761499,
      "catalogMatchedTokens": 246248468709,
      "knownFreeTokens": 39422642764,
      "unmatchedTokens": 250001650026,
      "matchedSpendUsd": 342774.7235597153,
      "imputedSpendUsd": 347999.1040204298,
      "estimatedSpendUsd": 690773.8275801451,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-08-29",
      "totalTokens": 610251515109,
      "catalogMatchedTokens": 277330719147,
      "knownFreeTokens": 38499186194,
      "unmatchedTokens": 294421609768,
      "matchedSpendUsd": 349160.1183474313,
      "imputedSpendUsd": 370677.59542406304,
      "estimatedSpendUsd": 719837.7137714943,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-08-30",
      "totalTokens": 521523584511,
      "catalogMatchedTokens": 233186993422,
      "knownFreeTokens": 49297501775,
      "unmatchedTokens": 239039089314,
      "matchedSpendUsd": 285127.5817454951,
      "imputedSpendUsd": 292283.1864614453,
      "estimatedSpendUsd": 577410.7682069404,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-08-31",
      "totalTokens": 538615331454,
      "catalogMatchedTokens": 232909221357,
      "knownFreeTokens": 50259297991,
      "unmatchedTokens": 255446812106,
      "matchedSpendUsd": 251611.41434676625,
      "imputedSpendUsd": 275958.7332347226,
      "estimatedSpendUsd": 527570.1475814888,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-09-01",
      "totalTokens": 713177483965,
      "catalogMatchedTokens": 356411624412,
      "knownFreeTokens": 42911547155,
      "unmatchedTokens": 313854312398,
      "matchedSpendUsd": 404209.1778389043,
      "imputedSpendUsd": 355944.6013717584,
      "estimatedSpendUsd": 760153.7792106627,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-09-02",
      "totalTokens": 640458972964,
      "catalogMatchedTokens": 251960742001,
      "knownFreeTokens": 43357941130,
      "unmatchedTokens": 345140289833,
      "matchedSpendUsd": 297086.4813124208,
      "imputedSpendUsd": 406954.3272944803,
      "estimatedSpendUsd": 704040.8086069011,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-09-03",
      "totalTokens": 697991366083,
      "catalogMatchedTokens": 282916593213,
      "knownFreeTokens": 51946584507,
      "unmatchedTokens": 363128188363,
      "matchedSpendUsd": 342464.6722470404,
      "imputedSpendUsd": 439559.14567997865,
      "estimatedSpendUsd": 782023.817927019,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-09-04",
      "totalTokens": 668785563468,
      "catalogMatchedTokens": 268999237808,
      "knownFreeTokens": 47702886474,
      "unmatchedTokens": 352083439186,
      "matchedSpendUsd": 374338.2617431965,
      "imputedSpendUsd": 489957.9035518517,
      "estimatedSpendUsd": 864296.1652950482,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-09-05",
      "totalTokens": 656252833815,
      "catalogMatchedTokens": 272271665668,
      "knownFreeTokens": 47732803474,
      "unmatchedTokens": 336248364673,
      "matchedSpendUsd": 330638.61253462674,
      "imputedSpendUsd": 408330.0129293787,
      "estimatedSpendUsd": 738968.6254640054,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-09-06",
      "totalTokens": 603488321805,
      "catalogMatchedTokens": 227793678135,
      "knownFreeTokens": 51749289866,
      "unmatchedTokens": 323945353804,
      "matchedSpendUsd": 279343.1550060043,
      "imputedSpendUsd": 397253.85674450727,
      "estimatedSpendUsd": 676597.0117505116,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-09-07",
      "totalTokens": 619571722342,
      "catalogMatchedTokens": 220069986463,
      "knownFreeTokens": 63506169446,
      "unmatchedTokens": 335995566433,
      "matchedSpendUsd": 259510.22812721203,
      "imputedSpendUsd": 396211.62111272034,
      "estimatedSpendUsd": 655721.8492399324,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-09-08",
      "totalTokens": 762151554820,
      "catalogMatchedTokens": 280260405933,
      "knownFreeTokens": 65035615588,
      "unmatchedTokens": 416855533299,
      "matchedSpendUsd": 323825.46645253355,
      "imputedSpendUsd": 481653.6144821652,
      "estimatedSpendUsd": 805479.0809346987,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-09-09",
      "totalTokens": 748493026824,
      "catalogMatchedTokens": 281578841356,
      "knownFreeTokens": 62914264173,
      "unmatchedTokens": 403999921295,
      "matchedSpendUsd": 307498.57487988553,
      "imputedSpendUsd": 441188.6896456657,
      "estimatedSpendUsd": 748687.2645255512,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-09-10",
      "totalTokens": 749592748652,
      "catalogMatchedTokens": 279522538493,
      "knownFreeTokens": 58914040507,
      "unmatchedTokens": 411156169652,
      "matchedSpendUsd": 326141.24075277644,
      "imputedSpendUsd": 479728.6975011513,
      "estimatedSpendUsd": 805869.9382539277,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-09-11",
      "totalTokens": 731589502627,
      "catalogMatchedTokens": 279707787232,
      "knownFreeTokens": 60176694599,
      "unmatchedTokens": 391705020796,
      "matchedSpendUsd": 354790.982299919,
      "imputedSpendUsd": 496852.12726935395,
      "estimatedSpendUsd": 851643.109569273,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-09-12",
      "totalTokens": 682942968401,
      "catalogMatchedTokens": 261437493519,
      "knownFreeTokens": 59714156032,
      "unmatchedTokens": 361791318850,
      "matchedSpendUsd": 330623.9497813844,
      "imputedSpendUsd": 457535.2724842049,
      "estimatedSpendUsd": 788159.2222655893,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-09-13",
      "totalTokens": 613463442764,
      "catalogMatchedTokens": 234369759176,
      "knownFreeTokens": 54537689107,
      "unmatchedTokens": 324555994481,
      "matchedSpendUsd": 248646.83026648688,
      "imputedSpendUsd": 344326.92833500984,
      "estimatedSpendUsd": 592973.7586014967,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-09-14",
      "totalTokens": 609240434697,
      "catalogMatchedTokens": 212252760352,
      "knownFreeTokens": 65744666697,
      "unmatchedTokens": 331243007648,
      "matchedSpendUsd": 244504.83697454634,
      "imputedSpendUsd": 381575.80353545444,
      "estimatedSpendUsd": 626080.6405100008,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-09-15",
      "totalTokens": 725965796379,
      "catalogMatchedTokens": 247364038962,
      "knownFreeTokens": 67909664374,
      "unmatchedTokens": 410692093043,
      "matchedSpendUsd": 316214.0361760084,
      "imputedSpendUsd": 525001.9562732393,
      "estimatedSpendUsd": 841215.9924492477,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-09-16",
      "totalTokens": 803652511533,
      "catalogMatchedTokens": 282866967512,
      "knownFreeTokens": 62126691169,
      "unmatchedTokens": 458658852852,
      "matchedSpendUsd": 383990.0415354975,
      "imputedSpendUsd": 622626.3656953569,
      "estimatedSpendUsd": 1006616.4072308544,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-09-17",
      "totalTokens": 750120281892,
      "catalogMatchedTokens": 252795856491,
      "knownFreeTokens": 55958832766,
      "unmatchedTokens": 441365592635,
      "matchedSpendUsd": 337798.03677843773,
      "imputedSpendUsd": 589774.0285903881,
      "estimatedSpendUsd": 927572.0653688258,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-09-18",
      "totalTokens": 748597258835,
      "catalogMatchedTokens": 259642533579,
      "knownFreeTokens": 48704145851,
      "unmatchedTokens": 440250579405,
      "matchedSpendUsd": 359756.0687923876,
      "imputedSpendUsd": 610003.3594153918,
      "estimatedSpendUsd": 969759.4282077794,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-09-19",
      "totalTokens": 710109208550,
      "catalogMatchedTokens": 253951717703,
      "knownFreeTokens": 39610396992,
      "unmatchedTokens": 416547093855,
      "matchedSpendUsd": 367003.25853246404,
      "imputedSpendUsd": 601981.1252302752,
      "estimatedSpendUsd": 968984.3837627392,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-09-20",
      "totalTokens": 571331950922,
      "catalogMatchedTokens": 212980384418,
      "knownFreeTokens": 97065004576,
      "unmatchedTokens": 261286561928,
      "matchedSpendUsd": 259515.48506716013,
      "imputedSpendUsd": 318376.3098445451,
      "estimatedSpendUsd": 577891.7949117052,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-09-21",
      "totalTokens": 607595765850,
      "catalogMatchedTokens": 214434162506,
      "knownFreeTokens": 134762486286,
      "unmatchedTokens": 258399117058,
      "matchedSpendUsd": 270106.3971945898,
      "imputedSpendUsd": 325485.7049414714,
      "estimatedSpendUsd": 595592.1021360612,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-09-22",
      "totalTokens": 708182416131,
      "catalogMatchedTokens": 252914994100,
      "knownFreeTokens": 130536723401,
      "unmatchedTokens": 324730698630,
      "matchedSpendUsd": 332335.5484539551,
      "imputedSpendUsd": 426702.87387693103,
      "estimatedSpendUsd": 759038.4223308861,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-09-23",
      "totalTokens": 742472408316,
      "catalogMatchedTokens": 265755054019,
      "knownFreeTokens": 139933844538,
      "unmatchedTokens": 336783509759,
      "matchedSpendUsd": 361407.64332075726,
      "imputedSpendUsd": 458001.20347886754,
      "estimatedSpendUsd": 819408.8467996249,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-09-24",
      "totalTokens": 776032293626,
      "catalogMatchedTokens": 270030682899,
      "knownFreeTokens": 150543000167,
      "unmatchedTokens": 355458610560,
      "matchedSpendUsd": 343382.6796969719,
      "imputedSpendUsd": 452016.5223635302,
      "estimatedSpendUsd": 795399.202060502,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-09-25",
      "totalTokens": 788701352249,
      "catalogMatchedTokens": 259414230096,
      "knownFreeTokens": 161454740972,
      "unmatchedTokens": 367832381181,
      "matchedSpendUsd": 330949.1068853764,
      "imputedSpendUsd": 469264.14942743856,
      "estimatedSpendUsd": 800213.256312815,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-09-26",
      "totalTokens": 774854727313,
      "catalogMatchedTokens": 229690729961,
      "knownFreeTokens": 171642674598,
      "unmatchedTokens": 373521322754,
      "matchedSpendUsd": 281625.13287611137,
      "imputedSpendUsd": 457976.6548285045,
      "estimatedSpendUsd": 739601.7877046159,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-09-27",
      "totalTokens": 717589473264,
      "catalogMatchedTokens": 217483212836,
      "knownFreeTokens": 218710017736,
      "unmatchedTokens": 281396242692,
      "matchedSpendUsd": 213601.56271244312,
      "imputedSpendUsd": 276373.86994897126,
      "estimatedSpendUsd": 489975.4326614144,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-09-28",
      "totalTokens": 750147399913,
      "catalogMatchedTokens": 239006895518,
      "knownFreeTokens": 201807266010,
      "unmatchedTokens": 309333238385,
      "matchedSpendUsd": 239392.15331801958,
      "imputedSpendUsd": 309831.85597774707,
      "estimatedSpendUsd": 549224.0092957667,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-09-29",
      "totalTokens": 838856679073,
      "catalogMatchedTokens": 258909063350,
      "knownFreeTokens": 184449692364,
      "unmatchedTokens": 395497923359,
      "matchedSpendUsd": 320712.7269710551,
      "imputedSpendUsd": 489906.44000896555,
      "estimatedSpendUsd": 810619.1669800207,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-09-30",
      "totalTokens": 908756341363,
      "catalogMatchedTokens": 354759923621,
      "knownFreeTokens": 211025716908,
      "unmatchedTokens": 342970700834,
      "matchedSpendUsd": 607934.1887313494,
      "imputedSpendUsd": 587731.5922327529,
      "estimatedSpendUsd": 1195665.7809641024,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-10-01",
      "totalTokens": 775173608351,
      "catalogMatchedTokens": 308758695400,
      "knownFreeTokens": 162688770142,
      "unmatchedTokens": 303726142809,
      "matchedSpendUsd": 520213.3344940372,
      "imputedSpendUsd": 511734.217943201,
      "estimatedSpendUsd": 1031947.5524372382,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-10-02",
      "totalTokens": 756705726947,
      "catalogMatchedTokens": 318250197460,
      "knownFreeTokens": 151648898037,
      "unmatchedTokens": 286806631450,
      "matchedSpendUsd": 476108.87712330173,
      "imputedSpendUsd": 429068.6520888613,
      "estimatedSpendUsd": 905177.5292121631,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-10-03",
      "totalTokens": 788794649883,
      "catalogMatchedTokens": 353874165575,
      "knownFreeTokens": 136617542895,
      "unmatchedTokens": 298302941413,
      "matchedSpendUsd": 505709.7324207899,
      "imputedSpendUsd": 426294.75490866456,
      "estimatedSpendUsd": 932004.4873294544,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-10-04",
      "totalTokens": 659066896093,
      "catalogMatchedTokens": 340534452138,
      "knownFreeTokens": 46428214520,
      "unmatchedTokens": 272104229435,
      "matchedSpendUsd": 426636.6047618567,
      "imputedSpendUsd": 340904.1988516477,
      "estimatedSpendUsd": 767540.8036135044,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-10-05",
      "totalTokens": 652969757580,
      "catalogMatchedTokens": 314044775324,
      "knownFreeTokens": 51337743431,
      "unmatchedTokens": 287587238825,
      "matchedSpendUsd": 405951.22085509764,
      "imputedSpendUsd": 371750.78166133486,
      "estimatedSpendUsd": 777702.0025164324,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-10-06",
      "totalTokens": 754198039772,
      "catalogMatchedTokens": 355589535089,
      "knownFreeTokens": 49214582218,
      "unmatchedTokens": 349393922465,
      "matchedSpendUsd": 502812.8089359258,
      "imputedSpendUsd": 494052.0522793143,
      "estimatedSpendUsd": 996864.8612152401,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-10-07",
      "totalTokens": 794072114739,
      "catalogMatchedTokens": 379257817730,
      "knownFreeTokens": 43199520744,
      "unmatchedTokens": 371614776265,
      "matchedSpendUsd": 601774.8602970032,
      "imputedSpendUsd": 589647.5157972282,
      "estimatedSpendUsd": 1191422.3760942314,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-10-08",
      "totalTokens": 762229990867,
      "catalogMatchedTokens": 386391388266,
      "knownFreeTokens": 18329085514,
      "unmatchedTokens": 357509517087,
      "matchedSpendUsd": 697538.5505813404,
      "imputedSpendUsd": 645399.14175371,
      "estimatedSpendUsd": 1342937.6923350506,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-10-09",
      "totalTokens": 793301227322,
      "catalogMatchedTokens": 407404577165,
      "knownFreeTokens": 18980420725,
      "unmatchedTokens": 366916229432,
      "matchedSpendUsd": 750373.5014724866,
      "imputedSpendUsd": 675800.4972400323,
      "estimatedSpendUsd": 1426173.998712519,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-10-10",
      "totalTokens": 718543585964,
      "catalogMatchedTokens": 346175723000,
      "knownFreeTokens": 18384721899,
      "unmatchedTokens": 353983141065,
      "matchedSpendUsd": 602590.3667597427,
      "imputedSpendUsd": 616180.7909364115,
      "estimatedSpendUsd": 1218771.1576961542,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-10-11",
      "totalTokens": 606528651400,
      "catalogMatchedTokens": 297929874189,
      "knownFreeTokens": 20057708372,
      "unmatchedTokens": 288541068839,
      "matchedSpendUsd": 522685.9709366254,
      "imputedSpendUsd": 506214.32017096033,
      "estimatedSpendUsd": 1028900.2911075857,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-10-12",
      "totalTokens": 590837662180,
      "catalogMatchedTokens": 289552434365,
      "knownFreeTokens": 21756154647,
      "unmatchedTokens": 279529073168,
      "matchedSpendUsd": 460863.9162062404,
      "imputedSpendUsd": 444910.3100660274,
      "estimatedSpendUsd": 905774.2262722678,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-10-13",
      "totalTokens": 729734457606,
      "catalogMatchedTokens": 362021165750,
      "knownFreeTokens": 22264520227,
      "unmatchedTokens": 345448771629,
      "matchedSpendUsd": 575261.1339158376,
      "imputedSpendUsd": 548927.164701645,
      "estimatedSpendUsd": 1124188.2986174827,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-10-14",
      "totalTokens": 717584744786,
      "catalogMatchedTokens": 327012144198,
      "knownFreeTokens": 22297447620,
      "unmatchedTokens": 368275152968,
      "matchedSpendUsd": 584681.0173081511,
      "imputedSpendUsd": 658457.1701908131,
      "estimatedSpendUsd": 1243138.1874989644,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-10-15",
      "totalTokens": 685403678592,
      "catalogMatchedTokens": 307698346407,
      "knownFreeTokens": 21836472366,
      "unmatchedTokens": 355868859819,
      "matchedSpendUsd": 601489.0881571049,
      "imputedSpendUsd": 695652.8642273175,
      "estimatedSpendUsd": 1297141.9523844225,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-10-16",
      "totalTokens": 707939948219,
      "catalogMatchedTokens": 323230413488,
      "knownFreeTokens": 20207472985,
      "unmatchedTokens": 364502061746,
      "matchedSpendUsd": 689650.0782421854,
      "imputedSpendUsd": 777707.9906866477,
      "estimatedSpendUsd": 1467358.0689288331,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-10-17",
      "totalTokens": 685830324309,
      "catalogMatchedTokens": 334833696044,
      "knownFreeTokens": 21911119333,
      "unmatchedTokens": 329085508932,
      "matchedSpendUsd": 760723.9335897493,
      "imputedSpendUsd": 747664.3653249235,
      "estimatedSpendUsd": 1508388.2989146728,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-10-18",
      "totalTokens": 561448579540,
      "catalogMatchedTokens": 285470837785,
      "knownFreeTokens": 21423469377,
      "unmatchedTokens": 254554272378,
      "matchedSpendUsd": 557765.8910402169,
      "imputedSpendUsd": 497359.7010912252,
      "estimatedSpendUsd": 1055125.5921314422,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-10-19",
      "totalTokens": 556555665134,
      "catalogMatchedTokens": 277464447911,
      "knownFreeTokens": 22911435315,
      "unmatchedTokens": 256179781908,
      "matchedSpendUsd": 517665.57986805926,
      "imputedSpendUsd": 477954.7662784378,
      "estimatedSpendUsd": 995620.3461464971,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-10-20",
      "totalTokens": 689957530774,
      "catalogMatchedTokens": 334334310980,
      "knownFreeTokens": 22607848489,
      "unmatchedTokens": 333015371305,
      "matchedSpendUsd": 657862.6917206406,
      "imputedSpendUsd": 655267.4414686718,
      "estimatedSpendUsd": 1313130.1331893124,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-10-21",
      "totalTokens": 747952422691,
      "catalogMatchedTokens": 366785349244,
      "knownFreeTokens": 20786002106,
      "unmatchedTokens": 360381071341,
      "matchedSpendUsd": 689241.391381743,
      "imputedSpendUsd": 677206.8501391411,
      "estimatedSpendUsd": 1366448.241520884,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-10-22",
      "totalTokens": 728888793419,
      "catalogMatchedTokens": 359640984164,
      "knownFreeTokens": 18713688073,
      "unmatchedTokens": 350534121182,
      "matchedSpendUsd": 672571.8710116127,
      "imputedSpendUsd": 655540.9425453035,
      "estimatedSpendUsd": 1328112.813556916,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-10-23",
      "totalTokens": 754399295557,
      "catalogMatchedTokens": 369234538942,
      "knownFreeTokens": 16938673971,
      "unmatchedTokens": 368226082644,
      "matchedSpendUsd": 726659.8679905471,
      "imputedSpendUsd": 724675.208802166,
      "estimatedSpendUsd": 1451335.0767927133,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-10-24",
      "totalTokens": 746130090866,
      "catalogMatchedTokens": 373349385843,
      "knownFreeTokens": 17635131304,
      "unmatchedTokens": 355145573719,
      "matchedSpendUsd": 692637.7468727101,
      "imputedSpendUsd": 658866.0362655213,
      "estimatedSpendUsd": 1351503.7831382314,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-10-25",
      "totalTokens": 612859382202,
      "catalogMatchedTokens": 304784559598,
      "knownFreeTokens": 24681999638,
      "unmatchedTokens": 283392822966,
      "matchedSpendUsd": 525501.6988241189,
      "imputedSpendUsd": 488618.6167029606,
      "estimatedSpendUsd": 1014120.3155270795,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-10-26",
      "totalTokens": 606124678848,
      "catalogMatchedTokens": 300364360121,
      "knownFreeTokens": 32335182396,
      "unmatchedTokens": 273425136331,
      "matchedSpendUsd": 507953.0943451638,
      "imputedSpendUsd": 462395.55190612446,
      "estimatedSpendUsd": 970348.6462512882,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-10-27",
      "totalTokens": 808198435444,
      "catalogMatchedTokens": 405642509974,
      "knownFreeTokens": 33906642724,
      "unmatchedTokens": 368649282746,
      "matchedSpendUsd": 771698.0544760843,
      "imputedSpendUsd": 701321.7976028363,
      "estimatedSpendUsd": 1473019.8520789207,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-10-28",
      "totalTokens": 836836800480,
      "catalogMatchedTokens": 401165225989,
      "knownFreeTokens": 38942801479,
      "unmatchedTokens": 396728773012,
      "matchedSpendUsd": 865601.7582916509,
      "imputedSpendUsd": 856029.1402064165,
      "estimatedSpendUsd": 1721630.8984980674,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-10-29",
      "totalTokens": 882670634720,
      "catalogMatchedTokens": 434961087707,
      "knownFreeTokens": 47407585940,
      "unmatchedTokens": 400301961073,
      "matchedSpendUsd": 856496.460477822,
      "imputedSpendUsd": 788248.0122275031,
      "estimatedSpendUsd": 1644744.472705325,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-10-30",
      "totalTokens": 839936886983,
      "catalogMatchedTokens": 400713085731,
      "knownFreeTokens": 51133889308,
      "unmatchedTokens": 388089911944,
      "matchedSpendUsd": 809212.5745334364,
      "imputedSpendUsd": 783720.9414355882,
      "estimatedSpendUsd": 1592933.5159690245,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-10-31",
      "totalTokens": 795584528430,
      "catalogMatchedTokens": 371387683846,
      "knownFreeTokens": 56144897557,
      "unmatchedTokens": 368051947027,
      "matchedSpendUsd": 793686.1962658367,
      "imputedSpendUsd": 786557.450799108,
      "estimatedSpendUsd": 1580243.6470649447,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-11-01",
      "totalTokens": 667615679989,
      "catalogMatchedTokens": 300107130902,
      "knownFreeTokens": 64504844668,
      "unmatchedTokens": 303003704419,
      "matchedSpendUsd": 588345.8536680286,
      "imputedSpendUsd": 594024.449219722,
      "estimatedSpendUsd": 1182370.3028877506,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-11-02",
      "totalTokens": 680316040142,
      "catalogMatchedTokens": 303567734368,
      "knownFreeTokens": 68008476286,
      "unmatchedTokens": 308739829488,
      "matchedSpendUsd": 560130.0102461823,
      "imputedSpendUsd": 569673.3357204499,
      "estimatedSpendUsd": 1129803.3459666322,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-11-03",
      "totalTokens": 855212355442,
      "catalogMatchedTokens": 386573529510,
      "knownFreeTokens": 72451222390,
      "unmatchedTokens": 396187603542,
      "matchedSpendUsd": 798996.8231353282,
      "imputedSpendUsd": 818867.8541877975,
      "estimatedSpendUsd": 1617864.6773231258,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-11-04",
      "totalTokens": 843660094744,
      "catalogMatchedTokens": 382480289567,
      "knownFreeTokens": 63117877947,
      "unmatchedTokens": 398061927230,
      "matchedSpendUsd": 722354.6219755391,
      "imputedSpendUsd": 751782.1984829673,
      "estimatedSpendUsd": 1474136.8204585065,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-11-05",
      "totalTokens": 870220639953,
      "catalogMatchedTokens": 394701598459,
      "knownFreeTokens": 71429713632,
      "unmatchedTokens": 404089327862,
      "matchedSpendUsd": 816862.5084104395,
      "imputedSpendUsd": 836291.0696788824,
      "estimatedSpendUsd": 1653153.578089322,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-11-06",
      "totalTokens": 815410486832,
      "catalogMatchedTokens": 418618069128,
      "knownFreeTokens": 85246241078,
      "unmatchedTokens": 311546176626,
      "matchedSpendUsd": 810000.8556097569,
      "imputedSpendUsd": 602823.1656475562,
      "estimatedSpendUsd": 1412824.021257313,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-11-07",
      "totalTokens": 902186629114,
      "catalogMatchedTokens": 438705289367,
      "knownFreeTokens": 75368497005,
      "unmatchedTokens": 388112842742,
      "matchedSpendUsd": 922006.9138837834,
      "imputedSpendUsd": 815679.0744226915,
      "estimatedSpendUsd": 1737685.9883064749,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-11-08",
      "totalTokens": 797042525948,
      "catalogMatchedTokens": 390398491807,
      "knownFreeTokens": 43501129428,
      "unmatchedTokens": 363142904713,
      "matchedSpendUsd": 751379.0537889855,
      "imputedSpendUsd": 698921.6860712913,
      "estimatedSpendUsd": 1450300.7398602767,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-11-09",
      "totalTokens": 744474553464,
      "catalogMatchedTokens": 332098223705,
      "knownFreeTokens": 47761197774,
      "unmatchedTokens": 364615131985,
      "matchedSpendUsd": 579002.2543570426,
      "imputedSpendUsd": 635694.4070243974,
      "estimatedSpendUsd": 1214696.66138144,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-11-10",
      "totalTokens": 910825672740,
      "catalogMatchedTokens": 379674125871,
      "knownFreeTokens": 47094569766,
      "unmatchedTokens": 484056977103,
      "matchedSpendUsd": 725787.6818804842,
      "imputedSpendUsd": 925326.6613933764,
      "estimatedSpendUsd": 1651114.3432738606,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-11-11",
      "totalTokens": 949647793603,
      "catalogMatchedTokens": 406262710785,
      "knownFreeTokens": 51078703816,
      "unmatchedTokens": 492306379002,
      "matchedSpendUsd": 788608.2599483817,
      "imputedSpendUsd": 955630.10485527,
      "estimatedSpendUsd": 1744238.3648036518,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-11-12",
      "totalTokens": 881916356487,
      "catalogMatchedTokens": 396461895811,
      "knownFreeTokens": 20608544677,
      "unmatchedTokens": 464845915999,
      "matchedSpendUsd": 833692.5641685672,
      "imputedSpendUsd": 977492.6361075536,
      "estimatedSpendUsd": 1811185.2002761208,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-11-13",
      "totalTokens": 901368356290,
      "catalogMatchedTokens": 403235148604,
      "knownFreeTokens": 22435455218,
      "unmatchedTokens": 475697752468,
      "matchedSpendUsd": 813549.5546177203,
      "imputedSpendUsd": 959746.9268063527,
      "estimatedSpendUsd": 1773296.481424073,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-11-14",
      "totalTokens": 812896999546,
      "catalogMatchedTokens": 374354811633,
      "knownFreeTokens": 22486245803,
      "unmatchedTokens": 416055942110,
      "matchedSpendUsd": 704813.4878709356,
      "imputedSpendUsd": 783325.953335035,
      "estimatedSpendUsd": 1488139.4412059705,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-11-15",
      "totalTokens": 693672882394,
      "catalogMatchedTokens": 305534428310,
      "knownFreeTokens": 21753187998,
      "unmatchedTokens": 366385266086,
      "matchedSpendUsd": 536290.7271300101,
      "imputedSpendUsd": 643099.443312563,
      "estimatedSpendUsd": 1179390.1704425733,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-11-16",
      "totalTokens": 777386360554,
      "catalogMatchedTokens": 348547033861,
      "knownFreeTokens": 22308261162,
      "unmatchedTokens": 406531065531,
      "matchedSpendUsd": 735326.4702559101,
      "imputedSpendUsd": 857654.8483425004,
      "estimatedSpendUsd": 1592981.3185984106,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-11-17",
      "totalTokens": 895158521563,
      "catalogMatchedTokens": 396586203606,
      "knownFreeTokens": 22592454140,
      "unmatchedTokens": 475979863817,
      "matchedSpendUsd": 730534.5023510591,
      "imputedSpendUsd": 876782.1718985694,
      "estimatedSpendUsd": 1607316.6742496286,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-11-18",
      "totalTokens": 946644725789,
      "catalogMatchedTokens": 391398313805,
      "knownFreeTokens": 22897642619,
      "unmatchedTokens": 532348769365,
      "matchedSpendUsd": 712638.6707291206,
      "imputedSpendUsd": 969274.2814256612,
      "estimatedSpendUsd": 1681912.9521547817,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-11-19",
      "totalTokens": 974905831481,
      "catalogMatchedTokens": 415980387610,
      "knownFreeTokens": 23711589181,
      "unmatchedTokens": 535213854690,
      "matchedSpendUsd": 727681.9765757879,
      "imputedSpendUsd": 936259.2258477022,
      "estimatedSpendUsd": 1663941.2024234901,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-11-20",
      "totalTokens": 950497881430,
      "catalogMatchedTokens": 388965539456,
      "knownFreeTokens": 26338840651,
      "unmatchedTokens": 535193501323,
      "matchedSpendUsd": 708020.0782929835,
      "imputedSpendUsd": 974193.6142686772,
      "estimatedSpendUsd": 1682213.6925616607,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-11-21",
      "totalTokens": 914059968966,
      "catalogMatchedTokens": 376531691604,
      "knownFreeTokens": 39650547121,
      "unmatchedTokens": 497877730241,
      "matchedSpendUsd": 679995.8404340063,
      "imputedSpendUsd": 899140.2135803852,
      "estimatedSpendUsd": 1579136.0540143915,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-11-22",
      "totalTokens": 766516913255,
      "catalogMatchedTokens": 322834883084,
      "knownFreeTokens": 45082968949,
      "unmatchedTokens": 398599061222,
      "matchedSpendUsd": 510872.1011876263,
      "imputedSpendUsd": 630765.6037433667,
      "estimatedSpendUsd": 1141637.704930993,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-11-23",
      "totalTokens": 824048259184,
      "catalogMatchedTokens": 320133313422,
      "knownFreeTokens": 103567174572,
      "unmatchedTokens": 400347771190,
      "matchedSpendUsd": 477886.1017780665,
      "imputedSpendUsd": 597628.0121691909,
      "estimatedSpendUsd": 1075514.1139472574,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-11-24",
      "totalTokens": 1015013853257,
      "catalogMatchedTokens": 395470128907,
      "knownFreeTokens": 125873611181,
      "unmatchedTokens": 493670113169,
      "matchedSpendUsd": 713078.3061124282,
      "imputedSpendUsd": 890144.2165804252,
      "estimatedSpendUsd": 1603222.5226928534,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-11-25",
      "totalTokens": 1043852595370,
      "catalogMatchedTokens": 417274544919,
      "knownFreeTokens": 138473293788,
      "unmatchedTokens": 488104756663,
      "matchedSpendUsd": 839443.6401336074,
      "imputedSpendUsd": 981934.8884060353,
      "estimatedSpendUsd": 1821378.5285396427,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-11-26",
      "totalTokens": 1084308770070,
      "catalogMatchedTokens": 421422382099,
      "knownFreeTokens": 254985331441,
      "unmatchedTokens": 407901056530,
      "matchedSpendUsd": 891953.3568430331,
      "imputedSpendUsd": 863335.0578571861,
      "estimatedSpendUsd": 1755288.4147002192,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-11-27",
      "totalTokens": 1088012755787,
      "catalogMatchedTokens": 417066750192,
      "knownFreeTokens": 273484263493,
      "unmatchedTokens": 397461742102,
      "matchedSpendUsd": 816264.5488308744,
      "imputedSpendUsd": 777894.4963727428,
      "estimatedSpendUsd": 1594159.0452036173,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-11-28",
      "totalTokens": 1103763003384,
      "catalogMatchedTokens": 374039767809,
      "knownFreeTokens": 359045238487,
      "unmatchedTokens": 370677997088,
      "matchedSpendUsd": 681362.101539708,
      "imputedSpendUsd": 675238.1987879425,
      "estimatedSpendUsd": 1356600.3003276505,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-11-29",
      "totalTokens": 927904867275,
      "catalogMatchedTokens": 306301080076,
      "knownFreeTokens": 310348302900,
      "unmatchedTokens": 311255484299,
      "matchedSpendUsd": 541270.2274239489,
      "imputedSpendUsd": 550025.245525315,
      "estimatedSpendUsd": 1091295.472949264,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-11-30",
      "totalTokens": 922030064198,
      "catalogMatchedTokens": 321158892571,
      "knownFreeTokens": 286629487845,
      "unmatchedTokens": 314241683782,
      "matchedSpendUsd": 604377.8151459262,
      "imputedSpendUsd": 591360.559103795,
      "estimatedSpendUsd": 1195738.3742497212,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-12-01",
      "totalTokens": 1015109519099,
      "catalogMatchedTokens": 389492163106,
      "knownFreeTokens": 238951483872,
      "unmatchedTokens": 386665872121,
      "matchedSpendUsd": 821959.5511738049,
      "imputedSpendUsd": 815995.1259823154,
      "estimatedSpendUsd": 1637954.6771561203,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-12-02",
      "totalTokens": 1026570896607,
      "catalogMatchedTokens": 413233097802,
      "knownFreeTokens": 240936122080,
      "unmatchedTokens": 372401676725,
      "matchedSpendUsd": 865547.2623454691,
      "imputedSpendUsd": 780022.8333516272,
      "estimatedSpendUsd": 1645570.0956970963,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-12-03",
      "totalTokens": 976117437403,
      "catalogMatchedTokens": 427462692407,
      "knownFreeTokens": 179028813348,
      "unmatchedTokens": 369625931648,
      "matchedSpendUsd": 941466.8697278433,
      "imputedSpendUsd": 814084.0710083493,
      "estimatedSpendUsd": 1755550.9407361927,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-12-04",
      "totalTokens": 898751591697,
      "catalogMatchedTokens": 455353944434,
      "knownFreeTokens": 30733529387,
      "unmatchedTokens": 412664117876,
      "matchedSpendUsd": 964419.3580429571,
      "imputedSpendUsd": 874004.2081858355,
      "estimatedSpendUsd": 1838423.5662287925,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-12-05",
      "totalTokens": 843822919210,
      "catalogMatchedTokens": 420012032607,
      "knownFreeTokens": 32022083877,
      "unmatchedTokens": 391788802726,
      "matchedSpendUsd": 796258.1889549725,
      "imputedSpendUsd": 742752.6315736377,
      "estimatedSpendUsd": 1539010.8205286101,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-12-06",
      "totalTokens": 703381365260,
      "catalogMatchedTokens": 366576145145,
      "knownFreeTokens": 30828372736,
      "unmatchedTokens": 305976847379,
      "matchedSpendUsd": 776116.5658619294,
      "imputedSpendUsd": 647815.476173759,
      "estimatedSpendUsd": 1423932.0420356884,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-12-07",
      "totalTokens": 719935353270,
      "catalogMatchedTokens": 379713069450,
      "knownFreeTokens": 34958689502,
      "unmatchedTokens": 305263594318,
      "matchedSpendUsd": 855839.9427979215,
      "imputedSpendUsd": 688037.3579919848,
      "estimatedSpendUsd": 1543877.3007899062,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-12-08",
      "totalTokens": 926168784356,
      "catalogMatchedTokens": 485503709123,
      "knownFreeTokens": 41467064375,
      "unmatchedTokens": 399198010858,
      "matchedSpendUsd": 1056630.006558446,
      "imputedSpendUsd": 868797.8874413605,
      "estimatedSpendUsd": 1925427.8939998066,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-12-09",
      "totalTokens": 933583522452,
      "catalogMatchedTokens": 504037577051,
      "knownFreeTokens": 39395407138,
      "unmatchedTokens": 390150538263,
      "matchedSpendUsd": 1006411.8780050285,
      "imputedSpendUsd": 779013.616832399,
      "estimatedSpendUsd": 1785425.4948374275,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-12-10",
      "totalTokens": 899477293159,
      "catalogMatchedTokens": 494111282236,
      "knownFreeTokens": 54317718372,
      "unmatchedTokens": 351048292551,
      "matchedSpendUsd": 1046190.1744583432,
      "imputedSpendUsd": 743280.486867774,
      "estimatedSpendUsd": 1789470.6613261173,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-12-11",
      "totalTokens": 850751596689,
      "catalogMatchedTokens": 478805292827,
      "knownFreeTokens": 61255235378,
      "unmatchedTokens": 310691068484,
      "matchedSpendUsd": 1037649.6426748344,
      "imputedSpendUsd": 673318.5305684772,
      "estimatedSpendUsd": 1710968.1732433117,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-12-12",
      "totalTokens": 838859646336,
      "catalogMatchedTokens": 457703569078,
      "knownFreeTokens": 54584218823,
      "unmatchedTokens": 326571858435,
      "matchedSpendUsd": 939106.0892624289,
      "imputedSpendUsd": 670052.9372227646,
      "estimatedSpendUsd": 1609159.0264851935,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-12-13",
      "totalTokens": 662233192347,
      "catalogMatchedTokens": 359597225388,
      "knownFreeTokens": 54492431197,
      "unmatchedTokens": 248143535762,
      "matchedSpendUsd": 615777.9497138859,
      "imputedSpendUsd": 424923.5169192653,
      "estimatedSpendUsd": 1040701.4666331513,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-12-14",
      "totalTokens": 661672600380,
      "catalogMatchedTokens": 364009017154,
      "knownFreeTokens": 49768826098,
      "unmatchedTokens": 247894757128,
      "matchedSpendUsd": 635405.9167586557,
      "imputedSpendUsd": 432719.48767670867,
      "estimatedSpendUsd": 1068125.4044353643,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-12-15",
      "totalTokens": 862177267218,
      "catalogMatchedTokens": 501608931768,
      "knownFreeTokens": 57988886417,
      "unmatchedTokens": 302579449033,
      "matchedSpendUsd": 974703.5736952972,
      "imputedSpendUsd": 587958.5701548583,
      "estimatedSpendUsd": 1562662.1438501556,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-12-16",
      "totalTokens": 885696419175,
      "catalogMatchedTokens": 487329200511,
      "knownFreeTokens": 61184089601,
      "unmatchedTokens": 337183129063,
      "matchedSpendUsd": 1007741.7584329968,
      "imputedSpendUsd": 697256.6368680341,
      "estimatedSpendUsd": 1704998.395301031,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-12-17",
      "totalTokens": 923604614263,
      "catalogMatchedTokens": 520568635890,
      "knownFreeTokens": 79579565756,
      "unmatchedTokens": 323456412617,
      "matchedSpendUsd": 1124975.4533413504,
      "imputedSpendUsd": 699005.8550067298,
      "estimatedSpendUsd": 1823981.3083480801,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-12-18",
      "totalTokens": 900483548874,
      "catalogMatchedTokens": 512440296687,
      "knownFreeTokens": 70229273794,
      "unmatchedTokens": 317813978393,
      "matchedSpendUsd": 1038630.2776506998,
      "imputedSpendUsd": 644155.4708981363,
      "estimatedSpendUsd": 1682785.748548836,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-12-19",
      "totalTokens": 858310522853,
      "catalogMatchedTokens": 472326381230,
      "knownFreeTokens": 84223265717,
      "unmatchedTokens": 301760875906,
      "matchedSpendUsd": 994168.1057303377,
      "imputedSpendUsd": 635156.2188877813,
      "estimatedSpendUsd": 1629324.3246181188,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-12-20",
      "totalTokens": 691575313543,
      "catalogMatchedTokens": 350548010402,
      "knownFreeTokens": 101129929148,
      "unmatchedTokens": 239897373993,
      "matchedSpendUsd": 666523.5785755957,
      "imputedSpendUsd": 456135.11262362066,
      "estimatedSpendUsd": 1122658.6911992165,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-12-21",
      "totalTokens": 718652924977,
      "catalogMatchedTokens": 371646225750,
      "knownFreeTokens": 120097966558,
      "unmatchedTokens": 226908732669,
      "matchedSpendUsd": 738071.7435033029,
      "imputedSpendUsd": 450629.9602509382,
      "estimatedSpendUsd": 1188701.703754241,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-12-22",
      "totalTokens": 895710872569,
      "catalogMatchedTokens": 475171078166,
      "knownFreeTokens": 128588783928,
      "unmatchedTokens": 291951010475,
      "matchedSpendUsd": 949509.0910936524,
      "imputedSpendUsd": 583390.1753236502,
      "estimatedSpendUsd": 1532899.2664173027,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-12-23",
      "totalTokens": 919893606912,
      "catalogMatchedTokens": 448519963293,
      "knownFreeTokens": 168948484987,
      "unmatchedTokens": 302425158632,
      "matchedSpendUsd": 865714.6434158037,
      "imputedSpendUsd": 583728.5066262197,
      "estimatedSpendUsd": 1449443.1500420235,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-12-24",
      "totalTokens": 832020782412,
      "catalogMatchedTokens": 430617103688,
      "knownFreeTokens": 118725571758,
      "unmatchedTokens": 282678106966,
      "matchedSpendUsd": 881380.356186548,
      "imputedSpendUsd": 578581.1303592565,
      "estimatedSpendUsd": 1459961.4865458044,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-12-25",
      "totalTokens": 737262325637,
      "catalogMatchedTokens": 386287322550,
      "knownFreeTokens": 101765901467,
      "unmatchedTokens": 249209101620,
      "matchedSpendUsd": 710715.6718245932,
      "imputedSpendUsd": 458510.55352647795,
      "estimatedSpendUsd": 1169226.2253510712,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-12-26",
      "totalTokens": 817227654508,
      "catalogMatchedTokens": 421182522830,
      "knownFreeTokens": 116822713399,
      "unmatchedTokens": 279222418279,
      "matchedSpendUsd": 792442.3087697668,
      "imputedSpendUsd": 525348.621577533,
      "estimatedSpendUsd": 1317790.9303472997,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-12-27",
      "totalTokens": 733624354484,
      "catalogMatchedTokens": 403806469454,
      "knownFreeTokens": 93467772856,
      "unmatchedTokens": 236350112174,
      "matchedSpendUsd": 692157.5902540227,
      "imputedSpendUsd": 405123.58387873595,
      "estimatedSpendUsd": 1097281.1741327588,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-12-28",
      "totalTokens": 729209611978,
      "catalogMatchedTokens": 402309545202,
      "knownFreeTokens": 99470933480,
      "unmatchedTokens": 227429133296,
      "matchedSpendUsd": 702911.9733299847,
      "imputedSpendUsd": 397362.33650024957,
      "estimatedSpendUsd": 1100274.3098302344,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-12-29",
      "totalTokens": 908489661987,
      "catalogMatchedTokens": 490716681189,
      "knownFreeTokens": 122961352126,
      "unmatchedTokens": 294811628672,
      "matchedSpendUsd": 918977.3208112762,
      "imputedSpendUsd": 552101.0616646559,
      "estimatedSpendUsd": 1471078.3824759321,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-12-30",
      "totalTokens": 875711094778,
      "catalogMatchedTokens": 479480571026,
      "knownFreeTokens": 114968459984,
      "unmatchedTokens": 281262063768,
      "matchedSpendUsd": 873082.09052768,
      "imputedSpendUsd": 512147.6978623587,
      "estimatedSpendUsd": 1385229.7883900388,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2025-12-31",
      "totalTokens": 768652128021,
      "catalogMatchedTokens": 417376527657,
      "knownFreeTokens": 104867433251,
      "unmatchedTokens": 246408167113,
      "matchedSpendUsd": 753570.3193804177,
      "imputedSpendUsd": 444888.1738310962,
      "estimatedSpendUsd": 1198458.4932115139,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-01-01",
      "totalTokens": 676146556672,
      "catalogMatchedTokens": 373691853931,
      "knownFreeTokens": 89793030990,
      "unmatchedTokens": 212661671751,
      "matchedSpendUsd": 619154.3292334551,
      "imputedSpendUsd": 352350.1873042375,
      "estimatedSpendUsd": 971504.5165376926,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-01-02",
      "totalTokens": 780433027499,
      "catalogMatchedTokens": 419549666295,
      "knownFreeTokens": 96856875795,
      "unmatchedTokens": 264026485409,
      "matchedSpendUsd": 707074.8680430767,
      "imputedSpendUsd": 444968.7541860186,
      "estimatedSpendUsd": 1152043.6222290953,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-01-03",
      "totalTokens": 752494217391,
      "catalogMatchedTokens": 405330857328,
      "knownFreeTokens": 98451863592,
      "unmatchedTokens": 248711496471,
      "matchedSpendUsd": 694479.1134782208,
      "imputedSpendUsd": 426133.21058171993,
      "estimatedSpendUsd": 1120612.3240599406,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-01-04",
      "totalTokens": 804614702335,
      "catalogMatchedTokens": 436219291749,
      "knownFreeTokens": 101364249140,
      "unmatchedTokens": 267031161446,
      "matchedSpendUsd": 850638.5414129196,
      "imputedSpendUsd": 520717.45101755694,
      "estimatedSpendUsd": 1371355.9924304765,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-01-05",
      "totalTokens": 920385666646,
      "catalogMatchedTokens": 508583987132,
      "knownFreeTokens": 106382570436,
      "unmatchedTokens": 305419109078,
      "matchedSpendUsd": 1132049.570486229,
      "imputedSpendUsd": 679827.8750374799,
      "estimatedSpendUsd": 1811877.4455237088,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-01-06",
      "totalTokens": 963414695887,
      "catalogMatchedTokens": 541294622387,
      "knownFreeTokens": 95994935746,
      "unmatchedTokens": 326125137754,
      "matchedSpendUsd": 1370595.0906580929,
      "imputedSpendUsd": 825771.2052905879,
      "estimatedSpendUsd": 2196366.2959486805,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-01-07",
      "totalTokens": 1017214808143,
      "catalogMatchedTokens": 593391106113,
      "knownFreeTokens": 95274240276,
      "unmatchedTokens": 328549461754,
      "matchedSpendUsd": 1619131.237336168,
      "imputedSpendUsd": 896482.422900662,
      "estimatedSpendUsd": 2515613.66023683,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-01-08",
      "totalTokens": 969015458231,
      "catalogMatchedTokens": 564995669951,
      "knownFreeTokens": 104968596942,
      "unmatchedTokens": 299051191338,
      "matchedSpendUsd": 1330316.5930040707,
      "imputedSpendUsd": 704134.1786372968,
      "estimatedSpendUsd": 2034450.7716413676,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-01-09",
      "totalTokens": 957089207783,
      "catalogMatchedTokens": 570996725258,
      "knownFreeTokens": 101335783286,
      "unmatchedTokens": 284756699239,
      "matchedSpendUsd": 1323688.4915321711,
      "imputedSpendUsd": 660124.9166517371,
      "estimatedSpendUsd": 1983813.408183908,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-01-10",
      "totalTokens": 802870338890,
      "catalogMatchedTokens": 464373113415,
      "knownFreeTokens": 107457118559,
      "unmatchedTokens": 231040106916,
      "matchedSpendUsd": 921882.6912801722,
      "imputedSpendUsd": 458665.39083419036,
      "estimatedSpendUsd": 1380548.0821143626,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-01-11",
      "totalTokens": 789693535502,
      "catalogMatchedTokens": 457877719798,
      "knownFreeTokens": 101356457005,
      "unmatchedTokens": 230459358699,
      "matchedSpendUsd": 875849.1954337509,
      "imputedSpendUsd": 440833.0765378705,
      "estimatedSpendUsd": 1316682.2719716213,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-01-12",
      "totalTokens": 1014313612337,
      "catalogMatchedTokens": 613607864410,
      "knownFreeTokens": 115864022080,
      "unmatchedTokens": 284841725847,
      "matchedSpendUsd": 1578096.6027866239,
      "imputedSpendUsd": 732565.1869264144,
      "estimatedSpendUsd": 2310661.789713038,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-01-13",
      "totalTokens": 1098350562760,
      "catalogMatchedTokens": 660392850418,
      "knownFreeTokens": 118662040254,
      "unmatchedTokens": 319295672088,
      "matchedSpendUsd": 1780649.8452982015,
      "imputedSpendUsd": 860932.6838532741,
      "estimatedSpendUsd": 2641582.5291514755,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-01-14",
      "totalTokens": 1168753721245,
      "catalogMatchedTokens": 762453026064,
      "knownFreeTokens": 111786485116,
      "unmatchedTokens": 294514210065,
      "matchedSpendUsd": 2352075.523033032,
      "imputedSpendUsd": 908540.7769384977,
      "estimatedSpendUsd": 3260616.2999715297,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-01-15",
      "totalTokens": 1227040917358,
      "catalogMatchedTokens": 748812515747,
      "knownFreeTokens": 119762268564,
      "unmatchedTokens": 358466133047,
      "matchedSpendUsd": 2404309.579745984,
      "imputedSpendUsd": 1150973.7612219572,
      "estimatedSpendUsd": 3555283.340967941,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-01-16",
      "totalTokens": 1111775956968,
      "catalogMatchedTokens": 665005830343,
      "knownFreeTokens": 116934360292,
      "unmatchedTokens": 329835766333,
      "matchedSpendUsd": 1536520.7901523993,
      "imputedSpendUsd": 762097.8481423295,
      "estimatedSpendUsd": 2298618.638294729,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-01-17",
      "totalTokens": 965416302518,
      "catalogMatchedTokens": 583921770993,
      "knownFreeTokens": 108764597919,
      "unmatchedTokens": 272729933606,
      "matchedSpendUsd": 1234377.1114627924,
      "imputedSpendUsd": 576535.4271369497,
      "estimatedSpendUsd": 1810912.538599742,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-01-18",
      "totalTokens": 1057621484506,
      "catalogMatchedTokens": 685323221511,
      "knownFreeTokens": 117726686511,
      "unmatchedTokens": 254571576484,
      "matchedSpendUsd": 1561203.4810943203,
      "imputedSpendUsd": 579927.86311577,
      "estimatedSpendUsd": 2141131.34421009,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-01-19",
      "totalTokens": 1118470681107,
      "catalogMatchedTokens": 684688656071,
      "knownFreeTokens": 122975147002,
      "unmatchedTokens": 310806878034,
      "matchedSpendUsd": 1608408.5586282471,
      "imputedSpendUsd": 730119.359036924,
      "estimatedSpendUsd": 2338527.917665171,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-01-20",
      "totalTokens": 1167369854809,
      "catalogMatchedTokens": 703254640464,
      "knownFreeTokens": 122134738661,
      "unmatchedTokens": 341980475684,
      "matchedSpendUsd": 1735465.7951715153,
      "imputedSpendUsd": 843926.7713533808,
      "estimatedSpendUsd": 2579392.566524896,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-01-21",
      "totalTokens": 1109751264958,
      "catalogMatchedTokens": 653410295887,
      "knownFreeTokens": 120030335825,
      "unmatchedTokens": 336310633246,
      "matchedSpendUsd": 1541330.0842970186,
      "imputedSpendUsd": 793323.4293276066,
      "estimatedSpendUsd": 2334653.5136246253,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-01-22",
      "totalTokens": 1165644748031,
      "catalogMatchedTokens": 691175537482,
      "knownFreeTokens": 133179000760,
      "unmatchedTokens": 341290209789,
      "matchedSpendUsd": 1557384.4559311697,
      "imputedSpendUsd": 769008.7956863182,
      "estimatedSpendUsd": 2326393.251617488,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-01-23",
      "totalTokens": 1098227750683,
      "catalogMatchedTokens": 665618272534,
      "knownFreeTokens": 113289930169,
      "unmatchedTokens": 319319547980,
      "matchedSpendUsd": 1531907.699443659,
      "imputedSpendUsd": 734907.8207711674,
      "estimatedSpendUsd": 2266815.5202148263,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-01-24",
      "totalTokens": 921779225469,
      "catalogMatchedTokens": 518020801347,
      "knownFreeTokens": 113636352627,
      "unmatchedTokens": 290122071495,
      "matchedSpendUsd": 961921.471412331,
      "imputedSpendUsd": 538732.5164858075,
      "estimatedSpendUsd": 1500653.9878981384,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-01-25",
      "totalTokens": 912436067961,
      "catalogMatchedTokens": 529049615765,
      "knownFreeTokens": 119606774189,
      "unmatchedTokens": 263779678007,
      "matchedSpendUsd": 1025404.551460199,
      "imputedSpendUsd": 511258.06417980505,
      "estimatedSpendUsd": 1536662.6156400042,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-01-26",
      "totalTokens": 1123037386403,
      "catalogMatchedTokens": 693031091056,
      "knownFreeTokens": 94035809637,
      "unmatchedTokens": 335970485710,
      "matchedSpendUsd": 1557177.5086849623,
      "imputedSpendUsd": 754894.9689001766,
      "estimatedSpendUsd": 2312072.4775851388,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-01-27",
      "totalTokens": 1171091999378,
      "catalogMatchedTokens": 753045314174,
      "knownFreeTokens": 35458459631,
      "unmatchedTokens": 382588225573,
      "matchedSpendUsd": 1612210.351424844,
      "imputedSpendUsd": 819091.0772462917,
      "estimatedSpendUsd": 2431301.4286711356,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-01-28",
      "totalTokens": 1262244728033,
      "catalogMatchedTokens": 852007241814,
      "knownFreeTokens": 36183595389,
      "unmatchedTokens": 374053890830,
      "matchedSpendUsd": 1860988.474306252,
      "imputedSpendUsd": 817023.5479712101,
      "estimatedSpendUsd": 2678012.0222774623,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-01-29",
      "totalTokens": 1299991615800,
      "catalogMatchedTokens": 876015731591,
      "knownFreeTokens": 38686519191,
      "unmatchedTokens": 385289365018,
      "matchedSpendUsd": 1940198.6276188171,
      "imputedSpendUsd": 853338.4393524391,
      "estimatedSpendUsd": 2793537.0669712564,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-01-30",
      "totalTokens": 1226664854860,
      "catalogMatchedTokens": 819528952041,
      "knownFreeTokens": 52142249984,
      "unmatchedTokens": 354993652835,
      "matchedSpendUsd": 1697043.389154949,
      "imputedSpendUsd": 735104.7577211945,
      "estimatedSpendUsd": 2432148.1468761433,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-01-31",
      "totalTokens": 1039939632945,
      "catalogMatchedTokens": 718688379454,
      "knownFreeTokens": 47952475131,
      "unmatchedTokens": 273298778360,
      "matchedSpendUsd": 1341102.7358914504,
      "imputedSpendUsd": 509987.0122470048,
      "estimatedSpendUsd": 1851089.7481384552,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-02-01",
      "totalTokens": 1126964134499,
      "catalogMatchedTokens": 775314880940,
      "knownFreeTokens": 58295595456,
      "unmatchedTokens": 293353658103,
      "matchedSpendUsd": 1402291.339532705,
      "imputedSpendUsd": 530580.9346511303,
      "estimatedSpendUsd": 1932872.2741838354,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-02-02",
      "totalTokens": 1273715201835,
      "catalogMatchedTokens": 843674312639,
      "knownFreeTokens": 67805525737,
      "unmatchedTokens": 362235363459,
      "matchedSpendUsd": 1707601.8744594823,
      "imputedSpendUsd": 733166.5506127283,
      "estimatedSpendUsd": 2440768.425072211,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-02-03",
      "totalTokens": 1347876943352,
      "catalogMatchedTokens": 892332021360,
      "knownFreeTokens": 70929339749,
      "unmatchedTokens": 384615582243,
      "matchedSpendUsd": 1779313.9433357744,
      "imputedSpendUsd": 766925.148854525,
      "estimatedSpendUsd": 2546239.092190299,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-02-04",
      "totalTokens": 1420287125277,
      "catalogMatchedTokens": 950256535049,
      "knownFreeTokens": 87351475163,
      "unmatchedTokens": 382679115065,
      "matchedSpendUsd": 1860158.4918210187,
      "imputedSpendUsd": 749106.9824571175,
      "estimatedSpendUsd": 2609265.474278136,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-02-05",
      "totalTokens": 1547174716353,
      "catalogMatchedTokens": 1075605533937,
      "knownFreeTokens": 87367137467,
      "unmatchedTokens": 384202044949,
      "matchedSpendUsd": 1997346.1613284848,
      "imputedSpendUsd": 713444.1534942735,
      "estimatedSpendUsd": 2710790.3148227585,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-02-06",
      "totalTokens": 1535426387252,
      "catalogMatchedTokens": 1084349271910,
      "knownFreeTokens": 84254057815,
      "unmatchedTokens": 366823057527,
      "matchedSpendUsd": 2130500.608639138,
      "imputedSpendUsd": 720724.1869103299,
      "estimatedSpendUsd": 2851224.7955494677,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-02-07",
      "totalTokens": 1326326438380,
      "catalogMatchedTokens": 910238323473,
      "knownFreeTokens": 87807771390,
      "unmatchedTokens": 328280343517,
      "matchedSpendUsd": 1644373.4726352291,
      "imputedSpendUsd": 593048.5176753245,
      "estimatedSpendUsd": 2237421.9903105535,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-02-08",
      "totalTokens": 1353520117412,
      "catalogMatchedTokens": 910590759814,
      "knownFreeTokens": 96391578228,
      "unmatchedTokens": 346537779370,
      "matchedSpendUsd": 1786254.174459977,
      "imputedSpendUsd": 679783.4793911073,
      "estimatedSpendUsd": 2466037.6538510844,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-02-09",
      "totalTokens": 1662970178669,
      "catalogMatchedTokens": 1107147807860,
      "knownFreeTokens": 110245998610,
      "unmatchedTokens": 445576372199,
      "matchedSpendUsd": 2411742.012252594,
      "imputedSpendUsd": 970615.8914558528,
      "estimatedSpendUsd": 3382357.903708447,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-02-10",
      "totalTokens": 1771510403773,
      "catalogMatchedTokens": 1139981465817,
      "knownFreeTokens": 99671794268,
      "unmatchedTokens": 531857143688,
      "matchedSpendUsd": 2310670.090254411,
      "imputedSpendUsd": 1078040.6796589845,
      "estimatedSpendUsd": 3388710.769913396,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-02-11",
      "totalTokens": 1809075488850,
      "catalogMatchedTokens": 1151812591120,
      "knownFreeTokens": 109605362102,
      "unmatchedTokens": 547657535628,
      "matchedSpendUsd": 2445284.02960982,
      "imputedSpendUsd": 1162670.2433113954,
      "estimatedSpendUsd": 3607954.2729212153,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-02-12",
      "totalTokens": 1817254332924,
      "catalogMatchedTokens": 1239476566332,
      "knownFreeTokens": 125636603398,
      "unmatchedTokens": 452141163194,
      "matchedSpendUsd": 2514438.194725786,
      "imputedSpendUsd": 917226.7076473464,
      "estimatedSpendUsd": 3431664.9023731323,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-02-13",
      "totalTokens": 2083944013080,
      "catalogMatchedTokens": 1616554897810,
      "knownFreeTokens": 121555843469,
      "unmatchedTokens": 345833271801,
      "matchedSpendUsd": 2561282.4650208564,
      "imputedSpendUsd": 547940.9923440793,
      "estimatedSpendUsd": 3109223.4573649354,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-02-14",
      "totalTokens": 1862446469657,
      "catalogMatchedTokens": 1495264695691,
      "knownFreeTokens": 120264284647,
      "unmatchedTokens": 246917489319,
      "matchedSpendUsd": 2021511.7150615472,
      "imputedSpendUsd": 333818.21877448563,
      "estimatedSpendUsd": 2355329.9338360326,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-02-15",
      "totalTokens": 2007429240268,
      "catalogMatchedTokens": 1618721433454,
      "knownFreeTokens": 123004077847,
      "unmatchedTokens": 265703728967,
      "matchedSpendUsd": 2263229.5465557477,
      "imputedSpendUsd": 371495.99529611936,
      "estimatedSpendUsd": 2634725.541851867,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-02-16",
      "totalTokens": 2160683192236,
      "catalogMatchedTokens": 1725432924444,
      "knownFreeTokens": 120583431859,
      "unmatchedTokens": 314666835933,
      "matchedSpendUsd": 2527990.23215031,
      "imputedSpendUsd": 461029.0416688324,
      "estimatedSpendUsd": 2989019.2738191425,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-02-17",
      "totalTokens": 2144256740309,
      "catalogMatchedTokens": 1693084031848,
      "knownFreeTokens": 122839863083,
      "unmatchedTokens": 328332845378,
      "matchedSpendUsd": 2966460.0213732473,
      "imputedSpendUsd": 575273.4307312884,
      "estimatedSpendUsd": 3541733.452104536,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-02-18",
      "totalTokens": 2279287336434,
      "catalogMatchedTokens": 1801675848102,
      "knownFreeTokens": 127601086925,
      "unmatchedTokens": 350010401407,
      "matchedSpendUsd": 3206640.14540411,
      "imputedSpendUsd": 622951.9064947539,
      "estimatedSpendUsd": 3829592.051898864,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-02-19",
      "totalTokens": 2104731463727,
      "catalogMatchedTokens": 1640096360951,
      "knownFreeTokens": 122234807375,
      "unmatchedTokens": 342400295401,
      "matchedSpendUsd": 2862236.795763334,
      "imputedSpendUsd": 597544.6002506294,
      "estimatedSpendUsd": 3459781.396013963,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-02-20",
      "totalTokens": 1966780747786,
      "catalogMatchedTokens": 1468449474045,
      "knownFreeTokens": 134330240455,
      "unmatchedTokens": 364001033286,
      "matchedSpendUsd": 2725049.086011928,
      "imputedSpendUsd": 675488.4663011666,
      "estimatedSpendUsd": 3400537.5523130945,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-02-21",
      "totalTokens": 1629087927199,
      "catalogMatchedTokens": 1198281222981,
      "knownFreeTokens": 135477277907,
      "unmatchedTokens": 295329426311,
      "matchedSpendUsd": 2356747.0163788917,
      "imputedSpendUsd": 580845.9074204946,
      "estimatedSpendUsd": 2937592.9237993862,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-02-22",
      "totalTokens": 1662900393801,
      "catalogMatchedTokens": 1236662757451,
      "knownFreeTokens": 144390872743,
      "unmatchedTokens": 281846763607,
      "matchedSpendUsd": 2325950.767786992,
      "imputedSpendUsd": 530105.4731859309,
      "estimatedSpendUsd": 2856056.2409729226,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-02-23",
      "totalTokens": 1983658606716,
      "catalogMatchedTokens": 1473756531531,
      "knownFreeTokens": 149108265544,
      "unmatchedTokens": 360793809641,
      "matchedSpendUsd": 2940481.4194956063,
      "imputedSpendUsd": 719866.1860492522,
      "estimatedSpendUsd": 3660347.6055448586,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-02-24",
      "totalTokens": 2006814297660,
      "catalogMatchedTokens": 1499576199092,
      "knownFreeTokens": 150624129364,
      "unmatchedTokens": 356613969204,
      "matchedSpendUsd": 3052792.046457106,
      "imputedSpendUsd": 725983.9743393259,
      "estimatedSpendUsd": 3778776.0207964317,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-02-25",
      "totalTokens": 2037235418073,
      "catalogMatchedTokens": 1435138321634,
      "knownFreeTokens": 146400990197,
      "unmatchedTokens": 455696106242,
      "matchedSpendUsd": 2949996.3570812405,
      "imputedSpendUsd": 936705.4262891045,
      "estimatedSpendUsd": 3886701.783370345,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-02-26",
      "totalTokens": 2076458858606,
      "catalogMatchedTokens": 1471660458956,
      "knownFreeTokens": 146753036434,
      "unmatchedTokens": 458045363216,
      "matchedSpendUsd": 3064078.000151641,
      "imputedSpendUsd": 953675.6335066926,
      "estimatedSpendUsd": 4017753.6336583337,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-02-27",
      "totalTokens": 2038016175860,
      "catalogMatchedTokens": 1486064681542,
      "knownFreeTokens": 149406566027,
      "unmatchedTokens": 402544928291,
      "matchedSpendUsd": 3132655.8109993916,
      "imputedSpendUsd": 848573.2313418784,
      "estimatedSpendUsd": 3981229.04234127,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-02-28",
      "totalTokens": 1751323124477,
      "catalogMatchedTokens": 1262619086868,
      "knownFreeTokens": 152025047720,
      "unmatchedTokens": 336678989889,
      "matchedSpendUsd": 2556305.461703597,
      "imputedSpendUsd": 681642.1117385481,
      "estimatedSpendUsd": 3237947.5734421453,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-03-01",
      "totalTokens": 1722164707664,
      "catalogMatchedTokens": 1234560214708,
      "knownFreeTokens": 157333209932,
      "unmatchedTokens": 330271283024,
      "matchedSpendUsd": 2359209.196961879,
      "imputedSpendUsd": 631138.9587318858,
      "estimatedSpendUsd": 2990348.155693765,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-03-02",
      "totalTokens": 2108128326245,
      "catalogMatchedTokens": 1530056521938,
      "knownFreeTokens": 165339084597,
      "unmatchedTokens": 412732719710,
      "matchedSpendUsd": 3175367.739090047,
      "imputedSpendUsd": 856555.3914139225,
      "estimatedSpendUsd": 4031923.1305039693,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-03-03",
      "totalTokens": 2268386622510,
      "catalogMatchedTokens": 1677491751033,
      "knownFreeTokens": 174389578792,
      "unmatchedTokens": 416505292685,
      "matchedSpendUsd": 3433788.1064035175,
      "imputedSpendUsd": 852577.0212551906,
      "estimatedSpendUsd": 4286365.127658708,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-03-04",
      "totalTokens": 2260829829411,
      "catalogMatchedTokens": 1681838686748,
      "knownFreeTokens": 185360649051,
      "unmatchedTokens": 393630493612,
      "matchedSpendUsd": 3412302.1007703515,
      "imputedSpendUsd": 798641.4933031896,
      "estimatedSpendUsd": 4210943.594073541,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-03-05",
      "totalTokens": 2263159268676,
      "catalogMatchedTokens": 1681703496150,
      "knownFreeTokens": 200553276921,
      "unmatchedTokens": 380902495605,
      "matchedSpendUsd": 3544563.6460133237,
      "imputedSpendUsd": 802836.612808473,
      "estimatedSpendUsd": 4347400.258821797,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-03-06",
      "totalTokens": 2165761557067,
      "catalogMatchedTokens": 1595483262745,
      "knownFreeTokens": 197164617208,
      "unmatchedTokens": 373113677114,
      "matchedSpendUsd": 3376131.560274202,
      "imputedSpendUsd": 789529.3484353296,
      "estimatedSpendUsd": 4165660.9087095316,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-03-07",
      "totalTokens": 1841412026810,
      "catalogMatchedTokens": 1360885714376,
      "knownFreeTokens": 195323128597,
      "unmatchedTokens": 285203183837,
      "matchedSpendUsd": 2497643.0555999065,
      "imputedSpendUsd": 523435.3950670209,
      "estimatedSpendUsd": 3021078.4506669273,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-03-08",
      "totalTokens": 1881232524277,
      "catalogMatchedTokens": 1368374095005,
      "knownFreeTokens": 216629301902,
      "unmatchedTokens": 296229127370,
      "matchedSpendUsd": 2505347.430605509,
      "imputedSpendUsd": 542364.0259166333,
      "estimatedSpendUsd": 3047711.456522142,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-03-09",
      "totalTokens": 2245462665118,
      "catalogMatchedTokens": 1665925186864,
      "knownFreeTokens": 249256336786,
      "unmatchedTokens": 330281141468,
      "matchedSpendUsd": 3489594.028768148,
      "imputedSpendUsd": 691836.0489230964,
      "estimatedSpendUsd": 4181430.077691244,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-03-10",
      "totalTokens": 2405339612587,
      "catalogMatchedTokens": 1746958266291,
      "knownFreeTokens": 277147547921,
      "unmatchedTokens": 381233798375,
      "matchedSpendUsd": 3589817.5169243976,
      "imputedSpendUsd": 783395.7993488958,
      "estimatedSpendUsd": 4373213.316273293,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-03-11",
      "totalTokens": 2484681242838,
      "catalogMatchedTokens": 1792974560266,
      "knownFreeTokens": 288878224660,
      "unmatchedTokens": 402828457912,
      "matchedSpendUsd": 3824444.5769146215,
      "imputedSpendUsd": 859239.8048636398,
      "estimatedSpendUsd": 4683684.381778262,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-03-12",
      "totalTokens": 2655470164902,
      "catalogMatchedTokens": 1734976340334,
      "knownFreeTokens": 331695915847,
      "unmatchedTokens": 588797908721,
      "matchedSpendUsd": 3760319.86803567,
      "imputedSpendUsd": 1276137.5604667894,
      "estimatedSpendUsd": 5036457.428502459,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-03-13",
      "totalTokens": 2514918954523,
      "catalogMatchedTokens": 1620470475850,
      "knownFreeTokens": 320762544933,
      "unmatchedTokens": 573685933740,
      "matchedSpendUsd": 3608438.835659888,
      "imputedSpendUsd": 1277475.0503821229,
      "estimatedSpendUsd": 4885913.886042011,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-03-14",
      "totalTokens": 2224615577009,
      "catalogMatchedTokens": 1314536931187,
      "knownFreeTokens": 309976847087,
      "unmatchedTokens": 600101798735,
      "matchedSpendUsd": 2598329.625863898,
      "imputedSpendUsd": 1186168.486555477,
      "estimatedSpendUsd": 3784498.112419375,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-03-15",
      "totalTokens": 2343986663642,
      "catalogMatchedTokens": 1391730942695,
      "knownFreeTokens": 306557527647,
      "unmatchedTokens": 645698193300,
      "matchedSpendUsd": 2694658.3590651886,
      "imputedSpendUsd": 1250195.6956133042,
      "estimatedSpendUsd": 3944854.0546784927,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-03-16",
      "totalTokens": 2758882292355,
      "catalogMatchedTokens": 1766674116913,
      "knownFreeTokens": 273856238030,
      "unmatchedTokens": 718351937412,
      "matchedSpendUsd": 3960117.7991199405,
      "imputedSpendUsd": 1610233.752871382,
      "estimatedSpendUsd": 5570351.551991323,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-03-17",
      "totalTokens": 3171494754112,
      "catalogMatchedTokens": 1988644623180,
      "knownFreeTokens": 320883193940,
      "unmatchedTokens": 861966936992,
      "matchedSpendUsd": 4319357.188081494,
      "imputedSpendUsd": 1872201.3183186965,
      "estimatedSpendUsd": 6191558.50640019,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-03-18",
      "totalTokens": 3133273576581,
      "catalogMatchedTokens": 1872302832664,
      "knownFreeTokens": 341421775662,
      "unmatchedTokens": 919548968255,
      "matchedSpendUsd": 4195919.321264657,
      "imputedSpendUsd": 2060752.7881909413,
      "estimatedSpendUsd": 6256672.1094555985,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-03-19",
      "totalTokens": 2978864222218,
      "catalogMatchedTokens": 1909993255850,
      "knownFreeTokens": 387184684727,
      "unmatchedTokens": 681686281641,
      "matchedSpendUsd": 4451394.504489401,
      "imputedSpendUsd": 1588725.2787875133,
      "estimatedSpendUsd": 6040119.783276915,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-03-20",
      "totalTokens": 3024001630072,
      "catalogMatchedTokens": 1811355050386,
      "knownFreeTokens": 381066738150,
      "unmatchedTokens": 831579841536,
      "matchedSpendUsd": 4232762.0360000525,
      "imputedSpendUsd": 1943230.059952318,
      "estimatedSpendUsd": 6175992.09595237,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-03-21",
      "totalTokens": 2573341237095,
      "catalogMatchedTokens": 1478722947787,
      "knownFreeTokens": 313211738965,
      "unmatchedTokens": 781406550343,
      "matchedSpendUsd": 2925481.131320423,
      "imputedSpendUsd": 1545921.8525956832,
      "estimatedSpendUsd": 4471402.983916106,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-03-22",
      "totalTokens": 2656937122098,
      "catalogMatchedTokens": 1513624020885,
      "knownFreeTokens": 302426796176,
      "unmatchedTokens": 840886305037,
      "matchedSpendUsd": 2971410.0704035903,
      "imputedSpendUsd": 1650752.1024874405,
      "estimatedSpendUsd": 4622162.172891031,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-03-23",
      "totalTokens": 3224952376065,
      "catalogMatchedTokens": 1950211084717,
      "knownFreeTokens": 323727072106,
      "unmatchedTokens": 951014219242,
      "matchedSpendUsd": 4171401.7005776144,
      "imputedSpendUsd": 2034170.7431097087,
      "estimatedSpendUsd": 6205572.4436873235,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-03-24",
      "totalTokens": 3341805624432,
      "catalogMatchedTokens": 2024327540915,
      "knownFreeTokens": 335907882311,
      "unmatchedTokens": 981570201206,
      "matchedSpendUsd": 4477032.553738172,
      "imputedSpendUsd": 2170855.0892867157,
      "estimatedSpendUsd": 6647887.643024888,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-03-25",
      "totalTokens": 3404484437033,
      "catalogMatchedTokens": 2110244406882,
      "knownFreeTokens": 326653579713,
      "unmatchedTokens": 967586450438,
      "matchedSpendUsd": 4604637.82503945,
      "imputedSpendUsd": 2111312.3930822527,
      "estimatedSpendUsd": 6715950.218121703,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-03-26",
      "totalTokens": 3389941787812,
      "catalogMatchedTokens": 2012264585672,
      "knownFreeTokens": 297073706593,
      "unmatchedTokens": 1080603495547,
      "matchedSpendUsd": 4443792.32100655,
      "imputedSpendUsd": 2386354.930537608,
      "estimatedSpendUsd": 6830147.251544159,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-03-27",
      "totalTokens": 3311872762246,
      "catalogMatchedTokens": 1888694342800,
      "knownFreeTokens": 311992919757,
      "unmatchedTokens": 1111185499689,
      "matchedSpendUsd": 4175493.784665298,
      "imputedSpendUsd": 2456590.2710775165,
      "estimatedSpendUsd": 6632084.055742815,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-03-28",
      "totalTokens": 2967065408662,
      "catalogMatchedTokens": 1566159591659,
      "knownFreeTokens": 311930513109,
      "unmatchedTokens": 1088975303894,
      "matchedSpendUsd": 2944072.1239967877,
      "imputedSpendUsd": 2047059.4778397928,
      "estimatedSpendUsd": 4991131.601836581,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-03-29",
      "totalTokens": 2999802045325,
      "catalogMatchedTokens": 1540165213542,
      "knownFreeTokens": 309372512075,
      "unmatchedTokens": 1150264319708,
      "matchedSpendUsd": 2946044.7861104426,
      "imputedSpendUsd": 2200238.1120733046,
      "estimatedSpendUsd": 5146282.898183747,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-03-30",
      "totalTokens": 3462453510031,
      "catalogMatchedTokens": 1878627377371,
      "knownFreeTokens": 318392682860,
      "unmatchedTokens": 1265433449800,
      "matchedSpendUsd": 4075737.1592802475,
      "imputedSpendUsd": 2745394.960209565,
      "estimatedSpendUsd": 6821132.119489812,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-03-31",
      "totalTokens": 4002410847181,
      "catalogMatchedTokens": 1970019289654,
      "knownFreeTokens": 724407536084,
      "unmatchedTokens": 1307984021443,
      "matchedSpendUsd": 4412767.564434615,
      "imputedSpendUsd": 2929833.984334307,
      "estimatedSpendUsd": 7342601.548768922,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-04-01",
      "totalTokens": 4128332043182,
      "catalogMatchedTokens": 1914493788466,
      "knownFreeTokens": 896361096951,
      "unmatchedTokens": 1317477157765,
      "matchedSpendUsd": 4383108.78932099,
      "imputedSpendUsd": 3016278.112114628,
      "estimatedSpendUsd": 7399386.901435618,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-04-02",
      "totalTokens": 4043252964147,
      "catalogMatchedTokens": 1862729349315,
      "knownFreeTokens": 976384019223,
      "unmatchedTokens": 1204139595609,
      "matchedSpendUsd": 4122647.76293902,
      "imputedSpendUsd": 2665037.41508625,
      "estimatedSpendUsd": 6787685.17802527,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-04-03",
      "totalTokens": 4091886418048,
      "catalogMatchedTokens": 1808994382694,
      "knownFreeTokens": 1679969126245,
      "unmatchedTokens": 602922909109,
      "matchedSpendUsd": 3830124.9422035995,
      "imputedSpendUsd": 1276549.0564792752,
      "estimatedSpendUsd": 5106673.998682875,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-04-04",
      "totalTokens": 3630286680857,
      "catalogMatchedTokens": 1409534865958,
      "knownFreeTokens": 1822357968733,
      "unmatchedTokens": 398393846166,
      "matchedSpendUsd": 2714943.6353125996,
      "imputedSpendUsd": 767357.2772965501,
      "estimatedSpendUsd": 3482300.9126091497,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-04-05",
      "totalTokens": 3646933937468,
      "catalogMatchedTokens": 1565106090236,
      "knownFreeTokens": 1688798537435,
      "unmatchedTokens": 393029309797,
      "matchedSpendUsd": 2931493.149141662,
      "imputedSpendUsd": 736156.3131532179,
      "estimatedSpendUsd": 3667649.46229488,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-04-06",
      "totalTokens": 3640817422688,
      "catalogMatchedTokens": 1936246087572,
      "knownFreeTokens": 1219128607111,
      "unmatchedTokens": 485442728005,
      "matchedSpendUsd": 3845882.1835778942,
      "imputedSpendUsd": 964213.9760876113,
      "estimatedSpendUsd": 4810096.159665505,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-04-07",
      "totalTokens": 3732909598850,
      "catalogMatchedTokens": 2146975842349,
      "knownFreeTokens": 1032103187183,
      "unmatchedTokens": 553830569318,
      "matchedSpendUsd": 4596249.524569866,
      "imputedSpendUsd": 1185641.4220921292,
      "estimatedSpendUsd": 5781890.946661996,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-04-08",
      "totalTokens": 2999093024213,
      "catalogMatchedTokens": 2169412904546,
      "knownFreeTokens": 238971535325,
      "unmatchedTokens": 590708584342,
      "matchedSpendUsd": 4623395.092073078,
      "imputedSpendUsd": 1258902.4265363538,
      "estimatedSpendUsd": 5882297.5186094325,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-04-09",
      "totalTokens": 2988091808528,
      "catalogMatchedTokens": 2233622385066,
      "knownFreeTokens": 128924888368,
      "unmatchedTokens": 625544535094,
      "matchedSpendUsd": 4858341.541543673,
      "imputedSpendUsd": 1360618.9753703615,
      "estimatedSpendUsd": 6218960.516914034,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-04-10",
      "totalTokens": 2859280425773,
      "catalogMatchedTokens": 2146108427832,
      "knownFreeTokens": 136293596799,
      "unmatchedTokens": 576878401142,
      "matchedSpendUsd": 4941358.160850157,
      "imputedSpendUsd": 1328247.3328623255,
      "estimatedSpendUsd": 6269605.493712483,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-04-11",
      "totalTokens": 2374060726524,
      "catalogMatchedTokens": 1751163455458,
      "knownFreeTokens": 150357672909,
      "unmatchedTokens": 472539598157,
      "matchedSpendUsd": 3786563.3497656942,
      "imputedSpendUsd": 1021778.4742580358,
      "estimatedSpendUsd": 4808341.82402373,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-04-12",
      "totalTokens": 2396592809199,
      "catalogMatchedTokens": 1766650235878,
      "knownFreeTokens": 152842490117,
      "unmatchedTokens": 477100083204,
      "matchedSpendUsd": 3755471.038982403,
      "imputedSpendUsd": 1014199.3637344121,
      "estimatedSpendUsd": 4769670.4027168155,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-04-13",
      "totalTokens": 2957241118970,
      "catalogMatchedTokens": 2155120346109,
      "knownFreeTokens": 138755293181,
      "unmatchedTokens": 663365479680,
      "matchedSpendUsd": 5069177.857879724,
      "imputedSpendUsd": 1560338.6638462653,
      "estimatedSpendUsd": 6629516.52172599,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-04-14",
      "totalTokens": 3099977701607,
      "catalogMatchedTokens": 2243867331809,
      "knownFreeTokens": 139449463226,
      "unmatchedTokens": 716660906572,
      "matchedSpendUsd": 5329669.000330867,
      "imputedSpendUsd": 1702224.2640461638,
      "estimatedSpendUsd": 7031893.2643770315,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-04-15",
      "totalTokens": 3165298086565,
      "catalogMatchedTokens": 2276908924389,
      "knownFreeTokens": 92218509728,
      "unmatchedTokens": 796170652448,
      "matchedSpendUsd": 5426572.703779499,
      "imputedSpendUsd": 1897518.9933361148,
      "estimatedSpendUsd": 7324091.697115614,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-04-16",
      "totalTokens": 3143783248585,
      "catalogMatchedTokens": 2259935753208,
      "knownFreeTokens": 96919379642,
      "unmatchedTokens": 786928115735,
      "matchedSpendUsd": 5548839.505159733,
      "imputedSpendUsd": 1932151.305678906,
      "estimatedSpendUsd": 7480990.810838639,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-04-17",
      "totalTokens": 3193988270600,
      "catalogMatchedTokens": 2265788634710,
      "knownFreeTokens": 98534281291,
      "unmatchedTokens": 829665354599,
      "matchedSpendUsd": 5690603.18980405,
      "imputedSpendUsd": 2083732.0132269356,
      "estimatedSpendUsd": 7774335.203030986,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-04-18",
      "totalTokens": 2462023731465,
      "catalogMatchedTokens": 1610752153242,
      "knownFreeTokens": 116562456921,
      "unmatchedTokens": 734709121302,
      "matchedSpendUsd": 3686162.6562531167,
      "imputedSpendUsd": 1681361.915736694,
      "estimatedSpendUsd": 5367524.57198981,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-04-19",
      "totalTokens": 2446960959409,
      "catalogMatchedTokens": 1619807739647,
      "knownFreeTokens": 120271928093,
      "unmatchedTokens": 706881291669,
      "matchedSpendUsd": 3692463.310463651,
      "imputedSpendUsd": 1611384.5924145023,
      "estimatedSpendUsd": 5303847.902878153,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-04-20",
      "totalTokens": 3134848054628,
      "catalogMatchedTokens": 2147474483130,
      "knownFreeTokens": 131573963381,
      "unmatchedTokens": 855799608117,
      "matchedSpendUsd": 5282454.517311097,
      "imputedSpendUsd": 2105134.44575213,
      "estimatedSpendUsd": 7387588.963063227,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-04-21",
      "totalTokens": 3318896487438,
      "catalogMatchedTokens": 2380793257636,
      "knownFreeTokens": 142530670798,
      "unmatchedTokens": 795572559004,
      "matchedSpendUsd": 5934960.135198162,
      "imputedSpendUsd": 1983242.9410669259,
      "estimatedSpendUsd": 7918203.076265087,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-04-22",
      "totalTokens": 3382408425312,
      "catalogMatchedTokens": 2499852409488,
      "knownFreeTokens": 176121762876,
      "unmatchedTokens": 706434252948,
      "matchedSpendUsd": 6090169.230073461,
      "imputedSpendUsd": 1721023.2628313468,
      "estimatedSpendUsd": 7811192.492904808,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-04-23",
      "totalTokens": 3375402500504,
      "catalogMatchedTokens": 2393294879471,
      "knownFreeTokens": 260871060344,
      "unmatchedTokens": 721236560689,
      "matchedSpendUsd": 6212533.743605399,
      "imputedSpendUsd": 1872191.5585231625,
      "estimatedSpendUsd": 8084725.302128561,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-04-24",
      "totalTokens": 3254035491146,
      "catalogMatchedTokens": 2288052402631,
      "knownFreeTokens": 288028066152,
      "unmatchedTokens": 677955022363,
      "matchedSpendUsd": 6068105.693301174,
      "imputedSpendUsd": 1797993.230518901,
      "estimatedSpendUsd": 7866098.923820075,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-04-25",
      "totalTokens": 2715048699378,
      "catalogMatchedTokens": 1854398982462,
      "knownFreeTokens": 301010341470,
      "unmatchedTokens": 559639375446,
      "matchedSpendUsd": 4378291.765086749,
      "imputedSpendUsd": 1321325.3955092283,
      "estimatedSpendUsd": 5699617.160595977,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-04-26",
      "totalTokens": 2702629991782,
      "catalogMatchedTokens": 1766813681591,
      "knownFreeTokens": 357234683963,
      "unmatchedTokens": 578581626228,
      "matchedSpendUsd": 3809780.08987273,
      "imputedSpendUsd": 1247595.4781970533,
      "estimatedSpendUsd": 5057375.568069783,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-04-27",
      "totalTokens": 3405122588401,
      "catalogMatchedTokens": 2304288101703,
      "knownFreeTokens": 439405105614,
      "unmatchedTokens": 661429381084,
      "matchedSpendUsd": 5622498.157892937,
      "imputedSpendUsd": 1613897.7908068819,
      "estimatedSpendUsd": 7236395.948699819,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-04-28",
      "totalTokens": 3630994099588,
      "catalogMatchedTokens": 2390590408852,
      "knownFreeTokens": 570983568552,
      "unmatchedTokens": 669420122184,
      "matchedSpendUsd": 5875016.214720661,
      "imputedSpendUsd": 1645139.2332741374,
      "estimatedSpendUsd": 7520155.447994798,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-04-29",
      "totalTokens": 3712741085065,
      "catalogMatchedTokens": 2403649703834,
      "knownFreeTokens": 645164877691,
      "unmatchedTokens": 663926503540,
      "matchedSpendUsd": 6022705.213559434,
      "imputedSpendUsd": 1663567.5356157455,
      "estimatedSpendUsd": 7686272.74917518,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-04-30",
      "totalTokens": 3509604277501,
      "catalogMatchedTokens": 2221379321103,
      "knownFreeTokens": 637734737072,
      "unmatchedTokens": 650490219326,
      "matchedSpendUsd": 5272936.730538009,
      "imputedSpendUsd": 1544082.8757857832,
      "estimatedSpendUsd": 6817019.606323792,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-05-01",
      "totalTokens": 3324394613506,
      "catalogMatchedTokens": 2070819481667,
      "knownFreeTokens": 640003877706,
      "unmatchedTokens": 613571254133,
      "matchedSpendUsd": 4505325.107229078,
      "imputedSpendUsd": 1334900.5071625842,
      "estimatedSpendUsd": 5840225.614391662,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-05-02",
      "totalTokens": 3015068636931,
      "catalogMatchedTokens": 1797235987954,
      "knownFreeTokens": 690897899521,
      "unmatchedTokens": 526934749456,
      "matchedSpendUsd": 3814045.998353776,
      "imputedSpendUsd": 1118246.7889729603,
      "estimatedSpendUsd": 4932292.787326736,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-05-03",
      "totalTokens": 3199831512578,
      "catalogMatchedTokens": 1843901999577,
      "knownFreeTokens": 736426364578,
      "unmatchedTokens": 619503148423,
      "matchedSpendUsd": 3923704.3394235247,
      "imputedSpendUsd": 1318262.6800727402,
      "estimatedSpendUsd": 5241967.019496265,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-05-04",
      "totalTokens": 3771624160550,
      "catalogMatchedTokens": 2215520460356,
      "knownFreeTokens": 787731661082,
      "unmatchedTokens": 768372039112,
      "matchedSpendUsd": 4782938.39039146,
      "imputedSpendUsd": 1658786.813181416,
      "estimatedSpendUsd": 6441725.203572876,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-05-05",
      "totalTokens": 3943247540034,
      "catalogMatchedTokens": 2425080643596,
      "knownFreeTokens": 790298267147,
      "unmatchedTokens": 727868629291,
      "matchedSpendUsd": 5447822.81161744,
      "imputedSpendUsd": 1635120.602270914,
      "estimatedSpendUsd": 7082943.413888354,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-05-06",
      "totalTokens": 3971715385948,
      "catalogMatchedTokens": 2560567090481,
      "knownFreeTokens": 707342265455,
      "unmatchedTokens": 703806030012,
      "matchedSpendUsd": 6329317.978853893,
      "imputedSpendUsd": 1739697.4974570728,
      "estimatedSpendUsd": 8069015.476310966,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-05-07",
      "totalTokens": 3908273660198,
      "catalogMatchedTokens": 2549290577935,
      "knownFreeTokens": 652014534750,
      "unmatchedTokens": 706968547513,
      "matchedSpendUsd": 6728411.331278501,
      "imputedSpendUsd": 1865921.1417935337,
      "estimatedSpendUsd": 8594332.473072035,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-05-08",
      "totalTokens": 3795872616373,
      "catalogMatchedTokens": 2509403746430,
      "knownFreeTokens": 608646353998,
      "unmatchedTokens": 677822515945,
      "matchedSpendUsd": 6712496.461458097,
      "imputedSpendUsd": 1813132.4009738648,
      "estimatedSpendUsd": 8525628.862431962,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-05-09",
      "totalTokens": 3175234843463,
      "catalogMatchedTokens": 2425263145143,
      "knownFreeTokens": 195361036586,
      "unmatchedTokens": 554610661734,
      "matchedSpendUsd": 5147112.445431795,
      "imputedSpendUsd": 1177044.8271137679,
      "estimatedSpendUsd": 6324157.272545563,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-05-10",
      "totalTokens": 3165820373012,
      "catalogMatchedTokens": 2367521022481,
      "knownFreeTokens": 208111303027,
      "unmatchedTokens": 590188047504,
      "matchedSpendUsd": 4756529.936223624,
      "imputedSpendUsd": 1185732.709149228,
      "estimatedSpendUsd": 5942262.645372853,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-05-11",
      "totalTokens": 3904460018777,
      "catalogMatchedTokens": 2992850697737,
      "knownFreeTokens": 229305385098,
      "unmatchedTokens": 682303935942,
      "matchedSpendUsd": 6478180.609026462,
      "imputedSpendUsd": 1476882.2683417127,
      "estimatedSpendUsd": 7955062.8773681745,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-05-12",
      "totalTokens": 4090688100171,
      "catalogMatchedTokens": 3173810222910,
      "knownFreeTokens": 243945698623,
      "unmatchedTokens": 672932178638,
      "matchedSpendUsd": 7298965.776542488,
      "imputedSpendUsd": 1547574.8695867187,
      "estimatedSpendUsd": 8846540.646129206,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-05-13",
      "totalTokens": 4158854730105,
      "catalogMatchedTokens": 3210960437302,
      "knownFreeTokens": 243169046190,
      "unmatchedTokens": 704725246613,
      "matchedSpendUsd": 7465884.530277575,
      "imputedSpendUsd": 1638574.320524771,
      "estimatedSpendUsd": 9104458.850802347,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-05-14",
      "totalTokens": 4054631694946,
      "catalogMatchedTokens": 3056851856784,
      "knownFreeTokens": 253136361895,
      "unmatchedTokens": 744643476267,
      "matchedSpendUsd": 7310516.787658743,
      "imputedSpendUsd": 1780828.4107681988,
      "estimatedSpendUsd": 9091345.198426941,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-05-15",
      "totalTokens": 4058162821358,
      "catalogMatchedTokens": 3078035843797,
      "knownFreeTokens": 189411175255,
      "unmatchedTokens": 790715802306,
      "matchedSpendUsd": 6972135.5556316255,
      "imputedSpendUsd": 1791070.03278323,
      "estimatedSpendUsd": 8763205.588414855,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-05-16",
      "totalTokens": 3258661754494,
      "catalogMatchedTokens": 2480215258463,
      "knownFreeTokens": 158898387121,
      "unmatchedTokens": 619548108910,
      "matchedSpendUsd": 4521311.12818953,
      "imputedSpendUsd": 1129405.9052759232,
      "estimatedSpendUsd": 5650717.033465453,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-05-17",
      "totalTokens": 3380223252621,
      "catalogMatchedTokens": 2524113061597,
      "knownFreeTokens": 157006796043,
      "unmatchedTokens": 699103394981,
      "matchedSpendUsd": 4445853.220241015,
      "imputedSpendUsd": 1231367.6146864875,
      "estimatedSpendUsd": 5677220.834927502,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-05-18",
      "totalTokens": 4054837875343,
      "catalogMatchedTokens": 3146993661897,
      "knownFreeTokens": 152371842074,
      "unmatchedTokens": 755472371372,
      "matchedSpendUsd": 6126736.8949635895,
      "imputedSpendUsd": 1470794.3351942978,
      "estimatedSpendUsd": 7597531.230157888,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-05-19",
      "totalTokens": 4209273652355,
      "catalogMatchedTokens": 3325058412813,
      "knownFreeTokens": 156143268961,
      "unmatchedTokens": 728071970581,
      "matchedSpendUsd": 6995372.908907185,
      "imputedSpendUsd": 1531742.9970886447,
      "estimatedSpendUsd": 8527115.90599583,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-05-20",
      "totalTokens": 4430559668843,
      "catalogMatchedTokens": 3562250576864,
      "knownFreeTokens": 141040209505,
      "unmatchedTokens": 727268882474,
      "matchedSpendUsd": 7738608.413922321,
      "imputedSpendUsd": 1579913.869521158,
      "estimatedSpendUsd": 9318522.283443479,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-05-21",
      "totalTokens": 4404565910297,
      "catalogMatchedTokens": 3614443206646,
      "knownFreeTokens": 167180453290,
      "unmatchedTokens": 622942250361,
      "matchedSpendUsd": 8842782.443324858,
      "imputedSpendUsd": 1524036.3396964665,
      "estimatedSpendUsd": 10366818.783021325,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-05-22",
      "totalTokens": 4542455074756,
      "catalogMatchedTokens": 3747457665503,
      "knownFreeTokens": 168983105304,
      "unmatchedTokens": 626014303949,
      "matchedSpendUsd": 9215540.796674244,
      "imputedSpendUsd": 1539459.7810804867,
      "estimatedSpendUsd": 10755000.57775473,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-05-23",
      "totalTokens": 3552676202089,
      "catalogMatchedTokens": 2751505710570,
      "knownFreeTokens": 161418053820,
      "unmatchedTokens": 639752437699,
      "matchedSpendUsd": 6125850.587443034,
      "imputedSpendUsd": 1424321.1748539926,
      "estimatedSpendUsd": 7550171.762297027,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-05-24",
      "totalTokens": 3725836527145,
      "catalogMatchedTokens": 2934916681222,
      "knownFreeTokens": 167004119454,
      "unmatchedTokens": 623915726469,
      "matchedSpendUsd": 5605223.462063176,
      "imputedSpendUsd": 1191579.6760874721,
      "estimatedSpendUsd": 6796803.138150647,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-05-25",
      "totalTokens": 4239156680433,
      "catalogMatchedTokens": 3356708399463,
      "knownFreeTokens": 181905797156,
      "unmatchedTokens": 700542483814,
      "matchedSpendUsd": 7520025.484145463,
      "imputedSpendUsd": 1569423.585274974,
      "estimatedSpendUsd": 9089449.069420438,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-05-26",
      "totalTokens": 4946042261303,
      "catalogMatchedTokens": 4066314856518,
      "knownFreeTokens": 213186169290,
      "unmatchedTokens": 666541235495,
      "matchedSpendUsd": 11727488.931848455,
      "imputedSpendUsd": 1922343.7529335364,
      "estimatedSpendUsd": 13649832.684781991,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-05-27",
      "totalTokens": 4706418054828,
      "catalogMatchedTokens": 3829960019298,
      "knownFreeTokens": 242837184793,
      "unmatchedTokens": 633620850737,
      "matchedSpendUsd": 9034457.582692139,
      "imputedSpendUsd": 1494642.416800469,
      "estimatedSpendUsd": 10529099.999492608,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-05-28",
      "totalTokens": 4986780759242,
      "catalogMatchedTokens": 4069753920661,
      "knownFreeTokens": 244674890061,
      "unmatchedTokens": 672351948520,
      "matchedSpendUsd": 9010067.925528917,
      "imputedSpendUsd": 1488526.5409469784,
      "estimatedSpendUsd": 10498594.466475897,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-05-29",
      "totalTokens": 4685825847136,
      "catalogMatchedTokens": 3759846910417,
      "knownFreeTokens": 228390632166,
      "unmatchedTokens": 697588304553,
      "matchedSpendUsd": 8355439.796605076,
      "imputedSpendUsd": 1550237.874143112,
      "estimatedSpendUsd": 9905677.670748187,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-05-30",
      "totalTokens": 4040118442007,
      "catalogMatchedTokens": 3230323350802,
      "knownFreeTokens": 228058122050,
      "unmatchedTokens": 581736969155,
      "matchedSpendUsd": 6017620.488871477,
      "imputedSpendUsd": 1083690.9883501297,
      "estimatedSpendUsd": 7101311.477221606,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-05-31",
      "totalTokens": 4203405742573,
      "catalogMatchedTokens": 3425411815986,
      "knownFreeTokens": 212961563649,
      "unmatchedTokens": 565032362938,
      "matchedSpendUsd": 6927435.912499519,
      "imputedSpendUsd": 1142702.1605034252,
      "estimatedSpendUsd": 8070138.073002944,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-06-01",
      "totalTokens": 4708382774313,
      "catalogMatchedTokens": 3795869761633,
      "knownFreeTokens": 194127577339,
      "unmatchedTokens": 718385435341,
      "matchedSpendUsd": 7879274.074485034,
      "imputedSpendUsd": 1491188.078522187,
      "estimatedSpendUsd": 9370462.15300722,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-06-02",
      "totalTokens": 4880205168494,
      "catalogMatchedTokens": 3887327530758,
      "knownFreeTokens": 193777759461,
      "unmatchedTokens": 799099878275,
      "matchedSpendUsd": 7834646.405548622,
      "imputedSpendUsd": 1610531.8987054292,
      "estimatedSpendUsd": 9445178.304254051,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-06-03",
      "totalTokens": 5561024317533,
      "catalogMatchedTokens": 4572173762614,
      "knownFreeTokens": 190251465795,
      "unmatchedTokens": 798599089124,
      "matchedSpendUsd": 9046432.802442875,
      "imputedSpendUsd": 1580095.8955072574,
      "estimatedSpendUsd": 10626528.697950132,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-06-04",
      "totalTokens": 5413561492983,
      "catalogMatchedTokens": 4484776299937,
      "knownFreeTokens": 188821256315,
      "unmatchedTokens": 739963936731,
      "matchedSpendUsd": 9282973.168796558,
      "imputedSpendUsd": 1531640.5794080389,
      "estimatedSpendUsd": 10814613.748204596,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-06-05",
      "totalTokens": 5437258364130,
      "catalogMatchedTokens": 4669015666733,
      "knownFreeTokens": 179296757720,
      "unmatchedTokens": 588945939677,
      "matchedSpendUsd": 8832767.234872783,
      "imputedSpendUsd": 1114158.265982072,
      "estimatedSpendUsd": 9946925.500854855,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-06-06",
      "totalTokens": 4818437093981,
      "catalogMatchedTokens": 3984405228092,
      "knownFreeTokens": 182737176801,
      "unmatchedTokens": 651294689088,
      "matchedSpendUsd": 7031676.195662968,
      "imputedSpendUsd": 1149404.5157186151,
      "estimatedSpendUsd": 8181080.711381583,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-06-07",
      "totalTokens": 5307236051473,
      "catalogMatchedTokens": 4427671623075,
      "knownFreeTokens": 195662642555,
      "unmatchedTokens": 683901785843,
      "matchedSpendUsd": 8112342.29055856,
      "imputedSpendUsd": 1253039.0354534911,
      "estimatedSpendUsd": 9365381.32601205,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-06-08",
      "totalTokens": 6524371265241,
      "catalogMatchedTokens": 5524596086327,
      "knownFreeTokens": 176057957179,
      "unmatchedTokens": 823717221735,
      "matchedSpendUsd": 10584551.222707465,
      "imputedSpendUsd": 1578156.4824365214,
      "estimatedSpendUsd": 12162707.705143986,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-06-09",
      "totalTokens": 6430016419489,
      "catalogMatchedTokens": 5375463124494,
      "knownFreeTokens": 201401155463,
      "unmatchedTokens": 853152139532,
      "matchedSpendUsd": 10622658.201941147,
      "imputedSpendUsd": 1685946.5617404503,
      "estimatedSpendUsd": 12308604.763681598,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-06-10",
      "totalTokens": 6700137711587,
      "catalogMatchedTokens": 5638315038413,
      "knownFreeTokens": 212922630931,
      "unmatchedTokens": 848900042243,
      "matchedSpendUsd": 12711831.918029645,
      "imputedSpendUsd": 1913882.8849901608,
      "estimatedSpendUsd": 14625714.803019807,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-06-11",
      "totalTokens": 6929033546007,
      "catalogMatchedTokens": 5802174319579,
      "knownFreeTokens": 269193222281,
      "unmatchedTokens": 857666004147,
      "matchedSpendUsd": 12882438.998587456,
      "imputedSpendUsd": 1904256.8132264724,
      "estimatedSpendUsd": 14786695.811813928,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-06-12",
      "totalTokens": 6768735721061,
      "catalogMatchedTokens": 5608121568327,
      "knownFreeTokens": 275008310443,
      "unmatchedTokens": 885605842291,
      "matchedSpendUsd": 12004091.029659886,
      "imputedSpendUsd": 1895624.5897556676,
      "estimatedSpendUsd": 13899715.619415553,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-06-13",
      "totalTokens": 5669527799352,
      "catalogMatchedTokens": 4628124922104,
      "knownFreeTokens": 273842608017,
      "unmatchedTokens": 767560269231,
      "matchedSpendUsd": 8892317.468776356,
      "imputedSpendUsd": 1474763.474473935,
      "estimatedSpendUsd": 10367080.943250291,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-06-14",
      "totalTokens": 5583989560133,
      "catalogMatchedTokens": 4576496098963,
      "knownFreeTokens": 290065262975,
      "unmatchedTokens": 717428198195,
      "matchedSpendUsd": 8488151.902591078,
      "imputedSpendUsd": 1330633.6100365615,
      "estimatedSpendUsd": 9818785.512627639,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-06-15",
      "totalTokens": 6398466710994,
      "catalogMatchedTokens": 5340271747798,
      "knownFreeTokens": 291578809811,
      "unmatchedTokens": 766616153385,
      "matchedSpendUsd": 11442071.253907578,
      "imputedSpendUsd": 1642552.4890272883,
      "estimatedSpendUsd": 13084623.742934866,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-06-16",
      "totalTokens": 7019551287662,
      "catalogMatchedTokens": 5947534077699,
      "knownFreeTokens": 286164619002,
      "unmatchedTokens": 785852590961,
      "matchedSpendUsd": 13061901.115386955,
      "imputedSpendUsd": 1725879.784849331,
      "estimatedSpendUsd": 14787780.900236286,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-06-17",
      "totalTokens": 7760783359332,
      "catalogMatchedTokens": 6729017965609,
      "knownFreeTokens": 256339055333,
      "unmatchedTokens": 775426338390,
      "matchedSpendUsd": 15387758.88569883,
      "imputedSpendUsd": 1773226.5822068935,
      "estimatedSpendUsd": 17160985.467905723,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-06-18",
      "totalTokens": 7306047428112,
      "catalogMatchedTokens": 6268780989537,
      "knownFreeTokens": 263390930235,
      "unmatchedTokens": 773875508340,
      "matchedSpendUsd": 13937303.028024832,
      "imputedSpendUsd": 1720547.8200153157,
      "estimatedSpendUsd": 15657850.848040147,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-06-19",
      "totalTokens": 6557231537116,
      "catalogMatchedTokens": 5512274693434,
      "knownFreeTokens": 234496103133,
      "unmatchedTokens": 810460740549,
      "matchedSpendUsd": 11250404.629578318,
      "imputedSpendUsd": 1654128.608362887,
      "estimatedSpendUsd": 12904533.237941206,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-06-20",
      "totalTokens": 5830058052003,
      "catalogMatchedTokens": 4855183936307,
      "knownFreeTokens": 204851694654,
      "unmatchedTokens": 770022421042,
      "matchedSpendUsd": 8998531.543361561,
      "imputedSpendUsd": 1427149.0299320226,
      "estimatedSpendUsd": 10425680.573293583,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-06-21",
      "totalTokens": 5775767190996,
      "catalogMatchedTokens": 4771208188589,
      "knownFreeTokens": 208177140666,
      "unmatchedTokens": 796381861741,
      "matchedSpendUsd": 8420332.598921517,
      "imputedSpendUsd": 1405472.1333781648,
      "estimatedSpendUsd": 9825804.732299682,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-06-22",
      "totalTokens": 6924964211885,
      "catalogMatchedTokens": 5831449567766,
      "knownFreeTokens": 162631912513,
      "unmatchedTokens": 930882731606,
      "matchedSpendUsd": 12181202.341173496,
      "imputedSpendUsd": 1944502.9538240533,
      "estimatedSpendUsd": 14125705.294997549,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-06-23",
      "totalTokens": 7148395020746,
      "catalogMatchedTokens": 6136000561581,
      "knownFreeTokens": 176596970049,
      "unmatchedTokens": 835797489116,
      "matchedSpendUsd": 13959253.541847562,
      "imputedSpendUsd": 1901419.1643430486,
      "estimatedSpendUsd": 15860672.70619061,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-06-24",
      "totalTokens": 7249457010532,
      "catalogMatchedTokens": 6166638020397,
      "knownFreeTokens": 178029858690,
      "unmatchedTokens": 904789131445,
      "matchedSpendUsd": 14286376.19545276,
      "imputedSpendUsd": 2096143.452335809,
      "estimatedSpendUsd": 16382519.64778857,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-06-25",
      "totalTokens": 6972685667926,
      "catalogMatchedTokens": 5807899363197,
      "knownFreeTokens": 173908082719,
      "unmatchedTokens": 990878222010,
      "matchedSpendUsd": 12170394.264788639,
      "imputedSpendUsd": 2076375.2737644364,
      "estimatedSpendUsd": 14246769.538553076,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-06-26",
      "totalTokens": 6781230881257,
      "catalogMatchedTokens": 5686104929126,
      "knownFreeTokens": 173307476137,
      "unmatchedTokens": 921818475994,
      "matchedSpendUsd": 12100699.900429081,
      "imputedSpendUsd": 1961738.1106593194,
      "estimatedSpendUsd": 14062438.011088401,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-06-27",
      "totalTokens": 5693223633861,
      "catalogMatchedTokens": 4661690437953,
      "knownFreeTokens": 196121581653,
      "unmatchedTokens": 835411614255,
      "matchedSpendUsd": 8090730.574512009,
      "imputedSpendUsd": 1449922.593470911,
      "estimatedSpendUsd": 9540653.16798292,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-06-28",
      "totalTokens": 5950391766228,
      "catalogMatchedTokens": 4888284109160,
      "knownFreeTokens": 195075210349,
      "unmatchedTokens": 867032446719,
      "matchedSpendUsd": 8926979.71461433,
      "imputedSpendUsd": 1583373.8160327545,
      "estimatedSpendUsd": 10510353.530647084,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-06-29",
      "totalTokens": 7085048648169,
      "catalogMatchedTokens": 5884318777224,
      "knownFreeTokens": 213387592026,
      "unmatchedTokens": 987342278919,
      "matchedSpendUsd": 11716758.842726152,
      "imputedSpendUsd": 1965979.7191985482,
      "estimatedSpendUsd": 13682738.5619247,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-06-30",
      "totalTokens": 7167154681834,
      "catalogMatchedTokens": 6238703028959,
      "knownFreeTokens": 232435807917,
      "unmatchedTokens": 696015844958,
      "matchedSpendUsd": 12474591.348647853,
      "imputedSpendUsd": 1391717.6691584997,
      "estimatedSpendUsd": 13866309.017806353,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-07-01",
      "totalTokens": 6977198358528,
      "catalogMatchedTokens": 6331777371080,
      "knownFreeTokens": 193545774222,
      "unmatchedTokens": 451875213226,
      "matchedSpendUsd": 13073308.211327586,
      "imputedSpendUsd": 932992.9953862602,
      "estimatedSpendUsd": 14006301.206713846,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-07-02",
      "totalTokens": 6974615024174,
      "catalogMatchedTokens": 6316922678876,
      "knownFreeTokens": 146946989309,
      "unmatchedTokens": 510745355989,
      "matchedSpendUsd": 14861445.19558058,
      "imputedSpendUsd": 1201599.972453425,
      "estimatedSpendUsd": 16063045.168034004,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-07-03",
      "totalTokens": 6991826989221,
      "catalogMatchedTokens": 6330268675674,
      "knownFreeTokens": 162373577139,
      "unmatchedTokens": 499184736408,
      "matchedSpendUsd": 14238333.616462797,
      "imputedSpendUsd": 1122789.4387067838,
      "estimatedSpendUsd": 15361123.05516958,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-07-04",
      "totalTokens": 5714894093924,
      "catalogMatchedTokens": 5137732945358,
      "knownFreeTokens": 156269431344,
      "unmatchedTokens": 420891717222,
      "matchedSpendUsd": 10467840.628408058,
      "imputedSpendUsd": 857543.0962556358,
      "estimatedSpendUsd": 11325383.724663693,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-07-05",
      "totalTokens": 5809000468188,
      "catalogMatchedTokens": 5256937559043,
      "knownFreeTokens": 157491238374,
      "unmatchedTokens": 394571670771,
      "matchedSpendUsd": 11164312.027982421,
      "imputedSpendUsd": 837963.3960673724,
      "estimatedSpendUsd": 12002275.424049793,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-07-06",
      "totalTokens": 7153369575731,
      "catalogMatchedTokens": 6415871139691,
      "knownFreeTokens": 224206855503,
      "unmatchedTokens": 513291580537,
      "matchedSpendUsd": 14447454.095290229,
      "imputedSpendUsd": 1155845.6187548104,
      "estimatedSpendUsd": 15603299.714045038,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-07-07",
      "totalTokens": 7795823788771,
      "catalogMatchedTokens": 6279890606190,
      "knownFreeTokens": 1006625099688,
      "unmatchedTokens": 509308082893,
      "matchedSpendUsd": 14801106.07611566,
      "imputedSpendUsd": 1200390.8082239493,
      "estimatedSpendUsd": 16001496.88433961,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-07-08",
      "totalTokens": 7866992584618,
      "catalogMatchedTokens": 6251059671255,
      "knownFreeTokens": 1106820896148,
      "unmatchedTokens": 509112017215,
      "matchedSpendUsd": 15078703.639274672,
      "imputedSpendUsd": 1228071.6599265898,
      "estimatedSpendUsd": 16306775.299201261,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-07-09",
      "totalTokens": 7769244336449,
      "catalogMatchedTokens": 6109142011855,
      "knownFreeTokens": 1103539847398,
      "unmatchedTokens": 556562477196,
      "matchedSpendUsd": 13822658.396586632,
      "imputedSpendUsd": 1259288.61756847,
      "estimatedSpendUsd": 15081947.014155103,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-07-10",
      "totalTokens": 7814025791624,
      "catalogMatchedTokens": 6087742061410,
      "knownFreeTokens": 1195342821277,
      "unmatchedTokens": 530940908937,
      "matchedSpendUsd": 12661972.647958534,
      "imputedSpendUsd": 1104310.793530148,
      "estimatedSpendUsd": 13766283.441488681,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-07-11",
      "totalTokens": 7239751697474,
      "catalogMatchedTokens": 5628259533239,
      "knownFreeTokens": 1183851784793,
      "unmatchedTokens": 427640379442,
      "matchedSpendUsd": 9419131.893405598,
      "imputedSpendUsd": 715674.377331378,
      "estimatedSpendUsd": 10134806.270736976,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-07-12",
      "totalTokens": 6980460924641,
      "catalogMatchedTokens": 5296749895096,
      "knownFreeTokens": 1282123033640,
      "unmatchedTokens": 401587995905,
      "matchedSpendUsd": 9227913.822331447,
      "imputedSpendUsd": 699640.2495283324,
      "estimatedSpendUsd": 9927554.071859779,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-07-13",
      "totalTokens": 8945200747827,
      "catalogMatchedTokens": 6844039411823,
      "knownFreeTokens": 1559161592305,
      "unmatchedTokens": 541999743699,
      "matchedSpendUsd": 14933572.431345401,
      "imputedSpendUsd": 1182633.8136389717,
      "estimatedSpendUsd": 16116206.244984373,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-07-14",
      "totalTokens": 9313408516626,
      "catalogMatchedTokens": 6995465331428,
      "knownFreeTokens": 1734737744417,
      "unmatchedTokens": 583205440781,
      "matchedSpendUsd": 14874897.7081643,
      "imputedSpendUsd": 1240106.3922778922,
      "estimatedSpendUsd": 16115004.100442193,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-07-15",
      "totalTokens": 9480961115469,
      "catalogMatchedTokens": 7148033497233,
      "knownFreeTokens": 1803688527932,
      "unmatchedTokens": 529239090304,
      "matchedSpendUsd": 15455098.236411579,
      "imputedSpendUsd": 1144292.6413766355,
      "estimatedSpendUsd": 16599390.877788214,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-07-16",
      "totalTokens": 9619203914649,
      "catalogMatchedTokens": 7194620906211,
      "knownFreeTokens": 1831782273614,
      "unmatchedTokens": 592800734824,
      "matchedSpendUsd": 15614705.55895536,
      "imputedSpendUsd": 1286573.5457191675,
      "estimatedSpendUsd": 16901279.10467453,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-07-17",
      "totalTokens": 9621566458152,
      "catalogMatchedTokens": 7079291237322,
      "knownFreeTokens": 1989748050159,
      "unmatchedTokens": 552527170671,
      "matchedSpendUsd": 15606460.856486714,
      "imputedSpendUsd": 1218058.8949020659,
      "estimatedSpendUsd": 16824519.75138878,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-07-18",
      "totalTokens": 8050764751145,
      "catalogMatchedTokens": 5873885273389,
      "knownFreeTokens": 1752297628196,
      "unmatchedTokens": 424581849560,
      "matchedSpendUsd": 10853742.262306135,
      "imputedSpendUsd": 784540.6830220007,
      "estimatedSpendUsd": 11638282.945328135,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-07-19",
      "totalTokens": 7742838835750,
      "catalogMatchedTokens": 5610638400598,
      "knownFreeTokens": 1705009455108,
      "unmatchedTokens": 427190980044,
      "matchedSpendUsd": 9388941.016365984,
      "imputedSpendUsd": 714868.902249912,
      "estimatedSpendUsd": 10103809.918615896,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-07-20",
      "totalTokens": 8440173824425,
      "catalogMatchedTokens": 6013677935099,
      "knownFreeTokens": 1893873383135,
      "unmatchedTokens": 532622506191,
      "matchedSpendUsd": 12279594.235889757,
      "imputedSpendUsd": 1087585.3890935862,
      "estimatedSpendUsd": 13367179.624983344,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-07-21",
      "totalTokens": 8372722163355,
      "catalogMatchedTokens": 7595150173268,
      "knownFreeTokens": 134457329292,
      "unmatchedTokens": 643114660795,
      "matchedSpendUsd": 14456782.7736547,
      "imputedSpendUsd": 1224119.1730993146,
      "estimatedSpendUsd": 15680901.946754014,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-07-22",
      "totalTokens": 9013659246552,
      "catalogMatchedTokens": 8131645928021,
      "knownFreeTokens": 134730987838,
      "unmatchedTokens": 747282330693,
      "matchedSpendUsd": 14096610.629508065,
      "imputedSpendUsd": 1295450.9012487466,
      "estimatedSpendUsd": 15392061.530756813,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-07-23",
      "totalTokens": 8751994182349,
      "catalogMatchedTokens": 7960673866440,
      "knownFreeTokens": 118296587674,
      "unmatchedTokens": 673023728235,
      "matchedSpendUsd": 12671715.904201552,
      "imputedSpendUsd": 1071312.0049966755,
      "estimatedSpendUsd": 13743027.909198228,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-07-24",
      "totalTokens": 8661084724352,
      "catalogMatchedTokens": 7697258704661,
      "knownFreeTokens": 210811418602,
      "unmatchedTokens": 753014601089,
      "matchedSpendUsd": 11017472.203439973,
      "imputedSpendUsd": 1077827.542844408,
      "estimatedSpendUsd": 12095299.74628438,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-07-25",
      "totalTokens": 7305381415398,
      "catalogMatchedTokens": 6449559925601,
      "knownFreeTokens": 226449234297,
      "unmatchedTokens": 629372255500,
      "matchedSpendUsd": 7740415.553232009,
      "imputedSpendUsd": 755338.790776636,
      "estimatedSpendUsd": 8495754.344008645,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-07-26",
      "totalTokens": 7496481859549,
      "catalogMatchedTokens": 6670418329597,
      "knownFreeTokens": 251105601136,
      "unmatchedTokens": 574957928816,
      "matchedSpendUsd": 7354131.385523111,
      "imputedSpendUsd": 633890.7008125479,
      "estimatedSpendUsd": 7988022.086335659,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-07-27",
      "totalTokens": 8784326010554,
      "catalogMatchedTokens": 7753899959729,
      "knownFreeTokens": 299576406177,
      "unmatchedTokens": 730849644648,
      "matchedSpendUsd": 9989808.67618739,
      "imputedSpendUsd": 941596.8943386051,
      "estimatedSpendUsd": 10931405.570525996,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-07-28",
      "totalTokens": 8890418317802,
      "catalogMatchedTokens": 7765619889067,
      "knownFreeTokens": 338088755654,
      "unmatchedTokens": 786709673081,
      "matchedSpendUsd": 10903297.20347949,
      "imputedSpendUsd": 1104577.5483462277,
      "estimatedSpendUsd": 12007874.751825716,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-07-29",
      "totalTokens": 8196705797925,
      "catalogMatchedTokens": 7106662993613,
      "knownFreeTokens": 362036592561,
      "unmatchedTokens": 728006211751,
      "matchedSpendUsd": 10815574.682778066,
      "imputedSpendUsd": 1107946.944972027,
      "estimatedSpendUsd": 11923521.627750093,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-07-30",
      "totalTokens": 8321933504398,
      "catalogMatchedTokens": 7124098694208,
      "knownFreeTokens": 429787865134,
      "unmatchedTokens": 768046945056,
      "matchedSpendUsd": 11119401.75622501,
      "imputedSpendUsd": 1198779.3707381217,
      "estimatedSpendUsd": 12318181.126963131,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-07-31",
      "totalTokens": 8296221899663,
      "catalogMatchedTokens": 7024414019213,
      "knownFreeTokens": 504172489150,
      "unmatchedTokens": 767635391300,
      "matchedSpendUsd": 10012846.202774825,
      "imputedSpendUsd": 1094214.4201453147,
      "estimatedSpendUsd": 11107060.622920139,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-08-01",
      "totalTokens": 7066940419625,
      "catalogMatchedTokens": 6057726581865,
      "knownFreeTokens": 448838463026,
      "unmatchedTokens": 560375374734,
      "matchedSpendUsd": 6299865.414225683,
      "imputedSpendUsd": 582774.6423615587,
      "estimatedSpendUsd": 6882640.056587242,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-08-02",
      "totalTokens": 7232042961954,
      "catalogMatchedTokens": 6228689603163,
      "knownFreeTokens": 459208610079,
      "unmatchedTokens": 544144748712,
      "matchedSpendUsd": 6382262.727744044,
      "imputedSpendUsd": 557561.0552882071,
      "estimatedSpendUsd": 6939823.783032251,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-08-03",
      "totalTokens": 9143823075351,
      "catalogMatchedTokens": 7995640345317,
      "knownFreeTokens": 487617986643,
      "unmatchedTokens": 660564743391,
      "matchedSpendUsd": 9977373.46787975,
      "imputedSpendUsd": 824286.8438156168,
      "estimatedSpendUsd": 10801660.311695367,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-08-04",
      "totalTokens": 9996550853376,
      "catalogMatchedTokens": 8720245761904,
      "knownFreeTokens": 547764396590,
      "unmatchedTokens": 728540694882,
      "matchedSpendUsd": 10591334.55323384,
      "imputedSpendUsd": 884862.4735842239,
      "estimatedSpendUsd": 11476197.026818063,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-08-05",
      "totalTokens": 10787614259704,
      "catalogMatchedTokens": 9544056451504,
      "knownFreeTokens": 496933062823,
      "unmatchedTokens": 746624745377,
      "matchedSpendUsd": 12488298.218877202,
      "imputedSpendUsd": 976950.6839402547,
      "estimatedSpendUsd": 13465248.902817456,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-08-06",
      "totalTokens": 11001204844264,
      "catalogMatchedTokens": 9790729420554,
      "knownFreeTokens": 449110847629,
      "unmatchedTokens": 761364576081,
      "matchedSpendUsd": 12128718.8492394,
      "imputedSpendUsd": 943175.5784886423,
      "estimatedSpendUsd": 13071894.427728042,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-08-07",
      "totalTokens": 10378071121073,
      "catalogMatchedTokens": 9345982037955,
      "knownFreeTokens": 351659275346,
      "unmatchedTokens": 680429807772,
      "matchedSpendUsd": 11047969.11918648,
      "imputedSpendUsd": 804342.173300809,
      "estimatedSpendUsd": 11852311.292487288,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-08-08",
      "totalTokens": 8765239038152,
      "catalogMatchedTokens": 7897271079706,
      "knownFreeTokens": 313181456431,
      "unmatchedTokens": 554786502015,
      "matchedSpendUsd": 8393300.07638071,
      "imputedSpendUsd": 589632.7405682569,
      "estimatedSpendUsd": 8982932.816948965,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-08-09",
      "totalTokens": 8974034656012,
      "catalogMatchedTokens": 8112615776440,
      "knownFreeTokens": 301154078752,
      "unmatchedTokens": 560264800820,
      "matchedSpendUsd": 8786670.76006439,
      "imputedSpendUsd": 606815.6657381668,
      "estimatedSpendUsd": 9393486.425802557,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-08-10",
      "totalTokens": 10613720303759,
      "catalogMatchedTokens": 9598121007505,
      "knownFreeTokens": 321497360278,
      "unmatchedTokens": 694101935976,
      "matchedSpendUsd": 11298593.340566171,
      "imputedSpendUsd": 817074.0403627313,
      "estimatedSpendUsd": 12115667.380928902,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-08-11",
      "totalTokens": 10931401727980,
      "catalogMatchedTokens": 9849312937269,
      "knownFreeTokens": 282866767936,
      "unmatchedTokens": 799222022775,
      "matchedSpendUsd": 12168070.88518057,
      "imputedSpendUsd": 987377.5245098597,
      "estimatedSpendUsd": 13155448.40969043,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-08-12",
      "totalTokens": 11234116355431,
      "catalogMatchedTokens": 10088925221200,
      "knownFreeTokens": 295244925786,
      "unmatchedTokens": 849946208445,
      "matchedSpendUsd": 13465438.935428647,
      "imputedSpendUsd": 1134402.180339877,
      "estimatedSpendUsd": 14599841.115768524,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-08-13",
      "totalTokens": 11135113794296,
      "catalogMatchedTokens": 9995421527602,
      "knownFreeTokens": 292687783390,
      "unmatchedTokens": 847004483304,
      "matchedSpendUsd": 13162825.90229211,
      "imputedSpendUsd": 1115407.9416664867,
      "estimatedSpendUsd": 14278233.843958598,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-08-14",
      "totalTokens": 11486043370983,
      "catalogMatchedTokens": 10380533123047,
      "knownFreeTokens": 293775287783,
      "unmatchedTokens": 811734960153,
      "matchedSpendUsd": 14691393.961884698,
      "imputedSpendUsd": 1148834.8383345844,
      "estimatedSpendUsd": 15840228.800219283,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-08-15",
      "totalTokens": 9565041906391,
      "catalogMatchedTokens": 8549493159619,
      "knownFreeTokens": 313351305827,
      "unmatchedTokens": 702197440945,
      "matchedSpendUsd": 12738448.241931409,
      "imputedSpendUsd": 1046249.8290943354,
      "estimatedSpendUsd": 13784698.071025744,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-08-16",
      "totalTokens": 10375143625991,
      "catalogMatchedTokens": 9444061878824,
      "knownFreeTokens": 311300920426,
      "unmatchedTokens": 619780826741,
      "matchedSpendUsd": 15064426.040434908,
      "imputedSpendUsd": 988625.7148160512,
      "estimatedSpendUsd": 16053051.755250959,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-08-17",
      "totalTokens": 13311262793704,
      "catalogMatchedTokens": 12244294814742,
      "knownFreeTokens": 280483394752,
      "unmatchedTokens": 786484584210,
      "matchedSpendUsd": 15060806.078593943,
      "imputedSpendUsd": 967396.8150725212,
      "estimatedSpendUsd": 16028202.893666465,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-08-18",
      "totalTokens": 12704870921171,
      "catalogMatchedTokens": 11527341574524,
      "knownFreeTokens": 316294733912,
      "unmatchedTokens": 861234612735,
      "matchedSpendUsd": 14096293.73869541,
      "imputedSpendUsd": 1053167.02906372,
      "estimatedSpendUsd": 15149460.76775913,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-08-19",
      "totalTokens": 12119291448118,
      "catalogMatchedTokens": 10942388955778,
      "knownFreeTokens": 342380290537,
      "unmatchedTokens": 834522201803,
      "matchedSpendUsd": 13337809.770823281,
      "imputedSpendUsd": 1017209.1690544025,
      "estimatedSpendUsd": 14355018.939877683,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-08-20",
      "totalTokens": 12130101854803,
      "catalogMatchedTokens": 10950620631367,
      "knownFreeTokens": 305562081108,
      "unmatchedTokens": 873919142328,
      "matchedSpendUsd": 13010368.945867298,
      "imputedSpendUsd": 1038298.271239065,
      "estimatedSpendUsd": 14048667.217106363,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-08-21",
      "totalTokens": 13888795396670,
      "catalogMatchedTokens": 10746122128420,
      "knownFreeTokens": 283929512387,
      "unmatchedTokens": 2858743755863,
      "matchedSpendUsd": 11814621.657237507,
      "imputedSpendUsd": 3142992.0009179553,
      "estimatedSpendUsd": 14957613.658155464,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-08-22",
      "totalTokens": 14075709916673,
      "catalogMatchedTokens": 8593534918200,
      "knownFreeTokens": 241347431197,
      "unmatchedTokens": 5240827567276,
      "matchedSpendUsd": 8602406.984207202,
      "imputedSpendUsd": 5246238.258982246,
      "estimatedSpendUsd": 13848645.243189447,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-08-23",
      "totalTokens": 15147544875185,
      "catalogMatchedTokens": 9116796911305,
      "knownFreeTokens": 247004828311,
      "unmatchedTokens": 5783743135569,
      "matchedSpendUsd": 9717340.728436759,
      "imputedSpendUsd": 6164731.240682665,
      "estimatedSpendUsd": 15882071.969119424,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-08-24",
      "totalTokens": 18352938225742,
      "catalogMatchedTokens": 11244622836805,
      "knownFreeTokens": 274312678650,
      "unmatchedTokens": 6834002710287,
      "matchedSpendUsd": 13312238.960357135,
      "imputedSpendUsd": 8090611.704404518,
      "estimatedSpendUsd": 21402850.664761655,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-08-25",
      "totalTokens": 18775140916501,
      "catalogMatchedTokens": 11770528444439,
      "knownFreeTokens": 316734323638,
      "unmatchedTokens": 6687878148424,
      "matchedSpendUsd": 13994372.225948533,
      "imputedSpendUsd": 7951440.468677588,
      "estimatedSpendUsd": 21945812.694626123,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-08-26",
      "totalTokens": 18436449188941,
      "catalogMatchedTokens": 13172845492403,
      "knownFreeTokens": 382949016464,
      "unmatchedTokens": 4880654680074,
      "matchedSpendUsd": 14247079.286398022,
      "imputedSpendUsd": 5278667.713566205,
      "estimatedSpendUsd": 19525746.999964226,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-08-27",
      "totalTokens": 15797679821005,
      "catalogMatchedTokens": 14157225241302,
      "knownFreeTokens": 633984196337,
      "unmatchedTokens": 1006470383366,
      "matchedSpendUsd": 13772419.6361934,
      "imputedSpendUsd": 979113.6493807873,
      "estimatedSpendUsd": 14751533.285574187,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-08-28",
      "totalTokens": 15116796693545,
      "catalogMatchedTokens": 13208038528408,
      "knownFreeTokens": 993048654308,
      "unmatchedTokens": 915709510829,
      "matchedSpendUsd": 12520651.346065562,
      "imputedSpendUsd": 868053.1552589359,
      "estimatedSpendUsd": 13388704.501324497,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-08-29",
      "totalTokens": 13204155770914,
      "catalogMatchedTokens": 11329431566677,
      "knownFreeTokens": 1119371751046,
      "unmatchedTokens": 755352453191,
      "matchedSpendUsd": 9482172.789806198,
      "imputedSpendUsd": 632192.5717286306,
      "estimatedSpendUsd": 10114365.361534828,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-08-30",
      "totalTokens": 13313663519421,
      "catalogMatchedTokens": 11396068300512,
      "knownFreeTokens": 1177459931975,
      "unmatchedTokens": 740135286934,
      "matchedSpendUsd": 9134405.44778596,
      "imputedSpendUsd": 593248.0938855738,
      "estimatedSpendUsd": 9727653.541671535,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-08-31",
      "totalTokens": 14318704603016,
      "catalogMatchedTokens": 12510770228672,
      "knownFreeTokens": 871085069718,
      "unmatchedTokens": 936849304626,
      "matchedSpendUsd": 11909757.83773488,
      "imputedSpendUsd": 891843.4392612408,
      "estimatedSpendUsd": 12801601.27699612,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-09-01",
      "totalTokens": 16194588394672,
      "catalogMatchedTokens": 13915293551536,
      "knownFreeTokens": 1254222857487,
      "unmatchedTokens": 1025071985649,
      "matchedSpendUsd": 14510923.612337323,
      "imputedSpendUsd": 1068949.1548137462,
      "estimatedSpendUsd": 15579872.767151069,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-09-02",
      "totalTokens": 18488527970063,
      "catalogMatchedTokens": 16030436377389,
      "knownFreeTokens": 1353684452201,
      "unmatchedTokens": 1104407140473,
      "matchedSpendUsd": 16311059.429388363,
      "imputedSpendUsd": 1123740.4945447936,
      "estimatedSpendUsd": 17434799.923933156,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-09-03",
      "totalTokens": 18567158117428,
      "catalogMatchedTokens": 16046946671404,
      "knownFreeTokens": 1375536395160,
      "unmatchedTokens": 1144675050864,
      "matchedSpendUsd": 18298769.120135944,
      "imputedSpendUsd": 1305304.0495651849,
      "estimatedSpendUsd": 19604073.16970113,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-09-04",
      "totalTokens": 18269560527417,
      "catalogMatchedTokens": 15745635317355,
      "knownFreeTokens": 1445940556678,
      "unmatchedTokens": 1077984653384,
      "matchedSpendUsd": 17607891.735478297,
      "imputedSpendUsd": 1205479.2764297975,
      "estimatedSpendUsd": 18813371.011908095,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-09-05",
      "totalTokens": 15344774218059,
      "catalogMatchedTokens": 13121277382231,
      "knownFreeTokens": 1316726642920,
      "unmatchedTokens": 906770192908,
      "matchedSpendUsd": 14362642.862744752,
      "imputedSpendUsd": 992557.0552266897,
      "estimatedSpendUsd": 15355199.917971442,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-09-06",
      "totalTokens": 14279989875501,
      "catalogMatchedTokens": 12616472681158,
      "knownFreeTokens": 776290588966,
      "unmatchedTokens": 887226605377,
      "matchedSpendUsd": 13115573.788871845,
      "imputedSpendUsd": 922324.8291617015,
      "estimatedSpendUsd": 14037898.618033547,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-09-07",
      "totalTokens": 19050916850409,
      "catalogMatchedTokens": 16864277743833,
      "knownFreeTokens": 1085534772445,
      "unmatchedTokens": 1101104334131,
      "matchedSpendUsd": 19289039.025616046,
      "imputedSpendUsd": 1259422.1226043722,
      "estimatedSpendUsd": 20548461.14822042,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-09-08",
      "totalTokens": 19046273585455,
      "catalogMatchedTokens": 17503497067654,
      "knownFreeTokens": 427952154328,
      "unmatchedTokens": 1114824363473,
      "matchedSpendUsd": 20125720.48548846,
      "imputedSpendUsd": 1281837.7632166152,
      "estimatedSpendUsd": 21407558.248705074,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-09-09",
      "totalTokens": 17947794799521,
      "catalogMatchedTokens": 16235772189278,
      "knownFreeTokens": 504497138513,
      "unmatchedTokens": 1207525471730,
      "matchedSpendUsd": 18442970.098781537,
      "imputedSpendUsd": 1371684.4452486627,
      "estimatedSpendUsd": 19814654.5440302,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-09-10",
      "totalTokens": 19184120113922,
      "catalogMatchedTokens": 17411582477740,
      "knownFreeTokens": 524117059110,
      "unmatchedTokens": 1248420577072,
      "matchedSpendUsd": 18160902.71137452,
      "imputedSpendUsd": 1302147.273061965,
      "estimatedSpendUsd": 19463049.984436486,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-09-11",
      "totalTokens": 17751297946007,
      "catalogMatchedTokens": 15958747605484,
      "knownFreeTokens": 547554022466,
      "unmatchedTokens": 1244996318057,
      "matchedSpendUsd": 16225939.034989432,
      "imputedSpendUsd": 1265840.8325624075,
      "estimatedSpendUsd": 17491779.86755184,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-09-12",
      "totalTokens": 17051827575447,
      "catalogMatchedTokens": 15509790682263,
      "knownFreeTokens": 590015481210,
      "unmatchedTokens": 952021411974,
      "matchedSpendUsd": 12466174.20349964,
      "imputedSpendUsd": 765198.25510617,
      "estimatedSpendUsd": 13231372.45860581,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-09-13",
      "totalTokens": 16730791173422,
      "catalogMatchedTokens": 15303146864008,
      "knownFreeTokens": 567808037464,
      "unmatchedTokens": 859836271950,
      "matchedSpendUsd": 11684116.674741322,
      "imputedSpendUsd": 656494.2107604644,
      "estimatedSpendUsd": 12340610.885501787,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-09-14",
      "totalTokens": 18120484812487,
      "catalogMatchedTokens": 16344699389734,
      "knownFreeTokens": 613297333357,
      "unmatchedTokens": 1162488089396,
      "matchedSpendUsd": 17154023.23800015,
      "imputedSpendUsd": 1220049.8292383652,
      "estimatedSpendUsd": 18374073.067238517,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-09-15",
      "totalTokens": 17750550231758,
      "catalogMatchedTokens": 15972258778663,
      "knownFreeTokens": 591324334935,
      "unmatchedTokens": 1186967118160,
      "matchedSpendUsd": 17216659.932339083,
      "imputedSpendUsd": 1279443.9100579035,
      "estimatedSpendUsd": 18496103.842396986,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-09-16",
      "totalTokens": 18403097790101,
      "catalogMatchedTokens": 16444242334897,
      "knownFreeTokens": 597185753335,
      "unmatchedTokens": 1361669701869,
      "matchedSpendUsd": 19665172.69222843,
      "imputedSpendUsd": 1628379.665763227,
      "estimatedSpendUsd": 21293552.357991654,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-09-17",
      "totalTokens": 19950735154131,
      "catalogMatchedTokens": 17282178414202,
      "knownFreeTokens": 610138726916,
      "unmatchedTokens": 2058418013013,
      "matchedSpendUsd": 30535352.03207344,
      "imputedSpendUsd": 3636955.7789578787,
      "estimatedSpendUsd": 34172307.81103132,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-09-18",
      "totalTokens": 19516151287053,
      "catalogMatchedTokens": 16873193964404,
      "knownFreeTokens": 1351711322362,
      "unmatchedTokens": 1291246000287,
      "matchedSpendUsd": 19589192.9377912,
      "imputedSpendUsd": 1499091.8188420583,
      "estimatedSpendUsd": 21088284.756633256,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-09-19",
      "totalTokens": 17822770536307,
      "catalogMatchedTokens": 15758689469805,
      "knownFreeTokens": 960642891237,
      "unmatchedTokens": 1103438175265,
      "matchedSpendUsd": 12990555.04639293,
      "imputedSpendUsd": 909610.8139916743,
      "estimatedSpendUsd": 13900165.860384606,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-09-20",
      "totalTokens": 17331480167240,
      "catalogMatchedTokens": 15509965219945,
      "knownFreeTokens": 666080710071,
      "unmatchedTokens": 1155434237224,
      "matchedSpendUsd": 12766761.748251831,
      "imputedSpendUsd": 951075.8672393854,
      "estimatedSpendUsd": 13717837.615491217,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-09-21",
      "totalTokens": 20836773421509,
      "catalogMatchedTokens": 18692758035826,
      "knownFreeTokens": 619435322262,
      "unmatchedTokens": 1524580063421,
      "matchedSpendUsd": 17005065.995181967,
      "imputedSpendUsd": 1386932.0163308477,
      "estimatedSpendUsd": 18391998.011512816,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-09-22",
      "totalTokens": 20461970574170,
      "catalogMatchedTokens": 18112364255035,
      "knownFreeTokens": 506934617057,
      "unmatchedTokens": 1842671702078,
      "matchedSpendUsd": 16976134.631320864,
      "imputedSpendUsd": 1727076.7336244062,
      "estimatedSpendUsd": 18703211.36494527,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-09-23",
      "totalTokens": 19839776739539,
      "catalogMatchedTokens": 17130665639274,
      "knownFreeTokens": 694081883237,
      "unmatchedTokens": 2015029217028,
      "matchedSpendUsd": 18307813.858540025,
      "imputedSpendUsd": 2153493.6587806586,
      "estimatedSpendUsd": 20461307.517320685,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-09-24",
      "totalTokens": 21879527010648,
      "catalogMatchedTokens": 16844015241004,
      "knownFreeTokens": 2983590727530,
      "unmatchedTokens": 2051921042114,
      "matchedSpendUsd": 17124279.74154542,
      "imputedSpendUsd": 2086062.5824646978,
      "estimatedSpendUsd": 19210342.32401012,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-09-25",
      "totalTokens": 22441110438066,
      "catalogMatchedTokens": 16806324378476,
      "knownFreeTokens": 3680391498762,
      "unmatchedTokens": 1954394560828,
      "matchedSpendUsd": 17989272.453936357,
      "imputedSpendUsd": 2091958.6844493793,
      "estimatedSpendUsd": 20081231.138385735,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-09-26",
      "totalTokens": 19855703336813,
      "catalogMatchedTokens": 14206732094172,
      "knownFreeTokens": 4035811193534,
      "unmatchedTokens": 1613160049107,
      "matchedSpendUsd": 13838879.391136944,
      "imputedSpendUsd": 1571390.7470212935,
      "estimatedSpendUsd": 15410270.138158238,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-09-27",
      "totalTokens": 20530243814309,
      "catalogMatchedTokens": 14650190290534,
      "knownFreeTokens": 4392113171941,
      "unmatchedTokens": 1487940351834,
      "matchedSpendUsd": 12152631.364447746,
      "imputedSpendUsd": 1234276.8407458125,
      "estimatedSpendUsd": 13386908.205193559,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-09-28",
      "totalTokens": 23934998683834,
      "catalogMatchedTokens": 17418171146377,
      "knownFreeTokens": 4647933134665,
      "unmatchedTokens": 1868894402792,
      "matchedSpendUsd": 16722650.891896999,
      "imputedSpendUsd": 1794268.0887144448,
      "estimatedSpendUsd": 18516918.980611444,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-09-29",
      "totalTokens": 24936730343781,
      "catalogMatchedTokens": 17587872586567,
      "knownFreeTokens": 5406932194065,
      "unmatchedTokens": 1941925563149,
      "matchedSpendUsd": 15831097.641579334,
      "imputedSpendUsd": 1747955.1919412378,
      "estimatedSpendUsd": 17579052.833520573,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-09-30",
      "totalTokens": 24377727661254,
      "catalogMatchedTokens": 16795679309412,
      "knownFreeTokens": 5574011992540,
      "unmatchedTokens": 2008036359302,
      "matchedSpendUsd": 18069861.767884195,
      "imputedSpendUsd": 2160373.4370624204,
      "estimatedSpendUsd": 20230235.204946615,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-10-01",
      "totalTokens": 23448140575999,
      "catalogMatchedTokens": 16056166872489,
      "knownFreeTokens": 5407347256835,
      "unmatchedTokens": 1984626446675,
      "matchedSpendUsd": 21890446.89129581,
      "imputedSpendUsd": 2705774.0602110177,
      "estimatedSpendUsd": 24596220.951506827,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-10-02",
      "totalTokens": 24053135903035,
      "catalogMatchedTokens": 15973884209393,
      "knownFreeTokens": 6119860338421,
      "unmatchedTokens": 1959391355221,
      "matchedSpendUsd": 20120509.42825819,
      "imputedSpendUsd": 2468025.4169608643,
      "estimatedSpendUsd": 22588534.845219057,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-10-03",
      "totalTokens": 22318370111379,
      "catalogMatchedTokens": 14323007759355,
      "knownFreeTokens": 6312683586334,
      "unmatchedTokens": 1682678765690,
      "matchedSpendUsd": 12442489.707460271,
      "imputedSpendUsd": 1461753.9538359232,
      "estimatedSpendUsd": 13904243.661296194,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-10-04",
      "totalTokens": 22777900463165,
      "catalogMatchedTokens": 14044601424543,
      "knownFreeTokens": 7033207251162,
      "unmatchedTokens": 1700091787460,
      "matchedSpendUsd": 12119463.441490596,
      "imputedSpendUsd": 1467054.8235917855,
      "estimatedSpendUsd": 13586518.265082382,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-10-05",
      "totalTokens": 25873329491117,
      "catalogMatchedTokens": 19203137937270,
      "knownFreeTokens": 4462258986406,
      "unmatchedTokens": 2207932567441,
      "matchedSpendUsd": 16657033.075963942,
      "imputedSpendUsd": 1915187.2951963593,
      "estimatedSpendUsd": 18572220.371160302,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-10-06",
      "totalTokens": 22108871284779,
      "catalogMatchedTokens": 19581427731243,
      "knownFreeTokens": 317991656781,
      "unmatchedTokens": 2209451896755,
      "matchedSpendUsd": 21376953.074875183,
      "imputedSpendUsd": 2412048.302421073,
      "estimatedSpendUsd": 23789001.377296258,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-10-07",
      "totalTokens": 25121018495703,
      "catalogMatchedTokens": 22536344101018,
      "knownFreeTokens": 323959395086,
      "unmatchedTokens": 2260714999599,
      "matchedSpendUsd": 22327218.1065473,
      "imputedSpendUsd": 2239736.6958250254,
      "estimatedSpendUsd": 24566954.802372325,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-10-08",
      "totalTokens": 24454379472736,
      "catalogMatchedTokens": 21849717208246,
      "knownFreeTokens": 306681141316,
      "unmatchedTokens": 2297981123174,
      "matchedSpendUsd": 20999023.542038452,
      "imputedSpendUsd": 2208511.8651549136,
      "estimatedSpendUsd": 23207535.407193366,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-10-09",
      "totalTokens": 26637897111180,
      "catalogMatchedTokens": 24241588381297,
      "knownFreeTokens": 247342998471,
      "unmatchedTokens": 2148965731412,
      "matchedSpendUsd": 24753818.497512754,
      "imputedSpendUsd": 2194373.85191264,
      "estimatedSpendUsd": 26948192.349425394,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-10-10",
      "totalTokens": 24016901407416,
      "catalogMatchedTokens": 21986632480429,
      "knownFreeTokens": 226462763671,
      "unmatchedTokens": 1803806163316,
      "matchedSpendUsd": 21695016.553417794,
      "imputedSpendUsd": 1779881.6898009155,
      "estimatedSpendUsd": 23474898.24321871,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-10-11",
      "totalTokens": 23626962422499,
      "catalogMatchedTokens": 21636890013650,
      "knownFreeTokens": 225993695491,
      "unmatchedTokens": 1764078713358,
      "matchedSpendUsd": 21444759.407458857,
      "imputedSpendUsd": 1748414.1001741022,
      "estimatedSpendUsd": 23193173.50763296,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-10-12",
      "totalTokens": 26944929613477,
      "catalogMatchedTokens": 24461342154648,
      "knownFreeTokens": 233407628159,
      "unmatchedTokens": 2250179830670,
      "matchedSpendUsd": 23590990.669419073,
      "imputedSpendUsd": 2170116.874791527,
      "estimatedSpendUsd": 25761107.544210598,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-10-13",
      "totalTokens": 26213714326888,
      "catalogMatchedTokens": 23626187972396,
      "knownFreeTokens": 242801789822,
      "unmatchedTokens": 2344724564670,
      "matchedSpendUsd": 24226925.460141975,
      "imputedSpendUsd": 2404343.3210297585,
      "estimatedSpendUsd": 26631268.781171735,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-10-14",
      "totalTokens": 26380686626147,
      "catalogMatchedTokens": 23830064039195,
      "knownFreeTokens": 314705062491,
      "unmatchedTokens": 2235917524461,
      "matchedSpendUsd": 23492294.061619163,
      "imputedSpendUsd": 2204225.380837028,
      "estimatedSpendUsd": 25696519.44245619,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-10-15",
      "totalTokens": 24435867920359,
      "catalogMatchedTokens": 21829712216367,
      "knownFreeTokens": 282058790380,
      "unmatchedTokens": 2324096913612,
      "matchedSpendUsd": 21334157.72155712,
      "imputedSpendUsd": 2271337.7814485133,
      "estimatedSpendUsd": 23605495.503005635,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-10-16",
      "totalTokens": 22406090415983,
      "catalogMatchedTokens": 19873317782293,
      "knownFreeTokens": 246367151958,
      "unmatchedTokens": 2286405481732,
      "matchedSpendUsd": 18879504.156926073,
      "imputedSpendUsd": 2172068.21073624,
      "estimatedSpendUsd": 21051572.367662314,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-10-17",
      "totalTokens": 18121289824879,
      "catalogMatchedTokens": 15988739114728,
      "knownFreeTokens": 236015960905,
      "unmatchedTokens": 1896534749246,
      "matchedSpendUsd": 14061078.713748727,
      "imputedSpendUsd": 1667881.638517896,
      "estimatedSpendUsd": 15728960.352266623,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-10-18",
      "totalTokens": 19328317867856,
      "catalogMatchedTokens": 17234706984532,
      "knownFreeTokens": 220864835236,
      "unmatchedTokens": 1872746048088,
      "matchedSpendUsd": 14086731.280151976,
      "imputedSpendUsd": 1530682.8459026795,
      "estimatedSpendUsd": 15617414.126054656,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-10-19",
      "totalTokens": 24252736047656,
      "catalogMatchedTokens": 20658630523586,
      "knownFreeTokens": 1264205465760,
      "unmatchedTokens": 2329900058310,
      "matchedSpendUsd": 19350539.6241784,
      "imputedSpendUsd": 2182372.3187860777,
      "estimatedSpendUsd": 21532911.942964476,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-10-20",
      "totalTokens": 28607010322316,
      "catalogMatchedTokens": 22129462634391,
      "knownFreeTokens": 4044061225559,
      "unmatchedTokens": 2433486462366,
      "matchedSpendUsd": 23259554.79523343,
      "imputedSpendUsd": 2557758.0734787867,
      "estimatedSpendUsd": 25817312.868712217,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-10-21",
      "totalTokens": 30526166400227,
      "catalogMatchedTokens": 22591740216847,
      "knownFreeTokens": 5497509091523,
      "unmatchedTokens": 2436917091857,
      "matchedSpendUsd": 23097506.461550556,
      "imputedSpendUsd": 2491472.889434883,
      "estimatedSpendUsd": 25588979.350985438,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-10-22",
      "totalTokens": 30605359707853,
      "catalogMatchedTokens": 24647468997940,
      "knownFreeTokens": 3452565056640,
      "unmatchedTokens": 2505325653273,
      "matchedSpendUsd": 24868719.31370821,
      "imputedSpendUsd": 2527814.943834038,
      "estimatedSpendUsd": 27396534.257542245,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-10-23",
      "totalTokens": 27228801471449,
      "catalogMatchedTokens": 24469286232281,
      "knownFreeTokens": 130125861889,
      "unmatchedTokens": 2629389377279,
      "matchedSpendUsd": 27191910.700011168,
      "imputedSpendUsd": 2921953.6877297615,
      "estimatedSpendUsd": 30113864.38774093,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-10-24",
      "totalTokens": 23433576429862,
      "catalogMatchedTokens": 21219727543530,
      "knownFreeTokens": 180614382067,
      "unmatchedTokens": 2033234504265,
      "matchedSpendUsd": 18432343.027978614,
      "imputedSpendUsd": 1766152.5465892013,
      "estimatedSpendUsd": 20198495.574567817,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-10-25",
      "totalTokens": 23358534066167,
      "catalogMatchedTokens": 21257708521616,
      "knownFreeTokens": 178506808439,
      "unmatchedTokens": 1922318736112,
      "matchedSpendUsd": 15117376.912237516,
      "imputedSpendUsd": 1367053.125679606,
      "estimatedSpendUsd": 16484430.037917122,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-10-26",
      "totalTokens": 26265134523456,
      "catalogMatchedTokens": 23628636338567,
      "knownFreeTokens": 178456128422,
      "unmatchedTokens": 2458042056467,
      "matchedSpendUsd": 19500261.918912925,
      "imputedSpendUsd": 2028575.1247766167,
      "estimatedSpendUsd": 21528837.04368954,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-10-27",
      "totalTokens": 26977018453032,
      "catalogMatchedTokens": 24047027464071,
      "knownFreeTokens": 184949362119,
      "unmatchedTokens": 2745041626842,
      "matchedSpendUsd": 20799813.01534794,
      "imputedSpendUsd": 2374362.1802307405,
      "estimatedSpendUsd": 23174175.19557868,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-10-28",
      "totalTokens": 29436194497730,
      "catalogMatchedTokens": 26586772479969,
      "knownFreeTokens": 127179135045,
      "unmatchedTokens": 2722242882716,
      "matchedSpendUsd": 22632344.060679857,
      "imputedSpendUsd": 2317345.4989613434,
      "estimatedSpendUsd": 24949689.5596412,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-10-29",
      "totalTokens": 33105112193299,
      "catalogMatchedTokens": 30305569601069,
      "knownFreeTokens": 178593071799,
      "unmatchedTokens": 2620949520431,
      "matchedSpendUsd": 27898668.448880028,
      "imputedSpendUsd": 2412790.8715887098,
      "estimatedSpendUsd": 30311459.32046874,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-10-30",
      "totalTokens": 30372719847229,
      "catalogMatchedTokens": 27619516380260,
      "knownFreeTokens": 185152722208,
      "unmatchedTokens": 2568050744761,
      "matchedSpendUsd": 22319577.083534624,
      "imputedSpendUsd": 2075264.670205716,
      "estimatedSpendUsd": 24394841.75374034,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-10-31",
      "totalTokens": 24509121732824,
      "catalogMatchedTokens": 22442087971220,
      "knownFreeTokens": 114769323880,
      "unmatchedTokens": 1952264437724,
      "matchedSpendUsd": 15457350.497701699,
      "imputedSpendUsd": 1344653.6577522345,
      "estimatedSpendUsd": 16802004.155453935,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-11-01",
      "totalTokens": 22918577456662,
      "catalogMatchedTokens": 20964778271005,
      "knownFreeTokens": 52771281678,
      "unmatchedTokens": 1901027903979,
      "matchedSpendUsd": 14876888.852979217,
      "imputedSpendUsd": 1348994.98903939,
      "estimatedSpendUsd": 16225883.842018606,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-11-02",
      "totalTokens": 30540767472661,
      "catalogMatchedTokens": 28063997754186,
      "knownFreeTokens": 56355731607,
      "unmatchedTokens": 2420413986868,
      "matchedSpendUsd": 22005238.481082253,
      "imputedSpendUsd": 1897868.8450056247,
      "estimatedSpendUsd": 23903107.326087877,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-11-03",
      "totalTokens": 33585262207611,
      "catalogMatchedTokens": 30962109571284,
      "knownFreeTokens": 0,
      "unmatchedTokens": 2623152636327,
      "matchedSpendUsd": 23324420.704170603,
      "imputedSpendUsd": 1976077.0990129886,
      "estimatedSpendUsd": 25300497.803183593,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-11-04",
      "totalTokens": 32681565877405,
      "catalogMatchedTokens": 29426175664130,
      "knownFreeTokens": 0,
      "unmatchedTokens": 3255390213275,
      "matchedSpendUsd": 23303054.62599243,
      "imputedSpendUsd": 2577995.0760418097,
      "estimatedSpendUsd": 25881049.70203424,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-11-05",
      "totalTokens": 29914491766840,
      "catalogMatchedTokens": 26365437728567,
      "knownFreeTokens": 0,
      "unmatchedTokens": 3549054038273,
      "matchedSpendUsd": 22827752.474977918,
      "imputedSpendUsd": 3072845.8954517893,
      "estimatedSpendUsd": 25900598.370429706,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-11-06",
      "totalTokens": 31245068361401,
      "catalogMatchedTokens": 27728131583785,
      "knownFreeTokens": 0,
      "unmatchedTokens": 3516936777616,
      "matchedSpendUsd": 22445600.497649726,
      "imputedSpendUsd": 2846919.4776911368,
      "estimatedSpendUsd": 25292519.97534086,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-11-07",
      "totalTokens": 26570286802643,
      "catalogMatchedTokens": 23847900786908,
      "knownFreeTokens": 0,
      "unmatchedTokens": 2722386015735,
      "matchedSpendUsd": 17136695.828204304,
      "imputedSpendUsd": 1956260.2803270244,
      "estimatedSpendUsd": 19092956.10853133,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-11-08",
      "totalTokens": 24942300172506,
      "catalogMatchedTokens": 22131593862054,
      "knownFreeTokens": 0,
      "unmatchedTokens": 2810706310452,
      "matchedSpendUsd": 15960343.66879267,
      "imputedSpendUsd": 2026959.2396493945,
      "estimatedSpendUsd": 17987302.908442065,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-11-09",
      "totalTokens": 29607921090799,
      "catalogMatchedTokens": 26366524465994,
      "knownFreeTokens": 0,
      "unmatchedTokens": 3241396624805,
      "matchedSpendUsd": 19760098.5185279,
      "imputedSpendUsd": 2429228.6503812424,
      "estimatedSpendUsd": 22189327.16890914,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-11-10",
      "totalTokens": 31492678796523,
      "catalogMatchedTokens": 28704816489156,
      "knownFreeTokens": 0,
      "unmatchedTokens": 2787862307367,
      "matchedSpendUsd": 24050490.53150354,
      "imputedSpendUsd": 2335825.977211711,
      "estimatedSpendUsd": 26386316.50871525,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-11-11",
      "totalTokens": 33163386636444,
      "catalogMatchedTokens": 30432414830459,
      "knownFreeTokens": 0,
      "unmatchedTokens": 2730971805985,
      "matchedSpendUsd": 23403978.091727156,
      "imputedSpendUsd": 2100247.537780868,
      "estimatedSpendUsd": 25504225.629508026,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-11-12",
      "totalTokens": 32627107955156,
      "catalogMatchedTokens": 29869839160270,
      "knownFreeTokens": 0,
      "unmatchedTokens": 2757268794886,
      "matchedSpendUsd": 24905711.066829942,
      "imputedSpendUsd": 2299032.7992913225,
      "estimatedSpendUsd": 27204743.866121266,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-11-13",
      "totalTokens": 31746944371537,
      "catalogMatchedTokens": 28911346063551,
      "knownFreeTokens": 0,
      "unmatchedTokens": 2835598307986,
      "matchedSpendUsd": 25131786.54845546,
      "imputedSpendUsd": 2464902.576892082,
      "estimatedSpendUsd": 27596689.125347544,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-11-14",
      "totalTokens": 27157742001686,
      "catalogMatchedTokens": 24720232646043,
      "knownFreeTokens": 0,
      "unmatchedTokens": 2437509355643,
      "matchedSpendUsd": 17299080.63911237,
      "imputedSpendUsd": 1705755.423325628,
      "estimatedSpendUsd": 19004836.062437996,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-11-15",
      "totalTokens": 25484361654341,
      "catalogMatchedTokens": 23109435573184,
      "knownFreeTokens": 0,
      "unmatchedTokens": 2374926081157,
      "matchedSpendUsd": 16129925.22050873,
      "imputedSpendUsd": 1657651.0478581237,
      "estimatedSpendUsd": 17787576.268366855,
      "catalogDate": "2026-11-17"
    },
    {
      "date": "2026-11-16",
      "totalTokens": 32129264536539,
      "catalogMatchedTokens": 29066944718731,
      "knownFreeTokens": 0,
      "unmatchedTokens": 3062319817808,
      "matchedSpendUsd": 25671322.0707001,
      "imputedSpendUsd": 2704577.281415387,
      "estimatedSpendUsd": 28375899.35211549,
      "catalogDate": "2026-11-17"
    }
  ]
} as const;
