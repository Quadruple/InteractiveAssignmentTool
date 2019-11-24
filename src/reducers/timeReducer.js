import _ from "lodash";

import {
  CREATE_TIME,
  FETCH_TIMES,
  FETCH_TIME,
  DELETE_TIME,
  EDIT_TIME 
} from "../actions/types";

export default (state={}, action) => {
  switch(action.type) {
    case FETCH_TIMES:
      return { ...state, ..._.mapKeys(action.payload, "id")}
    case FETCH_TIME:
      return { ...state, [action.payload.id]: action.payload };
    case CREATE_TIME:
      return { ...state, [action.payload.id]: action.payload };
    case EDIT_TIME:
      return { ...state, [action.payload.id]: action.payload };
    case DELETE_TIME:
      return _.omit(state, `${action.payload}`);
    default:
      return state;
  }
}