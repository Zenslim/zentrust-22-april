
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function CelestialBackground() {
  const mountRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    // Stars
    const starGeometry = new THREE.BufferGeometry();
    const starVertices = [];
    for (let i = 0; i < 100000; i++) {
      starVertices.push((Math.random() - 0.5) * 3000);
      starVertices.push((Math.random() - 0.5) * 3000);
      starVertices.push((Math.random() - 0.5) * 3000);
    }
    starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
    const starMaterial = new THREE.PointsMaterial({
      size: 1,
      color: 0xffffff,
      transparent: true
    });
    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);

    // Planets with textures
    const planetTextures = [
      { name: "earth", url: "https://raw.githubusercontent.com/itsron717/planet-textures/main/earth.jpg" },
      { name: "jupiter", url: "https://raw.githubusercontent.com/itsron717/planet-textures/main/jupiter.jpg" },
      { name: "saturn", url: "https://raw.githubusercontent.com/itsron717/planet-textures/main/saturn.jpg" },
      { name: "pluto", url: "https://raw.githubusercontent.com/itsron717/planet-textures/main/pluto.jpg" }
    ];

    const planets = [];
    const loaders = planetTextures.map((planet, index) => {
      return new Promise(resolve => {
        new THREE.TextureLoader().load(planet.url, texture => {
          const geometry = new THREE.SphereGeometry(0.01, 32, 32); // start small
          const material = new THREE.MeshBasicMaterial({ map: texture });
          const mesh = new THREE.Mesh(geometry, material);
          mesh.userData = {
            scaleTarget: 0.8 + Math.random() * 0.4,
            phase: index * 2
          };
          mesh.position.set(Math.sin(index) * 3, Math.cos(index) * 2, -4 - index);
          scene.add(mesh);
          planets.push(mesh);
          resolve();
        });
      });
    });

    Promise.all(loaders).then(() => {
      const animate = () => {
        requestAnimationFrame(animate);

        // Rotate star field
        stars.rotation.y += 0.0007;

        // Animate planets
        const time = Date.now() * 0.001;
        planets.forEach((planet, i) => {
          const scale = 0.01 + Math.abs(Math.sin(time + planet.userData.phase)) * planet.userData.scaleTarget;
          planet.scale.set(scale, scale, scale);
        });

        renderer.render(scene, camera);
      };

      animate();
    });

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      mountRef.current.removeChild(renderer.domElement);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <div ref={mountRef} style={{ position: 'absolute', top: 0, left: 0, zIndex: 0 }} />;
}
