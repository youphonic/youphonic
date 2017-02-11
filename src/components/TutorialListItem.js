import React from 'react';

const styles = {
  block: {
    width: 1005
  },
  image: {
    width: 300,
    marginRight: 18
  },
  button: {
    marginTop: 18
  },
  video: {
    maxWidth: '200px'
  }
}

export default (props) => {
  const videoSrc = props.videoSrc;

  return (
    <li className="list-group-item" style={styles.block}>
      <div className="video-list media">
        <div className="media-left" >
          <video autoPlay="true" muted="false" style={styles.video} loop="true" src={videoSrc}/>
        </div>
        <div className="media-body">
          <h3>{props.title}</h3>
          <div className="media-heading">{props.text}</div>
        </div>
      </div>
    </li>
  );
}