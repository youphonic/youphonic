import { combineReducers } from 'redux';

import allChunks from './allChunks';
import chunk from './chunk';


export default combineReducers({
  allChunks, chunk
});
