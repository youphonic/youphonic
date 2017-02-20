import React from 'react';
import { connect } from 'react-redux';
import { Dialog, FlatButton, TextField } from 'material-ui';

import { saveUser } from '../redux/login';
import {startCanvas, stopCanvas} from '../redux/appState';
import {closeSignup, openLoginAlert} from '../redux/navState';

/* User signup form */
class SignUp extends React.Component {
  constructor() {
    super();
    this.state = {
			userName: '',
			password: '',
      firstName: '',
      lastName: '',
      email: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
		event.preventDefault();
		this.props.saveUser(this.state);
		this.setState({
			userName: '',
			password: '',
      firstName: '',
      lastName: '',
      email: ''
    });
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
              name="firstName"
              hintText="first name"
							value={this.state.firstName}
              onChange={(evt) => {
                this.setState({
                  firstName: evt.target.value
                });
              }}
            />
            <TextField
              name="lastName"
              hintText="last name"
							value={this.state.lastName}
              onChange={(evt) => {
                this.setState({
                  lastName: evt.target.value
                });
              }}
            />
            <TextField
              name="email"
              hintText="email"
							value={this.state.email}
              onChange={(evt) => {
                this.setState({
                  email: evt.target.value
                });
              }}
            />
            <TextField
              name="userName"
              hintText="username"
							value={this.state.userName}
              onChange={(evt) => {
                this.setState({
                  userName: evt.target.value
                });
              }}
            />
						<TextField
              name="password"
							hintText="password"
							value={this.state.password}
							type="password"
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
			dispatch(openLoginAlert());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
