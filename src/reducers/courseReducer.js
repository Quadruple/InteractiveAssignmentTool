import _ from "lodash";

import {
  ADD_COURSE,
  DELETE_COURSE,
  FETCH_COURSES
} from "../actions/types";

export default (state={}, action) => {
  switch(action.type) {
    case FETCH_COURSES:
      return { ...state, ..._.mapKeys(action.payload, "id")}
    case ADD_COURSE:
      return { ...state, [action.payload.id]: action.payload };
    case DELETE_COURSE:
      return _.omit(state, `${action.payload}`);
    default:
      return state;
  }
}