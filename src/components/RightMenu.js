import React from 'react';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

export default function RightMenu () {
  return (<div style={{float: 'right'}}>
    <IconMenu
      iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
      anchorOrigin={{horizontal: 'right', vertical: 'top'}}
      targetOrigin={{horizontal: 'right', vertical: 'top'}}
    >
      <MenuItem primaryText="Circle" />
      <MenuItem primaryText="Square" />
      <MenuItem primaryText="Triangle" />
      <MenuItem primaryText="Start" />
      <MenuItem primaryText="Stop" />
      <MenuItem primaryText="Share" />
    </IconMenu>
  </div>);
}
