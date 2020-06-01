import {
  ADD_COURSE,
  DELETE_COURSE,
  FETCH_COURSES
} from "../actions/types";

export default (state=[], action) => {
  switch(action.type) {
    case FETCH_COURSES:
      return [ ...action.payload ];
    case ADD_COURSE:
      return [ ...state, action.payload ];
    case DELETE_COURSE:
      return state.filter(e => e.course !== action.payload);
    default:
      return state;
  }
}