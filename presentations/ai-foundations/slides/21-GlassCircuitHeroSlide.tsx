import { useEffect, useMemo, useRef } from 'react';
import { gsap } from 'gsap';
import { Background } from '@catalog';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, MeshTransmissionMaterial, Sparkles } from '@react-three/drei';
import { EffectComposer, Bloom, ChromaticAberration, Noise, Vignette } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import * as THREE from 'three';

interface GlassCircuitHeroSlideProps {
  active: boolean;
}

export const GlassCircuitHeroSlide = ({ active }: GlassCircuitHeroSlideProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!active || !containerRef.current || hasAnimated.current) return;
    hasAnimated.current = true;

    const container = containerRef.current;
    const kicker = container.querySelector('.slide-kicker');
    const title = container.querySelector('.slide-title');
    const subtitle = container.querySelector('.slide-subtitle');
    const callout = container.querySelector('.slide-callout');

    gsap.fromTo(kicker, { opacity: 0, x: -12 }, { opacity: 1, x: 0, duration: 0.5 });
    gsap.fromTo(title, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.8, delay: 0.2 });
    gsap.fromTo(subtitle, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.8, delay: 0.45 });
    gsap.fromTo(callout, { opacity: 0 }, { opacity: 1, duration: 0.8, delay: 0.9 });
  }, [active]);

  useEffect(() => {
    if (!active) hasAnimated.current = false;
  }, [active]);

  return (
    <div className={`slide ${active ? 'active' : ''}`}>
      <div ref={containerRef} className="relative flex flex-col items-center justify-center h-screen overflow-hidden">
        <Background variant="grid" />
        <div className="absolute inset-0 z-0 pointer-events-none">
          <GlassCircuitScene />
        </div>

        <HudFrame />

        <div className="absolute top-10 left-12 z-10 text-left">
          <p className="slide-kicker text-cyan-300/70 mb-2 tracking-[0.28em] uppercase text-[11px]">
            System // Agentic Loop
          </p>
          <h1 className="slide-title text-white text-5xl font-semibold mb-3">
            Glass Circuit
          </h1>
          <p className="slide-subtitle text-white/50 max-w-md">
            A closed-loop intelligence pipeline: sensing, acting, learning — always in motion.
          </p>
        </div>

        <div className="slide-callout absolute bottom-12 right-12 z-10 text-right">
          <p className="text-[11px] tracking-[0.32em] uppercase text-white/40">Live Flow</p>
          <p className="text-white/70 text-sm">Optical-grade data transport</p>
        </div>
      </div>
    </div>
  );
};

export default GlassCircuitHeroSlide;

function HudFrame() {
  return (
    <div className="absolute inset-8 z-10 pointer-events-none">
      <div className="absolute inset-0 rounded-3xl border border-cyan-400/10" />
      <div className="absolute -top-1 left-10 h-[2px] w-20 bg-cyan-400/50" />
      <div className="absolute -top-1 right-10 h-[2px] w-20 bg-emerald-400/40" />
      <div className="absolute -bottom-1 left-16 h-[2px] w-16 bg-violet-400/40" />
      <div className="absolute -bottom-1 right-16 h-[2px] w-16 bg-cyan-400/50" />
      <div className="absolute top-10 -left-1 h-20 w-[2px] bg-cyan-400/35" />
      <div className="absolute bottom-10 -left-1 h-16 w-[2px] bg-emerald-400/35" />
      <div className="absolute top-12 -right-1 h-16 w-[2px] bg-cyan-400/35" />
      <div className="absolute bottom-12 -right-1 h-20 w-[2px] bg-violet-400/35" />
    </div>
  );
}

function GlassCircuitScene() {
  return (
    <Canvas
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      camera={{ position: [0, 0.4, 8.5], fov: 42 }}
    >
      <color attach="background" args={['#02040a']} />
      <fog attach="fog" args={['#02040a', 7, 16]} />
      <ambientLight intensity={0.35} />
      <pointLight position={[5, 3, 6]} intensity={1.4} color="#22d3ee" />
      <pointLight position={[-4, -2, 7]} intensity={1.2} color="#a78bfa" />
      <spotLight position={[0, 7, 4]} intensity={0.6} angle={0.5} penumbra={0.6} color="#34d399" />
      <Environment preset="city" />
      <CircuitLoop />
      <Sparkles count={120} size={1.1} speed={0.25} opacity={0.5} color="#22d3ee" scale={[10, 6, 6]} />
      <EffectComposer>
        <Bloom intensity={0.9} luminanceThreshold={0.1} luminanceSmoothing={0.8} />
        <ChromaticAberration offset={[0.0006, 0.0012]} blendFunction={BlendFunction.SCREEN} />
        <Noise opacity={0.03} />
        <Vignette eskil={false} offset={0.2} darkness={0.7} />
      </EffectComposer>
    </Canvas>
  );
}

function CircuitLoop() {
  const groupRef = useRef<THREE.Group>(null);
  const curve = useMemo(() => createInfinityCurve(3.35, 1.65, 0.35, 320), []);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime();
    groupRef.current.rotation.y = Math.sin(t * 0.1) * 0.18;
    groupRef.current.rotation.x = -0.18 + Math.cos(t * 0.08) * 0.05;
  });

  return (
    <group ref={groupRef} position={[0, -0.2, 0]}>
      <mesh>
        <tubeGeometry args={[curve, 320, 0.14, 32, true]} />
        <MeshTransmissionMaterial
          thickness={0.55}
          roughness={0.05}
          transmission={1}
          chromaticAberration={0.02}
          anisotropy={0.6}
          distortion={0.25}
          distortionScale={0.2}
          color="#7dd3fc"
        />
      </mesh>
      <mesh>
        <tubeGeometry args={[curve, 320, 0.045, 24, true]} />
        <meshStandardMaterial color="#22d3ee" emissive="#22d3ee" emissiveIntensity={0.9} roughness={0.15} metalness={0.4} />
      </mesh>
      <FlowPulseBand curve={curve} color="#a78bfa" count={22} size={0.08} speedMin={0.08} speedMax={0.14} />
    </group>
  );
}

interface PulseBandProps {
  curve: THREE.CatmullRomCurve3;
  color: string;
  count: number;
  size: number;
  speedMin: number;
  speedMax: number;
}

function FlowPulseBand({ curve, color, count, size, speedMin, speedMax }: PulseBandProps) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const offsets = useMemo(() => new Array(count).fill(0).map((_, i) => i / count), [count]);
  const speeds = useMemo(() => new Array(count).fill(0).map(() => speedMin + Math.random() * (speedMax - speedMin)), [count, speedMin, speedMax]);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const time = clock.getElapsedTime();
    meshRef.current.frustumCulled = false;

    for (let i = 0; i < count; i++) {
      const t = (time * speeds[i] + offsets[i]) % 1;
      const point = curve.getPointAt(t);
      const pulse = 0.85 + Math.sin(time * 3 + i) * 0.25;
      dummy.position.set(point.x, point.y, point.z);
      dummy.scale.setScalar(size * pulse);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[size, 16, 16]} />
      <meshBasicMaterial color={color} toneMapped={false} />
    </instancedMesh>
  );
}

function createInfinityCurve(width: number, height: number, depth: number, segments: number) {
  const points: THREE.Vector3[] = [];
  for (let i = 0; i <= segments; i++) {
    const t = (i / segments) * Math.PI * 2;
    const x = Math.sin(t) * width;
    const y = Math.sin(t) * Math.cos(t) * height;
    const z = Math.cos(t * 2) * depth;
    points.push(new THREE.Vector3(x, y, z));
  }
  return new THREE.CatmullRomCurve3(points, true, 'catmullrom', 0.5);
}
