import { Effects } from '@react-three/drei'
import { extend } from '@react-three/fiber'
import { UnrealBloomPass } from 'three-stdlib'

extend({ UnrealBloomPass })
export default function Bloomy({ intensity }) {
  return (
    <Effects disableGamma>
      {/* threshhold has to be 1, so nothing at all gets bloom by default */}
      <unrealBloomPass threshold={1 - intensity > 0.2 ? 1 - intensity : 0.2} strength={intensity} radius={intensity} />
    </Effects>
  )
}
