import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import CategoryNav from './CategoryNav'

class PageNotFound extends Component {
    render() {
        return (
            <div className="page-not-found">
                <CategoryNav />
                <h1>Page Not Found</h1>
                <div>
                    Return to the <Link to='/'>homepage</Link>
                </div>
            </div>
        )
    }
}

export default PageNotFound