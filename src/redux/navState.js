import {OPEN_SIGNUP, CLOSE_SIGNUP, OPEN_SIGNUP_ALERT, CLOSE_SIGNUP_ALERT} from '../constants';
const initialState = {
  signUpOpen: false,
  signUpAlertOpen: false
};
// action creators
// opens and closes dialog box for user registration from upper left account
// menu needs to be dispatched to redux since dialog opens from menu and both
// UI components require a local 'open' key for navigation. This pattern will
// be required whenever mixing MaterialUI navigation components that
// work together
export const openSignup = () => {
  return {type: OPEN_SIGNUP};
};
export const closeSignup = () => {
  return {type: CLOSE_SIGNUP};
};
// same pattern for opening and closing user signup alerts ('SnackBar')
// allows for later refactoring to include user first name in alert
// since we will login the user after they register
export const openSignupAlert = (user) => {
  return {type: OPEN_SIGNUP_ALERT, user};
};

// reducer
export default(state = initialState, action) => {
  switch (action.type) {
    case OPEN_SIGNUP:
      return Object.assign({}, state, {signUpOpen: true});
    case CLOSE_SIGNUP:
      return Object.assign({}, state, {signUpOpen: false});
    case OPEN_SIGNUP_ALERT:
      return Object.assign({}, state, {signUpAlertOpen: true});
    default:
      return state;
  }
};
