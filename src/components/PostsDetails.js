import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { formatDate } from '../utils/helpers'
import { Redirect } from 'react-router-dom'
import { handleReceivePosts, handleUpdatePostVote, handleDeletePost } from '../actions/posts'
import { handleReceivePostComments } from '../actions/comments'
import Comment from './Comment'
import AddComment from './AddComment'
import AddPost from './AddPost'

class PostDetails extends Component {
  state = {
    voteScore: 0,
    toggleCommentBlock: false,
    togglePostBlock: false,
  }

  componentDidMount() {
    const { post, postId, dispatch } = this.props

    if(Object.keys(post).length === 0) {
      dispatch(handleReceivePosts())
    }

    dispatch(handleReceivePostComments(postId))
    //this.setState(() => ({ voteScore: post.voteScore }))
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

    this.props.history.push('/')
  }

  handleToggleCommentBlock = (e) => {
    this.setState((prevState) => ({toggleCommentBlock: !prevState.toggleCommentBlock}))
  }

  handleTogglePostBlock = (e) => {
    this.setState((prevState) => ({togglePostBlock: !prevState.togglePostBlock}))
  }

  handleCloseModal =  () => {
    this.setState((prevState) => ({togglePostBlock: false}))
  }


  render() {
    const { post, comments, postNotFound } = this.props
    const { toggleCommentBlock, togglePostBlock } = this.state

    if( postNotFound ) {
        return <Redirect to="/page-not-found" />
    }

    return (
      <div className="post-details content-wrapper">
        <div className="section-title">
          <h1>{post.title}</h1>
          <p>
            By: {post.author}
            <span>{formatDate(post.timestamp)}</span>
          </p>
          
        </div>
        <div className="post-body">
          {post.body}
        </div>
        <div className='card-footer'> 
          <div className='comment-count'>Comments: {post.commentCount}</div> 
           <span className="separator">|</span>  
          <div className='post-votes'>
              Votes: { post.voteScore }
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
      <div className="comments">
        <div className="title-wrapper">
          <h4><span>Comments</span></h4>
          <button className="toggle-comment" onClick={this.handleToggleCommentBlock}>Add Comment</button>
        </div>
        {
          toggleCommentBlock &&
            <AddComment postId={post.id} toggleCommentBlock={this.handleToggleCommentBlock}  />
        }
          
         {
           comments.map((comment) => (
             <Comment key={comment.id} commentId={comment.id} />
           ))
         }
          
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

PostDetails.propTypes = {
  postId: PropTypes.string.isRequired
}

function mapStateToProps({ posts, comments }, props) {
  const { postId } =  props.match.params

  const postsArr = posts ? Object.keys(posts).map((k) => posts[k]) : []
  const post =  postsArr.filter((post) => post.id === postId)
  const commentsArr = Object.keys(comments).map((k) => comments[k]).filter((comment) => (comment.deleted === false && comment.parentId === postId))

  return {
    postId,
    comments: commentsArr.sort((a,b) => b.timestamp - a.timestamp),
    post: post.length === 1 ? post[0] : {},
    postNotFound: (postsArr.length > 0 && post.length === 0 ) ? true : false
  }
}

export default connect(mapStateToProps)(PostDetails)