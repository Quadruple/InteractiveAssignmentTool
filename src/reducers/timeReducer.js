import {
  FETCH_TIMES,
  CREATE_PREFERENCES,
  FETCH_TIMES_BY_COURSE
} from "../actions/types";

export default (state={}, action) => {
  switch(action.type) {
    case FETCH_TIMES:
      return [ ...action.payload ]
    case CREATE_PREFERENCES:
      return [ ...state, action.payload ];
    case FETCH_TIMES_BY_COURSE:
      return [ ...action.payload ];
    default:
      return state;
  }
}