import {ADD_CHUNK, REMOVE_CHUNK, CLEAR_ALL_CHUNKS} from '../constants'
const initialState = [];

// action creator
export const addChunk = (chunk) => {
  return {type: ADD_CHUNK, chunk}
}

export const removeChunk = (chunk) => {
  return {type: REMOVE_CHUNK, chunk}
}

export const clearAllChunks = () => {
  return {type: CLEAR_ALL_CHUNKS }
}
// reducer
export default(state = initialState, action) => {
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

    case CLEAR_ALL_CHUNKS:
	newState = []
      return  newState;

    default:
      return state;
  }
};
