import React from 'react';
import {connect} from 'react-redux';
import paper from 'paper';
import mvpPort from '../paper/mvpPort';
import paperjsSeed from '../redux/paperjsSeed';
import paperPrototyptes from '../chunks/paperPrototypes'
export let pjs;

const styles = {
  paperCanvas: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    background: '#31B8B5'
  },
  /* Scale canvas with resize attribute to full size */
  canvas: {
    width: '100%',
    height: '100%',
  }
}

class P5Wrapper extends React.Component {

  componentDidMount() {
    this.canvas = document.getElementById('paperCanvas');
    pjs = this.canvas;
    paper.setup(this.canvas);
    paper.install(window);
    paperPrototyptes();
    paperjsSeed();
    mvpPort();
  }

  componentWillReceiveProps(newprops) {
    if( this.canvas.myCustomRedrawAccordingToNewPropsHandler ) {
      this.canvas.myCustomRedrawAccordingToNewPropsHandler(newprops);
    }
  }

  render() {
    return (
      <div id="test">
        <canvas id="paperCanvas" style={styles.paperCanvas}></canvas>
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
