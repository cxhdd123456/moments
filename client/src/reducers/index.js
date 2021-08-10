import { combineReducers } from "redux"

import posts from './posts'
import auth from "./auth"

export default combineReducers({
    posts: posts,  // if the key and the value are the same, it can be written as {posts} only
    auth: auth
})