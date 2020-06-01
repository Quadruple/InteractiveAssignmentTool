import { combineReducers } from "redux";
import authReducer from "./authReducer";
import studentReducer from "./studentReducer";
import timeReducer from "./timeReducer";
import termReducer from "./termReducer"
import courseReducer from "./courseReducer"
import instructorReducer from "./instructorReducer"
import { reducer as formReducer } from "redux-form";
import dragReducer from "./dragReducer";
import assignmentReducer from "./assignmentReducer";
import instructorCourseReducer from "./instructorCourseReducer";

export default combineReducers({
  auth: authReducer,
  form: formReducer,
  students: studentReducer,
  times: timeReducer,
  terms: termReducer,
  courses: courseReducer,
  instructors: instructorReducer,
  drag: dragReducer,
  assignments: assignmentReducer,
  instructorCourse: instructorCourseReducer
});