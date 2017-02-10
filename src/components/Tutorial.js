import React from 'react';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import { IconButton, FontIcon, IconMenu, FlatButton, FloatingActionButton } from 'material-ui';
import ActionHelp from 'material-ui/svg-icons/action/help-outline';
import {connect} from 'react-redux';
import { openTurial, closeTutorial } from '../redux/navState';
import colors from '../colors';

const styles = {
	button: {
		position: 'absolute',
		right: 15,
		top: 250
	},
	helpIcon: {
		width: 60,
		backgroundColor: colors.papayaWhip,
		fill: colors.puertoRico
	},
	closeButton: {
		backgroundColor: 'white',
		hoverColor: 'red',
		top: 12,
		position: 'absolute',
		right: 15
	}
}


export default class Tutorial extends React.Component {
  constructor(props) {
    super(props);
		this.state = {open: false};
		this.handleToggle = this.handleToggle.bind(this);
  }

	handleToggle(){
		this.setState({open: !this.state.open});
	}

  render() {
    return (
				<div>
					<FloatingActionButton backgroundColor={colors.papayaWhip} onTouchTap={this.handleToggle}  style={styles.button} iconStyle={styles.helpIcon}>
						<ActionHelp />
					</FloatingActionButton>
	        <Drawer
						width={1000}
						openSecondary={true}
						open={this.state.open}>
	          <AppBar title="How to Play">
							<FlatButton label="Close" primary={true} onTouchTap={this.handleToggle} style={styles.closeButton} />
						</AppBar>
	        </Drawer>
			</div>
    );
  }
}
