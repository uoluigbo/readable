import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleReceiveCategories } from '../actions/categories'

class  CategoryNav extends Component {
    componentDidMount() {
        const { categories, dispatch } = this.props

        if(categories.length === 0) {
            dispatch(handleReceiveCategories())
        }
    }
    render() {
        const { categories, categoryId } = this.props

        return (
            <div className="category-nav nav">
                <ul className="">
                {
                    categories.map((category) => (
                        <li key={category.name}>
                            <Link to={`/${category.path}`} className={ category.name === categoryId ? 'active' : ''}>{category.name}</Link>
                        </li>
                    ))
                }
            </ul>
            </div>
            
        )
    }
}

function mapStateToProps({categories}, { categoryId }) {
    return {
        categoryId,
        categories: Object.keys(categories).map((k) => categories[k])
    }
}

export default withRouter(connect(mapStateToProps)(CategoryNav))