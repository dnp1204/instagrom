import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore, compose } from 'redux';
import reduxThunk from 'redux-thunk';
import reducers from './reducers';
import App from './components/App';
import './styles/css/index.css';
import '../node_modules/font-awesome/css/font-awesome.min.css';

const store = createStore(reducers, {}, compose(applyMiddleware(reduxThunk)));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, document.getElementById('root')
);