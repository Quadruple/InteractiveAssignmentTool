import {
  SIGN_IN,
  SIGN_OUT
} from "../actions/types";

const INITIAL_STATE = {
  isSignedIn: null,
}

export default (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case SIGN_IN:
      return {...state, isSignedIn: true, userType: action.payload.userType, userMail: action.payload.userMail };
    case SIGN_OUT:
        return {...state, isSignedIn: false };
    default:
      return state;
  }
}