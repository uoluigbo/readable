import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { handleReceiveCategories } from '../actions/categories'
import { handleAddPost, handleModifyPost } from '../actions/posts'
import { generateUID } from '../utils/helpers'

class AddPost extends Component {
  state = {
    title: '',
    author: '',
    category: '',
    body: '',
  }

  componentDidMount() {
    const { post, categories, dispatch } = this.props
    
    if(categories.length === 0) {
      dispatch(handleReceiveCategories())
    }

    if( Object.keys(post).length > 0 ) {
      this.setState(() => ({
        title: post.title,
        author: post.author,
        category: post.category,
        body: post.body
      }))
    }
  }

  handleSubmit = (e) => {
    e.preventDefault()

    const params = {} //this.state
    params.title = this.state.title
    params.body = this.state.body

    const { dispatch, postId, togglePostBlock } = this.props

    if(!postId) {
      params.author = this.state.author
      params.category = this.state.category
      params.timestamp =  Date.now()
      params.id = generateUID()

      dispatch(handleAddPost(params))

      this.props.history.push(`/`)
    } else {
      dispatch(handleModifyPost(postId, params))
    
      if(togglePostBlock) {
        togglePostBlock()
      }
    }
  }

  handleChange = (e) => {
    e.preventDefault()

    if(e.target.name === 'category' && e.target.value === 'select'){
      return
    }

    const val = e.target.value
    const name = e.target.name

    this.setState(() => ({
      [name]: val
    }))
  }

  checkFormFilled = () => {
    let formFilled = true
    const { title, author, category, body } = this.state

    if(title !== '' && author !== '' && category !== '' && body !== '') {
      formFilled = false
    }

    return formFilled
  }

  handleCloseModal =  () => {
    const { closeModal } = this.props

    if(closeModal) {
      closeModal()
    }
  }


  render() {
    const { categories, postId } = this.props
    let { title, author, category, body } = this.state

    const selected = category ? category : 'select'


    return (
      <div className="add-post content-wrapper">
        <div className="section-title">
          <h1>{postId ? 'Edit' : 'Add'} Post</h1>
          {postId &&
            <span className="close" onClick={this.handleCloseModal}>X</span>
          }
          
        </div>
        <div className="form-wrapper">
          <form onSubmit={this.handleSubmit} >
            {
              !postId &&
              <div>
                <select value={selected} name="category" onChange={this.handleChange}>
                  <option value="select">Select Category</option>
                  {
                    categories.map((cat) => (
                      <option 
                        key={cat.name} 
                        value={cat.name} 
                        onChange={this.handleChange}  
                        >{cat.name}
                      </option>
                    ))
                  }
                </select>
              </div>
            }
            {
              !postId &&
              <div>
                <input name="author" value={author} onChange={this.handleChange} placeholder="Enter author's name" />
              </div>
            }
            <div>
              <input name="title" value={title} onChange={this.handleChange} placeholder='Enter title' />
            </div>
            <div>
              <textarea 
                name="body" 
                onChange={this.handleChange} 
                value={body} 
                placeholder='Enter post body' />
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

  AddPost.propTypes = {
    postId: PropTypes.string
  }

  function mapStateToProps({ categories, posts }, { postId, togglePostBlock, closeModal }) {
    const postArr = Object.keys(posts).map((k) => posts[k])
    const post = ( postId )
      ? postArr.filter((p) => p.id === postId )
      : []

    return {
      postId,
      post: post.length > 0 ? post[0] : {},
      categories: Object.keys(categories).map((k) => categories[k]),
      togglePostBlock,
      closeModal
    }
}

export default connect(mapStateToProps)(AddPost)