import React from 'react';
import {connect} from 'react-redux';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

//import {ourP5} from './P5Wrapper';

import {addChunk} from '../redux/allChunks';
import {togglePlay} from '../redux/play';
import Circle from '../chunks/Circle';
import PhysBall from '../chunks/PhysBall';
import Rectangle from '../chunks/Rectangle';
import Login from './Login';

//testing tone, doesn't belong here for prod
import {synthOne} from '../tone/tonePatchOne'

const styles = {
  menu: {
    position: 'absolute',
    right: 10,
    top: 5
  }
};

function RightMenu (props) {
  return (<div style={styles.menu}>
    <IconMenu
		iconButtonElement={
			<IconButton>
				<MoreVertIcon />
			</IconButton>
		}
    anchorOrigin={{horizontal: 'right', vertical: 'top'}}
    targetOrigin={{horizontal: 'right', vertical: 'top'}}
    >
      <MenuItem
        primaryText="Circle"
        onTouchTap={() => {
					props.addChunk(new Circle(0, 0, 20, new Point(1, 1)));

					if (props.isPlaying) {
						props.togglePlay(props.isPlaying);
					}
				}}
      />
      <MenuItem
        primaryText="PhysBall"
        onTouchTap={() => {
					props.addChunk(new PhysBall(0, 0, 20, new Point(-0.00001, 0)));
					if (props.isPlaying) {
						props.togglePlay(props.isPlaying);
					}
				}}
      />
      <MenuItem primaryText="Triangle" />
      <MenuItem primaryText="Start" />
      <MenuItem primaryText="Stop" />
      <MenuItem primaryText="Share" />
      <MenuItem
        primaryText="TestTone"
        onTouchTap={() => {
          synthOne.triggerAttackRelease('A4', 0.3);
        }}
      />
			<Login/>
    </IconMenu>
  </div>);
}

const mapStateToProps = (state) => {
	return {
		center: state.center,
		isPlaying: state.isPlaying
	};
};

const mapDispatchToProps = dispatch => {
	return {
		addChunk: (chunk) => {
			dispatch(addChunk(chunk));
		},
		togglePlay: (isPlaying) => {
			dispatch(togglePlay(isPlaying));
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(RightMenu);
