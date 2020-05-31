import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import { useSelector } from 'react-redux'
import {
  fetchTerms,
  addTerm,
  deleteTerm,
  fetchCourses,
  addCourse,
  deleteCourse,
  fetchInstructors,
  addInstructor,
  deleteInstructor
} from "../../actions";

function AdminScreen(props) {
  const [addTermForm, setAddTermForm] = useState({});
  const [addCourseForm, setAddCourseForm] = useState({});
  const [addInstructorForm, setAddInstructorForm] = useState({});
  const [instructorOptions, setInstructorOptions] = useState([]);
  const terms = useSelector(state =>  state.terms);
  const courses = useSelector(state => state.courses);
  const instructors = useSelector(state => state.instructors);
  console.log(addInstructorForm);



  useEffect(() => {
    props.fetchTerms();
    props.fetchCourses();
    props.fetchInstructors();
  }, []);

  function deleteTermFunction(term)
  {
    props.deleteTerm(term);
    setTimeout(props.fetchTerms(), 1000);
  }

  useEffect(() => {
    let courseArr;
    if (addInstructorForm.course)
      courseArr = addInstructorForm.course.split(" ")

    courseArr && axios.get(`http://localhost:4000/getInstructors/${courseArr[0] + " " + courseArr[1]}`)
      .then((response) => {
        setInstructorOptions(response.data);
      });

  }, [addInstructorForm.course]);

  const renderTermInput = () => {
    return (
      <div style={{ textAlign: 'right' }}>
        <select class="ui dropdown" style={{ marginRight: "10px" }} onChange={e => setAddTermForm({ ...addTermForm, year: e.target.value })}>
          <option value="">Year</option>
          <option value="2015-2016">2015-2016</option>
          <option value="2016-2017">2016-2017</option>
        </select>
        <select class="ui dropdown" style={{ marginRight: "10px" }} onChange={e => setAddTermForm({ ...addTermForm, semester: e.target.value })}>
          <option value="">Semester</option>
          <option value="Fall">Fall</option>
          <option value="Spring">Spring</option>
        </select>
        <button onClick={() => props.addTerm(addTermForm)} className="ui button primary">
          Add Term
        </button>
      </div>
    );
  }

  const renderCourseInput = () => {
    const termOptions = terms.map(term =>
        <option value={term.term}>{term.term}</option>
    );
    return (
      <div style={{ textAlign: 'right' }}>
        <select class="ui dropdown" onChange={e => setAddCourseForm({ ...addCourseForm, term: e.target.value })}>
          <option value="">Term</option>
          {termOptions}
        </select>
        <div class="ui input" style={{ marginLeft: "20px", marginRight: "20px" }}>
          <input type="text" placeholder="Course Name Input" onChange={e => setAddCourseForm({ ...addCourseForm, courseName: e.target.value })}></input>
        </div>
        <button onClick={() => props.addCourse(addCourseForm)} className="ui button primary">
          Add Course
        </button>
      </div>
    );
  }

  const renderInstructorInput = () => {
    const courseOptions = props.courses.map(course =>
      course.map(result => 
        <option value={result.course + " " + result.term}>{result.course + " " + result.term}</option>  
      )
    )
    const instructorSelectOptions = instructorOptions.map(instructor =>
      <option value={instructor}>{instructor}</option>
    )
    return (
      <div style={{ textAlign: 'right' }}>
        <select class="ui dropdown" style={{ marginRight: "10px" }} onChange={e => setAddInstructorForm({ ...addInstructorForm, course: e.target.value })}>
          <option value="">Course</option>
          {courseOptions}
        </select>
        <select class="ui dropdown" style={{ marginRight: "10px" }} onChange={e => setAddInstructorForm({ ...addInstructorForm, instructor: e.target.value })}>
          <option value="">Instructor</option>
          {instructorSelectOptions}
        </select>
        <button onClick={() => props.addInstructor(addInstructorForm)} className="ui button primary">
          Add Instructor
        </button>
      </div>
    );
  }

  const renderTermBlock = () => {
    const termsHtml = terms.map(term =>
        <div className="item">
          <div className="right floated content">
            <Link onClick={() => deleteTermFunction(term.term)} className="ui button negative">
              Delete
              </Link>
          </div>
          <div className="content">
            {term.term}
            <div className="description">
              {term.term}
            </div>
          </div>
        </div>
    )
    return termsHtml;
  }

  const renderCourseBlock = () => {
    const coursesHtml = courses.map(course =>
        <div className="item">
          <div className="right floated content">
            <Link onClick={deleteCourse(course.course)} className="ui button negative">
              Delete
            </Link>
          </div>
          <div className="content">
            {course.course}
          </div>
          <div className="content">
            {course.term}
          </div>
        </div>
    );
    return coursesHtml;
  }

  const renderInstructorBlock = () => {
    const instructors = props.instructors.map(instructor =>
      instructor.map(result =>
        <div className="item">
          <div className="right floated content">
            <Link onClick={deleteInstructor(result.instructoremail)} className="ui button negative">
              Delete
            </Link>
          </div>
          <div className="content">
            {result.instructorname}
            <div className="description">
              {result.instructoremail + " / " + result.term}
            </div>
          </div>
        </div>
      )
    );
    return instructors;
  }

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <h2>Terms</h2>
      <div className="ui celled list">
        {terms && renderTermBlock()}
      </div>
      {renderTermInput()}
      <h2>Courses</h2>
      <div className="ui celled list">
        {!!courses.length && renderCourseBlock()}
      </div>
      {renderCourseInput()}
      <h2>Instructors</h2>
      <div className="ui celled list">
        {/*renderInstructorBlock()*/}
      </div>
      {/*renderInstructorInput()*/}
    </div>
  );
}

export default connect(null, { fetchTerms, addTerm, deleteTerm, fetchCourses, addCourse, deleteCourse, fetchInstructors, addInstructor, deleteInstructor })(AdminScreen);