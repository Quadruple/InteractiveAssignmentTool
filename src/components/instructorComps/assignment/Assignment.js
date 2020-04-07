import React, { useEffect } from "react";
import { Layout, SideBar } from "./styles";

import { DndProvider } from 'react-dnd'
import Backend from 'react-dnd-html5-backend'
import Assistant from "./Assistant";
import { connect } from "react-redux";
import { fetchStudents } from "../../../actions"; 
import { CalendarGrid } from "./styles";
import Slot from "./Slot";

function Assignment(props) {
  useEffect(() => {
    props.fetchStudents();
  }, []);

  const renderAssistants = () => {
    const studentArray = props.students.map(student => 
      <div><Assistant name={student.name} /></div>
    );
    console.log(props.students);
    return studentArray;
  }

  const renderSlot = () => {
    return(
      <div style={{ width: '20%', height: '75px' }}>
        <Slot />
      </div>
    );
  }

  const slots = [];
  for (let i = 0; i < 55; i++) {
    slots.push(renderSlot())
  }

  const handleDrop = (index, item) => {
    const { name } = item
    setDroppedBoxNames(
      update(droppedBoxNames, name ? { $push: [name] } : { $push: [] }),
    )
    setDustbins(
      update(dustbins, {
        [index]: {
          lastDroppedItem: {
            $set: item,
          },
        },
      }),
    )
  }
  
  return(
    <DndProvider backend={Backend}>
      <Layout>
        <SideBar>
          {renderAssistants()}
        </SideBar>
        <CalendarGrid>
          {slots}
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