import React from 'react';
import { connect } from 'react-redux';
import { Dialog, FontIcon, FlatButton} from 'material-ui';
import FloatingActionButton from 'material-ui/FloatingActionButton';

import colors from '../colors';

// components
import AutoCompleteNotes from './AutoCompleteNotes';
import SoundOnOffCheckbox from './SoundOnOffCheckbox';
import DrumsDropdownSettings from './DrumsDropdownSettings';
import RotationDropdownSettings from './RotationDropdownSettings';

// Action creators
import {updateOneChunk} from '../redux/allChunks';
// import { updateAndPlaceChunk } from '../redux/chunk';
import {startCanvas, stopCanvas} from '../redux/appState';
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
          title="Set Chunk Options"
          autoScrollBodyContent={true}
          open={this.props.shapeSettingsOpen}
          onRequestClose={this.props.closeShapeSettings}
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
            <span style={styles.label}>Instrument:</span>
              <DrumsDropdownSettings
                drum={this.state.drum}
                changeDrum={this.changeDrum}
              />
              <p style={styles.label}>Rotation:</p>
              <RotationDropdownSettings
                rotation={this.state.rotation}
                changeRotation={this.changeRotation}
              />
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
