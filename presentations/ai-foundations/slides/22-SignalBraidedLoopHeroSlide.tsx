import { useEffect, useMemo, useRef } from 'react';
import { gsap } from 'gsap';
import { Background } from '@catalog';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Sparkles } from '@react-three/drei';
import { EffectComposer, Bloom, ChromaticAberration, Noise, Vignette } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import * as THREE from 'three';

interface SignalBraidedLoopHeroSlideProps {
  active: boolean;
}

export const SignalBraidedLoopHeroSlide = ({ active }: SignalBraidedLoopHeroSlideProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!active || !containerRef.current || hasAnimated.current) return;
    hasAnimated.current = true;

    const container = containerRef.current;
    const kicker = container.querySelector('.slide-kicker');
    const title = container.querySelector('.slide-title');
    const subtitle = container.querySelector('.slide-subtitle');

    gsap.fromTo(kicker, { opacity: 0, y: -12 }, { opacity: 1, y: 0, duration: 0.6 });
    gsap.fromTo(title, { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.9, delay: 0.2 });
    gsap.fromTo(subtitle, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.8, delay: 0.45 });
  }, [active]);

  useEffect(() => {
    if (!active) hasAnimated.current = false;
  }, [active]);

  return (
    <div className={`slide ${active ? 'active' : ''}`}>
      <div ref={containerRef} className="relative flex flex-col items-center justify-center h-screen overflow-hidden">
        <Background variant="default" />
        <div className="absolute inset-0 z-0 pointer-events-none">
          <SignalBraidedScene />
        </div>

        <div className="absolute top-12 left-0 right-0 z-10 flex flex-col items-center text-center px-8">
          <p className="slide-kicker text-violet-300/70 tracking-[0.26em] uppercase text-[11px] mb-2">
            Signal Braided Loop
          </p>
          <h1 className="slide-title text-white text-5xl font-semibold mb-3">
            Three signals, one continuous intelligence
          </h1>
          <p className="slide-subtitle text-white/50 max-w-3xl">
            Interleaved reasoning, execution, and feedback — braided into a single autonomous system.
          </p>
        </div>

        <div className="absolute inset-10 z-10 pointer-events-none rounded-3xl border border-white/5" />
      </div>
    </div>
  );
};

export default SignalBraidedLoopHeroSlide;

function SignalBraidedScene() {
  return (
    <Canvas
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      camera={{ position: [0, 0.2, 9], fov: 38 }}
    >
      <color attach="background" args={['#01030a']} />
      <fog attach="fog" args={['#01030a', 7, 18]} />
      <ambientLight intensity={0.35} />
      <pointLight position={[4, 3, 6]} intensity={1.2} color="#22d3ee" />
      <pointLight position={[-4, -2, 7]} intensity={1.1} color="#a78bfa" />
      <pointLight position={[0, 5, 4]} intensity={0.8} color="#34d399" />
      <Environment preset="night" />
      <BraidedLoop />
      <Sparkles count={120} size={1} speed={0.2} opacity={0.45} color="#60a5fa" scale={[10, 6, 6]} />
      <EffectComposer>
        <Bloom intensity={0.8} luminanceThreshold={0.1} luminanceSmoothing={0.8} />
        <ChromaticAberration offset={[0.0006, 0.001]} blendFunction={BlendFunction.SCREEN} />
        <Noise opacity={0.03} />
        <Vignette eskil={false} offset={0.2} darkness={0.8} />
      </EffectComposer>
    </Canvas>
  );
}

function BraidedLoop() {
  const groupRef = useRef<THREE.Group>(null);
  const curveA = useMemo(() => createBraidedCurve(0, 0.22, 6), []);
  const curveB = useMemo(() => createBraidedCurve((Math.PI * 2) / 3, 0.22, 6), []);
  const curveC = useMemo(() => createBraidedCurve((Math.PI * 4) / 3, 0.22, 6), []);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime();
    groupRef.current.rotation.y = Math.sin(t * 0.1) * 0.2;
    groupRef.current.rotation.x = -0.18 + Math.cos(t * 0.08) * 0.05;
  });

  return (
    <group ref={groupRef} position={[0, -0.3, 0]}>
      <Strand curve={curveA} color="#22d3ee" emissive="#22d3ee" />
      <Strand curve={curveB} color="#a78bfa" emissive="#a78bfa" />
      <Strand curve={curveC} color="#34d399" emissive="#34d399" />
      <LeadPulse curve={curveA} color="#e2e8f0" speed={0.16} />
      <LeadPulse curve={curveB} color="#a78bfa" speed={0.14} offset={0.35} />
      <LeadPulse curve={curveC} color="#34d399" speed={0.13} offset={0.7} />
    </group>
  );
}

function Strand({ curve, color, emissive }: { curve: THREE.CatmullRomCurve3; color: string; emissive: string }) {
  return (
    <mesh>
      <tubeGeometry args={[curve, 320, 0.08, 24, true]} />
      <meshStandardMaterial color={color} emissive={emissive} emissiveIntensity={0.7} roughness={0.2} metalness={0.4} />
    </mesh>
  );
}

function LeadPulse({ curve, color, speed, offset = 0 }: { curve: THREE.CatmullRomCurve3; color: string; speed: number; offset?: number }) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = (clock.getElapsedTime() * speed + offset) % 1;
    const point = curve.getPointAt(t);
    ref.current.position.set(point.x, point.y, point.z);
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.12, 24, 24]} />
      <meshBasicMaterial color={color} toneMapped={false} />
    </mesh>
  );
}

function createBraidedCurve(phase: number, radius: number, twist: number) {
  const points: THREE.Vector3[] = [];
  const segments = 360;

  for (let i = 0; i <= segments; i++) {
    const t = (i / segments) * Math.PI * 2;
    const base = basePoint(t);
    const tangent = baseTangent(t).normalize();
    const up = new THREE.Vector3(0, 1, 0);
    const binormal = new THREE.Vector3().crossVectors(tangent, up).normalize();
    const normal = new THREE.Vector3().crossVectors(binormal, tangent).normalize();

    const angle = t * twist + phase;
    const offset = normal.multiplyScalar(Math.cos(angle) * radius).add(binormal.multiplyScalar(Math.sin(angle) * radius));
    points.push(base.add(offset));
  }

  return new THREE.CatmullRomCurve3(points, true, 'catmullrom', 0.5);
}

function basePoint(t: number) {
  const x = Math.sin(t) * 3.3;
  const y = Math.sin(t) * Math.cos(t) * 1.7;
  const z = Math.cos(t * 2) * 0.35;
  return new THREE.Vector3(x, y, z);
}

function baseTangent(t: number) {
  const dx = Math.cos(t) * 3.3;
  const dy = Math.cos(2 * t) * 1.7;
  const dz = -Math.sin(2 * t) * 0.7;
  return new THREE.Vector3(dx, dy, dz);
}
