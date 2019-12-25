import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { handleReceiveCategories } from '../actions/categories'
import { handleAddPost } from '../actions/posts'
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

    if( post.length > 0 ) {
      this.setState(() => ({
        title: post.title,
        author: post.author,
        category: post.category,
        body: post.body
      }))
    }

    if(categories.length === 0) {
      dispatch(handleReceiveCategories())
    }
  }

  handleSubmit = (e) => {
    e.preventDefault()

    const params = this.state
    const { dispatch } = this.props

    params.timestamp =  Date.now()
    params.id = generateUID()

    dispatch(handleAddPost(params))

    this.props.history.push(`/`)
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

  render() {
    const { categories } = this.props
    const { title, author, category, body } = this.state

    const selected = category ? category : 'select'

    return (
      <div className="add-post content-wrapper">
        <div className="section-title">
          <h1>Add Post</h1>
        </div>
        <div className="form-wrapper">
          <form onSubmit={this.handleSubmit} >
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
            <div>
              <input name="author" value={author} onChange={this.handleChange} placeholder="Enter author's name" />
            </div>
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

  function mapStateToProps({ categories, posts }, { postId }) {
    const postArr = Object.keys(posts).map((k) => posts[k])
    const post = ( postId )
      ? postArr.filter((p) => p.id === postId )
      : []

    return {
      postId,
      post,
      categories: Object.keys(categories).map((k) => categories[k])
    }
}

export default connect(mapStateToProps)(AddPost)