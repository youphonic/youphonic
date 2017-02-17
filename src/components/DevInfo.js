import {
  Paper,
  Dialog,
  GridList,
  GridTile,
  IconButton,
  FlatButton
} from 'material-ui';
import React from 'react';

import colors from '../colors';
import devData from '../developerInfo';


const styles = {
  root: {
    overflow: 'visible'
  },
  list: {
    paddingRight: 10,
    overflow: 'visible'
  },
  paper: {
    margin: 5,
    width: '100%',
    textAlign: 'left',
    overflow: 'visible',
    display: 'inline-block',
    boxShadow: 'rgba(18, 94, 104, 0.156863) 0px 3px 10px, rgba(18, 94, 104, 0.227451) 0px 3px 10px'
  },
  headShotImage: {
    margin: 25,
    float: 'left',
    textAlign: 'center',
    backgroundColor: colors.smokeOnTheWater,
    boxShadow: 'rgba(18, 94, 104, 0.117647) 0px 1px 6px, rgba(18, 94, 104, 0.117647) 0px 1px 4px'
  },
  image: {
    margin: 'auto',
    display: 'flex'
  },
  content: {
    width: 'auto',
    height: 'inherit',
    overflow: 'visible',
    color: colors.blueStone,
  },
  icon: {
    fontSize: 36,
    color: colors.smokeOnTheWater
  },
  toolTip: {
    fontSize: 15,
    color: colors.puertoRico
  }
};


const DevData = ({
  name,
  image,
  gitHubLink,
  linkedinLink,
  personalSite
}) => (
  <div>
    <Paper style={styles.paper} zDepth={2}>
      <GridTile rows={1}>

        <Paper style={styles.headShotImage}>
          <img
            src={image}
            alt={name}
            height="138"
            style={styles.image}
          />
        </Paper>

        <GridTile style={styles.content}>
          <h3 style={{marginTop: '8%'}}>{name}</h3>
          <div>
            <IconButton
              target="_blank"
              href={gitHubLink}
              iconStyle={styles.icon}
              tooltipStyles={styles.toolTip}
              tooltipPosition="bottom-right"
              iconClassName="fa fa-github-square"
              tooltip={`${name.split(' ')[0]}'s Github`}
            />
            <IconButton
              target="_blank"
              href={linkedinLink}
              iconStyle={styles.icon}
              tooltipStyles={styles.toolTip}
              tooltipPosition="bottom-center"
              iconClassName="fa fa-linkedin-square"
              tooltip={`${name.split(' ')[0]}'s Linkedin`}
            />
            {
              personalSite &&
              <IconButton
                target="_blank"
                href={personalSite}
                iconStyle={styles.icon}
                tooltipPosition="bottom-left"
                tooltipStyles={styles.toolTip}
                iconClassName="fa fa-external-link-square"
                tooltip={`${name.split(' ')[0]}'s Personal Site`}
              />
            }
          </div>
        </GridTile>

      </GridTile>
    </Paper>
  </div>
);


const DevInfo = ({ open, toggle }) => {

  const devInfo = devData.map(dev =>
    <DevData
      name={dev.name}
      image={dev.image}
      key={dev.gitHubLink}
      gitHubLink={dev.gitHubLink}
      personalSite={dev.personalSite}
      linkedinLink={dev.linkedinLink}
    />
  );

  return (
    <Dialog
      open={open}
      style={styles.root}
      title="Developer Information"
      titleStyle={{color: colors.puertoRico}}
      actions={ <FlatButton label="Close" onTouchTap={toggle} /> }
    >
      <GridList
        cols={2}
        padding={10}
        cellHeight="auto"
        style={styles.list}
      >
        { devInfo }
      </GridList>
    </Dialog>
  );
};

export default DevInfo;
