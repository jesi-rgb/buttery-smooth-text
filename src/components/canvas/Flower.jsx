import { extend, useFrame } from '@react-three/fiber'
import { LayerMaterial, Fresnel } from 'lamina'
import { useRef } from 'react'
import EffectStack from '../dom/ui/EffectStack'

export default function Flower({ color = 'hotpink' }) {
  const mesh = useRef()
  useFrame((state, delta) => {
    mesh.current.rotation.z += delta / 2
  })

  return (
    <group>
      <mesh rotation-y={Math.PI / 2} scale={[4, 4, 4]} ref={mesh}>
        <torusKnotGeometry args={[0.4, 0.05, 400, 32, 3, 7]} />
        <LayerMaterial color={color}>
          <Fresnel mode='lighten' color='yellow' intensity={0.9} power={3} bias={0} />
        </LayerMaterial>
      </mesh>
    </group>
  )
}
