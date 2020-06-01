import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { fetchStudents, deleteStudent, fetchInstructorCourse } from "../../actions"; 
import { useSelector } from 'react-redux'

function StudentList(props) {
  const students = useSelector(state => state.students);
  const isSignedIn = useSelector(state => state.auth.isSignedIn);
  const instructorMail = useSelector(state => state.auth.userMail);

  useEffect(() => {
    props.fetchStudents();
    instructorMail && props.fetchInstructorCourse(instructorMail);
  }, [instructorMail]);

  const renderAdmin = (student) => {
    if(isSignedIn) {
      return(
        <div className="right floated content">
          <Link to={`/instructor/editStudent/${student.studentemail}`} className="ui button primary">
            Edit
          </Link>
          <Link onClick={() => props.deleteStudent(student.studentemail)} className="ui button negative">
            Delete
          </Link>
        </div>
      );
    }
  }
  
  const renderStudents = () => {
    const studentArray = students.map(student => 
      <div className="item" key={student.studentemail}>
        {renderAdmin(student)}
        <div className="content">
            {student.studentname + " / " + student.studentnumber}
          <div className="description">
            {student.role + " / " + student.workhours + " hours / " + student.assistantscore + " experience points"}
          </div>
        </div>
      </div>  
    );
    
    if(isSignedIn) {
      return studentArray;
    }
  }

  const renderCreate = () => {
    if(isSignedIn) {
      return (
        <div style={{ textAlign: 'right' }}>
          <Link to="/instructor/newStudent" className="ui button primary">
            Create Student 
          </Link>
        </div>
      );
    }
  }

  var string = isSignedIn ? "Student List" : "";
  return (
    <div>
      <h3>{string}</h3>
      <div className="ui celled list">
        {!!students.length && renderStudents()}
      </div>
      {renderCreate()}
      <Link to="/assignment" >
          Go to Assignment Screen 
      </Link>
    </div>
  );
}

export default connect(null, { fetchStudents, deleteStudent, fetchInstructorCourse })(StudentList);