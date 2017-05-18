import React from 'react';
import { DropDownMenu, MenuItem } from 'material-ui';
import Deselect from 'material-ui/svg-icons/notification/do-not-disturb-alt';

// Instrument Icons
import kickIcon from '../../public/icons/kick.svg.jsx';
import cowbellIcon from '../../public/icons/cowbell.svg.jsx';
import snareIcon from '../../public/icons/snare.svg.jsx';
import floorTomIcon from '../../public/icons/floor-tom.svg.jsx';
import hiHatIcon from '../../public/icons/hi-hat.svg.jsx';
// import synthIcon from '../../public/icons/keyboard.svg.jsx';

// Instrument Sounds
import { player, drumBuffers } from '../tone/drums';

const styles = {
  instMenu: {
    marginTop: 15,
    marginBottom: 0,
    display: 'inline-flex'
  }
};

const DrumsDropdownSettings = ({
  drum,
  changeDrum
}) => {
  return (
    <DropDownMenu
      value={drum}
      onChange={changeDrum}
      style={styles.instMenu}
    >
      <MenuItem
        primaryText="No Drum"
        leftIcon={<Deselect />}
      />
      <MenuItem
        value="kick"
        primaryText="Kick"
        leftIcon={kickIcon}
        onTouchTap={() => {
          player.buffer = drumBuffers.get('kick');
          player.start();
        }}
      />
      <MenuItem
        value="snare"
        primaryText="Snare"
        leftIcon={snareIcon}
        onTouchTap={() => {
          player.buffer = drumBuffers.get('snare');
          player.start();
        }}
      />
      <MenuItem
        value="floorTom"
        primaryText="Floor Tom"
        leftIcon={floorTomIcon}
        onTouchTap={() => {
          player.buffer = drumBuffers.get('floorTom');
          player.start();
        }}
      />
      <MenuItem
        value="hiHatClose"
        primaryText="Hi Hat Close"
        leftIcon={hiHatIcon}
        onTouchTap={() => {
          player.buffer = drumBuffers.get('hiHatClose');
          player.start();
        }}
      />
      <MenuItem
        value="cowBell"
        primaryText="Cowbell"
        leftIcon={cowbellIcon}
        onTouchTap={() => {
          player.buffer = drumBuffers.get('cowBell');
          player.start();
        }}
      />
    </DropDownMenu>
  );
};

export default DrumsDropdownSettings;
