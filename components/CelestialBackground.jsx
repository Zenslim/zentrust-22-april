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

  for (let i = 0; i < starCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 200
    positions[i * 3 + 1] = (Math.random() - 0.5) * 200
    positions[i * 3 + 2] = (Math.random() - 0.5) * 200
  }

  starsGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))

  const starsMaterial = new THREE.PointsMaterial({
    map: starTexture,
    size: 2.5, // Bigger size for better visibility
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    color: new THREE.Color(0xaaaaee),
    sizeAttenuation: true, // ✅ Important to make it visible at different distances
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
    if (mountRef.current && renderer.domElement && mountRef.current.contains(renderer.domElement)) {
      mountRef.current.removeChild(renderer.domElement)
    }
    window.removeEventListener('resize', handleResize)
  }
}, [])
