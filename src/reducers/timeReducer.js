import _ from "lodash";

import {
  FETCH_TIMES,
  FETCH_TIME,
  DELETE_TIME,
  EDIT_TIME, 
  CREATE_PREFERENCES
} from "../actions/types";

export default (state={}, action) => {
  switch(action.type) {
    case FETCH_TIMES:
      return [ ...action.payload ]
    case FETCH_TIME:
      return { ...state, [action.payload.id]: action.payload };
    case CREATE_PREFERENCES:
      return { ...state, ...action.payload };
    case EDIT_TIME:
      return { ...state, [action.payload.id]: action.payload };
    case DELETE_TIME:
      return _.omit(state, `${action.payload}`);
    default:
      return state;
  }
}