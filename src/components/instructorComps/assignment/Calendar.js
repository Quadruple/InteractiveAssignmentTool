import React from 'react'
import { CalendarGrid } from "./styles";
import Slot from "./Slot";

const renderSlot = () => {
  return(
    <div style={{ width: '20%', height: '75px' }}>
      <Slot />
    </div>
  );
}

function Calendar() {
 

  const slots = []
  for (let i = 0; i < 55; i++) {
    slots.push(renderSlot())
  }

  return (<CalendarGrid>{slots}</CalendarGrid>)
}

export default Calendar