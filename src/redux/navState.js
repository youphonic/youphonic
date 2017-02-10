import {ENTERED_APP, OPEN_LOGIN, CLOSE_LOGIN, OPEN_SIGNUP, CLOSE_SIGNUP, OPEN_LOGIN_ALERT, CLOSE_SIGNUP_ALERT, OPEN_PLAYS, CLOSE_PLAYS, TOGGLE_SAVE_A_PLAY, OPEN_WINDOW_SETTINGS, CLOSE_WINDOW_SETTINGS} from '../constants';
const initialState = {
	enteredApp: false,
	loginOpen: false,
  signUpOpen: false,
  saveAPlayOpen: false,
  loginAlertOpen: false,
	playsOpen: false,
	windowSettingOpen: false
};
// action creators
// opens and closes dialog box for user registration from upper left account
// menu needs to be dispatched to redux since dialog opens from menu and both
// UI components require a local 'open' key for navigation. This pattern will
// be required whenever mixing MaterialUI navigation components that
// work together
export const enterApp = () => {
  return {type: ENTERED_APP};
};
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
export const openWindowSettings = () => {
  return {type: OPEN_WINDOW_SETTINGS};
};
export const closeWindowSettings = () => {
  return {type: CLOSE_WINDOW_SETTINGS};
};
export const toggleSaveAPlay = () => {
  return {type: TOGGLE_SAVE_A_PLAY};
};
export const openPlays = () => {
  return {type: OPEN_PLAYS};
};
export const closePlays = () => {
  return {type: CLOSE_PLAYS};
};
// same pattern for opening and closing user signup alerts ('SnackBar')
// allows for later refactoring to include user first name in alert
// since we will login the user after they register
export const openLoginAlert = (user) => {
  return {type: OPEN_LOGIN_ALERT, user};
};

// reducer
export default(state = initialState, action) => {

	let newState = Object.assign({}, state);

  switch (action.type) {
		case ENTERED_APP:
      newState.enteredApp = true;
			break;
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
			break;
    case TOGGLE_SAVE_A_PLAY:
      newState.saveAPlayOpen = !newState.saveAPlayOpen;
      break;
		case OPEN_PLAYS:
			newState.playsOpen = true;
			break;
		case CLOSE_PLAYS:
			newState.playsOpen = false;
			break;
		case OPEN_WINDOW_SETTINGS:
			newState.windowSettingOpen = true;
			break;
		case CLOSE_WINDOW_SETTINGS:
			newState.windowSettingOpen = false;
			break;
    default:
      return state;
  }
	return newState;

};
