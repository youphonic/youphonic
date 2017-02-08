import React, {Component} from 'react';
import { render } from 'react-dom';
import { Router, Route, Link } from 'react-router';
import {Dialog, RaisedButton, FlatButton, FloatingActionButton} from 'material-ui';
import PlayCircle from 'material-ui/svg-icons/av/play-circle-outline';
import {connect} from 'react-redux';


const styles = {
	divStyle: {
		height: '100vh',
		backgroundSize: 'cover',
		backgroundRepeat: 'no-repeat',
		backgroundImage: "url('./home_background.png')",
		overflow: 'hidden',
		zIndex: 25,
		WebkitTransition: 'all',
		msTransition: 'all',
		display: 'flex'
	},
	title: {
		fontFamily: "'Roboto', sans-serif",
		position: 'absolute',
		fontSize: 90,
		right: 500,
		bottom: 190,
		zIndex: 26,
		padding: 0,
		display: 'flex'
	},
	button: {
		position: 'absolute',
		bottom: 170,
		right: 200,
		zIndex: 26
	},
	silentDiv: {
		padding: 0,
		display: 'flex'
	},
	container: {
		display: 'flex'
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
	      // <FlatButton
				// 	style={styles.button}
	      //   label="Enter"
	      //   primary={true}
	      //   onTouchTap={this.handleClose}
	      // />,
				<FloatingActionButton
						style={styles.button}
						primary={true}
			      onTouchTap={this.handleClose}>
						<PlayCircle/>
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
	          // modal={true}
	          open={this.state.open}
	        >
	        </Dialog>
	    );
	  }
	}
