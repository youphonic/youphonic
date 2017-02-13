import React from 'react';

const styles = {
  listStyle: {paddingLeft: 0, listStyle: 'none'}
};

const chunkTypesTut = [{
  title: 'Creating and Placing Chunks',
  text:
  <ul style={styles.listStyle}>
    <li>- Open the top right menu to select and place a Chunk.</li>
    <li>- Click and drag the Chunk body to move it around.</li>
    <li>- Click and drag the red arrow to set the direction and speed.</li>
  </ul>,
  videoSrc: './chunkVideos/placeChunk.mp4'
},
{
  title: 'Adjusting a Chunk\'s Musical Settings',
  text:
    <ul style={styles.listStyle}>
      <li>- Double click a Chunk to open up the settings panel.</li>
      <li>- You can mute the sound, adjust the pitch, change the drum sound, and change the rotation on rectangles.</li>
    </ul>,
  videoSrc: './chunkVideos/shapeSettings.mp4'
},
{
  title: 'Enable Grid Mode or Clear the Playground',
  text:
    <ul style={styles.listStyle}>
      <li>- In the upper-right menu, click 'Clear' to delete all the Chunks from the playground</li>
      <li>- Click the 'Enable/Disable' button to toggle a grid on/off for easier Chunk placement.</li>
    </ul>,
  videoSrc: './chunkVideos/gridAndClear.mp4'
},
{
  title: 'Play or Reset',
  text:
    <ul style={styles.listStyle}>
      <li>- Click the bottom-left button</li>
    </ul>,
  videoSrc: './chunkVideos/playAndPause.mp4'
},
{
  title: 'Clone a Chunk',
  text:
    <ul style={styles.listStyle}>
      <li>- Option/alt + click and drag a Chunk to create a clone.</li>
    </ul>,
  videoSrc: './chunkVideos/cloneChunk.mp4'
}];

export default chunkTypesTut;
