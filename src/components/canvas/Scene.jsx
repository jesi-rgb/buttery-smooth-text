import { Canvas } from '@react-three/fiber'
import { Sky, ContactShadows, Environment, OrbitControls, Preload, Stars, Grid } from '@react-three/drei'

export default function Scene({ children, ...props }) {
  // Everything defined in here will persist between route changes, only children are swapped
  return (
    <Canvas {...props}>
      <directionalLight intensity={4.75} />
      <ambientLight intensity={1.75} />
      {children}
      <Preload all />
      <Environment preset='night' />
      <OrbitControls enableZoom={false} makeDefault rotateSpeed={2} minPolarAngle={0} maxPolarAngle={Math.PI / 2.5} />
      {/* <Sky /> */}
      <Stars radius={30} depth={50} count={9000} factor={4} saturation={1} fade speed={1} />
      <Grid
        position={[0, -0.01, 0]}
        args={[100.5, 100.5]}
        sectionSize={2}
        cellSize={1}
        cellColor='#BBCCEE'
        sectionColor='#AABBCC'
        fadeDistance={30}
      />
    </Canvas>
  )
}
