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
		right: '50%', // from right of hidden MUI dialogue box ('silentDiv')
		bottom: '15.75vh', // must be vh; % doesn't work with invisible div
    fontSize: '6vw', // fonts need to be sized as portion of view heigh
    position: 'absolute',
    color: smokeOnTheWater
	},
	buttonDiv: {
		left: '65%', //same as title
		bottom: '1.5vh', //same as title
    width: 'auto',
    position: 'absolute',
		padding: 0
	},
	icon: {
		width: '17vw', // must be vw, MUI dialogue box doesn't change
		height: '17vw',
    fontSize: '17vw',
    lineHeight: 'auto',
    color: flamingo
	},
	silentDiv: {
		padding: 0,
		maxWidth: 900,
		width: '100%'
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
