import React, {Component} from 'react';
import { render } from 'react-dom';
import { Router, Route, Link } from 'react-router';
import {Dialog, RaisedButton, FlatButton, FloatingActionButton} from 'material-ui';
import PlayCircle from 'material-ui/svg-icons/av/play-circle-outline';
import {connect} from 'react-redux';
import colors from '../colors';


const styles = {
	divStyle: {
		height: '100vh',
		backgroundSize: 'cover',
		backgroundRepeat: 'no-repeat',
		backgroundImage: "url('./home_background.png')",
		overflow: 'hidden',
		zIndex: 25,
		WebkitTransition: 'all',
		msTransition: 'all'

	},
	title: {
		fontFamily: "'Roboto', sans-serif",
		position: 'absolute',
		fontSize: 85,
		right: 520,
		bottom: 130,
		zIndex: 26,
		padding: 0
	},
	button: {
		position: 'absolute',
		bottom: 50,
		left: 650,
		zIndex: 26,
		backgroundColor: 'rgba(0,0,0,0)'
	},
	icon: {
		zIndex: 26,
		width: 200,
		height: 200

	},
	silentDiv: {
		padding: 0
	}
}

	export default class Start extends React.Component {
	  constructor(props){
			super(props)
			this.state = {
	    	open: true,
	  	}
			this.handleClose = this.handleClose.bind(this)
		}

	  handleClose() {
	    this.setState({open: false});
	  }

	  render() {
	    const actions = [
				<FloatingActionButton
						iconStyle={styles.icon}
						style={styles.button}
			      onTouchTap={this.handleClose}
						backgroundColor={colors.flamingo}>
						<PlayCircle />
    			</FloatingActionButton>
	    ]

	    return (
	        <Dialog
						overlayStyle = {styles.divStyle}
						titleStyle = {styles.title}
						contentStyle = {styles.silentDiv}
						bodyStyle = {styles.silentDiv}
						actionsContainerStyle = {styles.silentDiv}
	          title="youphonic"
	          actions={actions}
	          open={this.state.open}
	        >
	        </Dialog>
	    );
	  }
	}
