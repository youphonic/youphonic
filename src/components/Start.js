import {
  Dialog,
  FontIcon,
  FloatingActionButton
} from 'material-ui';
import React from 'react';
import { connect } from 'react-redux';

import colors from '../colors';
import { enterApp } from '../redux/navState';

const styles = {
	backgroundImage: {
    // zIndex: 25,
		height: '100vh',
    // overflow: 'hidden',
    // msTransition: 'all',
		backgroundSize: 'cover',
		// WebkitTransition: 'all',
    // backgroundRepeat: 'no-repeat',
    backgroundImage: "url('./home_background.png')",

	},
	title: {
    padding: 0,
		right: 520,
		bottom: 130,
    fontSize: 85,
    position: 'absolute'
	},
	button: {
		right: '34vw',
    bottom: '51vh',
		backgroundColor: 'rgba(0,0,0,0)'
	},
	icon: {
		// zIndex: 26,
		// width: 200,
		// height: 200
	},
	silentDiv: {
		padding: 0
	}
};

const Start = ({ open, enter }) => {
  const actions = [
    <FloatingActionButton
      onTouchTap={enter}
      key={'enterButton'}
      style={styles.button}
      iconStyle={styles.icon}
      backgroundColor={colors.flamingo}
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
