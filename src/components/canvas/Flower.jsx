import {
  Backdrop,
  Caustics,
  Effects,
  Environment,
  MeshReflectorMaterial,
  MeshTransmissionMaterial,
  MeshmirrorMaterial,
  Plane,
  useTexture,
} from '@react-three/drei'
import { extend, useFrame } from '@react-three/fiber'
import { LayerMaterial, Fresnel, Texture, Matcap } from 'lamina'
import { button, useControls } from 'leva'
import { useEffect, useRef, useState } from 'react'
import { FresnelShader } from 'three-stdlib'

export default function Flower({ color = 'hotpink' }) {
  const mesh = useRef(null)
  const materialProps = useTexture({
    // map: '/textures/terrain/aerial_rocks_02_diff_1k.jpg',
    // displacementMap: '/textures/terrain/aerial_rocks_02_disp_1k.png',
    // aoMap: '/textures/terrain/aerial_rocks_02_arm_1k.jpg',
    // roughnessMap: '/textures/terrain/aerial_rocks_02_arm_1k.jpg',
    // metalnessMap: '/textures/terrain/aerial_rocks_02_arm_1k.jpg',
    map: '/textures/metal_plate/metal_plate_diff_1k.jpg',
    // displacementMap: '/textures/metal_plate/metal_plate_disp_1k.png',
    aoMap: '/textures/metal_plate/metal_plate_arm_1k.jpg',
    roughnessMap: '/textures/metal_plate/metal_plate_arm_1k.jpg',
    metalnessMap: '/textures/metal_plate/metal_plate_arm_1k.jpg',
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
  let [metal, setMetal] = useState(true)
  let [mirror, setMirror] = useState(false)
  let [enableBg, setEnableBg] = useState(false)
  let [background, setBackground] = useState(
    'https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/2k/christmas_photo_studio_07_2k.hdr',
  )

  const controls = useControls({
    Glass: button((get) => {
      setMirror((mirror) => !mirror)
      setMetal(false)
    }),
    Metal: button((get) => {
      setMetal((metal) => !metal)
      setTexture(false)
      setShiny(false)
      setMirror(false)
    }),
    Texture: button((get) => {
      setTexture((texture) => !texture)
      setMetal(false)
      setMirror(false)
    }),
    Bloom: button((get) => setBloom((bloom) => !bloom)),
    Motion: button((get) => setMotion((motion) => !motion)),
    Shiny: button((get) => {
      setShiny((shiny) => !shiny)
      setMetal(false)
    }),
    'Base shape': button((get) => {}, { disabled: true }),
  })
  const moreControls = useControls('Background', {
    'Enable Background': button((get) => setEnableBg((enableBg) => !enableBg)),
    'Photo Studio': button((get) =>
      setBackground('https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/2k/christmas_photo_studio_07_2k.hdr'),
    ),
    'Lake Pier': button((get) =>
      setBackground('https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/2k/lake_pier_2k.hdr'),
    ),
    'Neon Studio': button((get) =>
      setBackground('https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/2k/neon_photostudio_2k.hdr'),
    ),
    'Solitude Night': button((get) =>
      setBackground('https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/2k/solitude_night_2k.hdr'),
    ),
  })

  return (
    <>
      <Environment ground={enableBg ? { height: 10, scale: 100, radius: 70 } : null} files={background} blur={10} />
      <mesh position-y={2} ref={mesh}>
        <torusKnotGeometry args={[1.4, 0.2, 400, 32, 3, 7]} />
        {(shiny || texture) && (
          <LayerMaterial color={color}>
            {shiny && <Fresnel mode='lighten' color='yellow' alpha={1} intensity={0.9} power={3} bias={0} />}
            {texture && <Texture {...materialProps} alpha={0.7} mode='add' />}
          </LayerMaterial>
        )}
        {metal && (
          <MeshReflectorMaterial resolution={128} roughness={0.01} blur={10} mixBlur={1} color={color} metalness={1} />
        )}
        {mirror && <MeshTransmissionMaterial thickness={10} chromaticAberration={1} />}
      </mesh>
    </>
  )
}
