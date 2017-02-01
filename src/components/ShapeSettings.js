import React from 'react';
import { connect } from 'react-redux';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

import { updateAndPlaceChunk } from '../redux/chunk';
import {updateOneChunk} from '../redux/allChunks';
import {startCanvas, stopCanvas} from '../redux/appState'

/**
 * Dialog content can be scrollable.
 */
class ShapeSettings extends React.Component {
  constructor() {
    super();
    this.state = {
      open: false,
      frequency: 0,
      drum: ''
    };
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.changeFrequency = this.changeFrequency.bind(this);
    this.changeDrum = this.changeDrum.bind(this);
  }
  handleOpen() {
    this.setState({open: true});
    this.props.stopCanvas();
  }
  handleClose() {
    this.setState({open: false});
    this.props.startCanvas();
  }

  changeFrequency(event) {
    this.setState({frequency: event.target.value});
  }

  changeDrum(event, id, value) {
    this.setState({drum: value});
  }


  handleSubmit() {
	  this.props.updateOneChunk({
      id: this.props.selectedChunk.id,
      frequency: +this.state.frequency,
      drum: this.state.drum
    });
    this.props.startCanvas();
    this.setState({
	    open: false,
		  frequency: 0,
      drum: ''
	  });
  }
  render() {
    const actions = [
      <FlatButton
        key="button1"
        label="Cancel"
        primary={true}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        key="button2"
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleSubmit}
      />
    ];
    return (
      <div>
        <RaisedButton style={this.props.style} label="Update Settings" onTouchTap={this.handleOpen} />
        <Dialog
          modal={false}
          actions={actions}
          open={this.state.open}
          title="Update Chunk"
          autoScrollBodyContent={true}
          onRequestClose={this.handleClose}
        >
          <form>
            <TextField
              floatingLabelText="Frequency"
              defaultValue={this.props.selectedChunk.frequency}
              onChange={this.changeFrequency}
              hintText="Choose a frequency"
            />
            <DropDownMenu value={this.state.drum} onChange={this.changeDrum}>
              <MenuItem value={'kick'} primaryText="Kick" />
              <MenuItem value={'snare'} primaryText="Snare" />
              <MenuItem value={'floorTom'} primaryText="Floor Tom" />
              <MenuItem value={'hiHatClose'} primaryText="Hi Hat Close" />
            </DropDownMenu>
          </form>
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    selectedChunk: state.selectedChunk
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateOneChunk: chunkUpdates =>
      dispatch(updateOneChunk(chunkUpdates)),
    startCanvas: () =>
      dispatch(startCanvas()),
    stopCanvas: () =>
      dispatch(stopCanvas())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ShapeSettings);
