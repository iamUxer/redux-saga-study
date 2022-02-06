import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import 'antd/dist/antd.css';
import { Provider } from 'react-redux';
import { applyMiddleware, compose, createStore } from 'redux';
import rootReducer from './reducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootSaga from './saga';
import createSagaMiddleware from 'redux-saga';

const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];

const enhancer =
  process.env.NODE_ENV === 'production'
    ? compose(applyMiddleware(...middleware))
    : composeWithDevTools(applyMiddleware(...middleware));

const store = createStore(rootReducer, enhancer);
sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
