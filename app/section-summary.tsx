type SectionSummaryProps = {
  current: string;
  conclusion: string;
};

export default function SectionSummary({ current, conclusion }: SectionSummaryProps) {
  return <p className="section-summary">{current} {conclusion}</p>;
}
