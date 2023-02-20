import usePostProcess from '@/templates/hooks/usePostprocess'
import {
  Environment,
  MeshReflectorMaterial,
  MeshTransmissionMaterial,
  useTexture,
  Text3D,
  Center,
  Float,
  useVideoTexture,
  useCursor,
} from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { button, useControls } from 'leva'
import { useEffect, useRef, useState } from 'react'

export default function TextStackEffects({ effect }) {
  const mesh = useRef(null)
  const materialProps = useTexture({
    map: '/textures/metal_plate/metal_plate_diff_1k.jpg',
    displacementMap: '/textures/metal_plate/metal_plate_disp_1k.png',
    aoMap: '/textures/metal_plate/metal_plate_arm_1k.jpg',
    roughnessMap: '/textures/metal_plate/metal_plate_arm_1k.jpg',
    metalnessMap: '/textures/metal_plate/metal_plate_arm_1k.jpg',
  })

  const [hovered, setHover] = useState(false)

  const videoTexture = useVideoTexture('/textures/video/10.mp4')

  const backgrounds = {
    'Photo Studio': 'https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/2k/christmas_photo_studio_07_2k.hdr',
    'Lake Pier': 'https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/lake_pier_1k.hdr',
    'Neon Studio': 'https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/2k/neon_photostudio_2k.hdr',
    'Solitude Night': 'https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/2k/solitude_night_2k.hdr',
  }

  let [motion, setMotion] = useState(false)
  let [texture, setTexture] = useState(false)
  let [video, setVideoTexture] = useState(false)
  let [metal, setMetal] = useState(true)
  let [mirror, setMirror] = useState(false)
  let [enableBg, setEnableBg] = useState(true)
  let [background, setBackground] = useState(backgrounds['Photo Studio'])

  const draggableEffects = {
    Texture: () => {
      setTexture(true)
      setMetal(false)
      setMirror(false)
    },
    Motion: () => {
      setMotion(true)
    },
    Glass: () => {
      setMirror(true)
      setMetal(false)
    },
    Metal: () => {
      setMetal(true)
      setTexture(false)
      setMirror(false)
    },
  }

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
      setMirror(false)
    }),
    Video: button((get) => {
      setVideoTexture((video) => !video)
      setMetal(false)
      setMirror(false)
    }),
    Texture: button((get) => {
      setTexture((texture) => !texture)
      setMetal(false)
      setMirror(false)
    }),
    Motion: button((get) => setMotion((motion) => !motion)),

    'Base shape': button((get) => {}, { disabled: true }),
  })

  const moreControls = useControls('Background', {
    'Toggle Background': button((get) => setEnableBg((enableBg) => !enableBg)),
    'Photo Studio': button((get) => setBackground(backgrounds['Photo Studio'])),
    'Lake Pier': button((get) => setBackground(backgrounds['Lake Pier'])),
    'Neon Studio': button((get) => setBackground(backgrounds['Neon Studio'])),
    'Solitude Night': button((get) => setBackground(backgrounds['Solitude Night'])),
  })

  useCursor(hovered, 'pointer')

  useEffect(() => {
    draggableEffects[effect]()
  })

  return (
    <>
      <Environment ground={enableBg ? { height: 10, scale: 100, radius: 70 } : null} files={background} blur={10} />
      <mesh position-y={2}>
        <Float speed={motion ? 3 : 0}>
          <Center>
            <Text3D
              ref={mesh}
              onPointerOut={(e) => setHover(false)}
              onPointerOver={(e) => {
                setHover(true)
              }}
              curveSegments={10}
              font={'/fonts/' + textControls.font + '.json'}
              {...textOptions}>
              {textControls.text}

              {texture && (
                <meshStandardMaterial
                  envMapIntensity={1}
                  aoMapIntensity={2}
                  displacementScale={0.03}
                  {...materialProps}
                  metalness={1}
                  roughness={0.3}
                />
              )}
              {video && <meshBasicMaterial map={videoTexture} toneMapped={false} />}

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
              {mirror && <MeshTransmissionMaterial samples={2} thickness={5} chromaticAberration={0.5} />}
            </Text3D>
          </Center>
        </Float>
      </mesh>
    </>
  )
}
