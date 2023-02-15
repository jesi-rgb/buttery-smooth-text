import { Draggable } from 'react-beautiful-dnd'

export default function DraggableEffect({ ...props }) {
  console.log(props)
  return (
    <>
      <Draggable draggableId={props.effect.id} index={props.index}>
        {(provided) => (
          <div
            className='px-3 m-1 text-xl border rounded-md '
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
