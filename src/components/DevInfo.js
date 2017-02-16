import {
  List,
  Paper,
  Dialog,
  FontIcon,
  ListItem,
  FlatButton
} from 'material-ui';
import React from 'react';

import colors from '../colors';
import devData from '../developerInfo';

const styles = {
  dev: {
    margin: 5,
    width: '100%',
    display: 'inline-block',
    color: colors.puertoRico,
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

const DevData = ({ name, gitHubLink, image }) => (
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
    image={dev.image}
  />
);

const DevInfo = ({ open, toggle }) => (
  <Dialog
    style={styles.dev}
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
    <List>
      { devInfo }
    </List>
  </Dialog>
);

export default DevInfo;
