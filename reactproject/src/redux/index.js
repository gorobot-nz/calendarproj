import { createStore, combineReducers, applyMiddleware } from "redux"
import { userReducer } from './user/reducer'
import { calendarReducer } from "./calendar/reducer"
import thunk from "redux-thunk"

const rootReducer = combineReducers({
    userReducer,
    calendarReducer,
})

export const store = createStore(rootReducer, applyMiddleware(thunk))