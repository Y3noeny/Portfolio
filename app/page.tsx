import { PinnedHero } from '@/components/PinnedHero';
import { portfolio } from '@/content/portfolio';
export default function HomePage() {
  return <><PinnedHero /><section className="content-section home-about"><p className="eyebrow">{portfolio.introduction.sectionLabel}</p><div className="about-grid"><h2>{portfolio.introduction.heading}</h2><div className="about-copy"><p>{portfolio.introduction.bio}</p><div className="focus-line"><span>{portfolio.introduction.noteLabel}</span><p>{portfolio.introduction.note}</p></div></div></div></section></>;
}
