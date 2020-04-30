import _ from "lodash";

import {
  ADD_INSTRUCTOR,
  DELETE_INSTRUCTOR,
  FETCH_INSTRUCTORS
} from "../actions/types";

export default (state={}, action) => {
  switch(action.type) {
    case FETCH_INSTRUCTORS:
      return { ...state, ..._.mapKeys(action.payload, "id")}
    case ADD_INSTRUCTOR:
      return { ...state, [action.payload.id]: action.payload };
    case DELETE_INSTRUCTOR:
      return _.omit(state, `${action.payload}`);
    default:
      return state;
  }
}