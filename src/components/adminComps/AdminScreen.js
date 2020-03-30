import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { fetchTerms, 
         addTerm, 
         deleteTerm, 
         fetchCourses, 
         addCourse, 
         deleteCourse, 
         fetchInstructors, 
         addInstructor, 
         deleteInstructor 
        } from "../../actions"; 

class AdminScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { addTermForm: {}, addCourseForm: {}, addInstructorForm: {} };
  }

  componentDidMount() {
    this.props.fetchTerms();
    this.props.fetchCourses();
    this.props.fetchInstructors();
  }

  renderTermInput() {
    return (
      <div style={{ textAlign: 'right' }}>
        <select class="ui dropdown" onChange={e => this.setState({ addTermForm: {...this.state.addTermForm, year: e.target.value} })}>
          <option value="">Year</option>
          <option value="2015-2016">2015-2016</option>
          <option value="2016-2017">2016-2017</option>
        </select>
        <select class="ui dropdown" onChange={e => this.setState({ addTermForm: {...this.state.addTermForm, semester: e.target.value} })}>
          <option value="">Semester</option>
          <option value="Fall">Fall</option>
          <option value="Spring">Spring</option>
        </select>
        <button onClick={() => this.props.addTerm(this.state.addTermForm)} className="ui button primary">
          Add Term
        </button>
      </div>
    );
  }

  renderCourseInput() {
    return (
      <div style={{ textAlign: 'right' }}>
        <select class="ui dropdown" onChange={e => this.setState({ addCourseForm: {...this.state.addCourseForm, term: e.target.value} })}>
          <option value="">Term</option>
          <option value="2015-2016 Spring">2015-2016 Spring</option>
          <option value="2016-2017 Fall">2016-2017 Fall</option>
        </select>
        <div class="ui input" style={{marginLeft: "20px", marginRight:"20px"}}>
          <input type="text" placeholder="Course Name Input" onChange={e => this.setState({ addCourseForm: {...this.state.addCourseForm, courseName: e.target.value} })}></input>
        </div>
        <button onClick={() => this.props.addCourse(this.state.addCourseForm)} className="ui button primary">
          Add Course
        </button>
      </div>
    );
  }

  renderInstructorInput() {
    return (
      <div style={{ textAlign: 'right' }}>
        <select class="ui dropdown" onChange={e => this.setState({ addInstructorForm: {...this.state.addInstructorForm, term: e.target.value} })}>
          <option value="">Term</option>
          <option value="2015-2016 Spring">2015-2016 Spring</option>
          <option value="2016-2017 Fall">2016-2017 Fall</option>
        </select>
        <select class="ui dropdown" onChange={e => this.setState({ addInstructorForm: {...this.state.addInstructorForm, course: e.target.value} })}>
          <option value="">Course</option>
          <option value="IF100">IF100</option>
          <option value="CS201">CS201</option>
        </select>
        <select class="ui dropdown" onChange={e => this.setState({ addInstructorForm: {...this.state.addInstructorForm, instructor: e.target.value} })}>
          <option value="">Instructor</option>
          <option value="Hüsnü Yenigün">Hüsnü Yenigün</option>
          <option value="Duygu Altop">Duygu Altop</option>
        </select>
        <button onClick={() => this.props.addInstructor(this.state.addInstructorForm)} className="ui button primary">
          Add Instructor
        </button>
      </div>
    );
  }

  renderTermBlock() {
    const terms = this.props.terms.map(term =>
      <div className="ui celled list">
        <div className="item">
          <div className="right floated content">
            <Link to={`admin/deleteTerm/${term.id}`} className="ui button negative">
              Delete
            </Link>
          </div>
          <div className="content">
            {term.semester}
            <div className="description">
              {term.year}
            </div>
          </div>
        </div>
      </div>
    )
    return terms;
  }

  renderCourseBlock() {
    const courses = this.props.courses.map(course => 
      <div className="ui celled list">
        <div className="item">
          <div className="right floated content">
            <Link to={`admin/deleteCourse/${course.id}`} className="ui button negative">
              Delete
            </Link>
          </div>
          <div className="content">
            {course.courseName}
          </div>
        </div>
      </div> 
    );
    return courses;
  }

  renderInstructorBlock() {
    const instructors = this.props.instructors.map(instructor =>
      <div className="ui celled list">
        <div className="item">
          <div className="right floated content">
            <Link to={`admin/deleteInstructor/${instructor.id}`} className="ui button negative">
              Delete
            </Link>
          </div>
          <div className="content">
            {instructor.instructor}
            <div className="description">
              {instructor.course}
            </div>
          </div>
        </div>
      </div> 
    );
    return instructors;
  }

  render() {
    return (
      <div>
        <h1>Admin Dashboard</h1> <br></br>
        <h2>Terms</h2>
        {this.renderTermBlock()}
        {this.renderTermInput()}
        <br></br> <br></br> <br></br>
        <h2>Courses</h2>
        <br></br>
        {this.renderCourseBlock()}
        {this.renderCourseInput()}
        <br></br>
        <h2>Instructors</h2>
        <br></br>
        {this.renderInstructorBlock()}
        {this.renderInstructorInput()}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { 
    terms: Object.values(state.terms),
    courses: Object.values(state.courses),
    instructors: Object.values(state.instructors)
  }
}

  export default connect(mapStateToProps, { fetchTerms, addTerm, deleteTerm, fetchCourses, addCourse, deleteCourse, fetchInstructors, addInstructor, deleteInstructor })(AdminScreen);