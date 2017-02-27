import React from 'react';
import { connect } from 'react-redux';
import { FloatingActionButton, FontIcon } from 'material-ui';
import SocialShare from 'material-ui/svg-icons/social/share';
import CommEmail from 'material-ui/svg-icons/communication/email';

//https://www.npmjs.com/package/react-copy-to-clipboard
import CopyToClipboard from 'react-copy-to-clipboard';
import colors from '../colors';
import { shareCopiedOpen, shareCopiedClose } from '../redux/navState';


const ReactShare = ({
  sharedURL,
  shareCopiedOpen,
  shareCopiedClose
}) => (
  <div style={{display: 'inline-flex'}}>
		<div style={{margin: '8px'}}>
      <a href={`mailto:someone@yoursite.com?subject=Check%20out%20my%20awesome%20new%20youphonic!&body=Check%20out%20my%20new%20youphonic!%20http://www.${sharedURL}`}>
          <FloatingActionButton backgroundColor={colors.smokeOnTheWater}>
               <CommEmail />
          </FloatingActionButton>
      </a>
		</div>

		<div style={{margin: '8px'}}>
			<a href={`https://twitter.com/intent/tweet?text=Check%20out%20my%20awesome%20new%20youphonic!%20${sharedURL}`}>
				<FloatingActionButton backgroundColor={colors.smokeOnTheWater}>
						 <FontIcon className="fa fa-twitter" />
				</FloatingActionButton>
			</a>
		</div>

		<div style={{margin: '8px'}}>
		 <CopyToClipboard
			text={'Check out my awesome youphonic play! http://www.' + sharedURL}
			onCopy={() => {
				shareCopiedOpen();
				setTimeout(shareCopiedClose, 4000);
			}}
    >
			<FloatingActionButton backgroundColor={colors.smokeOnTheWater}>
					 <SocialShare />
			</FloatingActionButton>
		 </CopyToClipboard>
		</div>
  </div>
);

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => ({
  shareCopiedOpen: () => dispatch(shareCopiedOpen()),
	shareCopiedClose: () => dispatch(shareCopiedClose())
});

export default connect(mapStateToProps, mapDispatchToProps)(ReactShare);
