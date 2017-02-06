import { SAVE_PLAY } from '../constants';


const initialState = {};

// action creator
export const savePlay = () => {
  return {
    type: SAVE_PLAY,
  };
};

// reducer
export default(state = initialState, action) => {

  switch (action.type) {
    case SAVE_PLAY :
      return true;

    case STOP_CANVAS :
      return false;

    default:
      return state;
  }
};
