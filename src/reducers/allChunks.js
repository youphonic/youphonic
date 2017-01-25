const initialState = [];

export const ADD_CHUNK = 'ADD_CHUNK';

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