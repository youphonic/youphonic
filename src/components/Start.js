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
		right: '34vw',
		bottom: '21vh',
    fontSize: '7.5vw',
    position: 'absolute',
    color: smokeOnTheWater,
    textShadow: 'rgba(255, 240, 213, 0.156863) 0px 3px 10px, rgba(252, 179, 57, 0.227451) 0px 3px 10px'
	},
	button: {
		right: 0,
    bottom: 0,
    width: 'auto',
    position: 'absolute'
	},
	icon: {
		width: '13vw',
		height: '13vw',
    fontSize: '13vw',
    lineHeight: 'auto',
    color: flamingo
	},
	silentDiv: {
		padding: 0
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
      // contentStyle = {styles.silentDiv}
      overlayStyle = {styles.backgroundImage}
      actionsContainerStyle = {styles.silentDiv}
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
