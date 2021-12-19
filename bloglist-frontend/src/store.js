import { createStore, combineReducers, applyMiddleware } from 'redux'
import blogsReducer from './reducers/blogsReducer'
import noticeReducer from './reducers/noticeReducer'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import userReducer from './reducers/userReducer'

const reducers = combineReducers({
    showAlert: noticeReducer,
    blogs: blogsReducer,
    user: userReducer
})

export const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)))