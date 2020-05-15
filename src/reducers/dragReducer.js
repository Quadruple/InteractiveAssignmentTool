import {
  WRITE_TIMES
} from "../actions/types";

export default (state=[], action) => {
  switch(action.type) {
    case WRITE_TIMES:
      return action.payload 
    default:
      return state;
  }
}