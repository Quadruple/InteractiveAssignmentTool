import React from 'react'
import { ItemTypes } from './Constants'
import { useDrag } from 'react-dnd'
import { AssistantDiv } from "./styles"

function Assistant() {
  const [{isDragging}, drag] = useDrag({
    item: { type: ItemTypes.ASSISTANT },
		collect: monitor => ({
			isDragging: !!monitor.isDragging(),
		}),
  })

  return (
    <div
      ref={drag}
      style={{
        opacity: isDragging ? 0.5 : 1,
        fontSize: 25,
        fontWeight: 'bold',
        cursor: 'move',
      }}
    >
      <AssistantDiv>Assistant</AssistantDiv>
    </div>
  )
}

export default Assistant