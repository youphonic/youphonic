import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';

import rootReducer from './redux/root-reducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const middlewares = [thunkMiddleware];

// If not in testing mode
if (typeof global.it !== 'function') {
  middlewares.push(createLogger({collapsed: true}));
}

export default createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(...middlewares)
  )
);
