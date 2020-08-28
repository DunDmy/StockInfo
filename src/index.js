//React related Libraries
import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import * as serviceWorker from './serviceWorker';


//App Specific
import App from './App';
import './CSS/index.css';
import { allReducers } from './Reducers/MasterReducer.js';

//Creates store
const store = createStore(allReducers, applyMiddleware(thunk));

//console.log("GLOBAL");
//console.log(store);

//Connects store to App
ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>, document.getElementById('root'));
//registerServiceWorker();


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
