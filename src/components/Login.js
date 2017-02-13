import React from 'react';
import { connect } from 'react-redux';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import TextField from 'material-ui/TextField';

import { login } from '../redux/login';
import { closeLogin, openLoginAlert } from '../redux/navState';

import {startCanvas, stopCanvas} from '../redux/appState';

const styles = {
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
};

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
			userName: '',
			password: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

	// login then close deliver welcome alert
  handleSubmit(event) {
		event.preventDefault();
		this.props.login(this.state.userName, this.state.password);
		this.props.closeLogin();
		this.props.openLoginAlert();
  }

  render() {
    const actions = [
      <FlatButton
        key="button1"
        label="Cancel"
        primary={true}
        onTouchTap={this.props.closeLogin}
      />,
      <FlatButton
        key="button2"
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleSubmit}
      />,
      <RaisedButton
        key="button3"
        href="api/auth/google"
        target="_self"
        label="Google"
        secondary={true}
        style={styles.socialButton}
        icon={<FontIcon className="fa fa-google" />}
      />
    ];
    return (
      <div>
        <Dialog
          modal={false}
          actions={actions}
          open={this.props.open}
          title="User Login"
          autoScrollBodyContent={true}
          onRequestClose={this.props.closeLogin}
        >
          <form>
            <TextField
              name="userName"
              hintText="username"
              onChange={(evt) => {
                this.setState({
                  userName: evt.target.value
                });
              }}
            />
						<TextField
              name="password"
							hintText="enter password"
							type={'password'}
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

const mapStateToProps = ({ navState: { loginOpen } }) => ({
	open: loginOpen
});

const mapDispatchToProps = dispatch => ({
  stopCanvas: () => dispatch(stopCanvas()),
	closeLogin: () => dispatch(closeLogin()),
  startCanvas: () => dispatch(startCanvas()),
	openLoginAlert: () => dispatch(openLoginAlert()),
  login: (username, password) => dispatch(login(username, password))
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);

// for testing
export { Login as PureLogin };

// FACEBOOK BUTTON IF WE WANT IT LATER:
////////////////////////////////////////
// <RaisedButton
// 	onTouchTap={()=>this.props.facebookLogin()}
//   label="Facebook"
// 	target="_blank"
//   labelPosition="before"
//   primary={true}
//   icon={<FontIcon className="fa fa-facebook-square" />}
//   style={styles.socialButton}
// />,
