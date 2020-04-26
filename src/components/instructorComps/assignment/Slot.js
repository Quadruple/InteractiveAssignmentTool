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

  //state e yazılan bir öğrencinin prefleri oku
  const prefs = useSelector(state =>  Object.values(state.times))

  const doesHavePreference = () => {
    if(Array.isArray(prefs)) {
      const pref = prefs.find(preference => preference.preferenceHour === time)
      if(typeof pref === "undefined") return null
      return pref.preferenceScore
    } else return null
  }

  return (
    <SlotDiv ref={drop}>
      {`${name} ${time}`}
      {items ? <h4>{items.map(item => <div>{item.name} <button onClick={() => onRemove(item, id)}>x</button></div>)}</h4> : null}
      {canDrop && <div style={{position: "absolute", right: "4px", bottom: "5px"}}>{doesHavePreference()}</div>}
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