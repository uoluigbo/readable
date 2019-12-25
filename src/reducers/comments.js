import { RECEIVE_POST_COMMENTS, RECEIVE_COMMENT, DELETE_COMMENT, MODIFY_COMMENT, UPDATE_COMMENT_VOTE, ADD_COMMENT} from '../actions/comments'

export default function comments ( state={}, action ) {
    let updatedComment = []

    switch (action.type) {
        case RECEIVE_POST_COMMENTS:
            return {
                ...state,
                ...action.comments
            }
        case RECEIVE_COMMENT:
            return {
                ...state,
                ...action.comment
            }
        case ADD_COMMENT:
            const len = Object.keys(state).length
            return {
                ...state,
                [len]:action.comment
            }
        case  MODIFY_COMMENT:
            updatedComment = Object.keys(state).map((k) => {
                let comment = state[k]
                
                if(comment.id === action.commentId) {
                    comment.body = action.body
                    comment.timestamp = action.timestamp
                }

                return comment
            })

            return {
                ...state,
                ...updatedComment
            }
        case  UPDATE_COMMENT_VOTE:
            updatedComment = Object.keys(state).map((k) => {
                let comment = state[k]
                if(comment.id === action.commentId) {
                    comment.voteScore = action.voteScore
                }

                return comment
            })
            return {
                ...state,
                ...updatedComment
            }
        case  DELETE_COMMENT:
            updatedComment = Object.keys(state).map((k) => {
                let comment = state[k]
                if(comment.id === action.commentId) {
                    comment.deleted = true
                }

                return comment
            })

            updatedComment = updatedComment.filter((comment) => comment.id !== action.commentId)
            
            return {
                ...updatedComment
            }
        default:
            return {
                ...state
            }
    }
}