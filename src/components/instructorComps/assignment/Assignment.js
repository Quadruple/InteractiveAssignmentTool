import React, { useEffect, useState } from "react";
import { Layout, SideBar } from "./styles";
import axios from "axios";
import { DndProvider } from 'react-dnd'
import Backend from 'react-dnd-html5-backend'
import Assistant from "./Assistant";
import { connect } from "react-redux";
import { fetchStudents, fetchTimes } from "../../../actions"; 
import { CalendarGrid } from "./styles";
import Slot from "./Slot";

function Assignment(props) {
  const [recitations, setRecitations] = useState([]);
  const [times, setTimes] = useState([]);
  const [slots, setSlots] = useState();
  const [totalScore, setTotalScore] = useState(0);

  useEffect(() => {
    props.fetchStudents();
    props.fetchTimes();

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
    let slots = [];
    if(recitations.length && times.length) {
      for(let i = 0; i < recitations.length; i++) {
        slots.push({ name: recitations[i], time: times[i], id: i, items: [] })
      }
      setSlots(slots)
    }
  }, [recitations, times]); 

  const renderAssistants = () => {
    const studentArray = props.students.map(student => 
      <div><Assistant name={student.name} prefs={props.preferences} /></div>
    );
    return studentArray;
  }

  const handleDrop = (id, item) => {
    const matchingPref = item.prefs.find(preference => preference.preferenceHour === slots[id].time)
    matchingPref && setTotalScore(totalScore + matchingPref.preferenceScore)
    setSlots([...slots.slice(0, id), { id,  items: [...slots[id].items, item ], name: slots[id].name, time: slots[id].time }, ...slots.slice(id + 1)])
  }
  
  const handleRemove = (removedItem, id) => {
    const matchingPref = removedItem.prefs.find(preference => preference.preferenceHour === slots[id].time)
    matchingPref && setTotalScore(totalScore - matchingPref.preferenceScore)
    setSlots([...slots.slice(0, id), { id,  items: slots[id].items.filter(item => item.name !== removedItem.name), name: slots[id].name, time: slots[id].time }, ...slots.slice(id + 1)])
  } 
  
  return(
    <DndProvider backend={Backend}>
      <Layout>
        <SideBar>
          {renderAssistants()}
        </SideBar>
        <CalendarGrid>
        {slots && slots.map(({ items, name, time, id }) => (
            <Slot
              id={id}
              name={name}
              time={time}
              items={items}
              onDrop={(item) => handleDrop(id, item)}
              onRemove={handleRemove}
            />
        ))}
        </CalendarGrid>
      </Layout>
      {slots &&
        <div style={{textAlign: "center", fontSize: "large", marginTop: "25px"}}>
          Total Score = {totalScore}
        </div>}
    </DndProvider>
  );
}

const mapStateToProps = state => {
  return { 
    students: Object.values(state.students),
    preferences: Object.values(state.times),
    isSignedIn: state.auth.isSignedIn
  }
}

export default connect(mapStateToProps, { fetchStudents, fetchTimes })(Assignment);