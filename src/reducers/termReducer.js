import _ from "lodash";

import {
  ADD_TERM,
  DELETE_TERM,
  FETCH_TERMS
} from "../actions/types";

export default (state=[], action) => {
  switch(action.type) {
    case FETCH_TERMS:
      return [...action.payload]
    case ADD_TERM:
      return [ ...state, action.payload ];
    case DELETE_TERM:
      return _.omit(state, `${action.payload}`);
    default:
      return state;
  }
}