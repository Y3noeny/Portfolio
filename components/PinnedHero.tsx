"use client";
import dynamic from 'next/dynamic';
import { Component, type ReactNode, useEffect, useRef, useState } from 'react';
import { portfolio } from '@/content/portfolio';
import { TwoDHero } from '@/components/TwoDHero';
import { shouldUseScene } from '@/lib/hero-mode';
const Scene = dynamic(() => import('@/components/HeroScene'), { ssr: false, loading: () => <div className="scene-loading" role="status">{portfolio.hero.sceneLoading}</div> });
type Motion = { progress: number; pointerX: number; pointerY: number };
class SceneGuard extends Component<{ children: ReactNode; fallback: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() { return this.state.failed ? this.props.fallback : this.props.children; }
}
function webglAvailable() { try { const c = document.createElement('canvas'); return Boolean(c.getContext('webgl2') || c.getContext('webgl')); } catch { return false; } }
export function PinnedHero() {
  const track = useRef<HTMLElement>(null);
  const motion = useRef<Motion>({ progress: 0, pointerX: 0, pointerY: 0 });
  const [useScene, setUseScene] = useState(false);
  useEffect(() => { const pref = window.matchMedia('(prefers-reduced-motion: reduce)'); const update = () => setUseScene(shouldUseScene(webglAvailable(), pref.matches)); update(); pref.addEventListener('change', update); return () => pref.removeEventListener('change', update); }, []);
  useEffect(() => { let raf = 0; const update = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(() => { const el = track.current; if (el) motion.current.progress = Math.max(0, Math.min(1, -el.getBoundingClientRect().top / Math.max(1, el.offsetHeight - window.innerHeight))); }); }; update(); window.addEventListener('scroll', update, { passive: true }); window.addEventListener('resize', update); return () => { cancelAnimationFrame(raf); window.removeEventListener('scroll', update); window.removeEventListener('resize', update); }; }, []);
  const pointer = (e: React.PointerEvent<HTMLElement>) => { if (e.pointerType === 'mouse') { motion.current.pointerX = e.clientX / window.innerWidth * 2 - 1; motion.current.pointerY = e.clientY / window.innerHeight * 2 - 1; } };
  const fallback = <TwoDHero />;
  return <section className="hero-track" ref={track} onPointerMove={pointer} onPointerLeave={() => { motion.current.pointerX = 0; motion.current.pointerY = 0; }} aria-label={portfolio.hero.sectionLabel}><div className="hero-stage"><div className="hero-visual">{useScene ? <SceneGuard fallback={fallback}><Scene motionRef={motion} /></SceneGuard> : fallback}</div><div className="hero-copy"><p className="eyebrow">{portfolio.hero.eyebrow}</p><h1>{portfolio.hero.name}</h1><p className="hero-role">{portfolio.hero.role}</p><hr/><h2>{portfolio.hero.headline}</h2><p>{portfolio.hero.introduction}</p><div className="hero-meta">{portfolio.hero.statusLabel}<span>{portfolio.hero.scrollLabel}</span></div></div>{!useScene && <p className="fallback-note">{portfolio.hero.fallbackNotice}</p>}</div></section>;
}
