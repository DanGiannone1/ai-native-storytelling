import { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Background } from '@catalog';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, MeshTransmissionMaterial, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

interface AgenticLoopHeroSlideProps {
  active: boolean;
}

const LOOP_LABELS = [
  { label: 'Think', color: '#22d3ee', x: '20%', y: '58%' },
  { label: 'Act', color: '#a78bfa', x: '50%', y: '30%' },
  { label: 'Observe', color: '#34d399', x: '80%', y: '58%' },
  { label: 'Reflect', color: '#fbbf24', x: '50%', y: '84%' },
];

export const AgenticLoopHeroSlide = ({ active }: AgenticLoopHeroSlideProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);
  const [sceneReady, setSceneReady] = useState(false);

  useEffect(() => {
    if (!active || !containerRef.current || hasAnimated.current) return;
    hasAnimated.current = true;

    const container = containerRef.current;
    const kicker = container.querySelector('.slide-kicker');
    const title = container.querySelector('.slide-title');
    const subtitle = container.querySelector('.slide-subtitle');
    const labels = container.querySelectorAll('.loop-label');

    gsap.fromTo(kicker, { opacity: 0, y: -10 }, { opacity: 1, y: 0, duration: 0.6 });
    gsap.fromTo(title, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.9, delay: 0.2 });
    gsap.fromTo(subtitle, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.8, delay: 0.5 });
    gsap.fromTo(labels, { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.6, stagger: 0.1, delay: 0.8 });
  }, [active]);

  useEffect(() => {
    if (!active) hasAnimated.current = false;
  }, [active]);

  return (
    <div className={`slide ${active ? 'active' : ''}`}>
      <div ref={containerRef} className="relative flex flex-col items-center justify-center h-screen overflow-hidden">
        <Background variant="default" />

        <div className={`absolute inset-0 z-0 pointer-events-none transition-opacity duration-700 ${sceneReady ? 'opacity-100' : 'opacity-0'}`}>
          <AgenticLoopScene onReady={() => setSceneReady(true)} />
        </div>

        <div className="absolute top-12 left-0 right-0 z-10 flex flex-col items-center text-center px-8">
          <p className="slide-kicker text-cyan-300/70 mb-2">Agentic Loop</p>
          <h1 className="slide-title text-white mb-3">
            Think <span className="text-white/30">→</span> Act <span className="text-white/30">→</span> Observe <span className="text-white/30">→</span> Reflect
          </h1>
          <p className="slide-subtitle max-w-3xl text-white/50">
            A self-improving cycle that senses the world, takes action, learns, and repeats until the task is done.
          </p>
        </div>

        <div className="absolute inset-0 z-10 pointer-events-none">
          {LOOP_LABELS.map((label) => (
            <div
              key={label.label}
              className="loop-label absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: label.x, top: label.y }}
            >
              <div
                className="px-4 py-2 rounded-full text-sm font-semibold tracking-wide uppercase"
                style={{
                  color: label.color,
                  border: `1px solid ${label.color}55`,
                  background: `${label.color}14`,
                  boxShadow: `0 0 24px -8px ${label.color}`,
                }}
              >
                {label.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AgenticLoopHeroSlide;

interface AgenticLoopSceneProps {
  onReady?: () => void;
}

function AgenticLoopScene({ onReady }: AgenticLoopSceneProps) {
  return (
    <Canvas
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      camera={{ position: [0, 0.2, 8.5], fov: 40 }}
      onCreated={() => onReady?.()}
    >
      <color attach="background" args={['#02040a']} />
      <fog attach="fog" args={['#02040a', 6, 15]} />
      <ambientLight intensity={0.4} />
      <pointLight position={[4, 3, 6]} intensity={1.4} color="#22d3ee" />
      <pointLight position={[-5, -2, 7]} intensity={1.1} color="#a78bfa" />
      <spotLight position={[0, 8, 4]} intensity={0.8} angle={0.5} penumbra={0.7} color="#34d399" />
      <Suspense fallback={null}>
        <Environment preset="city" />
      </Suspense>
      <CameraDrift />
      <LoopSystem />
      <Sparkles count={140} size={1.2} speed={0.3} opacity={0.6} color="#22d3ee" scale={[10, 6, 6]} />
    </Canvas>
  );
}

function CameraDrift() {
  const { camera } = useThree();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    camera.position.x = Math.sin(t * 0.1) * 0.7;
    camera.position.y = 0.15 + Math.sin(t * 0.12) * 0.25;
    camera.position.z = 8.2 + Math.cos(t * 0.09) * 0.35;
    camera.lookAt(0, -0.25, 0);
  });

  return null;
}

function LoopSystem() {
  const groupRef = useRef<THREE.Group>(null);
  const glowMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uTime: { value: 0 },
        uColorA: { value: new THREE.Color('#22d3ee') },
        uColorB: { value: new THREE.Color('#a78bfa') },
        uColorC: { value: new THREE.Color('#34d399') },
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float uTime;
        uniform vec3 uColorA;
        uniform vec3 uColorB;
        uniform vec3 uColorC;
        varying vec2 vUv;
        void main() {
          float t = vUv.x;
          vec3 col = mix(uColorA, uColorB, smoothstep(0.0, 0.5, t));
          col = mix(col, uColorC, smoothstep(0.45, 1.0, t));
          float pulse = 0.65 + 0.35 * sin(uTime + t * 6.2831);
          gl_FragColor = vec4(col * pulse, 0.9);
        }
      `,
    });
  }, []);

  const curve = useMemo(() => {
    const points: THREE.Vector3[] = [];
    const segments = 360;
    for (let i = 0; i <= segments; i++) {
      const t = (i / segments) * Math.PI * 2;
      const x = Math.sin(t) * 3.4;
      const y = Math.sin(t) * Math.cos(t) * 1.7;
      const z = Math.cos(t * 2) * 0.45;
      points.push(new THREE.Vector3(x, y, z));
    }
    return new THREE.CatmullRomCurve3(points, true, 'catmullrom', 0.5);
  }, []);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime();
    glowMaterial.uniforms.uTime.value = t;
    groupRef.current.rotation.y = Math.sin(t * 0.12) * 0.18;
    groupRef.current.rotation.x = -0.2 + Math.cos(t * 0.08) * 0.06;
  });

  return (
    <group ref={groupRef} position={[0, -0.35, 0]}>
      <mesh>
        <tubeGeometry args={[curve, 360, 0.07, 32, true]} />
        <meshStandardMaterial color="#0ea5e9" emissive="#22d3ee" emissiveIntensity={0.6} roughness={0.15} metalness={0.5} />
      </mesh>
      <mesh>
        <tubeGeometry args={[curve, 360, 0.12, 24, true]} />
        <primitive object={glowMaterial} attach="material" />
      </mesh>
      <LoopNodes curve={curve} />
      <FlowParticles curve={curve} />
    </group>
  );
}

function LoopNodes({ curve }: { curve: THREE.CatmullRomCurve3 }) {
  const points = useMemo(() => [0.0, 0.25, 0.5, 0.75].map(t => curve.getPointAt(t)), [curve]);
  const colors = ['#22d3ee', '#a78bfa', '#34d399', '#fbbf24'];

  return (
    <group>
      {points.map((point, index) => (
        <mesh key={index} position={[point.x, point.y, point.z]}>
          <sphereGeometry args={[0.22, 32, 32]} />
          <MeshTransmissionMaterial
            thickness={0.3}
            roughness={0.05}
            transmission={1}
            chromaticAberration={0.03}
            anisotropy={0.6}
            distortion={0.2}
            distortionScale={0.3}
            color={colors[index]}
          />
        </mesh>
      ))}
    </group>
  );
}

function FlowParticles({ curve }: { curve: THREE.CatmullRomCurve3 }) {
  return (
    <>
      <FlowParticleBand curve={curve} color="#7dd3fc" count={34} size={0.08} speedMin={0.08} speedMax={0.14} offset={0} />
      <FlowParticleBand curve={curve} color="#a78bfa" count={22} size={0.06} speedMin={0.07} speedMax={0.12} offset={0.33} />
      <FlowParticleBand curve={curve} color="#34d399" count={18} size={0.055} speedMin={0.06} speedMax={0.11} offset={0.66} />
    </>
  );
}

interface FlowParticleBandProps {
  curve: THREE.CatmullRomCurve3;
  color: string;
  count: number;
  size: number;
  speedMin: number;
  speedMax: number;
  offset: number;
}

function FlowParticleBand({ curve, color, count, size, speedMin, speedMax, offset }: FlowParticleBandProps) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const offsets = useMemo(() => new Array(count).fill(0).map((_, i) => (i / count + offset) % 1), [count, offset]);
  const speeds = useMemo(() => new Array(count).fill(0).map(() => speedMin + Math.random() * (speedMax - speedMin)), [count, speedMin, speedMax]);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const time = clock.getElapsedTime();
    meshRef.current.frustumCulled = false;

    for (let i = 0; i < count; i++) {
      const t = (time * speeds[i] + offsets[i]) % 1;
      const point = curve.getPointAt(t);
      const pulse = 0.8 + Math.sin(time * 2 + i) * 0.25;
      dummy.position.set(point.x, point.y, point.z);
      dummy.scale.setScalar(size * pulse);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[size, 12, 12]} />
      <meshBasicMaterial color={color} toneMapped={false} />
    </instancedMesh>
  );
}
