import React, { useState } from 'react'
import { ItemTypes } from './Constants'
import { useDrop } from 'react-dnd'

function Slot() {
  const[isDropped, setIsDropped] = useState(false);

	const [{ isOver }, drop] = useDrop({
		accept: ItemTypes.ASSISTANT,
		drop: () => setIsDropped(true),
		collect: monitor => ({
			isOver: !!monitor.isOver(),
		}),
  })

  return (
    <div
      ref={drop}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        borderStyle: "solid",
        borderWidth: "2px"
      }}
    >
      { isDropped ? <h1>ASSISTANT</h1> : null}
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
    </div>
  )
}

export default Slot