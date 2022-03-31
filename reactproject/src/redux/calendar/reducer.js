import { defaultState, SET_DAYS, SET_MONTH, SET_DAY } from './index'

export const calendarReducer = (state = defaultState, action) => {
    switch (action.type) {
        case SET_DAYS:
            return { ...state, days: action.payload }
        case SET_DAY:
            const [m, d, y] = action.payload.split('-')
            return { ...state, selectedDay: d, selectedMonth: m, selectedYear: y }
        case SET_MONTH:
            const [month, year] = action.payload.split('-')
            return { ...state, selectedeDay: null, selectedMonth: month, selectedYear: year }
        default:
            return state
    }
}