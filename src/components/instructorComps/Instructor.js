import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { fetchStudents, deleteStudent } from "../../actions"; 

class StudentList extends React.Component {
  componentDidMount() {
    this.props.fetchStudents();
  }

  renderAdmin(student) {
    if(this.props.isSignedIn) {
      return(
        <div className="right floated content">
          <Link to={`/instructor/editStudent/${student.studentemail}`} className="ui button primary">
            Edit
          </Link>
          <Link onClick={deleteStudent(student.studentemail)} className="ui button negative">
            Delete
          </Link>
        </div>
      );
    }
  }
  
  renderStudents() {
    const studentArray = this.props.students.map(student => 
      <div className="item" key={student.studentemail}>
        {this.renderAdmin(student)}
        <div className="content">
            {student.studentname + " / " + student.studentnumber}
          <div className="description">
            {student.role + " / " + student.workhours + " hours / " + student.assistantscore + " experience points"}
          </div>
        </div>
      </div>  
    );
    
    if(this.props.isSignedIn) {
      return studentArray;
    }
  }

  renderCreate() {
    if(this.props.isSignedIn) {
      return (
        <div style={{ textAlign: 'right' }}>
          <Link to="/instructor/newStudent" className="ui button primary">
            Create Student 
          </Link>
        </div>
      );
    }
  }

  render() {
    var string = this.props.isSignedIn ? "Student List" : "";
    return (
      <div>
        <h3>{string}</h3>
        <div className="ui celled list">
          {this.renderStudents()}
        </div>
        {this.renderCreate()}
        <Link to="/assignment" >
            Go to Assignment Screen 
        </Link>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { 
    students: Object.values(state.students),
    isSignedIn: state.auth.isSignedIn
  }
}

export default connect(mapStateToProps, { fetchStudents })(StudentList);