import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';

import RightMenu from './RightMenu';
import UserMenu from './UserMenu';
import ShapeSettings from './ShapeSettings';

import FloatingActionButton from 'material-ui/FloatingActionButton';
import FontIcon from 'material-ui/FontIcon';
import {red500, yellow500, blue500} from 'material-ui/styles/colors';

import MainCanvas from './MainCanvas';
import {togglePlay} from '../redux/play';
import { selectChunk } from '../redux/chunk';
import { addChunk, updateOneChunk, clearAllChunks } from '../redux/allChunks';
import { startCanvas } from '../redux/appState'
import Login from './Login';
import SignUp from './SignUp';
import SnackBar from 'material-ui/Snackbar';
import { whoami } from '../redux/login';
import { save, load, deconstruct, reconstruct } from '../paper/saver';

let mediaRecorder;
let recordedChunks = [];

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

class Main extends Component {
	constructor(props) {
		super(props)
		// this is necessary to avoid repeating welcome pop up
		// works with componentWillReceiveProps block
		this.state = {
			newUser: false
		}
}

componentDidMount(){
		this.props.fetchInitialData();

    var canvas = document.querySelector('#paperCanvas');
    var stream = canvas.captureStream(20);
    console.log("canvas", canvas)

    console.log("stream", stream)

    var options = {mimeType: 'video/webm; codecs=vp9'};


    mediaRecorder = new MediaRecorder(stream, options);
    console.log(mediaRecorder)
    mediaRecorder.ondataavailable = handleDataAvailable;
    function handleDataAvailable(event) {
      console.log("handle data available", event)
      if (event.data.size > 0) {
            recordedChunks.push(event.data);
          }
    }
	}

start() {
  mediaRecorder.start(1000);
}

stop() {
  mediaRecorder.stop();
  var videoElement = document.querySelector('video');

  var superBuffer = new Blob(recordedChunks);
  videoElement.src =
        window.URL.createObjectURL(superBuffer);
  videoElement.play();
}

componentWillReceiveProps(nextProps){
	this.setState({
		newUser: this.props.auth !== nextProps.auth
})
}

	render(){


	  return (
	    <div id="outer-container">
	      <main id="page-wrap">
          <video autoplay id="videoPlayback" width="125" height="50"/>
          <button onClick={this.start.bind(this)}> start </button>
          <button onClick={this.stop.bind(this)}> stop  </button>
	        <MainCanvas/>
	        <Login/>
	        <SignUp />
					{/* check for logged in user then deliver welcome alert */}
					{this.state.newUser && <SnackBar message={'Welcome ' + this.props.auth.firstName} open={this.props.loginAlertOpen}/>}
	        <UserMenu />
	        <RightMenu/>
	        {this.props.selectedChunk.id && <ShapeSettings style={styles.settingsButton}/>}
	        <FloatingActionButton style={styles.playButton} color={blue500}>
	          <FontIcon onClick={() => {
	          if (!this.props.isPlaying) {
              // this saves all chunks to local storage
              // for now ...
              save(this.props.allChunks);
	            // this hides the settings component
	            this.props.startCanvas();
	            // this guarantees no chunk is selected when playMode is entered
	            this.props.selectChunk({});
	          } else {
              // Gets all saved chunks off local storage
              // And remove previous chunks from both
              // Paper project and Redux Store
              load(this.props.allChunks, this.props.clearAllChunks, this.props.addChunk);
            }
	          this.props.togglePlay(this.props.isPlaying)
	        }} style={styles.buttonIcon} className="material-icons">{this.props.isPlaying
	              ? 'pause_circle_outline'
	              : 'play_circle_outline'}
	          </FontIcon>
	        </FloatingActionButton>
	      </main>
	    </div>
	  );

  }

}

const mapStateToProps = (state) => {
  return {
    isPlaying: state.isPlaying,
    selectedChunk: state.selectedChunk,
		auth: state.auth,
		loginAlertOpen: state.navState.loginAlertOpen,
    allChunks: state.allChunks
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    selectChunk: (chunk) => {
      dispatch(selectChunk(chunk));
    },
    addChunk: (chunk) => {
      dispatch(addChunk(chunk));
    },
    updateOneChunk: (chunk) => {
      dispatch(updateOneChunk(chunk))
    },
    clearAllChunks: () => dispatch(clearAllChunks()),
    startCanvas: () => {
      dispatch(startCanvas())
    },
    togglePlay: (isPlaying) => {
      dispatch(togglePlay(isPlaying));
    },
    fetchInitialData: () => {
      dispatch(whoami());
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Main);
