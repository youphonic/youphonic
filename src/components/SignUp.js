import React from 'react';
import { connect } from 'react-redux';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import FontIcon from 'material-ui/FontIcon';
import TextField from 'material-ui/TextField';
import MenuItem from 'material-ui/MenuItem';

import { whoami, saveUser } from '../redux/login';

import {startCanvas, stopCanvas} from '../redux/appState';
import {openSignup, closeSignup, openSignupAlert} from '../redux/navState';
import {red500, yellow500, blue500} from 'material-ui/styles/colors';

/**
 * User signup form
 */
class SignUp extends React.Component {
  constructor() {
    super();
    this.state = {
			username: '',
			password: '',
      firstName: '',
      lastName: '',
      email: ''
    };
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

  handleSubmit(event) {
		event.preventDefault();
		this.props.saveUser(this.state);
    this.props.closeSignup();
  }

  render() {
    const actions = [
      <FlatButton
        key="button1"
        label="Cancel"
        primary={true}
        onTouchTap={this.props.closeSignup}
      />,
      <FlatButton
        key="button2"
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleSubmit}
      />,
    ];
    return (
      <div>
        <Dialog
          modal={false}
          actions={actions}
          open={this.props.open}
          title="User Sign Up"
          autoScrollBodyContent={true}
          onRequestClose={this.handleClose}
        >
          <form>
            <TextField
              name={"first name"}
              hintText="enter first name"
              onChange={(evt) => {
                this.setState({
            			firstName: evt.target.value
            		});
              }}
            />
            <TextField
              name={"last name"}
              hintText="enter last name"
              onChange={(evt) => {
                this.setState({
            			lastName: evt.target.value
            		});
              }}
            />
            <TextField
              name={"email"}
              hintText="enter email"
              onChange={(evt) => {
                this.setState({
            			email: evt.target.value
            		});
              }}
            />
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
    open: state.navState.signUpOpen
  };
};

const mapDispatchToProps = dispatch => {
  return {
    saveUser: (info) =>
      dispatch(saveUser(info)),
		startCanvas: () =>
      dispatch(startCanvas()),
    stopCanvas: () =>
      dispatch(stopCanvas()),
    closeSignup: () => {
      dispatch(closeSignup());
			dispatch(openSignupAlert())
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
