/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import {
  ShareButtons,
  ShareCounts,
  generateShareIcon,
} from 'react-share';

const {
  FacebookShareButton,
  GooglePlusShareButton,
  LinkedinShareButton,
  TwitterShareButton,
} = ShareButtons;

const FacebookIcon = generateShareIcon('facebook');
const TwitterIcon = generateShareIcon('twitter');
const GooglePlusIcon = generateShareIcon('google');
const LinkedinIcon = generateShareIcon('linkedin');

const styles = {
  icons: {
    display: 'inline-block',
    marginRight: 30,
    textAlign: 'center'
  }
};

class ReactShare extends React.Component {
  constructor (props) {
    super(props);
  }

  render() {
    return (
      <div >
        <div style={styles.icons}>
          <FacebookShareButton
            url={this.props.sharedURL}
            title={this.props.title}
            description={'Check out my awesome Youphonic!'}
            picture={this.props.image}>
            <FacebookIcon
              size={32}
              round />
          </FacebookShareButton>
        </div>

        <div style={styles.icons}>
          <TwitterShareButton
            url={this.props.sharedURL}
            title={this.props.title}>
            <TwitterIcon
              size={32}
              round />
          </TwitterShareButton>
        </div>

        <div style={styles.icons}>
          <GooglePlusShareButton
            url={this.props.sharedURL}>
            <GooglePlusIcon
              size={32}
              round />
          </GooglePlusShareButton>
        </div>

        <div style={styles.icons}>
          <LinkedinShareButton
            url={this.props.sharedURL}
            title={this.props.title}
            windowWidth={750}
            windowHeight={600}>
            <LinkedinIcon
              size={32}
              round />
          </LinkedinShareButton>
        </div>
      </div>
    );
  }
}

export default ReactShare;
