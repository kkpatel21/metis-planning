import React from 'react';
import ReactDOM from 'react-dom';
// import reducer from './reducers/index'
import MainPage from './components/MainPage/MainPage.js'

// let store = createStore(reducer);
// store={store}
ReactDOM.render(
<<<<<<< HEAD
  <MainPage />,
=======
  <Provider store={store}>
    <MainPage />
  </Provider>,
>>>>>>> 50f242a4b21ed31ed65ffdfafddba61a5da31027
  document.getElementById('root')
)
