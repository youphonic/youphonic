import { combineReducers } from 'redux';
import allChunks from './allChunks';
import play from './play';
import selectedChunk from './chunk';
import appState from './appState';

export default combineReducers({
  appState, allChunks, selectedChunk, isPlaying: play
});
