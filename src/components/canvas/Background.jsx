import { Grid, Stars } from '@react-three/drei'

export default function Background() {
  return (
    <group>
      <Stars radius={40} depth={2} count={15000} factor={4} saturation={0.3} fade speed={1} />

      <Grid
        position={[0, -1.1, 0]}
        args={[100.5, 100.5]}
        sectionSize={2}
        cellSize={1}
        cellColor='#BBCCEE'
        sectionColor='#AABBCC'
        sectionThickness={0.8}
        fadeDistance={30}
      />
    </group>
  )
}
