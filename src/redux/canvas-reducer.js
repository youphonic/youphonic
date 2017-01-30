/*eslint-disable id-length */

const initialState = {
  center: {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2
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
