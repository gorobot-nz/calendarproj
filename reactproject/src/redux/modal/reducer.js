import { defaultState, SET_IS_VISIBLE } from './index'

export const modalReducer = (state = defaultState, action) => {
    switch (action.type) {
        case SET_IS_VISIBLE:
            return { ...state, isVisible: action.payload }
        default:
            return state
    }
}