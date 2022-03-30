import { defaultState, SET_CURRENT_MONTH } from './index'

export const calendarReducer = (state = defaultState, action) => {
    switch (action.type) {
        case SET_CURRENT_MONTH:
            return { ...state, currentMonth: action.payload }
        default:
            return state
    }
}