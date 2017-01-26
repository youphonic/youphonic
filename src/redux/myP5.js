import { INIT_P5 } from '../constants'


const initialState = null;

// action creator
export const initP5 = (instance) => {
  return {
    type: INIT_P5,
    instance
  };
};

// reducer
export default(state = initialState, action) => {

  switch (action.type) {
    case INIT_P5:
      if (state) break;
      return action.instance;

    default:
      return state;
  }
};
