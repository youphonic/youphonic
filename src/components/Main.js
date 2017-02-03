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
	}
	componentDidMount(){
		this.props.fetchInitialData();
	}

	render(){
	  return (
	    <div id="outer-container">
	      <main id="page-wrap">
	        <MainCanvas/>
	        <Login/>
	        <SignUp />
					{/* check for logged in user then deliver welcome alert */}
					{this.props.auth && <SnackBar message={'Welcome ' + this.props.auth.firstName} open={this.props.signUpAlertOpen}/>}
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
		signUpAlertOpen: state.navState.signUpAlertOpen,
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
