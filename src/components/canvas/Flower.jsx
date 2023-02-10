import { Caustics, Effects, MeshReflectorMaterial, Plane, useTexture } from '@react-three/drei'
import { extend, useFrame } from '@react-three/fiber'
import { LayerMaterial, Fresnel, Texture } from 'lamina'
import { button, useControls } from 'leva'
import { useEffect, useRef, useState } from 'react'
import { FresnelShader } from 'three-stdlib'
import Bloomy from './Bloom'

export default function Flower({ color = 'hotpink' }) {
  const mesh = useRef(null)
  const materialProps = useTexture({
    map: '/textures/metal_plate/metal_plate_diff_1k.jpg',
    displacementMap: '/textures/metal_plate/metal_plate_disp_1k.png',
    roughness: '/textures/metal_plate/metal_plate_rough_1k.jpg',
  })

  useFrame((state, delta) => {
    mesh.current.rotation.z += motion ? delta / 2 : 0
    mesh.current.rotation.x += motion ? delta * 1.2 : 0
    mesh.current.rotation.y += motion ? delta * 1.4 : 0
  })

  let [shiny, setShiny] = useState(false)
  let [bloom, setBloom] = useState(false)
  let [motion, setMotion] = useState(false)
  let [texture, setTexture] = useState(false)
  let [metal, setMetal] = useState(false)

  const controls = useControls({
    Metal: button((get) => setMetal((metal) => !metal)),
    Texture: button((get) => setTexture((texture) => !texture)),
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
          {shiny && <Fresnel mode='lighten' color='yellow' alpha={1} intensity={0.9} power={3} bias={0} />}
          {texture && <Texture {...materialProps} alpha={0.3} mode={'screen'} />}
        </LayerMaterial>
        {metal && (
          <MeshReflectorMaterial
            blur={[1000, 1000]}
            resolution={64}
            mixBlur={1}
            mixStrength={10}
            roughness={0}
            depthScale={1.2}
            minDepthThreshold={0.4}
            maxDepthThreshold={1.4}
            color={color}
            metalness={1}
          />
        )}
      </mesh>
    </group>
  )
}
