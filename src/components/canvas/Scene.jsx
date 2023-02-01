import { Canvas } from '@react-three/fiber'
import { Sky, ContactShadows, Environment, OrbitControls, Preload } from '@react-three/drei'

export default function Scene({ children, ...props }) {
  // Everything defined in here will persist between route changes, only children are swapped
  return (
    <Canvas {...props}>
      <directionalLight intensity={4.75} />
      <ambientLight intensity={1.75} />
      {children}
      <Preload all />
      <Environment preset='city' />
      <ContactShadows frames={1} position={[0, -0.5, 0]} scale={10} opacity={0.4} far={1} blur={2} />
      <OrbitControls makeDefault rotateSpeed={2} minPolarAngle={0} maxPolarAngle={Math.PI / 2.5} />
      {/* <Sky /> */}
    </Canvas>
  )
}
