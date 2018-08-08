import React from 'react';
import ReactDOM from 'react-dom';
import MainPage from './components/MainPage/MainPage.js'
import registerServiceWorker from './registerServiceWorker';
import Event from './components/Event/Event.js'

ReactDOM.render(
  <MainPage />,
  document.getElementById('root')
)

registerServiceWorker();
