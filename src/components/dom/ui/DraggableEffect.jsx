import { Draggable } from 'react-beautiful-dnd'

function getStyle(style, snapshot) {
  if (!snapshot.isDropAnimating) {
    return style
  }
  const { moveTo, curve, duration } = snapshot.dropAnimation
  // move to the right spot
  const translate = `translate(${moveTo.x}px, ${moveTo.y}px)`
  // add a bit of turn for fun
  const rotate = 'rotate(1turn)'

  // patching the existing style
  return {
    ...style,
    transform: `${translate} ${rotate}`,
    // slowing down the drop because we can
    transition: `all ${curve} ${duration + 0.5}s`,
  }
}
export default function DraggableEffect({ ...props }) {
  return (
    <>
      <Draggable draggableId={props.effect.id} index={props.index}>
        {(provided, snapshot) => (
          <div
            className='px-3 m-1 font-mono text-xl border select-none font-regular bg-stone-800 rounded-md'
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            style={getStyle(provided.draggableProps.style, snapshot)}
            ref={provided.innerRef}>
            {props.effect.name}
          </div>
        )}
      </Draggable>
    </>
  )
}
