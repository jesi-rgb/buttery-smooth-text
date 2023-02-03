import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Center, Text3D } from '@react-three/drei'
import { useControls } from 'leva'
import { Displace, Fresnel, LayerMaterial } from 'lamina'

export default function Text({ ...props }) {
  const mesh = useRef(null)

  const depth = useRef(null)

  const controls = useControls({
    text: { value: 'butter' },
    font: { options: { 'Kyiv Serif': 'kyiv-serif', 'Space Grotesk': 'space-grotesk' }, value: 'kyiv-serif' },
    textColor: { value: '#ff4eb8' },
    edges: { value: '#00ffff' },
    roughness: { value: 1, min: 0, max: 1, step: 0.05 },
    transmission: { value: 0.5, min: 0, max: 1, step: 0.1 },
    metalness: { value: 0.5, min: 0, max: 1, step: 0.1 },
    thiccness: { value: 1, step: 0.1 },
    bevelEnabled: { value: false },
    bevelSize: { value: 0.1 },
    depthAlpha: { value: 1, min: 0, max: 1, step: 0.1 },
    fresnelAlpha: { value: 0.5, min: 0, max: 1, step: 0.1 },
    noiseStrength: { value: 0, min: 0, max: 1, step: 0.1 },
    noiseScale: { value: 1 },
  })

  let textOptions = {
    height: controls.thiccness,
    bevelEnabled: controls.bevelEnabled,
    bevelSize: controls.bevelSize,
    bevelThickness: 0.05,
    bevelSegments: 30,
  }
  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime()
    // mesh.current.rotation.y += 0.002
    // depth.current.origin.set(-state.mouse.y, state.mouse.x, 0)
    // mesh.current.rotation.x = Math.cos(t) * (Math.PI / 8)
    // mesh.current.rotation.z -= delta / 4
  })

  return (
    <group ref={mesh} {...props}>
      <Center>
        <Text3D curveSegments={25} font={'/fonts/' + controls.font + '.json'} {...textOptions}>
          {controls.text}
          <LayerMaterial color={controls.textColor}>
            <Fresnel mode='ligthen' alpha={controls.fresnelAlpha} color={controls.edges} />
            <Displace mapping='local' strength={controls.noiseStrength} scale={controls.noiseScale} />
          </LayerMaterial>
        </Text3D>
      </Center>
    </group>
  )
}
