import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom'
import {Provider} from 'react-redux'
import {createStore, applyMiddleware, compose, combineReducers} from 'redux'
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import burgerBuildReducer from "./store/reducer/burgerBuildReducer";
import orderReducer from "./store/reducer/orderReducer";
import thunk from "redux-thunk";
import authReducer from "./store/reducer/authReducer";

const rootReducer = combineReducers({
    burgerBuilder: burgerBuildReducer,
    order: orderReducer,
    auth: authReducer
})

//const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;

//const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))
const store = createStore(rootReducer, applyMiddleware(thunk))

const MyApp = (
    <Provider store={store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>
);

ReactDOM.render(MyApp, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
