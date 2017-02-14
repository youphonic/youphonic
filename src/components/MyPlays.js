import {
  Dialog,
  GridList,
  FlatButton
} from 'material-ui';
import React from 'react';
import { connect } from 'react-redux';

import Play from './Play';
import {openPlays, closePlays} from '../redux/navState';

const styles = {
  root: {
    padding: 10,
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around'
  },
  gridList: {
    display: 'flex',
    flexWrap: 'nowrap',
    overflowX: 'auto',
  }
};


const  MyPlays = (props) => {
  const actions = [
    <FlatButton
      label="Cancel"
      primary={true}
      onTouchTap={props.closePlays}
    />
  ];

  const plays = props.allPlays;

  return (
    <div>
      <Dialog
        modal={true}
        title="All Plays"
        actions={actions}
        open={props.open}
      >
        <div style={styles.root}>
          <GridList
            cols={2.2}
            padding={5}
            cellHeight="auto"
            style={styles.gridList}
          >
            {plays && plays.map((play, i) => (
                <Play play={play} key={+i} />
              ))}
          </GridList>
        </div>
      </Dialog>
    </div>
  );
};

const mapStateToProps = state => {
  return {
		open: state.navState.playsOpen,
		allPlays: state.plays
  };
};

const mapDispatchToProps = dispatch => {
  return {
		openPlays: () =>
      dispatch(openPlays()),
    closePlays: () =>
      dispatch(closePlays()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyPlays);
