import React, { useState } from 'react'
import { ItemTypes } from './Constants'
import { useDrag } from 'react-dnd'
import { AssistantDiv } from "./styles"

function Assistant(props) {
  const [assistantName, setAssistantName] = useState(props.name);
  const [{isDragging}, drag] = useDrag({
    item: { name: props.name, type: ItemTypes.ASSISTANT },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult()
      if (item && dropResult) {
        console.log(item)
        setAssistantName(item.name)
        alert(`You dropped ${item.name} into ${dropResult.name}!`)
      }
    },
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
      <AssistantDiv>{assistantName}</AssistantDiv>
    </div>
  )
}

export default Assistant