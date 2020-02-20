import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { fetchStudents } from "../../actions"; 

class StudentList extends React.Component {
  componentDidMount() {
    this.props.fetchStudents();
  }

  renderAdmin(student) {
    if(this.props.isSignedIn) {
      return(
        <div className="right floated content">
          <Link to={`/instructor/editStudent/${student.id}`} className="ui button primary">
            Edit
          </Link>
          <Link to={`instructor/deleteStudent/${student.id}`} className="ui button negative">
            Delete
          </Link>
        </div>
      );
    }
  }
  
  renderStudents() {
    const studentArray = this.props.students.map(student => 
      <div className="item" key={student.id}>
        {this.renderAdmin(student)}
        <div className="content">
            {student.name + " / " + student.number}
          <div className="description">
            {student.role + " / " + student.hours + " hours / " + student.score + " experience points"}
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