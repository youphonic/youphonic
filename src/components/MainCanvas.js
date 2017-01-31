import React from 'react';
import {connect} from 'react-redux';

import PaperWrapper from './PaperWrapper';
import Chunk from '../chunks/Chunk';
import Circle from '../chunks/Circle';
import Rectangle from '../chunks/Rectangle';

import {togglePlay} from '../redux/play';

const mapStateToProps = (state) => {
  return {
    allChunks: state.allChunks,
    isPlaying: state.isPlaying
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    togglePlay: (isPlaying) => {
      dispatch(togglePlay(isPlaying));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)((props) => (
  <div id="mainCanvas">
    <PaperWrapper />
  </div>
));