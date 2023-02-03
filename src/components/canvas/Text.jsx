import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Center, Float, Text3D } from '@react-three/drei'
import { useControls } from 'leva'
import { Depth, Displace, Fresnel, LayerMaterial } from 'lamina'
import Bloom from './Bloom'

export default function Text({ ...props }) {
  const mesh = useRef(null)

  const depth = useRef(null)

  const controls = useControls({
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
    textColor: { value: '#837600' },
    roughness: { value: 0.05, min: 0.05, max: 1, step: 0.05 },
    reflections: { value: 0.7, min: 0, max: 1, step: 0.1 },
    // shinyness: { value: 0.2, min: 0, max: 0.4, step: 0.05 },
    thiccness: { value: 0.3, step: 0.1 },
    balloonMode: { value: true },
    balloonInflation: { value: 0.05, step: 0.01 },
    metalness: { value: 0.8, min: 0, max: 1, step: 0.05 },
    // noiseStrength: { value: 0, min: 0, max: 1, step: 0.1 },
    // noiseScale: { value: 1 },
  })

  let textOptions = {
    height: controls.thiccness,
    bevelEnabled: controls.balloonMode,
    bevelSize: controls.balloonInflation,
    bevelThickness: 0.05,
    bevelSegments: 30,
  }
  useFrame((state, delta) => {
    depth.current.origin.set(state.mouse.y * 10, state.mouse.x * 10, 0)
  })

  return (
    <group ref={mesh} {...props}>
      <Center>
        <Float>
          <Text3D curveSegments={25} font={'/fonts/' + controls.font + '.json'} {...textOptions}>
            {controls.text}
            <LayerMaterial
              color={controls.textColor}
              lighting={'physical'}
              roughness={controls.roughness}
              reflectivity={1}>
              <Depth
                ref={depth}
                near={0.23}
                far={4}
                mode='overlay'
                alpha={controls.reflections}
                origin={[0, 0, 0]}
                colorA={'#fff'}
                colorB={controls.textColor}
              />
              {/* <Displace mapping='local' strength={controls.noiseStrength} scale={controls.noiseScale} /> */}
              <Fresnel mode='ligthen' alpha={controls.metalness} color={controls.textColor} />
            </LayerMaterial>
          </Text3D>
        </Float>
      </Center>
    </group>
  )
}
