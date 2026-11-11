import PillarResearch from "./pillar-research";
import PolicyCancellationCharts from "./policy-cancellation-charts";

const tracker = "https://programs.com/resources/data-center-project-tracker/#updates";

export default function PolicyDataCenters() {
  return (
    <PillarResearch
      id="policy"
      number="07"
      pillar="Policy"
      classification="SUPPLEMENTARY RESEARCH"
      title="U.S. data center permitting and project delays"
      summary="Permit freezes and zoning denials can push back or prevent delivery of the power and facilities needed for AI compute. The effect depends on the project stage and whether the rule covers existing approvals."
      history={false}
    >
      <p>
        In the Nov. 3, 2026 midterms, voters favored restricting data center development in 40 of 41
        local ballot contests tracked by Ballotpedia. The results included advisory measures and
        votes on individual rezoning proposals. Project schedules depend on how each measure applies.
        {" "}<a href="https://ballotpedia.org/Data_center-related_ballot_measures%2C_2026">Ballotpedia election results</a>
      </p>
      <div className="signal-table-wrap">
        <table>
          <caption>U.S. data center disruption reported by two trackers</caption>
          <thead><tr><th scope="col">Period</th><th scope="col">Outcome tracked</th><th scope="col">Projects</th><th scope="col">Announced investment</th><th scope="col">Source</th></tr></thead>
          <tbody>
            <tr><th scope="row">Q1 2026</th><td>Blocked or delayed</td><td>At least 75</td><td>About $130B</td><td><a href="https://www.datacenterwatch.org/q1-2026">Data Center Watch Q1</a></td></tr>
            <tr><th scope="row">Q2 2026</th><td>Blocked or delayed</td><td>At least 45</td><td>About $68B</td><td><a href="https://www.datacenterwatch.org/q2-2026">Data Center Watch Q2</a></td></tr>
            <tr><th scope="row">Jan. 2024–Nov. 4, 2026</th><td>Cancelled</td><td>69</td><td>About $165B reported across 32 projects</td><td><a href={tracker}>Programs.com</a></td></tr>
          </tbody>
        </table>
      </div>
      <p>
        The two trackers use different criteria and their counts can overlap. Programs.com tracks
        large projects with final denials, withdrawals or failed deals and excludes temporary pauses
        and same-site refilings. Its published cancellation total includes 15,910 MW of planned
        capacity across the 26 projects with reported figures. These are planned facilities and announced
        investment. The Q1 and Q2 reports both predate the midterms.
      </p>
      <PolicyCancellationCharts/>
    </PillarResearch>
  );
}
