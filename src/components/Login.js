import {
  Dialog,
  FontIcon,
  TextField,
  FlatButton,
  RaisedButton
} from 'material-ui';
import React from 'react';
import { connect } from 'react-redux';

import { login } from '../redux/login';
import { closeLogin } from '../redux/navState';

const styles = {
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

	// login then reset form
  handleSubmit(event) {
		event.preventDefault();
		this.props.login(this.state.userName, this.state.password);
    this.setState({
			userName: '',
			password: ''
    });
		this.props.closeLogin();
  }

  render() {
    const actions = [
      <FlatButton
        key="cancelButton"
        label="Cancel"
        primary={true}
        onTouchTap={this.props.closeLogin}
      />,
      <FlatButton
        key="submitButton"
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleSubmit}
      />,
      <RaisedButton
        key="googleLogin"
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

const mapStateToProps = ({ navState }) => ({
	open: navState.loginOpen
});

const mapDispatchToProps = dispatch => ({
  login: (username, password) =>
    dispatch(login(username, password)),
	closeLogin: () =>
		dispatch(closeLogin())
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
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
//   style={this.styles.socialButton}
// />,
