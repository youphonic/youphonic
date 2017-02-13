import {
  OPEN_LOGIN,
  OPEN_PLAYS,
  ENTERED_APP,
  CLOSE_LOGIN,
  OPEN_SIGNUP,
  CLOSE_PLAYS,
  CLOSE_SIGNUP,
  TOGGLE_LOGIN,
  TOGGLE_WELCOME,
  TOGGLE_DEV_INFO,
  TOGGLE_TUTORIAL,
  OPEN_LOGIN_ALERT,
  OPEN_SHAPESETTINGS,
  TOGGLE_SAVE_A_PLAY,
  CLOSE_SHAPESETTINGS,
  OPEN_WINDOW_SETTINGS,
  CLOSE_WINDOW_SETTINGS
} from '../constants';


const initialState = {
  playsOpen: false,
	loginOpen: false,
  signUpOpen: false,
  enteredApp: false,
  saveAPlayOpen: false,
  toggleDevInfo: false,


  loginAlertOpen: false,

  welcomeSnackbar: false,


  devInfoOpenClose: false,
  tutorialOpenClose: false,
	windowSettingOpen: false,
  shapeSettingsOpen: false
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
export const openShapeSettings = () => {
  return {type: OPEN_SHAPESETTINGS};
};
export const closeShapeSettings = () => {
  return {type: CLOSE_SHAPESETTINGS};
};
export const toggleTutorial = () => {
  return {type: TOGGLE_TUTORIAL};
};
export const toggleDevInfo = () => {
  return {type: TOGGLE_DEV_INFO};
};


export const toggleLogin = () => {
  return {type: TOGGLE_LOGIN};
};
export const toggleWelcome = () => {
  return {type: TOGGLE_WELCOME};
};


export const openLogin = () => {
  return {type: OPEN_LOGIN};
};
export const closeLogin = () => {
  return {type: CLOSE_LOGIN};
};
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
    case OPEN_SIGNUP:
			newState.signUpOpen = true;
			break;
    case CLOSE_SIGNUP:
			newState.signUpOpen = false;
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
    case OPEN_SHAPESETTINGS:
      newState.shapeSettingsOpen = true;
      break;
    case CLOSE_SHAPESETTINGS:
      newState.shapeSettingsOpen = false;
      break;
    case TOGGLE_LOGIN:
      newState.loginOpen = !newState.loginOpen;
      break;
    case TOGGLE_WELCOME:
      newState.welcomeSnackbar = !newState.welcomeSnackbar;
      break;
    case TOGGLE_TUTORIAL:
      newState.tutorialOpenClose = !newState.tutorialOpenClose;
      break;
    case TOGGLE_SAVE_A_PLAY:
      newState.saveAPlayOpen = !newState.saveAPlayOpen;
      break;
    case TOGGLE_DEV_INFO:
      newState.devInfoOpenClose = !newState.devInfoOpenClose;
      break;


    case OPEN_LOGIN:
      newState.loginOpen = true;
      break;
    case CLOSE_LOGIN:
      newState.loginOpen = false;
      break;
    case OPEN_LOGIN_ALERT:
      newState.loginAlertOpen = true;
      break;


    default:
      return state;
  }
	return newState;

};
