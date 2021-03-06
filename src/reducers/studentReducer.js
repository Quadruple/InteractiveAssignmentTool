import {
  CREATE_STUDENT,
  FETCH_STUDENTS,
  DELETE_STUDENT,
  EDIT_STUDENT,
  FETCH_STUDENT_COURSE 
} from "../actions/types";

export default (state=[], action) => {
  switch(action.type) {
    case FETCH_STUDENTS:
      return [ ...action.payload ]
    case FETCH_STUDENT_COURSE:
      return action.payload;
    case CREATE_STUDENT:
      return [...state, action.payload ];
    case EDIT_STUDENT:
      return [ ...state.filter(e => e.studentemail !== action.payload.studentemail), action.payload ];
    case DELETE_STUDENT:
      return [ ...state.filter(e => e.studentemail !== action.payload) ];
    default:
      return state;
  }
}