import { combineReducers } from 'redux';

import allChunks from './allChunks'
import canvas from './canvas'


export default combineReducers({
  allChunks, canvas
});
