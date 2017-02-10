import {
  IconMenu,
  MenuItem,
  FontIcon,
  IconButton
} from 'material-ui';
import React from 'react';
import {connect} from 'react-redux';

import {addChunk} from '../redux/allChunks';
import {togglePlay} from '../redux/play';
import {openWindowSettings, closeWindowSettings} from '../redux/navState';
import Circle from '../chunks/Circle';
import Drone from '../chunks/Drone';
import PhysBall from '../chunks/PhysBall';
import Attractor from '../chunks/Attractor';
import Fizzler from '../chunks/Fizzler';
import Rectangle from '../chunks/Rectangle';
import Pendulum from '../chunks/Pendulum';
import Emitter from '../chunks/Emitter';
import Rope from '../chunks/Rope';
import Login from './Login';
import colors from '../colors';

const styles = {
  menu: {
    position: 'absolute',
    right: 10,
    top: 5
  },
  chunkIcon: {
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
  return (<div style={styles.menu}>
    <IconMenu
      iconButtonElement={
        <IconButton iconStyle={styles.chunkIcon}>
          <FontIcon className="material-icons" >add_circle</FontIcon>
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
          let newCircle = new Circle(props.center.x, props.center.y, circleRadius, new Point(0, 0));
          newCircle.fixed = true;
          newCircle.flashColor = colors.newYorkPink;
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
    <MenuItem
      primaryText="Pendulum"
      onTouchTap={() => {
        props.addChunk(new Pendulum(props.center.x, props.center.y, circleRadius, new Point(0, 0)));
        enterEditMode(props.isPlaying);
      }}
      />
    <MenuItem
      primaryText="Rope"
      onTouchTap={() => {
        props.addChunk(new Rope(props.center.x - 100, props.center.y + 100, props.center.x + 100, props.center.y - 100, colors.blueStone));
        enterEditMode(props.isPlaying);
      }}
      />
    <MenuItem
      primaryText="Show Grid" // can add capabilities and reset this to WindowSettings
      onTouchTap={() => {
        props.openWindowSettings();
        enterEditMode(props.isPlaying);
      }}
      />
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
		},
    openWindowSettings: () => {
      dispatch(openWindowSettings());
    }
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(RightMenu);
