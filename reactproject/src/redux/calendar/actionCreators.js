import { SET_DAY, SET_DAYS, SET_MONTH, SET_CHALLENGES } from './index'

export const SetDaysAction = (payload) => ({ type: SET_DAYS, payload })
export const SetDayAction = (payload) => ({ type: SET_DAY, payload })
export const SetMonthAction = (payload) => ({ type: SET_MONTH, payload })
export const SetChallengesAction = (payload) => ({ type: SET_CHALLENGES, payload })
