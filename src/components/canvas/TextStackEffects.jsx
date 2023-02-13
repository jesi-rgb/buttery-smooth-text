import {
  Environment,
  MeshReflectorMaterial,
  MeshTransmissionMaterial,
  useTexture,
  Text3D,
  Center,
} from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { LayerMaterial, Fresnel, Texture } from 'lamina'
import { button, useControls } from 'leva'
import { useRef, useState } from 'react'
import Bloomy from './Bloom'

export default function TextStackEffects({ color = 'hotpink' }) {
  const mesh = useRef(null)
  const materialProps = useTexture({
    map: '/textures/metal_plate/metal_plate_diff_1k.jpg',
    displacementMap: '/textures/metal_plate/metal_plate_disp_1k.png',
    aoMap: '/textures/metal_plate/metal_plate_arm_1k.jpg',
    roughnessMap: '/textures/metal_plate/metal_plate_arm_1k.jpg',
    metalnessMap: '/textures/metal_plate/metal_plate_arm_1k.jpg',
  })

  useFrame((state, delta) => {
    mesh.current.rotation.z += motion ? delta / 2 : 0
    mesh.current.rotation.x += motion ? delta * 1.2 : 0
    mesh.current.rotation.y += motion ? delta * 1.4 : 0
  })

  const backgrounds = {
    'Photo Studio': 'https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/2k/christmas_photo_studio_07_2k.hdr',
    'Lake Pier': 'https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/2k/christmas_photo_studio_07_2k.hdr',
    'Neon Studio': 'https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/2k/neon_photostudio_2k.hdr',
    'Solitude Night': 'https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/2k/solitude_night_2k.hdr',
  }
  let [shiny, setShiny] = useState(false)
  let [bloom, setBloom] = useState(false)
  let [motion, setMotion] = useState(false)
  let [texture, setTexture] = useState(false)
  let [metal, setMetal] = useState(true)
  let [mirror, setMirror] = useState(false)
  let [enableBg, setEnableBg] = useState(false)
  let [background, setBackground] = useState(backgrounds['Photo Studio'])

  let textOptions = {
    height: 0.3,
    bevelEnabled: true,
    bevelSize: 0.05,
    bevelThickness: Math.abs(0.05 * 1.4),
    bevelSegments: 70,
  }
  const textControls = useControls({
    text: { value: 'butter' },
    font: {
      options: {
        'Kyiv Serif': 'kyiv-serif',
        'Space Grotesk': 'space-grotesk',
        'Lora Italic': 'lora',
        Oswald: 'oswald',
        'Abril Fatface': 'abril-fatface',
        Lobster: 'lobster',
      },
      value: 'abril-fatface',
    },
    color: { value: '#837600' },
  })

  const controls = useControls('Text', {
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
    'Toggle Background': button((get) => setEnableBg((enableBg) => !enableBg)),
    'Photo Studio': button((get) => setBackground(backgrounds['Photo Studio'])),
    'Lake Pier': button((get) => setBackground(backgrounds['Lake Pier'])),
    'Neon Studio': button((get) => setBackground(backgrounds['Neon Studio'])),
    'Solitude Night': button((get) => setBackground(backgrounds['Solitude Night'])),
  })

  return (
    <>
      <Environment ground={enableBg ? { height: 10, scale: 100, radius: 70 } : null} files={background} blur={10} />
      {bloom && <Bloomy intensity={0.7} />}
      <mesh position-y={2} ref={mesh}>
        <Center>
          <Text3D curveSegments={10} font={'/fonts/' + textControls.font + '.json'} {...textOptions}>
            {textControls.text}
            {(shiny || texture) && (
              <LayerMaterial color={textControls.color}>
                {shiny && <Fresnel mode='lighten' color='white' alpha={0.6} intensity={0.9} power={3} bias={0} />}
                {texture && <Texture {...materialProps} alpha={0.8} mode='add' />}
              </LayerMaterial>
            )}
            {metal && (
              <MeshReflectorMaterial
                resolution={8}
                roughness={0.01}
                blur={[30, 30]}
                mixBlur={0.3}
                color={textControls.color}
                metalness={1}
                distortion={1}
              />
            )}
            {mirror && <MeshTransmissionMaterial thickness={10} chromaticAberration={1} />}
          </Text3D>
        </Center>
      </mesh>
    </>
  )
}
