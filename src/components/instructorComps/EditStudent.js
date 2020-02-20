import React from "react";
import { connect } from "react-redux";
import _ from "lodash";

import { fetchStudents, editStudent } from "../../actions";
import CreateStudentForm from "../CreateStudentForm";

class EditStudent extends React.Component {
  componentDidMount() {
    console.log(this.props.match.params.studentId);
    this.props.fetchStudents(this.props.match.params.studentId);
  }

  onSubmit = (formValues) => {
    this.props.editStudent(this.props.match.params.studentId, formValues);
  }

  render() {
    if(!this.props.student) {
      return <div>LOADING</div>
    } else {
        return (
          <div>
            <h2>Edit Student</h2>
            <CreateStudentForm initialValues={ {..._.pick(this.props.student, 'name','number', 'role', 'hours', 'score', 'term'), email: this.props.student.email.replace(/@sabanciuniv.edu/, "")} } onSubmit={this.onSubmit} /> 
          </div>
        );
      }
  }
}

const mapStateToProps = (state, ownProps) => {
  return { student: state.students[ownProps.match.params.studentId] }
}

export default connect(mapStateToProps, { fetchStudents, editStudent })(EditStudent);