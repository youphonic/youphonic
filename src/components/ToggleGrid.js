// used in RightMenu 'Show Grid' menu selection

import React from 'react';
import SvgIcon from 'material-ui/SvgIcon';
import Checkbox from 'material-ui/Checkbox';

const styles = {
  checkbox: {
    marginBottom: 16,
    marginTop: 15,
    display: 'inline-flex'
  }
};

const ToggleGrid = ({displayGrid, toggleGrid}) => {

  return (
    <div style={{paddingLeft: '16px'}}>
      <Checkbox
        checkedIcon={<SvgIcon viewBox="0 0 24 24">
      		<path d="M8 4v1.45l2 2V4h4v4h-3.45l2 2H14v1.45l2 2V10h4v4h-3.45l2 2H20v1.45l2 2V4c0-1.1-.9-2-2-2H4.55l2 2H8zm8 0h4v4h-4V4zM1.27 1.27L0 2.55l2 2V20c0 1.1.9 2 2 2h15.46l2 2 1.27-1.27L1.27 1.27zM10 12.55L11.45 14H10v-1.45zm-6-6L5.45 8H4V6.55zM8 20H4v-4h4v4zm0-6H4v-4h3.45l.55.55V14zm6 6h-4v-4h3.45l.55.54V20zm2 0v-1.46L17.46 20H16z"/>
      	</SvgIcon>}
        uncheckedIcon={
        <SvgIcon viewBox="0 0 24 24">
          <path d="M20 2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM8 20H4v-4h4v4zm0-6H4v-4h4v4zm0-6H4V4h4v4zm6 12h-4v-4h4v4zm0-6h-4v-4h4v4zm0-6h-4V4h4v4zm6 12h-4v-4h4v4zm0-6h-4v-4h4v4zm0-6h-4V4h4v4z"/>
        </SvgIcon>}
        style={styles.checkbox}
        label={displayGrid ? 'Disable Grid' : 'Enable Grid'}
        checked={displayGrid}
        onCheck={toggleGrid}
      />
    </div>
  );
};

export default ToggleGrid;
