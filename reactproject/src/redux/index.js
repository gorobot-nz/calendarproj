import { createStore, combineReducers, applyMiddleware } from "redux"
import { calendarReducer } from "./calendar/reducer"
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from "redux-thunk"

const rootReducer = combineReducers({
    calendarReducer,
})

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))