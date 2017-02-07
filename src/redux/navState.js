import {OPEN_LOGIN, CLOSE_LOGIN, OPEN_SIGNUP, CLOSE_SIGNUP, OPEN_LOGIN_ALERT, CLOSE_SIGNUP_ALERT, OPEN_SHARING, CLOSE_SHARING} from '../constants';
const initialState = {
	loginOpen: false,
  signUpOpen: false,
  loginAlertOpen: false,
	sharingOpen: false
};
// action creators
// opens and closes dialog box for user registration from upper left account
// menu needs to be dispatched to redux since dialog opens from menu and both
// UI components require a local 'open' key for navigation. This pattern will
// be required whenever mixing MaterialUI navigation components that
// work together
export const openLogin = () => {
  return {type: OPEN_LOGIN};
};
export const closeLogin = () => {
  return {type: CLOSE_LOGIN};
};
export const openSignup = () => {
  return {type: OPEN_SIGNUP};
};
export const closeSignup = () => {
  return {type: CLOSE_SIGNUP};
};
export const openSharing = () => {
  return {type: OPEN_SHARING};
};
export const closeSharing = () => {
  return {type: CLOSE_SHARING};
};
// same pattern for opening and closing user signup alerts ('SnackBar')
// allows for later refactoring to include user first name in alert
// since we will login the user after they register
export const openLoginAlert = (user) => {
  return {type: OPEN_LOGIN_ALERT, user};
};

// reducer
export default(state = initialState, action) => {

	let newState = Object.assign({}, state)

  switch (action.type) {
		case OPEN_LOGIN:
      newState.loginOpen = true;
			break;
    case CLOSE_LOGIN:
			newState.loginOpen = false;
			break;
    case OPEN_SIGNUP:
			newState.signUpOpen = true;
			break;
    case CLOSE_SIGNUP:
			newState.signUpOpen = false;
			break;
    case OPEN_LOGIN_ALERT:
			newState.loginAlertOpen = true;
			break
		case OPEN_SHARING:
			newState.sharingOpen = true;
			break
		case CLOSE_SHARING:
			newState.sharingOpen = false;
			break
    default:
      return state;
  }
	return newState;

};
