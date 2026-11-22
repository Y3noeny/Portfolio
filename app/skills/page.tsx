import { portfolio } from '@/content/portfolio';
export default function SkillsPage() {
  return <div className="page-shell"><header className="page-heading"><p className="eyebrow">{portfolio.skills.pageLabel}</p><h1>{portfolio.skills.heading}</h1><p className="page-intro">{portfolio.skills.intro}</p></header><div className="skills-list">{portfolio.skills.groups.map((group, i) => <section className="skill-group" key={group.title}><span className="skill-group-number">0{i + 1}</span><h2>{group.title}</h2><ul>{group.items.map(skill => <li key={skill}>{skill}</li>)}</ul></section>)}</div></div>;
}
