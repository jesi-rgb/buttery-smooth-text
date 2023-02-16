import { Draggable } from 'react-beautiful-dnd'

export default function DraggableEffect({ ...props }) {
  return (
    <>
      <Draggable draggableId={props.effect.id} index={props.index}>
        {(provided) => (
          <div
            className='px-3 m-1 font-serif text-xl font-semibold border select-none bg-stone-800 rounded-md'
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}>
            {props.effect.name}
          </div>
        )}
      </Draggable>
    </>
  )
}
