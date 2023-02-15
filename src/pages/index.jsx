import TextStackEffects from '@/components/canvas/TextStackEffects'
import EffectContainer from '@/components/dom/ui/EffectContainer'
import { effectList } from '@/components/dom/ui/effects'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import { resetServerContext } from 'react-beautiful-dnd'

// Dynamic import is used to prevent a payload when the website starts, that includes threejs, r3f etc..
// WARNING ! errors might get obfuscated by using dynamic import.
// If something goes wrong go back to a static import to show the error.
// https://github.com/pmndrs/react-three-next/issues/49
// const Text = dynamic(() => import('@/components/canvas/Text'), { ssr: false })

// Dom components go here
export default function Page(props) {
  const onDragEnd = (result) => {
    // TODO: reorder our column
  }
  resetServerContext()
  return (
    <>
      <div>
        <DragDropContext onDragEnd={onDragEnd}>
          {effectList.columnOrder.map((columnId) => {
            const column = effectList.columns[columnId]
            const effects = column.effectIds.map((effectId) => effectList.effects[effectId])

            return <EffectContainer key={column.id} column={column} effects={effects} />
          })}
        </DragDropContext>
      </div>
    </>
  )
}

// Canvas components go here
// It will receive same props as the Page component (from getStaticProps, etc.)
// Page.canvas = (props) => <Text position-y={0.5} />
Page.canvas = (props) => <TextStackEffects color='hotpink' />

export async function getStaticProps() {
  return { props: { title: 'Buttery Smooth Text ' } }
}
