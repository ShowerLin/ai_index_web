export default function EvidenceGroup({title,description}:{title:string;description:string}) {
  return <div className="evidence-group"><h3>{title}</h3><p>{description}</p></div>;
}
