import history from "../history";
import axios from "../axios";
import { 
  SIGN_IN, 
  SIGN_OUT, 
  CREATE_STUDENT,
  FETCH_STUDENTS,
  FETCH_STUDENT,
  FETCH_STUDENT_COURSE,
  DELETE_STUDENT,
  EDIT_STUDENT,
  CREATE_PREFERENCES,
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

const encodeRequestBody = (requestBody) => {
  var formBody = [];
  for (var property in requestBody) {
    var encodedKey = encodeURIComponent(property);
    var encodedValue = encodeURIComponent(requestBody[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");

  return formBody;
}

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
  var request = new XMLHttpRequest()

  var requestLink = 'http://localhost/php/Api.php?apicall=checkAccountType&email=' + email

  // Define what happens on successful data submission
  request.addEventListener( 'load', function(event) {
    console.log( 'Yeah! Data sent and response loaded.' );
  } );

  // Define what happens in case of error
  request.addEventListener( 'error', function(event) {
    alert( 'Oops! Something went wrong.' );
  } );

  request.open("GET", requestLink, true);
  request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

  request.onreadystatechange = function() { // Call a function when the state changes.
    if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
        console.log('Response Check Mail: ', JSON.parse(request.responseText));
        var accountGetter =  JSON.parse(request.responseText)
        if(accountGetter.accountType == 'Admin')
        {
          dispatch({ type: CHECK_MAIL, payload: "ADMIN" });
        }
        else if(accountGetter.accountType == 'Instructor')
        {
          dispatch({ type: CHECK_MAIL, payload: "INSTRUCTOR" });
        }
        else
        {
          dispatch({ type: CHECK_MAIL, payload: "STUDENT" });
        }
    }
  }

  request.send();
  
  //dispatch({ type: CHECK_MAIL, payload: "INSTRUCTOR" });
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
    console.log( 'Yeah! Data sent and response loaded.' );
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
    console.log( 'Yeah! Data sent and response loaded.' );
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
  /*
  const fetchStudentBaseUrl = "http://localhost/php/Api.php?apicall=getStudentInformation&studentemail=";
  const fetchStudentUrl = fetchStudentBaseUrl + studentEmail;

  fetch(fetchStudentUrl)
  .then((response) => response.json())
  .then(function(data) {
    console.log(data);
    dispatch({ type: FETCH_STUDENT, payload: data});  
  });
  */
  const response = await axios.get(`/students/${id}`)

  dispatch({ type: FETCH_STUDENT, payload: response.data});
}

export const editStudent = (id, formValues) => async dispatch => {
  const response = await axios.patch(`/students/${id}`, formValues);

  dispatch({ type: EDIT_STUDENT, payload: response.data});
  history.push("/instructor");
}

export const deleteStudent = studentEmail => async dispatch => {
  const deleteStudentBaseUrl = "http://localhost/php/Api.php?apicall=deleteStudent&studentemail=";
  const deleteStudentUrl = deleteStudentBaseUrl + studentEmail;
  fetch(deleteStudentUrl)
  .then((response) => response.json())
  .then(function(data) {
    console.log(data); 
  });
}

export const createPreferences = preferences => async (dispatch) => {
  //const response = await axios.post("/times", ...preferences);
  await Promise.all(preferences.map(preference => axios.post("/times", preference )))

  //dispatch({ type: CREATE_PREFERENCES, payload: response.data });
  history.push("/student");
}

export const fetchTimes = () => async dispatch => {
  const response = await axios.get("/times")

  dispatch({ type: FETCH_TIMES, payload: response.data});
}

export const fetchStudentCourse = id => async dispatch => {
  //const response = await axios.get(`/studentCourse`)

  dispatch({ type: FETCH_STUDENT_COURSE, payload: "IF 100"});
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
  let termInDatabaseFormat = formValues.year + " " + formValues.semester;
  const insertTermUrl = "http://localhost/php/Api.php?apicall=insertTerm";

  let dataForBody = {
    term: termInDatabaseFormat
  };

  let encodedBody = encodeRequestBody(dataForBody);
  console.log(encodedBody);

  let requestData = {
    method: 'POST',
    body: encodedBody,
    headers: { "Content-Type": "application/x-www-form-urlencoded" }
  }

  fetch(insertTermUrl, requestData)
  .then((response) => response.json())
  .then(function(data) {
    console.log(data);
  });
}

export const deleteTerm = term => async dispatch => {
  const deleteTermBaseUrl = "http://localhost/php/Api.php?apicall=deleteTerm&term=";
  const deleteTermUrl = deleteTermBaseUrl + term;
  fetch(deleteTermUrl)
  .then((response) => response.json())
  .then(function(data) {
    console.log(data); 
  });
}

export const fetchTerms = () => async dispatch => {
  const fetchTermsUrl = "http://localhost/php/Api.php?apicall=getTerms";
  fetch(fetchTermsUrl)
  .then((response) => response.json())
  .then(function(data) {
    console.log(data);
    dispatch({ type: FETCH_TERMS, payload: data});  
  });
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

export const deleteInstructor = instructorEmail => async dispatch => {
  const deleteInstructorBaseUrl = "http://localhost/php/Api.php?apicall=deleteInstructor&instructoremail=";
  const deleteInstructorUrl = deleteInstructorBaseUrl + instructorEmail;
  fetch(deleteInstructorUrl)
  .then((response) => response.json())
  .then(function(data) {
    console.log(data); 
  });
}

export const fetchInstructors = () => async dispatch => {
  const fetchInstructorsUrl = "http://localhost/php/Api.php?apicall=getInstructors";
  fetch(fetchInstructorsUrl)
  .then((response) => response.json())
  .then(function(data) {
    console.log(data);
    dispatch({ type: FETCH_INSTRUCTORS, payload: data});  
  });
}