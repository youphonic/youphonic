import { combineReducers } from 'redux';


import myP5 from './myP5'
import allChunks from './allChunks'
import play from './play'
import chunk from './chunk';


export default combineReducers({
  myP5, allChunks, chunk, isPlaying: play
});
