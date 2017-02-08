import React from 'react';
import Paper from 'material-ui/Paper';
import ReactShare from './ReactShare';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { closePlays } from '../redux/navState'

const style = {
  container: {
    display: 'flex'
  },
  paper: {
    height: 310,
    width: 310,
    margin: 20,
    textAlign: 'center',
  },
  image: {
    height: '75%',
    width: '80%'
  },
  title: {
    marginTop: '0.5em',
    marginBottom: '0.5em'
  }
};

const Play = ({play, closePlays}) => (
  <div style={style.container} >
    <Paper style={style.paper} zDepth={3} rounded={false}>
      <Link to={`/${play.hashedPlay}`} onClick={closePlays}>
        <img src={play.image} style={style.image}/>
        <h4 style={style.title} >{play.title}</h4>
      </Link>
      <ReactShare sharedURL={`/${play.hashedPlay}`} title={play.title} image={play.image}/>
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
