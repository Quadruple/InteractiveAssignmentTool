import {
  FETCH_INSTRUCTOR_COURSE
} from "../actions/types";

export default (state = "", action) => {
  switch(action.type) {
    case FETCH_INSTRUCTOR_COURSE:
      return { instructorCourse: action.payload };
    default:
      return state;
  }
}