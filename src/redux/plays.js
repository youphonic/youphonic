import {GET_ALL_PLAYS} from '../constants';
import axios from 'axios';

const initialState = [];

// action creators
export const getPlays = (plays) => {
  return {type: GET_ALL_PLAYS, plays};
};

//thunk
export const getAllPlays = (user) =>
	dispatch =>
		axios.get(`api/users/${user.id}/plays`)
			.then(foundPlays => {
        dispatch(getPlays(foundPlays.data))
      })
			.catch(error => console.log(error));

// reducer
export default(state = initialState, action) => {

  switch (action.type) {
		case GET_ALL_PLAYS:
      // TODO: find a way to not mutate state here
      return action.plays;

    default:
      return state;
  }
};
