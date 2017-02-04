import React from 'react';
import { connect } from 'react-redux';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

import FloatingActionButton from 'material-ui/FloatingActionButton';
import FontIcon from 'material-ui/FontIcon';
import {red500, yellow500, blue500} from 'material-ui/styles/colors';
import AutoComplete from 'material-ui/AutoComplete';

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
      frequency: '',
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

  changeFrequency(searchText) {
    this.setState({frequency: searchText});
  }

  changeDrum(event, id, value) {
    this.setState({drum: value});
  }

  handleSubmit() {
		event.preventDefault();
	  this.props.updateOneChunk({
      id: this.props.selectedChunk.id,
      frequency: this.state.frequency,
      drum: this.state.drum
    });
    this.props.startCanvas();
    this.setState({
	    open: false,
		  frequency: '',
      drum: ''
	  });
  }


  render() {

		const styles = {
			buttonIcon: {
				fontSize: 50
			},
			settingsButton: {
				position: 'absolute',
				right: 15,
				bottom: 15
			}
		}
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

		const frequencies = [
		  'C1', 'C#1', 'D1', 'Db1', 'D#1', 'E1', 'Eb1', 'F1', 'F#1', 'G', 'Gb1', 'G#1', 'A1', 'Ab1', 'A#1', 'B1', 'Bb1',
			'C2', 'C#2', 'D2', 'Db2', 'D#2', 'E2', 'Eb2', 'F2', 'F#2', 'G', 'Gb2', 'G#2', 'A2', 'Ab2', 'A#2', 'B2', 'Bb2',
			'C3', 'C#3', 'D3', 'Db3', 'D#3', 'E3', 'Eb3', 'F3', 'F#3', 'G', 'Gb3', 'G#3', 'A3', 'Ab3', 'A#3', 'B3', 'Bb3',
			'C4', 'C#4', 'D4', 'Db4', 'D#4', 'E4', 'Eb4', 'F4', 'F#4', 'G', 'Gb4', 'G#4', 'A4', 'Ab4', 'A#4', 'B4', 'Bb4',
			'C4', 'C#4', 'D4', 'Db4', 'D#4', 'E4', 'Eb4', 'F4', 'F#4', 'G', 'Gb4', 'G#4', 'A4', 'Ab4', 'A#4', 'B4', 'Bb4',
			'C5', 'C#5', 'D5', 'Db5', 'D#5', 'E5', 'Eb5', 'F5', 'F#5', 'G', 'Gb5', 'G#5', 'A5', 'Ab5', 'A#5', 'B5', 'Bb5',
			'C6', 'C#6', 'D6', 'Db6', 'D#6', 'E6', 'Eb6', 'F6', 'F#6', 'G', 'Gb6', 'G#6', 'A6', 'Ab6', 'A#6', 'B6', 'Bb6',
			'C7', 'C#7', 'D7', 'Db7', 'D#7', 'E7', 'Eb7', 'F7', 'F#7', 'G', 'Gb7', 'G#7', 'A7', 'Ab7', 'A#7', 'B7', 'Bb7'
		];

    return (
      <div>
				<FloatingActionButton style={styles.settingsButton}>
					<FontIcon onTouchTap={this.handleOpen} className="material-icons" style={styles.buttonIcon}>{'music_note'}
					</FontIcon>
				</FloatingActionButton>

        <Dialog
          modal={false}
          actions={actions}
          open={this.state.open}
          title="Update Chunk"
          autoScrollBodyContent={true}
          onRequestClose={this.handleClose}
        >
          <form>
						<AutoComplete
							floatingLabelText="Enter note: C1, C#1, Db1, etc"
							filter={AutoComplete.caseInsensitiveFilter}
							dataSource={frequencies}
							onUpdateInput={this.changeFrequency}
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
