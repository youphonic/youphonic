import { SELECT_CHUNK, UPDATE_SELECTED_CHUNK } from '../constants'

const initialState = {};

// action creator
export const selectChunk = (chunk) => {
  return {
    type: SELECT_CHUNK,
    chunk
  };
};

export const updateChunk = (chunkUpdates) => {
  return {
    type: UPDATE_SELECTED_CHUNK,
    chunkUpdates
  };
};

// reducer
export default (state = initialState, action) => {

  switch (action.type) {
    case SELECT_CHUNK:
      return action.chunk;

// get help on this: initialState is one chunk right?
	case UPDATE_SELECTED_CHUNK:
		return Object.assign({}, ...state, action.chunkUpdates)

    default:
      return state;
  }
};
