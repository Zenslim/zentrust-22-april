
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function CelestialBackground() {
  const mountRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 200);
    camera.position.z = 10;

    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    // 🌟 Load circular star texture
    const starTexture = new THREE.TextureLoader().load('https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/sprites/circle.png');

    // ✨ Create twinkling stars
    const starGeometry = new THREE.BufferGeometry();
    const starCount = 8000;
    const starPositions = [];
    for (let i = 0; i < starCount; i++) {
      starPositions.push((Math.random() - 0.5) * 400);
      starPositions.push((Math.random() - 0.5) * 400);
      starPositions.push((Math.random() - 0.5) * 400);
    }
    starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starPositions, 3));
    const starMaterial = new THREE.PointsMaterial({
      size: 2.5,
      map: starTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: true
    });
    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);

    // 🪐 Planet textures
    const planetTextures = [
      "https://raw.githubusercontent.com/itsron717/planet-textures/main/mercury.jpg",
      "https://raw.githubusercontent.com/itsron717/planet-textures/main/venus.jpg",
      "https://raw.githubusercontent.com/itsron717/planet-textures/main/earth.jpg",
      "https://raw.githubusercontent.com/itsron717/planet-textures/main/mars.jpg",
      "https://raw.githubusercontent.com/itsron717/planet-textures/main/jupiter.jpg",
      "https://raw.githubusercontent.com/itsron717/planet-textures/main/saturn.jpg",
      "https://raw.githubusercontent.com/itsron717/planet-textures/main/uranus.jpg",
      "https://raw.githubusercontent.com/itsron717/planet-textures/main/neptune.jpg",
      "https://raw.githubusercontent.com/itsron717/planet-textures/main/pluto.jpg"
    ];

    const planets = [];
    const loader = new THREE.TextureLoader();

    Promise.all(
      planetTextures.map(url =>
        new Promise(resolve => {
          loader.load(
            url,
            texture => {
              const geometry = new THREE.SphereGeometry(0.6, 64, 64);
              const material = new THREE.MeshBasicMaterial({ map: texture, transparent: true });
              const mesh = new THREE.Mesh(geometry, material);
              mesh.scale.set(0.01, 0.01, 0.01);
              mesh.visible = false;
              scene.add(mesh);
              planets.push(mesh);
              resolve();
            },
            undefined,
            () => {
              const geometry = new THREE.SphereGeometry(0.6, 64, 64);
              const fallback = new THREE.MeshBasicMaterial({ color: 0x4444ff });
              const mesh = new THREE.Mesh(geometry, fallback);
              mesh.scale.set(0.01, 0.01, 0.01);
              mesh.visible = false;
              scene.add(mesh);
              planets.push(mesh);
              resolve();
            }
          );
        })
      )
    ).then(() => {
      let current = 0;
      let phase = "fadeIn";
      let counter = 0;

      const animate = () => {
        requestAnimationFrame(animate);

        stars.rotation.y += 0.0004;
        stars.rotation.x += 0.0002;

        const planet = planets[current];
        if (!planet.visible) planet.visible = true;

        if (phase === "fadeIn") {
          planet.scale.multiplyScalar(1.05);
          planet.material.opacity = Math.min(1, (planet.material.opacity || 0) + 0.02);
          if (planet.material.opacity >= 1) {
            phase = "hold";
            counter = 0;
          }
        } else if (phase === "hold") {
          counter++;
          if (counter > 100) {
            phase = "fadeOut";
          }
        } else if (phase === "fadeOut") {
          planet.scale.multiplyScalar(0.96);
          planet.material.opacity -= 0.02;
          if (planet.material.opacity <= 0.05) {
            planet.visible = false;
            planet.scale.set(0.01, 0.01, 0.01);
            planet.material.opacity = 0;
            current = (current + 1) % planets.length;
            phase = "fadeIn";
          }
        }

        renderer.render(scene, camera);
      };

      animate();
    });

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      mountRef.current.removeChild(renderer.domElement);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return <div ref={mountRef} style={{ position: 'absolute', top: 0, left: 0, zIndex: 0 }} />;
}
