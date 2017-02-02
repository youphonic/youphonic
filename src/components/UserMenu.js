import React from 'react';
import {connect} from 'react-redux';
import IconMenu from 'material-ui/IconMenu';
import FontIcon from 'material-ui/FontIcon';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

import {addChunk} from '../redux/allChunks';
import {togglePlay} from '../redux/play';
import Circle from '../chunks/Circle';
import PhysBall from '../chunks/PhysBall';
import Attractor from '../chunks/Attractor';
import Rectangle from '../chunks/Rectangle';
import Login from './Login';
import SignUp from './SignUp';

//testing tone, doesn't belong here for prod
import {synthOne} from '../tone/tonePatchOne'
import { whoami, login, logout } from '../redux/login';
import { openSignup } from '../redux/navState';
import {startCanvas, stopCanvas} from '../redux/appState';

import {red500, yellow500, blue500} from 'material-ui/styles/colors';

const styles = {
  menu: {
    position: 'absolute',
    left: 10,
    top: 5,
  },
  menuIcon: {
    fontSize: 60,
    color: 'white'
  }
};

class UserMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
			username: '',
			password: '',
      firstName: '',
      lastName: '',
      email: ''
    };
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

		this.styles = {
			signUpButton: {

			},
			buttonIcon: {
				fontSize: 50
			},
      socialButton: {
        margin: 12
      }
		};
  }

  handleOpen() {
    this.setState({open: true});
		this.props.stopCanvas();
  }

  handleClose() {
    this.setState({open: false});
		this.props.startCanvas();
  }

  handleSubmit(event) {
		event.preventDefault();
		this.props.saveUser(this.state);
    this.setState({
	    open: false,
      username: '',
			password: '',
      firstName: '',
      lastName: '',
      email: ''
	  });
  }

  render () {
    const signUpActions = [
      <FlatButton
        key="button1"
        label="Cancel"
        primary={true}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        key="button2"
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleSubmit}
      />,
    ];
    return (<div style={styles.menu}>
      <IconMenu
      iconButtonElement={
        <IconButton iconStyle={styles.menuIcon}>
        <FontIcon className="material-icons" >account_box</FontIcon>
        </IconButton>
      }
      anchorOrigin={{horizontal: 'left', vertical: 'top'}}
      targetOrigin={{horizontal: 'left', vertical: 'top'}}
      >
      {this.props.auth ?
        <MenuItem
        primaryText="Logout"
        onTouchTap={() => {
          this.props.logout();
        }}
        />
        : <MenuItem
        primaryText="Login"
        onTouchTap={() => {

        }}
        />}
        <MenuItem primaryText="SignUp" onTouchTap={(event) => {
          event.preventDefault();
          this.props.openSignup(event);
        }}>
        </MenuItem>
        </IconMenu>
        </div>);
      }
  }


const mapStateToProps = (state) => {
	return {
		center: state.canvas.center,
		isPlaying: state.isPlaying,
    auth: state.auth
	};
};

const mapDispatchToProps = dispatch => {
	return {
		addChunk: (chunk) => {
			dispatch(addChunk(chunk));
		},
		togglePlay: (isPlaying) => {
			dispatch(togglePlay(isPlaying));
		},
    logout: () => {
      dispatch(logout());
    },
    openSignup: (event) => {
      event.preventDefault();
      dispatch(openSignup());
    },
    saveUser: (info) =>
      dispatch(saveUser(info)),
		startCanvas: () =>
      dispatch(startCanvas()),
    stopCanvas: () =>
      dispatch(stopCanvas())
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserMenu);
