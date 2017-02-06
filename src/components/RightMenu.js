import React from 'react';
import {connect} from 'react-redux';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

import {addChunk} from '../redux/allChunks';
import {togglePlay} from '../redux/play';
import Circle from '../chunks/Circle';
import PhysBall from '../chunks/PhysBall';
import Attractor from '../chunks/Attractor';
import Fizzler from '../chunks/Fizzler';
import Rectangle from '../chunks/Rectangle';
import Pendulum from '../chunks/Pendulum';
import Login from './Login';
import colors from '../colors'

const styles = {
  menu: {
    position: 'absolute',
    right: 10,
    top: 5
  }
};

function RightMenu (props) {
  const enterEditMode = isPlaying => {
    if (isPlaying) props.togglePlay(isPlaying);
  }
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
					props.addChunk(new Circle(props.center.x, props.center.y, 20, new Point(1, 1)));
					enterEditMode(props.isPlaying);
				}}
      />
      <MenuItem
        primaryText="PhysBall"
        onTouchTap={() => {
					props.addChunk(new PhysBall(props.center.x, props.center.y, 20, new Point(-0.00001, 0), colors.blueStone));
					enterEditMode(props.isPlaying);
				}}
      />
      <MenuItem
        primaryText="Static Attractor"
        onTouchTap={() => {
					props.addChunk(new Attractor(props.center.x, props.center.y, 20, new Point(0, 0), colors.flamingo, true));
					enterEditMode(props.isPlaying);
				}}
      />
      <MenuItem
        primaryText="Flying Attractor"
        onTouchTap={() => {
					props.addChunk(new Attractor(props.center.x, props.center.y, 20, new Point(0, 0), colors.newYorkPink, false));
					enterEditMode(props.isPlaying);
				}}
      />
      <MenuItem
        primaryText="Fizzler"
        onTouchTap={() => {
					props.addChunk(new Fizzler(props.center.x, props.center.y, 24, new Point(0, 0)));
					enterEditMode(props.isPlaying);
				}}
      />
      <MenuItem
        primaryText="Pendulum"
        onTouchTap={() => {
					props.addChunk(new Pendulum(props.center.x, props.center.y, 24, new Point(0, 0)));
					enterEditMode(props.isPlaying);
				}}
      />
      <MenuItem primaryText="Rectangle" onTouchTap={() => {
					props.addChunk(new Rectangle(props.center.x, props.center.y, 60, 60, new Point(0, 0)));
					enterEditMode(props.isPlaying);
				}}
      />
      <MenuItem primaryText="Share" />
    </IconMenu>
  </div>);
}

const mapStateToProps = (state) => {
	return {
		center: state.canvas.center,
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
