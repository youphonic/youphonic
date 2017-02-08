import React from 'react';
import paper from 'paper';
import axios from 'axios';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import store from './store';
import Main from './components/Main';

import { loadPlayToStateFromServer } from './paper/saver';
import { clearAllChunks } from './redux/allChunks';

export const fetchSinglePlay = (nextRouterState) => {
  let hash = nextRouterState.params.hash;
  axios.get(`/api/plays/${hash}`)
    .then(res => res.data)
    .then(play => {
      // load play if it exists or redirect to index
      if (play) loadPlayToStateFromServer(play);
      else browserHistory.push('/');
    });
};

paper.install(window);

render(
  <MuiThemeProvider>
    <Provider store={ store }>
      <Router history={ browserHistory }>
        <Route path="/" component={ Main } >
          <Route path="/:hash" component={ Main } onEnter={ fetchSinglePlay } />
        </Route>
      </Router>
    </Provider>
  </MuiThemeProvider>,
  document.getElementById('app')
);
