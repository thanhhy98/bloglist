import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './style.css'
import { store } from './store'
import { Provider } from 'react-redux'
import {BrowserRouter} from 'react-router-dom'
console.log(store.getState())
ReactDOM.render(
<BrowserRouter>
<Provider store={store}>
<App />
</Provider>
</BrowserRouter>
, document.getElementById('root'))