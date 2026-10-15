import { useEffect, useRef, useState } from 'react';
import {
  AmbientLight,
  BufferGeometry,
  Float32BufferAttribute,
  Group,
  IcosahedronGeometry,
  LineBasicMaterial,
  LineSegments,
  Mesh,
  MeshPhongMaterial,
  PerspectiveCamera,
  PointLight,
  Points,
  PointsMaterial,
  Scene,
  SRGBColorSpace,
  WebGLRenderer,
} from 'three';

function spherePositions(count, minRadius, maxRadius, phase = 0) {
  const positions = new Float32Array(count * 3);
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));

  for (let i = 0; i < count; i += 1) {
    const y = 1 - (i / (count - 1)) * 2;
    const ringRadius = Math.sqrt(1 - y * y);
    const theta = goldenAngle * i;
    const radiusMix = 0.5 + 0.5 * Math.sin(i * 12.9898 + phase);
    const radius = minRadius + (maxRadius - minRadius) * radiusMix;
    positions[i * 3] = Math.cos(theta) * ringRadius * radius;
    positions[i * 3 + 1] = y * radius;
    positions[i * 3 + 2] = Math.sin(theta) * ringRadius * radius;
  }
  return positions;
}

function connectNearbyNodes(positions, thresholdSq) {
  const links = [];
  const count = positions.length / 3;
  for (let i = 0; i < count; i += 1) {
    const ax = positions[i * 3];
    const ay = positions[i * 3 + 1];
    const az = positions[i * 3 + 2];
    for (let j = i + 1; j < count; j += 1) {
      const dx = ax - positions[j * 3];
      const dy = ay - positions[j * 3 + 1];
      const dz = az - positions[j * 3 + 2];
      if (dx * dx + dy * dy + dz * dz < thresholdSq) {
        links.push(ax, ay, az, positions[j * 3], positions[j * 3 + 1], positions[j * 3 + 2]);
      }
    }
  }
  return new Float32Array(links);
}

export default function IntelligenceField() {
  const mountRef = useRef(null);
  const [fallback, setFallback] = useState(false);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return undefined;

    const interactionSurface = mount.closest('.hero') ?? mount;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const touch = window.matchMedia('(pointer: coarse)').matches;
    const pointerTarget = { x: 0, y: 0 };
    const pointer = { x: 0, y: 0 };
    const resources = [];
    let renderer;
    let observer;
    let animationFrame = 0;
    let disposed = false;
    let onPointerMove;
    let onPointerLeave;
    let resizeFallback = false;

    const track = (resource) => {
      resources.push(resource);
      return resource;
    };

    const cleanup = () => {
      if (disposed) return;
      disposed = true;
      window.cancelAnimationFrame(animationFrame);
      observer?.disconnect();
      if (resizeFallback) window.removeEventListener('resize', resize);
      if (onPointerMove) interactionSurface.removeEventListener('pointermove', onPointerMove);
      if (onPointerLeave) interactionSurface.removeEventListener('pointerleave', onPointerLeave);
      resources.forEach((resource) => resource.dispose());
      if (renderer) {
        renderer.dispose();
        renderer.domElement.remove();
      }
    };

    try {
      renderer = new WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'low-power' });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, touch ? 1 : 1.5));
      renderer.setClearColor(0x000000, 0);
      renderer.outputColorSpace = SRGBColorSpace;
      mount.appendChild(renderer.domElement);

      const scene = new Scene();
      const camera = new PerspectiveCamera(37, 1, 0.1, 100);
      camera.position.z = 8.7;

      const core = new Group();
      const atmosphere = new Group();
      scene.add(core, atmosphere);
      scene.add(new AmbientLight(0x7599a5, 1.15));

      const coreCount = touch ? 128 : 260;
      const corePositions = spherePositions(coreCount, 1.72, 1.9, 0.7);
      const nodeGeometry = track(new BufferGeometry());
      nodeGeometry.setAttribute('position', new Float32BufferAttribute(corePositions, 3));
      const nodes = new Points(nodeGeometry, track(new PointsMaterial({
        color: 0xc1eee5,
        size: touch ? 0.052 : 0.064,
        transparent: true,
        opacity: 0.96,
        sizeAttenuation: true,
        depthWrite: false,
      })));
      core.add(nodes);

      const lineGeometry = track(new BufferGeometry());
      lineGeometry.setAttribute('position', new Float32BufferAttribute(
        connectNearbyNodes(corePositions, touch ? 0.78 : 0.43),
        3,
      ));
      const filaments = new LineSegments(lineGeometry, track(new LineBasicMaterial({
        color: 0x83c9c6,
        transparent: true,
        opacity: 0.52,
        depthWrite: false,
      })));
      core.add(filaments);

      const shell = new Mesh(
        track(new IcosahedronGeometry(1.53, 2)),
        track(new MeshPhongMaterial({
          color: 0x559c9b,
          emissive: 0x16434b,
          emissiveIntensity: 0.5,
          wireframe: true,
          transparent: true,
          opacity: 0.42,
          shininess: 42,
          depthWrite: false,
        })),
      );
      core.add(shell);
      const innerShell = new Mesh(
        track(new IcosahedronGeometry(0.72, 1)),
        track(new MeshPhongMaterial({
          color: 0x9ad9dc,
          emissive: 0x27596a,
          emissiveIntensity: 0.6,
          wireframe: true,
          transparent: true,
          opacity: 0.28,
          depthWrite: false,
        })),
      );
      core.add(innerShell);

      const deepCount = touch ? 48 : 150;
      const nearCount = touch ? 28 : 86;
      const deepGeometry = track(new BufferGeometry());
      deepGeometry.setAttribute('position', new Float32BufferAttribute(
        spherePositions(deepCount, 3.35, 4.35, 2.1),
        3,
      ));
      atmosphere.add(new Points(deepGeometry, track(new PointsMaterial({
        color: 0x78b4cf,
        size: touch ? 0.026 : 0.031,
        transparent: true,
        opacity: 0.55,
        sizeAttenuation: true,
        depthWrite: false,
      }))));

      const nearGeometry = track(new BufferGeometry());
      nearGeometry.setAttribute('position', new Float32BufferAttribute(
        spherePositions(nearCount, 2.25, 3.05, 5.4),
        3,
      ));
      atmosphere.add(new Points(nearGeometry, track(new PointsMaterial({
        color: 0xa5e7e0,
        size: touch ? 0.039 : 0.048,
        transparent: true,
        opacity: 0.78,
        sizeAttenuation: true,
        depthWrite: false,
      }))));

      const accent = new PointLight(0x69d7c7, 3.1, 9);
      accent.position.set(2.3, 1.4, 2.8);
      scene.add(accent);
      const fillLight = new PointLight(0x76bfe2, 1.35, 8);
      fillLight.position.set(-2.5, -1.8, -1);
      scene.add(fillLight);

      const resize = () => {
        if (disposed) return;
        const width = Math.max(1, mount.clientWidth);
        const height = Math.max(1, mount.clientHeight);
        renderer.setSize(width, height, false);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.render(scene, camera);
      };
      if (typeof ResizeObserver !== 'undefined') {
        observer = new ResizeObserver(resize);
        observer.observe(mount);
      } else {
        resizeFallback = true;
        window.addEventListener('resize', resize, { passive: true });
      }
      resize();

      if (!touch && !reducedMotion) {
        onPointerMove = (event) => {
          const bounds = interactionSurface.getBoundingClientRect();
          pointerTarget.x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2;
          pointerTarget.y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2;
        };
        onPointerLeave = () => { pointerTarget.x = 0; pointerTarget.y = 0; };
        interactionSurface.addEventListener('pointermove', onPointerMove, { passive: true });
        interactionSurface.addEventListener('pointerleave', onPointerLeave, { passive: true });

        const animate = (now) => {
          if (disposed) return;
          pointer.x += (pointerTarget.x - pointer.x) * 0.055;
          pointer.y += (pointerTarget.y - pointer.y) * 0.055;

          const time = now * 0.00018;
          const proximity = Math.max(0, 1 - Math.hypot(pointer.x - 0.55, pointer.y) * 0.78);
          core.rotation.y = pointer.x * 0.72 + Math.sin(time) * 0.055;
          core.rotation.x = -pointer.y * 0.48 + Math.sin(time * 0.73) * 0.025;
          atmosphere.rotation.y = -pointer.x * 0.27 + time * 0.15;
          atmosphere.rotation.x = pointer.y * 0.18 + Math.sin(time * 0.6) * 0.035;
          atmosphere.position.x = pointer.x * 0.3;
          atmosphere.position.y = -pointer.y * 0.22;
          accent.position.x = 2.3 + pointer.x * 0.9;
          accent.position.y = 1.4 - pointer.y * 0.75;
          accent.intensity = 2.4 + proximity * 3.5;
          renderer.render(scene, camera);
          animationFrame = window.requestAnimationFrame(animate);
        };
        animationFrame = window.requestAnimationFrame(animate);
      }

      return cleanup;
    } catch (error) {
      console.warn('Neural scene could not initialize; showing the CSS fallback.', error);
      cleanup();
      setFallback(true);
      return cleanup;
    }
  }, []);

  return <div className={`intelligence-field${fallback ? ' field-fallback' : ''}`} ref={mountRef} aria-hidden="true"><div className="field-fallback-art" /></div>;
}

