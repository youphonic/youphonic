import React from 'react';
import { connect } from 'react-redux';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import ActionGoogle from 'material-ui/svg-icons/action/android';
import ActionFacebook from 'material-ui/svg-icons/action/android';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import FontIcon from 'material-ui/FontIcon';
import TextField from 'material-ui/TextField';
import MenuItem from 'material-ui/MenuItem';

import { whoami, login } from '../redux/login';

import {startCanvas, stopCanvas} from '../redux/appState';
import {red500, yellow500, blue500} from 'material-ui/styles/colors';

/**
 * Dialog content can be scrollable.
 */
class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      open: false,
			username: '',
			password: ''
    };
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

		this.styles = {
			loginButton: {
				position: 'absolute',
				top: 15,
				left: 15
			},
			buttonIcon: {
				fontSize: 50
			},
      socialButton: {
        margin: 12
      }
		}
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
		this.props.localLogin(this.state.username, this.state.password);
    this.setState({
	    open: false
	  });
  }

  render() {
    const actions = [
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
      <RaisedButton
        href='api/auth/google'
        target="_self"
        label="Google"
        secondary={true}
        style={this.styles.socialButton}
        icon={<FontIcon className="fa fa-google" />}
      />,
    <RaisedButton
			onTouchTap={()=>this.props.facebookLogin()}
      label="Facebook"
			target="_blank"
      labelPosition="before"
      primary={true}
      icon={<FontIcon className="fa fa-facebook-square" />}
      style={this.styles.socialButton}
    />,
    ];
    return (
      <div>
				<FloatingActionButton style={this.styles.loginButton} color={yellow500}>
					<FontIcon onClick={() => this.handleOpen()} style={this.styles.buttonIcon} className="material-icons">account_box
					</FontIcon>
				</FloatingActionButton>
        <Dialog
          modal={false}
          actions={actions}
          open={this.state.open}
          title="User Login"
          autoScrollBodyContent={true}
          onRequestClose={this.handleClose}
        >
          <form>
            <TextField
              name={"username"}
              hintText="enter username"
              onChange={(evt) => {
                this.setState({
            			username: evt.target.value
            		});
              }}
            />
						<TextField
              name={"password"}
							hintText="enter password"
              onChange={(evt) => {
                this.setState({
            			password: evt.target.value
            		});
              }}
						/>
          </form>
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {

  };
};

const mapDispatchToProps = dispatch => {
  return {
    localLogin: (username, password) => dispatch(localLogin(username, password)),
		googleLogin: () => dispatch(googleLogin()),
		facebookLogin: () => dispatch(facebookLogin()),
		startCanvas: () =>
      dispatch(startCanvas()),
    stopCanvas: () =>
      dispatch(stopCanvas())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
