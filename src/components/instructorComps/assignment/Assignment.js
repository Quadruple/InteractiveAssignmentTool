import React, { useEffect, useState } from "react";
import { Layout, SideBar } from "./styles";
import axios from "axios";
import { DndProvider } from 'react-dnd'
import Backend from 'react-dnd-html5-backend'
import Assistant from "./Assistant";
import { connect } from "react-redux";
import { fetchStudents } from "../../../actions"; 
import { CalendarGrid } from "./styles";
import Slot from "./Slot";

function Assignment(props) {
  const [recitations, setRecitations] = useState([]);
  const [times, setTimes] = useState([]);
  const [slots, setSlots] = useState([]);

  console.log(slots)
  useEffect(() => {
    props.fetchStudents();

    axios.get(`http://localhost:4000/getRecitationSections/IF 100`)
      .then((response) => {
        setRecitations(response.data);
        //console.log(response.data)
      });

    axios.get(`http://localhost:4000/getRecitationHours/IF 100`)
      .then((response) => {
        setTimes(response.data);
        //console.log(response.data)
      });
  }, []);

  useEffect(() => {
    if(recitations.length && times.length) {
      for(let i = 0; i < recitations.length; i++) {
        slots.push({name: recitations[i] + " " + times[i], id: i, items: []})
      }
      setSlots(slots)
    }
  }, [recitations, times]);

  const renderAssistants = () => {
    const studentArray = props.students.map(student => 
      <div><Assistant name={student.name} /></div>
    );
    return studentArray;
  }

  const handleDrop = (id, item) => {
    setSlots([...slots.slice(0, id), { id,  items: [...slots.slice(id, id + 1)[0].items, item ], name: slots.slice(id, id + 1)[0].name, item }, ...slots.slice(id + 1)])
  } 
  
  return(
    <DndProvider backend={Backend}>
      <Layout>
        <SideBar>
          {renderAssistants()}
        </SideBar>
        <CalendarGrid>
        {slots.map(({ items, name, id }) => (
          <div style={{ width: '20%', height: '75px' }}>
            <Slot
              name={name}
              items={items}
              onDrop={(item) => handleDrop(id, item)}
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