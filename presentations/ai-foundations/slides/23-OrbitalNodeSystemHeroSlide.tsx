import { useEffect, useMemo, useRef } from 'react'
import { gsap } from 'gsap'
import { Background } from '@catalog'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, Sparkles } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import * as THREE from 'three'

interface OrbitalNodeSystemHeroSlideProps {
  active: boolean
}

const NODE_LABELS = [
  { label: 'Think', color: '#22d3ee', x: '20%', y: '66%' },
  { label: 'Act', color: '#a78bfa', x: '50%', y: '24%' },
  { label: 'Observe', color: '#34d399', x: '80%', y: '66%' },
  { label: 'Reflect', color: '#fbbf24', x: '50%', y: '88%' },
]

export const OrbitalNodeSystemHeroSlide = ({ active }: OrbitalNodeSystemHeroSlideProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (!active || !containerRef.current || hasAnimated.current) return
    hasAnimated.current = true

    const container = containerRef.current
    const kicker = container.querySelector('.slide-kicker')
    const title = container.querySelector('.slide-title')
    const subtitle = container.querySelector('.slide-subtitle')
    const labels = container.querySelectorAll('.node-label')
    const legend = container.querySelectorAll('.legend-item')

    gsap.fromTo(kicker, { opacity: 0, y: -10 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' })
    gsap.fromTo(title, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.9, delay: 0.15, ease: 'power3.out' })
    gsap.fromTo(subtitle, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.7, delay: 0.35 })
    gsap.fromTo(labels, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.08, delay: 0.6 })
    gsap.fromTo(legend, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.06, delay: 0.8 })
  }, [active])

  useEffect(() => {
    if (!active) hasAnimated.current = false
  }, [active])

  return (
    <div className={`slide ${active ? 'active' : ''}`}>
      <div ref={containerRef} className="relative flex h-screen w-screen items-center justify-center overflow-hidden">
        <Background variant="default" />
        <div className="absolute inset-0 z-0">
          <HoloScene active={active} />
        </div>

        <HudFrame />

        <div className="absolute left-12 top-10 z-10 max-w-md text-left">
          <p className="slide-kicker text-[11px] uppercase tracking-[0.38em] text-cyan-300/70">
            Agentic Control Loop
          </p>
          <h1 className="slide-title mt-2 text-4xl font-semibold text-white">
            Live autonomy telemetry
          </h1>
          <p className="slide-subtitle mt-3 text-sm text-white/55">
            A single continuous intelligence loop where thinking, acting, observing, and reflecting
            stay in sync at runtime.
          </p>
        </div>

        <div className="absolute inset-0 z-10 pointer-events-none">
          {NODE_LABELS.map((node) => (
            <div
              key={node.label}
              className="node-label absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: node.x, top: node.y }}
            >
              <div
                className="rounded-full px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.28em]"
                style={{
                  color: node.color,
                  border: `1px solid ${node.color}66`,
                  background: `${node.color}10`,
                  boxShadow: `0 0 16px -10px ${node.color}`,
                }}
              >
                {node.label}
              </div>
            </div>
          ))}
        </div>

        <div className="absolute bottom-10 left-12 z-10 flex gap-6 text-[11px] uppercase tracking-[0.3em] text-white/50">
          {NODE_LABELS.map((node) => (
            <div key={`legend-${node.label}`} className="legend-item flex items-center gap-2">
              <span className="h-2 w-2 rounded-full" style={{ background: node.color }} />
              <span>{node.label}</span>
            </div>
          ))}
        </div>

        <div className="absolute inset-0 z-[1] pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(20,46,86,0.18)_0%,rgba(6,10,24,0.4)_60%,rgba(2,3,10,0.85)_100%)]" />
        </div>
      </div>
    </div>
  )
}

export default OrbitalNodeSystemHeroSlide

function HudFrame() {
  return (
    <div className="absolute inset-8 z-10 pointer-events-none">
      <div className="absolute inset-0 rounded-[28px] border border-cyan-400/10" />
      <div className="absolute -top-1 left-12 h-[2px] w-24 bg-cyan-400/40" />
      <div className="absolute -top-1 right-12 h-[2px] w-16 bg-violet-400/40" />
      <div className="absolute -bottom-1 left-14 h-[2px] w-20 bg-emerald-400/40" />
      <div className="absolute -bottom-1 right-16 h-[2px] w-24 bg-cyan-400/40" />
      <div className="absolute top-12 -left-1 h-16 w-[2px] bg-cyan-400/30" />
      <div className="absolute bottom-16 -left-1 h-20 w-[2px] bg-emerald-400/30" />
      <div className="absolute top-12 -right-1 h-20 w-[2px] bg-violet-400/30" />
      <div className="absolute bottom-16 -right-1 h-16 w-[2px] bg-cyan-400/30" />
    </div>
  )
}

function HoloScene({ active }: { active: boolean }) {
  return (
    <Canvas
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      camera={{ position: [0, 0.25, 7.2], fov: 40 }}
      onCreated={({ gl }) => {
        gl.toneMapping = THREE.ACESFilmicToneMapping
        gl.toneMappingExposure = 1.18
        gl.outputColorSpace = THREE.SRGBColorSpace
        gl.physicallyCorrectLights = true
      }}
    >
      <color attach="background" args={['#02040a']} />
      <ambientLight intensity={0.3} />
      <hemisphereLight intensity={0.18} color="#cfefff" groundColor="#0b1220" />
      <directionalLight position={[4, 6, 4]} intensity={1.3} color="#e0f2fe" />
      <pointLight position={[-6, -1.5, 6]} intensity={1.4} color="#22d3ee" />
      <pointLight position={[6, 1, 5]} intensity={1.1} color="#a78bfa" />
      <pointLight position={[0, -4, -2]} intensity={0.5} color="#38bdf8" />
      <pointLight position={[0, 1.2, 8]} intensity={0.45} color="#ffffff" />
      <Environment preset="city" />

      <HoloGrid active={active} />
      <InfinityLoop active={active} />
      <Sparkles count={36} size={0.42} speed={0.16} opacity={0.14} color="#38bdf8" scale={[10, 6, 6]} />

      <EffectComposer multisampling={2} frameBufferType={THREE.HalfFloatType}>
        <Bloom intensity={0.32} luminanceThreshold={0.28} luminanceSmoothing={0.92} />
      </EffectComposer>
    </Canvas>
  )
}

function HoloGrid({ active }: { active: boolean }) {
  const gridRef = useRef<THREE.GridHelper>(null)

  useEffect(() => {
    if (!gridRef.current) return
    const material = gridRef.current.material
    const setOpacity = (mat: THREE.Material) => {
      mat.transparent = true
      if ('opacity' in mat) {
        mat.opacity = 0.15
      }
    }
    if (Array.isArray(material)) {
      material.forEach(setOpacity)
    } else {
      setOpacity(material)
    }
  }, [])

  useFrame(({ clock }) => {
    if (!active || !gridRef.current) return
    gridRef.current.position.z = Math.sin(clock.getElapsedTime() * 0.1) * 0.2
  })

  return (
    <gridHelper
      ref={gridRef}
      args={[20, 40, '#0b2a3f', '#0b1a2c']}
      position={[0, -2.4, 0]}
    />
  )
}

function InfinityLoop({ active }: { active: boolean }) {
  const groupRef = useRef<THREE.Group>(null)
  const curve = useMemo(() => createInfinityCurve(3.5, 1.7, 1.05, 420), [])

  useEffect(() => {
    if (!groupRef.current) return
    if (active) {
      gsap.fromTo(
        groupRef.current.scale,
        { x: 0.9, y: 0.9, z: 0.9 },
        { x: 1, y: 1, z: 1, duration: 1.2, ease: 'power3.out' }
      )
    }
  }, [active])

  useFrame(({ clock }) => {
    if (!active || !groupRef.current) return
    const t = clock.getElapsedTime()
    groupRef.current.rotation.y = Math.sin(t * 0.12) * 0.1
    groupRef.current.rotation.x = -0.14 + Math.cos(t * 0.08) * 0.04
  })

  return (
    <group ref={groupRef} position={[0, -0.05, 0]} scale={1.06}>
      <mesh>
        <tubeGeometry args={[curve, 420, 0.09, 32, true]} />
        <meshStandardMaterial
          color="#33d7ff"
          emissive="#3bdcff"
          emissiveIntensity={1.05}
          roughness={0.14}
          metalness={0.7}
          envMapIntensity={1.35}
        />
      </mesh>
      <mesh>
        <tubeGeometry args={[curve, 420, 0.04, 24, true]} />
        <meshStandardMaterial
          color="#e5f7ff"
          emissive="#7dd3fc"
          emissiveIntensity={1.7}
          roughness={0.06}
          metalness={0.68}
          envMapIntensity={1.6}
        />
      </mesh>
      <mesh>
        <tubeGeometry args={[curve, 420, 0.13, 16, true]} />
        <meshBasicMaterial color="#22d3ee" transparent opacity={0.2} blending={THREE.AdditiveBlending} toneMapped={false} />
      </mesh>
      <FlowNodes curve={curve} active={active} />
    </group>
  )
}

function FlowNodes({ curve, active }: { curve: THREE.CatmullRomCurve3; active: boolean }) {
  const nodes = useMemo(() => ([
    { color: '#22d3ee', offset: 0.06, size: 0.24, speed: 0.046, lane: 0.2, lift: 0.06, depth: 0.14 },
    { color: '#a78bfa', offset: 0.32, size: 0.22, speed: 0.05, lane: -0.22, lift: -0.05, depth: -0.12 },
    { color: '#34d399', offset: 0.58, size: 0.22, speed: 0.044, lane: 0.18, lift: 0.05, depth: 0.1 },
    { color: '#fbbf24', offset: 0.82, size: 0.22, speed: 0.048, lane: -0.2, lift: -0.04, depth: -0.1 },
  ]), [])

  const coreRefs = useRef<THREE.Mesh[]>([])
  const glowRefs = useRef<THREE.Mesh[]>([])
  const tangent = new THREE.Vector3()
  const lateral = new THREE.Vector3()

  useFrame(({ clock }) => {
    if (!active) return
    const t = clock.getElapsedTime()

    nodes.forEach((node, index) => {
      const progress = (t * node.speed + node.offset) % 1
      const point = curve.getPointAt(progress)
      curve.getTangentAt(progress, tangent)
      lateral.set(-tangent.y, tangent.x, 0).normalize().multiplyScalar(node.lane)

      const pulse = 0.9 + Math.sin(t * 2.2 + index) * 0.08
      const core = coreRefs.current[index]
      const glow = glowRefs.current[index]

      if (core) {
        core.position.set(point.x + lateral.x, point.y + lateral.y + node.lift, point.z + node.depth)
        core.scale.setScalar(pulse)
      }

      if (glow) {
        glow.position.set(point.x + lateral.x, point.y + lateral.y + node.lift, point.z + node.depth)
        glow.scale.setScalar(pulse * 1.5)
      }
    })
  })

  return (
    <>
      {nodes.map((node, index) => (
        <group key={node.color}>
          <mesh
            ref={(el) => {
              if (el) glowRefs.current[index] = el
            }}
          >
            <sphereGeometry args={[node.size * 1.02, 24, 24]} />
            <meshBasicMaterial color={node.color} transparent opacity={0.12} blending={THREE.AdditiveBlending} toneMapped={false} depthWrite={false} />
          </mesh>
          <mesh
            ref={(el) => {
              if (el) coreRefs.current[index] = el
            }}
          >
            <sphereGeometry args={[node.size, 56, 56]} />
            <meshPhysicalMaterial
              color={node.color}
              emissive={node.color}
              emissiveIntensity={1.3}
              roughness={0.1}
              metalness={0.8}
              clearcoat={0.75}
              clearcoatRoughness={0.1}
              envMapIntensity={1.7}
            />
          </mesh>
        </group>
      ))}
    </>
  )
}

function createInfinityCurve(width: number, height: number, depth: number, segments: number) {
  const points: THREE.Vector3[] = []
  for (let i = 0; i <= segments; i++) {
    const t = (i / segments) * Math.PI * 2
    const x = Math.sin(t) * width
    const y = Math.sin(t) * Math.cos(t) * height
    const z = Math.cos(t * 2) * depth
    points.push(new THREE.Vector3(x, y, z))
  }
  return new THREE.CatmullRomCurve3(points, true, 'catmullrom', 0.6)
}
