import { combineReducers } from 'redux';


import allChunks from './allChunks'
import canvas from './canvas'
import chunk from './chunk';


export default combineReducers({
  allChunks, chunk, isPlaying: canvas
});
