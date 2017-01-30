import React from 'react';
import {connect} from 'react-redux';
import paper from 'paper';
import collide from '../bin/p5.collide2d';
import sketch from '../sketches';
// import rectangleSeed from '../redux/rectangleSeed.js'
// import {initP5} from '../redux/myP5';
// const wrapper = (<div></div>);
// const ourP5 = new p5(sketch, wrapper);
import paperSeed from '../paper'
export let pjs;

class P5Wrapper extends React.Component {

  componentDidMount() {
    this.canvas = document.getElementById('paperCanvas');
    // this.canvas.myCustomRedrawAccordingToNewPropsHandler(this.props);
    pjs = this.canvas;
    paper.setup(this.canvas);
    paper.install(window);
    console.log('++++++');
    console.log(paper);
    // rectangleSeed()
    paperSeed();
  }

  componentWillReceiveProps(newprops) {
    if( this.canvas.myCustomRedrawAccordingToNewPropsHandler ) {
      this.canvas.myCustomRedrawAccordingToNewPropsHandler(newprops);
    }
  }

  render() {
    return (
      <div id="test">
        <canvas id="paperCanvas"></canvas>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    instance: state.instance,
    allChunks: state.allChunks,
    isPlaying: state.isPlaying
  };
};

// const mapDispatchToProps = (dispatch) => {
//   return {
//     initP5: (instance) => {
//       dispatch(initP5(instance));
//     }
//   };
// };

export default connect(mapStateToProps)(P5Wrapper);