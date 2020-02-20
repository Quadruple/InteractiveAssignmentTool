import React from "react";
import { connect } from "react-redux";
import { createStudent } from "../../actions";
import CreateStudentForm from "../CreateStudentForm";

class CreateStudent extends React.Component {
  onSubmit = formValues => {
    this.props.createStudent(formValues);
  }

  render() {
    return (
      <div>
        <h2>Create Student</h2>
        <CreateStudentForm onSubmit={this.onSubmit} />
      </div>
    );
  }
}

export default connect(null, { createStudent })(CreateStudent);