import React from 'react';
import ReactDOM from 'react-dom';
import MainPage from './components/MainPage/MainPage.js'
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <MainPage />,
  document.getElementById('root')
)

registerServiceWorker();
