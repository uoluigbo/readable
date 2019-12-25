import {ADD_POST, DELETE_POST, MODIFY_POST, RECEIVE_POSTS, UPDATE_VOTE, RECEIVE_CATEGORY_POSTS} from '../actions/posts'

export default function posts ( state={}, action ) {
    let updatedPost = []

    switch (action.type) {
        case RECEIVE_POSTS:
            return {
                ...state,
                ...action.posts
            }
        case RECEIVE_CATEGORY_POSTS:
            return {
                ...state,
                ...action.categories
            }
        case ADD_POST:
            const len = Object.keys(state).length
            return {
                ...state,
                [len]:action.post
            }
        case  MODIFY_POST:
            updatedPost = Object.keys(state).map((k) => {
                let post = state[k]
                if(post.id === action.postId) {
                    post.title = action.title
                    post.body = action.body
                }
                return post
            })

            return {
                ...state,
                ...updatedPost
            }
        case  UPDATE_VOTE:
            updatedPost = Object.keys(state).map((k) => {
                let post = state[k]
                if(post.id === action.postId) {
                    post.voteScore = action.voteScore
                }

                return post
            })

            return {
                ...state,
                ...updatedPost
            }
        case  DELETE_POST:
                updatedPost = Object.keys(state).map((k) => {
                    let post = state[k]
                    if(post.id === action.postId) {
                        post.deleted = true
                    }
    
                    return post
                })

                updatedPost = updatedPost.filter((post) => post.id !== action.postId)

            return {
                ...updatedPost
            }
        default:
            return {
                ...state
            }
    }
}