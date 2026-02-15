import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Stars } from '@react-three/drei'
import * as THREE from 'three'

interface FloatingOrbProps {
  position: [number, number, number]
  color: string
  size?: number
  speed?: number
}

function FloatingOrb({ position, color, size = 0.5, speed = 1 }: FloatingOrbProps) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (!meshRef.current) return
    meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed) * 0.3
  })

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={meshRef} position={position}>
        <sphereGeometry args={[size, 32, 32]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.5}
          transparent
          opacity={0.6}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>
    </Float>
  )
}

function GlassPanel({ position, rotation, size }: {
  position: [number, number, number]
  rotation: [number, number, number]
  size: [number, number]
}) {
  return (
    <mesh position={position} rotation={rotation}>
      <planeGeometry args={size} />
      <meshPhysicalMaterial
        color="#ffffff"
        transparent
        opacity={0.05}
        roughness={0.1}
        metalness={0.1}
        transmission={0.9}
        thickness={0.5}
      />
    </mesh>
  )
}

function ParticleField({ count = 200 }: { count?: number }) {
  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)

    const palette = [
      new THREE.Color('#22d3ee'),
      new THREE.Color('#a78bfa'),
      new THREE.Color('#34d399'),
    ]

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20

      const color = palette[Math.floor(Math.random() * palette.length)]
      colors[i * 3] = color.r
      colors[i * 3 + 1] = color.g
      colors[i * 3 + 2] = color.b
    }

    return { positions, colors }
  }, [count])

  const pointsRef = useRef<THREE.Points>(null)

  useFrame((state) => {
    if (!pointsRef.current) return
    pointsRef.current.rotation.y = state.clock.elapsedTime * 0.02
    pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.01) * 0.1
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particles.positions.length / 3}
          array={particles.positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={particles.colors.length / 3}
          array={particles.colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
      />
    </points>
  )
}

function Scene({ variant }: { variant: 'orbs' | 'glass' | 'particles' | 'stars' }) {
  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={0.5} color="#22d3ee" />
      <pointLight position={[-10, -10, -10]} intensity={0.3} color="#a78bfa" />

      {variant === 'orbs' && (
        <>
          <FloatingOrb position={[-3, 1, -2]} color="#22d3ee" size={0.8} speed={0.8} />
          <FloatingOrb position={[3, -1, -3]} color="#a78bfa" size={0.6} speed={1.2} />
          <FloatingOrb position={[0, 2, -4]} color="#34d399" size={0.4} speed={1} />
          <FloatingOrb position={[-2, -2, -2]} color="#fbbf24" size={0.3} speed={1.5} />
          <FloatingOrb position={[4, 0, -5]} color="#22d3ee" size={0.5} speed={0.7} />
        </>
      )}

      {variant === 'glass' && (
        <>
          <GlassPanel position={[-2, 0, -3]} rotation={[0, 0.3, 0.1]} size={[3, 4]} />
          <GlassPanel position={[2, 1, -4]} rotation={[0.1, -0.2, 0]} size={[2.5, 3]} />
          <GlassPanel position={[0, -1, -2]} rotation={[-0.1, 0, 0.05]} size={[4, 2]} />
          <FloatingOrb position={[0, 0, -3]} color="#22d3ee" size={0.3} speed={1} />
        </>
      )}

      {variant === 'particles' && (
        <ParticleField count={300} />
      )}

      {variant === 'stars' && (
        <>
          <Stars radius={100} depth={50} count={2000} factor={4} fade speed={1} />
          <FloatingOrb position={[0, 0, -5]} color="#22d3ee" size={1} speed={0.5} />
        </>
      )}
    </>
  )
}

interface Background3DProps {
  variant?: 'orbs' | 'glass' | 'particles' | 'stars'
}

export function Background3D({ variant = 'orbs' }: Background3DProps) {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* Base dark gradient */}
      <div className="absolute inset-0 bg-black" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(10,15,30,1)_0%,rgba(0,0,0,1)_70%)]" />

      {/* 3D Canvas */}
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        style={{ position: 'absolute', inset: 0 }}
        gl={{ antialias: true, alpha: true }}
      >
        <Scene variant={variant} />
      </Canvas>
    </div>
  )
}
