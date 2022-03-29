import { createStore, combineReducers, applyMiddleware } from "redux"
import { userReducer } from './user/index'
import thunk from "redux-thunk"

const rootReducer = combineReducers({
    userReducer,
})

export const store = createStore(rootReducer, applyMiddleware(thunk))