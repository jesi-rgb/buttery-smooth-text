import { Canvas, extend } from '@react-three/fiber'
import { Environment, OrbitControls, Preload } from '@react-three/drei'

export default function Scene({ children, ...props }) {
  // Everything defined in here will persist between route changes, only children are swapped
  return (
    <Canvas
      {...props}
      orthographic
      camera={{
        position: [-0.1, 0.2, 0.5],
        near: -50,
        far: 10000,
        zoom: 1.5 * 70,
      }}>
      <directionalLight position={[-0.9, 10.1, -0.1]} intensity={54.75} />
      <ambientLight intensity={2.75} />
      {children}
      <Preload all />
      <Environment preset='city' />
      <OrbitControls makeDefault rotateSpeed={2} minPolarAngle={0} maxPolarAngle={Math.PI / 2.5} />
    </Canvas>
  )
}
