import type { Metadata } from 'next';
import { SiteNav } from '@/components/SiteNav';
import { portfolio } from '@/content/portfolio';
import './globals.css';
export const metadata: Metadata = { title: portfolio.meta.title, description: portfolio.meta.description };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body><a className="skip-link" href="#main-content">{portfolio.common.skipLink}</a><SiteNav /><main id="main-content">{children}</main></body></html>;
}
