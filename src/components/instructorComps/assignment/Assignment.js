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
import { useSelector } from 'react-redux'
import { arrayRemove } from "redux-form";

function Assignment(props) {
  const [recitations, setRecitations] = useState([]);
  const [times, setTimes] = useState([]);
  const [slots, setSlots] = useState();
  const [totalScore, setTotalScore] = useState(0);
  console.log(slots)

  const students = useSelector(state =>  Object.values(state.students));
  const preferences = useSelector(state => state.times);
  const isSignedIn = useSelector(state => state.auth.isSignedIn);
  const assignments = useSelector(state => state.assignments);
  const totalScoreFromDb = useSelector(state =>  state.assignments.totalScore);
  //const course = useSelector(state =>  state.students[0].course);
  const course = "IF 100";

  useEffect(() => {
    props.fetchAssignments();
    props.fetchStudents();
    course && props.fetchTimes(course);

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
  }, [course]);

  useEffect(() => {
    let slots = [];
    
    if (recitations.length && times.length) {
      for (let i = 0; i < recitations.length; i++) {
        if (assignments && assignments.length && preferences && preferences.length) {
          let recitName = recitations[i];
          let recitTime = times[i];

          let assignmentsArray = assignments.filter(assignment => assignment.sectionname === recitName && assignment.sectiontime === recitTime)

          let assignmentsArrayWithPrefs = assignmentsArray.map(assignment => { 
            return { ...assignment, prefs: preferences.filter(pref => pref.studentemail === assignment.studentemail) } 
          });

          let items = []
          assignmentsArrayWithPrefs.forEach(assignmentWithPrefs => items.push({ name: assignmentWithPrefs.studentname , type: "ASSISTANT", prefs: assignmentWithPrefs.prefs }))

          slots.push({
            name: recitations[i],
            time: times[i],
            id: i,
            items 
          })          
        } else {
          slots.push({
            name: recitations[i],
            time: times[i],
            id: i,
            items: []
          })
        }
      }
      setSlots(slots)
    } 
  }, [recitations, times, preferences]);

  //EMAİL E GÖRE PREF ATA
  const renderAssistants = () => {
    const studentArray = students.map(student => 
      <div><Assistant name={student.name} prefs={preferences} /></div>
    );
    return studentArray;
  }

  const handleDrop = (id, droppedItem) => {
    const matchingPref = droppedItem.prefs.find(preference => preference.preferenceHour === slots[id].time)
     
    if(slots[id].items.find(item => item.name === droppedItem.name))
      alert("ALREADY EXISTS!")
    else {
      setSlots([...slots.slice(0, id), { id,  items: [...slots[id].items, droppedItem ], name: slots[id].name, time: slots[id].time }, ...slots.slice(id + 1)])
      matchingPref && setTotalScore(totalScore + matchingPref.preferenceScore)
    }
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
          {preferences && renderAssistants()}
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
        <div style={{ textAlign: "center", fontSize: "large", marginTop: "25px" }}>
          Total Score = {totalScore}
        </div>}
      <button style={{ marginLeft: "1200px", height: "40px", width: "80px" }} onClick={() => props.saveAssignments(slots, totalScore)}>SAVE</button>
    </DndProvider>
  );
}

export default connect(null, { fetchStudents, fetchTimes, fetchAssignments, saveAssignments })(Assignment);