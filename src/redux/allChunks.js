import { ADD_CHUNK } from '../constants'

const initialState = [];

// reducer
export default reducer = (state = intialState, action) => {
  const newState = state;

  switch (action.type) {
    case ADD_CHUNK:
      newState.push(action.chunk);
      return newState;

    default:
      return state;
  }
}

// action creator
export const addChunk = (chunk) => {
  return {
    type: ADD_CHUNK,
    chunk
  }
}