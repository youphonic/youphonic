import React from 'react';
import {connect} from 'react-redux';
import Divider from 'material-ui/Divider';
import IconMenu from 'material-ui/IconMenu';
import FontIcon from 'material-ui/FontIcon';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right';

import {addChunk} from '../redux/allChunks';

import SaveAPlay from './SaveAPlay';
import colors from '../colors';

import { logout } from '../redux/login';
import { openSignup, openLogin, openPlays, toggleSaveAPlay, toggleUserMenu } from '../redux/navState';
import { getAllPlays } from '../redux/plays';

import {startCanvas, stopCanvas} from '../redux/appState';

const styles = {
  button: {
    left:  0,
    position: 'absolute'
  },
  userMenuicon: {
    top: 10,
    left: 10,
    fontSize: 42,
    color: colors.papayaWhip
  }
};

const UserMenu = (props) => {
  return (<div>
    <IconMenu
      open={props.userMenuOpen}
      onRequestChange={props.toggleUserMenu}
      style={styles.button}
      iconButtonElement={
        <IconButton
          tooltip="User Menu"
          tooltipPosition="bottom-right"
          iconStyle={styles.userMenuicon}
        >
          <FontIcon className="fa fa-user-circle-o" />
        </IconButton>
      }
      anchorOrigin={{horizontal: 'left', vertical: 'top'}}
      targetOrigin={{horizontal: 'left', vertical: 'top'}}
    >
      {props.auth ?
        <MenuItem
          primaryText="Logout"
          onTouchTap={() => {
            props.logout();
          }}
        />
        : <MenuItem
          primaryText="Login"
          onTouchTap={() => {
            event.preventDefault();
            props.openLogin(event);
          }}
        />
      }
      <MenuItem
        primaryText="SignUp"
        onTouchTap={(event) => {
          event.preventDefault();
          props.openSignup(event);
        }}
      />
      <Divider />
      <MenuItem
        primaryText="Save Play"
        rightIcon={<ArrowDropRight />}
        onTouchTap={event => {
          props.stopCanvas();
          props.toggleSavePlay();
        }}
      />
      <MenuItem
        primaryText="My Plays"
        onTouchTap={(event) => {
          event.preventDefault();
          props.getAllPlays(props.auth);
          props.openPlays();
        }}
      />
    </IconMenu>
    <SaveAPlay />
  </div>);
}


const mapStateToProps = (state) => {
	return {
    auth: state.auth,
		center: state.canvas.center,
		isPlaying: state.isPlaying,
		allChunks: state.allChunks,
    userMenuOpen: state.navState.userMenuOpen
	};
};

const mapDispatchToProps = dispatch => {
	return {
		addChunk: (chunk) =>
      dispatch(addChunk(chunk)),
    logout: () =>
      dispatch(logout()),
    openSignup: () =>
      dispatch(openSignup()),
		openLogin: () =>
			dispatch(openLogin()),
		openPlays: () =>
			dispatch(openPlays()),
		startCanvas: () =>
      dispatch(startCanvas()),
    stopCanvas: () =>
      dispatch(stopCanvas()),
    toggleSavePlay: () =>
      dispatch(toggleSaveAPlay()),
		getAllPlays: (user) =>
			dispatch(getAllPlays(user)),
    toggleUserMenu: () =>
      dispatch(toggleUserMenu())
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserMenu);
