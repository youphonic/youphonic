import { combineReducers } from 'redux';

import play from './play';
import appState from './appState';
import allChunks from './allChunks';
import selectedChunk from './chunk';
import canvas from './canvas-reducer';

export default combineReducers({
  canvas,
  appState,
  allChunks,
  selectedChunk,
  isPlaying: play
});
