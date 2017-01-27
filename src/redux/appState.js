import { START_CANVAS, STOP_CANVAS } from '../constants'
import { ourP5 } from '../components/P5Wrapper';


const initialState = true;

// action creator
export const startCanvas = () => {
  // ourP5.loop();
  return {
    type: START_CANVAS,
  };
};

export const stopCanvas = () => {
  // ourP5.noLoop();
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
