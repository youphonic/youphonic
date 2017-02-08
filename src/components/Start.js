import React, {Component} from 'react';
import { render } from 'react-dom';
import { Router, Route, Link } from 'react-router';
import {Dialog, RaisedButton, FlatButton} from 'material-ui';
//import { enterApp } from '../redux/navState';
import {connect} from 'react-redux';


const styles = {
	divStyle: {
		height: '100vh',
		backgroundSize: 'cover',
		backgroundRepeat: 'no-repeat',
		backgroundImage: "url('./home_background.png')",
		overflow: 'hidden',
		zIndex: 9999,
		WebkitTransition: 'all',
		msTransition: 'all',
		display: 'flex'
	},
	title: {
		// position: 'absolute',
		// left: 300,
		// top: 200,
		display: 'flex'
	},
	h3: {
		fontFamily: "'Roboto', sans-serif",
		position: 'absolute',
		fontSize: 45,
		top: 15
	},
	button: {
		position: 'absolute',
		marginTop: 70,
		marginLeft: 7
	}
}

// export default class Start extends Component{
// 	render() {
// 	    return (
// 				<Card containerStyle={styles.divStyle}>
// 							<div style={styles.title}>
// 							<h2 style={styles.h3}>youphonic</h2>
// 								<RaisedButton label="Play" primary={true} style={styles.button} onClick={()=>this.props.enterApp()}/>
// 							</div>
// 				</Card>
// 	    );
// 		}
// 	}


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
	      <FlatButton
	        label="Enter"
	        primary={true}
	        onTouchTap={this.handleClose}
	      />
	    ]

	    return (
	      <div>
	        <Dialog
						overlayStyle = {styles.divStyle}
						titleStyle = {styles.h3}
	          title="youphonic"
	          actions={actions}
	          modal={true}
	          open={this.state.open}
	        >
	        </Dialog>
	      </div>
	    );
	  }
	}

	// const mapStateToProps = () => {
	//   return {
	//   };
	// };
	// const mapDispatchToProps = (dispatch) => {
	//   return {
	// 		enterApp: () => dispatch(enterApp()),
	//   };
	// };
	//
	// export default connect(mapStateToProps, mapDispatchToProps)(Start);
