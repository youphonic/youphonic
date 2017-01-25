import { combineReducers } from 'redux';

import rename from './rename-reducer';
import allChunks from './allChunks'


export default combineReducers({
  rename,
  allChunks
});
