import { defaultState, SET_IS_VISIBLE, SET_IS_EDIT, SET_INPUT_MODEL } from './index'

export const modalReducer = (state = defaultState, action) => {
    switch (action.type) {
        case SET_IS_VISIBLE:
            return { ...state, isVisible: action.payload }
        case SET_IS_EDIT:
            return { ...state, isEdit: action.payload }
        case SET_INPUT_MODEL:
            return { ...state, inputModel: action.payload }
        default:
            return state
    }
}