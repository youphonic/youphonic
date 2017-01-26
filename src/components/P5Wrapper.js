import React from 'react';
import {connect} from 'react-redux';
import p5 from 'p5';

import {initP5} from '../redux/myP5';

class P5Wrapper extends React.Component {

  componentDidMount() {
    this.canvas = new p5(this.props.sketch, this.refs.wrapper);
    this.canvas.myCustomRedrawAccordingToNewPropsHandler(this.props);
    this.props.initP5(this.canvas);
  }

  componentWillReceiveProps(newprops) {
    if( this.canvas.myCustomRedrawAccordingToNewPropsHandler ) {
      this.canvas.myCustomRedrawAccordingToNewPropsHandler(newprops);
    }
  }

  render() {
    return <div ref="wrapper"></div>;
  }
}

const mapStateToProps = (state) => {
  return {
    instance: state.instance,
    allChunks: state.allChunks,
    isPlaying: state.isPlaying
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    initP5: (instance) => {
      dispatch(initP5(instance));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(P5Wrapper);
