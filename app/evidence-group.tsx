export default function EvidenceGroup({title,description}:{title:string;description:string}) {
  return <div className="evidence-group"><h4>{title}</h4><p>{description}</p></div>;
}
