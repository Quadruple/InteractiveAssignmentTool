import {
  SIGN_IN,
  SIGN_OUT,
  CHECK_MAIL
} from "../actions/types";

const INITIAL_STATE = {
  isSignedIn: null,
}

export default (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case SIGN_IN:
      return {...state, isSignedIn: true, userType: "INSTRUCTOR" };
    case SIGN_OUT:
        return {...state, isSignedIn: false };
    case CHECK_MAIL:
      return {...state, userType: action.payload}
    default:
      return state;
  }
}