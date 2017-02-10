/*eslint-disable id-length */
import { SET_GRID, TOGGLE_GRID } from '../constants';

const grid = 32;
const initialState = {
  center: {
    x: Math.round(((Math.round(window.innerWidth / grid) * grid) / 2) / grid) * grid,
    y: Math.round(((Math.round(window.innerHeight / grid) * grid) / 2) / grid) * grid
  },
  grid: grid,
  displayGrid: false
};

// action creator
export const setGrid = (num) => {
  return {
    type: SET_GRID,
    num
  };
};

export const toggleGrid = () => {
  return {
    type: TOGGLE_GRID
  };
};

// reducer
export default(state = initialState, action) => {
  const newState = Object.assign({}, state);

  switch (action.type) {
    case TOGGLE_GRID:
      newState.displayGrid = !newState.displayGrid;
      break;

    default:
      break;
  }

  return newState;
};
