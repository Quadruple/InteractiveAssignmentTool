import React from "react";
import { connect, useSelector } from "react-redux";
import { createStudent } from "../../actions";
import CreateStudentForm from "../CreateStudentForm";

function CreateStudent(props) {
  const userType = useSelector(state => state.auth.userType);

  const onSubmit = formValues => {
    console.log(formValues);
    props.createStudent(formValues);
  }

  return (
    userType === "INSTRUCTOR" ? 
      <div>
        <h2>Create Student</h2>
        <CreateStudentForm onSubmit={onSubmit} />
      </div> : <h1>YOU ARE NOT AN INSTRUCTOR</h1>
  ); 
}

export default connect(null, { createStudent })(CreateStudent);