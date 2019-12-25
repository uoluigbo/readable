import { combineReducers } from 'redux'
import { loadingBarReducer } from 'react-redux-loading-bar'
import posts from '../reducers/posts'
import categories from '../reducers/categories'
import comments from '../reducers/comments'

export default combineReducers({
    categories,
    posts,
    comments,
    loadingBar: loadingBarReducer
})