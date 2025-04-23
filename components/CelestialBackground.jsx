'use client'
import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function CelestialBackground() {
  const mountRef = useRef(null)

  useEffect(() => {
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000)
    camera.position.z = 5

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(window.devicePixelRatio)
    mountRef.current.appendChild(renderer.domElement)

    const starTexture = new THREE.TextureLoader().load('/textures/star-glow.png')
    const starsGeometry = new THREE.BufferGeometry()
    const starCount = 1500
    const positions = new Float32Array(starCount * 3)
    const sizes = new Float32Array(starCount)

    for (let i = 0; i < starCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 200
      positions[i * 3 + 1] = (Math.random() - 0.5) * 200
      positions[i * 3 + 2] = (Math.random() - 0.5) * 200
      sizes[i] = Math.random() * 1.2 + 0.3
    }

    starsGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    starsGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1))

    const starsMaterial = new THREE.PointsMaterial({
      map: starTexture,
      size: 1.5,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      color: new THREE.Color(0xaaaaee),
    })

    const stars = new THREE.Points(starsGeometry, starsMaterial)
    scene.add(stars)

    const animate = () => {
      requestAnimationFrame(animate)
      stars.rotation.y += 0.0008
      stars.rotation.x += 0.0002
      renderer.render(scene, camera)
    }
    animate()

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }
    window.addEventListener('resize', handleResize)

    return () => {
      mountRef.current.removeChild(renderer.domElement)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return <div ref={mountRef} className="fixed top-0 left-0 w-full h-full -z-10" />
}
