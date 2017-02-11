import {
  Dialog,
  FontIcon,
  FlatButton,
  IconButton
} from 'material-ui';
import { connect } from 'react-redux';
import React, { Component } from 'react';

import colors from '../colors';

// components
import AutoCompleteNotes from './AutoCompleteNotes';
import SoundOnOffCheckbox from './SoundOnOffCheckbox';
import DrumsDropdownSettings from './DrumsDropdownSettings';
import RotationDropdownSettings from './RotationDropdownSettings';

// Action creators
import {updateOneChunk} from '../redux/allChunks';
import {startCanvas, stopCanvas} from '../redux/appState';
import { openShapeSettings, closeShapeSettings } from '../redux/navState';


class ShapeSettings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      frequency: this.props.selectedChunk.frequency,
      drum: this.props.selectedChunk.drum,
      rotation: this.props.selectedChunk.rotation.toString(),
      triggerSynthResponse: this.props.selectedChunk.triggerSynthResponse
    };
    this.initialRotation = this.props.selectedChunk.rotation;

    this.changeDrum = this.changeDrum.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.changeRotation = this.changeRotation.bind(this);
    this.changeFrequency = this.changeFrequency.bind(this);
    this.changeSynthEnabled = this.changeSynthEnabled.bind(this);
    this.handleFrequencyEnterKey = this.handleFrequencyEnterKey.bind(this);
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
      button: {
        right: 10,
        bottom: 15,
        position: 'absolute'
      },
			settingsIcon: {
        bottom: 15,
        fontSize: 50,
        color: colors.papayaWhip
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

    return (
      <div>
				<IconButton
          style={styles.button}
          iconStyle={styles.settingsIcon}
          onTouchTap={this.props.openShapeSettings}
        >
					<FontIcon className="material-icons">music_note</FontIcon>
				</IconButton>

        <Dialog
          modal={false}
          actions={actions}
          autoScrollBodyContent={true}
          open={this.props.shapeSettingsOpen}
          onRequestClose={this.props.closeShapeSettings}
          title={`Set ${this.props.selectedChunk.type[0].toUpperCase() + this.props.selectedChunk.type.slice(1)} Options`}
        >
          <form style={styles.form}>
            <div style={styles.formGroup}>
              <SoundOnOffCheckbox
                changeSynthEnabled={this.changeSynthEnabled}
                triggerSynthResponse={this.state.triggerSynthResponse}
              />
              <AutoCompleteNotes
                frequency={this.frequency}
                changeFrequency={this.state.changeFrequency}
                handleFrequencyEnterKey={this.handleFrequencyEnterKey}
              />
            </div>
            <div style={styles.formGroup}>
              {(this.props.selectedChunk.type !== 'rope') && (
                <div style={{display: 'inline-block'}}>
                  <span style={styles.label}>Instrument:</span>
                  <DrumsDropdownSettings
                    drum={this.state.drum}
                    changeDrum={this.changeDrum}
                  />
                </div>
              )}
              {(this.props.selectedChunk.type === 'rectangle') && (
                <div style={{display: 'inline-block'}}>
                  <p style={styles.label}>Rotation:</p>
                  <RotationDropdownSettings
                    rotation={this.state.rotation}
                    changeRotation={this.changeRotation}
                  />
                </div>
              )}
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
