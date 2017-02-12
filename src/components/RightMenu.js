import {
  Menu,
  Divider,
  IconMenu,
  MenuItem,
  FontIcon,
  IconButton
} from 'material-ui';
import React from 'react';
import {connect} from 'react-redux';

import Deselect from 'material-ui/svg-icons/notification/do-not-disturb-alt';
import ArrowDropLeft from 'material-ui/svg-icons/hardware/keyboard-arrow-left';

import {togglePlay} from '../redux/play';
import {toggleGrid} from '../redux/canvas-reducer';
import {addChunk, clearAllChunks} from '../redux/allChunks';

import Rope from '../chunks/Rope';
import Drone from '../chunks/Drone';
import Circle from '../chunks/Circle';
import Fizzler from '../chunks/Fizzler';
import Emitter from '../chunks/Emitter';
import PhysBall from '../chunks/PhysBall';
import Attractor from '../chunks/Attractor';
import Rectangle from '../chunks/Rectangle';
// import Pendulum from '../chunks/Pendulum';

import colors from '../colors';
import ToggleGrid from './ToggleGrid';

const styles = {
  button: {
    right: 10,
    position: 'absolute'
  },
  addChunkIcon: {
    top: 6,
    right: 25,
    fontSize: 50,
    color: colors.papayaWhip
  }
};
const circleRadius = 30;


const RightMenu = (props) => {

  const enterEditMode = (isPlaying) => {
    if (isPlaying) props.togglePlay(isPlaying);
  };

  const prevDef = event => {
    event.stopPropagation();
  };

  return (<div>
    <IconMenu
      iconButtonElement={
        <IconButton
          tooltip="Add A Chunk"
          tooltipPosition="bottom-left"
          iconStyle={styles.addChunkIcon}
        >
          <FontIcon className="material-icons">add_circle</FontIcon>
        </IconButton>
      }
      style={styles.button}
      anchorOrigin={{horizontal: 'right', vertical: 'top'}}
      targetOrigin={{horizontal: 'right', vertical: 'top'}}
    >
      <MenuItem
        primaryText="Moving Chunks"
        leftIcon={<ArrowDropLeft />}
        menuItems={[
          <Menu
            onItemTouchTap={function(event) {prevDef(event);}}
          >
            <MenuItem
              key="menuItem0"
              primaryText="Moving Circle"
              onTouchTap={(event) => {
                prevDef(event);
                props.addChunk(new Circle(
                  props.center.x,
                  props.center.y,
                  circleRadius,
                  new Point(1, 1)
                ));
                enterEditMode(props.isPlaying);
              }}
            />
            <MenuItem
              key="menuItem1"
              primaryText="Particle"
              onTouchTap={(event) => {
                props.addChunk(new Circle(
                  props.center.x,
                  props.center.y,
                  10,
                  new Point(1, 1)
                ));
                enterEditMode(props.isPlaying);
              }}
            />
            <MenuItem
              key="menuItem2"
              primaryText="PhysBall"
              onTouchTap={(event) => {
                props.addChunk(new PhysBall(
                  props.center.x,
                  props.center.y,
                  circleRadius,
                  new Point(-0.00001, 0),
                  colors.blueStone
                ));
                enterEditMode(props.isPlaying);
              }}
            />
            <MenuItem
              key="menuItem3"
              primaryText="Flying Attractor"
              onTouchTap={(event) => {
                props.addChunk(new Attractor(
                  props.center.x,
                  props.center.y,
                  circleRadius,
                  new Point(0, 0),
                  colors.newYorkPink,
                  false
                ));
                enterEditMode(props.isPlaying);
              }}
            />
          </Menu>
        ]}
      />
      <MenuItem
        primaryText="Static Chunks"
        leftIcon={<ArrowDropLeft />}
        menuItems={[
          <MenuItem
            primaryText="Fixed Circle"
            onTouchTap={(event) => {
              let newCircle = new Circle(
                props.center.x,
                props.center.y,
                circleRadius,
                new Point(0, 0),
                colors.madang
              );
              newCircle.fixed = true;
              newCircle.flashColor = colors.laRioja;
              props.addChunk(newCircle);
              enterEditMode(props.isPlaying);
            }}
          />,
          <MenuItem
            primaryText="Rectangle"
            onTouchTap={(event) => {
              props.addChunk(new Rectangle(
                props.center.x,
                props.center.y,
                60,
                60,
                new Point(0, 0)
              ));
              enterEditMode(props.isPlaying);
            }}
          />,
          <MenuItem
            primaryText="Static Attractor"
            onTouchTap={(event) => {
              props.addChunk(new Attractor(
                props.center.x,
                props.center.y,
                circleRadius,
                new Point(0, 0),
                colors.flamingo,
                true
              ));
              enterEditMode(props.isPlaying);
            }}
          />,
          <MenuItem
            primaryText="Fizzler"
            onTouchTap={(event) => {
              props.addChunk(new Fizzler(
                props.center.x,
                props.center.y,
                circleRadius,
                new Point(0, 0),
                colors.mangoTango,
                new Point(-2, 2),
                true
              ));
              enterEditMode(props.isPlaying);
            }}
          />,
          <MenuItem
            primaryText="Crackler"
            onTouchTap={(event) => {
              props.addChunk(new Fizzler(
                props.center.x,
                props.center.y,
                circleRadius,
                new Point(0, 0),
                colors.mangoTango,
                new Point(-2, 2),
                false
              ));
              enterEditMode(props.isPlaying);
            }}
          />,
          <MenuItem
            primaryText="Emitter"
            onTouchTap={(event) => {
              props.addChunk(new Emitter(
                props.center.x,
                props.center.y,
                50
              ));
              enterEditMode(props.isPlaying);
            }}
          />,
          <MenuItem
            primaryText="Drone"
            onTouchTap={(event) => {
              props.addChunk(new Drone(
                props.center.x,
                props.center.y,
                40,
                colors.hopbush,
                colors.dullMagenta,
                colors.vividViolet
              ));
              enterEditMode(props.isPlaying);
            }}
          />,
          /*<MenuItem
            primaryText="Pendulum"
            onTouchTap={(event) => {
              props.addChunk(new Pendulum(
                props.center.x,
                props.center.y,
                circleRadius,
                new Point(0, 0)
              ));
              enterEditMode(props.isPlaying);
            }}
            />*/
          <MenuItem
            primaryText="Rope"
            onTouchTap={(event) => {
              props.addChunk(new Rope(
                props.center.x - 100,
                props.center.y + 100,
                props.center.x + 100,
                props.center.y - 100
              ));
              enterEditMode(props.isPlaying);
            }}
          />
        ]}
      />
      <Divider style={{height: '2px'}} />
      <MenuItem
        leftIcon={<Deselect />}
        primaryText="Clear" // can add capabilities and reset this to WindowSettings
        onTouchTap={(event) => {
          event.stopPropagation();
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
};

const mapStateToProps = ({ canvas, isPlaying, allChunks }) => {
	return {
		center: canvas.center,
		isPlaying: isPlaying,
    allChunks: allChunks,
    displayGrid: canvas.displayGrid
	};
};

const mapDispatchToProps = dispatch => {
	return {
		addChunk: (chunk) =>
      dispatch(addChunk(chunk)),
		togglePlay: (event, isPlaying) => {
      event.preventDefault();
      event.stopPropagation();
      dispatch(togglePlay(isPlaying));
    },
    clearAllChunks: () =>
      dispatch(clearAllChunks()),
    toggleGrid: () =>
      dispatch(toggleGrid())
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(RightMenu);
