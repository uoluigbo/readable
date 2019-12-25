import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'

class Nav extends Component {
    render() {
        return (
            <div className="nav-wrapper">
                <div className="nav-container">
                    <nav className='nav'>
                        <ul>
                            <li>
                                <NavLink to='/' exact activeClassName='active'>
                                    Home
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to='/add-post' activeClassName='active'>
                                    New Post
                                </NavLink>
                            </li>
                        </ul>
                        
                    </nav>
                    <h1>Readable Blog</h1>
                </div>
        </div>
        )
    }
}

export default connect()(Nav)