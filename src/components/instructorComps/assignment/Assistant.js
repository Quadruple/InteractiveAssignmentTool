import React, { useEffect } from 'react'
import { ItemTypes } from './Constants'
import { useDrag } from 'react-dnd'
import { AssistantDiv } from "./styles"
import { writeTimes } from "../../../actions"; 
import { connect } from "react-redux";

function Assistant({ name, role, workHours, experiencePoints, prefs, writeTimes, email }) {
  const [{isDragging}, drag] = useDrag({
    item: { name, email, prefs: prefs, type: ItemTypes.ASSISTANT },
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
      writeTimes(prefs)
  }, [isDragging, prefs, writeTimes]);

  let divColor = role === "LA" ? "#FFD55A" : "#6DD47E";

  return (
    <div
      ref={drag}
      style={{
        opacity: isDragging ? 0.5 : 1,
        fontWeight: 'bold',
        cursor: 'move'
      }}
    >
      <AssistantDiv style={{ backgroundColor: divColor }}>
        {name} <br></br>
        {role} / {workHours} sections <br></br>
        {experiencePoints} experience points
      </AssistantDiv>
    </div>
  )
}

const mapStateToProps = state => {
  return { 
    times: state.times.Ege,
  }
}

export default connect(mapStateToProps, { writeTimes })(Assistant);