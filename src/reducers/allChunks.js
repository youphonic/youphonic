import { ADD_CHUNK } from '../constants'

const initialState = [];

export default reducer = (state = intialState, action) => {
  const newState = state;

  switch (action.type) {
    case ADD_CHUNK:
      newState = newState.push(action.chunk);
      return newState;

    default:
      return state;
  }
}