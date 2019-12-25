import React, { Component } from 'react'
import { connect } from 'react-redux'
import Posts from './Posts'

class Dashboard extends Component {
  
    render() {

      return (
        <div className="dashboard">
          <Posts />
        </div>
      )
    }
  }

export default connect()(Dashboard)