import React from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import RightMenu from './RightMenu';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import injectTapEventPlugin from 'react-tap-event-plugin';

import FloatingActionButton from 'material-ui/FloatingActionButton';
import FontIcon from 'material-ui/FontIcon';

import {red500, yellow500, blue500} from 'material-ui/styles/colors';
import MainCanvas from './MainCanvas';

import {togglePlay} from '../redux/canvas';
// Our root component

injectTapEventPlugin();

const styles = {
	icon: {
		marginRight: 24
	},
	buttonIcon: {
		fontSize: 50
	},
	button: {
		position: 'absolute',
		left: 15,
		bottom: 15
	},
	canvas: {

	}
};


const Main = (props) => (

  <div id="outer-container">
    <main id="page-wrap">
      <RightMenu />
      <MainCanvas />
  		<FloatingActionButton style={styles.button} color={blue500}>
  			<FontIcon onClick={() => {
            props.togglePlay(props.isPlaying)
          }} style={styles.buttonIcon} className="material-icons">play_circle_outline</FontIcon>
  		</FloatingActionButton>
    </main>
  </div>


);

const mapStateToProps = (state) => {
  return {
    isPlaying: state.isPlaying
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    togglePlay: (isPlaying) => {
      dispatch(togglePlay(isPlaying));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
