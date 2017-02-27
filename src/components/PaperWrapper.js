import React from 'react';
import {connect} from 'react-redux';
import paper from 'paper';
import paperFrames from '../paper';
import paperjsSeed from '../redux/paperjsSeed';
import { startCanvas } from '../redux/appState'
import { selectChunk } from '../redux/chunk';
import { clearAllChunks, addChunk, removeChunk } from '../redux/allChunks';
import { togglePlay } from '../redux/play';
import { openShapeSettings, closeShapeSettings } from '../redux/navState';
import colors from '../colors'

const styles = {
  paperCanvas: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    background: colors.puertoRico
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
        <canvas id="paperCanvas" style={styles.paperCanvas} data-paper-resize></canvas>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    allChunks: state.allChunks,
    isPlaying: state.isPlaying,
    appState: state.appState,
    canvas: state.canvas,
    keyboardInteractionEnabled: state.navState.playsOpen || state.navState.loginOpen || state.navState.saveAPlayOpen || state.navState.tutorialOpenClose || state.navState.shapeSettingsOpen || state.navState.windowSettingOpen || state.navState.userMenuOpen || state.navState.rightMenuOpen,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    startCanvas: () =>
      dispatch(startCanvas()),
    openShapeSettings: () =>
      dispatch(openShapeSettings()),
    closeShapeSettings: () =>
      dispatch(closeShapeSettings()),
    selectChunk: (chunk) =>
      dispatch(selectChunk(chunk)),
    clearAllChunks: () =>
      dispatch(clearAllChunks()),
    addChunk: (chunk) =>
      dispatch(addChunk(chunk)),
    removeChunk: (chunk) =>
      dispatch(removeChunk(chunk)),
    togglePlay: (isPlaying) =>
      dispatch(togglePlay(isPlaying))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PaperWrapper);
