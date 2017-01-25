import React from 'react';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import RightMenu from './RightMenu';

export default class DrawerOpenRightExample extends React.Component {

  constructor(props) {
    super(props);
    this.state = {open: false};
    this.handleToggle = this.handleToggle.bind(this);
  }

  handleToggle () {
    this.setState({open: !this.state.open});
  }

  render() {
    return (
      <div>
        <RaisedButton
          label="Toggle Drawer"
          onTouchTap={this.handleToggle}
        />
        <Drawer width={200} openSecondary={true} open={this.state.open} >
          <RightMenu />
        </Drawer>
      </div>
    );
  }
}
