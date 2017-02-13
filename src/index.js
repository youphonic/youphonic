import React from 'react';
import paper from 'paper';
import axios from 'axios';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import store from './store';
import Main from './components/Main';
import { whoami } from './redux/login';
import { loadPlayToStateFromServer } from './paper/saver';


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
        <Route
          path="/"
          component={ Main }
          onEnter={() => store.dispatch(whoami())}
        >
          <Route
            path="/:hash"
            component={ Main }
            onEnter={(nextRouterState) => {
              store.dispatch(whoami());
              fetchSinglePlay(nextRouterState);
            }}
          />
        </Route>
      </Router>
    </Provider>
  </MuiThemeProvider>,
  document.getElementById('app')
);
