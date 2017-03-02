import {
  Dialog,
  FontIcon,
  FloatingActionButton
} from 'material-ui';
import React from 'react';
import { connect } from 'react-redux';

import colors from '../colors';
import { enterApp } from '../redux/navState';

const { flamingo, papayaWhip, smokeOnTheWater } = colors;

const styles = {
	backgroundImage: {
		backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundImage: "url('./home_background.png')",
	},
	title: {
		left: '44vw', //'112vh', //'45%', // from right of hidden MUI dialogue box ('silentDiv')
		bottom: '67vh', //'29%', //'19vh', // must be vh; % doesn't work with invisible div
    fontSize: '5vw', // fonts need to be sized as portion of view heigh
    position: 'absolute',
		width: 'auto',
		padding: 0,
    color: smokeOnTheWater
	},
	buttonDiv: {
		left:  '32vw', //'55vh',  //'35%', //same as title
		bottom: '58vh', //'25%', //same as title 1.5v
    position: 'absolute',
		padding: 0,
    width: 'auto'
	},
	icon: {
		width: '9.5vw',
		height: '9.5vw',
    fontSize: '9.5vw',
    lineHeight: 'auto',
    color: flamingo
	},
	silentDiv: {
		//padding: 0,
		position: 'absolute',
		bottom: '0%',
		width: '100%',
		maxWidth: '100%',
		height: '100%'
	}
};

const Start = ({ open, enter }) => {
  const actions = [
    <FloatingActionButton
      key="enterButton"
      onTouchTap={enter}
      style={styles.button}
      iconStyle={styles.icon}
      backgroundColor={papayaWhip}
    >
      <FontIcon className="material-icons">play_circle_outline</FontIcon>
		</FloatingActionButton>
  ];

  return (
    <Dialog
      open={!open}
      title="youphonic"
      actions={actions}
			titleStyle = {styles.title}
      bodyStyle = {styles.silentDiv}
      contentStyle = {styles.silentDiv}
      overlayStyle = {styles.backgroundImage}
      actionsContainerStyle = {styles.buttonDiv}
			style={styles.silentDiv}
			autoDetectWindowHeight={false}
    />
  );
};


const mapStateToProps = ({ navState: { enteredApp } }) => ({
  open: enteredApp
});

const mapDispatchToProps = dispatch => ({
  enter: () => dispatch(enterApp())
});

export default connect(mapStateToProps, mapDispatchToProps)(Start);
