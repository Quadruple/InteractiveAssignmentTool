import React, { useEffect, useState } from "react";
import { Layout, SideBar } from "./styles";
import axios from "axios";
import { DndProvider } from 'react-dnd'
import Backend from 'react-dnd-html5-backend'
import Assistant from "./Assistant";
import { connect } from "react-redux";
import { fetchStudents, fetchAssignments, saveAssignments, fetchTimesByCourse } from "../../../actions";
import { CalendarGrid } from "./styles";
import Slot from "./Slot";
import { useSelector } from 'react-redux'

function Assignment(props) {
  const [recitations, setRecitations] = useState([]);
  const [times, setTimes] = useState([]);
  const [slots, setSlots] = useState();
  const [totalScore, setTotalScore] = useState(0);
  console.log(slots)

  const students = useSelector(state =>  state.students);
  const preferences = useSelector(state => state.times);
  //const isSignedIn = useSelector(state => state.auth.isSignedIn);
  const assignments = useSelector(state => state.assignments);
  const courseName = useSelector(state =>  state.instructorCourse.instructorCourse);
  const userType = useSelector(state => state.auth.userType);

  useEffect(() => {
    courseName && props.fetchTimesByCourse(courseName)
    courseName && props.fetchAssignments(courseName);
    courseName && props.fetchStudents(courseName);
    //courseName && props.fetchTimes(courseName);

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
  }, [courseName, props]);

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
          assignmentsArrayWithPrefs.forEach(assignmentWithPrefs => items.push({ name: assignmentWithPrefs.studentname, email: assignmentsArrayWithPrefs.studentemail, type: "ASSISTANT", prefs: assignmentWithPrefs.prefs }))

          slots.push({
            name: recitations[i],
            time: times[i],
            id: i,
            items 
          })   
          setTotalScore(assignments[0].totalscore)       
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
  }, [recitations, times, preferences, assignments]);

  const renderAssistants = () => {
    const studentArray = students.map(student => {
      console.log(student.studentemail)
      let studentPreferences = preferences.filter(pref =>  pref.studentemail === student.studentemail)
      return <div><Assistant name={student.studentname} email={student.studentemail} prefs={studentPreferences} /></div>  
    });

    return studentArray;
  }

  const handleDrop = (id, droppedItem) => {
    const matchingPref = droppedItem.prefs.find(preference => preference.preferenceHour === slots[id].time)
     console.log(droppedItem)
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
    for(let i = 0; i < slots.length; i++) {
      if(slots[i].items.length) {
        let sectionname = slots[i].name;
        let sectiontime = slots[i].time;

        for(let j = 0; j < slots[i].items.length; j++) {
          let studentname = slots[i].items[j].name
          let studentemail = slots[i].items[j].email
          props.saveAssignments({ coursename: courseName, sectionname, sectiontime, studentemail, studentname }, totalScore);
        }
      }
    }
  }

  return(
    userType === "INSTRUCTOR" ?
      <DndProvider backend={Backend}>
        <Layout>
          <SideBar>
            {!!preferences.length && renderAssistants()}
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
        <button style={{ marginLeft: "1200px", height: "40px", width: "80px" }} onClick={() => onSave()}>SAVE</button>
      </DndProvider> : <h1>YOU ARE NOT AN INSTRUCTOR</h1>
  );
}

export default connect(null, { fetchStudents, fetchAssignments, saveAssignments, fetchTimesByCourse })(Assignment);