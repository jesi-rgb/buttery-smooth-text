import { useFrame, useThree } from '@react-three/fiber'
import { useEffect, useRef, useState } from 'react'
import { EffectComposer, RenderPass, UnrealBloomPass } from 'three-stdlib'

import { extend } from '@react-three/fiber'

export default function Bloom({ children }) {
  extend({ EffectComposer, RenderPass, UnrealBloomPass })
  const { gl, camera, size } = useThree()
  const [scene, setScene] = useState()
  const composer = useRef()
  useEffect(() => void scene && composer.current.setSize(size.width, size.height), [size])
  useFrame(() => scene && composer.current.render(), 1)
  return (
    <>
      <scene ref={setScene}>{children}</scene>
      <effectComposer ref={composer} args={[gl]}>
        <renderPass attachArray='passes' scene={scene} camera={camera} />
        <UnrealBloomPass attachArray='passes' args={[undefined, 1.5, 1, 0]} />
      </effectComposer>
    </>
  )
}
