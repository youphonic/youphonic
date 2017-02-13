import React from 'react';
import Paper from 'material-ui/Paper';
import ReactShare from './ReactShare';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { closePlays } from '../redux/navState'

const style = {
  container: {
    display: 'flex',
  },
  paper: {
    height: 270,
    width: 365,
    margin: 15,
    textAlign: 'center',
		padding: '3%'
  },
  image: {
    width: '85%',
		height: '100%',
		marginTop: 15
  },
  title: {
    marginTop: '0.5em',
    marginBottom: '0.5em'
  },
	share: {
		//marginBottom: '10%'
	}
};

const Play = ({play, closePlays}) => (
  <div style={style.container} >
    <Paper style={style.paper} zDepth={3} rounded={false}>
			<div>
	      <Link to={`/${play.hashedPlay}`} onClick={closePlays}>
	        <img src={play.image} style={style.image}/>
	        <h4 style={style.title} >{play.title}</h4>
	      </Link>
	      <ReactShare sharedURL={`youphonic.co/${play.hashedPlay}`} title={play.title} image={play.image} style={style.share}/>
			</div>
    </Paper>
  </div>
);

const mapStateToProps = state => {
  return {
		open: state.navState.playsOpen,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    closePlays: () =>
      dispatch(closePlays()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Play);
