import { SET_DAY, SET_DAYS, SET_MONTH, SET_CHALLENGES } from './index'
import { getDocs, query, where } from 'firebase/firestore'


export const SetDaysAction = (payload) => ({ type: SET_DAYS, payload })
export const SetDayAction = (payload) => ({ type: SET_DAY, payload })
export const SetMonthAction = (payload) => ({ type: SET_MONTH, payload })
export const SetChallengesAction = (payload) => ({ type: SET_CHALLENGES, payload })

export const fetchChallenges = (collectionRef, userId, month) => {
    return async function (dispatch) {
        const q = query(collectionRef, where(`userId`, '==', userId), where('month', '==', month))
        const t = await getDocs(q)
        dispatch(SetChallengesAction(t.docs.map(doc => ({ ...doc.data(), id: doc.id }))))
    }
}