import { Effects } from '@react-three/drei'
import { extend, useFrame } from '@react-three/fiber'
import { LayerMaterial, Fresnel } from 'lamina'
import { button, useControls } from 'leva'
import { useEffect, useRef, useState } from 'react'
import Bloomy from './Bloom'

export default function Flower({ color = 'hotpink' }) {
  const mesh = useRef(null)

  useFrame((state, delta) => {
    mesh.current.rotation.z += motion ? delta / 2 : 0
    mesh.current.rotation.x += motion ? delta * 1.2 : 0
    mesh.current.rotation.y += motion ? delta * 1.4 : 0
  })

  let [shiny, setShiny] = useState(false)
  let [bloom, setBloom] = useState(false)
  let [motion, setMotion] = useState(false)

  const controls = useControls({
    Bloom: button((get) => setBloom((bloom) => !bloom)),
    Motion: button((get) => setMotion((motion) => !motion)),
    Shiny: button((get) => setShiny((shiny) => !shiny)),
    'Base shape': button((get) => {}, { disabled: true }),
  })

  return (
    <group ref={mesh}>
      {bloom && <Bloomy intensity={0.8} />}
      <mesh rotation-y={Math.PI / 2} scale={[4, 4, 4]}>
        <torusKnotGeometry args={[0.4, 0.05, 400, 32, 3, 7]} />
        <LayerMaterial color={color}>
          <Fresnel mode='lighten' color='yellow' alpha={shiny ? 1 : 0} intensity={0.9} power={3} bias={0} />
        </LayerMaterial>
      </mesh>
    </group>
  )
}
