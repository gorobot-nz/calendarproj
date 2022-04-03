import { defaultState, SET_IS_VISIBLE, SET_IS_EDIT } from './index'

export const modalReducer = (state = defaultState, action) => {
    switch (action.type) {
        case SET_IS_VISIBLE:
            return { ...state, isVisible: action.payload }
        case SET_IS_EDIT:
            return { ...state, isEdit: action.payload }
        default:
            return state
    }
}