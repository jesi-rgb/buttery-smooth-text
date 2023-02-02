import { useFrame } from '@react-three/fiber'
import { LayerMaterial, Base, Depth, Fresnel } from 'lamina'
import { useRef } from 'react'

export default function Flower({ base = '#123456', colorA = '#123', colorB = '#414' }) {
  const mesh = useRef()
  const depth = useRef()
  useFrame((state, delta) => {
    mesh.current.rotation.z += delta / 2
    depth.current.origin.set(-state.mouse.y, state.mouse.x, 0)
  })

  return (
    <mesh rotation-y={Math.PI / 2} scale={[5, 5, 5]} ref={mesh}>
      <torusKnotGeometry args={[0.4, 0.05, 400, 32, 3, 7]} />
      <LayerMaterial>
        {/* <Base color={'#AA11EE'} alpha={1} mode='normal' /> */}
        <Depth colorA={colorB} colorB={colorA} alpha={0.8} mode='normal' near={0} far={3} origin={[1, 1, 1]} />
        <Depth
          ref={depth}
          colorA='aquamarine'
          colorB='black'
          alpha={1}
          mode='lighten'
          near={13}
          far={19}
          origin={[1, 0, 0]}
        />
        <Fresnel mode='softlight' color='hotpink' intensity={0.9} power={3} bias={0} />
      </LayerMaterial>
    </mesh>
  )
}
