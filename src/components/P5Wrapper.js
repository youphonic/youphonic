import React from 'react';
import {connect} from 'react-redux';
import p5 from 'p5';
import collide from '../bin/p5.collide2d';
collide(p5);
import sketch from '../sketches';
import rectangleSeed from '../redux/rectangleSeed.js'
// import {initP5} from '../redux/myP5';
// const wrapper = (<div></div>);
// const ourP5 = new p5(sketch, wrapper);
export let ourP5;

class P5Wrapper extends React.Component {

  componentDidMount() {
    this.canvas = new p5(this.props.sketch, this.wrapper);
    this.canvas.myCustomRedrawAccordingToNewPropsHandler(this.props);
    ourP5 = this.canvas;
    rectangleSeed()
  }

  componentWillReceiveProps(newprops) {
    if( this.canvas.myCustomRedrawAccordingToNewPropsHandler ) {
      this.canvas.myCustomRedrawAccordingToNewPropsHandler(newprops);
    }
  }

  render() {
    return <div ref={wrapper => this.wrapper = wrapper}></div>;
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
