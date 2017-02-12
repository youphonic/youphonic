import {
  FontIcon,
  SnackBar,
  IconButton
} from 'material-ui';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';

import Start from './Start';
import Login from './Login';
import SignUp from './SignUp';
import MyPlays from './MyPlays';
import UserMenu from './UserMenu';
import Tutorial from './Tutorial';
import RightMenu from './RightMenu';
import MainCanvas from './MainCanvas';
import ShapeSettings from './ShapeSettings';

import colors from '../colors';
import { whoami } from '../redux/login';
import { togglePlay } from '../redux/play';
import { save, load } from '../paper/saver';
import { selectChunk } from '../redux/chunk';
import { startCanvas } from '../redux/appState';
import { addChunk, updateOneChunk, clearAllChunks } from '../redux/allChunks';

injectTapEventPlugin();

const styles = {
  button: {
    left: 10,
    bottom: 15,
    position: 'absolute'
  },
  playIcon: {
    bottom: 15,
    fontSize: 50,
    color: colors.papayaWhip
  }
};

// Our root component
// class Main extends Component {
// 	constructor(props) {
// 		super(props);
// 		// this is necessary to avoid repeating welcome pop up
// 		// works with componentWillReceiveProps block
// 		this.state = {
// 			newUser: null
// 		};
//   }
//
//   componentDidMount() {
// 		this.props.fetchInitialData();
// 	}
//
//   componentWillReceiveProps(nextProps) {
//     // Set newUser to nextProps.auth if there is one
//     let newUser = nextProps.auth
//                     ? nextProps.auth
//                     : null;
//     // if state changes occur other than
//     // loginAlertOpen or auth, we don't
//     // want it to count as a newUser
//     for (var key in this.props) {
//       if (this.props.hasOwnProperty(key)) {
//         if (key !== 'auth' &&
//             key !== 'loginAlertOpen' &&
//             nextProps[key] !== this.props[key]) {
//           newUser = null;
//         }
//       }
//     }
//     // Set local state to the newUser
//     this.setState({
//       newUser: newUser
//     });
//   }
//
// 	render() {
const Main = (props) => {
  return (
    <div id="outer-container">
	    <Start />
      <main id="page-wrap">
        <MainCanvas />
        <Login />
				<SignUp />
				{/* check for logged in user then deliver welcome alert */}
				{/* {this.state.newUser && <SnackBar
          message={'Welcome ' + this.props.auth.firstName}
          open={this.props.loginAlertOpen}
          autoHideDuration={3000}
        />} */}
        {!props.isPlaying && <Tutorial />}
        {!props.isPlaying && <UserMenu />}
        {!props.isPlaying && <RightMenu />}
				<MyPlays />
        {props.selectedChunk.id && <ShapeSettings />}
        <IconButton
          style={styles.button}
          tooltip="Play/Pause"
          tooltipPosition="top-right"
          iconStyle={styles.playIcon}
          onTouchTap={() => {
            if (!props.isPlaying) {
              // this saves all chunks to local storage
              // for now ...
              save(props.allChunks);
              // this hides the settings component
              props.startCanvas();
              // this guarantees no chunk is selected when playMode is entered
              props.selectChunk({});
            } else {
              // Gets all saved chunks off local storage
              // And remove previous chunks from both
              // Paper project and Redux Store
              load(props.allChunks, props.clearAllChunks, props.addChunk);
            }
            props.togglePlay(props.isPlaying);
          }}
        >
          <FontIcon className="material-icons">
            {props.isPlaying ? 'pause_circle_outline' : 'play_circle_outline'}
	        </FontIcon>
        </IconButton>
      </main>
    </div>
  );
};

const mapStateToProps = ({
  auth,
  navState,
  allChunks,
  isPlaying,
  enteredApp,
  selectedChunk
}) => ({
  auth: auth,
  allChunks: allChunks,
	isPlaying: isPlaying,
  enteredApp: enteredApp,
  selectedChunk: selectedChunk,
	loginAlertOpen: navState.loginAlertOpen,
});

const mapDispatchToProps = (dispatch) => ({
  startCanvas: () => dispatch(startCanvas()),
  fetchInitialData: () => dispatch(whoami()),
  addChunk: (chunk) => dispatch(addChunk(chunk)),
  clearAllChunks: () => dispatch(clearAllChunks()),
  selectChunk: (chunk) => dispatch(selectChunk(chunk)),
  togglePlay: (isPlaying) => dispatch(togglePlay(isPlaying)),
  updateOneChunk: (chunk) => dispatch(updateOneChunk(chunk))
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
