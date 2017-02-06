import { START_CANVAS, STOP_CANVAS} from '../constants';


const initialState = true;

// action creator
export const startCanvas = () => {
  return {
    type: START_CANVAS,
  };
};

export const stopCanvas = () => {
  return {
    type: STOP_CANVAS,
  };
};

// reducer
export default(state = initialState, action) => {

  switch (action.type) {
    case START_CANVAS :
      return true;

    case STOP_CANVAS :
      return false;

    default:
      return state;
  }
};
