import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import TextField from 'material-ui/TextField';
import {updateChunk} from '../redux/chunk';
import store from '../store';
/**
 * Dialog content can be scrollable.
 */
export default class ShapeSettings extends React.Component {
  constructor() {
    super()
    this.state = {
      open: false,
      frequency: 0
    };
    this.handleOpen = this.handleOpen.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
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
  handleSubmit(event) {
	store.dispatch(updateChunk({frequency: this.state.frequency}))
    this.setState({
		open: false,
		frequency: 0
	});
  }
  render() {
    const actions = [ < FlatButton label = "Cancel" primary = {
        true
      }
      onTouchTap = {
        this.handleClose
      } />, < FlatButton label = "Submit" primary = {
        true
      }
      keyboardFocused = {
        true
      }
      onTouchTap = {
        this.handleSubmit
      } />
    ];
    return (
      <div>
        <RaisedButton label="Scrollable Dialog" onTouchTap={this.handleOpen}/>
        <Dialog title="Scrollable Dialog" actions={actions} modal={false} open={this.state.open} onRequestClose={this.handleClose} autoScrollBodyContent={true}>
          <form>
            <TextField onChange={this.handleChange} hintText="Choose a frequency"/>
          </form>
        </Dialog>
      </div>
    );
  }
}
