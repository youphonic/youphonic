import React from 'react';
import { GridList } from 'material-ui';

import colors from '../colors';
import TutorialListItem from './TutorialListItem';

const tutorials = [{
  title: 'Moving Circle or Particle',
  text: ` - Add a bouncing ball. Click pause to set its tone and add a drum beat. While paused, you drag it to a new position, and use the red arrow to set its direction and speed. Particle is the Moving Circle's tiny twin`,
  videoSrc: '/chunkVideos/moving_circle.mp4'
},
{
  title: 'Fixed Circle',
  text: ` - The Moving Circle’s stationery cousin. Has musical qualities you can set but no speed or direction.`,
  videoSrc: './chunkVideos/fixed_circle.mp4'
},
{
  title: 'Rectangle',
  text: ` - Four sides, four qualities: Use the lower right settings to enable/disable sound, give it a note, a beat, even give it a spin with rotation setting.`,
  videoSrc: './chunkVideos/rectangle.mp4'
},
{
  title: 'PhysBall',
  text: ` - A sphere that is pulled to the bottom of the playing field by gravity - also with musical, speed, or direction settings`,
  videoSrc: './chunkVideos/physball.mp4'
},
{
  title: 'Static Attractor',
  text: ` - Think of tiny planet that attracts other chunks into its orbit. Can take a musical note and/or drum beat.`,
  videoSrc: './chunkVideos/static_attractor.mp4'
},
{
  title: 'Flying Attractor',
  text: ` - Static Attractor's flying cousin.`,
  videoSrc: './chunkVideos/flying_attractor.mp4'
},
{
  title: 'Fizzler/Crackler',
  text: ` - Fizzlers and Cracklers emit particles and small crackly sounds that bounce off nearby shapes. Think high tech maraca.`,
  videoSrc: './chunkVideos/fizzler_crackler.mp4'
},
{
  title: 'Emitter',
  text: ` - Emitters are cubes that shoot droplets that trigger the sounds of shapes whose paths they cross`,
  videoSrc: './chunkVideos/emitter.mp4'
},
{
  title: 'Drone',
  text: ` - Drone tones are triggered, and toggled, when they collide with other shapes. Set their musical tones in the settings menu`,
  videoSrc: './chunkVideos/drone.mp4'
},
{
  title: 'Rope',
  text: ` - Ropes mimic a violin or guitar string. They get plucked or strummed when a shape passes over them
`,
  videoSrc: './chunkVideos/rope.mp4'
}];

const styles = {
  root: {
    padding: 10,
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around'
  }
};

const tutorialItems = tutorials.map((item) => {
  return (
    <TutorialListItem
      key={item.title}
      videoSrc={item.videoSrc}
      text={item.text}
      title={item.title}
    />
  );
});

const TutorialList = () => (
  <div style={styles.root}>
    <GridList
      cols={1}
      padding={5}
      cellHeight="auto"
    >
      {tutorialItems}
    </GridList>
  </div>
);

export default TutorialList;
