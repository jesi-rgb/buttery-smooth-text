import { useEffect, useRef, useState } from 'react'
import { extend, useFrame } from '@react-three/fiber'
import { Center, Float, Text3D, useTexture, useVideoTexture } from '@react-three/drei'
import { useControls } from 'leva'
import { Depth, Fresnel, LayerMaterial, Matcap, Texture } from 'lamina'
import Background from './Background'
import { Glitter } from '../canvas/Layers/Glitter'
import { UVMapping } from 'three'

export default function Text({ ...props }) {
  extend({ Glitter })
  const mesh = useRef(null)

  const materialProps = useTexture({
    // map: '/textures/metal_plate/metal_plate_diff_1k.jpg',
    displacementMap: '/textures/metal_plate/metal_plate_disp_1k.png',
  })

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
    matte: { value: 0.05, min: 0.05, max: 1, step: 0.05 },
    reflections: { value: 0.7, min: 0, max: 1, step: 0.1 },
    thiccness: { value: 0.3, min: -20, max: 20, step: 0.1 },
    balloonMode: { value: true },
    balloonInflation: { value: 0.05, min: -1, max: 1, step: 0.01 },
    metalness: { value: 0.8, min: 0, max: 1, step: 0.05 },
    shinyness: { value: 0, min: 0, max: 1.5, step: 0.1 },
    // noiseStrength: { value: 0, min: 0, max: 1, step: 0.1 },
    // noiseScale: { value: 1 },
  })

  let textOptions = {
    height: controls.thiccness,
    bevelEnabled: controls.balloonMode,
    bevelSize: controls.balloonInflation,
    bevelThickness: Math.abs(controls.balloonInflation * 1.4),
    bevelSegments: 70,
  }
  useFrame((state, delta) => {
    // depth.current.origin.set(state.mouse.y * 10, state.mouse.x * 10, 0)
  })

  return (
    <group ref={mesh} {...props}>
      <Center>
        <Float>
          <Text3D curveSegments={10} font={'/fonts/' + controls.font + '.json'} {...textOptions}>
            {controls.text}
            <LayerMaterial
              alpha={0.4}
              color={controls.textColor}
              lighting={'physical'}
              roughness={controls.matte}
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
              <Fresnel mode='ligthen' alpha={controls.metalness} color={controls.textColor} />

              <Texture {...materialProps} alpha={1} />
            </LayerMaterial>
          </Text3D>
        </Float>
      </Center>
      <Background />
    </group>
  )
}
