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
    backgroundImage: "url('./home_background.png')",
    backgroundPosition: 'center',
		backgroundSize: 'cover'
	},
	title: {
		bottom: '67vh',
    color: smokeOnTheWater,
    fontSize: '5vw',
		left: '44vw',
		padding: 0,
    position: 'absolute',
		width: 'auto',
	},
	buttonDiv: {
		bottom: '58vh',
		left:  '32vw',
		padding: 0,
    position: 'absolute',
    width: 'auto'
	},
	icon: {
    color: flamingo,
    fontSize: '9.5vw',
		height: '9.5vw',
    lineHeight: 'auto',
		width: '9.5vw',
	},
	silentDiv: {
		bottom: '0%',
		height: '100%',
		maxWidth: '100%',
		position: 'absolute',
		width: '100%'
	}
};

const Start = ({ open, enter }) => {
  const actions = [
    <FloatingActionButton
      backgroundColor={papayaWhip}
      iconStyle={styles.icon}
      key="enterButton"
      onTouchTap={enter}
      style={styles.button}
    >
      <FontIcon className="material-icons">play_circle_outline</FontIcon>
		</FloatingActionButton>
  ];

  return (
    <Dialog
      actions={actions}
      actionsContainerStyle = {styles.buttonDiv}
      bodyStyle = {styles.silentDiv}
      contentStyle = {styles.silentDiv}
      open={!open}
      overlayStyle = {styles.backgroundImage}
			style={styles.silentDiv}
      title="youphonic"
			titleStyle = {styles.title}
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
