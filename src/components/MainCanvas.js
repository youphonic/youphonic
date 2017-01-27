import React from 'react';
import {connect} from 'react-redux';

import P5Wrapper from './P5Wrapper';
import Chunk from '../chunks/Chunk';
import Circle from '../chunks/Circle';
import Rectangle from '../chunks/Rectangle';

import {togglePlay} from '../redux/play';

import sketch from '../sketches';

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

export default connect(mapStateToProps, mapDispatchToProps)((props) => {

  return (
    <div id="mainCanvas">
      <P5Wrapper sketch={sketch} />
    </div>
  );
});
