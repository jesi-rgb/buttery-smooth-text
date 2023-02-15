import { Droppable } from 'react-beautiful-dnd'
import DraggableEffect from './DraggableEffect'

export default function EffectContainer({ ...props }) {
  return (
    <div>
      <Droppable droppableId={props.column.id}>
        {/* effect list */}
        {(provided) => (
          <div
            className='flex items-center justify-center my-20'
            ref={provided.innerRef}
            {...provided.droppableProps}
            {...provided.dragHandleProps}>
            {props.effects.map((effect, index) => (
              <DraggableEffect key={effect.id} effect={effect} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  )
}
