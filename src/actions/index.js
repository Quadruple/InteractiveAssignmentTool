import history from "../history";
import axios from "../axios";
import { 
  SIGN_IN, 
  SIGN_OUT, 
  CREATE_STUDENT,
  FETCH_STUDENTS,
  FETCH_STUDENT,
  DELETE_STUDENT,
  EDIT_STUDENT,
  CREATE_TIME,
  EDIT_TIME,
  DELETE_TIME,
  FETCH_TIMES,
  FETCH_TIME,
  CHECK_MAIL,
  ADD_TERM,
  DELETE_TERM,
  ADD_COURSE,
  DELETE_COURSE,
  ADD_INSTRUCTOR,
  DELETE_INSTRUCTOR,
  FETCH_TERMS,
  FETCH_COURSES,
  FETCH_INSTRUCTORS
} from "../actions/types";


export const signIn = () => {
  return {
    type: SIGN_IN,
  }
}

export const signOut = () => {
  return {
    type: SIGN_OUT,
  }
}

export const checkMail = email => async  dispatch => {
  dispatch({ type: CHECK_MAIL, payload: "INSTRUCTOR" });
}

export const createStudent = formValues => async (dispatch) => {
  const response = await axios.post("/students", { ...formValues });

  dispatch({ type: CREATE_STUDENT, payload: response.data });
  history.push("/instructor");
}

export const fetchStudents = () => async dispatch => {
  const response = await axios.get("/students")

  dispatch({ type: FETCH_STUDENTS, payload: response.data});
}

export const fetchStudent = id => async dispatch => {
  const response = await axios.get(`/students/${id}`)

  dispatch({ type: FETCH_STUDENT, payload: response.data});
}

export const editStudent = (id, formValues) => async dispatch => {
  const response = await axios.patch(`/students/${id}`, formValues);

  dispatch({ type: EDIT_STUDENT, payload: response.data});
  history.push("/instructor");
}

export const deleteStudent = id => async dispatch => {
  await axios.delete(`/students/${id}`);

  dispatch({ type: DELETE_STUDENT, payload: id});
  history.push("/instructor");
}

export const createTime = formValues => async (dispatch) => {
  const response = await axios.post("/times", { ...formValues });

  dispatch({ type: CREATE_TIME, payload: response.data });
  history.push("/student");
}

export const fetchTimes = () => async dispatch => {
  const response = await axios.get("/times")

  dispatch({ type: FETCH_TIMES, payload: response.data});
}

export const fetchTime = id => async dispatch => {
  const response = await axios.get(`/times/${id}`)

  dispatch({ type: FETCH_TIME, payload: response.data});
}

export const editTime = (id, formValues) => async dispatch => {
  const response = await axios.patch(`/times/${id}`, formValues);

  dispatch({ type: EDIT_TIME, payload: response.data});
  history.push("/student");
}

export const deleteTime = id => async dispatch => {
  await axios.delete(`/times/${id}`);

  dispatch({ type: DELETE_TIME, payload: id});
  history.push("/student");
}

export const addTerm = formValues => async (dispatch) => {
  const response = await axios.post("/terms", { ...formValues });

  dispatch({ type: ADD_TERM, payload: response.data });
  history.push("/admin");
}

export const deleteTerm = id => async dispatch => {
  await axios.delete(`/terms/${id}`);

  dispatch({ type: DELETE_TERM, payload: id});
  history.push("/admin");
}

export const fetchTerms = () => async dispatch => {
  const response = await axios.get("/terms")

  dispatch({ type: FETCH_TERMS, payload: response.data});
}

export const addCourse = formValues => async (dispatch) => {
  const response = await axios.post("/courses", { ...formValues });

  dispatch({ type: ADD_COURSE, payload: response.data });
  history.push("/admin");
}

export const deleteCourse = id => async dispatch => {
  await axios.delete(`/courses/${id}`);

  dispatch({ type: DELETE_COURSE, payload: id});
  history.push("/admin");
}

export const fetchCourses = () => async dispatch => {
  const response = await axios.get("/courses")

  dispatch({ type: FETCH_COURSES, payload: response.data});
}

export const addInstructor = formValues => async (dispatch) => {
  var courseAndTerm = formValues.course.split(" ")
  const response = await axios.post("/instructors", { course: courseAndTerm[0], term: courseAndTerm[1] + " " + courseAndTerm[2], instructor: formValues.instructor });

  dispatch({ type: ADD_INSTRUCTOR, payload: response.data });
  history.push("/admin");
}

export const deleteInstructor = id => async dispatch => {
  await axios.delete(`/instructors/${id}`);

  dispatch({ type: DELETE_INSTRUCTOR, payload: id});
  history.push("/admin");
}

export const fetchInstructors = () => async dispatch => {
  const response = await axios.get("/instructors")

  dispatch({ type: FETCH_INSTRUCTORS, payload: response.data});
}