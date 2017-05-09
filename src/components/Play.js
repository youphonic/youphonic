import {
  Paper,
  GridTile
} from 'material-ui';
import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import colors from '../colors';
import { closePlays } from '../redux/navState';
import ReactShare from './ReactShare';

const styles = {
  paper: {
    margin: 5,
    width: '100%',
    textAlign: 'center',
    display: 'inline-block',
    boxShadow: 'rgba(18, 94, 104, 0.156863) 0px 3px 10px, rgba(18, 94, 104, 0.227451) 0px 3px 10px'
  },
  playLink: {
    margin: 15,
    textAlign: 'center',
    float: 'left',
    backgroundColor: colors.puertoRico,
    boxShadow: 'rgba(18, 94, 104, 0.117647) 0px 1px 6px, rgba(18, 94, 104, 0.117647) 0px 1px 4px'
  },
  image: {
    display: 'flex',
    overflowX: 'auto',
		margin: 'auto',
    maxHeight: '200px'
  }
};

const Play = ({play, closePlays}) => (
  <div>
    <Paper style={styles.paper} zDepth={2}>
      <GridTile>
        <div style={styles.playLink}>
          <Link to={`/${play.hashedPlay}`} onClick={closePlays}>
            <img src={play.image} style={styles.image} />
          </Link>
        </div>
          <Link to={`/${play.hashedPlay}`} onClick={closePlays}>
            <h3 style={{marginTop: 'auto'}}>{play.title}</h3>
          </Link>
        <ReactShare
          sharedURL={`youphonic.co/${play.hashedPlay}`}
          title={play.title}
          image={play.image}
        />
      </GridTile>
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
