'use client';

import { useRef, useEffect } from 'react';

export default function ParticleWave() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    let animId: number;

    const init = async () => {
      const THREE = await import('three');
      const w = window.innerWidth;
      const h = window.innerHeight;

      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(w, h);
      renderer.setClearColor(0x000000, 0);

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, w / h, 0.01, 1000);
      camera.position.set(0, 6, 5);

      const gap = 0.3, amtX = 200, amtY = 200;
      const count = amtX * amtY;
      const positions = new Float32Array(count * 3);
      const scales = new Float32Array(count);
      let i = 0, j = 0;
      for (let ix = 0; ix < amtX; ix++) {
        for (let iy = 0; iy < amtY; iy++) {
          positions[i] = ix * gap - (amtX * gap) / 2;
          positions[i + 1] = 0;
          positions[i + 2] = iy * gap - (amtY * gap) / 2;
          scales[j] = 1;
          i += 3; j++;
        }
      }

      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      geo.setAttribute('scale', new THREE.BufferAttribute(scales, 1));

      const mat = new THREE.ShaderMaterial({
        transparent: true,
        uniforms: {
          uTime: { value: 0 },
          uColor: { value: new THREE.Vector3(1, 1, 1) },
        },
        vertexShader: `
          attribute float scale;
          uniform float uTime;
          void main() {
            vec3 p = position;
            float s = scale;
            p.y += (sin(p.x + uTime) * 0.5) + (cos(p.y + uTime) * 0.1) * 2.0;
            p.x += (sin(p.y + uTime) * 0.5);
            s += (sin(p.x + uTime) * 0.5) + (cos(p.y + uTime) * 0.1) * 2.0;
            vec4 mv = modelViewMatrix * vec4(p, 1.0);
            gl_PointSize = s * 15.0 * (1.0 / -mv.z);
            gl_Position = projectionMatrix * mv;
          }
        `,
        fragmentShader: `
          uniform vec3 uColor;
          void main() {
            gl_FragColor = vec4(uColor, 0.4);
          }
        `,
      });

      const points = new THREE.Points(geo, mat);
      scene.add(points);

      const onResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      };
      window.addEventListener('resize', onResize);

      const animate = () => {
        mat.uniforms.uTime.value += 0.05;
        camera.lookAt(scene.position);
        renderer.render(scene, camera);
        animId = requestAnimationFrame(animate);
      };
      animate();

      return () => {
        cancelAnimationFrame(animId);
        window.removeEventListener('resize', onResize);
        geo.dispose();
        mat.dispose();
        renderer.dispose();
      };
    };

    let cleanup: (() => void) | undefined;
    init().then(fn => { cleanup = fn; });
    return () => { cleanup?.(); };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        pointerEvents: 'none',
        display: 'block',
      }}
    />
  );
}
