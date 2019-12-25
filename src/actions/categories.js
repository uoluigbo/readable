import { getAllCategories} from '../utils/ReadableApi'
import { showLoading, hideLoading } from 'react-redux-loading-bar'

export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES'
export const RECEIVE_CATEGORY_POSTS = 'RECEIVE_CATEGORY_POSTS'

export function receiveCategories(categories) {
    return {
        type: RECEIVE_CATEGORIES,
        categories
    }
}

export function handleReceiveCategories() {
    return (dispatch) => {
        dispatch(showLoading())

        return getAllCategories()
            .then((categories) => {
                dispatch(receiveCategories(categories))
                dispatch(hideLoading())
            })
            
    }
}