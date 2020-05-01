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
    this.props.editStudent(this.props.match.params.studentemail, formValues);
  }

  render() {
    if(!this.props.student) {
      return <div>LOADING</div>
    } else {
        return (
          <div>
            <h2>Edit Student</h2>
            <CreateStudentForm initialValues={ {..._.pick(this.props.student, 'studentemail', 'studentname', 'studentnumber', 'role', 'course', 'workhours', 'assistantscore', 'term'), email: this.props.student.studentemail.replace(/@sabanciuniv.edu/, "")} } onSubmit={this.onSubmit} /> 
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