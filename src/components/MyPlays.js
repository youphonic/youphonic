import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import { connect } from 'react-redux';
import {openPlays, closePlays} from '../redux/navState'
import Play from './Play';

const customContentStyle = {
  width: '80%',
  maxWidth: 'none',
};

/**
 * The dialog width has been set to occupy the full width of browser through the `contentStyle` property.

// TODO: We display the plays inside the papers, mapping through them, then user can load one play by clicking on it, or share one play by clicking on the sharing buttons which will close the dialogue while opening the social providers
sharing dialogue
 */
class MyPlays extends React.Component {


  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.props.closePlays}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        // onTouchTap={this.props.openPlays}
      />,
    ];

		const plays = this.props.plays;

    return (
      <div>
        <Dialog
          title="All Plays"
          actions={actions}
          modal={true}
          contentStyle={customContentStyle}
          open={this.props.open}
        >
          {
            plays && plays.map(play => (
              <Play play={play}/>
            ))
          }
        </Dialog>
      </div>
    );
  }
}

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
