import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import CategoryNav from './CategoryNav'
import { formatDate } from '../utils/helpers'
import { handleInitialData } from '../actions/shared'

class PostsC extends Component {
  state = {
    votes = 0
  }

  componentDidMount() {
    const { dispatch } = this.props

    dispatch(handleInitialData())

    //set vote
    console.log('POST = ', )
  }

  handleSort = (e) => {

  }

  handleVote = (e) => {
    const t = e.target.className

    console.log('target class ', e.target.className)

    if()
  }
    
  render() {
    const { categoryId, posts } = this.props

    return (
      <div className="posts">
        <CategoryNav categoryId={ categoryId } />
        <div className="sort-wrapper">
          Sort By: 
          <select name="sort-by" onChange={ this.handleSort }>
            <option value="date">Latest</option>
            <option value="voteScore">Vote Score (High to Low)</option>
            <option value="author">Author</option>
            <option value="post">Post Name</option>
          </select>
          </div>
        {
          posts.map((post) => 
            <div className='card' key={post.id}>
              <div className="card-body">
                  <Link to={`/posts/${post.id}`}><h2>{post.title}</h2></Link>
                  <div>
                    {post.author} . <span>{formatDate(post.timestamp)}</span>
                  </div>
              </div>
              <div className='card-footer'>  
                <div className='comment-count'>Comments: {post.commentCount}</div>
                <div className='post-votes'>
                  Votes: {post.voteScore}
                  <div className='vote'>
                    <span className='increase-vote' onClick={ this.handleVote }>+</span>
                    <span className='decrease-vote' onClick={ this.handleVote }>-</span>
                  </div>
                </div>   
              </div>
            </div>
          )
        }
      </div>
    )
  }
}

PostsC.propTypes = {
    categoryId: PropTypes.string
}

function mapStateToProps({ posts, categories }, { categoryId }) {
  const postArr = Object.keys(posts).map((k) => posts[k])
  const curPosts = ( categoryId )
    ? postArr.filter((p) => p.category === categoryId )
    : postArr
  return {
    categoryId,
    posts: curPosts,
    categories: categories
  }
}

export default connect(mapStateToProps)(PostsC)