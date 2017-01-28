import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import store from './store';
import Main from './components/Main';

render(
  <MuiThemeProvider>
    <Provider store={ store }>
      <Main />
    </Provider>
  </MuiThemeProvider>,
  document.getElementById('app')
);
