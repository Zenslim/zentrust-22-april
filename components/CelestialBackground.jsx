'use client'
import { useRef, useEffect } from 'react'
import * as THREE from 'three'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Stars } from '@react-three/drei'

const planetTextures = [
  '/textures/mercury.jpg',
  '/textures/venus.jpg',
  '/textures/earth.jpg',
  '/textures/mars.jpg',
  '/textures/jupiter.jpg',
  '/textures/saturn.jpg',
  '/textures/uranus.jpg',
  '/textures/neptune.jpg',
  '/textures/pluto.jpg'
]

function PlanetMessenger() {
  const meshRef = useRef()
  const textureRef = useRef(null)
  const planetIndex = useRef(0)
  const opacity = useRef(0)
  const direction = useRef(1)

  useEffect(() => {
    const loader = new THREE.TextureLoader()
    const loadTexture = () => {
      const texture = loader.load(planetTextures[planetIndex.current])
      textureRef.current = texture
    }
    loadTexture()

    const interval = setInterval(() => {
      planetIndex.current = (planetIndex.current + 1) % planetTextures.length
      loadTexture()
    }, 8000)

    return () => clearInterval(interval)
  }, [])

  useFrame(() => {
    if (meshRef.current && textureRef.current) {
      const mesh = meshRef.current
      mesh.material.map = textureRef.current
      mesh.material.needsUpdate = true

      mesh.rotation.y += 0.001

      // Fade in/out logic
      if (direction.current === 1) {
        opacity.current += 0.01
        if (opacity.current >= 1) direction.current = -1
      } else {
        opacity.current -= 0.01
        if (opacity.current <= 0) direction.current = 1
      }
      mesh.material.opacity = Math.max(0, Math.min(1, opacity.current))
    }
  })

  return (
    <mesh ref={meshRef} position={[0, 0, -5]}>
      <sphereGeometry args={[1.5, 32, 32]} />
      <meshStandardMaterial
        map={textureRef.current}
        transparent
        emissive={new THREE.Color(0x222222)}
        emissiveIntensity={0.4}
        opacity={opacity.current}
      />
    </mesh>
  )
}

function TwinklingStars() {
  const groupRef = useRef()
  const starCount = 2500
  const stars = Array.from({ length: starCount }, () => ({
    position: new THREE.Vector3(
      (Math.random() - 0.5) * 200,
      (Math.random() - 0.5) * 200,
      (Math.random() - 0.5) * 200
    ),
    scale: Math.random() * 0.8 + 0.2
  }))

  useFrame(() => {
    groupRef.current.rotation.y += 0.0008
  })

  return (
    <group ref={groupRef}>
      {stars.map((star, i) => (
        <sprite key={i} position={star.position} scale={[star.scale, star.scale, 1]}>
          <spriteMaterial attach="material" color="white" />
        </sprite>
      ))}
    </group>
  )
}

export default function CelestialBackground() {
  return (
    <div className="fixed top-0 left-0 w-full h-full -z-10">
      <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[0, 0, 10]} intensity={1.2} />
        <Stars radius={100} depth={50} count={1000} factor={4} fade />
        <TwinklingStars />
        <PlanetMessenger />
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
    </div>
  )
}
