import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { formatDate } from '../utils/helpers'
import { handleUpdatePostVote, handleDeletePost } from '../actions/posts'
import AddPost from './AddPost'

class Post extends Component {
  state = {
    voteScore: 0,
    togglePostBlock: false,
  }

  componentDidMount() {
    const { post } = this.props

    this.setState(() => ({ voteScore: post.voteScore }))
  }

  handleVote = (e) => {
    const option = e.target.className
    const { dispatch, post } = this.props
    let vote = 1
    let voteName = 'upVote'

    if(option === 'decrease-vote') {
      vote = -1
      voteName = 'downVote'
    }

    this.setState((prevState) => ({
      voteScore: prevState.voteScore + vote
    }))

    dispatch(handleUpdatePostVote(post.id, voteName))
  }

  deletePost = (e) => {
    const{ dispatch, postId } = this.props
    
    dispatch(handleDeletePost(postId))
  }

  handleTogglePostBlock = (e) => {
    this.setState((prevState) => ({togglePostBlock: !prevState.togglePostBlock}))
  }

  handleCloseModal =  () => {
    this.setState((prevState) => ({togglePostBlock: false}))
  }
    
  render() {
    const { post } = this.props
    const { voteScore,togglePostBlock } = this.state

    return (
      <div className='card'>
        <div className="card-body">
            <Link to={`/posts/${post.id}`}><h2>{post.title}</h2></Link>
            <div>
              {post.author} . <span>{formatDate(post.timestamp)}</span>
            </div>
        </div>
        <div className='card-footer'>  
          <div className='comment-count'>Comments: {post.commentCount}</div>
          <span className="separator">|</span>
          <div className='post-votes'>
            Votes: { voteScore }
            <div className='vote'>
              <span className='increase-vote' onClick={ this.handleVote }>+</span>
              <span className='decrease-vote' onClick={ this.handleVote }>-</span>
            </div>
          </div>  
          <div className='update-post'>
            <span className="separator">|</span> <button className="edit-post" onClick={this.handleTogglePostBlock}>Edit Post</button>
            <span className="separator">|</span> <button className="delete-post" onClick={this.deletePost}>Delete Post</button>
          </div>
        </div>
        {
          togglePostBlock &&
          <div className="edit-post-modal active">
            <AddPost postId={post.id} togglePostBlock={this.handleTogglePostBlock} closeModal={this.handleCloseModal} />
          </div>
        }
      </div>
    )
  }
}

Post.propTypes = {
    postId: PropTypes.string.isRequired
}

function mapStateToProps({ posts }, { postId }) {

  const post = Object.keys(posts).map((k) => posts[k]).filter((post) => post.id === postId)

  return {
    post: post.length === 1 ? post[0] : [],
    posts,
  }
}

export default connect(mapStateToProps)(Post)