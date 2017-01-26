import { combineReducers } from 'redux';


import allChunks from './allChunks'
import canvas from './canvas'
import selectedChunk from './chunk';


export default combineReducers({
  allChunks, selectedChunk, isPlaying: canvas
});
