import React from 'react';
import { GridList } from 'material-ui';

import TutorialListItem from './TutorialListItem';

const styles = {
  root: {
    padding: 10,
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around'
  }
};


const TutorialList = ({ tutorial }) => {
  const tutorialItems = tutorial.map((item) => {
    return (
      <TutorialListItem
        key={item.title}
        videoSrc={item.videoSrc}
        text={item.text}
        title={item.title}
      />
    );
  });

  return (
    <div style={styles.root}>
      <GridList cols={2} padding={5} cellHeight="auto">
        {tutorialItems}
      </GridList>
    </div>
  );
};

export default TutorialList;
