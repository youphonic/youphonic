import { SELECT_CHUNK, UPDATE_CHUNK } from '../constants'

const initialState = {};

// action creator
export const selectChunk = (chunk) => {
  return {
    type: SELECT_CHUNK,
    chunk
  };
};

export const updateChunk = (chunkUpdate) => {
  return {
    type: UPDATE_CHUNK,
    chunkUpdate
  };
};

// reducer
export default (state = initialState, action) => {

  switch (action.type) {
    case SELECT_CHUNK:
      return action.chunk;

// get help on this: initialState is one chunk right?
	case UPDATE_CHUNK:
		return Object.assign({}, ...state, action.chunkUpdate)

    default:
      return state;
  }
};
