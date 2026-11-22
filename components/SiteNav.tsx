"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { portfolio } from '@/content/portfolio';
export function SiteNav() {
  const path = usePathname() ?? '/';
  return <header className="site-header"><Link className="brand-mark" href="/" aria-label={`${portfolio.hero.name} - ${portfolio.navigation[0].label}`}>{portfolio.brandMark}</Link><nav className="site-nav" aria-label={portfolio.navigationLabel}>{portfolio.navigation.map((item, index) => <Link key={item.href} href={item.href} className="nav-link" aria-current={(item.href === '/' ? path === '/' : path.startsWith(item.href)) ? 'page' : undefined}><span className="nav-index">0{index + 1}</span>{item.label}</Link>)}</nav></header>;
}
