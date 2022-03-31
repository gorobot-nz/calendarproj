import axios from 'axios'
import { SET_DAY, SET_DAYS, SET_MONTH } from './index'

export const SetDaysAction = (payload) => ({ type: SET_DAYS, payload })
export const SetDayAction = (payload) => ({ type: SET_DAY, payload })
export const SetMonthAction = (payload) => ({ type: SET_MONTH, payload })

export const FetchChallengesAction = (username, date) => {
    return async function (dispatch) {

    }
}