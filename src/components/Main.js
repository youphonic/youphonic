import React from 'react';

import AppContainer from '../containers/AppContainer';
import MainCanvas from './MainCanvas';

const Main = () => (
  <div id="outer-container">
    <main id="page-wrap">
      <MainCanvas />
      <AppContainer />
    </main>
  </div>
);

export default Main;
