import { getAllPosts, getCategoryPosts, getPost, addPost, editPost, updatePostVote, deletePost} from '../utils/ReadableApi'
import { showLoading, hideLoading } from 'react-redux-loading-bar'

export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const RECEIVE_POST = 'RECEIVE_POST'
export const MODIFY_POST = 'MODIFY_POST'
export const UPDATE_VOTE = 'UPDATE_VOTE'
export const ADD_POST = 'ADD_POST'
export const DELETE_POST = 'DELETE_POST'
export const RECEIVE_CATEGORY_POSTS = 'RECEIVE_CATEGORY_POSTS'

function createPost(post) {
    return {
        type: ADD_POST,
        post
    }
}


export function receiveCategoryPosts(id, posts) {
    return {
        type: RECEIVE_CATEGORY_POSTS,
        id,
        posts
    }
}

function receivePosts(posts) {
    return {
        type: RECEIVE_POSTS,
        posts
    }
}

function receivePost(post) {
    return {
        type: RECEIVE_POST,
        post
    }
}

function modifyPostVote(postId, voteScore) {
    return {
        type: UPDATE_VOTE,
        postId,
        voteScore
    }
}

function modifyPost(postId, body, title) {
    return {
        type: MODIFY_POST,
        postId,
        body,
        title
    }
}

function removePost(postId) {
    return {
        type: DELETE_POST,
        postId
    }
}

export function handleReceiveCategoryPosts(categoryId) {
    return (dispatch) => {
        dispatch(showLoading())

        return getCategoryPosts(categoryId)
            .then((posts) => {
                dispatch(receiveCategoryPosts(categoryId, posts))
                dispatch(hideLoading())
            })
            
    }
}

export function handleReceivePosts() {
    return (dispatch) => {
        //dispatch(showLoading())

        return getAllPosts()
            .then((posts) => {
                dispatch(receivePosts(posts))
                //dispatch(hideLoading())
            })
            
    }
}

export function handleReceivePost(postId) {
    return (dispatch) => {
        dispatch(showLoading())

        return getPost(postId)
            .then((post) => {
                dispatch(receivePost(post))
                dispatch(hideLoading())
            })
            
    }
}

export function handleAddPost(post) {
    return (dispatch) => {
        dispatch(showLoading())

        return addPost(post)
            .then((post) => {
                dispatch(createPost(post))
                dispatch(hideLoading())
            })
            
    }
}

export function handleUpdatePostVote(postId, vote) {
    return (dispatch) => {
        dispatch(showLoading())

        return updatePostVote(postId, {option: vote})
            .then((post) => {
                dispatch(modifyPostVote(postId, post.voteScore))
                dispatch(hideLoading())
            })
            
    }
}

export function handleModifyPost(postId, params) {
    return (dispatch) => {
        dispatch(showLoading())

        return editPost(postId, params)
            .then((post) => {
                dispatch(modifyPost(postId, post.body, post.title))
                dispatch(hideLoading())
            })
            
    }
}

export function handleDeletePost(postId) {
    return (dispatch) => {
        dispatch(showLoading())

        return deletePost(postId)
            .then((post) => {
                dispatch(removePost (postId))
                dispatch(hideLoading())
            })
            
    }
}