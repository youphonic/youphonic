import React from 'react';
import {connect} from 'react-redux';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

import {addChunk} from '../redux/allChunks';
import {togglePlay} from '../redux/play';
import Circle from '../chunks/Circle';
import Rectangle from '../chunks/Rectangle';

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
					props.addChunk(new Circle(0, 0, 20));
					if (props.isPlaying) {
						props.togglePlay(props.isPlaying);
					}
				}}
      />
      {/* <MenuItem
        primaryText="Rectangle"
        onTouchTap={() => {
					props.addChunk(new Rectangle(100, 100, 75));
					if (props.isPlaying) {
						props.togglePlay(props.isPlaying);
					}
				}}
      /> */}
      <MenuItem primaryText="Triangle" />
      <MenuItem primaryText="Start" />
      <MenuItem primaryText="Stop" />
      <MenuItem primaryText="Share" />
    </IconMenu>
  </div>);
}

const mapStateToProps = (state) => {
	return {
		// myP5: state.myP5,
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
