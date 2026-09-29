import fs from "node:fs/promises";
import { FileBlob, SpreadsheetFile, Workbook } from "@oai/artifact-tool";

const dataRoot = "/Users/linyu/Library/CloudStorage/OneDrive-Personal/AI_INDEX";
const sourceWorkbook = `${dataRoot}/Indexlist.xlsx`;
const sourceCsv = `${dataRoot}/ai_companies/ai_companies_revenue_reports.csv`;
const outputPath = `${dataRoot}/outputs/ai_company_revenue_integration/Indexlist_with_ai_company_revenue.xlsx`;

const workbook = await SpreadsheetFile.importXlsx(await FileBlob.load(sourceWorkbook));
const csvText = await fs.readFile(sourceCsv, "utf8");
const csvWorkbook = await Workbook.fromCSV(csvText, { sheetName: "Revenue" });
const csvValues = csvWorkbook.worksheets.getItem("Revenue").getUsedRange().values;
const headers = csvValues[0].map(String);
const column = Object.fromEntries(headers.map((header, index) => [header, index]));

const text = (row, key) => row[column[key]] == null ? "" : String(row[column[key]]).trim();
const number = (row, key) => {
  const value = row[column[key]];
  if (value == null || value === "") return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
};
const date = (row, key) => {
  const value = text(row, key);
  if (!value) return null;
  const parsed = new Date(`${value}T00:00:00Z`);
  return Number.isNaN(parsed.valueOf()) ? null : parsed;
};
const compact = values => values.filter(Boolean).join("\n");

for (const company of ["OpenAI", "Anthropic"]) {
  const sheet = workbook.worksheets.getItem(company);
  const sourceRows = csvValues.slice(1).filter(row => text(row, "Company") === company);
  const startRow = sheet.getUsedRange().rowCount + 3;
  const titleRow = startRow;
  const noteRow = startRow + 1;
  const headerRow = startRow + 3;
  const dataStartRow = headerRow + 1;
  const dataEndRow = dataStartRow + sourceRows.length - 1;

  sheet.mergeCells(`A${titleRow}:K${titleRow}`);
  sheet.getRange(`A${titleRow}`).values = [[`${company} revenue reports`]];
  sheet.getRange(`A${titleRow}:K${titleRow}`).format = {
    fill: "#17324D",
    font: { bold: true, color: "#FFFFFF", size: 13 },
    verticalAlignment: "center",
  };
  sheet.getRange(`A${titleRow}:K${titleRow}`).format.rowHeight = 25;

  sheet.mergeCells(`A${noteRow}:K${noteRow}`);
  sheet.getRange(`A${noteRow}`).values = [["Source: ai_companies_revenue_reports.csv. Annualized run rate, ARR and recognized period revenue remain separately labeled; product/division records are not treated as full-company revenue."]];
  sheet.getRange(`A${noteRow}:K${noteRow}`).format = {
    fill: "#D9EAF7",
    font: { italic: true, color: "#334155", size: 10 },
    wrapText: true,
    verticalAlignment: "center",
  };
  sheet.getRange(`A${noteRow}:K${noteRow}`).format.rowHeight = 34;

  const outputHeaders = ["Date", "Record", "Measure", "Value (USD)", "Scope", "Period revenue (USD)", "Period type", "Confidence", "Report date", "Sources", "Notes"];
  sheet.getRange(`A${headerRow}:K${headerRow}`).values = [outputHeaders];
  sheet.getRange(`A${headerRow}:K${headerRow}`).format = {
    fill: "#DCE6F1",
    font: { bold: true, color: "#17324D", size: 10 },
    wrapText: true,
    verticalAlignment: "center",
    horizontalAlignment: "center",
    borders: { preset: "all", style: "thin", color: "#AAB7C4" },
  };
  sheet.getRange(`A${headerRow}:K${headerRow}`).format.rowHeight = 30;

  const outputRows = sourceRows.map(row => {
    const annualizedType = text(row, "Annualized revenue type");
    const periodType = text(row, "Period type");
    return [
      date(row, "Date"),
      text(row, "Id"),
      annualizedType || (periodType ? `${periodType} revenue` : "Revenue"),
      number(row, "Revenue amount (normalize to annual)"),
      text(row, "Scope"),
      number(row, "Period revenue"),
      periodType,
      text(row, "Confidence"),
      date(row, "Report date"),
      compact([text(row, "Source 1"), text(row, "Source 2"), text(row, "Source 3")]),
      compact([text(row, "Other revenue info"), text(row, "Notes"), text(row, "Graph note")]),
    ];
  });
  sheet.getRange(`A${dataStartRow}:K${dataEndRow}`).values = outputRows;
  sheet.getRange(`A${dataStartRow}:K${dataEndRow}`).format = {
    font: { size: 10, color: "#1F2937" },
    wrapText: true,
    verticalAlignment: "top",
    borders: { preset: "all", style: "thin", color: "#D6DCE2" },
  };
  sheet.getRange(`A${dataStartRow}:A${dataEndRow}`).setNumberFormat("yyyy-mm-dd");
  sheet.getRange(`D${dataStartRow}:D${dataEndRow}`).setNumberFormat("$#,##0");
  sheet.getRange(`F${dataStartRow}:F${dataEndRow}`).setNumberFormat("$#,##0");
  sheet.getRange(`I${dataStartRow}:I${dataEndRow}`).setNumberFormat("yyyy-mm-dd");
  sheet.getRange(`A${dataStartRow}:K${dataEndRow}`).format.rowHeight = 72;

  const widths = [12, 22, 24, 17, 18, 19, 14, 13, 12, 44, 64];
  widths.forEach((width, index) => sheet.getRangeByIndexes(headerRow - 1, index, sourceRows.length + 1, 1).format.columnWidth = width);
  sheet.freezePanes.freezeRows(1);
}

await fs.mkdir(outputPath.slice(0, outputPath.lastIndexOf("/")), { recursive: true });
const output = await SpreadsheetFile.exportXlsx(workbook);
await output.save(outputPath);
console.log(outputPath);
