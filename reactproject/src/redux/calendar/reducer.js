import { defaultState, SET_DAYS, SET_MONTH, SET_DAY, SET_CHALLENGES, SET_IS_LOADING } from './index'

export const calendarReducer = (state = defaultState, action) => {
    switch (action.type) {
        case SET_DAYS:
            return { ...state, days: action.payload }
        case SET_DAY:
            return { ...state, selectedDay: action.payload }
        case SET_CHALLENGES:
            return { ...state, challenges: action.payload }
        case SET_MONTH:
            return { ...state, selectedMonth: action.payload }
        case SET_IS_LOADING:
            return { ...state, isLoading: action.payload }
        default:
            return state
    }
}