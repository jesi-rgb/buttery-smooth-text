import TextStackEffects from '@/components/canvas/TextStackEffects'
import { effectList } from '@/components/dom/ui/effects'
import dynamic from 'next/dynamic'
import { useState } from 'react'
import { DragDropContext } from 'react-beautiful-dnd'

// Dynamic import is used to prevent a payload when the website starts, that includes threejs, r3f etc..
// WARNING ! errors might get obfuscated by using dynamic import.
// If something goes wrong go back to a static import to show the error.
// https://github.com/pmndrs/react-three-next/issues/49
// const Text = dynamic(() => import('@/components/canvas/Text'), { ssr: false })
const EffectContainer = dynamic(() => import('@/components/dom/ui/EffectContainer'), { ssr: false })

// Dom components go here
export default function Page(props) {
  let [state, setState] = useState(effectList)
  let [effect, setEffect] = useState('Metal')

  const onDragEnd = (result) => {
    // TODO: reorder our column
    const { destination, source, draggableId } = result

    if (!destination) return

    if (destination.droppableId === source.droppableId && destination.index === source.index) return

    const col = state.columns[source.droppableId]
    const newIds = Array.from(col.effectIds)
    newIds.splice(source.index, 1)
    newIds.splice(destination.index, 0, draggableId)

    const newCol = {
      ...col,
      effectIds: newIds,
    }

    const newState = {
      ...state,
      columns: {
        ...state.columns,
        [newCol.id]: newCol,
      },
    }

    setState(newState)
  }
  return (
    <>
      <div>
        <DragDropContext onDragEnd={onDragEnd}>
          {state.columnOrder.map((columnId) => {
            const column = state.columns[columnId]
            const effects = column.effectIds.map((effectId) => state.effects[effectId])

            return <EffectContainer key={column.id} column={column} effects={effects} />
          })}
        </DragDropContext>
      </div>
    </>
  )
}

// Canvas components go here
// It will receive same props as the Page component (from getStaticProps, etc.)
Page.canvas = (props) => <TextStackEffects color='hotpink' />

export async function getStaticProps() {
  return { props: { title: 'Buttery Smooth Text' } }
}
