import {
  FETCH_TIMES,
  CREATE_PREFERENCES
} from "../actions/types";

export default (state={}, action) => {
  switch(action.type) {
    case FETCH_TIMES:
      return [ ...action.payload ]
    case CREATE_PREFERENCES:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}