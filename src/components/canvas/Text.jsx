import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Center, Text3D } from '@react-three/drei'

export default function Text({ text = 'butter', textOptions, ...props }) {
  const mesh = useRef(null)

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime()
    mesh.current.rotation.y += t / 10000
    // mesh.current.rotation.x = Math.cos(t) * (Math.PI / 8)
    // mesh.current.rotation.z -= delta / 4
  })

  return (
    <group ref={mesh} {...props}>
      <Center>
        <Text3D font='/fonts/kyiv-serif.json' {...textOptions}>
          {text}
          <meshNormalMaterial />
        </Text3D>
      </Center>
    </group>
  )
}
