import React from "react";
import { connect } from "react-redux";
import _ from "lodash";

import { fetchStudents, editStudent } from "../../actions";
import CreateStudentForm from "../CreateStudentForm";

class EditStudent extends React.Component {
  componentDidMount() {
    console.log(this.props.match.params.studentemail);
    this.props.fetchStudents(this.props.match.params.studentemail);
  }

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
            studentemail: this.props.student.studentemail,
            studentname: this.props.student.studentname,
            studentnumber: this.props.student.studentnumber,
            role: this.props.student.role,
            course: this.props.student.course,
            workhours: this.props.student.workhours.toString(),
            assistantscore: this.props.student.assistantscore,
            term: this.props.student.term,
            email: this.props.student.studentemail.replace(/@sabanciuniv.edu/, "")
          }} onSubmit={this.onSubmit} />
        </div>
      );
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  let studentsAsArray = Object.values(state.students);
  return { student: studentsAsArray.find(studentObject => studentObject.studentemail === ownProps.match.params.studentemail) }
}

export default connect(mapStateToProps, { fetchStudents, editStudent })(EditStudent);