type Props = {
  id: string;
  number: string;
  pillar: string;
  title: string;
  question: string;
  evidence: string;
  gap: string;
  next: string;
};

export default function FrameworkStage({ id, number, pillar, title, question, evidence, gap, next }: Props) {
  return <section className="framework-stage" id={id} aria-labelledby={`${id}-title`}>
    <div className="framework-stage-heading"><span>{number} / DEEPER EVIDENCE · CORE PILLAR: {pillar}</span><h2 id={`${id}-title`}>{title}</h2><p>{question}</p></div>
    <div className="framework-evidence"><div><b>Available evidence</b><p>{evidence}</p></div><div><b>Missing evidence</b><p>{gap}</p></div><div><b>Conversion to test</b><p>{next}</p></div></div>
  </section>;
}
