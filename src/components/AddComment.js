import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { handleAddComment, handleModifyComment } from '../actions/comments'
import { generateUID } from '../utils/helpers'

class AddComment extends Component {
  state = {
    author: '',
    body: '',
  }

  componentDidMount() {
    const { comment, dispatch } = this.props
  
    if( Object.keys(comment).length > 0 ) {
      this.setState(() => ({
        author: comment.author,
        body: comment.body
      }))
    }
  }

  handleSubmit = (e) => {
    e.preventDefault()

    const params = {}
    const { author, body } = this.state
    const { dispatch, postId, commentId, toggleCommentBlock, updateComment } = this.props

    params.timestamp =  Date.now()
    params.body = body

    if(!commentId) {
      params.id = generateUID()
      params.parentId = postId
      params.author = author

      dispatch(handleAddComment(params))
    } else {
      dispatch(handleModifyComment(commentId, params))
    }
    
    this.setState(() => ({ author: '', body: ''}))

    if(toggleCommentBlock) {
      toggleCommentBlock()
    }

    if(updateComment) {
      updateComment()
    }
  }

  handleChange = (e) => {
    e.preventDefault()

    const val = e.target.value
    const name = e.target.name

    this.setState(() => ({
      [name]: val
    }))
  }

  checkFormFilled = () => {
    let formFilled = true
    const { author, body } = this.state

    if(author !== '' && body !== '') {
      formFilled = false
    }

    return formFilled
  }

    render() {
      const { comment, commentId } = this.props

      const { author, body } = this.state

      return (
        <div className="add-comment">
        <div className="add-comment-title">
          <h5> {commentId ? 'Edit' : 'Add'} Comment</h5>
        </div>
        <div className="form-wrapper">
          <form onSubmit={this.handleSubmit} >
            {
              !commentId &&
              <div>
                <input name="author" value={author} onChange={this.handleChange} placeholder="Enter author's name" />
              </div>
            }
            <div>
              <textarea 
                name="body" 
                onChange={this.handleChange} 
                value={body} 
                placeholder='Enter comment text' />
            </div>
            <div>
              <button
                className="btn"
                type='submit'
                disabled={this.checkFormFilled()}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
        
      </div>
      )
    }
  }

  AddComment.propTypes = {
    commentId: PropTypes.string,
    postId: PropTypes.string
  }

  function mapStateToProps({  comments }, { commentId, postId, toggleCommentBlock, updateComment }) {
    const commentArr = Object.keys(comments).map((k) => comments[k])
    const comment = ( commentId )
      ? commentArr.filter((c) => c.id === commentId )
      : []
      
    return {
      commentId,
      postId,
      comment: comment.length > 0 ? comment[0] : {},
      toggleCommentBlock,
      updateComment
    }
}

export default connect(mapStateToProps)(AddComment)