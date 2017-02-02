import { OPEN_SIGNUP, CLOSE_SIGNUP } from '../constants';


const initialState = {signUpOpen: false};

// action creator
export const openSignup = () => {
  return {
    type: OPEN_SIGNUP,
  };
};

export const closeSignup = () => {
  return {
    type: CLOSE_SIGNUP,
  };
};

// reducer
export default(state = initialState, action) => {

  switch (action.type) {
    case OPEN_SIGNUP :
      return Object.assign({}, state, {signUpOpen: true});

    case CLOSE_SIGNUP :
      return Object.assign({}, state, {signUpOpen: false});

    default:
      return state;
  }
};
