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
  CHECK_MAIL
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
  var request = new XMLHttpRequest();

  let urlEncodedData = "",
  urlEncodedDataPairs = [],
  name;

  for(name in formValues)
  {
    urlEncodedDataPairs.push( encodeURIComponent( name ) + '=' + encodeURIComponent( formValues[name] ) );
  }

  urlEncodedData = urlEncodedDataPairs.join( '&' ).replace( /%20/g, '+' );

  // Define what happens on successful data submission
  request.addEventListener( 'load', function(event) {
    alert( 'Yeah! Data sent and response loaded.' );
  } );

  // Define what happens in case of error
  request.addEventListener( 'error', function(event) {
    alert( 'Oops! Something went wrong.' );
  } );

  request.open("POST", 'http://localhost/php/Api.php?apicall=insertStudent', true);
  request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

  request.onreadystatechange = function() { // Call a function when the state changes.
    if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
        console.log(request.responseText);
    }
  }

  request.send(urlEncodedData);
}

export const fetchStudents = () => async dispatch => {
  var request = new XMLHttpRequest();

  // Define what happens on successful data submission
  request.addEventListener( 'load', function(event) {
    alert( 'Yeah! Data sent and response loaded.' );
  } );

  // Define what happens in case of error
  request.addEventListener( 'error', function(event) {
    alert( 'Oops! Something went wrong.' );
  } );

  request.open("GET", 'http://localhost/php/Api.php?apicall=getStudents', true);

  request.onreadystatechange = function() { // Call a function when the state changes.
    if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
        console.log('Response for GET is:', JSON.parse(request.responseText));
        var responseJson = JSON.parse(request.responseText);
        console.log('students are:', responseJson.students);
        dispatch({ type: FETCH_STUDENTS, payload: responseJson.students});
    }
  }

  request.send();
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