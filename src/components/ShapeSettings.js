import React from 'react';
import { connect } from 'react-redux';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
// import RaisedButton from 'material-ui/RaisedButton';
// import TextField from 'material-ui/TextField';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
// import SvgIcon from 'material-ui/SvgIcon';

import FloatingActionButton from 'material-ui/FloatingActionButton';
import FontIcon from 'material-ui/FontIcon';
// import {red500, yellow500, blue500} from 'material-ui/styles/colors';
import AutoComplete from 'material-ui/AutoComplete';
import VolumeOff from 'material-ui/svg-icons/av/volume-off';
import VolumeUp from 'material-ui/svg-icons/av/volume-up';
import Deselect from 'material-ui/svg-icons/notification/do-not-disturb-alt';

import colors from '../colors';
// import { updateAndPlaceChunk } from '../redux/chunk';
import {updateOneChunk} from '../redux/allChunks';
import {startCanvas, stopCanvas} from '../redux/appState';
import SoundOnOffCheckbox from './SoundOnOffCheckbox';

// Instrument Icons
import kickIcon from '../../public/icons/kick.svg.jsx';
import cowbellIcon from '../../public/icons/cowbell.svg.jsx';
import snareIcon from '../../public/icons/snare.svg.jsx';
import floorTomIcon from '../../public/icons/floor-tom.svg.jsx';
import hiHatIcon from '../../public/icons/hi-hat.svg.jsx';
// import synthIcon from '../../public/icons/keyboard.svg.jsx';

// Instrument Sounds
import { player, drumBuffers, possibilities } from '../tone/drums';
// import { synthOne, synthTwo } from '../tone/tonePatchOne';

// Action creators
import { openShapeSettings, closeShapeSettings } from '../redux/navState';


class ShapeSettings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      frequency: this.props.selectedChunk.frequency,
      drum: this.props.selectedChunk.drum,
      rotation: this.props.selectedChunk.rotation.toString(),
      triggerSynthResponse: this.props.selectedChunk.triggerSynthResponse
    };
    this.initialRotation = this.props.selectedChunk.rotation;
    this.handleClose = this.handleClose.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.changeFrequency = this.changeFrequency.bind(this);
    this.changeDrum = this.changeDrum.bind(this);
    this.handleFrequencyEnterKey = this.handleFrequencyEnterKey.bind(this);
    this.changeRotation = this.changeRotation.bind(this);
    this.changeSynthEnabled = this.changeSynthEnabled.bind(this);
  }

  handleClose() {
    this.props.startCanvas();
  }

  changeSynthEnabled(event, isInputChecked) {
    this.setState({triggerSynthResponse: isInputChecked});
  }

  changeFrequency(searchText, dataSource, params) {
    this.setState({frequency: searchText});
  }

  changeRotation(event, id, value) {
    this.setState({rotation: value});
  }

  handleFrequencyEnterKey(event) {
    // prevent enter key on frequency field from forcing an HTTP redirect
    if (event.keyCode === 13) event.preventDefault();
  }

  changeDrum(event, id, value = '') {
    this.setState({drum: value});
  }

  handleSubmit(event) {
    event.stopPropagation();
		event.preventDefault();
    this.props.selectedChunk.setRotation(+this.state.rotation);
	  this.props.updateOneChunk({
      id: this.props.selectedChunk.id,
      frequency: this.state.frequency,
      drum: this.state.drum,
      rotation: +this.state.rotation,
      triggerSynthResponse: this.state.triggerSynthResponse
    });
    this.props.startCanvas();
    this.props.closeShapeSettings();
  }

  render() {
		const styles = {
			buttonIcon: {
				fontSize: 50,
        color: colors.puertoRico
			},
			settingsButton: {
				position: 'absolute',
				right: 15,
				bottom: 15
			},
      form: {
        display: 'flex'
      },
      formGroup: {
        display: 'inline-block'
      },
      label: {
        marginTop: 15,
        marginLeft: 25,
        marginBottom: 0,
        display: 'inline-flex'
      },
      instMenu: {
        marginTop: 15,
        marginBottom: 0,
        display: 'inline-flex'
      },
      icon: {
        viewBox: '0 0 128 128',
        position: 'absolute',
        zIndex: 100,
        height: 24,
        width: 24,
        enableBackground: 'new 0 0 128 128'
      },
      checkbox: {
        marginBottom: 16,
        marginTop: 15,
        display: 'inline-flex'
      }
		};
    const actions = [
      <FlatButton
        key="button1"
        label="Cancel"
        primary={true}
        onTouchTap={this.props.closeShapeSettings}
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
		  'C1', 'C#1', 'D1', 'Db1', 'D#1', 'E1', 'Eb1', 'F1', 'F#1', 'G1', 'Gb1', 'G#1', 'A1', 'Ab1', 'A#1', 'B1', 'Bb1',
			'C2', 'C#2', 'D2', 'Db2', 'D#2', 'E2', 'Eb2', 'F2', 'F#2', 'G2', 'Gb2', 'G#2', 'A2', 'Ab2', 'A#2', 'B2', 'Bb2',
			'C3', 'C#3', 'D3', 'Db3', 'D#3', 'E3', 'Eb3', 'F3', 'F#3', 'G3', 'Gb3', 'G#3', 'A3', 'Ab3', 'A#3', 'B3', 'Bb3',
			'C4', 'C#4', 'D4', 'Db4', 'D#4', 'E4', 'Eb4', 'F4', 'F#4', 'G4', 'Gb4', 'G#4', 'A4', 'Ab4', 'A#4', 'B4', 'Bb4',
			'C5', 'C#5', 'D5', 'Db5', 'D#5', 'E5', 'Eb5', 'F5', 'F#5', 'G5', 'Gb5', 'G#5', 'A5', 'Ab5', 'A#5', 'B5', 'Bb5',
			'C6', 'C#6', 'D6', 'Db6', 'D#6', 'E6', 'Eb6', 'F6', 'F#6', 'G6', 'Gb6', 'G#6', 'A6', 'Ab6', 'A#6', 'B6', 'Bb6',
			'C7', 'C#7', 'D7', 'Db7', 'D#7', 'E7', 'Eb7', 'F7', 'F#7', 'G7', 'Gb7', 'G#7', 'A7', 'Ab7', 'A#7', 'B7', 'Bb7'
		];

    return (
      <div>
				<FloatingActionButton
          style={styles.settingsButton}
          iconStyle={styles.buttonIcon}
          backgroundColor={colors.papayaWhip}
        >
					<FontIcon
            onTouchTap={this.props.openShapeSettings}
            className="material-icons"
          >
            music_note
					</FontIcon>
				</FloatingActionButton>

        <Dialog
          modal={false}
          actions={actions}
          open={this.props.shapeSettingsOpen}
          title="Set Chunk Options"
          autoScrollBodyContent={true}
          onRequestClose={this.props.closeShapeSettings}
        >
          <form style={styles.form}>
          <div style={styles.formGroup}>
            <SoundOnOffCheckbox
              changeSynthEnabled={this.changeSynthEnabled}
              triggerSynthResponse={this.state.triggerSynthResponse}
            />
            <div>
              <AutoComplete
                floatingLabelText="Enter note: C1, C#1, Db1, etc"
                filter={AutoComplete.caseInsensitiveFilter}
                dataSource={frequencies}
                onUpdateInput={this.changeFrequency}
                searchText={this.state.frequency}
                onKeyDown={this.handleFrequencyEnterKey}

              />
            </div>
          </div>
          <div style={styles.formGroup}>
            <span style={styles.label}>Instrument:</span>
              <DropDownMenu value={this.state.drum} onChange={this.changeDrum} style={styles.instMenu}>
                <MenuItem
                  primaryText="No Drum"
                  leftIcon={<Deselect />}
                />
                <MenuItem
                  value="kick"
                  primaryText="Kick"
                  leftIcon={kickIcon}
                  onTouchTap={() => {
                    player.buffer = drumBuffers.get('kick');
                    player.start();
                  }}
                />
                <MenuItem
                  value="snare"
                  primaryText="Snare"
                  leftIcon={snareIcon}
                  onTouchTap={() => {
                    player.buffer = drumBuffers.get('snare');
                    player.start();
                  }}
                />
                <MenuItem
                  value="floorTom"
                  primaryText="Floor Tom"
                  leftIcon={floorTomIcon}
                  onTouchTap={() => {
                    player.buffer = drumBuffers.get('floorTom');
                    player.start();
                  }}
                />
                <MenuItem
                  value="hiHatClose"
                  primaryText="Hi Hat Close"
                  leftIcon={hiHatIcon}
                  onTouchTap={() => {
                    player.buffer = drumBuffers.get('hiHatClose');
                    player.start();
                  }}
                />
                <MenuItem
                  value="cowBell"
                  primaryText="Cowbell"
                  leftIcon={cowbellIcon}
                  onTouchTap={() => {
                  player.buffer = drumBuffers.get('cowBell');
                  player.start();
                }}
              />
              </DropDownMenu>
              <p style={styles.label}>Rotation:</p>
              <DropDownMenu value={this.state.rotation} onChange={this.changeRotation} style={styles.instMenu}>
                <MenuItem value="0" primaryText="0" />
                <MenuItem value="30" primaryText="30" />
                <MenuItem value="45" primaryText="45" />
                <MenuItem value="60" primaryText="60" />
                <MenuItem value="90" primaryText="90" />
              </DropDownMenu>
            </div>
          </form>
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    selectedChunk: state.selectedChunk,
    shapeSettingsOpen: state.navState.shapeSettingsOpen
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateOneChunk: chunkUpdates =>
      dispatch(updateOneChunk(chunkUpdates)),
    startCanvas: () =>
      dispatch(startCanvas()),
    stopCanvas: () =>
      dispatch(stopCanvas()),
    closeShapeSettings: () =>
      dispatch(closeShapeSettings()),
    openShapeSettings: () =>
      dispatch(openShapeSettings())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ShapeSettings);
