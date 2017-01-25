import { ADD_CHUNK, REMOVE_CHUNK } from '../constants'


const initialState = [];

// action creator
export const addChunk = (chunk) => {
  return {
    type: ADD_CHUNK,
    chunk
  }
}

export const removeChunk = (chunk) => {
  return {
    type: REMOVE_CHUNK,
    chunk
  }
}

// reducer

export default (state = initialState, action) => {

  let newState = state;

  switch (action.type) {
    case ADD_CHUNK:
      newState.push(action.chunk);
      return newState;

    case REMOVE_CHUNK:
      newState = newState.filter(chunk => {
        return chunk.id !== action.chunk.id;
      });
      return newState;

    default:
      return state;
  }

};
