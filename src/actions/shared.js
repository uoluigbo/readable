import { getInitialData } from '../utils/ReadableApi'
import { handleReceiveCategories } from '../actions/categories'
import { handleReceivePosts} from '../actions/posts'
import { showLoading, hideLoading } from 'react-redux-loading-bar'

export function handleInitialData() {
    return (dispatch) => {
        dispatch(showLoading())

        return getInitialData()
            .then(({ categories, posts }) => {
                dispatch(handleReceiveCategories(categories))
                dispatch(handleReceivePosts(posts))
                dispatch(hideLoading())
            })
            
    }
}