import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Posts from './Posts'
import { withRouter } from 'react-router-dom'

class Category extends Component {
    render() {
      const { categoryId } = this.props

      return (
        <div className="category-posts">
          <Posts categoryId={categoryId} />
        </div>
      )
    }
  }

  Category.propTypes = {
    categoryId: PropTypes.string.isRequired
  }

  function mapStateToProps(state, props) {
    const { categoryId } = props.match.params

    return {
      categoryId,
    }
  }

export default withRouter(connect(mapStateToProps)(Category))