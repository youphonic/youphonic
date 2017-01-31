import { combineReducers } from 'redux';
<<<<<<< HEAD
import allChunks from './allChunks';
import play from './play';
import selectedChunk from './chunk';
=======

import play from './play';
>>>>>>> 8aca26c378ec0a7faf29f3e423f51bd510c8a4cb
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
