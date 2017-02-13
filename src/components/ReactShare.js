/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';

import { FloatingActionButton, SnackBar, FontIcon } from 'material-ui';
import CommEmail from 'material-ui/svg-icons/communication/email';
import SocialShare from 'material-ui/svg-icons/social/share';

//https://www.npmjs.com/package/react-copy-to-clipboard
import CopyToClipboard from 'react-copy-to-clipboard';
import { shareCopiedOpen, shareCopiedClose } from '../redux/navState';
import { connect } from 'react-redux';


const styles = {
  buttonDiv: {
    display: 'inline-block',
    marginRight: 15,
    marginLeft: 15,
    textAlign: 'center'
  	},
     icon: {
      size: 35
     }
};


class ReactShare extends React.Component {
  constructor (props) {
    super(props);
  }

  render() {
    return (
      <div>
				<div style={styles.buttonDiv}>
           <a href={`mailto:someone@yoursite.com?subject=Check%20out%20my%20awesome%20new%20youphonic!&body=Check%20out%20my%20new%20youphonic!%20http://www.${this.props.sharedURL}`}>
              <FloatingActionButton>
                   <CommEmail />
              </FloatingActionButton>
           </a>
				</div>

				<div style={styles.buttonDiv}>
					<a
					  href={`https://twitter.com/intent/tweet?text=Check%20out%20my%20awesome%20new%20youphonic!%20${this.props.sharedURL}`}>
						<FloatingActionButton>
								 <FontIcon className="fa fa-twitter" />
						</FloatingActionButton>
					</a>
				</div>

				<div style={styles.buttonDiv}>
						 <CopyToClipboard
								text={'Check out my awesome youphonic play! http://www.' + this.props.sharedURL}
								onCopy={() =>{
									this.props.shareCopiedOpen()
									setTimeout(this.props.shareCopiedClose, 4000)
								}}>
								<FloatingActionButton>
										 <SocialShare />
								</FloatingActionButton>
						 </CopyToClipboard>
				</div>

      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    //open: state.navState.shareCopiedOpen
  };
};

const mapDispatchToProps = dispatch => {
  return {
    shareCopiedOpen: () => {
      dispatch(shareCopiedOpen());
    },
		shareCopiedClose: () => {
      dispatch(shareCopiedClose());
    },

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ReactShare);
