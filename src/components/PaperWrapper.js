import React from 'react';
import {connect} from 'react-redux';
import paper from 'paper';
import paperFrames from '../paper/mvpPort';
import paperjsSeed from '../redux/paperjsSeed';

const styles = {
  paperCanvas: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    background: '#31B8B5'
  },
  /* Scale canvas with resize attribute to full size - not working yet*/
  'canvas[resize]': {
    width: '100%',
    height: '100%',
  }
};

class PaperWrapper extends React.Component {

  componentDidMount() {
    // set up paperjs on the window
    this.canvas = document.getElementById('paperCanvas');
    paper.setup(this.canvas);
    paper.install(window);
    paperjsSeed();
  }

  componentWillReceiveProps(newProps) {
    paperFrames(newProps);
    if ( this.canvas.myCustomRedrawAccordingToNewPropsHandler ) {
      this.canvas.myCustomRedrawAccordingToNewPropsHandler(newProps);
    }
  }

  render() {
    return (
      <div id="test">
        <canvas id="paperCanvas" style={styles.paperCanvas}></canvas>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    allChunks: state.allChunks,
    isPlaying: state.isPlaying
  };
};

export default connect(mapStateToProps)(PaperWrapper);
