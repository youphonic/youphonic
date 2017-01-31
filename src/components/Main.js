import React from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';

import RightMenu from './RightMenu';
import ShapeSettings from './ShapeSettings';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import FontIcon from 'material-ui/FontIcon';
import {red500, yellow500, blue500} from 'material-ui/styles/colors';
import MainCanvas from './MainCanvas';
import {togglePlay} from '../redux/play';
import { selectChunk } from '../redux/chunk';
import {startCanvas, stopCanvas} from '../redux/appState'
import Login from './Login';

// Our root component
injectTapEventPlugin();
const styles = {
  icon: {
    marginRight: 24
  },
  buttonIcon: {
    fontSize: 50
  },
  playButton: {
    position: 'absolute',
    left: 15,
    bottom: 15
  },
  settingsButton: {
    position: 'absolute',
    right: 15,
    bottom: 15
  },
  canvas: {
    margin: 0,
    display: 'flex',
    /* This centers our sketch horizontally. */
    justifyContent: 'center',
    /* This centers our sketch vertically. */
    alignItems: 'center'
  }
};
const Main = (props) => (
  <div id="outer-container">
    <main id="page-wrap">
			<Login/>
      <MainCanvas/>
      <RightMenu/>
      {props.selectedChunk.id && <ShapeSettings style={styles.settingsButton}/>}
      <FloatingActionButton style={styles.playButton} color={blue500}>
        <FontIcon onClick={() => {
          if (!props.isPlaying) {
            // this hides the settings component
            props.startCanvas();
            // this guarantees no chunk is selected when playMode is entered
            props.selectChunk({});
          }
          props.togglePlay(props.isPlaying)
        }} style={styles.buttonIcon} className="material-icons">{props.isPlaying
            ? 'pause_circle_outline'
            : 'play_circle_outline'}
        </FontIcon>
      </FloatingActionButton>
    </main>
  </div>
);
const mapStateToProps = (state) => {
  return {
    isPlaying: state.isPlaying,
    selectedChunk: state.selectedChunk
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    selectChunk: (chunk) => {
      dispatch(selectChunk(chunk));
    },
    startCanvas: () => {
      dispatch(startCanvas())
    },
    togglePlay: (isPlaying) => {
      dispatch(togglePlay(isPlaying));
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Main);
