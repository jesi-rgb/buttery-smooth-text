import { Canvas } from '@react-three/fiber'
import { Environment, OrbitControls, Preload, Stars, Grid } from '@react-three/drei'

export default function Scene({ children, ...props }) {
  // Everything defined in here will persist between route changes, only children are swapped
  return (
    <Canvas
      {...props}
      orthographic
      camera={{
        position: [-0.1, 0.2, 0.5],
        near: -10000,
        far: 10000,
        zoom: 1.5 * 70,
      }}>
      <directionalLight position={[-0.1, 0, -0.5]} intensity={54.75} />
      <ambientLight intensity={2.75} />
      {children}
      <Preload all />
      <Environment preset='city' />
      <OrbitControls makeDefault rotateSpeed={2} minPolarAngle={0} maxPolarAngle={Math.PI / 2.5} />
      <Stars radius={10} depth={25} count={15000} factor={4} saturation={0.3} fade speed={1} />
      <Grid
        position={[0, -1.1, 0]}
        args={[100.5, 100.5]}
        sectionSize={2}
        cellSize={1}
        cellColor='#BBCCEE'
        sectionColor='#AABBCC'
        sectionThickness={0.8}
        fadeDistance={30}
      />
    </Canvas>
  )
}
