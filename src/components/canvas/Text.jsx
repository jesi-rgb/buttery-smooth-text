import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Center, MeshTransmissionMaterial, Text3D, useCursor } from '@react-three/drei'
import { useControls } from 'leva'
import { Flower } from './Flower'
import { Base, Depth, Fresnel, LayerMaterial } from 'lamina'

export default function Text({ ...props }) {
  const mesh = useRef(null)
  const [hovered, setHover] = useState(false)

  const depth = useRef(null)

  useCursor(hovered)

  const controls = useControls({
    text: { value: 'butter' },
    textColor: { value: '#ff4eb8' },
    edges: { value: '#00ffff' },
    roughness: { value: 1, min: 0, max: 1, step: 0.05 },
    transmission: { value: 0.5, min: 0, max: 1, step: 0.1 },
    metalness: { value: 0.5, min: 0, max: 1, step: 0.1 },
    thiccness: { value: 1, step: 0.1 },
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
    // depth.current.origin.set(-state.mouse.y, state.mouse.x, 0)
    // mesh.current.rotation.x = Math.cos(t) * (Math.PI / 8)
    // mesh.current.rotation.z -= delta / 4
  })

  return (
    <group ref={mesh} {...props} onPointerOver={() => setHover(true)} onPointerOut={() => setHover(false)}>
      <Center>
        <Text3D font='/fonts/kyiv-serif.json' {...textOptions}>
          {controls.text}
          <LayerMaterial>
            <Depth
              ref={depth}
              colorA='yellow'
              colorB='yellow'
              alpha={0.9}
              mode='multiply'
              near={1}
              far={19}
              origin={[1, 0, 0]}
            />
            <Fresnel mode='multiply' alpha={1} color={controls.textColor} />
          </LayerMaterial>
        </Text3D>
      </Center>
    </group>
  )
}
