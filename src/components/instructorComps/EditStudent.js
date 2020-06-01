import React from "react";
import { connect } from "react-redux";

import { fetchStudents, editStudent } from "../../actions";
import CreateStudentForm from "../CreateStudentForm";

class EditStudent extends React.Component {
  onSubmit = (formValues) => {
    this.props.editStudent(formValues);
  }

  render() {
    if (!this.props.student) {
      return <div>LOADING</div>
    } else {
      return (
        <div>
          <h2>Edit Student</h2>
          <CreateStudentForm initialValues={{
            studentname: this.props.student.studentname,
            studentnumber: this.props.student.studentnumber,
            role: this.props.student.role,
            workhours: this.props.student.workhours.toString(),
            assistantscore: this.props.student.assistantscore,
            term: this.props.student.term,
            studentemail: this.props.student.studentemail.replace(/@sabanciuniv.edu/, "")
          }} onSubmit={this.onSubmit} />
        </div>
      );
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  let studentsAsArray = state.students;
  return { student: studentsAsArray.find(studentObject => studentObject.studentemail === ownProps.match.params.studentemail) }
}

export default connect(mapStateToProps, { fetchStudents, editStudent })(EditStudent);