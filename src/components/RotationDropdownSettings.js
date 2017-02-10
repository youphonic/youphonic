import React from 'react';
import { DropDownMenu, MenuItem } from 'material-ui';

const styles = {
  instMenu: {
    marginTop: 15,
    marginBottom: 0,
    display: 'inline-flex'
  }
};

const RotationDropdownSettings = ({
  rotation,
  changeRotation
}) => {
  return (
    <DropDownMenu
      style={styles.instMenu}
      value={rotation}
      onChange={changeRotation}
    >
      <MenuItem value="0" primaryText="0" />
      <MenuItem value="30" primaryText="30" />
      <MenuItem value="45" primaryText="45" />
      <MenuItem value="60" primaryText="60" />
      <MenuItem value="90" primaryText="90" />
    </DropDownMenu>
  );
};

export default RotationDropdownSettings;
