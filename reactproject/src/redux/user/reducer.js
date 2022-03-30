import {defaultState, SET_USER, SET_IS_AUTH} from './index'

export const userReducer = (state = defaultState, action) => {
    switch (action.type) {
        case SET_USER:
            return { ...state, user: action.payload }
        case SET_IS_AUTH:
            return { ...state, isAuth: action.payload }
        default:
            return state
    }
}
