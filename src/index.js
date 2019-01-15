/*global chrome*/

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

let searchVal = '';

chrome.runtime.sendMessage({msg: 'give me searchValue pls'}, function(response){
    document.getElementById('searchbar').value = response.searchVal
    document.getElementById('searchbar').dispatchEvent(new Event('change'))
})

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();