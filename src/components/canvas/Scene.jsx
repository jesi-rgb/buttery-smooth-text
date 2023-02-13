import { Canvas, extend } from '@react-three/fiber'
import { Environment, Loader, OrbitControls, Preload } from '@react-three/drei'
import { Suspense } from 'react'

export default function Scene({ children, ...props }) {
  // Everything defined in here will persist between route changes, only children are swapped
  return (
    <>
      <Canvas
        {...props}
        camera={{
          position: [-10, 2.2, 3.5],
        }}>
        <Suspense fallback={null}>
          <directionalLight position={[-0.9, 10.1, -0.1]} intensity={54.75} />
          <ambientLight intensity={2.75} />
          {children}
          <Preload all />
          <OrbitControls makeDefault rotateSpeed={2} />
        </Suspense>
      </Canvas>
      <Loader initialState={(active) => active} dataInterpolation={(p) => `Loading ${p.toFixed(2)}%`} />
    </>
  )
}
