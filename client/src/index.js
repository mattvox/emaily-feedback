import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import promise from 'redux-promise'
import thunk from 'redux-thunk'

import App from './components/App'
import reducers from './reducers'

import 'materialize-css/dist/css/materialize.min.css'
import './css/index.css'

// import registerServiceWorker from './registerServiceWorker'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(reducers, /*preloadedState,*/ composeEnhancers(
  applyMiddleware(promise, thunk),
));

render(
  <Provider store={store}>
    <App />
  </Provider>
  , document.getElementById('root')
)

// registerServiceWorker()
