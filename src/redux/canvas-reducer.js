/*eslint-disable id-length */
const grid = 25;
const initialState = {
  center: {
    grid: grid,
    x: Math.round(((Math.round(window.innerWidth / grid) * grid) / 2) / grid) * grid,
    y: Math.round(((Math.round(window.innerHeight / grid) * grid) / 2) / grid) * grid
  }
};

// action creator

// reducer
export default(state = initialState, action) => {
  const newState = Object.assign({}, state);

  switch (action.type) {
    default:
      return newState;
  }
};
