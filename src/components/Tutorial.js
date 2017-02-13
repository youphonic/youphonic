import {
	Drawer,
  Toolbar,
  MenuItem,
  FontIcon,
  IconMenu,
	Subheader,
  IconButton,
  ToolbarGroup,
	RaisedButton,
  ToolbarTitle,
  ToolbarSeparator,
} from 'material-ui';
import React from 'react';
import { connect } from 'react-redux';

import colors from '../colors';
import DevInfo from './DevInfo';
import TutorialList from './TutorialList';

// tutorial content
import userTuts from '../tutorialAssets/userActionsTut';
import chunkTuts from '../tutorialAssets/chunkTypesTut';

// actions
import { toggleTutorial, toggleDevInfo } from '../redux/navState';

const styles = {
	button: {
		right: 10,
		top: '47vh',
    position: 'absolute'
	},
	helpIcon: {
    right: 25,
    fontSize: 50,
    color: colors.papayaWhip,
	},
  seperator: {
    backgroundColor: 'rgba(18, 94, 104, 0.172549)'
  },
  closeTutButton: {
    boxShadow: 'rgba(18, 94, 104, 0.117647) 0px 1px 6px, rgba(18, 94, 104, 0.117647) 0px 1px 4px'

  }
};

const Tutorial = ({
	toggle,
	toggleInfo,
	devInfoOpenClose,
	tutorialOpenClose
}) => (
	<div>
    <DevInfo open={devInfoOpenClose} toggle={toggleInfo} />
    <IconButton
      tooltip="Tutorial"
      onTouchTap={toggle}
      style={styles.button}
      iconStyle={styles.helpIcon}
      tooltipPosition="bottom-left"
    >
			<FontIcon className="material-icons" >help_outline</FontIcon>
		</IconButton>
    <Drawer
			docked={false}
			openSecondary={true}
			open={tutorialOpenClose}
      width={window.innerWidth * 0.8}
    >
      <Toolbar style={{backgroundColor: 'rgba(0, 0, 0, 0)'}}>
				<ToolbarGroup >
					<ToolbarTitle style={{color: colors.puertoRico}} text="How to Play" />
					<ToolbarSeparator style={styles.seperator} />
					<RaisedButton
						onTouchTap={toggle}
            style={styles.closeTutButton}
						label="I get it, now let me play!"
            labelColor={colors.puertoRico}
            backgroundColor={colors.papayaWhip}
					/>
				</ToolbarGroup>
        <ToolbarGroup>
          <IconMenu
            iconButtonElement={
              <IconButton touch={true} iconStyle={{color: colors.puertoRico}}>
                <FontIcon className="material-icons" >expand_more</FontIcon>
              </IconButton>
            }
          >
            <MenuItem
              onTouchTap={toggleInfo}
              primaryText="About the Developers"
            />
          </IconMenu>
        </ToolbarGroup>
			</Toolbar>
      <Subheader>User Actions</Subheader>
      <TutorialList tutorial={ userTuts } />
      <Subheader>Types of Chunks</Subheader>
			<TutorialList tutorial={ chunkTuts } />
    </Drawer>
  </div>
);

const mapStateToProps = ({ navState: { devInfoOpenClose, tutorialOpenClose } }) => ({
	devInfoOpenClose,
  tutorialOpenClose
});

const mapDispatchToProps = dispatch => ({
  toggle: () =>
    dispatch(toggleTutorial()),
	toggleInfo: () =>
		dispatch(toggleDevInfo())
});

export default connect(mapStateToProps, mapDispatchToProps)(Tutorial);
