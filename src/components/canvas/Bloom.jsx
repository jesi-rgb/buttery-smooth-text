import { Effects } from '@react-three/drei'
import { extend } from '@react-three/fiber'
import { UnrealBloomPass } from 'three-stdlib'

extend({ UnrealBloomPass })
export default function Bloomy({ strength, radius }) {
  return (
    <Effects disableGamma>
      {/* threshhold has to be 1, so nothing at all gets bloom by default */}
      <unrealBloomPass threshold={1 - strength > 0.2 ? 1 - strength : 0.2} strength={strength} radius={radius} />
    </Effects>
  )
}
