import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ThreeBackground() {
  const mountRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0d1117, 0.05);

    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 12;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);
    const pointLight = new THREE.PointLight(0x61dafb, 1);
    pointLight.position.set(10, 10, 10);
    scene.add(pointLight);

    const isMobile = window.innerWidth < 768;
    const particlesCount = isMobile ? 300 : 800;

    const particlesGeometry = new THREE.BufferGeometry();
    const posArray = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 60;
    }
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.05,
      color: 0x4ade80,
      transparent: true,
      opacity: 0.3
    });
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    const nodes = [];
    const nodeData = [
      { pos: [-4, 2, 0], color: 0x61dafb },
      { pos: [4, -2, -2], color: 0x68a063 },
      { pos: [0, 0, -1], color: 0xffca28 },
      { pos: [-2, -3, 1], color: 0xe10098 },
      { pos: [3, 3, 1], color: 0x007acc }
    ];

    nodeData.forEach((data) => {
      const geometry = new THREE.IcosahedronGeometry(0.6, 0);
      const material = new THREE.MeshStandardMaterial({
        color: data.color,
        wireframe: true,
        emissive: data.color,
        emissiveIntensity: 0.4
      });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(...data.pos);
      mesh.userData = {
        originalPos: [...data.pos],
        speed: Math.random() * 0.002 + 0.001,
        offset: Math.random() * Math.PI * 2
      };
      scene.add(mesh);
      nodes.push(mesh);
    });

    const linesMaterial = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.08 });
    const linesGeometry = new THREE.BufferGeometry();
    const linesMesh = new THREE.LineSegments(linesGeometry, linesMaterial);
    scene.add(linesMesh);

    let animationId;
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      particlesMesh.rotation.y += 0.0005;

      const now = Date.now();
      nodes.forEach(node => {
        node.rotation.x += 0.005;
        node.rotation.y += 0.005;
        node.position.y = node.userData.originalPos[1] + Math.sin(now * node.userData.speed + node.userData.offset) * 0.5;
      });

      const linePositions = [];
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dist = nodes[i].position.distanceTo(nodes[j].position);
          if (dist < 8) {
            linePositions.push(
              nodes[i].position.x, nodes[i].position.y, nodes[i].position.z,
              nodes[j].position.x, nodes[j].position.y, nodes[j].position.z
            );
          }
        }
      }
      linesGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!mountRef.current) return;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      if (mountRef.current) mountRef.current.innerHTML = '';
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      linesGeometry.dispose();
      linesMaterial.dispose();
      nodes.forEach(n => { n.geometry.dispose(); n.material.dispose(); });
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0 z-0 bg-[#0d1117]" />;
}
