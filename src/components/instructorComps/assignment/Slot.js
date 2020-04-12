import React from 'react'
import { ItemTypes } from './Constants'
import { useDrop } from 'react-dnd'
import { SlotDiv } from './styles'

function Slot({ onDrop, onCancel, items, name, id }) {
	const [{ isOver }, drop] = useDrop({
		accept: ItemTypes.ASSISTANT,
		drop: onDrop,
		collect: monitor => ({
			isOver: !!monitor.isOver(),
		}),
  })

  return (
    <SlotDiv ref={drop}>
      {name}
      {items ? <h4>{items.map(item => <div>{item.name} <button onClick={() => onCancel(item.name, id)}>x</button></div>)}</h4> : null}
      {isOver && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            height: '100%',
            width: '100%',
            zIndex: 1,
            opacity: 0.5,
            backgroundColor: 'yellow',
          }}
        />
      )}
    </SlotDiv>
  )
}

export default Slot