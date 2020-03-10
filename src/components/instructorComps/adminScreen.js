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
        <i className="large middle aligned icon camera" />
        <div className="content">
          <Link to={`/students/${student.id}`} className="header">
            {student.number}
          </Link>
          <div className="description">
            {student.role}
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
          <div class="ui compact menu"  style={{marginRight: "20px"}}>
  <div class="ui simple dropdown item">
    Year
    <i class="dropdown icon"></i>
    <div class="menu">
      <div class="item">Choice 1</div>
      <div class="item">Choice 2</div>
      <div class="item">Choice 3</div>
    </div>
  </div>
</div> 
<div class="ui compact menu"  style={{marginRight: "20px"}}>
  <div class="ui simple dropdown item">
    Term
    <i class="dropdown icon"></i>
    <div class="menu">
      <div class="item">Choice 1</div>
      <div class="item">Choice 2</div>
      <div class="item">Choice 3</div>
    </div>
  </div>
</div> 
<Link to="/instructor/newStudent" className="ui button primary">
            Add Term
          </Link>
        </div>
      );
    }
  }


  renderCreate2() {
    if(this.props.isSignedIn) {
      return (
        <div style={{ textAlign: 'right' }}>
          <div class="ui compact menu"  style={{marginRight: "20px"}}>
  <div class="ui simple dropdown item">
    Term
    <i class="dropdown icon"></i>
    <div class="menu">
      <div class="item">Choice 1</div>
      <div class="item">Choice 2</div>
      <div class="item">Choice 3</div>
    </div>
  </div>
</div> 
<div class="ui input" style={{marginLeft: "20px", marginRight:"20px"}}>
  <input type="text" placeholder="Course Name Input"></input>
</div>
<Link to="/instructor/newStudent" className="ui button primary">
            Add Course
          </Link>
        </div>
      );
    }
  }

  renderCreate3() {
    if(this.props.isSignedIn) {
      return (
        <div style={{ textAlign: 'right' }}>
          <div class="ui compact menu"  style={{marginRight: "20px"}}>
  <div class="ui simple dropdown item">
    Term
    <i class="dropdown icon"></i>
    <div class="menu">
      <div class="item">Choice 1</div>
      <div class="item">Choice 2</div>
      <div class="item">Choice 3</div>
    </div>
  </div>
</div> 
<div class="ui compact menu"  style={{marginRight: "20px"}}>
  <div class="ui simple dropdown item">
    Course
    <i class="dropdown icon"></i>
    <div class="menu">
      <div class="item">Choice 1</div>
      <div class="item">Choice 2</div>
      <div class="item">Choice 3</div>
    </div>
  </div>
</div>
<div class="ui compact menu"  style={{marginRight: "20px"}}>
  <div class="ui simple dropdown item">
    Instructor
    <i class="dropdown icon"></i>
    <div class="menu">
      <div class="item">Choice 1</div>
      <div class="item">Choice 2</div>
      <div class="item">Choice 3</div>
    </div>
  </div>
</div>  

<Link to="/instructor/newStudent" className="ui button primary">
            Add Instructor
          </Link>
        </div>
      );
    }
  }

  render() {
    var string = this.props.isSignedIn ? "Student List" : "";
    return (
      <div>
        <h1>Admin Dashboard</h1> <br></br>
        <h2>Terms</h2>
        <div className="ui celled list">
        <div className="item">
        <div className="right floated content">
          <Link to={`/instructor/editStudent`} className="ui button primary">
            Edit
          </Link>
          <Link to={`instructor/deleteStudent`} className="ui button negative">
            Delete
          </Link>
        </div>
        
        <div className="content">
          <Link to={`/student`} className="header">
            Spring
          </Link>
          <div className="description">
            2019 - 2020
          </div>
        </div>
      </div>
      <div className="item">
        <div className="right floated content">
          <Link to={`/instructor/editStudent`} className="ui button primary">
            Edit
          </Link>
          <Link to={`instructor/deleteStudent`} className="ui button negative">
            Delete
          </Link>
        </div>
        
        <div className="content">
          <Link to={`/student`} className="header">
            Fall
          </Link>
          <div className="description">
            2019 - 2020
          </div>
        </div>
      </div>
        </div>
        {this.renderCreate()}  <br></br> <br></br> <br></br>

        <h2>Courses</h2>
        <div className="ui celled list">
        <div className="item">
        <div className="right floated content">
          <Link to={`/instructor/editStudent`} className="ui button primary">
            Edit
          </Link>
          <Link to={`instructor/deleteStudent`} className="ui button negative">
            Delete
          </Link>
        </div>
        
        <div className="content">
          <Link to={`/student`} className="header">
            IF100
          </Link>
        </div>
      </div>

        </div> <br></br>
        {this.renderCreate2()} <br></br>


        <h2>Instructors</h2>
        <div className="ui celled list">
        <div className="item">
        <div className="right floated content">
          <Link to={`/instructor/editStudent`} className="ui button primary">
            Edit
          </Link>
          <Link to={`instructor/deleteStudent`} className="ui button negative">
            Delete
          </Link>
        </div>
        
        <div className="content">
          <Link to={`/student`} className="header">
            Hüsnü Yenigün
          </Link>
          <div className="description">
            IF100
          </div>
        </div>
      </div>
      <div className="item">
        <div className="right floated content">
          <Link to={`/instructor/editStudent`} className="ui button primary">
            Edit
          </Link>
          <Link to={`instructor/deleteStudent`} className="ui button negative">
            Delete
          </Link>
        </div>
        
        <div className="content">
          <Link to={`/student`} className="header">
            Duygu Altop
          </Link>
          <div className="description">
            IF100
          </div>
        </div>
      </div>
        </div> <br></br>
        {this.renderCreate3()}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { 
    students: Object.values(state.students),
    currentUserId: state.auth.userId,
    isSignedIn: state.auth.isSignedIn
  }
}

  export default connect(mapStateToProps, { fetchStudents })(StudentList);