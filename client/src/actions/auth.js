import * as actionType from '../constants/actionTypes'
import * as api from '../api'

//Action Creators
export const signin = (formData, history) => async (dispatch) => {
    try {
        const { data } = await api.signIn(formData)
        
        dispatch({
            type: actionType.AUTH,
            data
        })

        history.push('/')
    } catch (error) {
        console.log(error.message)
    }
}

export const signup = (formData, history) => async (dispatch) => {
    try {
        const { data } = await api.signUp(formData)
        
        dispatch({
            type: actionType.AUTH,
            data
        })

        history.push('/')
    } catch (error) {
        console.log(error.message)
    }
}