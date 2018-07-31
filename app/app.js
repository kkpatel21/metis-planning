import React from 'react';
import ReactDOM from 'react-dom';
// import reducer from './reducers/index'
import { createStore } from 'redux'
import { Provider } from 'react-redux';
import MainPage from './components/MainPage/MainPage.js'

// let store = createStore(reducer);
// store={store}
ReactDOM.render(
  <Provider store={store}>
    <MainPage />
  </Provider>,
  document.getElementById('root')
)
