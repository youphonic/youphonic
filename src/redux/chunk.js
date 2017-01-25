import { SELECT_CHUNK } from '../constants'

const initialState = {};

// action creator
export const selectChunk = (chunk) => {
  return {
    type: SELECT_CHUNK,
    chunk
  };
};

// reducer
export default (state = initialState, action) => {

  switch (action.type) {
    case SELECT_CHUNK:
      return action.chunk;

    default:
      return state;
  }
};
