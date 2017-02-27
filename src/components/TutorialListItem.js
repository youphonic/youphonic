import {
  Paper,
  GridTile
} from 'material-ui';
import React from 'react';
import colors from '../colors';

const styles = {
  paper: {
    margin: 5,
    width: '100%',
    textAlign: 'center',
    display: 'inline-block',
    boxShadow: 'rgba(18, 94, 104, 0.156863) 0px 3px 10px, rgba(18, 94, 104, 0.227451) 0px 3px 10px'
  },
  paperVid: {
    margin: 15,
    textAlign: 'center',
    float: 'left',
    backgroundColor: colors.puertoRico,
    boxShadow: 'rgba(18, 94, 104, 0.117647) 0px 1px 6px, rgba(18, 94, 104, 0.117647) 0px 1px 4px'
  },
  video: {
    display: 'flex',
    overflowX: 'auto',
    maxWidth: '200px'
  },
  tut: {
    margin: 15,
    padding: 5,
    height: 'inherit',
    textAlign: 'left',
    color: colors.blueStone,
  }
};

const TutorialListItem = ({ videoSrc, title, text }) => (
  <div>
    <Paper style={styles.paper} zDepth={2}>
      <GridTile>
        <Paper style={styles.paperVid}>
          <video
            loop="true"
            muted="false"
            src={videoSrc}
            autoPlay="true"
            style={styles.video}
          />
        </Paper>
        <GridTile style={styles.tut}>
          <h3 style={{marginTop: 'auto'}}>{title}</h3>
          <div>{text}</div>
        </GridTile>
      </GridTile>
    </Paper>
  </div>
);

export default TutorialListItem;
