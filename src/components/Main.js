import React from 'react';
import ReactDOM from 'react-dom';
import RightMenu from './RightMenu';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import injectTapEventPlugin from 'react-tap-event-plugin';


import AppContainer from '../containers/AppContainer';

injectTapEventPlugin();

const Main = () => (
  <div id="outer-container">
    <MuiThemeProvider>
      <main id="page-wrap">
        <RightMenu />
        <AppContainer />
      </main>
    </MuiThemeProvider>
  </div>
);

export default Main;
