"use client";
import { Float, Sparkles, Stars } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import { Suspense, useRef } from 'react';
import type { Group, Mesh } from 'three';
import { portfolio } from '@/content/portfolio';
type Motion = { progress: number; pointerX: number; pointerY: number };
function Core({ motionRef }: { motionRef: React.RefObject<Motion> }) {
  const group = useRef<Group>(null), inner = useRef<Mesh>(null);
  useFrame(({ clock, camera }) => { const m = motionRef.current; if (!m) return; camera.position.set(m.pointerX * .16 + Math.sin(m.progress * Math.PI) * .22, m.pointerY * .12, 8 - m.progress * 1.8); camera.lookAt(0, 0, 0); if (group.current) { group.current.rotation.y = clock.elapsedTime * .035 + m.pointerX * .08 + m.progress * .24; group.current.rotation.x = m.pointerY * .06 + Math.sin(clock.elapsedTime * .2) * .02; } if (inner.current) inner.current.rotation.z = clock.elapsedTime * .08; });
  return <group ref={group}><Float speed={.55} rotationIntensity={.08} floatIntensity={.12}><mesh><icosahedronGeometry args={[1.45, 1]}/><meshStandardMaterial color="#77776f" metalness={.84} roughness={.28} wireframe/></mesh></Float><mesh ref={inner} scale={.55}><octahedronGeometry args={[1, 0]}/><meshStandardMaterial color="#e9e9df" emissive="#77776f" emissiveIntensity={.22} metalness={.66}/></mesh><mesh rotation={[.72, .15, .36]}><torusGeometry args={[2.08, .008, 6, 112]}/><meshStandardMaterial color="#d5ef76"/></mesh></group>;
}
export default function HeroScene({ motionRef }: { motionRef: React.RefObject<Motion> }) { return <Canvas aria-label={portfolio.hero.sceneLabel} camera={{ position: [0, 0, 8], fov: 42 }} dpr={[1, 1.35]} gl={{ antialias: false, powerPreference: 'low-power', alpha: true }} className="scene-canvas"><Suspense fallback={null}><ambientLight intensity={.68}/><directionalLight position={[4, 5, 6]} intensity={1.15}/><pointLight position={[-3, 0, 3]} intensity={.35} color="#d5ef76"/><Core motionRef={motionRef}/><Stars radius={36} depth={18} count={90} factor={1.15} saturation={0} fade speed={.12}/><Sparkles count={28} scale={[7, 5, 4]} size={1.6} speed={.16} color="#d5ef76"/></Suspense></Canvas>; }
