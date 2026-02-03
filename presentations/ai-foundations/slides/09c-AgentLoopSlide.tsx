import { useRef, useEffect, useMemo } from 'react';
import { gsap } from 'gsap';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

interface AgentLoopSlideProps {
  active: boolean;
}

// The four phases of the agent loop
const PHASES = [
  { label: 'Think', color: '#22d3ee', angle: -Math.PI / 2 },      // Top
  { label: 'Act', color: '#a78bfa', angle: 0 },                    // Right
  { label: 'Observe', color: '#34d399', angle: Math.PI / 2 },      // Bottom
  { label: 'Reflect', color: '#fbbf24', angle: Math.PI },          // Left
];

export const AgentLoopSlide = ({ active }: AgentLoopSlideProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!active) {
      hasAnimated.current = false;
      return;
    }
  }, [active]);

  useEffect(() => {
    if (!active || !containerRef.current || hasAnimated.current) return;
    hasAnimated.current = true;

    const container = containerRef.current;

    // Animate kicker
    const kicker = container.querySelector('.kicker');
    if (kicker) {
      gsap.fromTo(kicker,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
      );
    }

    // Animate title characters with wave assembly
    const titleChars = container.querySelectorAll('.title-char');
    titleChars.forEach((char, i) => {
      gsap.fromTo(char,
        {
          opacity: 0,
          y: 40,
          scale: 0.5,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          delay: 0.3 + i * 0.04,
          ease: 'back.out(1.7)',
        }
      );
    });

    // Start continuous wave after initial animation
    setTimeout(() => {
      const animate = () => {
        if (!container.isConnected) return;
        titleChars.forEach((char, i) => {
          const el = char as HTMLElement;
          el.style.transform = `translateY(${Math.sin(Date.now() * 0.003 + i * 0.4) * 3}px)`;
        });
        if (active) requestAnimationFrame(animate);
      };
      animate();
    }, 1500);

    // Animate equation pieces
    const eqParts = container.querySelectorAll('.eq-part');
    gsap.fromTo(eqParts,
      { opacity: 0, scale: 0.8, y: 20 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.15,
        delay: 1.2,
        ease: 'back.out(1.4)'
      }
    );

    // Animate the result with special treatment
    const result = container.querySelector('.eq-result');
    if (result) {
      gsap.fromTo(result,
        { opacity: 0, scale: 0, rotation: -180 },
        {
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: 0.8,
          delay: 2.0,
          ease: 'elastic.out(1, 0.5)'
        }
      );
    }

    // Animate footer
    const footer = container.querySelector('.footer');
    if (footer) {
      gsap.fromTo(footer,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, delay: 2.5, ease: 'power2.out' }
      );
    }
  }, [active]);

  const titleText = "Think → Act → Observe → Reflect";

  return (
    <div className={`slide ${active ? 'active' : ''}`}>
      <div ref={containerRef} className="relative h-screen w-screen overflow-hidden">

        {/* 3D Background */}
        <div className="absolute inset-0">
          <Canvas
            dpr={[1, 2]}
            gl={{ antialias: true, alpha: true }}
            camera={{ position: [0, 0, 10], fov: 45 }}
          >
            <color attach="background" args={['#050510']} />
            <fog attach="fog" args={['#050510', 8, 20]} />

            <ambientLight intensity={0.3} />
            <pointLight position={[5, 5, 5]} intensity={1} color="#22d3ee" />
            <pointLight position={[-5, -5, 5]} intensity={0.8} color="#a78bfa" />

            <AgentLoopScene active={active} />
          </Canvas>
        </div>

        {/* Content Layer */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none">

          {/* Kicker */}
          <p className="kicker text-[11px] tracking-[0.4em] uppercase text-white/40 mb-4">
            The Agentic Loop
          </p>

          {/* Main Title with Elastic Characters */}
          <h1 className="text-[3.5vw] font-bold tracking-tight mb-8" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
            {titleText.split('').map((char, i) => {
              // Color the phase words
              const isThink = i >= 0 && i < 5;
              const isAct = i >= 8 && i < 11;
              const isObserve = i >= 14 && i < 21;
              const isReflect = i >= 24 && i < 31;
              const isArrow = char === '→';

              let color = 'rgba(255,255,255,0.9)';
              if (isThink) color = '#22d3ee';
              if (isAct) color = '#a78bfa';
              if (isObserve) color = '#34d399';
              if (isReflect) color = '#fbbf24';
              if (isArrow) color = 'rgba(255,255,255,0.2)';

              return (
                <span
                  key={i}
                  className="title-char inline-block"
                  style={{
                    color,
                    textShadow: isArrow ? 'none' : `0 0 30px ${color}40`,
                  }}
                >
                  {char === ' ' ? '\u00A0' : char}
                </span>
              );
            })}
          </h1>

          {/* Equation: LLM + Tools + Loop = Agent */}
          <div className="flex items-center gap-4 mb-6">
            <div className="eq-part flex items-center gap-2 px-4 py-2 rounded-xl bg-violet-500/10 border border-violet-500/30">
              <div className="w-6 h-6 rounded-lg bg-violet-500/20 flex items-center justify-center">
                <svg className="w-4 h-4 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
                </svg>
              </div>
              <span className="text-violet-300 font-medium">LLM</span>
            </div>

            <span className="eq-part text-white/20 text-2xl">+</span>

            <div className="eq-part flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30">
              <div className="w-6 h-6 rounded-lg bg-cyan-500/20 flex items-center justify-center">
                <svg className="w-4 h-4 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
                </svg>
              </div>
              <span className="text-cyan-300 font-medium">Tools</span>
            </div>

            <span className="eq-part text-white/20 text-2xl">+</span>

            <div className="eq-part flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30">
              <div className="w-6 h-6 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                </svg>
              </div>
              <span className="text-emerald-300 font-medium">Loop</span>
            </div>

            <span className="eq-part text-white/20 text-2xl">=</span>

            <div className="eq-result flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/40">
              <svg className="w-5 h-5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
              </svg>
              <span className="text-amber-300 font-semibold text-lg">Agent</span>
            </div>
          </div>

          {/* Footer */}
          <p className="footer text-white/40 text-sm mt-4">
            A cycle that runs <span className="text-white/60">until the task is complete</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AgentLoopSlide;

// =============================================================================
// 3D SCENE
// =============================================================================

function AgentLoopScene({ active }: { active: boolean }) {
  return (
    <group>
      <CameraController active={active} />
      <OrbitRing active={active} />
      <PhaseNodes active={active} />
      <FlowingParticles active={active} />
      <Sparkles count={100} scale={15} size={1.5} speed={0.3} opacity={0.4} color="#22d3ee" />
    </group>
  );
}

function CameraController({ active }: { active: boolean }) {
  const { camera } = useThree();

  useFrame(({ clock }) => {
    if (!active) return;
    const t = clock.getElapsedTime();

    camera.position.x = Math.sin(t * 0.1) * 0.5;
    camera.position.y = Math.cos(t * 0.08) * 0.3;
    camera.position.z = 10 + Math.sin(t * 0.05) * 0.5;
    camera.lookAt(0, 0, 0);
  });

  return null;
}

function OrbitRing({ active }: { active: boolean }) {
  const ringRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!active) return;
    const t = clock.getElapsedTime();

    if (ringRef.current) {
      ringRef.current.rotation.x = Math.PI / 2 + Math.sin(t * 0.2) * 0.1;
      ringRef.current.rotation.z = t * 0.05;
    }
    if (glowRef.current) {
      glowRef.current.rotation.x = Math.PI / 2 + Math.sin(t * 0.2) * 0.1;
      glowRef.current.rotation.z = t * 0.05;
    }
  });

  return (
    <group>
      {/* Main ring */}
      <mesh ref={ringRef}>
        <torusGeometry args={[3.5, 0.03, 16, 100]} />
        <meshStandardMaterial
          color="#22d3ee"
          emissive="#22d3ee"
          emissiveIntensity={0.5}
          transparent
          opacity={0.8}
        />
      </mesh>
      {/* Glow ring */}
      <mesh ref={glowRef}>
        <torusGeometry args={[3.5, 0.15, 16, 100]} />
        <meshBasicMaterial
          color="#22d3ee"
          transparent
          opacity={0.1}
        />
      </mesh>
    </group>
  );
}

function PhaseNodes({ active }: { active: boolean }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!active || !groupRef.current) return;
    const t = clock.getElapsedTime();
    groupRef.current.rotation.x = Math.PI / 2 + Math.sin(t * 0.2) * 0.1;
    groupRef.current.rotation.z = t * 0.05;
  });

  return (
    <group ref={groupRef}>
      {PHASES.map((phase, i) => (
        <PhaseNode key={phase.label} phase={phase} index={i} active={active} />
      ))}
    </group>
  );
}

function PhaseNode({ phase, index, active }: { phase: typeof PHASES[0]; index: number; active: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  const position = useMemo(() => {
    const radius = 3.5;
    return new THREE.Vector3(
      Math.cos(phase.angle) * radius,
      Math.sin(phase.angle) * radius,
      0
    );
  }, [phase.angle]);

  useFrame(({ clock }) => {
    if (!active || !meshRef.current) return;
    const t = clock.getElapsedTime();

    // Pulse effect - each node pulses at different times
    const pulsePhase = t * 2 + index * (Math.PI / 2);
    const pulse = 0.8 + Math.sin(pulsePhase) * 0.2;

    meshRef.current.scale.setScalar(pulse);

    if (glowRef.current) {
      glowRef.current.scale.setScalar(pulse * 1.5);
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.3}>
      <group position={position}>
        {/* Glow sphere */}
        <mesh ref={glowRef}>
          <sphereGeometry args={[0.4, 16, 16]} />
          <meshBasicMaterial
            color={phase.color}
            transparent
            opacity={0.2}
          />
        </mesh>
        {/* Core sphere */}
        <mesh ref={meshRef}>
          <sphereGeometry args={[0.25, 32, 32]} />
          <meshStandardMaterial
            color={phase.color}
            emissive={phase.color}
            emissiveIntensity={0.8}
            roughness={0.2}
            metalness={0.5}
          />
        </mesh>
      </group>
    </Float>
  );
}

function FlowingParticles({ active }: { active: boolean }) {
  const count = 20;
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  // Each particle has an offset and speed
  const particles = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      offset: i / count,
      speed: 0.15 + Math.random() * 0.1,
      size: 0.03 + Math.random() * 0.03,
    }));
  }, [count]);

  useFrame(({ clock }) => {
    if (!active || !meshRef.current) return;
    const t = clock.getElapsedTime();
    const radius = 3.5;

    particles.forEach((particle, i) => {
      const angle = (t * particle.speed + particle.offset) * Math.PI * 2;

      dummy.position.set(
        Math.cos(angle) * radius,
        Math.sin(angle) * radius,
        0
      );
      dummy.scale.setScalar(particle.size * 30);
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;

    // Rotate with the ring
    meshRef.current.rotation.x = Math.PI / 2 + Math.sin(t * 0.2) * 0.1;
    meshRef.current.rotation.z = t * 0.05;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[0.03, 8, 8]} />
      <meshBasicMaterial color="#ffffff" transparent opacity={0.8} />
    </instancedMesh>
  );
}
