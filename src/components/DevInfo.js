import {
  List,
  Paper,
  Dialog,
  FontIcon,
  ListItem,
  FlatButton,
  ToolbarGroup,
  ToolbarSeparator
} from 'material-ui';
import React from 'react';

import colors from '../colors';
import devData from '../developerInfo';

const styles = {
  paper: {
    margin: 5,
    width: '100%',
    display: 'inline-block',
    boxShadow: 'rgba(18, 94, 104, 0.156863) 0px 3px 10px, rgba(18, 94, 104, 0.227451) 0px 3px 10px'
  },
  content: {
    margin: 15,
    padding: 5,
    height: 'inherit',
    textAlign: 'left',
    color: colors.blueStone,
  }
};

const DevData = ({ name, gitHubLink }) => (
  <ListItem
    primaryText={name}
    style={styles.content}
    secondaryText={
      <span>
        <a href={gitHubLink}>{ gitHubLink }</a>
        <FontIcon className="fa fa-github" />
      </span>
    }
  />
);

const devInfo = devData.map(dev =>
  <DevData
    name={dev.name}
    key={dev.gitHubLink}
    gitHubLink={dev.gitHubLink}
  />
);

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
    style={{color: colors.puertoRico}}
  >
    <Paper style={styles.paper} zDepth={2}>
      <List>
        { devInfo }
      </List>
    </Paper>
  </Dialog>
);

export default DevInfo;
