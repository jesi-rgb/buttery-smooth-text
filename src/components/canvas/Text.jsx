import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Center, Edges, MeshTransmissionMaterial, Text3D, useCursor } from '@react-three/drei'
import { useControls } from 'leva'

export default function Text({ text = 'butter', ...props }) {
  const mesh = useRef(null)
  const [hovered, setHover] = useState(false)
  useCursor(hovered)

  const controls = useControls({
    textColor: { value: '#ff4eb8' },
    edges: { value: '#00ffff' },
    roughness: { value: 1, min: 0, max: 1, step: 0.05 },
    transmission: { value: 0.5, min: 0, max: 1, step: 0.1 },
    metalness: { value: 0.5, min: 0, max: 1, step: 0.1 },
    thiccness: { value: 1, step: 1 },
    bevelEnabled: { value: false },
    bevelSize: { value: 0.1 },
  })

  let textOptions = {
    height: controls.thiccness,
    bevelEnabled: controls.bevelEnabled,
    bevelSize: controls.bevelSize,
    bevelThickness: 0.1,
    bevelSegments: 30,
  }
  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime()
    mesh.current.rotation.y += 0.002
    // mesh.current.rotation.x = Math.cos(t) * (Math.PI / 8)
    // mesh.current.rotation.z -= delta / 4
  })

  return (
    <group ref={mesh} {...props} onPointerOver={() => setHover(true)} onPointerOut={() => setHover(false)}>
      <Center>
        <Text3D font='/fonts/kyiv-serif.json' {...textOptions}>
          {text}
          {/* <meshNormalMaterial /> */}
          <meshPhysicalMaterial roughness={controls.roughness} color={controls.textColor} />
          {/* <MeshTransmissionMaterial
            resolution={8}
            samples={16}
            color={controls.text}
            metalness={controls.metalness}
            transmission={controls.transmission}
            envMapIntensity={1}
          /> */}
          <Edges
            scale={1.0}
            threshold={15} // Display edges only when the angle between two faces exceeds this value (default=15 degrees)
            color={controls.edges}
          />
        </Text3D>
      </Center>
    </group>
  )
}
