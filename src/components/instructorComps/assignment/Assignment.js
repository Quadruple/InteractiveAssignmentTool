import React, { useEffect, useState } from "react";
import { Layout, SideBar } from "./styles";
import axios from "axios";
import { DndProvider } from 'react-dnd'
import Backend from 'react-dnd-html5-backend'
import Assistant from "./Assistant";
import { connect } from "react-redux";
import { fetchStudents, fetchTimes, fetchAssignments, saveAssignments } from "../../../actions"; 
import { CalendarGrid } from "./styles";
import Slot from "./Slot";

function Assignment(props) {
  const [recitations, setRecitations] = useState([]);
  const [times, setTimes] = useState([]);
  const [slots, setSlots] = useState();
  const [totalScore, setTotalScore] = useState(0);
  console.log(slots, totalScore)
  
  useEffect(() => {
    props.fetchAssignments();
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
    if(recitations.length && times.length && !props.assignments) {
      for(let i = 0; i < recitations.length; i++) {
        slots.push({name: recitations[i], 
                    time: times[i], 
                    id: i, 
                    //items: [ { name: "deneme", type: "ASSISTANT", prefs: [ { preferenceHour: "8:40 am - 10:30 am - R", preferenceScore: 10, id: 1 } ] } ] }
                    items: []
                   }
        )
      }
      setSlots(slots)
    } else if(props.assignments) {
        setSlots(props.assignments)
        setTotalScore(props.totalScore)
    }
  }, [recitations, times, props.assignments]); 

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

  const onSave = () => {
    let courseName = "IF 100" //TODO: take it from redux store

    for(let i = 0; i < slots.length; i++) {
      if(slots[i].items.length) {
        let sectionName = slots[i].name;
        let sectionTime = slots[i].time;

        for(let j = 0; j < slots[i].items.length; j++) {
          let studentName = slots[i].items[j].name
          let studentEmail = "egebircan@sabanciuniv.edu" // TODO : add email to <Student /> as a prop
       
          // SAVE ASSIGNMENTS REQUEST
        }
      }
    }
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
      <button style={{marginLeft: "1200px", height: "40px", width: "80px"}} onClick={() => props.saveAssignments(slots, totalScore)}>SAVE</button>
    </DndProvider>
  );
}

const mapStateToProps = state => {
  return { 
    students: Object.values(state.students),
    preferences: state.times,
    isSignedIn: state.auth.isSignedIn,
    assignments: state.assignments.assignments,
    totalScore: state.assignments.totalScore
  }
}

export default connect(mapStateToProps, { fetchStudents, fetchTimes, fetchAssignments, saveAssignments })(Assignment);