import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Center, Float, Text3D } from '@react-three/drei'
import { useControls } from 'leva'
import { Depth, Displace, Fresnel, LayerMaterial } from 'lamina'

export default function Text({ ...props }) {
  const mesh = useRef(null)

  const depth = useRef(null)

  const controls = useControls({
    text: { value: 'butter' },
    font: {
      options: { 'Kyiv Serif': 'kyiv-serif', 'Space Grotesk': 'space-grotesk', 'Lora Italic': 'lora' },
      value: 'kyiv-serif',
    },
    textColor: { value: '#ff4eb8' },
    roughness: { value: 1, min: 0.05, max: 1, step: 0.05 },
    reflections: { value: 0.5, min: 0, max: 1, step: 0.1 },
    shinyness: { value: 0.2, min: 0, max: 0.4, step: 0.05 },
    thiccness: { value: 0.3, step: 0.1 },
    balloonMode: { value: false },
    balloonInflation: { value: 0.1 },
    fresnelAlpha: { value: 0.5, min: 0, max: 1, step: 0.1 },
    noiseStrength: { value: 0, min: 0, max: 1, step: 0.1 },
    noiseScale: { value: 1 },
  })

  let textOptions = {
    height: controls.thiccness,
    bevelEnabled: controls.balloonMode,
    bevelSize: controls.balloonInflation,
    bevelThickness: 0.05,
    bevelSegments: 30,
  }
  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime()
    // mesh.current.rotation.y += 0.002
    depth.current.origin.set(state.mouse.y * 10, state.mouse.x * 10, 0)
    // mesh.current.rotation.x = Math.cos(t) * (Math.PI / 8)
    // mesh.current.rotation.z -= delta / 4
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
              transmission={controls.reflections}
              roughness={controls.roughness}
              reflectivity={1}>
              <Depth
                ref={depth}
                near={0.23}
                far={4}
                mode='screen'
                alpha={controls.shinyness}
                origin={[0, 0, 0]}
                colorA={'#fff'}
                colorB={controls.textColor}
              />
              <Displace mapping='local' strength={controls.noiseStrength} scale={controls.noiseScale} />
              <Fresnel mode='ligthen' alpha={controls.fresnelAlpha} color={controls.textColor} />
            </LayerMaterial>
          </Text3D>
        </Float>
      </Center>
    </group>
  )
}
