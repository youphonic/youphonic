import {
  Dialog,
  FontIcon,
  FlatButton
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
    fontSize: '8vh',
    color: smokeOnTheWater,
    textTransform: 'lowercase'
	},
	buttonDiv: {
		bottom: '1.5vh',
    height: '28vh',
    width: '32vh',
    position: 'absolute',
		padding: 0
	},
	icon: {
    fontSize: '13vw',
    lineHeight: 'auto',
    color: flamingo
	},
	silentDiv: {
		padding: 0,
		width: '100%',
    maxWidth: '100%'
	},
  button: {
    width: '95vw',
    height: '40vh',
    position: 'absolute',
    padding: 0,
    left: '2.5vw'
  }
};

const Start = ({ open, enter }) => {
  const actions = [
    <FlatButton
      label="youphonic"
      labelStyle={styles.title}
      key="enterButton"
      onTouchTap={enter}
      style={styles.button}
      icon={<FontIcon
        className="material-icons"
        style={styles.icon}>play_circle_outline
      </FontIcon>}
    />
  ];

  return (
    <Dialog
      open={!open}
      actions={actions}
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
