import { Canvas } from '@react-three/fiber'
import { Loader, OrbitControls, Preload } from '@react-three/drei'
import { Suspense, useRef } from 'react'

export default function Scene({ children }) {
  // Everything defined in here will persist between route changes, only children are swapped
  let ref = useRef()
  return (
    <>
      <div ref={ref} className='w-screen mx-auto border-2 max-w-7xl 2xl:w-[75%] h-[75%]'>
        <Canvas
          camera={{
            position: [-10, 2.2, 3.5],
          }}>
          <Suspense fallback={null}>
            <directionalLight position={[-0.9, 10.1, -0.1]} intensity={12} />
            <ambientLight intensity={2.75} />

            {children}

            <Preload all />
            <OrbitControls />
          </Suspense>
        </Canvas>
        <Loader initialState={(active) => active} dataInterpolation={(p) => `Loading ${p.toFixed(2)}%`} />
      </div>
    </>
  )
}
