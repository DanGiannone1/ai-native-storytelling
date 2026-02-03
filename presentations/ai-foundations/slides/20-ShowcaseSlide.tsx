import { useRef, useEffect, useMemo, useState } from 'react';
import { gsap } from 'gsap';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import {
  EffectComposer,
  Bloom,
  ChromaticAberration,
  Vignette,
} from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import { Float, Sparkles, Stars } from '@react-three/drei';
import * as THREE from 'three';

interface ShowcaseSlideProps {
  active: boolean;
}

// ============================================================================
// MAIN SLIDE COMPONENT
// ============================================================================

export const ShowcaseSlide = ({ active }: ShowcaseSlideProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);
  const [showTypography, setShowTypography] = useState(false);

  useEffect(() => {
    if (!active) {
      hasAnimated.current = false;
      setShowTypography(false);
      return;
    }

    // Delay typography entrance for dramatic effect
    const timer = setTimeout(() => setShowTypography(true), 800);
    return () => clearTimeout(timer);
  }, [active]);

  useEffect(() => {
    if (!active || !containerRef.current || hasAnimated.current || !showTypography) return;
    hasAnimated.current = true;

    const container = containerRef.current;

    // Animate the kicker
    const kicker = container.querySelector('.showcase-kicker');
    if (kicker) {
      gsap.fromTo(kicker,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
      );
    }

    // Animate each character of the main title with magnetic assembly
    const titleChars = container.querySelectorAll('.title-char');
    titleChars.forEach((char, i) => {
      const randomX = (Math.random() - 0.5) * 400;
      const randomY = (Math.random() - 0.5) * 300;
      const randomRotation = (Math.random() - 0.5) * 180;

      gsap.fromTo(char,
        {
          opacity: 0,
          x: randomX,
          y: randomY,
          rotation: randomRotation,
          scale: 0,
          filter: 'blur(20px)'
        },
        {
          opacity: 1,
          x: 0,
          y: 0,
          rotation: 0,
          scale: 1,
          filter: 'blur(0px)',
          duration: 1.2,
          delay: 0.3 + i * 0.06,
          ease: 'elastic.out(1, 0.5)'
        }
      );
    });

    // Start wave animation after assembly
    setTimeout(() => {
      const waveAnimation = () => {
        titleChars.forEach((char, i) => {
          gsap.to(char, {
            y: Math.sin(Date.now() * 0.002 + i * 0.5) * 8,
            duration: 0.1,
            ease: 'none',
          });
        });
        if (active) requestAnimationFrame(waveAnimation);
      };
      waveAnimation();
    }, 2000);

    // Animate subtitle with stagger
    const subtitleWords = container.querySelectorAll('.subtitle-word');
    gsap.fromTo(subtitleWords,
      { opacity: 0, y: 30, scale: 0.8 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.1,
        delay: 1.8,
        ease: 'back.out(1.7)'
      }
    );

    // Animate the elastic badge
    const badge = container.querySelector('.elastic-badge');
    if (badge) {
      gsap.fromTo(badge,
        { opacity: 0, scale: 0, rotation: -180 },
        {
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: 1.5,
          delay: 2.5,
          ease: 'elastic.out(1, 0.3)'
        }
      );

      // Breathing animation for the badge
      gsap.to(badge, {
        scale: 1.05,
        duration: 2,
        delay: 4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });
    }

    // Footer
    const footer = container.querySelector('.showcase-footer');
    if (footer) {
      gsap.fromTo(footer,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, delay: 3, ease: 'power2.out' }
      );
    }
  }, [active, showTypography]);

  const titleText = "THE HORIZON";
  const subtitleWords = ["Where", "imagination", "meets", "execution"];

  return (
    <div className={`slide ${active ? 'active' : ''}`}>
      <div ref={containerRef} className="relative h-screen w-screen overflow-hidden">

        {/* SVG Filters for liquid effect */}
        <svg className="absolute w-0 h-0">
          <defs>
            <filter id="liquid">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.015"
                numOctaves="2"
                result="noise"
              >
                <animate
                  attributeName="baseFrequency"
                  dur="30s"
                  values="0.015;0.02;0.015"
                  repeatCount="indefinite"
                />
              </feTurbulence>
              <feDisplacementMap
                in="SourceGraphic"
                in2="noise"
                scale="8"
                xChannelSelector="R"
                yChannelSelector="G"
              />
            </filter>

            <filter id="glow">
              <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>

            <linearGradient id="textGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#22d3ee">
                <animate attributeName="stop-color" values="#22d3ee;#a78bfa;#34d399;#22d3ee" dur="8s" repeatCount="indefinite"/>
              </stop>
              <stop offset="50%" stopColor="#a78bfa">
                <animate attributeName="stop-color" values="#a78bfa;#34d399;#22d3ee;#a78bfa" dur="8s" repeatCount="indefinite"/>
              </stop>
              <stop offset="100%" stopColor="#34d399">
                <animate attributeName="stop-color" values="#34d399;#22d3ee;#a78bfa;#34d399" dur="8s" repeatCount="indefinite"/>
              </stop>
            </linearGradient>
          </defs>
        </svg>

        {/* 3D Canvas - Full Background */}
        <div className="absolute inset-0">
          <Canvas
            dpr={[1, 2]}
            gl={{
              antialias: true,
              alpha: true,
              powerPreference: 'high-performance',
            }}
            camera={{ position: [0, 0, 12], fov: 50 }}
          >
            <color attach="background" args={['#050510']} />

            {/* Lighting */}
            <ambientLight intensity={0.2} />
            <pointLight position={[10, 10, 10]} intensity={1.5} color="#22d3ee" />
            <pointLight position={[-10, -10, 5]} intensity={1} color="#a78bfa" />
            <pointLight position={[0, -10, -10]} intensity={0.8} color="#34d399" />
            <spotLight
              position={[0, 20, 0]}
              angle={0.3}
              penumbra={1}
              intensity={2}
              color="#ffffff"
            />

            {/* Main Scene */}
            <ShowcaseScene active={active} />

            {/* Post Processing */}
            <EffectComposer>
              <Bloom
                intensity={1.5}
                luminanceThreshold={0.2}
                luminanceSmoothing={0.9}
                blendFunction={BlendFunction.ADD}
              />
              <ChromaticAberration
                offset={[0.002, 0.002] as [number, number]}
                blendFunction={BlendFunction.NORMAL}
              />
              <Vignette darkness={0.5} offset={0.3} />
            </EffectComposer>
          </Canvas>
        </div>

        {/* Overlay gradient for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none" />

        {/* Typography Layer */}
        {showTypography && (
          <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none">

            {/* Kicker */}
            <p className="showcase-kicker text-[10px] tracking-[0.5em] uppercase text-white/30 mb-6">
              Techniques Showcase
            </p>

            {/* Main Title - Magnetic Assembly + Wave */}
            <h1
              className="text-[8vw] font-bold tracking-tight leading-none mb-6"
              style={{
                fontFamily: '"Space Grotesk", sans-serif',
                filter: 'url(#glow)',
              }}
            >
              {titleText.split('').map((char, i) => (
                <span
                  key={i}
                  className="title-char inline-block"
                  style={{
                    background: 'linear-gradient(135deg, #22d3ee 0%, #a78bfa 50%, #34d399 100%)',
                    backgroundSize: '200% 200%',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    animation: char !== ' ' ? 'gradientShift 6s ease infinite' : 'none',
                    animationDelay: `${i * 0.1}s`,
                    textShadow: '0 0 80px rgba(34, 211, 238, 0.5)',
                  }}
                >
                  {char === ' ' ? '\u00A0' : char}
                </span>
              ))}
            </h1>

            {/* Subtitle - Word by Word */}
            <div
              className="flex gap-4 mb-10"
              style={{ filter: 'url(#liquid)' }}
            >
              {subtitleWords.map((word, i) => (
                <span
                  key={i}
                  className="subtitle-word text-2xl font-light"
                  style={{
                    fontFamily: '"Sora", sans-serif',
                    color: i === 1 || i === 3 ? '#a78bfa' : 'rgba(255,255,255,0.6)',
                  }}
                >
                  {word}
                </span>
              ))}
            </div>

            {/* Elastic Badge */}
            <div
              className="elastic-badge relative px-8 py-4 rounded-full border border-white/20 backdrop-blur-md"
              style={{
                background: 'linear-gradient(135deg, rgba(34,211,238,0.1) 0%, rgba(167,139,250,0.1) 50%, rgba(52,211,153,0.1) 100%)',
                boxShadow: '0 0 60px rgba(167, 139, 250, 0.3), inset 0 0 30px rgba(255,255,255,0.05)',
              }}
            >
              <div className="absolute inset-0 rounded-full overflow-hidden">
                <div
                  className="absolute inset-0"
                  style={{
                    background: 'conic-gradient(from 0deg, transparent, rgba(34,211,238,0.3), transparent, rgba(167,139,250,0.3), transparent)',
                    animation: 'spin 8s linear infinite',
                  }}
                />
              </div>
              <span className="relative text-lg tracking-widest uppercase text-white/80">
                ✦ 3D · Motion · Elastic Type ✦
              </span>
            </div>

            {/* Footer */}
            <p className="showcase-footer absolute bottom-12 text-sm text-white/30">
              React Three Fiber · GSAP · Framer Motion · Post-Processing
            </p>
          </div>
        )}

        {/* Animated corner accents */}
        <div className="absolute top-8 left-8 w-24 h-24 pointer-events-none">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <path
              d="M 0 30 L 0 0 L 30 0"
              fill="none"
              stroke="url(#textGradient)"
              strokeWidth="1"
              className="opacity-40"
            />
          </svg>
        </div>
        <div className="absolute bottom-8 right-8 w-24 h-24 pointer-events-none rotate-180">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <path
              d="M 0 30 L 0 0 L 30 0"
              fill="none"
              stroke="url(#textGradient)"
              strokeWidth="1"
              className="opacity-40"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default ShowcaseSlide;

// ============================================================================
// 3D SCENE COMPONENTS
// ============================================================================

function ShowcaseScene({ active }: { active: boolean }) {
  return (
    <group>
      {/* Starfield background */}
      <Stars
        radius={100}
        depth={50}
        count={5000}
        factor={4}
        saturation={0}
        fade
        speed={1}
      />

      {/* Ambient particles */}
      <Sparkles
        count={200}
        scale={20}
        size={2}
        speed={0.5}
        opacity={0.5}
        color="#22d3ee"
      />
      <Sparkles
        count={150}
        scale={15}
        size={3}
        speed={0.3}
        opacity={0.3}
        color="#a78bfa"
      />

      {/* Camera controller */}
      <CameraRig active={active} />

      {/* Central composition */}
      <CentralGeometry active={active} />

      {/* Orbiting satellites */}
      <OrbitingNodes active={active} />

      {/* Energy rings */}
      <EnergyRings active={active} />

      {/* Particle streams */}
      <ParticleStreams active={active} />
    </group>
  );
}

function CameraRig({ active }: { active: boolean }) {
  const { camera } = useThree();
  const time = useRef(0);

  useFrame((_, delta) => {
    if (!active) return;
    time.current += delta;

    // Smooth orbital camera movement
    const t = time.current * 0.15;
    camera.position.x = Math.sin(t) * 3;
    camera.position.y = Math.cos(t * 0.7) * 2 + 1;
    camera.position.z = 12 + Math.sin(t * 0.5) * 2;
    camera.lookAt(0, 0, 0);
  });

  return null;
}

function CentralGeometry({ active }: { active: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const innerRef = useRef<THREE.Mesh>(null);
  const outerRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!groupRef.current || !active) return;
    const t = clock.getElapsedTime();

    // Rotate the group
    groupRef.current.rotation.y = t * 0.2;
    groupRef.current.rotation.x = Math.sin(t * 0.3) * 0.2;

    // Pulse the inner geometry
    if (innerRef.current) {
      const scale = 1 + Math.sin(t * 2) * 0.05;
      innerRef.current.scale.setScalar(scale);
    }

    // Counter-rotate outer wireframe
    if (outerRef.current) {
      outerRef.current.rotation.y = -t * 0.5;
      outerRef.current.rotation.z = t * 0.3;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Inner glowing core */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <mesh ref={innerRef}>
          <icosahedronGeometry args={[1.5, 1]} />
          <meshStandardMaterial
            color="#22d3ee"
            emissive="#22d3ee"
            emissiveIntensity={0.8}
            roughness={0.2}
            metalness={0.8}
          />
        </mesh>
      </Float>

      {/* Outer wireframe */}
      <mesh ref={outerRef}>
        <icosahedronGeometry args={[2.2, 1]} />
        <meshBasicMaterial
          color="#a78bfa"
          wireframe
          transparent
          opacity={0.4}
        />
      </mesh>

      {/* Second outer wireframe */}
      <mesh rotation={[Math.PI / 4, 0, Math.PI / 4]}>
        <octahedronGeometry args={[2.8, 0]} />
        <meshBasicMaterial
          color="#34d399"
          wireframe
          transparent
          opacity={0.2}
        />
      </mesh>

      {/* Core glow sphere */}
      <mesh>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshBasicMaterial
          color="#ffffff"
          transparent
          opacity={0.8}
        />
      </mesh>
    </group>
  );
}

interface OrbitNode {
  angle: number;
  radius: number;
  speed: number;
  size: number;
  color: string;
  yOffset: number;
}

function OrbitingNodes({ active }: { active: boolean }) {
  const nodes: OrbitNode[] = useMemo(() => [
    { angle: 0, radius: 4, speed: 0.5, size: 0.15, color: '#22d3ee', yOffset: 0 },
    { angle: Math.PI * 0.5, radius: 4.5, speed: 0.4, size: 0.12, color: '#a78bfa', yOffset: 0.5 },
    { angle: Math.PI, radius: 3.5, speed: 0.6, size: 0.18, color: '#34d399', yOffset: -0.3 },
    { angle: Math.PI * 1.5, radius: 5, speed: 0.35, size: 0.1, color: '#fbbf24', yOffset: 0.8 },
    { angle: Math.PI * 0.25, radius: 5.5, speed: 0.45, size: 0.14, color: '#fb7185', yOffset: -0.6 },
    { angle: Math.PI * 0.75, radius: 3.8, speed: 0.55, size: 0.11, color: '#22d3ee', yOffset: 0.2 },
  ], []);

  return (
    <group>
      {nodes.map((node, i) => (
        <OrbitingNode key={i} {...node} active={active} />
      ))}
    </group>
  );
}

function OrbitingNode({ angle, radius, speed, size, color, yOffset, active }: OrbitNode & { active: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const initialAngle = useRef(angle);

  useFrame(({ clock }) => {
    if (!meshRef.current || !active) return;
    const t = clock.getElapsedTime();
    const currentAngle = initialAngle.current + t * speed;

    const x = Math.cos(currentAngle) * radius;
    const z = Math.sin(currentAngle) * radius;
    const y = yOffset + Math.sin(t * 2 + angle) * 0.3;

    meshRef.current.position.set(x, y, z);
    if (glowRef.current) {
      glowRef.current.position.set(x, y, z);
    }
  });

  return (
    <group>
      {/* Glow sphere */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[size * 2.5, 16, 16]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.15}
        />
      </mesh>
      {/* Core sphere */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[size, 16, 16]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={2}
        />
      </mesh>
    </group>
  );
}

function EnergyRings({ active }: { active: boolean }) {
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const ring3Ref = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!active) return;
    const t = clock.getElapsedTime();

    if (ring1Ref.current) {
      ring1Ref.current.rotation.x = t * 0.5;
      ring1Ref.current.rotation.y = t * 0.3;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.x = -t * 0.4;
      ring2Ref.current.rotation.z = t * 0.2;
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.y = t * 0.6;
      ring3Ref.current.rotation.z = -t * 0.3;
    }
  });

  return (
    <group>
      <mesh ref={ring1Ref}>
        <torusGeometry args={[3.5, 0.02, 16, 100]} />
        <meshBasicMaterial color="#22d3ee" transparent opacity={0.6} />
      </mesh>
      <mesh ref={ring2Ref}>
        <torusGeometry args={[4, 0.015, 16, 100]} />
        <meshBasicMaterial color="#a78bfa" transparent opacity={0.4} />
      </mesh>
      <mesh ref={ring3Ref}>
        <torusGeometry args={[4.5, 0.01, 16, 100]} />
        <meshBasicMaterial color="#34d399" transparent opacity={0.3} />
      </mesh>
    </group>
  );
}

function ParticleStreams({ active }: { active: boolean }) {
  const count = 100;
  const pointsRef = useRef<THREE.Points>(null);
  const geometryRef = useRef<THREE.BufferGeometry>(null);

  // Initialize positions
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      const r = 6 + Math.random() * 4;

      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    return pos;
  }, []);

  // Set up geometry on mount
  useEffect(() => {
    if (geometryRef.current) {
      geometryRef.current.setAttribute(
        'position',
        new THREE.BufferAttribute(positions, 3)
      );
    }
  }, [positions]);

  useFrame(({ clock }) => {
    if (!geometryRef.current || !active) return;
    const t = clock.getElapsedTime();

    const posAttr = geometryRef.current.attributes.position;
    if (!posAttr) return;

    const posArray = posAttr.array as Float32Array;
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      // Slowly spiral inward
      const x = posArray[i3];
      const y = posArray[i3 + 1];
      const z = posArray[i3 + 2];

      const dist = Math.sqrt(x * x + y * y + z * z);
      const angle = Math.atan2(y, x) + 0.002;

      posArray[i3] = Math.cos(angle) * dist * 0.999;
      posArray[i3 + 1] = Math.sin(angle) * dist * 0.999;
      posArray[i3 + 2] = z + Math.sin(t + i) * 0.01;

      // Reset if too close to center
      if (dist < 2) {
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.random() * Math.PI;
        const r = 8 + Math.random() * 2;
        posArray[i3] = r * Math.sin(phi) * Math.cos(theta);
        posArray[i3 + 1] = r * Math.sin(phi) * Math.sin(theta);
        posArray[i3 + 2] = r * Math.cos(phi);
      }
    }
    posAttr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry ref={geometryRef} />
      <pointsMaterial
        size={0.08}
        color="#ffffff"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}
