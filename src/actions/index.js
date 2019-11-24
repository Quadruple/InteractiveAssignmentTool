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
  FETCH_TIME 
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

export const createStudent = formValues => async (dispatch, getState) => {
  const { userId } = getState().auth;
  const response = await axios.post("/students", { ...formValues });
  console.log(response.data)

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

export const createTime = formValues => async (dispatch, getState) => {
  const { userId } = getState().auth;
  const response = await axios.post("/times", { ...formValues });
  console.log(response.data)

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