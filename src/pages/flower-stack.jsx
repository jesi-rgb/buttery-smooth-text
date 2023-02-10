import dynamic from 'next/dynamic'
import Instructions from '@/components/dom/Instructions'
import Flower from '@/components/canvas/Flower'
import Text from '@/components/canvas/Text'
import Logo from '@/components/canvas/Logo'
import EffectStack from '@/components/dom/ui/EffectStack'

// Dynamic import is used to prevent a payload when the website starts, that includes threejs, r3f etc..
// WARNING ! errors might get obfuscated by using dynamic import.
// If something goes wrong go back to a static import to show the error.
// https://github.com/pmndrs/react-three-next/issues/49
// const Text = dynamic(() => import('@/components/canvas/Text'), { ssr: false })

// Dom components go here
export default function Page(props) {
  return (
    <>
      <h1 className='mt-20 font-serif text-2xl font-bold text-center text-white lg:text-4xl'>stack example</h1>
    </>
  )
}

// Canvas components go here
// It will receive same props as the Page component (from getStaticProps, etc.)
// Page.canvas = (props) => <Text position-y={0.5} />
Page.canvas = (props) => <Flower />

export async function getStaticProps() {
  return { props: { title: 'Buttery Smooth Text ' } }
}
