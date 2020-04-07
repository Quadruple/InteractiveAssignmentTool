import React, { useEffect, useState } from "react";
import { Layout, SideBar } from "./styles";

import { DndProvider } from 'react-dnd'
import Backend from 'react-dnd-html5-backend'
import Assistant from "./Assistant";
import { connect } from "react-redux";
import { fetchStudents } from "../../../actions"; 
import { CalendarGrid } from "./styles";
import Slot from "./Slot";

function Assignment(props) {
  const [slots, setSlots] = useState([]);
  console.log(slots)
  useEffect(() => {
    props.fetchStudents();

    const slotArr = [];
    for (let i = 0; i < 55; i++) {
      slotArr.push({ id: i, lastDroppedItem: null })
    }
    setSlots(slotArr);
  }, []);

  const renderAssistants = () => {
    const studentArray = props.students.map(student => 
      <div><Assistant name={student.name} /></div>
    );
    return studentArray;
  }

  const handleDrop = (id, item) => {
    setSlots([...slots.slice(0, id), { id, lastDroppedItem: item }, ...slots.slice(id + 1)])
  } 
  
  return(
    <DndProvider backend={Backend}>
      <Layout>
        <SideBar>
          {renderAssistants()}
        </SideBar>
        <CalendarGrid>
        {slots.map(({ lastDroppedItem }, id) => (
          <div style={{ width: '20%', height: '75px' }}>
            <Slot
              lastDroppedItem={lastDroppedItem}
              onDrop={(item) => handleDrop(id, item)}
              key={id}
            />
          </div>
        ))}
        </CalendarGrid>
      </Layout>
    </DndProvider>
  );
}

const mapStateToProps = state => {
  return { 
    students: Object.values(state.students),
    isSignedIn: state.auth.isSignedIn
  }
}

export default connect(mapStateToProps, { fetchStudents })(Assignment);