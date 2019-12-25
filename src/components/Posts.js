import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import CategoryNav from './CategoryNav'
import Post from './Post'
import { handleInitialData } from '../actions/shared'

class Posts extends Component {
  state = {
    sortValue: 'latest',
    doPost: false,
  }

  componentDidMount() {
    const { dispatch } = this.props

    dispatch(handleInitialData())
  }

  handleSort = (e) => {
    const sortValue = e.target.value

    this.setState(() => ({sortValue: sortValue, doPost: true}))
    
  }

  sortPosts = () => {
    const { sortValue } = this.state
    const { posts } = this.props
    let updatedPosts = []

    switch(sortValue) {
      case 'voteScore':
        updatedPosts = posts.sort((a,b) => b.voteScore - a.voteScore)
        break
      case 'voteScoreAsc':
        updatedPosts = posts.sort((a,b) => a.voteScore - b.voteScore)
        break
      case 'oldest':
        updatedPosts = posts.sort((a,b) => a.timestamp - b.timestamp)
        break
      default:
          updatedPosts = posts.sort((a, b) => b.timestamp - a.timestamp)
          break
    }

    return updatedPosts
  }

  render() {
    const { categoryId, posts } = this.props
    const { doPost } = this.state
    let updatedPosts = posts

    if(doPost) {
      updatedPosts = this.sortPosts()
    }

    return (
      <div className="posts">
        <CategoryNav categoryId={ categoryId } />
        <div className="sort-wrapper">
          Sort By:
          <select name="sort-by" onChange={ this.handleSort }>
            <option value="latest">Latest</option>
            <option value="oldest">Oldest</option>
            <option value="voteScore">Vote Score (High to Low)</option>
            <option value="voteScoreAsc">Vote Score (Low to High)</option>
          </select>
          </div>
        {
          updatedPosts.map((post) =>
            <Post key={post.id} postId={post.id} />
          )
        }
      </div>
    )
  }
}

Posts.propTypes = {
    categoryId: PropTypes.string
}

function mapStateToProps({ posts, categories }, { categoryId }) {
  const postArr = Object.keys(posts).map((k) => posts[k]).filter((post) => post.deleted === false)
  const curPosts = ( categoryId )
    ? postArr.filter((p) => p.category === categoryId )
    : postArr

  return {
    categoryId,
    posts: curPosts.sort((a,b) => b.timestamp - a.timestamp),
    categories: categories
  }
}

export default connect(mapStateToProps)(Posts)
