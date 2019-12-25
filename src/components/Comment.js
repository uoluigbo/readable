import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { handleUpdateCommentVote, handleDeleteComment } from '../actions/comments'
import { formatDate } from '../utils/helpers'
import AddComment from './AddComment'

class Comment extends Component {
    state = {
        voteScore: 0,
        showCommentBlock: false,
        commentUpdated: false,
    }

    componentDidMount() {
        const { comment } = this.props
    
        this.setState(() => ({ voteScore: comment.voteScore }))
    }

    handleUpdateCommentVote = (e) => {
        const option = e.target.className
        const { dispatch, comment } = this.props
        let vote = 1
        let voteName = 'upVote'
    
        if(option === 'decrease-vote') {
          vote = -1
          voteName = 'downVote'
        }
    
        this.setState((prevState) => ({
          voteScore: prevState.voteScore + vote
        }))
    
        dispatch(handleUpdateCommentVote(comment.id, voteName))
    }

    updateComment = () => {
    this.setState((prevState) => ({commentUpdated: true, showCommentBlock: false}))
    
    }
    
    handleDeleteComment = (e) => {
        const{ dispatch, commentId } = this.props
        
        dispatch(handleDeleteComment(commentId))
    }

    handleToggleShowCommentBlock = (e) => {
        this.setState((prevState) => ({showCommentBlock: !prevState.showCommentBlock}))
    }

    render() {
        const { comment } = this.props 
        const { voteScore,showCommentBlock } = this.state

        return (
            <div className="comment-wrapper">
                <div className="comment-title">
                    <p>
                        {comment.author}
                        <span>{formatDate(comment.timestamp)}</span>
                    </p>
                </div>
                <div className="comment-body">
                    <p>
                        {comment.body}
                    </p>
                </div>
                
                <div className='card-footer'>  
                    <div className='comment-votes'>
                        Votes: { voteScore }
                        <div className='vote'>
                            <span className='increase-vote' title="Increase vote" onClick={ this.handleUpdateCommentVote }>+</span>
                            <span className='decrease-vote' title="Decrease vote" onClick={ this.handleUpdateCommentVote }>-</span>
                        </div>
                    </div>
                    
                    <div className='update-comment'>
                       <span className="separator">|</span>  <button className="edit-comment" onClick={this.handleToggleShowCommentBlock}>Edit Comment</button>
                       <span className="separator">|</span> <button className="delete-comment" onClick={this.handleDeleteComment}>Delete Comment</button>
                    </div>
                </div>

                {
                    showCommentBlock &&
                    <div>
                        <AddComment commentId={comment.id} updateComment={this.updateComment}  />
                    </div>
                }

                <hr />
            </div>
        )
    }
}

Comment.propTypes = {
    commentId: PropTypes.string.isRequired
}


function mapStateToProps({ comments }, { commentId }) {
    const comment = Object.keys(comments).map((k) => comments[k]).filter((comment) => comment.id === commentId)  
  
    return {
      comment: comment.length > 0 ? comment[0] : [],
      comments,
      commentId
    }
  }

  export default connect(mapStateToProps)(Comment)