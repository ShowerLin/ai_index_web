import {cloudReferenceSnapshot as snapshot} from './cloud-reference-snapshot';

export default function CloudReference() {
  const entities = [...new Set(snapshot.observations.map(row => row.entity))];
  return <details className="heatmap-detail-wrap">
    <summary>Cloud estimates and RPO · reference for the CapEx pillar</summary>
    <p>Bloomberg estimates provide context for future cloud demand and investment. Amounts are USD billions; margins are percentages. Period labels follow each source’s fiscal quarters. The existing CapEx pillar retains its 20% scoring weight.</p>
    {entities.map(entity => {
      const rows = snapshot.observations.filter(row => row.entity === entity);
      const periods = [...new Set(rows.map(row => row.fiscalPeriod))];
      const metrics = [...new Set(rows.map(row => row.metric))];
      return <div key={entity} style={{overflowX:'auto'}}><table>
        <caption>{entity} · estimates</caption>
        <thead><tr><th>Metric</th>{periods.map(period => <th key={period}>{period} E</th>)}</tr></thead>
        <tbody>{metrics.map(metric => <tr key={metric}><th>{metric}</th>{periods.map(period => {
          const item = rows.find(row => row.metric === metric && row.fiscalPeriod === period);
          return <td key={period} title={item ? `${snapshot.metadata.sheet}!${item.sourceCell}` : ''}>{!item ? 'n/a' : item.unit === 'fraction' ? `${(item.value * 100).toFixed(1)}%` : item.value.toFixed(1)}</td>;
        })}</tr>)}</tbody>
      </table></div>;
    })}
    <p>Source: saved Bloomberg workbook, Cloud FA Value / Formula. Bloomberg retrieval time is not recorded.</p>
    {snapshot.metadata.limitations.map(note => <p key={note}>{note}</p>)}
  </details>;
}
