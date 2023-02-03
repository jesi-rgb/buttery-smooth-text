import { useFrame } from '@react-three/fiber'
import { LayerMaterial, Fresnel, Displace } from 'lamina'
import { useRef } from 'react'
import { useControls } from 'leva'
import { Grid, Stars } from '@react-three/drei'

export default function Flower() {
  const mesh = useRef()
  useFrame((state, delta) => {
    mesh.current.rotation.z += delta / 2
  })

  const controls = useControls({
    noiseStrength: { value: 0.2, min: 0, max: 1, step: 0.01 },
    noiseScale: { value: 1 },
  })

  return (
    <group>
      <mesh rotation-y={Math.PI / 2} scale={[4, 4, 4]} ref={mesh}>
        <torusKnotGeometry args={[0.4, 0.05, 400, 32, 3, 7]} />
        <LayerMaterial color='hotpink'>
          <Fresnel mode='lighten' color='yellow' intensity={0.9} power={3} bias={0} />
          <Displace strength={controls.noiseStrength} scale={controls.noiseScale} />
        </LayerMaterial>
      </mesh>
    </group>
  )
}
