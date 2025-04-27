'use client';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function CelestialBackground() {
  const mountRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    mountRef.current.appendChild(renderer.domElement);

    const starTexture = new THREE.TextureLoader().load('/textures/star-glow.png');
    const nebulaTexture = new THREE.TextureLoader().load('/textures/nebula-glow.png'); // ✅ you must add a soft nebula-glow.png

    // Nebula plane
    const nebulaMaterial = new THREE.SpriteMaterial({ map: nebulaTexture, transparent: true, opacity: 0.2 });
    const nebula = new THREE.Sprite(nebulaMaterial);
    nebula.scale.set(50, 50, 1); // Large soft background
    scene.add(nebula);

    const starCount = 1000;
    const starsGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(starCount * 3);
    const alphas = new Float32Array(starCount);

    for (let i = 0; i < starCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 200;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 200;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 200;
      alphas[i] = Math.random();
    }

    starsGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    starsGeometry.setAttribute('alpha', new THREE.BufferAttribute(alphas, 1));

    const starsMaterial = new THREE.PointsMaterial({
      map: starTexture,
      size: 2.0,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexColors: true,
      sizeAttenuation: true,
    });

    const colors = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      colors[i * 3] = 0.8;
      colors[i * 3 + 1] = 0.8;
      colors[i * 3 + 2] = 1.0;
    }
    starsGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const stars = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(stars);

    // Shooting stars
    const shootingStars = [];
    function spawnShootingStar() {
      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(2 * 3);
      positions[0] = (Math.random() - 0.5) * 100;
      positions[1] = (Math.random() - 0.5) * 100;
      positions[2] = -50;
      positions[3] = positions[0] + Math.random() * 5;
      positions[4] = positions[1] + Math.random() * 5;
      positions[5] = -50;
      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      const material = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 1 });
      const line = new THREE.Line(geometry, material);
      scene.add(line);
      shootingStars.push({ line, life: 1.5 }); // 1.5 seconds lifespan
    }

    let mouseX = 0;
    let mouseY = 0;
    document.addEventListener('mousemove', (e) => {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    });

    const clock = new THREE.Clock();

    const animate = () => {
      requestAnimationFrame(animate);

      const elapsed = clock.getElapsedTime();

      stars.rotation.y += 0.0008;
      stars.rotation.x += 0.0002;

      nebula.rotation.z += 0.0001; // Very slow rotation of nebula

      const newAlphas = starsGeometry.getAttribute('alpha');
      for (let i = 0; i < starCount; i++) {
        const base = (Math.sin(elapsed * 0.5 + i) + 1) / 2;
        newAlphas.setX(i, 0.5 + base * 0.5);
      }
      newAlphas.needsUpdate = true;

      const colors = starsGeometry.getAttribute('color');
      const hueShift = (elapsed * 0.02) % 1;
      for (let i = 0; i < starCount; i++) {
        const h = (hueShift + i * 0.0005) % 1;
        const s = 0.5;
        const l = 0.8;
        const color = new THREE.Color();
        color.setHSL(h, s, l);
        colors.setXYZ(i, color.r, color.g, color.b);
      }
      colors.needsUpdate = true;

      camera.position.x += (mouseX * 2 - camera.position.x) * 0.02;
      camera.position.y += (mouseY * 2 - camera.position.y) * 0.02;
      camera.lookAt(scene.position);

      // Update shooting stars
      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const star = shootingStars[i];
        star.life -= clock.getDelta();
        if (star.life <= 0) {
          scene.remove(star.line);
          shootingStars.splice(i, 1);
        } else {
          star.line.material.opacity = star.life / 1.5;
        }
      }

      // Randomly spawn shooting star
      if (Math.random() < 0.005) { // ~once every few seconds
        spawnShootingStar();
      }

      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      if (mountRef.current && renderer.domElement && mountRef.current.contains(renderer.domElement)) {
        mountRef.current.removeChild(renderer.domElement);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 0,
      }}
    />
  );
}
