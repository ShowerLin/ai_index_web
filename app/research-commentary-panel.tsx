import { commentaryReviewDate, pillarCommentary } from "./research-commentary";

export default function ResearchCommentary({ section }: { section: keyof typeof pillarCommentary }) {
  const copy = pillarCommentary[section];
  return <aside className="research-card" style={{gridColumn: "1 / -1"}} aria-label={`${section} analyst commentary`}>
    <p className="panel-source">Analyst review · {commentaryReviewDate}</p>
    {copy.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
    <p><strong>What to watch. </strong>{copy.watch}</p>
    <p className="panel-source">{copy.sources.map(source => <a className="source-chip" key={source} href={`#${source}`}>{source.replace("source-", "")}</a>)}</p>
  </aside>;
}
