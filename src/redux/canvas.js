import { TOGGLE_PLAY } from '../constants'


const initialState = false;

// action creator
export const addChunk = (toggle) => {
  return {
    type: TOGGLE_PLAY,
    toggle: !toggle
  }
}

// reducer
export default(state = initialState, action) => {
  const newState = state;

  switch (action.type) {
    case TOGGLE_PLAY :
      return action.toggle;

    default:
      return state;
  }
}
