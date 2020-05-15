import React, { useEffect } from 'react'
import { ItemTypes } from './Constants'
import { useDrag } from 'react-dnd'
import { AssistantDiv } from "./styles"
import { writeTimes } from "../../../actions"; 
import { connect } from "react-redux";

function Assistant({ name, prefs, writeTimes }) {
  const [{isDragging}, drag] = useDrag({
    item: { name, prefs: prefs.Ege, type: ItemTypes.ASSISTANT },
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

  useEffect(() => {
    if(isDragging)
      writeTimes(prefs[name])
  }, [isDragging]);

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

const mapStateToProps = state => {
  return { 
    times: state.times.Ege,
  }
}

export default connect(mapStateToProps, { writeTimes })(Assistant);