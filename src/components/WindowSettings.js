import React from 'react';
import { connect } from 'react-redux';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import SvgIcon from 'material-ui/SvgIcon';
import Checkbox from 'material-ui/Checkbox';

import FloatingActionButton from 'material-ui/FloatingActionButton';
import FontIcon from 'material-ui/FontIcon';
import {red500, yellow500, blue500} from 'material-ui/styles/colors';
import AutoComplete from 'material-ui/AutoComplete';
import gridOn from '../../public/icons/gridOn.svg.jsx'
import gridOff from '../../public/icons/gridOff.svg.jsx'

import colors from '../colors';
import {startCanvas, stopCanvas} from '../redux/appState';
import {openWindowSettings, closeWindowSettings} from '../redux/navState';
import {toggleGrid} from '../redux/canvas-reducer';


class WindowSettings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayGrid: this.props.displayGrid,
      open: true
    };
    this.handleClose = this.handleClose.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.changeGridDisplayed = this.changeGridDisplayed.bind(this);
  }

  handleClose() {
    this.props.closeWindowSettings();
    this.props.startCanvas();
  }

  handleSubmit(event) {
    event.stopPropagation();
		event.preventDefault();
	  this.props.updateOneChunk({
      id: this.props.selectedChunk.id,
      frequency: this.state.frequency,
      drum: this.state.drum,
      rotation: +this.state.rotation,
      triggerSynthResponse: this.state.triggerSynthResponse
    });
    this.handleClose();
  }

  changeGridDisplayed (event, isGridDisplayed) {
    this.setState({displayGrid: isGridDisplayed});
    console.log(this.state);
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
        enableBackground: "new 0 0 128 128"
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
        <Dialog
          modal={false}
          actions={actions}
          open={this.props.open}
          title="Set Window Options"
          autoScrollBodyContent={true}
          onRequestClose={this.handleClose}
        >
          <form style={styles.form}>
          <div style={styles.formGroup}>
            <div>
              <Checkbox
                checkedIcon={<gridOn />}
                uncheckedIcon={<gridOff />}
                style={styles.checkbox}
                label="Enable Grid"
                checked={this.state.displayGrid}
                onCheck={this.changeGridDisplayed}
              />
            </div>
          </div>
          </form>
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    displayGrid: state.canvas.displayGrid,
    open: state.navState.windowSettingOpen
  };
};

const mapDispatchToProps = dispatch => {
  return {
    toggleGrid: () =>
      dispatch(toggleGrid()),
    startCanvas: () =>
      dispatch(startCanvas()),
    stopCanvas: () =>
      dispatch(stopCanvas()),
    closeWindowSettings: () =>
      dispatch(closeWindowSettings()),
    openWindowSettings: () =>
      dispatch(openWindowSettings())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(WindowSettings);
