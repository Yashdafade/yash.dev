import React, { useRef, useEffect, useMemo } from 'react';
import * as THREE from 'three';

// Vertex shader: displaces vertices based on audio + time for organic feel
const vertexShader = `
  uniform float uTime;
  uniform float uVolume;
  uniform float uBaseScale;
  varying vec3 vNormal;
  varying vec3 vPosition;
  varying float vDisplacement;
  
  // Simplex-like noise
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 permute(vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
  
  float snoise(vec3 v) {
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;
    i = mod289(i);
    vec4 p = permute(permute(permute(
      i.z + vec4(0.0, i1.z, i2.z, 1.0))
      + i.y + vec4(0.0, i1.y, i2.y, 1.0))
      + i.x + vec4(0.0, i1.x, i2.x, 1.0));
    float n_ = 0.142857142857;
    vec3 ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    vec4 x = x_ * ns.x + ns.yyyy;
    vec4 y = y_ * ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);
    vec4 s0 = floor(b0) * 2.0 + 1.0;
    vec4 s1 = floor(b1) * 2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
    p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
  }
  
  void main() {
    vNormal = normal;
    vPosition = position;
    
    // Multi-octave noise displacement
    float noise1 = snoise(position * 1.5 + uTime * 0.3) * 0.4;
    float noise2 = snoise(position * 3.0 + uTime * 0.5) * 0.2;
    float noise3 = snoise(position * 6.0 + uTime * 0.8) * 0.1;
    
    float displacement = (noise1 + noise2 + noise3) * uVolume * 1.5;
    
    // Gentle idle breathing
    float breathe = sin(uTime * 1.5) * 0.03 + sin(uTime * 0.8) * 0.02;
    
    vDisplacement = displacement;
    
    vec3 newPosition = position * uBaseScale + normal * (displacement + breathe);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
  }
`;

// Fragment shader: high-contrast dark fluid orb with glowing ridges
const fragmentShader = `
  uniform float uTime;
  uniform float uVolume;
  varying vec3 vNormal;
  varying vec3 vPosition;
  varying float vDisplacement;
  
  void main() {
    // Very dark base color (almost black)
    vec3 baseColor = vec3(0.04, 0.04, 0.05);
    
    // Glowing highlights (pure white)
    vec3 highlight = vec3(1.0, 1.0, 1.0);
    
    // Mix based heavily on how much the surface is displaced outwards
    float mixFactor = smoothstep(0.0, 0.35, vDisplacement);
    
    vec3 finalColor = mix(baseColor, highlight, mixFactor);
    
    // Fresnel rim glow to define the edges against the dark background
    vec3 viewDir = normalize(cameraPosition - vPosition);
    float fresnel = pow(1.0 - max(dot(viewDir, vNormal), 0.0), 3.0);
    vec3 rimColor = mix(vec3(0.3, 0.3, 0.4), vec3(1.0, 1.0, 1.0), uVolume);
    
    finalColor += rimColor * fresnel * (0.5 + uVolume * 0.5);
    
    gl_FragColor = vec4(finalColor, 1.0);
  }
`;

export default function VoiceSphere({ state = 'idle', inputVolume = 0, outputVolume = 0 }) {
  const mountRef = useRef(null);
  const rendererRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const meshRef = useRef(null);
  const uniformsRef = useRef(null);
  const frameRef = useRef(null);
  const smoothVolumeRef = useRef(0);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.z = 3.5;
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(280, 280);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    rendererRef.current = renderer;
    
    // Clear any existing canvas (Strict Mode fix)
    while (mountRef.current.firstChild) {
      mountRef.current.removeChild(mountRef.current.firstChild);
    }
    mountRef.current.appendChild(renderer.domElement);

    // Sphere
    const geometry = new THREE.IcosahedronGeometry(1, 5);
    const uniforms = {
      uTime: { value: 0 },
      uVolume: { value: 0 },
      uBaseScale: { value: 1.0 }
    };
    uniformsRef.current = uniforms;

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
      transparent: true,
      wireframe: false,
      side: THREE.FrontSide
    });

    const mesh = new THREE.Mesh(geometry, material);
    meshRef.current = mesh;
    scene.add(mesh);

    // Ambient light for subtle fill
    const ambient = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambient);

    // Animation loop
    const clock = new THREE.Clock();
    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();
      uniforms.uTime.value = elapsed;

      // Smooth volume interpolation
      const targetVolume = Math.max(inputVolume, outputVolume);
      smoothVolumeRef.current += (targetVolume - smoothVolumeRef.current) * 0.15;
      uniforms.uVolume.value = smoothVolumeRef.current * 1.5 + 0.08; // minimum idle deformation

      // Gentle rotation
      mesh.rotation.y = elapsed * 0.15;
      mesh.rotation.x = Math.sin(elapsed * 0.2) * 0.1;

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(frameRef.current);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      if (mountRef.current && renderer.domElement.parentNode === mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  // Update volumes reactively
  useEffect(() => {
    // The animate loop reads inputVolume/outputVolume from closure via the component props
    // We just need to keep the ref in sync for the animation loop
  }, [inputVolume, outputVolume]);

  // Update volume in the animation loop via a ref
  useEffect(() => {
    const interval = setInterval(() => {
      if (!uniformsRef.current) return;
      const targetVolume = Math.max(inputVolume, outputVolume);
      smoothVolumeRef.current += (targetVolume - smoothVolumeRef.current) * 0.15;
      uniformsRef.current.uVolume.value = smoothVolumeRef.current * 1.5 + 0.08;
    }, 16);
    return () => clearInterval(interval);
  }, [inputVolume, outputVolume]);

  return (
    <div
      ref={mountRef}
      className="w-[280px] h-[280px] mx-auto"
      style={{ filter: `drop-shadow(0 0 ${20 + Math.max(inputVolume, outputVolume) * 30}px rgba(139, 92, 246, 0.4))` }}
    />
  );
}
