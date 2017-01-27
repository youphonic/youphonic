import { combineReducers } from 'redux';
// import myP5 from './myP5'
import allChunks from './allChunks'
import play from './play'
import selectedChunk from './chunk';
import appState from './appState';

export default combineReducers({
  appState, allChunks, selectedChunk, isPlaying: play
});
