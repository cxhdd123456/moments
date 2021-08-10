import * as actionType from '../constants/actionTypes'
import * as api from '../api'

//Action Creators
export const getPost = (id) => async (dispatch) => {
    try {
        dispatch({ type: actionType.START_LOADING })

        const { data } = await api.fetchPost(id)

        dispatch({
            type: actionType.FETCH_POST,
            payload: data
        })

        dispatch({ type: actionType.END_LOADING })
    } catch (error) {
        console.log(error.message)
    }
}

export const getPosts = (page) => async (dispatch) => {
    try {
        dispatch({ type: actionType.START_LOADING })

        const { data } = await api.fetchPosts(page)

        dispatch({
            type: actionType.FETCH_ALL,
            payload: data
        })

        dispatch({ type: actionType.END_LOADING })
    } catch (error) {
        console.log(error.message)
    }
}

export const getPostsBySearch = (searchQuery) => async (dispatch) => {
    try {
        dispatch({ type: actionType.START_LOADING })

        const { data: { data } } = await api.fetchPostsBySearch(searchQuery)
        
        dispatch({
            type: actionType.FETCH_BY_SEARCH,
            payload: data
        })
        
        dispatch({ type: actionType.END_LOADING })
    } catch (error) {
        console.log(error.message)
    }
}

export const createPost = (post, history) => async (dispatch) => {
    try {
        dispatch({ type: actionType.START_LOADING })

        const { data } = await api.createPost(post)

        dispatch({
            type: actionType.CREATE,
            payload: data
        })

        history.push(`/posts/${data._id}`);
    } catch (error) {
        console.log(error.message)
    }
}

export const updatePost = (id, post) => async (dispatch) => {
    try {
        const { data } = await api.updatePost(id, post)

        dispatch({
            type: actionType.UPDATE,
            payload: data
        })
    } catch (error) {
        console.log(error.message)
    }
}

export const deletePost = (id) => async (dispatch) => {
    try {
        await api.deletePost(id)

        dispatch({
            type: actionType.DELETE,
            payload: id
        })
    } catch (error) {
        console.log(error.message)
    }
}

export const likePost = (id) => async (dispatch) => {
    try {
        const { data } = await api.likePost(id)

        dispatch({
            type: actionType.LIKE,
            payload: data
        })
    } catch (error) {
        console.log(error.message)
    }
}

export const commentPost = (value, id) => async (dispatch) => {
    try {
        const { data } = await api.comment(value, id)

        dispatch({
            type: actionType.COMMENT,
            payload: data
        })

        return data.comments
    } catch (error) {
        console.log(error.message)
    }
}