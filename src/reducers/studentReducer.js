import _ from "lodash";

import {
  CREATE_STUDENT,
  FETCH_STUDENTS,
  FETCH_STUDENT,
  DELETE_STUDENT,
  EDIT_STUDENT,
  FETCH_STUDENT_COURSE 
} from "../actions/types";

export default (state={}, action) => {
  switch(action.type) {
    case FETCH_STUDENTS:
      return { ...state, ..._.mapKeys(action.payload, "id")}
    case FETCH_STUDENT:
      return { ...state, [action.payload.id]: action.payload };
    case FETCH_STUDENT_COURSE:
      return { ...state, courseName: action.payload };
    case CREATE_STUDENT:
      return { ...state, [action.payload.id]: action.payload };
    case EDIT_STUDENT:
      return { ...state, [action.payload.id]: action.payload };
    case DELETE_STUDENT:
      return _.omit(state, `${action.payload}`);
    default:
      return state;
  }
}