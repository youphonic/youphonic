import { ADD_CHUNK } from '../constants'

const initialState = [];

// action creator
export const addChunk = (chunk) => {
  return {
    type: ADD_CHUNK,
    chunk
  }
}

// reducer
export default (state = initialState, action) => {
  const newState = state;

  switch (action.type) {
    case ADD_CHUNK:
      newState.push(action.chunk);
      return newState;

    default:
      return state;
  }
};
