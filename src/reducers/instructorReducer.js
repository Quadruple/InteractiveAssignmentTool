import _ from "lodash";

import {
  ADD_INSTRUCTOR,
  DELETE_INSTRUCTOR,
  FETCH_INSTRUCTORS
} from "../actions/types";

export default (state=[], action) => {
  switch(action.type) {
    case FETCH_INSTRUCTORS:
      return [ ...action.payload ]
    case ADD_INSTRUCTOR:
      return [ ...state, action.payload ];
    case DELETE_INSTRUCTOR:
      return state.filter(e => e.instructoremail != action.payload);
    default:
      return state;
  }
}