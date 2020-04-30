import { combineReducers } from "redux";
import authReducer from "./authReducer";
import studentReducer from "./studentReducer";
import timeReducer from "./timeReducer";
import termReducer from "./termReducer"
import courseReducer from "./courseReducer"
import instructorReducer from "./instructorReducer"
import { reducer as formReducer } from "redux-form";

export default combineReducers({
  auth: authReducer,
  form: formReducer,
  students: studentReducer,
  times: timeReducer,
  terms: termReducer,
  courses: courseReducer,
  instructors: instructorReducer
});