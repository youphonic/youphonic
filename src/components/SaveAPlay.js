import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Dialog, TextField, FlatButton } from 'material-ui';

import { savePlayToServer } from '../paper/saver';
import { toggleSaveAPlay } from '../redux/navState';
import {startCanvas} from '../redux/appState';

class SaveAPlay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imgData: '',
      playTitle: ''
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(ev) {
    this.setState({
      playTitle: ev.target.value
    });
  }

  render() {

    let srcCanvas;
    let imageData;

    if (this.props.saveAPlayOpen) {
      srcCanvas = document.getElementById('paperCanvas');

      //create a dummy CANVAS
      let destinationCanvas = document.createElement("canvas");
      destinationCanvas.width = srcCanvas.width;
      destinationCanvas.height = srcCanvas.height;

      let destCtx = destinationCanvas.getContext('2d');

      //create a rectangle with the desired color
      destCtx.fillStyle = '#31B8B5';
      destCtx.fillRect(0,0,srcCanvas.width,srcCanvas.height);

      //draw the original canvas onto the destination canvas
      destCtx.drawImage(srcCanvas, 0, 0);

      //finally use the destinationCanvas.toDataURL() method to get the desired output;
      imageData = destinationCanvas.toDataURL();
    }

    const saveAPlayActions = [
      <FlatButton
        key="cancelBut"
        label="Cancel"
        primary={true}
        onTouchTap={(ev) => {
          this.props.start();
          ev.preventDefault();
          this.props.toggleSavePlay();
        }}
      />,
      <FlatButton
        key="submitBut"
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onTouchTap={(ev) => {
          this.props.start();
          savePlayToServer(
            this.props.user,
            this.props.playToSave,
            this.state.playTitle,
            imageData
          );
          this.props.toggleSavePlay();
        }}
      />
    ];

    return (
      <Dialog
        modal={false}
        open={this.props.saveAPlayOpen}
        title="Save Your Play"
        actions={saveAPlayActions}
        onRequestClose={() => {
          this.props.start();
          this.props.toggleSavePlay();
        }}
        style={{textAlign: 'center'}}
      >
        <img
          src={this.props.saveAPlayOpen && imageData}
          alt="snapshot of current play"
          style={{width: '70%'}}
        />
        <TextField
          id="playTitle"
          hintText="Enter a Title for Your Play"
          value={this.state.playTitle}
          onChange={this.handleChange}
        />
      </Dialog>
    );
  }
}

const mapStateToProps = ({ auth, allChunks, navState }) => ({
  user: auth,
  playToSave: allChunks,
  saveAPlayOpen: navState.saveAPlayOpen
});


const mapDispatchToProps = dispatch => ({
  start: () => dispatch(startCanvas()),
  toggleSavePlay: () => dispatch(toggleSaveAPlay())
});

export default connect(mapStateToProps, mapDispatchToProps)(SaveAPlay);
