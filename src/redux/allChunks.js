import {ADD_CHUNK, REMOVE_CHUNK, CLEAR_ALL_CHUNKS, UPDATE_ONE_CHUNK, LOAD_CHUNKS} from '../constants';
const initialState = [];

// action creator
export const addChunk = (chunk) => {
  return {type: ADD_CHUNK, chunk};
};

export const loadChunks = (chunks) => {
  return {type: LOAD_CHUNKS, chunks};
};

export const removeChunk = (chunk) => {
  return {type: REMOVE_CHUNK, chunk};
};

export const clearAllChunks = () => {
  return {type: CLEAR_ALL_CHUNKS };
};


// let's change the name of this action

export const updateOneChunk = (chunkUpdates) => {
  return {type: UPDATE_ONE_CHUNK, chunkUpdates };
};


// reducer
export default (state = initialState, action) => {
  let newState = [...state];
  switch (action.type) {

    case ADD_CHUNK:
      newState.push(action.chunk);
      return newState;

    case LOAD_CHUNKS:
      return action.chunks;

    case REMOVE_CHUNK:
      newState = newState.filter(chunk => {
        return chunk.id !== action.chunk.id;
      });
      return newState;

    case CLEAR_ALL_CHUNKS:
	    newState = [];
      return  newState;

	  case UPDATE_ONE_CHUNK:
      newState = newState.map( chunk => {
        // when it finds the chunk it updates it
        if (chunk.id === action.chunkUpdates.id) {
          return Object.assign(chunk, action.chunkUpdates);
        // if id's don't match, it just returns the chunk
        } else {
          return chunk;
        }
      });
      return  newState;

    default:
      return state;
  }
};
