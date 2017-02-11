import {
  Divider,
  IconMenu,
  MenuItem,
  FontIcon,
  IconButton
} from 'material-ui';
import React from 'react';
import {connect} from 'react-redux';
import Deselect from 'material-ui/svg-icons/notification/do-not-disturb-alt';

import {addChunk, clearAllChunks} from '../redux/allChunks';
import {togglePlay} from '../redux/play';
import {toggleGrid} from '../redux/canvas-reducer';
import {openWindowSettings, closeWindowSettings} from '../redux/navState';
import Circle from '../chunks/Circle';
import Drone from '../chunks/Drone';
import PhysBall from '../chunks/PhysBall';
import Attractor from '../chunks/Attractor';
import Fizzler from '../chunks/Fizzler';
import Rectangle from '../chunks/Rectangle';
// import Pendulum from '../chunks/Pendulum';
import Emitter from '../chunks/Emitter';
import Rope from '../chunks/Rope';
import ToggleGrid from './ToggleGrid';
import colors from '../colors';

const styles = {
  button: {
    // top: 15,
    right: 10,
    position: 'absolute'
  },
  addChunkIcon: {
    // top: 15,
    right: 25,
    fontSize: 50,
    color: colors.papayaWhip
  }
};

const circleRadius = 30;

function RightMenu (props) {
  const enterEditMode = isPlaying => {
    if (isPlaying) props.togglePlay(isPlaying);
  };
  return (<div>
    <IconMenu
      style={styles.button}
      iconButtonElement={
        <IconButton
          tooltip="Add Chunk"
          tooltipPosition="bottom-left"
          iconStyle={styles.addChunkIcon}
        >
          <FontIcon className="material-icons" >add_circle_outline</FontIcon>
        </IconButton>
      }
      anchorOrigin={{horizontal: 'right', vertical: 'top'}}
      targetOrigin={{horizontal: 'right', vertical: 'top'}}
    >
      <MenuItem
        primaryText="Moving Circle"
        onTouchTap={() => {
					props.addChunk(new Circle(props.center.x, props.center.y, circleRadius, new Point(1, 1)));
					enterEditMode(props.isPlaying);
				}}
      />
      <MenuItem
        primaryText="Particle"
        onTouchTap={() => {
					props.addChunk(new Circle(props.center.x, props.center.y, 10, new Point(1, 1)));
					enterEditMode(props.isPlaying);
				}}
      />
      <MenuItem
        primaryText="Fixed Circle"
        onTouchTap={() => {
          let newCircle = new Circle(props.center.x, props.center.y, circleRadius, new Point(0, 0), colors.madang);
          newCircle.fixed = true;
          newCircle.flashColor = colors.laRioja;
					props.addChunk(newCircle);
					enterEditMode(props.isPlaying);
				}}
      />
      <MenuItem primaryText="Rectangle" onTouchTap={() => {
          let rectangle = new Rectangle(props.center.x, props.center.y, 60, 60, new Point(0, 0));
          props.addChunk(rectangle);
          enterEditMode(props.isPlaying);
        }}
      />
      <MenuItem
        primaryText="PhysBall"
        onTouchTap={() => {
					props.addChunk(
            new PhysBall(
              props.center.x,
              props.center.y,
              circleRadius,
              new Point(-0.00001, 0),
              colors.blueStone
            )
          );
					enterEditMode(props.isPlaying);
				}}
      />
      <MenuItem
        primaryText="Static Attractor"
        onTouchTap={() => {
					props.addChunk(
            new Attractor(
              props.center.x,
              props.center.y,
              circleRadius,
              new Point(0, 0),
              colors.flamingo,
              true
            )
          );
					enterEditMode(props.isPlaying);
				}}
      />
      <MenuItem
        primaryText="Flying Attractor"
        onTouchTap={() => {
					props.addChunk(
            new Attractor(
              props.center.x,
              props.center.y,
              circleRadius,
              new Point(0, 0),
              colors.newYorkPink,
              false
            )
          );
					enterEditMode(props.isPlaying);
				}}
      />
      <MenuItem
        primaryText="Fizzler"
        onTouchTap={() => {
					props.addChunk(
            new Fizzler(
              props.center.x,
              props.center.y,
              circleRadius,
              new Point(0, 0),
              colors.mangoTango,
              new Point(-2, 2),
              true
            )
          );
					enterEditMode(props.isPlaying);
				}}
      />
      <MenuItem
        primaryText="Crackler"
        onTouchTap={() => {
					props.addChunk(
            new Fizzler(
              props.center.x,
              props.center.y,
              circleRadius,
              new Point(0, 0),
              colors.mangoTango,
              new Point(-2, 2),
              false
            )
          );
					enterEditMode(props.isPlaying);
				}}
      />
      <MenuItem
        primaryText="Emitter"
        onTouchTap={() => {
          props.addChunk(new Emitter(props.center.x, props.center.y, 50));
					enterEditMode(props.isPlaying);
				}}
      />
      <MenuItem
        primaryText="Drone"
        onTouchTap={() => {
					props.addChunk(
            new Drone(
              props.center.x,
              props.center.y,
              40,
              colors.hopbush,
              colors.dullMagenta,
              colors.vividViolet
            )
          );
					enterEditMode(props.isPlaying);
				}}
      />
    {/*<MenuItem
      primaryText="Pendulum"
      onTouchTap={() => {
        props.addChunk(new Pendulum(props.center.x, props.center.y, circleRadius, new Point(0, 0)));
        enterEditMode(props.isPlaying);
      }}
      />*/}
    <MenuItem
      primaryText="Rope"
      onTouchTap={() => {
        props.addChunk(new Rope(props.center.x - 100, props.center.y + 100, props.center.x + 100, props.center.y - 100));
        enterEditMode(props.isPlaying);
      }}
      />
    <Divider style={{height: '2px'}} />
    <MenuItem
      leftIcon={<Deselect />}
      primaryText="Clear" // can add capabilities and reset this to WindowSettings
      onTouchTap={() => {
        props.allChunks.forEach(chunk => chunk.path.remove());
        props.clearAllChunks();
        enterEditMode(props.isPlaying);
      }}
      />
    <Divider style={{height: '2px'}} />
    <ToggleGrid
      toggleGrid={props.toggleGrid}
      displayGrid={props.displayGrid}
    />
    </IconMenu>
  </div>);
}

const mapStateToProps = (state) => {
	return {
		center: state.canvas.center,
		isPlaying: state.isPlaying,
    allChunks: state.allChunks,
    displayGrid: state.canvas.displayGrid
	};
};

const mapDispatchToProps = dispatch => {
	return {
		addChunk: (chunk) => {
			dispatch(addChunk(chunk));
		},
		togglePlay: (isPlaying) => {
			dispatch(togglePlay(isPlaying));
		},
    openWindowSettings: () => {
      dispatch(openWindowSettings());
    },
    clearAllChunks: () =>
      dispatch(clearAllChunks()),
    toggleGrid: () =>
      dispatch(toggleGrid())
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(RightMenu);
