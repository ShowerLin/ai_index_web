type SectionSummaryProps = {
  about: string;
  current: string;
  conclusion: string;
};

export default function SectionSummary({ about, current, conclusion }: SectionSummaryProps) {
  return <p className="section-summary">{about} {current} {conclusion}</p>;
}
