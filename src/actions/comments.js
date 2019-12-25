import { getComment, getPostComments, editComment, deleteComment, addComment, updateCommentVote } from '../utils/ReadableApi'
import { showLoading, hideLoading } from 'react-redux-loading-bar'

export const RECEIVE_POST_COMMENTS = 'RECEIVE_POST_COMMENTS'
export const RECEIVE_COMMENT = 'RECEIVE_COMMENT'
export const MODIFY_COMMENT = 'MODIFY_COMMENT'
export const UPDATE_COMMENT_VOTE = 'UPDATE_COMMENT_VOTE'
export const ADD_COMMENT = 'ADD_COMMENT'
export const DELETE_COMMENT = 'DELETE_COMMENT'

function createComment(comment) {
    return {
        type: ADD_COMMENT,
        comment
    }
}

function receivePostComments(comments) {
    return {
        type: RECEIVE_POST_COMMENTS,
        comments
    }
}

function receiveComment(comment) {
    return {
        type: RECEIVE_COMMENT,
        comment
    }
}

function modifyCommentVote(commentId, voteScore) {
    return {
        type: UPDATE_COMMENT_VOTE,
        commentId,
        voteScore
    }
}

function modifyComment(commentId, body, timestamp) {
    return {
        type: MODIFY_COMMENT,
        commentId,
        body,
        timestamp
    }
}

function removeComment(commentId) {
    return {
        type: DELETE_COMMENT,
        commentId
    }
}

export function handleReceivePostComments(postId) {
    return (dispatch) => {
        dispatch(showLoading())

        return getPostComments(postId)
            .then((comments) => {
                dispatch(receivePostComments(comments))
                dispatch(hideLoading())
            })
            
    }
}

export function handleReceiveComment(commentId) {
    return (dispatch) => {
        dispatch(showLoading())

        return getComment(commentId)
            .then((comment) => {
                dispatch(receiveComment(comment))
                dispatch(hideLoading())
            })
            
    }
}

export function handleAddComment(comment) {
    return (dispatch) => {
        dispatch(showLoading())

        return addComment(comment)
            .then((comment) => {
                dispatch(createComment(comment))
                dispatch(hideLoading())
            })
            
    }
}

export function handleUpdateCommentVote(commentId, vote) {
    return (dispatch) => {
        dispatch(showLoading())

        return updateCommentVote(commentId, {option: vote})
            .then((comment) => {
                dispatch(modifyCommentVote(commentId, comment.voteScore))
                dispatch(hideLoading())
            })
            
    }
}

export function handleModifyComment(commentId, params) {
    return (dispatch) => {
        dispatch(showLoading())

        return editComment(commentId, params)
            .then((comment) => {
                dispatch(modifyComment(commentId, comment.body, comment.timestamp))
                dispatch(hideLoading())
            })
            
    }
}

export function handleDeleteComment(commentId) {
    return (dispatch) => {
        dispatch(showLoading())

        return deleteComment(commentId)
            .then((comment) => {
                dispatch(removeComment (commentId))
                dispatch(hideLoading())
            })
            
    }
}