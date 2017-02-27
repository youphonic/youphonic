import {
  List,
  Divider,
  ListItem,
  IconMenu,
  FontIcon,
  IconButton
} from 'material-ui';
import React from 'react';
import {connect} from 'react-redux';

import Deselect from 'material-ui/svg-icons/notification/do-not-disturb-alt';
import ArrowDropDown from 'material-ui/svg-icons/navigation/arrow-drop-down';

import {togglePlay} from '../redux/play';
import {toggleGrid} from '../redux/canvas-reducer';
import {addChunk, clearAllChunks} from '../redux/allChunks';
import {toggleRightMenu} from '../redux/navState'

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
    right: 0,
    position: 'absolute'
  },
  addChunkIcon: {
    top: 6,
    right: 35,
    fontSize: 50,
    color: colors.papayaWhip
  }
};
const circleRadius = 30;


const RightMenu = (props) => {

  const enterEditMode = (isPlaying) => {
    if (isPlaying) props.togglePlay(isPlaying);
  };

  return (<div>
    <IconMenu
      style={styles.button}
      open={props.open}
      onRequestChange={props.toggleRightMenu}
      iconButtonElement={
        <IconButton
          tooltip="Add A Chunk"
          tooltipPosition="bottom-left"
          iconStyle={styles.addChunkIcon}
        >
          <FontIcon className="material-icons">add_circle_outline</FontIcon>
        </IconButton>
      }
      anchorOrigin={{horizontal: 'right', vertical: 'top'}}
      targetOrigin={{horizontal: 'right', vertical: 'top'}}
    >
      <List>
        <ListItem
          initiallyOpen={true}
          primaryText="Moving Chunks"
          leftIcon={<ArrowDropDown />}
          primaryTogglesNestedList={true}
          autoGenerateNestedIndicator={false}
          nestedItems={[
            <ListItem
              key="menuItem0"
              primaryText="Moving Circle"
              onTouchTap={() => {
                props.addChunk(new Circle(
                  props.center.x,
                  props.center.y,
                  circleRadius,
                  new Point(1, 1)
                ));
                enterEditMode(props.isPlaying);
              }}
            />,
            <ListItem
              key="menuItem1"
              primaryText="Particle"
              onTouchTap={() => {
                props.addChunk(new Circle(
                  props.center.x,
                  props.center.y,
                  10,
                  new Point(1, 1)
                ));
                enterEditMode(props.isPlaying);
              }}
            />,
            <ListItem
              key="menuItem2"
              primaryText="PhysBall"
              onTouchTap={() => {
                props.addChunk(new PhysBall(
                  props.center.x,
                  props.center.y,
                  circleRadius,
                  new Point(-0.00001, 0),
                  colors.blueStone
                ));
                enterEditMode(props.isPlaying);
              }}
            />,
            <ListItem
              key="menuItem3"
              primaryText="Flying Attractor"
              onTouchTap={() => {
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
          ]}
        />
        <ListItem
          primaryText="Static Chunks"
          leftIcon={<ArrowDropDown />}
          primaryTogglesNestedList={true}
          autoGenerateNestedIndicator={false}
          nestedItems={[
            <ListItem
              key="menuItem4"
              primaryText="Fixed Circle"
              onTouchTap={() => {
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
            <ListItem
              key="menuItem5"
              primaryText="Rectangle"
              onTouchTap={() => {
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
            <ListItem
              key="menuItem6"
              primaryText="Static Attractor"
              onTouchTap={() => {
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
            <ListItem
              key="menuItem7"
              primaryText="Fizzler"
              onTouchTap={() => {
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
            <ListItem
              key="menuItem8"
              primaryText="Crackler"
              onTouchTap={() => {
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
            <ListItem
              key="menuItem9"
              primaryText="Emitter"
              onTouchTap={() => {
                props.addChunk(new Emitter(
                  props.center.x,
                  props.center.y,
                  50
                ));
                enterEditMode(props.isPlaying);
              }}
            />,
            <ListItem
              key="menuItem10"
              primaryText="Drone"
              onTouchTap={() => {
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
            /*<ListItem
              key="menuItem11"
              primaryText="Pendulum"
              onTouchTap={() => {
                props.addChunk(new Pendulum(
                  props.center.x,
                  props.center.y,
                  circleRadius,
                  new Point(0, 0)
                ));
                enterEditMode(props.isPlaying);
              }}
              />*/
            <ListItem
              key="menuItem12"
              primaryText="Rope"
              onTouchTap={() => {
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
        <Divider />
        <ListItem
          leftIcon={<Deselect />}
          primaryText="Clear" // can add capabilities and reset this to WindowSettings
          onTouchTap={() => {
            props.clearAllChunks();
            props.allChunks.forEach(chunk => chunk.path.remove());
            enterEditMode(props.isPlaying);
          }}
        />
        <Divider />
        <ToggleGrid
          toggleGrid={props.toggleGrid}
          displayGrid={props.displayGrid}
        />
      </List>
    </IconMenu>
  </div>);
};

const mapStateToProps = ({ canvas, isPlaying, allChunks, navState }) => {
	return {
		center: canvas.center,
		isPlaying: isPlaying,
    allChunks: allChunks,
    displayGrid: canvas.displayGrid,
    open: navState.rightMenuOpen
	};
};

const mapDispatchToProps = dispatch => {
	return {
		addChunk: (chunk) =>
      dispatch(addChunk(chunk)),
		togglePlay: (isPlaying) =>
      dispatch(togglePlay(isPlaying)),
    clearAllChunks: () =>
      dispatch(clearAllChunks()),
    toggleGrid: () =>
      dispatch(toggleGrid()),
    toggleRightMenu: () =>
      dispatch(toggleRightMenu())
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(RightMenu);
