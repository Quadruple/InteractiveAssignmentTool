import React, { useState } from 'react'
import { ItemTypes } from './Constants'
import { useDrag } from 'react-dnd'
import { AssistantDiv } from "./styles"

function Assistant({ name, prefs }) {
  const [{isDragging}, drag] = useDrag({
    item: { name, prefs, type: ItemTypes.ASSISTANT },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult()
      if (item && dropResult) {
        //console.log(item)
      }
    },
		collect: monitor => ({
			isDragging: !!monitor.isDragging(),
		}),
  })

  //pref leri state e yaz.
  isDragging && console.log(name)

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
      <AssistantDiv>{name}</AssistantDiv>
    </div>
  )
}

export default Assistant