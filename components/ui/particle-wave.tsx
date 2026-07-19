"use client";

import React, { useRef, useEffect } from 'react';

interface ParticleWaveProps {
  className?: string;
}

const ParticleWave: React.FC<ParticleWaveProps> = ({ className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<any>(null);

  const getCurrentTheme = () =>
    document.documentElement.classList.contains('dark') ? 'dark' : 'light';

  const particleVertex = `
    attribute float scale;
    uniform float uTime;
    void main() {
      vec3 p = position;
      float s = scale;
      p.y += (sin(p.x + uTime) * 0.5) + (cos(p.y + uTime) * 0.1) * 2.0;
      p.x += (sin(p.y + uTime) * 0.5);
      s += (sin(p.x + uTime) * 0.5) + (cos(p.y + uTime) * 0.1) * 2.0;
      vec4 mvPosition = modelViewMatrix * vec4(p, 1.0);
      gl_PointSize = s * 15.0 * (1.0 / -mvPosition.z);
      gl_Position = projectionMatrix * mvPosition;
    }
  `;

  const particleFragment = `
    uniform vec3 uColor;
    void main() {
      gl_FragColor = vec4(uColor, 0.5);
    }
  `;

  useEffect(() => {
    if (!canvasRef.current) return;

    let THREE: typeof import('three');
    let animationId: number | null = null;

    const setup = async () => {
      THREE = await import('three');

      const canvas = canvasRef.current!;
      const winWidth = window.innerWidth;
      const winHeight = window.innerHeight;

      const camera = new THREE.PerspectiveCamera(75, winWidth / winHeight, 0.01, 1000);
      camera.position.set(0, 6, 5);

      const scene = new THREE.Scene();

      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(winWidth, winHeight);

      const getThemeColor = (theme: string) =>
        theme === 'dark'
          ? new THREE.Vector3(1.0, 1.0, 1.0)
          : new THREE.Vector3(0.0, 0.0, 0.0);

      const getBgColor = (theme: string) =>
        theme === 'dark' ? new THREE.Color(0x000000) : new THREE.Color(0xffffff);

      renderer.setClearColor(getBgColor(getCurrentTheme()));

      const gap = 0.3;
      const amountX = 200;
      const amountY = 200;
      const particleNum = amountX * amountY;
      const positions = new Float32Array(particleNum * 3);
      const scales = new Float32Array(particleNum);

      let i = 0, j = 0;
      for (let ix = 0; ix < amountX; ix++) {
        for (let iy = 0; iy < amountY; iy++) {
          positions[i] = ix * gap - (amountX * gap) / 2;
          positions[i + 1] = 0;
          positions[i + 2] = iy * gap - (amountY * gap) / 2;
          scales[j] = 1;
          i += 3;
          j++;
        }
      }

      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute('scale', new THREE.BufferAttribute(scales, 1));

      const material = new THREE.ShaderMaterial({
        transparent: true,
        vertexShader: particleVertex,
        fragmentShader: particleFragment,
        uniforms: {
          uTime: { value: 0 },
          uColor: { value: getThemeColor(getCurrentTheme()) },
        },
      });

      const particles = new THREE.Points(geometry, material);
      scene.add(particles);

      sceneRef.current = { scene, camera, renderer, particles, material };

      const animate = () => {
        material.uniforms.uTime.value += 0.05;
        const theme = getCurrentTheme();
        material.uniforms.uColor.value = getThemeColor(theme);
        renderer.setClearColor(getBgColor(theme));
        camera.lookAt(scene.position);
        renderer.render(scene, camera);
        animationId = requestAnimationFrame(animate);
      };
      animate();

      const handleResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      };

      window.addEventListener('resize', handleResize);

      return () => {
        if (animationId) cancelAnimationFrame(animationId);
        window.removeEventListener('resize', handleResize);
        scene.remove(particles);
        geometry.dispose();
        material.dispose();
        renderer.dispose();
      };
    };

    let cleanup: (() => void) | undefined;
    setup().then((fn) => { cleanup = fn; });

    return () => { cleanup?.(); };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`block ${className}`}
      style={{ width: '100vw', height: '100vh', margin: 0, overflow: 'hidden' }}
    />
  );
};

export { ParticleWave };
