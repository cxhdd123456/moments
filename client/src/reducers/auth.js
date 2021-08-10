import * as actionType from '../constants/actionTypes'

export default (state = { authData: null }, action) => {
    switch (action.type) {
        case actionType.AUTH:
            localStorage.setItem('profile', JSON.stringify({ ...action.data }))

            return { ...state, authData: action.data}
        case actionType.LOGOUT:
            localStorage.clear()

            return { ...state, authData: null}
        default:
            return state
    }
}