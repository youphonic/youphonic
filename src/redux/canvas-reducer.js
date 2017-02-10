/*eslint-disable id-length */
import { SET_GRID, TOGGLE_GRID } from '../constants';

const grid = 32;
const initialState = {
  center: {
    x: Math.round(((Math.round(window.innerWidth / grid) * grid) / 2) / grid) * grid,
    y: Math.round(((Math.round(window.innerHeight / grid) * grid) / 2) / grid) * grid
  },
  grid: grid,
  displayGrid: true
};

// action creator
export const setGrid = (num) => {
  return {
    type: SET_GRID,
    num
  };
};

export const toggleGrid = (bool) => {
  return {
    type: TOGGLE_GRID,
    displayGrid: bool
  };
};

// reducer
export default(state = initialState, action) => {
  const newState = Object.assign({}, state);

  switch (action.type) {
    case TOGGLE_GRID:
      return Object.assign({}, state, {displayGrid: action.displayGrid});

    default:
      return newState;
  }
};
