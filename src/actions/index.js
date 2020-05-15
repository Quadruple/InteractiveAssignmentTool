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
  WRITE_TIMES,
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
  FETCH_INSTRUCTORS,
  FETCH_ASSIGNMENTS,
  SAVE_ASSIGNMENTS
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

export const editStudent = (formValues) => async dispatch => {
  const editStudentUrl = "http://localhost/php/Api.php?apicall=editStudent";

  let dataForBody = {
    studentemail: formValues.studentemail,
    studentname: formValues.studentname,
    role: formValues.role,
    studentnumber: formValues.studentnumber,
    workhours: formValues.workhours,
    assistantscore: formValues.assistantscore,
    course: formValues.course
  };

  let encodedBody = encodeRequestBody(dataForBody);

  let requestData = {
    method: 'POST',
    body: encodedBody,
    headers: { "Content-Type": "application/x-www-form-urlencoded" }
  }

  fetch(editStudentUrl, requestData)
  .then((response) => response.json())
  .then(function(data) {
    console.log(data);
  });
  /*
  const response = await axios.patch(`/students/${id}`, formValues);

  dispatch({ type: EDIT_STUDENT, payload: response.data});
  history.push("/instructor");
  */
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
  //await Promise.all(preferences.map(preference => axios.post("/times", preference )))
  await axios.post("/times", { "Ege" : preferences } )

  //dispatch({ type: CREATE_PREFERENCES, payload: response.data });
  history.push("/student");
}

export const fetchTimes = () => async dispatch => {
  const response = await axios.get("/times")
  dispatch({ type: FETCH_TIMES, payload: response.data});
}

export const writeTimes = (preferences) => async dispatch => {
  //await Promise.all(preferences.map(preference => axios.post("/times", preference )))
  //const response = await axios.post("/times", ...prefs)
  dispatch({ type: WRITE_TIMES, payload: preferences });
}

export const fetchAssignments = () => async dispatch => {
  const response = await axios.get("/assignments")
  console.log(response)
  response.data[0] && dispatch({ type: FETCH_ASSIGNMENTS, payload: response.data[0]})
}

export const saveAssignments = (assignments, totalScore) => async dispatch => {
  console.log(assignments)
  await axios.post("/assignments", {assignments, totalScore} )
  dispatch({ type: SAVE_ASSIGNMENTS, payload: assignments });
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
  const addCourseUrl = "http://localhost/php/Api.php?apicall=insertCourse";

  let dataForBody = {
    term: formValues.term,
    course: formValues.courseName
  }

  let encodedBody = encodeRequestBody(dataForBody);

  let requestData = {
    method: 'POST',
    body: encodedBody,
    headers: { "Content-Type": "application/x-www-form-urlencoded" }
  }

  fetch(addCourseUrl, requestData)
  .then((response) => response.json())
  .then(function(data) {
    console.log(data);
  });
}

export const deleteCourse = coursename => async dispatch => {
  const deleteCourseBaseUrl = "http://localhost/php/Api.php?apicall=deleteCourse&coursename=";
  const deleteCourseUrl = deleteCourseBaseUrl + coursename;

  fetch(deleteCourseUrl)
  .then((response) => response.json())
  .then(function(data) {
    console.log(data); 
  });
}

export const fetchCourses = () => async dispatch => {
  const fetchCoursesUrl = "http://localhost/php/Api.php?apicall=getCourses";

  fetch(fetchCoursesUrl)
  .then((response) => response.json())
  .then(function(data) {
    console.log(data);
    dispatch({ type: FETCH_COURSES, payload: data});  
  });
}

export const addInstructor = formValues => async (dispatch) => {
  const getInstructorEmailUrl = `http://localhost:4000/getEmailOfInstructorName/${formValues.instructor}`;
  const insertInstructorEmailUrl = "http://localhost/php/Api.php?apicall=insertInstructor";

  var courseAndTerm = formValues.course.split(" ");

  fetch(getInstructorEmailUrl)
  .then((response) => response.text())
  .then(function(data) {
    //console.log(data);
    let dataForBody = {
      instructoremail: data,
      instructorname: formValues.instructor,
      term: courseAndTerm[2] + " " + courseAndTerm[3],
      course: courseAndTerm[0] + " " + courseAndTerm[1]
    }
  
    let encodedBody = encodeRequestBody(dataForBody);
  
    let requestData = {
      method: 'POST',
      body: encodedBody,
      headers: { "Content-Type": "application/x-www-form-urlencoded" }
    }
  
    fetch(insertInstructorEmailUrl, requestData)
    .then((response) => response.json())
    .then(function(data) {
      console.log(data);
    });
  });
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