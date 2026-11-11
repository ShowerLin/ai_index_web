const quarters = [
  { year: 2024, quarter: 1, projects: 0, usd: 0, usdCount: 0, mw: 0, mwCount: 0 },
  { year: 2024, quarter: 2, projects: 2, usd: 15300000000, usdCount: 2, mw: null, mwCount: 0 },
  { year: 2024, quarter: 3, projects: 0, usd: 0, usdCount: 0, mw: 0, mwCount: 0 },
  { year: 2024, quarter: 4, projects: 1, usd: 1500000000, usdCount: 1, mw: null, mwCount: 0 },
  { year: 2025, quarter: 1, projects: 0, usd: 0, usdCount: 0, mw: 0, mwCount: 0 },
  { year: 2025, quarter: 2, projects: 3, usd: 8850000000, usdCount: 1, mw: 300, mwCount: 1 },
  { year: 2025, quarter: 3, projects: 10, usd: 41000000000, usdCount: 6, mw: 2700, mwCount: 3 },
  { year: 2025, quarter: 4, projects: 10, usd: 22700000000, usdCount: 6, mw: 1700, mwCount: 3 },
  { year: 2026, quarter: 1, projects: 12, usd: 28500000000, usdCount: 5, mw: 1800, mwCount: 5 },
  { year: 2026, quarter: 2, projects: 10, usd: 7300000000, usdCount: 3, mw: 2020, mwCount: 5 },
  { year: 2026, quarter: 3, projects: 17, usd: 38100000000, usdCount: 7, mw: 7390, mwCount: 9 },
  { year: 2026, quarter: 4, projects: 4, usd: 2100000000, usdCount: 1, mw: null, mwCount: 0 },
];

const metrics = [
  {
    title: "Announced investment cancelled by quarter",
    value: "usd",
    coverage: "usdCount",
    format: (value: number) => `$${(value / 1e9).toLocaleString("en-US", { maximumFractionDigits: 2 })}B`,
  },
  {
    title: "Planned power capacity cancelled by quarter",
    value: "mw",
    coverage: "mwCount",
    format: (value: number) => `${value.toLocaleString("en-US")} MW`,
  },
] as const;

export default function PolicyCancellationCharts() {
  return (
    <>
      {metrics.map(({ title, value, coverage, format }) => {
        const maximum = Math.max(...quarters.map(quarter => quarter[value] ?? 0));
        return (
          <figure key={value} className="signal-table-wrap" style={{ margin: 0, padding: "1rem", border: "1px solid #d6d7ce" }}>
            <figcaption><strong>{title}</strong></figcaption>
            <svg role="img" aria-label={`${title}. ${quarters.map(quarter => { const amount = quarter[value]; return `${quarter.year} Q${quarter.quarter}: ${amount === null ? "unreported" : format(amount)} (${quarter[coverage]} of ${quarter.projects} projects reported)`; }).join("; ")}`} viewBox="0 0 900 218" style={{ display: "block", width: "100%", minWidth: 660 }}>
              <line x1="18" y1="165" x2="882" y2="165" stroke="#d6d7ce"/>
              {quarters.map((quarter, index) => {
                const amount = quarter[value];
                const x = 54 + index * 72;
                const height = 128 * (amount ?? 0) / maximum;
                const partial = index === quarters.length - 1;
                return (
                  <g key={`${quarter.year}-${quarter.quarter}`}>
                    <title>{`${quarter.year} Q${quarter.quarter}${partial ? " (partial)" : ""} · ${amount === null ? "Unreported" : format(amount)} · ${quarter[coverage]} of ${quarter.projects} projects reported`}</title>
                    <rect x={x - 15} y={165 - height} width="30" height={height} fill={partial ? "#a9d4c7" : "#399f88"}/>
                    <text x={x} y={157 - height} textAnchor="middle" fontSize="13" fill="currentColor">{amount === null ? "—" : amount === 0 ? "0" : format(amount)}</text>
                    <text x={x} y="184" textAnchor="middle" fontSize="13" fill="currentColor">Q{quarter.quarter}{partial ? "*" : ""}</text>
                    {quarter.quarter === 4 && index < quarters.length - 1 && <line x1={x + 36} y1="165" x2={x + 36} y2="211" stroke="#d6d7ce"/>}
                    {quarter.quarter === 2 && <text x={x + 36} y="206" textAnchor="middle" fontSize="13" fill="currentColor">{quarter.year}</text>}
                  </g>
                );
              })}
            </svg>
          </figure>
        );
      })}
      <p>
        Q4 2026* is partial through Nov. 4. Zero means the tracker lists no cancellations in that quarter.
        A dash means there were cancellations, with no reported figure for that metric. Totals sum the
        figures available for each quarter. Investment was reported for 32 of 69 projects, and capacity
        for 26. <a href="https://programs.com/resources/data-center-project-tracker/#updates">Programs.com project CSV</a>
      </p>
    </>
  );
}
