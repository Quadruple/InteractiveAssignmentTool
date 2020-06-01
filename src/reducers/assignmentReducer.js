import {
  FETCH_ASSIGNMENTS,
} from "../actions/types";

export default (state={}, action) => {
  switch(action.type) {
    case FETCH_ASSIGNMENTS:
      return action.payload
    default:
      return state;
  }
}