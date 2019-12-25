import React, { Component } from 'react'
import { connect } from 'react-redux'
import Posts from './Posts'

class Dashboard extends Component {

  // componentDidMount() {
  //   const { dispatch } = this.props

  //   dispatch(handleInitialData())
  // }
  
    render() {

      return (
        <div className="dashboard">
          <h1>Readable Blog</h1>
          <Posts />
        </div>
      )
    }
  }

export default connect()(Dashboard)