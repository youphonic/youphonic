import React from 'react';
import { connect } from 'react-redux';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
// import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import TextField from 'material-ui/TextField';
import { updateAndPlaceChunk } from '../redux/chunk';
import {updateOneChunk} from '../redux/allChunks';
// import store from '../store';
/**
 * Dialog content can be scrollable.
 */
class ShapeSettings extends React.Component {
  constructor() {
    super();
    this.state = {
      open: false,
      frequency: 0
    };
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleOpen() {
    this.setState({open: true});
  }
  handleClose() {
    this.setState({open: false});
  }
  handleChange(event) {
    this.setState({frequency: event.target.value});
  }
  handleSubmit() {
	  this.props.updateOneChunk({
      id: this.props.selectedChunk.id,
      frequency: this.state.frequency
    });
    this.setState({
	    open: false,
		  frequency: 0
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
        <RaisedButton label="Scrollable Dialog" onTouchTap={this.handleOpen} />
        <Dialog
          modal={false}
          actions={actions}
          open={this.state.open}
          title="Scrollable Dialog"
          autoScrollBodyContent={true}
          onRequestClose={this.handleClose}
        >
          <form>
            <TextField
              onChange={this.handleChange}
              hintText="Choose a frequency"
            />
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
      dispatch(updateOneChunk(chunkUpdates))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ShapeSettings);
