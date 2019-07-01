import * as React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import {
    applyMiddleware,
    compose,
    createStore,
} from 'redux';
import thunk from 'redux-thunk';

import App from './App';
import reducers from './redux/reducers';
import apiMiddleware from './redux/apiMiddleware';

const reduxMiddlewares = [thunk, apiMiddleware];
const enhancers = [applyMiddleware(...reduxMiddlewares)];

if (process.env.NODE_ENV !== 'production' && (window as any).__REDUX_DEVTOOLS_EXTENSION__) {
    enhancers.push((window as any).__REDUX_DEVTOOLS_EXTENSION__());
}

const store = createStore(reducers, compose(...enhancers));

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>,
    document.getElementById('root') as HTMLElement,
);
