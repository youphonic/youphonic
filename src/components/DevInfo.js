import React from 'react';
import { FlatButton, Dialog } from 'material-ui';

const DevInfo = ({ open, toggle }) => (
  <Dialog
    title="Develepor Information"
    actions={
      <FlatButton
        label="Close"
        onTouchTap={toggle}
      />
    }
    modal={true}
    open={open}
  >
    Our info goes here . . .
  </Dialog>
);

export default DevInfo;
