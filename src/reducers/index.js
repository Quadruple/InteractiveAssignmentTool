import { combineReducers } from "redux";
import authReducer from "./authReducer";
import studentReducer from "./studentReducer";
import timeReducer from "./timeReducer";
import { reducer as formReducer } from "redux-form";

export default combineReducers({
  auth: authReducer,
  form: formReducer,
  students: studentReducer,
  times: timeReducer
});