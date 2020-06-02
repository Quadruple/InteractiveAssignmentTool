import React from 'react'
import { useSelector } from 'react-redux'
import { ItemTypes } from './Constants'
import { useDrop } from 'react-dnd'
import { SlotDiv } from './styles'

function Slot({ onDrop, onRemove, items, name, time, id }) {
	const [{ isOver, canDrop }, drop] = useDrop({
		accept: ItemTypes.ASSISTANT,
		drop: onDrop,
		collect: monitor => ({
      isOver: !!monitor.isOver(),
      canDrop: monitor.canDrop()
		}),
  })
  
  const prefs = useSelector(state => state.drag)

  const doesHavePreference = () => {
    if(Array.isArray(prefs)) {
      const pref = prefs.find(preference => preference.preferenceHour === time)
      if(typeof pref === "undefined") return null
      return pref.preferenceScore
    } else return null
  }

  return (
    <SlotDiv ref={drop}>
      <p style={{ fontWeight: "bold", marginTop: "8px", marginLeft: "5px"}}>{`${name} ${time}`}</p>
      {items ? <div>{items.map(item => <div style={{ fontWeight: "bold", marginBottom: "10px", marginLeft: "5px" }}>{item.name} <button onClick={() => onRemove(item, id)} style={{ marginLeft: "5px", borderRadius: "10px", border: "none", background: "white", fontWeight: "bold", color: "red" }}>X</button></div>)}</div> : null}
      {canDrop && <div style={{position: "absolute", right: "20px", bottom: "20px", color: "#b30059", fontWeight: "bold", fontSize: "25px"}}>{doesHavePreference()}</div>}
      {isOver && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            height: '100%',
            width: '100%',
            zIndex: 1,
            opacity: 0.6,
            backgroundColor: 'white',
          }}
        />
      )}
    </SlotDiv>
  )
}

export default Slot