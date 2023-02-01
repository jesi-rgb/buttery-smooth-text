import dynamic from 'next/dynamic'
import Instructions from '@/components/dom/Instructions'

// Dynamic import is used to prevent a payload when the website starts, that includes threejs, r3f etc..
// WARNING ! errors might get obfuscated by using dynamic import.
// If something goes wrong go back to a static import to show the error.
// https://github.com/pmndrs/react-three-next/issues/49
const Text = dynamic(() => import('@/components/canvas/Text'), { ssr: false })

// Dom components go here
export default function Page(props) {
  return <h1 className='mt-20 font-serif text-4xl text-center text-red-400'>Some cool text!</h1>
}

// Canvas components go here
// It will receive same props as the Page component (from getStaticProps, etc.)
Page.canvas = (props) => <Text scale={1} route='/blob' position-y={1} />

export async function getStaticProps() {
  return { props: { title: 'Buttery Smooth Text ' } }
}
