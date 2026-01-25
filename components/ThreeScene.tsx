import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { PerspectiveCamera, Float, MeshDistortMaterial, Text } from '@react-three/drei';
import * as THREE from 'three';

const COMMANDS = [
  '<div>',
  'console.log()',
  'import React',
  'const App = () =>',
  'npm install',
  '<p>Hello World</p>',
  'display: flex;',
  'justify-content: center;',
  'align-items: center;',
  '<input type="text" />',
  'function init() {}',
  'background-color: #000;',
  'useEffect(() => {})',
  'document.getElementById',
  'className="hero"',
  '<span></span>',
  'border-radius: 50%;',
  'git push origin main',
];

const CodeColumn = ({ x, y, z, delay }: { x: number; y: number; z: number; delay: number }) => {
  const ref = useRef<THREE.Group>(null!);
  // Ultra slow speed
  const speed = useMemo(() => 0.01 + Math.random() * 0.02, []);
  const commands = useMemo(() => {
    return Array.from({ length: 1 }).map(() => COMMANDS[Math.floor(Math.random() * COMMANDS.length)]);
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime() + delay;
    // Move towards camera (Z-axis like stars) very slowly
    ref.current.position.z += speed * 5;

    // Reset position when too close
    if (ref.current.position.z > 50) {
      ref.current.position.z = -150;
      ref.current.position.x = (Math.random() - 0.5) * 200;
      ref.current.position.y = (Math.random() - 0.5) * 100;
    }

    // Very gentle rotation
    ref.current.rotation.z = Math.sin(t * 0.05) * 0.1;
  });

  return (
    <group ref={ref} position={[x, y, z]}>
      {commands.map((cmd, i) => (
        <Text
          key={i}
          position={[0, 0, 0]}
          fontSize={0.8} // Tiny
          color="#a5b4fc"
          opacity={0.08} // Ghostly
          transparent
          anchorX="center"
          anchorY="middle"
        >
          {cmd}
        </Text>
      ))}
    </group>
  );
};

const CodeMatrix = () => {
  const columns = useMemo(() => {
    const cols = [];
    // Creating a 3D cloud of items for star-field effect
    for (let i = 0; i < 60; i++) {
      cols.push({
        x: (Math.random() - 0.5) * 200,
        y: (Math.random() - 0.5) * 100,
        z: -150 + Math.random() * 200,
        delay: Math.random() * 100,
      });
    }
    return cols;
  }, []);

  return (
    <group>
      {columns.map((col, i) => (
        <CodeColumn key={i} {...col} />
      ))}
    </group>
  );
};

const ThreeScene: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10 bg-[#020617] overflow-hidden">
      <Canvas
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <PerspectiveCamera makeDefault position={[0, 0, 50]} fov={75} near={0.1} far={2000} />
        <color attach="background" args={['#020617']} />
        <ambientLight intensity={0.4} />
        <pointLight position={[50, 50, 50]} intensity={2} color="#4f46e5" />
        <pointLight position={[-50, -50, -50]} intensity={1} color="#818cf8" />

        {/* Removed all floating shapes/balls, only code remains */}
        <CodeMatrix />

        <fog attach="fog" args={['#020617', 20, 250]} />
      </Canvas>

      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.5)_50%),linear-gradient(90deg,rgba(79,70,229,0.1),rgba(0,0,0,0),rgba(79,70,229,0.1))] bg-[length:100%_4px,4px_100%]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,#020617_100%)] pointer-events-none opacity-50" />
    </div>
  );
};

export default ThreeScene;
