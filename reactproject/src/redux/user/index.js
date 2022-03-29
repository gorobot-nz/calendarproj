const defaultState = {
    user: {},
    isAuth: false
}

const SET_USER = 'SET_USER'
const SET_IS_AUTH = 'SET_IS_AUTH'

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

export const setUserAction = (payload) => ({ type: SET_USER, payload })
export const setIsAuthAction = (payload) => ({ type: SET_IS_AUTH, payload })