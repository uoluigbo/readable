import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

const CategoryNav = (props) => {
    const { categories, categoryId } = props
    
    return (
        <div className="category-nav nav">
            <ul className="">
            {
                categories.map((category) => (
                    <li key={category.name}>
                        <Link to={`/categories/${category.path}`} className={ category.name === categoryId ? 'active' : ''}>{category.name}</Link>
                    </li>
                ))
            }
        </ul>
        </div>
        
    )
}

function mapStateToProps({categories}, { categoryId }) {
    return {
        categoryId,
        categories: Object.keys(categories).map((k) => categories[k])
    }
}

export default withRouter(connect(mapStateToProps)(CategoryNav))