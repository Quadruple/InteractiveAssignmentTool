import React from "react";
import { connect, useSelector } from "react-redux";
import { fetchStudents, editStudent } from "../../actions";
import CreateStudentForm from "../CreateStudentForm";

function EditStudent(props) {
  const userType = useSelector(state => state.auth.userType);
  const student = useSelector(state => state.students.find(studentObject => studentObject.studentemail === props.match.params.studentemail));

  const onSubmit = (formValues) => {
    props.editStudent(formValues);
  }

  if (!student) {
    return <div>LOADING</div>
  } else {
    return (
      userType === "INSTRUCTOR" ?
        <div>
          <h2>Edit Student</h2>
          <CreateStudentForm initialValues={{
            studentname: student.studentname,
            studentnumber: student.studentnumber,
            role: student.role,
            workhours: student.workhours.toString(),
            assistantscore: student.assistantscore,
            term: student.term,
            studentemail: student.studentemail.replace(/@sabanciuniv.edu/, "")
          }} onSubmit={onSubmit} />
        </div> : <h1>YOU ARE NOT AN INSTRUCTOR</h1>
    );
  }
}

export default connect(null, { fetchStudents, editStudent })(EditStudent);